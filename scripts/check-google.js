const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.goto('https://www.google.com/search?q=%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80&hl=ko', { waitUntil: 'networkidle2' });
    const results = await page.evaluate(() => {
      const items = [];
      const blocks = document.querySelectorAll('div.g, div[data-sokoban-container], .MjjYud');
      blocks.forEach(el => {
        const h3 = el.querySelector('h3');
        const a = el.querySelector('a');
        if (h3 && a && a.href && !a.href.includes('google.com')) {
          items.push({
            title: h3.innerText,
            url: a.href
          });
        }
      });
      return items;
    });
    console.log('Top Results:');
    console.log(JSON.stringify(results.slice(0, 15), null, 2));
    await page.close();
  } catch (err) {
    console.error(err);
  }
})();
