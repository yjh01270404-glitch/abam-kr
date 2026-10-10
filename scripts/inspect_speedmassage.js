const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 384, height: 854, isMobile: true, hasTouch: true, deviceScaleFactor: 2.8 });
  await page.goto('https://speedmassage.uriweb.kr', { waitUntil: 'networkidle2' });
  
  const structure = await page.evaluate(() => {
    return {
      viewport: document.querySelector('meta[name="viewport"]')?.getAttribute('content'),
      headings: Array.from(document.querySelectorAll('h1, h2, h3, p, a')).slice(0, 15).map(el => ({
        tag: el.tagName,
        text: el.innerText.trim().substring(0, 50),
        fontSize: window.getComputedStyle(el).fontSize,
        fontWeight: window.getComputedStyle(el).fontWeight,
        color: window.getComputedStyle(el).color,
      })),
      bodyStyle: {
        width: window.getComputedStyle(document.body).width,
        margin: window.getComputedStyle(document.body).margin,
        padding: window.getComputedStyle(document.body).padding,
      }
    };
  });
  console.log(JSON.stringify(structure, null, 2));
  await browser.close();
})();
