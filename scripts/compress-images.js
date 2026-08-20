const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../public/images/templates');

const imagesToCompress = [
  'autumn_maple_top.png',
  'autumn_maple_bottom.png',
  'navy_gold_top.png',
  'navy_gold_bottom.png',
  'pastel_sakura_top.png',
  'pastel_sakura_bottom.png',
  'autumn_maple_bg.png',
  'navy_gold_bg.png',
  'pastel_sakura_bg.png'
];

async function compress() {
  console.log('Launching browser to compress images...');
  const browser = await puppeteer.launch({ 
    executablePath: 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe' 
  });
  const page = await browser.newPage();

  for (const filename of imagesToCompress) {
    const srcPath = path.join(templatesDir, filename);
    if (!fs.existsSync(srcPath)) {
      console.warn(`File not found: ${srcPath}`);
      continue;
    }

    console.log(`Compressing ${filename}...`);
    const originalBuffer = fs.readFileSync(srcPath);
    const base64Src = `data:image/png;base64,${originalBuffer.toString('base64')}`;

    // We will load the image in a canvas, resize it if necessary (to 600px width for detailed flyer layers to save memory, or keep 1024px, but wait: detailed flyer previewWidth is 600px! So 600px width is perfect!), and compress as jpeg
    const result = await page.evaluate(async (imgSrc, filename) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // If it is a full background, it might be 1024x1024 or similar.
          // Let's check dimensions. We want width to be 600px for detailed flyer slices, 400px for banner backgrounds to save huge amounts of memory and file size!
          let targetWidth = 600;
          if (filename.includes('bg.png')) {
            // It could be used for banner (400px width) or full detailed flyer. Let's make it 600px width.
            targetWidth = 600;
          }
          
          const scale = targetWidth / img.width;
          canvas.width = targetWidth;
          canvas.height = Math.round(img.height * scale);
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Export as JPEG with 0.8 quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(dataUrl);
        };
        img.onerror = (e) => reject(e);
        img.src = imgSrc;
      });
    }, base64Src, filename);

    // Write compressed data back
    const base64Data = result.replace(/^data:image\/jpeg;base64,/, '');
    const newBuffer = Buffer.from(base64Data, 'base64');
    
    // Save as .jpg
    const destFilename = filename.replace('.png', '.jpg');
    const destPath = path.join(templatesDir, destFilename);
    fs.writeFileSync(destPath, newBuffer);
    
    console.log(`Saved compressed image to: ${destFilename} (${originalBuffer.length} bytes -> ${newBuffer.length} bytes, a ${Math.round((1 - newBuffer.length / originalBuffer.length) * 100)}% reduction!)`);
  }

  await browser.close();
  console.log('All images compressed successfully.');
}

compress().catch(console.error);
