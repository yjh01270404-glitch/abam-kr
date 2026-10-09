const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    
    // Set download behavior to save key directly into scripts folder
    const client = await page.target().createCDPSession();
    const downloadPath = path.resolve(__dirname);
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: downloadPath
    });
    
    await page.goto('https://console.cloud.google.com/iam-admin/serviceaccounts/details/111565883479943698223/keys?project=tieng-link-uploader', { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('Keys page Title:', await page.title());
    
    // Find "키 추가" (Add Key) -> "새 키 만들기" (Create new key)
    const clickedAdd = await page.evaluate(async () => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      const addBtn = btns.find(b => b.innerText.includes('키 추가') || b.innerText.includes('Add key') || b.innerText.includes('Add Key'));
      if (addBtn) {
        addBtn.click();
        return 'clicked_add_key';
      }
      return 'not_found';
    });
    console.log('Clicked Add Key:', clickedAdd);
    
    await new Promise(r => setTimeout(r, 1500));
    
    // Click "새 키 만들기" (Create new key)
    const clickedCreate = await page.evaluate(async () => {
      const menuItems = Array.from(document.querySelectorAll('[role=\"menuitem\"], button, span'));
      const createItem = menuItems.find(i => i.innerText && (i.innerText.includes('새 키 만들기') || i.innerText.includes('Create new key')));
      if (createItem) {
        createItem.click();
        return 'clicked_create_new_key';
      }
      return 'not_found';
    });
    console.log('Clicked Create New Key:', clickedCreate);
    
    await new Promise(r => setTimeout(r, 2000));
    
    // In modal, JSON is default selected. Click "만들기" (Create)
    const clickedSubmit = await page.evaluate(async () => {
      const btns = Array.from(document.querySelectorAll('button'));
      const submitBtn = btns.find(b => b.innerText.trim() === '만들기' || b.innerText.trim() === 'Create');
      if (submitBtn) {
        submitBtn.click();
        return 'clicked_make_button';
      }
      return 'not_found';
    });
    console.log('Clicked Make Button:', clickedSubmit);
    
    await new Promise(r => setTimeout(r, 5000));
    await page.screenshot({ path: 'scripts/key_created.png' });
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
