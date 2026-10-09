const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://search.google.com/search-console/users?resource_id=https%3A%2F%2Fabam.kr%2F', { waitUntil: 'networkidle2' });
    
    // Find row for 양정호(나) and click its 3-dots
    const clickedOwnerMenu = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tr, div[role="row"]'));
      const ownerRow = rows.find(r => r.innerText && r.innerText.includes('양정호'));
      if (ownerRow) {
        const btn = ownerRow.querySelector('button, div[role="button"]');
        if (btn) {
          btn.click();
          return true;
        }
      }
      return false;
    });
    console.log('Clicked owner 3-dots:', clickedOwnerMenu);
    await new Promise(r => setTimeout(r, 1000));
    
    // Click "소유권 인증 세부정보"
    await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('[role="menuitem"], div[role="menu"] *'));
      const item = items.find(i => i.innerText && i.innerText.trim().includes('소유권 인증'));
      if (item) item.click();
    });
    
    await new Promise(r => setTimeout(r, 3000));
    console.log('Current URL:', page.url());
    console.log('Current Title:', await page.title());
    await page.screenshot({ path: 'scripts/owner_details.png' });
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
