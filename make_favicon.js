const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

function generateFavicon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // 배경: 럭셔리 딥 나이트 퍼플 둥근 사각형
  const radius = size * 0.22;
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(size - radius, 0);
  ctx.quadraticCurveTo(size, 0, size, radius);
  ctx.lineTo(size, size - radius);
  ctx.quadraticCurveTo(size, size, size - radius, size);
  ctx.lineTo(radius, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();

  // 핫핑크 네온 테두리
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = size * 0.06;
  ctx.stroke();

  // 초승달 (🌙) 및 밤하늘 럭셔리 그래디언트
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.32;
  const innerR = size * 0.26;

  ctx.save();
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = size * 0.15;

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(cx - size * 0.05, cy, outerR, 0, Math.PI * 2, false);
  ctx.fill();

  // 초승달 모양을 파내기
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(cx + size * 0.08, cy - size * 0.08, innerR, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.restore();

  // 작은 반짝이는 별✨ 추가
  ctx.fillStyle = '#fef08a';
  ctx.font = `bold ${Math.round(size * 0.25)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✨', cx + size * 0.22, cy - size * 0.2);

  return canvas.toBuffer('image/png');
}

const sizes = [
  { path: 'C:/Users/yjh01/.gemini/antigravity-ide/scratch/abam-kr/src/app/icon.png', size: 512 },
  { path: 'C:/Users/yjh01/.gemini/antigravity-ide/scratch/abam-kr/src/app/apple-icon.png', size: 180 },
  { path: 'C:/Users/yjh01/.gemini/antigravity-ide/scratch/abam-kr/public/icon-192.png', size: 192 },
  { path: 'C:/Users/yjh01/.gemini/antigravity-ide/scratch/abam-kr/public/icon-512.png', size: 512 },
  { path: 'C:/Users/yjh01/.gemini/antigravity-ide/scratch/abam-kr/public/apple-touch-icon.png', size: 180 },
  { path: 'C:/Users/yjh01/.gemini/antigravity-ide/scratch/abam-kr/public/favicon.ico', size: 64 },
];

sizes.forEach(({ path: filePath, size }) => {
  const buf = generateFavicon(size);
  fs.writeFileSync(filePath, buf);
  console.log('Generated:', filePath, size);
});
