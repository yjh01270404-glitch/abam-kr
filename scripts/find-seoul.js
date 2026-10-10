const https = require('https');

https.get('https://abam.kr/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    let pos = 0;
    while ((pos = data.indexOf('서울 전역', pos)) !== -1) {
      console.log('Snippet:', data.substring(Math.max(0, pos - 50), Math.min(data.length, pos + 80)));
      pos += 5;
    }
  });
});
