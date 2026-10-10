const fs = require('fs');

const targetFile = 'src/components/AbamLanding.tsx';
let content = fs.readFileSync(targetFile, 'utf8');

// 히어로를 main 바깥으로 빼내어 100% 풀 블리드로 전환
// 기존: <main className="abam-container"...> <section style={{ position: 'relative', width: '100%', minHeight: '82vh' ... </section> {/* ── 3. 출장안마 서비스 안내 ── */}
// 변경: <section style={{ position: 'relative', width: '100%', minHeight: '82vh' ... </section> <main className="abam-container" ...> {/* ── 3. 출장안마 서비스 안내 ── */}

const mainTag = '<main className="abam-container" style={{ position: \'relative\', zIndex: 1, wordBreak: \'keep-all\' }}>';
const heroMarker = '{/* ── 2. 스피드출장 정석 비율: 화보 전면 풀스크린 히어로 (Full-Bleed 100% Background Hero) ── */}';
const introMarker = '{/* ── 3. 출장안마 서비스 안내 ── */}';

const mainIdx = content.indexOf(mainTag);
const heroIdx = content.indexOf(heroMarker);
const introIdx = content.indexOf(introMarker);

if (mainIdx === -1 || heroIdx === -1 || introIdx === -1) {
  console.error('Indices not found:', { mainIdx, heroIdx, introIdx });
  process.exit(1);
}

// hero block 추출 (heroMarker부터 introMarker 직전까지)
const heroBlock = content.substring(heroIdx, introIdx);

// mainTag와 heroBlock 위치를 맞바꿔서, hero가 main 위에 오도록 재배치
const beforeMain = content.substring(0, mainIdx);
const afterIntro = content.substring(introIdx);

const restructured = beforeMain + heroBlock + mainTag + '\n\n        ' + afterIntro;

fs.writeFileSync(targetFile, restructured, 'utf8');
console.log('Successfully moved Hero outside of main container for 100% full-bleed display!');
