const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/scraped_jobs.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const jobs = JSON.parse(rawData);

const queenJobs = jobs.filter(j => j.id.startsWith('scraped-queen-'));

function extractPayFromTitle(title) {
  if (!title) return null;
  
  // 1. Time + Pay (e.g. "55분 11만", "30분 TC10만", "1시간20분 TC 16", "2시간26만", "50분TC11만", "45분16만")
  const timeRegex = /(\d+)\s*(분|시간)\s*(TC|T\/C|티시)?\s*(\d+)\s*(만\s*원|만원|만|원)?/i;
  const timeMatch = title.match(timeRegex);
  if (timeMatch) {
    const timeNum = timeMatch[1];
    const timeUnit = timeMatch[2];
    const isTc = timeMatch[3];
    const payNum = timeMatch[4];
    const payUnit = timeMatch[5] || '만';
    return `${isTc ? 'TC' : '일급'} ${payNum}${payUnit} (${timeNum}${timeUnit})`;
  }

  // 2. TC + Number + 만/만원/만+ (e.g. "TC 11만", "TC11만", "TC 11", "TC11", "TC 10만", "TC8만원")
  const tcRegex = /(TC|T\/C|티시)\s*(\d+)\s*(만\s*원|만원|만|원)?/i;
  const tcMatch = title.match(tcRegex);
  if (tcMatch) {
    const num = tcMatch[2];
    const unit = tcMatch[3] || '만';
    return `TC ${num}${unit}`;
  }

  // 3. Range (e.g. "100~150만")
  const rangeRegex = /(\d+)\s*(?:~|~~\s*)\s*(\d+)\s*(만)/i;
  const rangeMatch = title.match(rangeRegex);
  if (rangeMatch) {
    return `일급 ${rangeMatch[1]}~${rangeMatch[2]}만`;
  }

  // 4. Standalone "X만" or "X만원"
  const standaloneRegex = /(\d+)\s*(만\s*원|만원|만)/;
  const standaloneMatch = title.match(standaloneRegex);
  if (standaloneMatch) {
    const matchedStr = standaloneMatch[0];
    if (title.includes('시급')) {
      return `시급 ${matchedStr}`;
    }
    return `일급 ${matchedStr}`;
  }

  return null;
}

let extractedCount = 0;
queenJobs.slice(0, 100).forEach((job, idx) => {
  const extracted = extractPayFromTitle(job.title);
  if (extracted) {
    extractedCount++;
    console.log(`${idx + 1}. Company: "${job.companyName}" | Title: "${job.title}" | Parsed Pay: "${extracted}"`);
  } else {
    console.log(`${idx + 1}. [NO MATCH] Company: "${job.companyName}" | Title: "${job.title}"`);
  }
});

console.log(`\nSuccessfully extracted ${extractedCount} out of 100.`);
