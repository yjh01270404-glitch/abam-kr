const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, '../src/assets');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Download Jua and Gugi/Gaegu fonts for decorative titles and body elements
const fonts = [
  {
    name: 'Jua-Regular.ttf',
    url: 'https://github.com/google/fonts/raw/main/ofl/jua/Jua-Regular.ttf'
  },
  {
    name: 'Gaegu-Regular.ttf',
    url: 'https://github.com/google/fonts/raw/main/ofl/gaegu/Gaegu-Regular.ttf'
  }
];

function downloadFont(f) {
  return new Promise((resolve, reject) => {
    const dest = path.join(dir, f.name);
    const file = fs.createWriteStream(dest);
    console.log(`Downloading ${f.name}...`);
    
    https.get(f.url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`${f.name} downloaded successfully!`);
            resolve();
          });
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`${f.name} downloaded successfully!`);
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error(`Error downloading ${f.name}:`, err.message);
      reject(err);
    });
  });
}

async function run() {
  for (const f of fonts) {
    await downloadFont(f).catch(console.error);
  }
}

run();
