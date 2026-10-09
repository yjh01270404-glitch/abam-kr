const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    
    const targetEmail = 'google-indexing@tieng-link-uploader.iam.gserviceaccount.com';
    const properties = [
      'sc-domain%3Aabam.kr',
      'https%3A%2F%2Fabam.kr%2F'
    ];
    
    for (const prop of properties) {
      console.log(`\nNavigating to GSC users page for ${prop}...`);
      await page.goto(`https://search.google.com/search-console/users?resource_id=${prop}`, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));
      
      // Look for "사용자 추가" (Add user) button
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
      
      if (!clickedAdd) {
        await page.screenshot({ path: `scripts/gsc_users_${prop.replace(/[^a-z0-9]/gi, '_')}.png` });
        continue;
      }
      
      await new Promise(r => setTimeout(r, 2000));
      
      // Fill email and select Owner permission
      await page.evaluate((email) => {
        const inputs = Array.from(document.querySelectorAll('input[type="text"], input[type="email"], input:not([type])'));
        const emailInput = inputs.find(i => i.placeholder.includes('이메일') || i.getAttribute('aria-label')?.includes('이메일') || true);
        if (emailInput) {
          emailInput.value = email;
          emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, targetEmail);
      
      console.log('Entered email:', targetEmail);
      await new Promise(r => setTimeout(r, 1000));
      
      // Select Permission dropdown (소유자 / Owner)
      await page.evaluate(() => {
        // Look for permission dropdown
        const dropdowns = Array.from(document.querySelectorAll('div[role="combobox"], div[aria-haspopup="listbox"], mat-select'));
        if (dropdowns.length > 0) {
          dropdowns[0].click();
        }
      });
      await new Promise(r => setTimeout(r, 1000));
      
      // Select "소유자" (Owner)
      const selectedOwner = await page.evaluate(() => {
        const options = Array.from(document.querySelectorAll('div[role="option"], mat-option, span'));
        const ownerOpt = options.find(o => o.innerText.trim() === '소유자' || o.innerText.trim() === 'Owner');
        if (ownerOpt) {
          ownerOpt.click();
          return true;
        }
        return false;
      });
      console.log('Selected Owner option:', selectedOwner);
      await new Promise(r => setTimeout(r, 1000));
      
      // Click "추가" (Add) button in modal
      const added = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('div[role="dialog"] button, mat-dialog-container button, button'));
        const addBtn = btns.find(b => b.innerText.trim() === '추가' || b.innerText.trim() === 'Add');
        if (addBtn) {
          addBtn.click();
          return true;
        }
        return false;
      });
      console.log('Clicked confirm Add button:', added);
      await new Promise(r => setTimeout(r, 4000));
      
      await page.screenshot({ path: `scripts/gsc_user_added_${prop.replace(/[^a-z0-9]/gi, '_')}.png` });
    }
    
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
