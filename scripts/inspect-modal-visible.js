const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://search.google.com/search-console/users?resource_id=https%3A%2F%2Fabam.kr%2F', { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
      const btn = btns.find(b => b.innerText && b.innerText.includes('사용자 추가'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    const elements = await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]');
      if (!dialog) return [];
      return Array.from(dialog.querySelectorAll('*')).filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 50 && r.height > 15;
      }).map(el => ({
        tag: el.tagName,
        text: el.innerText ? el.innerText.trim().substring(0, 30) : '',
        placeholder: el.placeholder,
        r: el.getBoundingClientRect()
      }));
    });
    console.log('Visible elements in dialog:', JSON.stringify(elements, null, 2));
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
