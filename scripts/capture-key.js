const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    
    // Inject hook before navigation
    await page.evaluateOnNewDocument(() => {
      window.__capturedKeys = [];
      const origCreateObjectURL = URL.createObjectURL;
      URL.createObjectURL = function(blob) {
        if (blob && blob.type && blob.type.includes('json')) {
          const reader = new FileReader();
          reader.onload = () => {
            window.__capturedKeys.push(reader.result);
          };
          reader.readAsText(blob);
        } else if (blob instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const text = reader.result;
              if (text.includes('private_key') && text.includes('client_email')) {
                window.__capturedKeys.push(text);
              }
            } catch(e){}
          };
          reader.readAsText(blob);
        }
        return origCreateObjectURL.apply(this, arguments);
      };
    });

    await page.goto('https://console.cloud.google.com/iam-admin/serviceaccounts/details/111565883479943698223/keys?project=tieng-link-uploader', { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('Navigated to keys page');

    // Click "키 추가"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      const addBtn = btns.find(b => b.innerText.includes('키 추가') || b.innerText.includes('Add key') || b.innerText.includes('Add Key'));
      if (addBtn) addBtn.click();
    });

    await new Promise(r => setTimeout(r, 1500));

    // Click "새 키 만들기"
    await page.evaluate(() => {
      const menuItems = Array.from(document.querySelectorAll('[role="menuitem"], button, span'));
      const createItem = menuItems.find(i => i.innerText && (i.innerText.includes('새 키 만들기') || i.innerText.includes('Create new key')));
      if (createItem) createItem.click();
    });

    await new Promise(r => setTimeout(r, 2000));

    // Click "만들기" (JSON radio is already selected by default)
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const submitBtn = btns.find(b => b.innerText.trim() === '만들기' || b.innerText.trim() === 'Create');
      if (submitBtn) submitBtn.click();
    });

    console.log('Waiting for key capture...');
    let keyContent = null;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 500));
      const captured = await page.evaluate(() => window.__capturedKeys);
      if (captured && captured.length > 0) {
        keyContent = captured[0];
        break;
      }
    }

    if (keyContent) {
      const keyObj = JSON.parse(keyContent);
      console.log('Successfully captured key for:', keyObj.client_email);
      fs.writeFileSync(path.join(__dirname, 'google-indexing-key.json'), keyContent, 'utf8');
      console.log('Key saved to scripts/google-indexing-key.json');
    } else {
      console.log('Key not captured via blob hook, checking HTML or download...');
    }

    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
