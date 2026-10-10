const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 384, height: 854, isMobile: true, hasTouch: true, deviceScaleFactor: 2.8 });
  await page.setUserAgent('Mozilla/5.0 (Linux; Android 14; SM-S928N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36');
  await page.goto('https://abam.kr', { waitUntil: 'networkidle2' });
  
  const metrics = await page.evaluate(() => {
    const elBadges = Array.from(document.querySelectorAll('.abam-header-badge')).map(el => ({
      display: window.getComputedStyle(el).display,
      visible: el.offsetParent !== null
    }));
    return {
      docWidth: document.documentElement.scrollWidth,
      winWidth: window.innerWidth,
      bodyWidth: document.body.scrollWidth,
      viewportMeta: document.querySelector('meta[name="viewport"]')?.getAttribute('content'),
      headerBadge: elBadges,
      htmlFontSize: window.getComputedStyle(document.documentElement).fontSize,
      bodyFontSize: window.getComputedStyle(document.body).fontSize,
      h1FontSize: window.getComputedStyle(document.querySelector('h1') || document.body).fontSize,
    };
  });
  console.log('METRICS:', JSON.stringify(metrics, null, 2));
  await page.screenshot({ path: 'galaxy_s24_real.png' });
  await browser.close();
})();
