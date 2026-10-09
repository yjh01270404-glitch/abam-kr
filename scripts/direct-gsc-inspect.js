const puppeteer = require('puppeteer');

async function inspectUrl(page, url) {
  console.log(`\n========================================`);
  console.log(`[URL 검사 및 실시간 색인 요청 시작] ${url}`);
  console.log(`========================================`);

  // Activate input via DOM focus and typing
  const focused = await page.evaluate(() => {
    const input = document.querySelector('input.Ax4B8') || document.querySelector('input[aria-label*="검사"]');
    if (input) {
      input.focus();
      input.value = '';
      return true;
    }
    return false;
  });

  if (!focused) {
    console.log('Input focus failed via selector, searching all text inputs...');
  }

  // Type URL via page.keyboard
  await page.keyboard.type(url, { delay: 30 });
  console.log('URL 입력 완료! Enter 누르는 중...');
  await page.keyboard.press('Enter');

  console.log('구글 색인 데이터 조회 대기 (12초)...');
  await new Promise(r => setTimeout(r, 12000));

  // Click '색인 생성 요청' button
  const reqClicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
    const btn = btns.find(b => b.innerText && (b.innerText.includes('색인 생성 요청') || b.innerText.includes('색인 요청')));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  if (reqClicked) {
    console.log('>>> [성공] 색인 생성 요청 버튼 클릭 완료! 구글 큐 등록 대기 중 (12초)...');
    await new Promise(r => setTimeout(r, 12000));

    // Dismiss confirmation dialog
    await page.evaluate(() => {
      const okBtns = Array.from(document.querySelectorAll('div[role="dialog"] button'));
      for (const b of okBtns) {
        if (b.innerText && (b.innerText.includes('확인') || b.innerText.includes('OK') || b.innerText.includes('Got it'))) {
          b.click();
          break;
        }
      }
    });
    console.log('>>> 확인 팝업 닫기 완료!');
  } else {
    console.log('색인 생성 요청 버튼이 없거나 이미 요청됨.');
    const bodyText = await page.evaluate(() => document.body.innerText);
    const lines = bodyText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    console.log(lines.slice(0, 12).join(' / '));
  }
}

async function main() {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const pages = await browser.pages();
    let page = pages.find(p => p.url().includes('search-console'));
    if (!page) {
      page = await browser.newPage();
    }

    console.log('서치콘솔 메인으로 이동...');
    await page.goto('https://search.google.com/search-console?resource_id=sc-domain%3Aabam.kr', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 3000));

    // 1. 메인 홈페이지 색인 요청
    await inspectUrl(page, 'https://abam.kr/');

    browser.disconnect();
  } catch (err) {
    console.error('검사 중 에러:', err);
    process.exit(1);
  }
}

main();
