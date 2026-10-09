const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://search.google.com/search-console/users?resource_id=sc-domain%3Aabam.kr', { waitUntil: 'networkidle2' });
    
    // Click "사용자 추가"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
      const btn = btns.find(b => b.innerText && b.innerText.includes('사용자 추가'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    
    // Type email
    const email = 'google-indexing@tieng-link-uploader.iam.gserviceaccount.com';
    await page.keyboard.type(email, { delay: 10 });
    console.log('Typed email into active element');
    await new Promise(r => setTimeout(r, 1000));
    
    // Click "추가" button
    const addBtnInfo = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll('*'));
      const btn = all.find(e => e.children.length === 0 && (e.innerText?.trim() === '추가' || e.innerText?.trim() === 'Add'));
      if (btn) {
        btn.click();
        return { found: true };
      }
      return { found: false };
    });
    console.log('Add button click attempt:', addBtnInfo);
    
    await new Promise(r => setTimeout(r, 4000));
    
    // Check user table
    const users = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('*')).map(e => e.innerText?.trim() || '').filter(t => t.includes('@tieng-link-uploader'));
    });
    console.log('Found added user in sc-domain:abam.kr table:', Array.from(new Set(users)));
    
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
