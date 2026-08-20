const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/scraped_jobs.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const jobs = JSON.parse(rawData);

// Helper function to replicate parsePay
function parsePay(pay) {
  const payStr = (pay || '').trim() || '협의';
  
  if (payStr === '협의' || payStr === '면접') {
    return { badge: '협의', text: payStr };
  }

  let badge = '협의';
  let text = payStr;

  if (payStr.includes('시급')) {
    badge = '시급';
    text = payStr.replace(/^시급\s*/, '');
  } else if (payStr.includes('일급')) {
    badge = '일급';
    text = payStr.replace(/^일급\s*/, '');
  } else if (payStr.includes('월급')) {
    badge = '월급';
    text = payStr.replace(/^월급\s*/, '');
  } else if (payStr.includes('주급')) {
    badge = '주급';
    text = payStr.replace(/^주급\s*/, '');
  } else if (payStr.includes('건당')) {
    badge = '건당';
    text = payStr.replace(/^건당\s*/, '');
  } else if (payStr.includes('콜당')) {
    badge = '건당';
    text = payStr.replace(/^콜당\s*/, '');
  } else if (payStr.toUpperCase().includes('TC') || payStr.toUpperCase().includes('T/C') || payStr.includes('티시')) {
    badge = 'TC';
    text = payStr.replace(/^(TC|T\/C|티시)\s*/i, '');
  } else {
    badge = '급여';
    text = payStr;
  }

  if (!text) {
    text = payStr;
  }

  return { badge, text };
}

let totalCount = jobs.length;
let consultationCount = 0;
let numericCount = 0;

jobs.forEach(job => {
  const parsed = parsePay(job.pay);
  const text = parsed.text.trim();
  
  // Check if it represents consultation / negotiation
  if (text.includes('협의') || text.includes('결정') || text === '면접' || text === '협의' || text === '추후협의') {
    consultationCount++;
  } else {
    numericCount++;
  }
});

console.log('=== STATISTICS ===');
console.log('Total Jobs Analyzed:', totalCount);
console.log('Consultation ("협의" 등) 건수:', consultationCount);
console.log('Actual Numeric/Text Amounts 건수:', numericCount);
console.log('Percentages: Consultation:', ((consultationCount/totalCount)*100).toFixed(2) + '%, Actual:', ((numericCount/totalCount)*100).toFixed(2) + '%');

console.log('\n=== SAMPLE 20 JOBS COMPARISON ===');
const samples = jobs.slice(0, 20);
samples.forEach((job, index) => {
  const parsed = parsePay(job.pay);
  const rendered = `[${parsed.badge}] ${parsed.text}`;
  console.log(`${index + 1}. ID: ${job.id} | Company: ${job.companyName} | Raw crawled: "${job.pay}" | Final Rendered: "${rendered}"`);
});
