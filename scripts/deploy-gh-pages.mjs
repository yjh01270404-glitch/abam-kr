// scripts/deploy-gh-pages.mjs
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const parasiteDir = path.join(process.cwd(), 'parasite-site');
console.log('Deploying parasite SEO site from:', parasiteDir);

// Clean previous .git if exists
const gitDir = path.join(parasiteDir, '.git');
if (fs.existsSync(gitDir)) {
  fs.rmSync(gitDir, { recursive: true, force: true });
}

function run(cmd, dir = parasiteDir) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd: dir, stdio: 'inherit' });
}

try {
  run('git init');
  run('git config user.name "yjh01270404-glitch"');
  run('git config user.email "yjh01270404@gmail.com"');
  run('git checkout -b gh-pages');
  run('git add -A');
  run('git commit -m "Deploy parasite SEO landing network for Google Page 1"');
  run('git remote add origin https://github.com/yjh01270404-glitch/abam-kr.git');
  console.log('Pushing to gh-pages branch on origin...');
  run('git push -f origin gh-pages');
  console.log('\n✔ GitHub Pages (gh-pages) 배포 완료!');
  console.log('✔ 배포 URL: https://seoul.abam.kr/ (또는 https://yjh01270404-glitch.github.io/abam-kr/)');
} catch (err) {
  console.error('배포 중 에러 발생:', err.message);
  process.exit(1);
}
