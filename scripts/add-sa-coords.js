const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    const targetEmail = 'google-indexing@tieng-link-uploader.iam.gserviceaccount.com';
    
    for (const prop of ['https%3A%2F%2Fabam.kr%2F', 'sc-domain%3Aabam.kr']) {
      console.log(`\n========================================`);
      console.log(`Processing property: ${prop}`);
      await page.goto(`https://search.google.com/search-console/users?resource_id=${prop}`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 2000));
      
      // Click "사용자 추가"
      await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll('*'));
        const btn = els.find(e => e.innerText && e.innerText.trim() === '사용자 추가' && e.children.length === 0);
        if (btn) btn.click();
        else {
          const btn2 = els.find(e => e.innerText && e.innerText.includes('사용자 추가'));
          if (btn2) btn2.click();
        }
      });
      await new Promise(r => setTimeout(r, 1500));
      
      // Find the email input box in the active modal
      const box = await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input'));
        const visible = inputs.filter(i => {
          const rect = i.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && rect.top > 0;
        });
        if (visible.length > 0) {
          const rect = visible[0].getBoundingClientRect();
          return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
        }
        return null;
      });
      
      if (!box) {
        console.log('Could not find input box');
        continue;
      }
      
      console.log('Clicking input box at:', box);
      await page.mouse.click(box.x, box.y);
      await new Promise(r => setTimeout(r, 500));
      
      // Type email
      await page.keyboard.type(targetEmail, { delay: 15 });
      console.log('Typed email successfully');
      await new Promise(r => setTimeout(r, 1500));
      
      // Find "추가" button bounding box
      const addBtnBox = await page.evaluate(() => {
        const all = Array.from(document.querySelectorAll('*'));
        const candidates = all.filter(e => {
          if (e.children.length > 0) return false;
          const text = e.innerText ? e.innerText.trim() : '';
          return text === '추가' || text === 'Add';
        });
        if (candidates.length > 0) {
          // get the lowest one on screen (dialog action button)
          candidates.sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top);
          const rect = candidates[0].getBoundingClientRect();
          return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, width: rect.width, height: rect.height };
        }
        return null;
      });
      
      console.log('Found Add button box:', addBtnBox);
      if (addBtnBox) {
        await page.mouse.click(addBtnBox.x, addBtnBox.y);
        console.log('Clicked Add button at coordinates!');
        await new Promise(r => setTimeout(r, 5000));
      }
      
      await page.screenshot({ path: `scripts/gsc_added_${prop.replace(/[^a-z0-9]/gi, '_')}.png` });
      
      // Check user list
      const userList = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*'))
          .map(e => e.innerText ? e.innerText.trim() : '')
          .filter(t => t.includes('@tieng-link-uploader.iam.gserviceaccount.com'));
      });
      console.log('Verification result in GSC:', Array.from(new Set(userList)));
    }
    
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
