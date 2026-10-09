const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://search.google.com/search-console/users?resource_id=https%3A%2F%2Fabam.kr%2F', { waitUntil: 'networkidle2' });
    
    // Click on "소유권 기록" or check all clickable buttons
    const links = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll('a, button, [role="button"]'));
      return all.map(el => ({ text: el.innerText?.trim(), role: el.getAttribute('role'), href: el.href })).filter(x => x.text);
    });
    console.log('Action links on users page:', links);
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
