import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\yjh01\\.gemini\\antigravity\\brain\\f8b0fc37-71e5-445e-8fcd-9a40c9debaa2';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Seoul Royal Spa Mobile Courses Section
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('https://seoulroyalspa.com/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  const srsCourses = await page.$('#courses');
  if (srsCourses) {
    await srsCourses.screenshot({ path: path.join(outDir, 'debug_srs_courses_mobile.png') });
  } else {
    await page.screenshot({ path: path.join(outDir, 'debug_srs_full_mobile.png'), fullPage: true });
  }

  // 2. Abam Mobile Price Section
  await page.goto('https://abam.kr/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  const abamPrice = await page.$('#price');
  if (abamPrice) {
    await abamPrice.screenshot({ path: path.join(outDir, 'debug_abam_price_mobile.png') });
  } else {
    await page.screenshot({ path: path.join(outDir, 'debug_abam_full_mobile.png'), fullPage: true });
  }

  // 3. Desktop versions
  await page.setViewport({ width: 1280, height: 850 });
  await page.goto('https://seoulroyalspa.com/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  const srsCoursesDesk = await page.$('#courses');
  if (srsCoursesDesk) {
    await srsCoursesDesk.screenshot({ path: path.join(outDir, 'debug_srs_courses_desk.png') });
  }

  await page.goto('https://abam.kr/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  const abamPriceDesk = await page.$('#price');
  if (abamPriceDesk) {
    await abamPriceDesk.screenshot({ path: path.join(outDir, 'debug_abam_price_desk.png') });
  }

  await browser.close();
  console.log('Screenshots captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

