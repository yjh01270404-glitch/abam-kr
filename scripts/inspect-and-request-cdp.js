const puppeteer = require('puppeteer');

async function main() {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const pages = await browser.pages();
    let page = pages.find(p => p.url().includes('search-console'));
    if (!page) {
      page = await browser.newPage();
      await page.goto('https://search.google.com/search-console?resource_id=sc-domain%3Aabam.kr', { waitUntil: 'networkidle2' });
    } else {
      await page.goto('https://search.google.com/search-console?resource_id=sc-domain%3Aabam.kr', { waitUntil: 'networkidle2' });
    }

    await new Promise(r => setTimeout(r, 2000));

    // Type in top inspection bar
    const barSelector = 'input[aria-label*="모든 URL 검사"]';
    await page.waitForSelector(barSelector, { timeout: 6000 });
    await page.click(barSelector);
    await page.type(barSelector, 'https://abam.kr/', { delay: 50 });
    await page.keyboard.press('Enter');
    console.log('Inspection triggered for https://abam.kr/ !');

    // Wait for inspection data to load
    await new Promise(r => setTimeout(r, 10000));

    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('=== INSPECTION RESULT ===');
    const lines = bodyText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    console.log(lines.slice(0, 35).join('\n'));

    // If '색인 생성 요청' button exists, click it
    const requested = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
      const reqBtn = btns.find(b => b.innerText && b.innerText.includes('색인 생성 요청'));
      if (reqBtn) {
        reqBtn.click();
        return true;
      }
      return false;
    });
    console.log('Request indexing button clicked:', requested);

    if (requested) {
      await new Promise(r => setTimeout(r, 8000));
      // Dismiss dialog
      await page.evaluate(() => {
        const okBtns = Array.from(document.querySelectorAll('div[role="dialog"] button'));
        for (const btn of okBtns) {
          if (btn.innerText && (btn.innerText.includes('확인') || btn.innerText.includes('OK') || btn.innerText.includes('Got it'))) {
            btn.click();
            break;
          }
        }
      });
      console.log('Dialog dismissed.');
    }

    browser.disconnect();
  } catch (err) {
    console.error('Error during inspection:', err);
    process.exit(1);
  }
}

main();
