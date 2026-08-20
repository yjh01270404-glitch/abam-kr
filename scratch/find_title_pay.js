const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/scraped_jobs.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const jobs = JSON.parse(rawData);

const queenJobs = jobs.filter(j => j.id.startsWith('scraped-queen-'));

let matchCount = 0;
queenJobs.slice(0, 50).forEach(job => {
  const title = job.title;
  // Regex to match things like "11만", "16만", "26만", "TC", "티시", "시급", "일급"
  const payRegex = /([0-9]+분|[0-9]+시간|시급|일급|TC|T\/C|티시)\s*([0-9,]+만?원?|\d+)/i;
  const match = title.match(payRegex);
  if (match) {
    matchCount++;
    console.log(`Company: "${job.companyName}" | Title: "${title}" | Extracted Pay: "${match[0]}"`);
  }
});

console.log(`Matched ${matchCount} titles out of first 50`);
