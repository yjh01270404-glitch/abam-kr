const https = require('https');

https.get('https://abam.kr/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const heroMatch = data.match(/<section[\s\S]*?<\/section>/);
    if (heroMatch) {
      console.log('Hero clean text:');
      console.log(heroMatch[0].replace(/<[^>]+>/g, '\n').split('\n').map(s => s.trim()).filter(Boolean).join(' | '));
    }
  });
});
