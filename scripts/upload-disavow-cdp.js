const puppeteer = require('puppeteer');
const path = 'c:/Users/yjh01/.gemini/antigravity-ide/scratch/abam-kr/disavow.txt';

async function run() {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const pages = await browser.pages();
    const page = pages.find(p => p.url().includes('disavow-links'));
    if (!page) {
      console.log('Disavow page not found in open tabs!');
      browser.disconnect();
      process.exit(1);
    }
    console.log('Found page:', await page.title(), page.url());

    // Check if input[type=file] already exists
    let fileInput = await page.$('input[type="file"]');
    
    // Look for upload button
    const buttons = await page.$$('button, div[role="button"]');
    let targetBtn = null;
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && (text.includes('거부 목록 업로드') || text.includes('목록 바꾸기') || text.includes('Upload'))) {
        targetBtn = btn;
        console.log('Found upload button:', text.trim());
        break;
      }
    }

    if (targetBtn) {
      const [fileChooser] = await Promise.all([
        page.waitForFileChooser({ timeout: 6000 }).catch(() => null),
        targetBtn.click()
      ]);

      if (fileChooser) {
        console.log('FileChooser triggered! Accepting file:', path);
        await fileChooser.accept([path]);
        console.log('File successfully passed to fileChooser!');
      } else {
        console.log('No fileChooser triggered, checking if fileInput now exists...');
        fileInput = await page.$('input[type="file"]');
        if (fileInput) {
          await fileInput.uploadFile(path);
          console.log('Uploaded via fileInput directly!');
        }
      }
    } else if (fileInput) {
      await fileInput.uploadFile(path);
      console.log('Uploaded to existing fileInput!');
    }

    // Wait 3 seconds
    await new Promise(r => setTimeout(r, 3000));

    // Check for replace/confirm modal
    const dialogButtons = await page.$$('div[role="dialog"] button, div[role="alertdialog"] button');
    for (const dBtn of dialogButtons) {
      const dText = await page.evaluate(el => el.textContent, dBtn);
      if (dText && (dText.includes('바꾸기') || dText.includes('확인') || dText.includes('제출') || dText.includes('업로드'))) {
        console.log('Clicking dialog button:', dText.trim());
        await dBtn.click();
        await new Promise(r => setTimeout(r, 2000));
        break;
      }
    }

    // Read status
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('=== PAGE STATUS RESULT ===');
    const lines = bodyText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    console.log(lines.slice(0, 30).join('\n'));

    browser.disconnect();
  } catch (err) {
    console.error('Error during CDP automation:', err);
    process.exit(1);
  }
}

run();
