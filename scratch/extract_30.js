const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/scraped_jobs.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const jobs = JSON.parse(rawData);

console.log('Total jobs:', jobs.length);
const sample = jobs.slice(0, 30);
sample.forEach((job, idx) => {
  console.log(`[${idx + 1}] ID: ${job.id} | Company: ${job.companyName} | Pay: ${job.pay}`);
});
