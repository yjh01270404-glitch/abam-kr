const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../src/lib/scraped_jobs.json');

if (!fs.existsSync(dbPath)) {
  console.error(`File not found: ${dbPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(dbPath, 'utf8');
const jobs = JSON.parse(raw);

console.log(`Processing ${jobs.length} jobs to sanitize contact information...`);

let modifiedCount = 0;

jobs.forEach(job => {
  const desc = job.description || '';
  
  // Parse phone
  const phoneMatch = desc.match(/☎\s*연락처:\s*([^\s\n]+)/i);
  const correctPhone = phoneMatch ? phoneMatch[1].trim() : '';
  
  // Parse Kakao ID
  const kakaoMatch = desc.match(/💬\s*카카오톡\s*ID:\s*([^\s\n]+)/i);
  const correctKakao = kakaoMatch ? kakaoMatch[1].trim() : '';
  
  // Parse Telegram ID
  const telegramMatch = desc.match(/💬\s*텔레그램\s*ID:\s*([^\s\n]+)/i);
  const correctTelegram = telegramMatch ? telegramMatch[1].trim() : '';
  
  // Compare and update
  if (job.contactPhone !== correctPhone || job.contactKakao !== correctKakao || job.telegram !== correctTelegram) {
    job.contactPhone = correctPhone;
    job.contactKakao = correctKakao;
    job.telegram = correctTelegram;
    modifiedCount++;
  }
});

if (modifiedCount > 0) {
  fs.writeFileSync(dbPath, JSON.stringify(jobs, null, 2), 'utf8');
  console.log(`Successfully updated ${modifiedCount} jobs in the database!`);
} else {
  console.log('No modifications needed. Database is already clean.');
}
