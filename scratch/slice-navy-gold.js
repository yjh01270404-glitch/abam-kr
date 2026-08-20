const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  const templatesDir = path.resolve(__dirname, '../public/images/templates');

  const fileFullPathTop = path.join(templatesDir, 'navy_gold_top.png');
  const bufferTop = fs.readFileSync(fileFullPathTop);
  const dataUriTop = `data:image/png;base64,${bufferTop.toString('base64')}`;

  const fileFullPathBottom = path.join(templatesDir, 'navy_gold_bottom.png');
  const bufferBottom = fs.readFileSync(fileFullPathBottom);
  const dataUriBottom = `data:image/png;base64,${bufferBottom.toString('base64')}`;

  // Slice Navy Gold Top (Top 400px)
  const topHtml = `
    <html>
      <body style="margin:0; padding:0; background:transparent;">
        <div id="slice" style="width:1024px; height:400px; overflow:hidden; position:relative;">
          <img src="${dataUriTop}" style="width:1024px; height:1024px; position:absolute; top:0; left:0;" />
        </div>
      </body>
    </html>
  `;
  await page.setContent(topHtml);
  const topSliceEl = await page.$('#slice');
  const topDest = path.join(templatesDir, 'navy_gold_top_sliced.png');
  await topSliceEl.screenshot({ path: topDest, omitBackground: true });
  console.log(`Saved top slice to ${topDest}`);

  // Slice Navy Gold Bottom (Bottom 400px)
  const bottomHtml = `
    <html>
      <body style="margin:0; padding:0; background:transparent;">
        <div id="slice" style="width:1024px; height:400px; overflow:hidden; position:relative;">
          <img src="${dataUriBottom}" style="width:1024px; height:1024px; position:absolute; top:-624px; left:0;" />
        </div>
      </body>
    </html>
  `;
  await page.setContent(bottomHtml);
  const bottomSliceEl = await page.$('#slice');
  const bottomDest = path.join(templatesDir, 'navy_gold_bottom_sliced.png');
  await bottomSliceEl.screenshot({ path: bottomDest, omitBackground: true });
  console.log(`Saved bottom slice to ${bottomDest}`);

  // Check pixel colors at the edges
  const canvasHtml = `
    <html>
      <body>
        <canvas id="canvasTop" width="1024" height="1024"></canvas>
        <canvas id="canvasBottom" width="1024" height="1024"></canvas>
        <script>
          const imgTop = new Image();
          const imgBottom = new Image();
          let loaded = 0;
          
          const check = () => {
            loaded++;
            if (loaded === 2) {
              const ctxTop = document.getElementById('canvasTop').getContext('2d');
              ctxTop.drawImage(imgTop, 0, 0);
              
              const ctxBottom = document.getElementById('canvasBottom').getContext('2d');
              ctxBottom.drawImage(imgBottom, 0, 0);
              
              const getHexTop = (x, y) => {
                const p = ctxTop.getImageData(x, y, 1, 1).data;
                return "#" + ("000000" + ((p[0] << 16) | (p[1] << 8) | p[2]).toString(16)).slice(-6);
              };

              const getHexBottom = (x, y) => {
                const p = ctxBottom.getImageData(x, y, 1, 1).data;
                return "#" + ("000000" + ((p[0] << 16) | (p[1] << 8) | p[2]).toString(16)).slice(-6);
              };
              
              console.log("NAVYSAMPLES:" + getHexTop(512, 400) + "," + getHexBottom(512, 624));
            }
          };
          
          imgTop.onload = check;
          imgBottom.onload = check;
          
          imgTop.src = "${dataUriTop}";
          imgBottom.src = "${dataUriBottom}";
        </script>
      </body>
    </html>
  `;

  await page.setContent(canvasHtml);
  await new Promise(r => setTimeout(r, 6000));
  await browser.close();
}

run().catch(console.error);
