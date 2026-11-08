import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\yjh01\\.gemini\\antigravity\\brain\\f8b0fc37-71e5-445e-8fcd-9a40c9debaa2';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto('https://abam.kr/?t=' + Date.now(), { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Click "전체 지역 보기 ▼" button to expand all 81 links
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('전체 지역 보기'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Scroll to the area links container
  await page.evaluate(() => {
    const el = document.querySelector('a[href*="/seo/"]')?.parentElement?.parentElement;
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'verified_live_dense_grid_regions.png') });

  await browser.close();
  console.log('DENSE GRID REGIONS SCREENSHOT CAPTURED');
}

main();

