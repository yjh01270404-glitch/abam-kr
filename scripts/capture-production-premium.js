const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1800 });

  const url = 'https://abam.kr';
  console.log(`Navigating to production server at ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  console.log('Injecting logged-in session...');
  await page.evaluate(() => {
    localStorage.setItem('abam_user', JSON.stringify({ id: 'u_test_employer', nickname: '테스트 사장님', role: 'employer' }));
    sessionStorage.setItem('legalWarningAccepted', 'true');
  });

  console.log('Reloading to apply session...');
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));

  console.log('Scrolling down to PREMIUM/Priority area...');
  await page.evaluate(() => {
    // Scroll to PREMIUM heading
    const headings = Array.from(document.querySelectorAll('h3'));
    const premiumHeading = headings.find(h => h.textContent.includes('PREMIUM') || h.textContent.includes('핫 구인'));
    if (premiumHeading) {
      premiumHeading.scrollIntoView({ block: 'start' });
    } else {
      window.scrollTo(0, 1100); // fallback scroll
    }
  });
  await new Promise(r => setTimeout(r, 2000));

  console.log('Taking screenshot...');
  const outPath = 'C:\\Users\\yjh01\\.gemini\\antigravity-ide\\brain\\30408fe9-e528-4662-b235-73a84a62ee4d\\premium_production_banners.png';
  await page.screenshot({ path: outPath });
  console.log('Saved screenshot to:', outPath);

  await browser.close();
})();
