const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    const targetEmail = 'google-indexing@tieng-link-uploader.iam.gserviceaccount.com';
    
    for (const prop of ['https%3A%2F%2Fabam.kr%2F', 'sc-domain%3Aabam.kr']) {
      console.log(`\n========================================`);
      console.log(`Configuring Owner for ${prop}...`);
      await page.goto(`https://search.google.com/search-console/users?resource_id=${prop}`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 2000));
      
      // Delete existing google-indexing if present
      await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('tr, div[role="row"]'));
        const r = rows.find(x => x.innerText && x.innerText.includes('google-indexing'));
        if (r) {
          const btn = r.querySelector('button, [role="button"]');
          if (btn) btn.click();
        }
      });
      await new Promise(r => setTimeout(r, 1000));
      
      const clickedDelete = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('[role="menuitem"], div[role="menu"] *'));
        const del = items.find(i => i.innerText && i.innerText.trim() === '액세스 권한 삭제');
        if (del) {
          del.click();
          return true;
        }
        return false;
      });
      
      if (clickedDelete) {
        await new Promise(r => setTimeout(r, 1500));
        await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('div[role="dialog"] button'));
          const confirmBtn = btns.find(b => b.innerText?.trim() === '삭제' || b.innerText?.trim() === 'Delete');
          if (confirmBtn) confirmBtn.click();
        });
        await new Promise(r => setTimeout(r, 3000));
        console.log('Deleted previous user.');
      }
      
      // Click "사용자 추가"
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, [role="button"]'));
        const addBtn = btns.find(b => b.innerText && b.innerText.includes('사용자 추가'));
        if (addBtn) addBtn.click();
      });
      await new Promise(r => setTimeout(r, 1500));
      
      // Type email
      await page.keyboard.type(targetEmail, { delay: 10 });
      console.log('Typed email');
      await new Promise(r => setTimeout(r, 1000));
      
      // Tab to dropdown
      await page.keyboard.press('Tab');
      await new Promise(r => setTimeout(r, 500));
      
      // Open dropdown
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 500));
      
      // Up arrow to "소유자"
      await page.keyboard.press('ArrowUp');
      await new Promise(r => setTimeout(r, 500));
      await page.keyboard.press('ArrowUp');
      await new Promise(r => setTimeout(r, 500));
      
      // Select option
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 1000));
      
      // Tab to "취소", then "추가"
      await page.keyboard.press('Tab');
      await new Promise(r => setTimeout(r, 500));
      await page.keyboard.press('Tab');
      await new Promise(r => setTimeout(r, 500));
      
      // Submit
      await page.keyboard.press('Enter');
      console.log('Submitted form');
      await new Promise(r => setTimeout(r, 5000));
      
      // Verify table row
      const resultRow = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('tr, div[role="row"]'));
        const r = rows.find(x => x.innerText && x.innerText.includes('google-indexing'));
        return r ? r.innerText.replace(/\s+/g, ' ') : 'not found';
      });
      console.log('Result user row:', resultRow);
      await page.screenshot({ path: `scripts/owner_keyboard_${prop.replace(/[^a-z0-9]/gi, '_')}.png` });
    }
    
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
