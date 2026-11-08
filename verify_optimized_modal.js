const puppeteer = require('c:/Users/yjh01/abam-kr-src/src/node_modules/puppeteer');
const path = require('path');
const outDir = 'C:/Users/yjh01/.gemini/antigravity/brain/f8b0fc37-71e5-445e-8fcd-9a40c9debaa2';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  
  // Mobile test (390x844)
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('https://seoulroyalspa.com?t=' + Date.now(), { waitUntil: 'networkidle2' });

  // Open modal via Instant Booking button
  const bookingBtn = await page.$('.btn-quick-call');
  if (bookingBtn) await bookingBtn.click();
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: path.join(outDir, 'srs_optimized_voucher_modal_top.png') });

  // Select 2 persons
  const g2 = await page.$('#sr-btn-guest-2');
  if (g2) await g2.click();
  await new Promise(r => setTimeout(r, 400));

  // Select Hotel: Four Seasons
  await page.evaluate(() => {
    const sel = document.getElementById('sr-inp-hotel');
    if (sel) {
      sel.value = 'Four Seasons Hotel Seoul';
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const room = document.getElementById('sr-inp-room');
    if (room) {
      room.value = '1805';
      room.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 400));

  // Select Strong Pressure
  const strongBtn = await page.$('#sr-pressure-chips button:last-child');
  if (strongBtn) await strongBtn.click();
  await new Promise(r => setTimeout(r, 400));

  // Scroll modal down to inspect voucher summary & action buttons
  await page.evaluate(() => {
    const body = document.querySelector('#sr-luxury-concierge-modal > div > div:nth-child(2)');
    if (body) body.scrollTop = body.scrollHeight;
  });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({ path: path.join(outDir, 'srs_optimized_voucher_modal_bottom.png') });

  // Check generated WhatsApp URL
  const waHref = await page.evaluate(() => {
    const btn = document.getElementById('sr-btn-send-wa');
    return btn ? decodeURIComponent(btn.href) : '';
  });
  console.log('Generated WhatsApp Voucher Link:\n', waHref);

  await browser.close();
  console.log('Verification finished successfully!');
})();

