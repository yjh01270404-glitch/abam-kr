const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://console.cloud.google.com/iam-admin/serviceaccounts/create?project=tieng-link-uploader', { waitUntil: 'networkidle2', timeout: 30000 });
    
    await page.waitForSelector('#_0rif_mat-input-0', { timeout: 10000 });
    await page.type('#_0rif_mat-input-0', 'google-indexing');
    await new Promise(r => setTimeout(r, 1000));
    
    // Click "만들고 닫기"
    const clicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.innerText.trim() === '만들고 닫기' || b.innerText.trim() === '만들고 계속하기');
      if (btn) {
        btn.click();
        return btn.innerText.trim();
      }
      return 'not found';
    });
    console.log('Clicked button:', clicked);
    
    await new Promise(r => setTimeout(r, 5000));
    
    // Check if there is a '완료' button
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const doneBtn = btns.find(b => b.innerText.trim() === '완료' || b.innerText.trim() === 'Done');
      if (doneBtn) doneBtn.click();
    });
    
    await new Promise(r => setTimeout(r, 5000));
    console.log('Current URL after create:', page.url());
    await page.screenshot({ path: 'scripts/sa_created.png' });
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
