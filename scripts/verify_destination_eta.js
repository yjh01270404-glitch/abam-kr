const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1536, height: 826 });
  
  // Listen to console errors
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.toString()));

  await page.goto('http://localhost:3000/abam-nightman-2026/dispatch', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Wait 3.5s for leaflet tiles and markers
  await new Promise(r => setTimeout(r, 3500));

  // 1. 기본 상태 캡처 (기사 머릿말 위 소요시간 배지 및 표시선 중간 배지 확인)
  await page.screenshot({
    path: 'C:/Users/yjh01/.gemini/antigravity-ide/brain/6bdc7c92-f5e2-4e0f-9835-9c3bf2e34ab4/eta_badges_overview.png',
    fullPage: false
  });
  console.log('OVERVIEW_CAPTURED');

  // 2. 목적지 핀 클릭 (클래스 dest-pin 또는 mid-eta-pin 클릭)
  const clicked = await page.evaluate(() => {
    const destPin = document.querySelector('.dest-pin');
    if (destPin) {
      destPin.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      return true;
    }
    return false;
  });
  console.log('DEST_CLICKED:', clicked);

  // 잠시 대기 후 팝업 및 우측 관제 카드 활성화 상태 캡처
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({
    path: 'C:/Users/yjh01/.gemini/antigravity-ide/brain/6bdc7c92-f5e2-4e0f-9835-9c3bf2e34ab4/dest_clicked_telemetry_view.png',
    fullPage: false
  });
  console.log('DEST_CLICK_VIEW_CAPTURED');

  await browser.close();
})();
