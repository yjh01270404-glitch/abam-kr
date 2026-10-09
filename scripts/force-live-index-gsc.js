const puppeteer = require('puppeteer');

async function run() {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const pages = await browser.pages();
    let page = pages.find(p => p.url().includes('search-console'));
    if (!page) {
      page = await browser.newPage();
    }

    console.log('1. Google Search Console 사이트맵 페이지 이동...');
    await page.goto('https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Aabam.kr', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));

    // 기존 sitemap.xml 항목에서 더보기 점 세개 메뉴를 찾아 삭제 후 재등록 시도
    console.log('2. 사이트맵 재제출 강제 갱신 시도...');
    const inputSelector = 'input[aria-label="사이트맵 URL 입력"]';
    await page.waitForSelector(inputSelector, { timeout: 8000 });
    await page.click(inputSelector);
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type(inputSelector, 'sitemap.xml');
    
    // 클릭 제출
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
      const submit = btns.find(b => b.innerText && b.innerText.trim() === '제출');
      if (submit) submit.click();
    });
    console.log('사이트맵 제출 클릭 완료');
    await new Promise(r => setTimeout(r, 5000));

    // 팝업 닫기
    await page.evaluate(() => {
      const okBtns = Array.from(document.querySelectorAll('div[role="dialog"] button'));
      for (const b of okBtns) {
        if (b.innerText && (b.innerText.includes('확인') || b.innerText.includes('OK'))) b.click();
      }
    });

    console.log('3. 핵심 3대 URL 라이브 테스트 및 색인 생성 요청 순차 진행...');
    const TARGET_URLS = [
      'https://abam.kr/',
      'https://abam.kr/seo/%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80',
      'https://abam.kr/seo/%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88'
    ];

    for (const targetUrl of TARGET_URLS) {
      console.log(`\n>>> [URL 라이브 검사 시작] ${targetUrl}`);
      const inspectUrl = `https://search.google.com/search-console/inspect?resource_id=sc-domain%3Aabam.kr&id=${encodeURIComponent(targetUrl)}`;
      await page.goto(inspectUrl, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 5000));

      // '실제 URL 테스트' (Test Live URL) 버튼 찾기
      const liveTested = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
        const liveBtn = btns.find(b => b.innerText && (b.innerText.includes('실제 URL 테스트') || b.innerText.includes('실제 URL 검사') || b.innerText.includes('Test live URL')));
        if (liveBtn) {
          liveBtn.click();
          return true;
        }
        return false;
      });

      if (liveTested) {
        console.log('실제 URL 테스트 버튼 클릭! 구글 봇 실시간 접속 대기 중 (15초)...');
        await new Promise(r => setTimeout(r, 16000));
      }

      // '색인 생성 요청' 클릭
      const requested = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
        const reqBtn = btns.find(b => b.innerText && b.innerText.includes('색인 생성 요청'));
        if (reqBtn) {
          reqBtn.click();
          return true;
        }
        return false;
      });

      if (requested) {
        console.log('색인 생성 요청 버튼 클릭 완료! 구글 큐 등록 대기 중 (8초)...');
        await new Promise(r => setTimeout(r, 8000));
        await page.evaluate(() => {
          const okBtns = Array.from(document.querySelectorAll('div[role="dialog"] button'));
          for (const b of okBtns) {
            if (b.innerText && (b.innerText.includes('확인') || b.innerText.includes('OK'))) b.click();
          }
        });
      }

      const bodyText = await page.evaluate(() => document.body.innerText);
      const lines = bodyText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      console.log(`[검사 결과] ${lines.slice(0, 15).join(' / ')}`);
    }

    console.log('\n모든 URL 실시간 검사 및 강제 색인 큐 등록 완료!');
    browser.disconnect();
  } catch (err) {
    console.error('실행 중 에러:', err);
    process.exit(1);
  }
}

run();
