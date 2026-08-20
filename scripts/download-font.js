const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, '../src/assets');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const dest = path.join(dir, 'BlackHanSans-Regular.ttf');
const file = fs.createWriteStream(dest);

console.log('Downloading Black Han Sans font...');
https.get('https://github.com/google/fonts/raw/main/ofl/blackhansans/BlackHanSans-Regular.ttf', (response) => {
  if (response.statusCode === 302 || response.statusCode === 301) {
    // Handle redirect (GitHub raw redirects to codeload/raw cdn)
    https.get(response.headers.location, (redirectResponse) => {
      redirectResponse.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Font downloaded successfully!');
      });
    });
  } else {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Font downloaded successfully!');
    });
  }
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error('Error downloading font:', err.message);
});
