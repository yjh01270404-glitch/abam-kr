// scripts/request-gsc-reindex.js
const puppeteer = require('puppeteer');

async function main() {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  async function inspectAndRequest(url) {
    console.log(`\n[URL 검사] ${url} 시작...`);
    await page.goto('https://search.google.com/search-console?resource_id=sc-domain%3Aabam.kr', {
      waitUntil: 'networkidle2',
      timeout: 20000,
    }).catch(() => {});
    await new Promise(r => setTimeout(r, 3000));

    const inputSel = 'input[aria-label*="모든 URL 검사"]';
    await page.waitForSelector(inputSel, { timeout: 8000 });
    await page.click(inputSel);
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type(inputSel, url, { delay: 50 });
    await page.keyboard.press('Enter');
    console.log(`- 검색창 입력 및 엔터 완료 (${url})`);

    console.log('- 구글 색인 데이터 조회 대기 중 (14초)...');
    await new Promise(r => setTimeout(r, 14000));

    // '색인 생성 요청' 버튼 클릭 시도
    const result = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
      const reqBtn = btns.find(b => b.innerText && b.innerText.includes('색인 생성 요청'));
      if (reqBtn) {
        reqBtn.click();
        return '색인 생성 요청 버튼 클릭 완료';
      }
      const testBtn = btns.find(b => b.innerText && (b.innerText.includes('실제 URL 테스트') || b.innerText.includes('실제 URL 검사')));
      if (testBtn) {
        testBtn.click();
        return '실제 URL 테스트 버튼 클릭 완료';
      }
      return '버튼 없음: ' + btns.map(b => b.innerText ? b.innerText.trim() : '').filter(t => t.length > 0).slice(0, 10).join(', ');
    });

    console.log(`- 결과: ${result}`);
    await new Promise(r => setTimeout(r, 10000));
  }

  try {
    await inspectAndRequest('https://abam.kr/');
    await page.screenshot({ path: 'C:/Users/yjh01/.gemini/antigravity-ide/brain/a56f7317-774d-4b94-b525-4c562fea0ae2/gsc_inspect_result.png' });
  } finally {
    await page.close();
  }

  console.log('\n모든 재색인 요청 완료.');
}

main().catch(console.error);
