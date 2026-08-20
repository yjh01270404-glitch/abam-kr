const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1800 });

  console.log('Navigating to homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 45000 });

  console.log('Injecting logged-in session...');
  await page.evaluate(() => {
    localStorage.setItem('abam_user', JSON.stringify({ id: 'u_test_employer', nickname: '테스트 사장님', role: 'employer' }));
    sessionStorage.setItem('legalWarningAccepted', 'true');
  });

  console.log('Reloading to apply session and clear old storage cache...');
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  console.log('Scrolling to top headers...');
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 1500));

  console.log('Taking screenshot of VVIP/GRAND VIP area...');
  const outPath = 'C:\\Users\\yjh01\\.gemini\\antigravity-ide\\brain\\30408fe9-e528-4662-b235-73a84a62ee4d\\flow_vvip_grandvip_reseeded.png';
  await page.screenshot({ path: outPath });
  console.log('Saved screenshot to:', outPath);

  await browser.close();
})();
