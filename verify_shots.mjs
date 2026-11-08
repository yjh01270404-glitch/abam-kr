import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\yjh01\\.gemini\\antigravity\\brain\\f8b0fc37-71e5-445e-8fcd-9a40c9debaa2';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Seoul Royal Spa Mobile
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('https://seoulroyalspa.com/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(outDir, 'live_srs_mobile_v2.png'), fullPage: false });
  console.log('Saved live_srs_mobile_v2.png');

  // 2. Seoul Royal Spa Desktop
  await page.setViewport({ width: 1280, height: 850 });
  await page.goto('https://seoulroyalspa.com/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(outDir, 'live_srs_desktop_v2.png'), fullPage: false });
  console.log('Saved live_srs_desktop_v2.png');

  // 3. Abam Mobile
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.goto('https://abam.kr/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const headerDetails = await page.evaluate(() => {
    const header = document.querySelector('header');
    if (!header) return null;
    const style = window.getComputedStyle(header);
    const h1 = document.querySelector('h1');
    const h1Style = h1 ? window.getComputedStyle(h1) : null;
    const logoSpan = header.querySelector('span');
    const logoStyle = logoSpan ? window.getComputedStyle(logoSpan) : null;
    return {
      headerBg: style.backgroundColor,
      headerBackdrop: style.backdropFilter || style.webkitBackdropFilter,
      headerZIndex: style.zIndex,
      headerHeight: header.offsetHeight,
      h1Font: h1Style ? h1Style.fontFamily : null,
      logoFont: logoStyle ? logoStyle.fontFamily : null,
      headerText: header.innerText.trim(),
    };
  });
  console.log('Abam Header Details:', JSON.stringify(headerDetails, null, 2));

  await page.screenshot({ path: path.join(outDir, 'abam_mobile_live_verified.png'), fullPage: false });
  console.log('Saved abam_mobile_live_verified.png');

  await page.evaluate(() => window.scrollBy(0, 350));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'abam_mobile_scrolled_verified.png'), fullPage: false });
  console.log('Saved abam_mobile_scrolled_verified.png');

  // 4. Abam Desktop
  await page.setViewport({ width: 1280, height: 850 });
  await page.goto('https://abam.kr/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(outDir, 'live_abam_desktop_v2.png'), fullPage: false });
  console.log('Saved live_abam_desktop_v2.png');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

