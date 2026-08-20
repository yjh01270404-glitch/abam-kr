const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/scraped_jobs.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const jobs = JSON.parse(rawData);

const queenJobs = jobs.filter(j => j.id.startsWith('scraped-queen-'));

let count = 0;
queenJobs.forEach(job => {
  // Look for any numbers followed by 만, 원, TC, 티시, 시급, 일급, etc.
  const hasPayInfo = /TC|T\/C|티시|시급|일급|월급|주급|\d+\s*만|\d+\s*원/i.test(job.title);
  if (hasPayInfo) {
    count++;
  }
});

console.log(`Total Queen Jobs: ${queenJobs.length}`);
console.log(`Jobs with pay info in Title: ${count} (${((count/queenJobs.length)*100).toFixed(2)}%)`);
