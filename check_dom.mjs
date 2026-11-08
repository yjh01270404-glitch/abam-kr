import puppeteer from 'puppeteer';

async function main() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://abam.kr/?t=' + Date.now(), { waitUntil: 'networkidle2' });

  const imgs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
      displayed: img.offsetHeight > 0,
    }));
  });

  console.log('Images found:', JSON.stringify(imgs, null, 2));

  // Check section 1 and 2 HTML structure
  const heroHtml = await page.evaluate(() => {
    const s1 = document.querySelector('section');
    return s1 ? s1.outerHTML.substring(0, 1000) : 'none';
  });
  console.log('Section 1 snippet:', heroHtml);

  await browser.close();
}

main().catch(console.error);

