const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/scraped_jobs.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const jobs = JSON.parse(rawData);

const queenJobs = jobs.filter(j => j.id.startsWith('scraped-queen-'));
console.log('Queen jobs total:', queenJobs.length);

// Let's look at 10 sample descriptions
for (let i = 0; i < 10; i++) {
  const job = queenJobs[i * 100]; // Spread out
  console.log(`\nSample ${i + 1}: ID: ${job.id} | Company: ${job.companyName}`);
  console.log('Pay field in JSON:', job.pay);
  // Show first 150 chars of description
  console.log('Description start:', job.description ? job.description.substring(0, 180) : 'none');
}
