const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
  const page = (await browser.pages()).find(p => p.url().includes('inspect'));
  if (page) {
    await page.evaluate(() => {
      const okBtns = Array.from(document.querySelectorAll('div[role="dialog"] button'));
      for (const btn of okBtns) {
        if (btn.innerText && (btn.innerText.includes('닫기') || btn.innerText.includes('확인') || btn.innerText.includes('OK'))) {
          btn.click();
          break;
        }
      }
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'scripts/gsc_clean_status.png' });
    console.log('Dialog dismissed and screenshot saved to scripts/gsc_clean_status.png');
  }
  browser.disconnect();
})();
