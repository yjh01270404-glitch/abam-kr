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
  await page.goto('https://seoulroyalspa.com/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll to high-density hotel directory
  await page.evaluate(() => {
    const el = document.querySelector('.srs-hotel-grid');
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'srs_live_dense_hotels_verified.png') });

  // Mobile screenshot of reviews & footer
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    const el = document.getElementById('reviews');
    if (el) el.scrollIntoView({ block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'srs_live_mobile_reviews_verified.png') });

  await page.evaluate(() => {
    const el = document.querySelector('.srs-footer');
    if (el) el.scrollIntoView({ block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'srs_live_mobile_footer_verified.png') });

  await browser.close();
  console.log('TARGETED VERIFICATION SCREENSHOTS CAPTURED');
}

main();

