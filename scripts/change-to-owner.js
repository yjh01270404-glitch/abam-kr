const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    
    for (const prop of ['https%3A%2F%2Fabam.kr%2F', 'sc-domain%3Aabam.kr']) {
      console.log(`\n========================================`);
      console.log(`Changing permission to 소유자 for ${prop}...`);
      await page.goto(`https://search.google.com/search-console/users?resource_id=${prop}`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 2000));
      
      // Click 3-dots for google-indexing
      const clickedDots = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('tr, div[role="row"]'));
        const row = rows.find(r => r.innerText && r.innerText.includes('google-indexing'));
        if (row) {
          const btn = row.querySelector('button, [role="button"]');
          if (btn) {
            btn.click();
            return true;
          }
        }
        return false;
      });
      console.log('Clicked 3-dots:', clickedDots);
      await new Promise(r => setTimeout(r, 1000));
      
      // Click "권한 변경"
      const clickedChange = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('[role="menuitem"], div[role="menu"] *'));
        const item = items.find(i => i.innerText && i.innerText.trim() === '권한 변경');
        if (item) {
          item.click();
          return true;
        }
        return false;
      });
      console.log('Clicked 권한 변경:', clickedChange);
      await new Promise(r => setTimeout(r, 1500));
      
      // Click the permission dropdown in dialog
      await page.evaluate(() => {
        const dialog = document.querySelector('div[role="dialog"]');
        if (!dialog) return;
        const dropdown = dialog.querySelector('div[role="combobox"], [aria-haspopup="listbox"]');
        if (dropdown) dropdown.click();
        else {
          const spans = Array.from(dialog.querySelectorAll('*')).filter(e => e.innerText?.trim() === '전체');
          if (spans.length > 0) spans[0].click();
        }
      });
      await new Promise(r => setTimeout(r, 1000));
      
      // Click "소유자" option
      const clickedOwner = await page.evaluate(() => {
        const opts = Array.from(document.querySelectorAll('[role="option"], mat-option, div'));
        const owner = opts.find(o => o.children.length === 0 && o.innerText?.trim() === '소유자');
        if (owner) {
          owner.click();
          return true;
        }
        return false;
      });
      console.log('Clicked 소유자 option:', clickedOwner);
      await new Promise(r => setTimeout(r, 1000));
      
      // Click "저장" or "확인" or "적용" button in dialog
      const clickedSave = await page.evaluate(() => {
        const dialog = document.querySelector('div[role="dialog"]');
        if (!dialog) return false;
        const btns = Array.from(dialog.querySelectorAll('button'));
        const saveBtn = btns.find(b => {
          const t = b.innerText?.trim();
          return t === '저장' || t === '확인' || t === '적용' || t === 'Save';
        });
        if (saveBtn) {
          saveBtn.click();
          return true;
        }
        return false;
      });
      console.log('Clicked Save button:', clickedSave);
      await new Promise(r => setTimeout(r, 4000));
      
      // Verify table
      const updatedRow = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('tr, div[role="row"]'));
        const r = rows.find(x => x.innerText && x.innerText.includes('google-indexing'));
        return r ? r.innerText.replace(/\s+/g, ' ') : 'not found';
      });
      console.log('Updated user row:', updatedRow);
      await page.screenshot({ path: `scripts/perm_updated_${prop.replace(/[^a-z0-9]/gi, '_')}.png` });
    }
    
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
