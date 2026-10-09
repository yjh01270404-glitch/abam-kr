const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://search.google.com/search-console/users?resource_id=https%3A%2F%2Fabam.kr%2F', { waitUntil: 'networkidle2' });
    
    // Click 3-dots
    await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tr, div[role="row"]'));
      const targetRow = rows.find(r => r.innerText && r.innerText.includes('google-indexing'));
      if (targetRow) {
        const btn = targetRow.querySelector('button, div[role="button"]');
        if (btn) btn.click();
      }
    });
    await new Promise(r => setTimeout(r, 1000));
    
    // Click "권한 변경"
    await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('[role="menuitem"], div[role="menu"] *'));
      const item = items.find(i => i.innerText && i.innerText.trim() === '권한 변경');
      if (item) item.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    
    // Inspect dialog
    const dialogOptions = await page.evaluate(() => {
      const opts = Array.from(document.querySelectorAll('div[role="dialog"] *, mat-dialog-container *'));
      return Array.from(new Set(opts.map(o => o.innerText ? o.innerText.trim() : '').filter(Boolean)));
    });
    console.log('Change permission dialog options:', dialogOptions);
    await page.screenshot({ path: 'scripts/change_perm_dialog.png' });
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
