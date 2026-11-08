import puppeteer from 'puppeteer';

async function main() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://abam.kr/?t=' + Date.now(), { waitUntil: 'networkidle2' });

  const info = await page.evaluate(() => {
    const img = document.querySelector('img[alt="프리미엄 호텔 전담 힐링"]');
    if (!img) return 'no img';
    let curr = img;
    const chain = [];
    while (curr && curr !== document.body) {
      const s = window.getComputedStyle(curr);
      chain.push({
        tag: curr.tagName,
        class: curr.className,
        display: s.display,
        visibility: s.visibility,
        opacity: s.opacity,
        height: curr.offsetHeight,
        width: curr.offsetWidth,
      });
      curr = curr.parentElement;
    }
    return chain;
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

main().catch(console.error);

