import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\yjh01\\.gemini\\antigravity\\brain\\f8b0fc37-71e5-445e-8fcd-9a40c9debaa2';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.goto('https://abam.kr/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Mobile Hero & Mosaic
  await page.screenshot({ path: path.join(outDir, 'mobile_view_hero.png') });

  // 2. Mobile Section 2 Cards
  await page.evaluate(() => window.scrollTo(0, 1100));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'mobile_view_section2.png') });

  // 3. Mobile Reviews
  await page.evaluate(() => {
    const el = document.getElementById('reviews');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo(0, top);
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'mobile_view_reviews.png') });

  await browser.close();
  console.log('MOBILE DONE');
}

main();
