const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://search.google.com/search-console/users?resource_id=https%3A%2F%2Fabam.kr%2F', { waitUntil: 'networkidle2' });
    
    // Click "사용자 추가"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
      const btn = btns.find(b => b.innerText && b.innerText.includes('사용자 추가'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    
    // Check activeElement
    let active = await page.evaluate(() => {
      const el = document.activeElement;
      return { tag: el.tagName, type: el.type, className: el.className, placeholder: el.placeholder };
    });
    console.log('Initial active element in modal:', active);
    
    // If not input, press Tab
    if (active.tag !== 'INPUT') {
      await page.keyboard.press('Tab');
      active = await page.evaluate(() => {
        const el = document.activeElement;
        return { tag: el.tagName, type: el.type, className: el.className, placeholder: el.placeholder };
      });
      console.log('Active element after Tab:', active);
    }
    
    // Type email
    const email = 'google-indexing@tieng-link-uploader.iam.gserviceaccount.com';
    await page.keyboard.type(email, { delay: 10 });
    console.log('Typed email into active element');
    await new Promise(r => setTimeout(r, 1000));
    
    // Check if "추가" button is enabled
    const addBtnInfo = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll('*'));
      const btn = all.find(e => e.children.length === 0 && (e.innerText?.trim() === '추가' || e.innerText?.trim() === 'Add'));
      if (btn) {
        btn.click();
        return { found: true, parentTag: btn.parentElement?.tagName };
      }
      return { found: false };
    });
    console.log('Add button click attempt:', addBtnInfo);
    
    await new Promise(r => setTimeout(r, 4000));
    await page.screenshot({ path: 'scripts/sa_added_final.png' });
    
    // Check user table
    const users = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('*')).map(e => e.innerText?.trim() || '').filter(t => t.includes('@tieng-link-uploader'));
    });
    console.log('Found added user in table:', users);
    
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
