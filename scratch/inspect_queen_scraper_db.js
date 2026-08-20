const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\yjh01\\.gemini\\antigravity-ide\\scratch\\queenalba_scraper\\scraped_jobs.json';
if (!fs.existsSync(filePath)) {
  console.log('File does not exist at:', filePath);
  process.exit(1);
}

const rawData = fs.readFileSync(filePath, 'utf-8');
const jobs = JSON.parse(rawData);

console.log('Total jobs in queenalba_scraper/scraped_jobs.json:', jobs.length);

const payMap = {};
jobs.forEach(job => {
  payMap[job.pay] = (payMap[job.pay] || 0) + 1;
});

const sorted = Object.entries(payMap).sort((a, b) => b[1] - a[1]);

console.log('\n=== PAY FIELD DISTRIBUTION IN ORIGINAL DB ===');
sorted.slice(0, 30).forEach(([pay, count], index) => {
  console.log(`${index + 1}. "${pay}": ${count} occurrences`);
});

// Let's print first 10 items
console.log('\n=== FIRST 10 ITEMS ===');
jobs.slice(0, 10).forEach((job, index) => {
  console.log(`${index + 1}. Company: "${job.companyName}" | Pay: "${job.pay}" | Title: "${job.title}"`);
});
