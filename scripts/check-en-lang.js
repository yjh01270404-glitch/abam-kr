const https = require('https');

https.get('https://abam.kr/en', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status on /en:', res.statusCode);
    const hasKR = data.includes('href="/"') || data.includes('>KR<');
    console.log('Has KR link on /en:', hasKR);
    const headerMatch = data.match(/<header[\s\S]*?<\/header>/);
    if (headerMatch) {
      console.log('Header snippet:', headerMatch[0].replace(/style="[^"]*"/g, ''));
    }
  });
});
