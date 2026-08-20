const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();

  const templatesDir = path.resolve(__dirname, '../public/images/templates');

  const targets = [
    {
      name: 'autumn_maple',
      file: 'autumn_maple_bg.png',
    },
    {
      name: 'pastel_sakura',
      file: 'pastel_sakura_bg.png',
    }
  ];

  for (const target of targets) {
    const fileFullPath = path.join(templatesDir, target.file);
    if (!fs.existsSync(fileFullPath)) {
      console.error(`File not found: ${fileFullPath}`);
      continue;
    }
    const fileBuffer = fs.readFileSync(fileFullPath);
    const dataUri = `data:image/png;base64,${fileBuffer.toString('base64')}`;

    console.log(`Processing ${target.name}...`);
    
    // HTML to render top slice
    const topHtml = `
      <html>
        <body style="margin:0; padding:0; background:transparent;">
          <div id="slice" style="width:1024px; height:400px; overflow:hidden; position:relative;">
            <img src="${dataUri}" style="width:1024px; height:1024px; position:absolute; top:0; left:0;" />
          </div>
        </body>
      </html>
    `;
    
    await page.setContent(topHtml);
    const topSliceEl = await page.$('#slice');
    const topDest = path.join(templatesDir, `${target.name}_top.png`);
    await topSliceEl.screenshot({ path: topDest, omitBackground: true });
    console.log(`Saved top slice to ${topDest}`);

    // HTML to render bottom slice
    const bottomHtml = `
      <html>
        <body style="margin:0; padding:0; background:transparent;">
          <div id="slice" style="width:1024px; height:400px; overflow:hidden; position:relative;">
            <img src="${dataUri}" style="width:1024px; height:1024px; position:absolute; top:-624px; left:0;" />
          </div>
        </body>
      </html>
    `;
    
    await page.setContent(bottomHtml);
    const bottomSliceEl = await page.$('#slice');
    const bottomDest = path.join(templatesDir, `${target.name}_bottom.png`);
    await bottomSliceEl.screenshot({ path: bottomDest, omitBackground: true });
    console.log(`Saved bottom slice to ${bottomDest}`);

    // Check pixel colors
    const canvasHtml = `
      <html>
        <body style="margin:0; padding:0;">
          <canvas id="canvas" width="1024" height="1024"></canvas>
          <script>
            const img = new Image();
            img.onload = () => {
              const ctx = document.getElementById('canvas').getContext('2d');
              ctx.drawImage(img, 0, 0);
              
              const getHex = (x, y) => {
                const p = ctx.getImageData(x, y, 1, 1).data;
                return "#" + ("000000" + ((p[0] << 16) | (p[1] << 8) | p[2]).toString(16)).slice(-6);
              };
              
              // Sample at middle x=512, y=400 (top bottom edge), y=624 (bottom top edge), y=512 (middle)
              console.log("SAMPLES:" + getHex(512, 400) + "," + getHex(512, 624) + "," + getHex(512, 512));
            };
            img.src = "${dataUri}";
          </script>
        </body>
      </html>
    `;

    let resolveLogs;
    const logPromise = new Promise(resolve => { resolveLogs = resolve; });
    
    const consoleHandler = msg => {
      const text = msg.text();
      if (text.startsWith('SAMPLES:')) {
        resolveLogs(text.substring(8));
      }
    };
    page.on('console', consoleHandler);

    await page.setContent(canvasHtml);
    const samples = await logPromise;
    page.off('console', consoleHandler);
    
    const [colorAt400, colorAt624, colorMiddle] = samples.split(',');
    console.log(`${target.name} colors - at Y=400: ${colorAt400}, at Y=624: ${colorAt624}, at Middle: ${colorMiddle}`);
  }

  await browser.close();
  console.log("Slicing complete!");
}

run().catch(console.error);
