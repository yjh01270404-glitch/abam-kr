const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/scraped_jobs.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const jobs = JSON.parse(rawData);

const queenJobs = jobs.filter(j => j.id.startsWith('scraped-queen-'));
const flowerJobs = jobs.filter(j => j.id.startsWith('scraped-flower-'));

console.log('Queen jobs count:', queenJobs.length);
console.log('Flower jobs count:', flowerJobs.length);

const queenPayMap = {};
queenJobs.forEach(job => {
  queenPayMap[job.pay] = (queenPayMap[job.pay] || 0) + 1;
});

const flowerPayMap = {};
flowerJobs.forEach(job => {
  flowerPayMap[job.pay] = (flowerPayMap[job.pay] || 0) + 1;
});

console.log('\n=== QUEEN JOBS PAY DISTRIBUTION ===');
console.log(Object.entries(queenPayMap).sort((a, b) => b[1] - a[1]).slice(0, 10));

console.log('\n=== FLOWER JOBS PAY DISTRIBUTION ===');
console.log(Object.entries(flowerPayMap).sort((a, b) => b[1] - a[1]).slice(0, 10));
