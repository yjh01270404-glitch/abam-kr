const https = require('https');

https.get('https://abam.kr/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    let pos = 0;
    while ((pos = data.indexOf('인천', pos)) !== -1) {
      console.log('Snippet:', data.substring(Math.max(0, pos - 40), Math.min(data.length, pos + 80)));
      pos += 2;
    }
  });
});
