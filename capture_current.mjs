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
  await new Promise(r => setTimeout(r, 2000));

  // 1. Mosaic & Value Props
  await page.evaluate(() => window.scrollTo(0, 400));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'verified_live_hero_mosaic.png') });

  // 2. Section 2: Why Abam
  await page.evaluate(() => window.scrollTo(0, 950));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'verified_live_why_abam_cards.png') });

  // 3. Section 6: Reviews (Stars)
  await page.evaluate(() => {
    const el = document.getElementById('reviews');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'verified_live_reviews_stars.png') });

  // 4. Mobile view
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 500));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'verified_live_mobile_cards.png') });

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

