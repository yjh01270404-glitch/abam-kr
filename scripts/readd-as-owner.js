const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    const targetEmail = 'google-indexing@tieng-link-uploader.iam.gserviceaccount.com';
    
    for (const prop of ['https%3A%2F%2Fabam.kr%2F', 'sc-domain%3Aabam.kr']) {
      console.log(`\n========================================`);
      console.log(`Setting up Owner for ${prop}...`);
      await page.goto(`https://search.google.com/search-console/users?resource_id=${prop}`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 2000));
      
      // 1. If google-indexing exists, delete it first
      const hasUser = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('tr, div[role="row"]'));
        const r = rows.find(x => x.innerText && x.innerText.includes('google-indexing'));
        if (r) {
          const btn = r.querySelector('button, [role="button"]');
          if (btn) btn.click();
          return true;
        }
        return false;
      });
      
      if (hasUser) {
        console.log('Found existing user, deleting to re-add as Owner...');
        await new Promise(r => setTimeout(r, 1000));
        await page.evaluate(() => {
          const items = Array.from(document.querySelectorAll('[role="menuitem"], div[role="menu"] *'));
          const del = items.find(i => i.innerText && i.innerText.trim() === '액세스 권한 삭제');
          if (del) del.click();
        });
        await new Promise(r => setTimeout(r, 1500));
        // Confirm deletion
        await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('div[role="dialog"] button'));
          const confirmBtn = btns.find(b => b.innerText?.trim() === '삭제' || b.innerText?.trim() === 'Delete');
          if (confirmBtn) confirmBtn.click();
        });
        await new Promise(r => setTimeout(r, 3000));
        console.log('Deleted existing user.');
      }
      
      // 2. Click "사용자 추가"
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, [role="button"]'));
        const addBtn = btns.find(b => b.innerText && b.innerText.includes('사용자 추가'));
        if (addBtn) addBtn.click();
      });
      await new Promise(r => setTimeout(r, 1500));
      
      // Type email
      await page.keyboard.type(targetEmail, { delay: 10 });
      console.log('Typed email:', targetEmail);
      await new Promise(r => setTimeout(r, 1000));
      
      // Click permission dropdown
      await page.evaluate(() => {
        const dialog = document.querySelector('div[role="dialog"]');
        if (!dialog) return;
        const dropdown = dialog.querySelector('div[role="combobox"], mat-select, [aria-haspopup="listbox"]');
        if (dropdown) dropdown.click();
        else {
          const all = Array.from(dialog.querySelectorAll('*'));
          const current = all.find(e => e.innerText?.trim() === '전체');
          if (current) current.click();
        }
      });
      await new Promise(r => setTimeout(r, 1000));
      
      // Click "소유자"
      const selectedOwner = await page.evaluate(() => {
        const options = Array.from(document.querySelectorAll('[role="option"], mat-option, div'));
        const owner = options.find(o => o.children.length === 0 && o.innerText?.trim() === '소유자');
        if (owner) {
          owner.click();
          return true;
        }
        return false;
      });
      console.log('Selected 소유자 in dropdown:', selectedOwner);
      await new Promise(r => setTimeout(r, 1000));
      
      // Click "추가" button
      const clickedAdd = await page.evaluate(() => {
        const dialog = document.querySelector('div[role="dialog"]');
        if (!dialog) return false;
        const btns = Array.from(dialog.querySelectorAll('button'));
        const btn = btns.find(b => b.innerText?.trim() === '추가' || b.innerText?.trim() === 'Add');
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      });
      console.log('Clicked 추가 button:', clickedAdd);
      await new Promise(r => setTimeout(r, 4000));
      
      await page.screenshot({ path: `scripts/owner_result_${prop.replace(/[^a-z0-9]/gi, '_')}.png` });
      
      // Check user row
      const userStatus = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('tr, div[role="row"]'));
        const r = rows.find(x => x.innerText && x.innerText.includes('google-indexing'));
        return r ? r.innerText.replace(/\s+/g, ' ') : 'not found';
      });
      console.log('Final user row:', userStatus);
    }
    
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
