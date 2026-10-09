const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1536, height: 826 });
  await page.goto('http://localhost:3000/abam-nightman-2026/dispatch', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Wait 2s
  await new Promise(r => setTimeout(r, 2000));

  // Click '운행 건만 (집중)' button
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('운행 건만')) {
      await btn.click();
      break;
    }
  }

  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({
    path: 'C:/Users/yjh01/.gemini/antigravity-ide/brain/6bdc7c92-f5e2-4e0f-9835-9c3bf2e34ab4/dispatch_filter_moving_view.png',
    fullPage: false
  });

  console.log('MOVING_VIEW_CAPTURED');
  await browser.close();
})();
