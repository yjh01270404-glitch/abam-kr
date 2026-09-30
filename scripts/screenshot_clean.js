const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('https://abam.kr', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Wait 1.5s for fonts & images
  await new Promise(r => setTimeout(r, 1500));

  // Screenshot hero & top section
  await page.screenshot({
    path: 'C:/Users/yjh01/.gemini/antigravity-ide/brain/1bce8b1b-8781-4f32-a9ea-510a5b3e44f8/clean_mobile_top.png',
    fullPage: false
  });

  // Scroll to Ace therapists section
  await page.evaluate(() => {
    const el = document.querySelector('h2');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: 'C:/Users/yjh01/.gemini/antigravity-ide/brain/1bce8b1b-8781-4f32-a9ea-510a5b3e44f8/clean_mobile_aces.png',
    fullPage: false
  });

  // Scroll to Signature courses
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const target = headings.find(h => h.textContent && h.textContent.includes('시그니처 코스'));
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: 'C:/Users/yjh01/.gemini/antigravity-ide/brain/1bce8b1b-8781-4f32-a9ea-510a5b3e44f8/clean_mobile_courses.png',
    fullPage: false
  });

  console.log('ALL_SCREENSHOTS_TAKEN');
  await browser.close();
})();
