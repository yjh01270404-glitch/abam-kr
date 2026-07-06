const puppeteer = require('puppeteer');
const fs = require('fs');

async function generate() {
  const browser = await puppeteer.launch({ executablePath: 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe' });
  const page = await browser.newPage();
  
  // Create an HTML template with the exact CSS and SVG
  const html = `
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&family=Black+Han+Sans&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
          }
          .logo-container {
            display: inline-flex;
            align-items: center;
            gap: 10px;
          }
          .text {
            font-family: 'Nanum Brush Script', 'Black Han Sans', cursive, sans-serif;
            font-weight: 400;
            font-style: normal;
            letter-spacing: 0.04em;
            line-height: 1;
            background: linear-gradient(110deg, #f59e0b 0%, #fbbf24 30%, #e11d48 65%, #be185d 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
            display: inline-block;
            transform: skewX(-10deg) rotate(-2deg);
            transform-origin: left center;
            filter: drop-shadow(0px 3px 6px rgba(190,24,93,0.35)) drop-shadow(0px 5px 15px rgba(245,158,11,0.2));
            white-space: nowrap;
            padding: 0.05em 0.1em;
          }
        </style>
      </head>
      <body>
        <div id="capture-og" style="width: 1200px; height: 630px; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at center, #2e003e 0%, #0d0015 100%); position: absolute; top: 0; left: 0;">
           <div class="logo-container" style="transform: scale(4);">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style="display: block;">
                <defs>
                  <mask id="abam-moon-mask">
                    <rect width="40" height="40" fill="white" />
                    <circle cx="27" cy="17" r="13" fill="black" />
                  </mask>
                </defs>
                <circle cx="20" cy="20" r="16" fill="#fde047" mask="url(#abam-moon-mask)" />
              </svg>
              <span class="text" style="font-size: 50px;">아름다운밤</span>
           </div>
        </div>
        
        <div id="capture-icon" style="width: 512px; height: 512px; display: flex; align-items: center; justify-content: center; background: transparent; position: absolute; top: 700px; left: 0;">
           <div class="logo-container" style="transform: scale(8);">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style="display: block;">
                <defs>
                  <mask id="abam-moon-mask2">
                    <rect width="40" height="40" fill="white" />
                    <circle cx="27" cy="17" r="13" fill="black" />
                  </mask>
                </defs>
                <circle cx="20" cy="20" r="16" fill="#fde047" mask="url(#abam-moon-mask2)" />
              </svg>
           </div>
        </div>
      </body>
    </html>
  `;
  
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  // Capture OG Image (1200x630)
  const ogElement = await page.$('#capture-og');
  await ogElement.screenshot({ path: 'public/images/og-image.png' });
  
  // Capture Icon Image (512x512)
  const iconElement = await page.$('#capture-icon');
  await iconElement.screenshot({ path: 'src/app/icon.png', omitBackground: true });
  
  // Capture Apple Icon Image (180x180) - we'll just scale it via CSS
  await page.evaluate(() => {
     document.getElementById('capture-icon').style.width = '180px';
     document.getElementById('capture-icon').style.height = '180px';
     document.querySelector('#capture-icon .logo-container').style.transform = 'scale(3)';
  });
  const appleIconElement = await page.$('#capture-icon');
  await appleIconElement.screenshot({ path: 'src/app/apple-icon.png', omitBackground: true });
  
  await browser.close();
  console.log("Assets generated successfully!");
}

generate().catch(console.error);
