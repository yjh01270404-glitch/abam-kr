const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://search.google.com/search-console/users?resource_id=https%3A%2F%2Fabam.kr%2F', { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
      const btn = btns.find(b => b.innerText && (b.innerText.includes('사용자 추가') || b.innerText.includes('Add user')));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    
    // Inspect dialog
    const info = await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"], mat-dialog-container, .modal');
      if (!dialog) return { found: false };
      const btns = Array.from(dialog.querySelectorAll('button, div[role="button"], span')).map(b => ({
        text: b.innerText ? b.innerText.trim() : '',
        tag: b.tagName,
        disabled: b.disabled || b.getAttribute('aria-disabled'),
        className: b.className
      }));
      return { found: true, buttons: btns };
    });
    console.log('Dialog buttons:', JSON.stringify(info, null, 2));
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
