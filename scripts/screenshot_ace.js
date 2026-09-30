const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('https://abam.kr', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Find element containing '에이스 민서'
  const card = await page.evaluateHandle(() => {
    const els = Array.from(document.querySelectorAll('div'));
    return els.find(el => el.textContent && el.textContent.includes('에이스 민서') && el.textContent.includes('민서 카톡지명'));
  });

  if (card) {
    await card.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await new Promise(r => setTimeout(r, 1000));
    await card.screenshot({
      path: 'C:/Users/yjh01/.gemini/antigravity-ide/brain/1bce8b1b-8781-4f32-a9ea-510a5b3e44f8/ace_profiles_mobile.png'
    });
    console.log('SUCCESS_CARD');
  } else {
    console.log('Card not found');
  }

  await browser.close();
})();
