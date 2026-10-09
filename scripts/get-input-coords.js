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
    const modalInput = await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]');
      if (!dialog) return 'no dialog';
      const input = dialog.querySelector('input');
      if (!input) return 'no input in dialog';
      const r = input.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2, width: r.width, height: r.height };
    });
    console.log('Modal input coords:', modalInput);
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
