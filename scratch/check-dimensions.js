const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  
  const images = ['autumn_maple_bg.png', 'pastel_sakura_bg.png', 'navy_gold_top.png', 'navy_gold_bottom.png'];
  for (const img of images) {
    const imgPath = path.resolve(__dirname, '../public/images/templates', img);
    await page.goto('file://' + imgPath);
    const dims = await page.evaluate(() => {
      const imgEl = document.querySelector('img');
      return {
        width: imgEl ? imgEl.naturalWidth : 0,
        height: imgEl ? imgEl.naturalHeight : 0
      };
    });
    console.log(`${img}: ${dims.width}x${dims.height}`);
  }
  await browser.close();
}

run().catch(console.error);
