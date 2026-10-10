const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
  const pages = await browser.pages();
  const page = pages.find(p => p.url().includes('search-console')) || pages[0];
  
  // Click 닫기
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
    const closeBtn = btns.find(b => b.innerText && b.innerText.trim() === '닫기');
    if (closeBtn) closeBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1500));
  
  // Clear input box
  await page.evaluate(() => {
    const input = document.querySelector('input');
    if (input) input.value = '';
  });

  await page.screenshot({ path: 'C:/Users/yjh01/.gemini/antigravity-ide/brain/6bdc7c92-f5e2-4e0f-9835-9c3bf2e34ab4/gsc_final_perfect.png' });
  console.log('FINAL_PERFECT_SCREENSHOT_SAVED');

  browser.disconnect();
})();
