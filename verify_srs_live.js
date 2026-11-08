const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to https://seoulroyalspa.com ...');
  await page.goto('https://seoulroyalspa.com/?t=' + Date.now(), { waitUntil: 'networkidle2', timeout: 30000 });

  // 1. Hero & Trust badges
  await page.screenshot({
    path: 'C:/Users/yjh01/.gemini/antigravity/brain/f8b0fc37-71e5-445e-8fcd-9a40c9debaa2/srs_verified_hero.png',
    clip: { x: 0, y: 0, width: 1440, height: 750 }
  });
  console.log('Saved srs_verified_hero.png');

  // 2. Coverage & High-density hotel directory
  const covSection = await page.$('#coverage');
  if (covSection) {
    const box = await covSection.boundingBox();
    if (box) {
      await page.screenshot({
        path: 'C:/Users/yjh01/.gemini/antigravity/brain/f8b0fc37-71e5-445e-8fcd-9a40c9debaa2/srs_verified_coverage.png',
        clip: { x: 0, y: Math.max(0, box.y - 40), width: 1440, height: Math.min(box.height + 80, 1000) }
      });
      console.log('Saved srs_verified_coverage.png');
    }
  }

  // 3. Reviews & Footer
  const revSection = await page.$('#reviews');
  if (revSection) {
    const box = await revSection.boundingBox();
    if (box) {
      await page.screenshot({
        path: 'C:/Users/yjh01/.gemini/antigravity/brain/f8b0fc37-71e5-445e-8fcd-9a40c9debaa2/srs_verified_reviews.png',
        clip: { x: 0, y: Math.max(0, box.y - 40), width: 1440, height: Math.min(box.height + 80, 900) }
      });
      console.log('Saved srs_verified_reviews.png');
    }
  }

  const footer = await page.$('footer');
  if (footer) {
    const box = await footer.boundingBox();
    if (box) {
      await page.screenshot({
        path: 'C:/Users/yjh01/.gemini/antigravity/brain/f8b0fc37-71e5-445e-8fcd-9a40c9debaa2/srs_verified_footer.png',
        clip: { x: 0, y: Math.max(0, box.y - 20), width: 1440, height: Math.min(box.height + 40, 600) }
      });
      console.log('Saved srs_verified_footer.png');
    }
  }

  // Mobile screenshot
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('https://seoulroyalspa.com/?t=' + Date.now(), { waitUntil: 'networkidle2', timeout: 30000 });
  await page.screenshot({
    path: 'C:/Users/yjh01/.gemini/antigravity/brain/f8b0fc37-71e5-445e-8fcd-9a40c9debaa2/srs_verified_mobile.png',
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });
  console.log('Saved srs_verified_mobile.png');

  await browser.close();
  console.log('All verification screenshots complete.');
})();

