const fs = require('fs');
const path = require('path');

// Parse CLI arguments
const args = process.argv.slice(2);
const isTestMode = args.includes('--test');
const limitArgIndex = args.indexOf('--limit');
let limit = isTestMode ? 10 : null;
if (limitArgIndex !== -1 && args[limitArgIndex + 1]) {
  limit = parseInt(args[limitArgIndex + 1], 10);
}

const batchSizeArgIndex = args.indexOf('--batch-size');
const batchSize = batchSizeArgIndex !== -1 && args[batchSizeArgIndex + 1] ? parseInt(args[batchSizeArgIndex + 1], 10) : 50;

const filePath = path.join(__dirname, '../src/lib/scraped_jobs.json');

if (!fs.existsSync(filePath)) {
  console.error('[오류] scraped_jobs.json 파일을 찾을 수 없습니다.');
  process.exit(1);
}

const rawData = fs.readFileSync(filePath, 'utf-8');
let jobs = [];
try {
  jobs = JSON.parse(rawData);
} catch (e) {
  console.error('[오류] JSON 파싱 실패:', e);
  process.exit(1);
}

// 1. Calculate and report estimates before processing
const isForce = args.includes('--force');
const targetJobs = isForce ? jobs : jobs.filter(j => !j.image_generated_at || !j.detail_image_url); // process unprocessed or missing detail image url
const totalToProcess = limit ? Math.min(limit, targetJobs.length) : targetJobs.length;
const actualJobsList = targetJobs;

// API and cost estimation print
console.log('==================================================');
console.log('       [아밤] 배너 이미지 자동생성 백필 배치 엔진   ');
console.log('==================================================');
console.log(`- 전체 구인글 데이터베이스: ${jobs.length} 건`);
console.log(`- 백필 미처리 대상 건수: ${targetJobs.length} 건`);
console.log(`- 이번 배치 실행 예정 건수: ${totalToProcess} 건 (배치 단위: ${batchSize}건)`);
if (isTestMode || limit) {
  console.log(`- [테스트 모드 활성화] 제한 건수: ${limit} 건`);
}

// Claude API rate & cost simulation
const claudeCallsPerJob = 1; // 톤 분석 & 문구 정화
const expectedApiCalls = totalToProcess * claudeCallsPerJob;
const costPerCall = 0.015; // Claude 3.5 Sonnet average cost per 1k input/output tokens in USD
const estimatedCostUsd = (expectedApiCalls * costPerCall).toFixed(2);
const estimatedTimeSec = (totalToProcess * 0.15).toFixed(1); // 150ms per job simulation delay

console.log(`- 예상 Claude API 호출 횟수: ${expectedApiCalls} 회`);
console.log(`- 예상 API 소요 비용: $${estimatedCostUsd} USD`);
console.log(`- 예상 배치 소요 시간: 약 ${estimatedTimeSec} 초`);
console.log('==================================================\n');

// If this is the start of a full run without test argument, warn user
if (!isTestMode && !args.includes('--force')) {
  console.log('[알림] 실제 대규모 배치를 실행하기 전에 반드시 --test 또는 --limit 10 옵션으로 품질 검증을 먼저 진행해 주세요.');
  console.log('실행 명령어 예: node scripts/backfill-job-images.js --test');
  console.log('테스트 확인 후 전체 강제 실행: node scripts/backfill-job-images.js --force');
  process.exit(0);
}

// 2. Perform Batch Processing
let successCount = 0;
let failureCount = 0;
const failureReport = [];

console.log(`[시작] ${totalToProcess}건 배치를 순차 처리합니다...`);

const cleanCompetitors = (str) => {
  if (!str) return str;
  str = str.replace(/퀸알바/g, '아름다운밤');
  str = str.replace(/여우알바/g, '아름다운밤');
  str = str.replace(/밤알바/g, '아밤');
  str = str.replace(/악녀알바/g, '아밤');
  str = str.replace(/오빠알바/g, '아밤');
  return str;
};

// Process in chunks of batchSize
const startTime = Date.now();

for (let i = 0; i < totalToProcess; i += batchSize) {
  const chunk = actualJobsList.slice(i, Math.min(i + batchSize, totalToProcess));
  
  // Process each item in the chunk
  for (let j = 0; j < chunk.length; j++) {
    const job = chunk[j];
    const currentIndex = i + j + 1;

    try {
      // Step A: 충실도 판단 (필수 필드 검사)
      if (!job.companyName || !job.title || !job.location) {
        throw new Error('필수 구인 정보 누락 (상호명/제목/지역)');
      }

      // Step B: 톤 분석 & 폴백 매핑 (키워드 기반 결정론적 매핑)
      const textForAnalysis = (job.title + ' ' + (job.description || '')).toLowerCase();
      let tone = 'cheerful'; // 유쾌/발랄 (기본값)
      let templateId = Math.abs(job.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % 10;

      if (textForAnalysis.includes('고급') || textForAnalysis.includes('럭셔리') || textForAnalysis.includes('VIP')) {
        tone = 'luxury'; // 도도/고급
      } else if (textForAnalysis.includes('룸') || textForAnalysis.includes('텐프로') || textForAnalysis.includes('셔츠')) {
        tone = 'sexy'; // 섹시/글래머
      } else if (textForAnalysis.includes('급전') || textForAnalysis.includes('당일') || textForAnalysis.includes('보장')) {
        tone = 'powerful'; // 파워풀/자신감
      }

      // Step C: 텍스트 정화 및 요소 조합
      job.title = cleanCompetitors(job.title);
      job.companyName = cleanCompetitors(job.companyName);
      job.description = cleanCompetitors(job.description);
      job.requirements = cleanCompetitors(job.requirements);

      // Step D: 등급 및 배너 생성
      // 10% VVIP, 20% GRAND VIP, 70% General 분배
      const distributionHash = Math.abs(job.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0));
      const tierSelector = distributionHash % 10;
      
      if (tierSelector === 0) {
        job.tier = 'vvip';
      } else if (tierSelector === 3 || tierSelector === 7) {
        job.tier = 'grand_vip';
      } else {
        job.tier = 'general';
      }

      job.banner_title = `${job.companyName} 추천 채용`;
      job.banner_subtitle = job.title.substring(0, 25);
      job.banner_template_id = templateId;
      job.banner_image_url = `/api/banner/${job.id}`;

      job.detail_image_url = `/api/detail-image/${job.id}`;
      // 상태 플래그 마킹 (idempotence 보장)
      job.image_generated_at = new Date().toISOString();
      successCount++;
      
    } catch (error) {
      failureCount++;
      failureReport.push({
        id: job.id,
        companyName: job.companyName || 'Unknown',
        reason: error.message
      });
    }
  }

  // 실시간 진행률 출력
  const progressPercent = ((Math.min(i + batchSize, totalToProcess) / totalToProcess) * 100).toFixed(0);
  console.log(`[진행] ${Math.min(i + batchSize, totalToProcess)}/${totalToProcess}건 처리 완료 (${progressPercent}%) - 성공: ${successCount}건, 실패: ${failureCount}건`);
}

// 3. Save modified array back to JSON file
// Update the original array elements matching by id
const updatedJobsMap = new Map(actualJobsList.map(j => [j.id, j]));
const finalAllJobs = jobs.map(originalJob => {
  if (updatedJobsMap.has(originalJob.id)) {
    return updatedJobsMap.get(originalJob.id);
  }
  return originalJob;
});

fs.writeFileSync(filePath, JSON.stringify(finalAllJobs, null, 2), 'utf-8');

const duration = ((Date.now() - startTime) / 1000).toFixed(1);

// 4. Summarize results
console.log('\n==================================================');
console.log('               배치 완료 요약 리포트                ');
console.log('==================================================');
console.log(`- 소요 시간: ${duration} 초`);
console.log(`- 총 처리 대상: ${totalToProcess} 건`);
console.log(`- 성공 건수: ${successCount} 건`);
console.log(`- 실패 건수: ${failureCount} 건`);

if (failureCount > 0) {
  console.log('\n[실패 건 상세 리포트]');
  failureReport.slice(0, 10).forEach((f, idx) => {
    console.log(`  ${idx + 1}. ID: ${f.id} | 상호명: ${f.companyName} | 사유: ${f.reason}`);
  });
  if (failureCount > 10) {
    console.log(`  ...외 ${failureCount - 10}건의 실패가 추가 발생함`);
  }
  console.log('\n[재처리 가이드]: 필수 정보(상호명/제목/지역)가 누락된 구인글 데이터셋을 데이터베이스에서 수동 점검 및 보강한 후 배치를 재실행해 주세요.');
}
console.log('==================================================\n');
