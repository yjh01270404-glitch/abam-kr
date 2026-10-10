const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
  const pages = await browser.pages();
  const page = pages.find(p => p.url().includes('search-console')) || pages[0];
  
  // Clear any existing input
  await page.evaluate(() => {
    const input = document.querySelector('input');
    if (input) {
      input.value = '';
      input.focus();
    }
  });

  const selector = 'input';
  await page.type(selector, 'https://abam.kr/sitemap.xml', { delay: 40 });
  console.log('Typed full url: https://abam.kr/sitemap.xml');
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Click 제출
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
    const submitBtn = btns.find(b => b.innerText && b.innerText.trim() === '제출');
    if (submitBtn) {
      submitBtn.click();
      return true;
    }
    return false;
  });
  console.log('Clicked submit:', clicked);
  
  await new Promise(r => setTimeout(r, 6000));
  
  // Check modal text
  const modalText = await page.evaluate(() => {
    const dialog = document.querySelector('div[role="dialog"]');
    return dialog ? dialog.innerText : null;
  });
  console.log('Dialog Text:', modalText);

  // Take screenshot
  await page.screenshot({ path: 'C:/Users/yjh01/.gemini/antigravity-ide/brain/6bdc7c92-f5e2-4e0f-9835-9c3bf2e34ab4/gsc_after_submit_full.png' });
  console.log('SCREENSHOT_AFTER_SUBMIT_SAVED');

  // If dialog has confirm button, click it
  if (modalText) {
    await page.evaluate(() => {
      const okBtns = Array.from(document.querySelectorAll('div[role="dialog"] button'));
      for (const btn of okBtns) {
        if (btn.innerText && (btn.innerText.includes('확인') || btn.innerText.includes('OK') || btn.innerText.includes('Got it') || btn.innerText.includes('닫기'))) {
          btn.click();
          break;
        }
      }
    });
    console.log('Dialog dismissed');
  }

  browser.disconnect();
})();
