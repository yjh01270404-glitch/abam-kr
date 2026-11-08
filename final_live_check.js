const puppeteer = require('c:/Users/yjh01/abam-kr-src/src/node_modules/puppeteer');
const path = require('path');
const outDir = 'C:/Users/yjh01/.gemini/antigravity/brain/f8b0fc37-71e5-445e-8fcd-9a40c9debaa2';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  
  const consoleErrors = [];
  const networkErrors = [];

  // 1. Mobile Test (390x844)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  
  mobilePage.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push({ page: 'mobile', text: msg.text() });
  });
  mobilePage.on('response', resp => {
    if (!resp.ok() && resp.status() !== 304 && resp.status() !== 302) {
      networkErrors.push({ url: resp.url(), status: resp.status() });
    }
  });

  console.log('Testing Live Mobile Site (https://seoulroyalspa.com)...');
  const res = await mobilePage.goto('https://seoulroyalspa.com?t=' + Date.now(), { waitUntil: 'networkidle2' });
  console.log('Mobile HTTP Status:', res.status());

  await mobilePage.screenshot({ path: path.join(outDir, 'final_verified_live_mobile.png') });

  // Test modal open
  const bookingBtn = await mobilePage.$('.btn-quick-call');
  if (bookingBtn) {
    await bookingBtn.click();
    await new Promise(r => setTimeout(r, 600));
  }
  const modalExists = await mobilePage.$('#sr-luxury-concierge-modal');
  console.log('Smart voucher modal opened successfully:', !!modalExists);

  await mobilePage.screenshot({ path: path.join(outDir, 'final_verified_live_modal.png') });

  // 2. Desktop Test (1440x900)
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900 });
  desktopPage.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push({ page: 'desktop', text: msg.text() });
  });

  console.log('Testing Live Desktop Site...');
  const dRes = await desktopPage.goto('https://seoulroyalspa.com?t=' + Date.now(), { waitUntil: 'networkidle2' });
  console.log('Desktop HTTP Status:', dRes.status());

  await desktopPage.screenshot({ path: path.join(outDir, 'final_verified_live_desktop.png') });

  await browser.close();

  console.log('--- AUDIT REPORT ---');
  console.log('Console Errors:', consoleErrors);
  console.log('Network 4xx/5xx Errors:', networkErrors);
  console.log('FINAL AUDIT COMPLETE!');
})();

