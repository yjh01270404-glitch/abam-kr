import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\yjh01\\.gemini\\antigravity\\brain\\f8b0fc37-71e5-445e-8fcd-9a40c9debaa2';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const logs = [];
  page.on('console', msg => logs.push(msg.text()));
  page.on('pageerror', err => logs.push('PAGE_ERROR: ' + err.message));

  await page.goto('https://seoulroyalspa.com/?t=' + Date.now(), { waitUntil: 'networkidle2' });

  // Click WhatsApp Instant Booking button
  console.log('Clicking WhatsApp button...');
  const waBtn = await page.$('.btn-quick-wa');
  if (waBtn) {
    await waBtn.click();
  } else {
    await page.evaluate(() => {
      const b = document.querySelector('button[onclick*="BookingSlip"]') || document.querySelector('.bottom-bar button');
      if (b) b.click();
    });
  }

  await new Promise(r => setTimeout(r, 1200));

  // Take screenshot of what user sees after clicking WhatsApp!
  await page.screenshot({ path: path.join(outDir, 'srs_after_click_wa_mobile.png') });
  console.log('Saved srs_after_click_wa_mobile.png');

  // Check if modal appeared
  const modalInfo = await page.evaluate(() => {
    const m = document.getElementById('sr-luxury-concierge-modal') || document.querySelector('[role="dialog"]');
    if (!m) return { exists: false };
    return {
      exists: true,
      display: window.getComputedStyle(m).display,
      visibility: window.getComputedStyle(m).visibility,
      zIndex: window.getComputedStyle(m).zIndex,
      innerHTML_sample: m.innerText.slice(0, 300)
    };
  });
  console.log('Modal Info:', modalInfo);
  console.log('Console logs:', logs);

  await browser.close();
}

main();
