const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src/app/layout.tsx');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/서울·경기·인천 100% 현장후불제/g, '서울·경기 100% 현장후불제');
content = content.replace(/서울·경기·인천 수도권 전역 자택·호텔 30분 총알도착/g, '서울·경기 전역 자택·호텔 30분 총알도착');
content = content.replace(/'인천출장마사지',\s*/g, '');
content = content.replace(/서울 25개 구 및 경기·인천\(수원·분당·판교·일산·부천·송도·평택 등\) 수도권 전역/g, '서울 25개 구 및 경기(수원·분당·판교·일산·부천·평택·동탄 등) 전역');
content = content.replace(/서울 25개 구 전역 및 경기·인천\(수원·분당·판교·일산·부천·송도 등\) 수도권 핵심 거점/g, '서울 25개 구 전역 및 경기(수원·분당·판교·일산·부천·평택·동탄 등) 주요 거점');
content = content.replace(/서울·경기·인천 출장마사지 · 출장안마 1위 아밤\(Abam\.kr\) \[20대 ACE 총출동\] 전원 20대 에이스 관리사 라인업! 서울·경기·인천 수도권 전역/g, '서울·경기 출장마사지 · 출장안마 1위 아밤(Abam.kr) [20대 ACE 총출동] 전원 20대 에이스 관리사 라인업! 서울·경기 전역');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed layout.tsx Incheon references completely.');
