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
  
  const fileFullPath = path.resolve(__dirname, '../public/images/templates/pastel_sakura_bg.png');
  const fileBuffer = fs.readFileSync(fileFullPath);
  const dataUri = `data:image/png;base64,${fileBuffer.toString('base64')}`;

  await page.setContent(`
    <html>
      <body>
        <canvas id="canvas" width="1024" height="1024"></canvas>
        <script>
          console.log("Setting up image...");
          const img = new Image();
          img.onload = () => {
            console.log("Image loaded!");
            try {
              const ctx = document.getElementById('canvas').getContext('2d');
              ctx.drawImage(img, 0, 0);
              const getHex = (x, y) => {
                const p = ctx.getImageData(x, y, 1, 1).data;
                return "#" + ("000000" + ((p[0] << 16) | (p[1] << 8) | p[2]).toString(16)).slice(-6);
              };
              console.log("PASTELSAMPLES:" + getHex(512, 400) + "," + getHex(512, 624) + "," + getHex(512, 512));
            } catch (err) {
              console.log("Canvas error: " + err.toString());
            }
          };
          img.onerror = (e) => {
            console.log("Image load error!");
          };
          img.src = "${dataUri}";
          console.log("Image src set.");
        </script>
      </body>
    </html>
  `);

  await new Promise(r => setTimeout(r, 6000));
  await browser.close();
}

run().catch(console.error);
