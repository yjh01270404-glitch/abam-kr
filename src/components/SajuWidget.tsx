'use client';

import { useState } from 'react';
import styles from './SajuWidget.module.css';

// 천간 (10 Heavenly Stems)
const CHEONGAN = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const CHEONGAN_HANJA = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 지지 (12 Earthly Branches)
const JIJI = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
const JIJI_HANJA = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 오행 (5 Elements)
const OHAENG = ['목', '목', '화', '화', '토', '토', '금', '금', '수', '수'];
const OHAENG_EMOJI: Record<string, string> = { 목: '🌿', 화: '🔥', 토: '🌏', 금: '💎', 수: '💧' };

const TIME_SLOTS = [
  { label: '모름', value: 'unknown' },
  { label: '자시 (23:30~01:29)', value: '자' },
  { label: '축시 (01:30~03:29)', value: '축' },
  { label: '인시 (03:30~05:29)', value: '인' },
  { label: '묘시 (05:30~07:29)', value: '묘' },
  { label: '진시 (07:30~09:29)', value: '진' },
  { label: '사시 (09:30~11:29)', value: '사' },
  { label: '오시 (11:30~13:29)', value: '오' },
  { label: '미시 (13:30~15:29)', value: '미' },
  { label: '신시 (15:30~17:29)', value: '신' },
  { label: '유시 (17:30~19:29)', value: '유' },
  { label: '술시 (19:30~21:29)', value: '술' },
  { label: '해시 (21:30~23:29)', value: '해' },
];

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

const GENERAL_FORTUNES = [
  { title: '귀인의 도움을 받는 날', desc: '어려움에 처하더라도 주변의 뜻밖의 도움으로 쉽게 해결되는 운세입니다. 평소 쌓아둔 덕이 빛을 발합니다.' },
  { title: '마음의 평화가 찾아오는 날', desc: '모든 일이 순리대로 흘러가며, 내면의 안정을 찾게 됩니다. 무리한 계획보다는 현재에 충실하는 것이 좋습니다.' },
  { title: '새로운 기회가 열리는 날', desc: '오랫동안 준비했던 일에서 긍정적인 신호가 보입니다. 자신감을 가지고 도전한다면 좋은 성과를 거둘 수 있습니다.' },
  { title: '재물이 모이는 풍요로운 날', desc: '금전적인 흐름이 원활해지며, 기대 이상의 수익이나 보너스를 얻을 수 있는 길일입니다.' },
  { title: '인간관계가 회복되는 날', desc: '서먹했던 사람과의 오해가 풀리고 관계가 돈독해집니다. 먼저 다가가는 용기가 행운을 부릅니다.' },
  { title: '뜻밖의 기쁨이 있는 날', desc: '우연한 기회에 반가운 소식을 듣거나 소소한 행복을 경험하게 됩니다. 작은 일에도 감사하는 마음을 가지세요.' },
  { title: '노력의 결실을 맺는 날', desc: '그동안 흘린 땀방울이 보상받는 시기입니다. 중요한 성과를 거두어 주위의 인정을 받게 됩니다.' },
  { title: '새로운 인연이 시작되는 날', desc: '당신의 삶에 긍정적인 영향을 미칠 새로운 사람을 만나게 됩니다. 마음을 열고 대화하세요.' }
];

const MONEY_FORTUNES = ['지출 관리에 신경 써야 할 때입니다.', '재물운이 상승 곡선을 그립니다.', '뜻밖의 용돈이나 부수입이 생길 수 있습니다.', '투자는 신중하게, 저축에 힘쓰세요.'];
const LOVE_FORTUNES = ['상대방의 마음을 이해하려는 노력이 필요합니다.', '새로운 만남의 기운이 강하게 들어옵니다.', '오랜 연인과 더욱 깊은 사랑을 확인합니다.', '솔로라면 외모 단장에 신경 써보세요.'];
const WORK_FORTUNES = ['업무에 집중도가 올라가 성과가 좋습니다.', '상사나 동료의 인정을 받게 됩니다.', '새로운 아이디어가 번뜩이는 하루입니다.', '성급한 결정보다는 한 번 더 검토하세요.'];

function getDailyFortune(year: number, month: number, day: number, gender: string, time: string) {
  const today = new Date().toISOString().split('T')[0];
  const seed = `${year}${month}${day}${gender}${time}${today}`;
  const h = hashCode(seed);

  // 연주(태어난 해) 계산
  const stemIdx = (year - 4) % 10;
  const branchIdx = (year - 4) % 12;
  const stem = CHEONGAN[stemIdx < 0 ? stemIdx + 10 : stemIdx];
  const stemHanja = CHEONGAN_HANJA[stemIdx < 0 ? stemIdx + 10 : stemIdx];
  const branch = JIJI[branchIdx < 0 ? branchIdx + 12 : branchIdx];
  const branchHanja = JIJI_HANJA[branchIdx < 0 ? branchIdx + 12 : branchIdx];
  const ohaeng = OHAENG[stemIdx < 0 ? stemIdx + 10 : stemIdx];

  const general = GENERAL_FORTUNES[h % GENERAL_FORTUNES.length];
  const money = MONEY_FORTUNES[(h >> 1) % MONEY_FORTUNES.length];
  const love = LOVE_FORTUNES[(h >> 2) % LOVE_FORTUNES.length];
  const work = WORK_FORTUNES[(h >> 3) % WORK_FORTUNES.length];

  const luckyColors = ['레드', '블랙', '화이트', '그린', '블루', '옐로우', '퍼플', '핑크'];
  const luckyDirs = ['동', '서', '남', '북', '남동', '북서', '남서', '북동'];
  const color = luckyColors[h % luckyColors.length];
  const dir = luckyDirs[(h >> 4) % luckyDirs.length];

  return { stem, stemHanja, branch, branchHanja, ohaeng, general, money, love, work, color, dir };
}

function getTodayDate() {
  const now = new Date();
  return `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
}

export default function SajuWidget() {
  const [gender, setGender] = useState<'M' | 'F'>('F');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthTime, setBirthTime] = useState('unknown');
  
  const [result, setResult] = useState<ReturnType<typeof getDailyFortune> | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const y = parseInt(birthYear);
    const m = parseInt(birthMonth);
    const d = parseInt(birthDay);
    if (!y || !m || !d || y < 1930 || y > 2010 || m < 1 || m > 12 || d < 1 || d > 31) {
      setError('생년월일을 정확히 입력해 주세요.');
      return;
    }
    setError('');
    setResult(getDailyFortune(y, m, d, gender, birthTime));
  };

  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <span className={styles.headerIcon}>🔮</span>
        <div>
          <div className={styles.headerTitle}>오늘의 정통 사주운세</div>
          <div className={styles.headerSub}>{getTodayDate()} 기준 운세풀이</div>
        </div>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <p className={styles.formDesc}>정확한 사주명리학 기반으로<br /><strong>오늘의 운세</strong>를 분석해 드립니다.</p>
          
          <div className={styles.genderRow}>
            <button type="button" className={`${styles.genderBtn} ${gender === 'M' ? styles.genderActiveM : ''}`} onClick={() => setGender('M')}>남자</button>
            <button type="button" className={`${styles.genderBtn} ${gender === 'F' ? styles.genderActiveF : ''}`} onClick={() => setGender('F')}>여자</button>
          </div>

          <div className={styles.inputRow}>
            <input className={styles.dateInput} type="number" placeholder="출생년도 (예: 1995)" min="1930" max="2010" value={birthYear} onChange={e => setBirthYear(e.target.value)} required />
          </div>
          <div className={styles.inputRowSmall}>
            <input className={styles.dateInputSmall} type="number" placeholder="월" min="1" max="12" value={birthMonth} onChange={e => setBirthMonth(e.target.value)} required />
            <input className={styles.dateInputSmall} type="number" placeholder="일" min="1" max="31" value={birthDay} onChange={e => setBirthDay(e.target.value)} required />
          </div>

          <div className={styles.inputRow}>
            <select className={styles.timeSelect} value={birthTime} onChange={e => setBirthTime(e.target.value)}>
              {TIME_SLOTS.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}
          <button type="submit" className={styles.submitBtn}>
            운세 풀이 시작하기 →
          </button>
        </form>
      ) : (
        <div className={styles.resultArea}>
          {/* 사주 정보 (본명성/띠 대신 연주 정보) */}
          <div className={styles.sajuPillars}>
            <div className={styles.pillar}>
              <div className={styles.pillarHanja}>{result.stemHanja}</div>
              <div className={styles.pillarKor}>{result.stem}</div>
              <div className={styles.pillarLabel}>천간</div>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarHanja}>{result.branchHanja}</div>
              <div className={styles.pillarKor}>{result.branch}</div>
              <div className={styles.pillarLabel}>지지</div>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarHanja}>{OHAENG_EMOJI[result.ohaeng]}</div>
              <div className={styles.pillarKor}>{result.ohaeng}(行)</div>
              <div className={styles.pillarLabel}>본명성</div>
            </div>
          </div>

          <div className={styles.fortuneTitle}>{result.general.title}</div>
          <p className={styles.fortuneMsg}>{result.general.desc}</p>

          <div className={styles.detailList}>
            <div className={styles.detailRow}>
              <span className={styles.detailIcon}>💰</span>
              <div className={styles.detailText}>
                <strong>재물운</strong>
                <p>{result.money}</p>
              </div>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailIcon}>❤️</span>
              <div className={styles.detailText}>
                <strong>애정운</strong>
                <p>{result.love}</p>
              </div>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailIcon}>💼</span>
              <div className={styles.detailText}>
                <strong>직장/사업운</strong>
                <p>{result.work}</p>
              </div>
            </div>
          </div>

          <div className={styles.luckyBar}>
            <div><span>🎨 행운의 색상:</span> <strong>{result.color}</strong></div>
            <div><span>🧭 행운의 방향:</span> <strong>{result.dir}쪽</strong></div>
          </div>

          <button className={styles.retryBtn} onClick={() => setResult(null)}>
            다시 확인하기
          </button>
        </div>
      )}
    </div>
  );
}
