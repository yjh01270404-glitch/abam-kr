const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    const targetEmail = 'google-indexing@tieng-link-uploader.iam.gserviceaccount.com';
    
    for (const prop of ['https%3A%2F%2Fabam.kr%2F', 'sc-domain%3Aabam.kr']) {
      console.log(`\nNavigating to GSC users for ${prop}...`);
      await page.goto(`https://search.google.com/search-console/users?resource_id=${prop}`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 2000));
      
      // Click "사용자 추가"
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
        const btn = btns.find(b => b.innerText && (b.innerText.includes('사용자 추가') || b.innerText.includes('Add user')));
        if (btn) btn.click();
      });
      await new Promise(r => setTimeout(r, 1500));
      
      // Focus email input using JS
      const focused = await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input'));
        const input = inputs.find(i => i.offsetParent !== null && (i.type === 'text' || i.type === 'email' || !i.type));
        if (input) {
          input.focus();
          return true;
        }
        return false;
      });
      console.log('Input focused:', focused);
      
      // Type email using keyboard
      await page.keyboard.type(targetEmail, { delay: 20 });
      await new Promise(r => setTimeout(r, 1000));
      
      // Click the Add ("추가") button
      const clickedAdd = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const addBtn = btns.find(b => b.innerText.trim() === '추가' || b.innerText.trim() === 'Add');
        if (addBtn && !addBtn.disabled) {
          addBtn.click();
          return true;
        }
        return false;
      });
      console.log('Confirmed click Add:', clickedAdd);
      await new Promise(r => setTimeout(r, 4000));
      
      // Verify user list
      const users = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('tr, td, span, div')).map(el => el.innerText ? el.innerText.trim() : '').filter(t => t.includes('@'));
      });
      console.log('Current users for', prop, ':', Array.from(new Set(users)));
    }
    
    await page.close();
  } catch (e) {
    console.error(e);
  }
})();
