const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://console.cloud.google.com/iam-admin/serviceaccounts?project=tieng-link-uploader', { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('Title:', await page.title());
    
    // Check existing service accounts table
    const emails = await page.evaluate(() => {
      const items = [];
      const cells = document.querySelectorAll('td, span, div');
      cells.forEach(c => {
        const text = c.innerText ? c.innerText.trim() : '';
        if (text.includes('@tieng-link-uploader.iam.gserviceaccount.com')) {
          if (!items.includes(text)) items.push(text);
        }
      });
      return items;
    });
    console.log('Found service accounts:', emails);
    await page.screenshot({ path: 'scripts/service_accounts.png' });
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
