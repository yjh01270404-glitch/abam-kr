const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/scraped_jobs.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const jobs = JSON.parse(rawData);

const payMap = {};
jobs.forEach(job => {
  payMap[job.pay] = (payMap[job.pay] || 0) + 1;
});

const sorted = Object.entries(payMap).sort((a, b) => b[1] - a[1]);

console.log('=== UNIQUE PAY FIELDS IN JSON ===');
sorted.slice(0, 30).forEach(([pay, count], index) => {
  console.log(`${index + 1}. "${pay}": ${count} occurrences`);
});
