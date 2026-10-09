const puppeteer = require('puppeteer');

async function main() {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const pages = await browser.pages();
    const page = pages.find(p => p.url().includes('sc-domain%3Aabam.kr'));
    if (!page) {
      console.log('GSC page not found!');
      return;
    }

    console.log('Focusing inspection input...');
    const selector = 'input[aria-label*="모든 URL 검사"]';
    await page.waitForSelector(selector, { timeout: 5000 });
    await page.click(selector);
    
    // Select all and type
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type(selector, 'https://abam.kr/', { delay: 60 });
    console.log('Typed https://abam.kr/ into inspect bar');
    await page.keyboard.press('Enter');

    console.log('Waiting for inspection result (15s)...');
    await new Promise(r => setTimeout(r, 15000));

    // Check if '실제 URL 테스트' or '색인 생성 요청' button exists
    const buttons = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
      return btns.map(b => b.innerText ? b.innerText.trim() : '').filter(t => t.length > 0);
    });
    console.log('Available buttons:', buttons.filter(b => b.includes('색인') || b.includes('테스트') || b.includes('검사')));

    const clicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
      const reqBtn = btns.find(b => b.innerText && b.innerText.includes('색인 생성 요청'));
      if (reqBtn) {
        reqBtn.click();
        return '색인 생성 요청';
      }
      const testBtn = btns.find(b => b.innerText && (b.innerText.includes('실제 URL 테스트') || b.innerText.includes('실제 URL 검사')));
      if (testBtn) {
        testBtn.click();
        return '실제 URL 테스트';
      }
      return null;
    });

    console.log('Clicked action:', clicked);

    if (clicked) {
      console.log('Waiting for modal/process (20s)...');
      await new Promise(r => setTimeout(r, 20000));

      // If it was test live, now click request indexing
      const reqAfter = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
        const reqBtn = btns.find(b => b.innerText && b.innerText.includes('색인 생성 요청'));
        if (reqBtn) {
          reqBtn.click();
          return true;
        }
        return false;
      });
      console.log('Request indexing after test:', reqAfter);
      if (reqAfter) {
        await new Promise(r => setTimeout(r, 10000));
      }

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
    }

    const summary = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.split('\n').map(l => l.trim()).filter(l => l.length > 0).slice(0, 30);
    });
    console.log('=== Page State Summary ===');
    console.log(summary.join('\n'));

    browser.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
