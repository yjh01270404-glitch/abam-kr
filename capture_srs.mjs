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
  await new Promise(r => setTimeout(r, 1500));

  // 1. Desktop Top Header & Hero (trust badges)
  await page.screenshot({ path: path.join(outDir, 'srs_live_hero_badges.png') });

  // 2. High-density Hotel Directory in Coverage
  await page.evaluate(() => {
    const el = document.getElementById('coverage');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'srs_live_coverage_grid.png') });

  // 3. Reviews with 5-Star Gold SVG Stars
  await page.evaluate(() => {
    const el = document.getElementById('reviews');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'srs_live_reviews_stars.png') });

  // 4. Luxury 3-Column Footer
  await page.evaluate(() => {
    const el = document.querySelector('footer');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'srs_live_clean_footer.png') });

  // 5. Mobile View Hero & Bottom Bar
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'srs_live_mobile_hero.png') });

  // 6. Mobile View Reviews
  await page.evaluate(() => {
    const el = document.getElementById('reviews');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'srs_live_mobile_reviews.png') });

  await browser.close();
  console.log('SRS LIVE SCREENSHOTS CAPTURED SUCCESSFULLY');
}

main();
