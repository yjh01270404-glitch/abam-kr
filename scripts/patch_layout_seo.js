const fs = require('fs');
const path = 'src/app/layout.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. keywords 교체
const newKeywords = `  keywords: [
    '출장마사지',
    '출장안마',
    '후불제출장마사지',
    '서울출장마사지',
    '호텔출장마사지',
    '출장홈타이',
    '방문마사지',
    '아밤',
    'Abam.kr',
  ].join(', '),`;

content = content.replace(/  keywords: \[[\s\S]*?\]\.join\(', '\),/, newKeywords);

// 2. AggregateRating 제거
content = content.replace(/\s+aggregateRating: \{[\s\S]*?\},/, '');

// 3. sameAs 제거
content = content.replace(/\s+sameAs: \[[\s\S]*?\],/, '');

fs.writeFileSync(path, content, 'utf8');
console.log('SUCCESS: layout.tsx cleaned up');
