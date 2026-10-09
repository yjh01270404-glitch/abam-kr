const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://console.cloud.google.com/apis/library/indexing.googleapis.com?project=tieng-link-uploader', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Find Enable button
    const enabled = await page.evaluate(async () => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      for (const btn of btns) {
        if (btn.innerText.trim() === '사용' || btn.innerText.trim() === 'Enable') {
          btn.click();
          return 'clicked';
        }
        if (btn.innerText.trim() === '관리' || btn.innerText.trim() === 'Manage') {
          return 'already_enabled';
        }
      }
      return 'not_found';
    });
    
    console.log('Enable action result:', enabled);
    if (enabled === 'clicked') {
      console.log('Waiting 10 seconds for API to enable...');
      await new Promise(r => setTimeout(r, 10000));
    }
    await page.screenshot({ path: 'scripts/indexing_enabled.png' });
    await page.close();
  } catch (err) {
    console.error('Error enabling API:', err);
  }
})();
