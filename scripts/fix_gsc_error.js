const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
  const pages = await browser.pages();
  const page = pages.find(p => p.url().includes('search-console')) || pages[0];
  
  // 1. 닫기 버튼 클릭
  const closed = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
    const closeBtn = btns.find(b => b.innerText && b.innerText.trim() === '닫기');
    if (closeBtn) {
      closeBtn.click();
      return true;
    }
    return false;
  });
  console.log('Close button clicked:', closed);
  await new Promise(r => setTimeout(r, 1500));
  
  // 2. 입력창 확인 및 클리어
  const inputInfo = await page.evaluate(() => {
    const input = document.querySelector('input[aria-label*="사이트맵"]') || document.querySelector('input');
    const form = input ? input.closest('form') || input.parentElement : null;
    const val = input ? input.value : '';
    if (input) {
      input.value = '';
    }
    return {
      inputVal: val,
      parentText: form ? form.innerText : null
    };
  });
  console.log('Input Info:', JSON.stringify(inputInfo, null, 2));

  // 3. 잠시 후 스크린샷 캡처
  await page.screenshot({ path: 'C:/Users/yjh01/.gemini/antigravity-ide/brain/6bdc7c92-f5e2-4e0f-9835-9c3bf2e34ab4/gsc_clean_fixed.png' });
  console.log('CLEAN_SCREENSHOT_SAVED');

  browser.disconnect();
})();
