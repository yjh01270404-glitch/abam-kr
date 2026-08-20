const fs = require('fs');
const path = './src/lib/mockData.ts';

let content = fs.readFileSync(path, 'utf8');

const newTalents = `export const talentProfiles: any[] = [
  { id: 101, name: '지연', age: 24, gender: '여', jobType: '텐프로', title: '강남권에서 2년 정도 일했습니다. 성실하게 출근 가능합니다!', pay: '협의(당일결제)', date: '2026-07-07' },
  { id: 102, name: '민서', age: 22, gender: '여', jobType: '퍼블릭', title: '초보입니다. 분위기 잘 맞추고 열심히 배울게요.', pay: '월 1000 이상', date: '2026-07-06' },
  { id: 103, name: '유진', age: 27, gender: '여', jobType: '쩜오', title: '당일지급 되는 곳 찾아요. 강남/서초 선호합니다.', pay: '당일지급(협의)', date: '2026-07-06' },
  { id: 104, name: '수아', age: 21, gender: '여', jobType: '노래방바텐더', title: '노래방알바 찾아요~ 주 3일 출근 가능!', pay: '시급 8만', date: '2026-07-05' },
  { id: 105, name: '하은', age: 25, gender: '여', jobType: '텐카페', title: '경력 많습니다. 지명 많고 사이즈 나옵니다.', pay: '월 1500 이상', date: '2026-07-05' },
  { id: 106, name: '서연', age: 23, gender: '여', jobType: '비서/매니저', title: '낮/저녁 파트타임 매니저 일자리 구합니다.', pay: '협의', date: '2026-07-05' },
  { id: 107, name: '가영', age: 26, gender: '여', jobType: '하이퍼블릭', title: '친구랑 같이 출근할 수 있는 곳 찾아요~', pay: '당일지급', date: '2026-07-04' },
  { id: 108, name: '소희', age: 20, gender: '여', jobType: '룸알바', title: '처음 해보는데 페이 확실하고 안전한 곳 원해요.', pay: '일 100 이상', date: '2026-07-04' },
  { id: 109, name: '보미', age: 28, gender: '여', jobType: '기타/단기', title: '투잡으로 주말만 가능합니다. 금/토 출근!', pay: '협의(당일결제)', date: '2026-07-04' },
  { id: 110, name: '은지', age: 24, gender: '여', jobType: '텐프로', title: '마이달린, 에이스 출신. 대우 확실한 곳만.', pay: '협의', date: '2026-07-03' }
];`;

content = content.replace(/export const talentProfiles:\s*any\[\]\s*=\s*\[\];/, newTalents);
fs.writeFileSync(path, content, 'utf8');
console.log('Talent profiles injected.');
