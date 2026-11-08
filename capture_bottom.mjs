import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\yjh01\\.gemini\\antigravity\\brain\\f8b0fc37-71e5-445e-8fcd-9a40c9debaa2';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://abam.kr/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Scroll to absolute bottom
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'verified_live_bottom_most.png') });

  await browser.close();
  console.log('BOTTOM MOST CAPTURED');
}

main();

