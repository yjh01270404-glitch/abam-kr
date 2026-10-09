const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    
    const targetEmail = 'google-indexing@tieng-link-uploader.iam.gserviceaccount.com';
    const properties = [
      'https%3A%2F%2Fabam.kr%2F',
      'sc-domain%3Aabam.kr'
    ];
    
    for (const prop of properties) {
      console.log(`\nNavigating to GSC users page for ${prop}...`);
      await page.goto(`https://search.google.com/search-console/users?resource_id=${prop}`, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));
      
      // Look for "사용자 추가" button
      const clickedAdd = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
        const btn = btns.find(b => b.innerText && (b.innerText.includes('사용자 추가') || b.innerText.includes('Add user')));
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      });
      console.log('Clicked Add User button:', clickedAdd);
      
      if (!clickedAdd) continue;
      
      await new Promise(r => setTimeout(r, 1500));
      
      // Focus input and type email
      const inputSelector = 'div[role="dialog"] input[type="text"], mat-dialog-container input';
      await page.waitForSelector(inputSelector, { timeout: 5000 });
      await page.click(inputSelector);
      await page.type(inputSelector, targetEmail, { delay: 20 });
      console.log('Typed email:', targetEmail);
      
      await new Promise(r => setTimeout(r, 1000));
      
      // Check permissions dropdown: let's click it to see options
      await page.evaluate(() => {
        const selects = document.querySelectorAll('mat-select, div[role="combobox"]');
        if (selects.length > 0) {
          selects[0].click();
        }
      });
      await new Promise(r => setTimeout(r, 1000));
      
      // List options and click "소유자" if exists, or "전체" (Full)
      const clickedOpt = await page.evaluate(() => {
        const opts = Array.from(document.querySelectorAll('mat-option, div[role="option"]'));
        console.log('Options found:', opts.map(o => o.innerText.trim()));
        const owner = opts.find(o => o.innerText.includes('소유자') || o.innerText.includes('Owner'));
        if (owner) {
          owner.click();
          return 'Owner';
        }
        const full = opts.find(o => o.innerText.includes('전체') || o.innerText.includes('Full'));
        if (full) {
          full.click();
          return 'Full';
        }
        return 'none';
      });
      console.log('Selected permission:', clickedOpt);
      
      await new Promise(r => setTimeout(r, 1000));
      
      // Click "추가" button in dialog
      const confirmed = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('div[role="dialog"] button, mat-dialog-container button'));
        const addBtn = btns.find(b => b.innerText.trim() === '추가' || b.innerText.trim() === 'Add');
        if (addBtn && !addBtn.disabled) {
          addBtn.click();
          return true;
        }
        return false;
      });
      console.log('Confirmed click Add:', confirmed);
      
      await new Promise(r => setTimeout(r, 4000));
      await page.screenshot({ path: `scripts/gsc_user_result_${prop.replace(/[^a-z0-9]/gi, '_')}.png` });
    }
    
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
