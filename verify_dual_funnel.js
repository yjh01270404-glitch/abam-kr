const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  
  // 1. Mobile Test (390x844)
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('https://seoulroyalspa.com?t=' + Date.now(), { waitUntil: 'networkidle2' });
  
  await page.screenshot({ path: 'C:/Users/yjh01/.gemini/antigravity/brain/f8b0fc37-71e5-445e-8fcd-9a40c9debaa2/srs_dual_funnel_mobile_hero.png' });

  // Expose window.open spy
  let openedUrl = null;
  await page.exposeFunction('onWindowOpen', (url) => { openedUrl = url; });
  await page.evaluate(() => {
    window.open = function(url) { window.onWindowOpen(url); };
  });

  // Click WhatsApp Quick Inquiry button
  const inquiryBtn = await page.$('.btn-quick-wa');
  if (inquiryBtn) {
    await inquiryBtn.click();
  }
  await new Promise(r => setTimeout(r, 600));

  const modalAfterInquiry = await page.$('#sr-luxury-concierge-modal');
  console.log('Inquiry click window.open:', openedUrl);
  console.log('Modal after inquiry exists?:', !!modalAfterInquiry);

  // Click Instant Booking button
  const bookingBtn = await page.$('.btn-quick-call');
  if (bookingBtn) {
    await bookingBtn.click();
  }
  await new Promise(r => setTimeout(r, 800));

  const modalAfterBooking = await page.$('#sr-luxury-concierge-modal');
  console.log('Modal after booking click exists?:', !!modalAfterBooking);

  await page.screenshot({ path: 'C:/Users/yjh01/.gemini/antigravity/brain/f8b0fc37-71e5-445e-8fcd-9a40c9debaa2/srs_dual_funnel_mobile_modal.png' });

  // 2. Desktop Test (1440x900)
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900 });
  await desktopPage.goto('https://seoulroyalspa.com?t=' + Date.now(), { waitUntil: 'networkidle2' });
  await desktopPage.screenshot({ path: 'C:/Users/yjh01/.gemini/antigravity/brain/f8b0fc37-71e5-445e-8fcd-9a40c9debaa2/srs_dual_funnel_desktop_hero.png' });

  await browser.close();
  console.log('Dual funnel verification complete successfully!');
})();

