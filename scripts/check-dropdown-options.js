const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://search.google.com/search-console/users?resource_id=https%3A%2F%2Fabam.kr%2F', { waitUntil: 'networkidle2' });
    
    // Click 사용자 추가
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, [role="button"]'));
      const btn = btns.find(b => b.innerText && b.innerText.includes('사용자 추가'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    
    // Click the dropdown
    await page.evaluate(() => {
      const dropdown = document.querySelector('div[role="combobox"], mat-select, [aria-haspopup="listbox"]');
      if (dropdown) dropdown.click();
      else {
        const selects = Array.from(document.querySelectorAll('*')).filter(e => e.innerText && e.innerText.trim() === '전체');
        if (selects.length > 0) selects[0].click();
      }
    });
    await new Promise(r => setTimeout(r, 1000));
    
    // Read options
    const options = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('[role="option"], mat-option, div'))
        .map(e => e.innerText?.trim())
        .filter(t => t && (t === '전체' || t === '제한됨' || t === '소유자' || t.includes('Owner') || t.includes('Full') || t.includes('소유')));
    });
    console.log('Dropdown options:', Array.from(new Set(options)));
    await page.screenshot({ path: 'scripts/dropdown_options.png' });
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
