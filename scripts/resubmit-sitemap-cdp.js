const puppeteer = require('puppeteer');

async function main() {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const pages = await browser.pages();
    let page = pages.find(p => p.url().includes('sitemaps'));
    if (!page) {
      page = await browser.newPage();
      await page.goto('https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Aabam.kr', { waitUntil: 'networkidle2' });
    }
    
    console.log('Focusing sitemap URL input...');
    const selector = 'input[aria-label="사이트맵 URL 입력"]';
    await page.waitForSelector(selector, { timeout: 5000 });
    
    await page.click(selector);
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type(selector, 'sitemap.xml', { delay: 80 });
    console.log('Typed sitemap.xml into input!');

    await new Promise(r => setTimeout(r, 1000));

    // Click 제출 button
    const clicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, div[role="button"]'));
      for (const b of buttons) {
        if (b.innerText && b.innerText.trim() === '제출') {
          b.click();
          return true;
        }
      }
      return false;
    });
    console.log('Submit button clicked:', clicked);

    // Wait 6 seconds for Google popup
    await new Promise(r => setTimeout(r, 6000));

    // Confirm popup
    await page.evaluate(() => {
      const okBtns = Array.from(document.querySelectorAll('div[role="dialog"] button'));
      for (const btn of okBtns) {
        if (btn.innerText && (btn.innerText.includes('확인') || btn.innerText.includes('OK') || btn.innerText.includes('Got it'))) {
          btn.click();
          break;
        }
      }
    });

    await new Promise(r => setTimeout(r, 3000));

    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('=== GSC SITEMAP PAGE SUMMARY ===');
    const lines = bodyText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    console.log(lines.slice(0, 35).join('\n'));

    browser.disconnect();
  } catch (err) {
    console.error('Error during GSC sitemap resubmit:', err);
    process.exit(1);
  }
}

main();
