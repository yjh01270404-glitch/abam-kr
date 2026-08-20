const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 2600 }); // increased height to capture full flyer clearly

  // Handle all dialogs globally (auto-accept/dismiss to prevent hangs)
  page.on('dialog', async dialog => {
    console.log('Dialog detected:', dialog.message());
    await dialog.accept();
  });

  const dismiss19PlusGate = async () => {
    console.log('Dismissing 19+ gate...');
    try {
      await page.evaluate(() => {
        sessionStorage.setItem('legalWarningAccepted', 'true');
        const btn = document.querySelector('button');
        if (btn && btn.textContent && btn.textContent.includes('동의합니다')) {
          btn.click();
        }
      });
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.log('Error dismissing 19+ gate:', e.message);
    }
  };

  console.log('Navigating to post page...');
  await page.goto('http://localhost:3000/employer/post', { waitUntil: 'networkidle2', timeout: 45000 });
  
  console.log('Injecting logged-in employer session into localStorage...');
  await page.evaluate(() => {
    localStorage.setItem('abam_user', JSON.stringify({ id: 'u_test_employer', nickname: '테스트 사장님', role: 'employer' }));
    sessionStorage.setItem('legalWarningAccepted', 'true');
  });

  console.log('Reloading page to apply login session...');
  await page.reload({ waitUntil: 'networkidle2' });
  await dismiss19PlusGate();

  // 1. Fill Step 1 Inputs with React Value Setter Bypass
  console.log('Filling Step 1...');
  await page.evaluate(() => {
    const setReactInput = (selector, val) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      setter.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    };

    const setReactTextarea = (selector, val) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
      setter.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    };

    const setReactTextareaElement = (el, val) => {
      if (!el) return;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
      setter.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    };

    // Main Fields
    setReactInput('input[placeholder="예: 텐텐 룸카페"]', '청담 하이클래스');
    setReactInput('input[placeholder="예: 선릉 최고 대우 일당 당일정산"]', '★ 청담 최상위 대우 ★ 100% 당일 정산 / 자율 출퇴근');
    setReactTextarea('textarea[placeholder*="예: 선릉역 부근에서"]', '청담동 최고의 럭셔리 매장에서 함께 일할 소중한 파트너를 모집합니다. 최고의 대우와 쾌적한 환경을 약속드립니다.');

    // 4 Interview Q&As
    const qnas = document.querySelectorAll('div[style*="background: rgb(255, 255, 255)"] textarea');
    if (qnas.length >= 4) {
      setReactTextareaElement(qnas[0], '퇴근 시 현금 또는 계좌이체로 즉시 당일 100% 전액 정산해 드립니다. 만근 시 만근 수당 지급합니다.');
      setReactTextareaElement(qnas[1], '주 1일, 주말 알바, 주 5일 등 원하는 스케줄을 자율적으로 조율할 수 있습니다.');
      setReactTextareaElement(qnas[2], '기초부터 차근차근 1대1로 안내하므로 초보자나 대학생도 전혀 걱정하실 필요 없습니다.');
      setReactTextareaElement(qnas[3], '익명성을 완벽 보장하며 어떠한 개인정보도 노출되지 않도록 안심번호 근무를 실시합니다.');
    }

    // 3 PR Fields
    setReactTextarea('textarea[placeholder*="예: 최고급 대기실 1인 1실"]', '최고급 1인 대기실 무료 제공, 만근 보너스 지급, 장거리 차비 전액 지원');
    setReactTextarea('textarea[placeholder*="예: 술 강요 및 텃세가"]', '술 강요나 진상 일절 없는 깔끔하고 텃세 없는 최고 매너 분위기');
    setReactTextarea('textarea[placeholder*="예: 처음 일하시는 두려움을"]', '첫걸음이 두려운 마음을 누구보다 잘 압니다. 안전하고 신뢰할 수 있는 든든한 파트너가 되겠습니다.');

    // Highlight Sentence
    setReactInput('input[placeholder*="예: 초보자도 첫날부터"]', '실장이 이름을 걸고 안전과 최고 대우를 끝까지 책임지고 지켜드리겠습니다!');
  });

  // Upload Business License PDF
  console.log('Uploading business license...');
  const fileInput = await page.$('input[type="file"]');
  await fileInput.uploadFile('C:\\Users\\yjh01\\.gemini\\antigravity-ide\\scratch\\business_license.pdf');
  await new Promise(r => setTimeout(r, 1500));

  // Save Step 1 Screenshot
  console.log('Saving Step 1 screenshot...');
  const step1Path = 'C:\\Users\\yjh01\\.gemini\\antigravity-ide\\brain\\30408fe9-e528-4662-b235-73a84a62ee4d\\flow_step1_inputs.png';
  await page.screenshot({ path: step1Path, fullPage: true });
  console.log('Step 1 saved to:', step1Path);

  // 2. Click Refine Button (Move to Step 2)
  console.log('Clicking Refine button...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const refineBtn = btns.find(b => b.textContent.includes('정제 요청'));
    if (refineBtn) refineBtn.click();
  });
  await new Promise(r => setTimeout(r, 6000));
  await dismiss19PlusGate();

  // Save Step 2 Screenshot
  console.log('Saving Step 2 screenshot...');
  const step2Path = 'C:\\Users\\yjh01\\.gemini\\antigravity-ide\\brain\\30408fe9-e528-4662-b235-73a84a62ee4d\\flow_step2_ai_refined.png';
  await page.screenshot({ path: step2Path, fullPage: true });
  console.log('Step 2 saved to:', step2Path);

  // 3. Click "확인 완료 - 프리뷰 이미지 조판 요청" (Move to Step 3)
  console.log('Clicking Preview button...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const previewBtn = btns.find(b => b.textContent.includes('조판 요청'));
    if (previewBtn) previewBtn.click();
  });
  await new Promise(r => setTimeout(r, 7000));
  await dismiss19PlusGate();

  // Save Step 3 Screenshot
  console.log('Saving Step 3 screenshot...');
  const step3Path = 'C:\\Users\\yjh01\\.gemini\\antigravity-ide\\brain\\30408fe9-e528-4662-b235-73a84a62ee4d\\flow_step3_preview_locked.png';
  await page.screenshot({ path: step3Path, fullPage: true });
  console.log('Step 3 saved to:', step3Path);

  // 4. Click "이대로 진행할게요" (Move to Step 4)
  console.log('Clicking Checkout transition button...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const checkoutBtn = btns.find(b => b.textContent.includes('진행할게요'));
    if (checkoutBtn) checkoutBtn.click();
  });
  await new Promise(r => setTimeout(r, 2000));
  await dismiss19PlusGate();

  // Save Step 4 Screenshot
  console.log('Saving Step 4 screenshot...');
  const step4Path = 'C:\\Users\\yjh01\\.gemini\\antigravity-ide\\brain\\30408fe9-e528-4662-b235-73a84a62ee4d\\flow_step4_checkout.png';
  await page.screenshot({ path: step4Path, fullPage: true });
  console.log('Step 4 saved to:', step4Path);

  // 5. Click "포트원 결제창 열기 및 승인 완료" (Move to Final Page)
  console.log('Clicking Payment button...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const payBtn = btns.find(b => b.textContent.includes('결제창 열기'));
    if (payBtn) payBtn.click();
  });
  await new Promise(r => setTimeout(r, 6000));
  await dismiss19PlusGate();

  // Save Final Detail Page Screenshot
  console.log('Saving Final Detail Page screenshot...');
  const finalPath = 'C:\\Users\\yjh01\\.gemini\\antigravity-ide\\brain\\30408fe9-e528-4662-b235-73a84a62ee4d\\flow_final_detail_unlocked.png';
  await page.screenshot({ path: finalPath, fullPage: true });
  console.log('Final page saved to:', finalPath);

  console.log('E2E Walkthrough Completed Successfully!');
  await browser.close();
})();
