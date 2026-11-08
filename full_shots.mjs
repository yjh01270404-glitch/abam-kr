import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\yjh01\\.gemini\\antigravity\\brain\\f8b0fc37-71e5-445e-8fcd-9a40c9debaa2';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  await page.goto('https://seoulroyalspa.com/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(outDir, 'full_srs_mobile.png'), fullPage: true });

  await page.goto('https://abam.kr/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(outDir, 'full_abam_mobile.png'), fullPage: true });

  await browser.close();
  console.log('Full screenshots taken!');
}

main().catch(console.error);
