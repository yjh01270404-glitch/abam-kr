const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://search.google.com/search-console/users?resource_id=https%3A%2F%2Fabam.kr%2F', { waitUntil: 'networkidle2' });
    
    // Find the 3-dots button on the row with google-indexing
    const clickedMenu = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tr, div[role="row"]'));
      const targetRow = rows.find(r => r.innerText && r.innerText.includes('google-indexing'));
      if (targetRow) {
        const btn = targetRow.querySelector('button, div[role="button"]');
        if (btn) {
          btn.click();
          return true;
        }
      }
      return false;
    });
    console.log('Clicked 3-dots menu:', clickedMenu);
    
    await new Promise(r => setTimeout(r, 1000));
    
    const menuOptions = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('[role="menuitem"], div[role="menu"] *'))
        .map(el => el.innerText ? el.innerText.trim() : '')
        .filter(t => t.length > 0);
    });
    console.log('Menu options:', Array.from(new Set(menuOptions)));
    
    await page.screenshot({ path: 'scripts/user_menu_options.png' });
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
