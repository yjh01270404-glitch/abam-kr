// lib/recruiterStore.ts
// 구인자 광고 관리 & 점프 기능 - localStorage 기반

export type AdTier = 'vvip' | 'grand' | 'premium' | 'line';

export interface JumpRecord {
  tier: AdTier;
  usedCount: number;
  lastResetDate: string; // YYYY-MM-DD
}

export interface PostedAd {
  id: string;
  companyName: string;
  tier: AdTier;
  title: string;
  location: string;
  pay: string;
  tag?: string;
  postedAt: number; // timestamp ms
  jumpedAt: number; // last jump timestamp ms (0 = never jumped)
}

/** 등급별 1일 최대 점프 횟수 */
export const JUMP_LIMITS: Record<AdTier, number> = {
  vvip: 5,
  grand: 3,
  premium: 2,
  line: 1,
};

/** 등급 한글 표기 */
export const TIER_LABELS: Record<AdTier, string> = {
  vvip: 'VVIP',
  grand: 'GRAND VIP',
  premium: 'PREMIUM',
  line: '줄광고',
};

/** 등급별 색상 */
export const TIER_COLORS: Record<AdTier, string> = {
  vvip: '#7c3aed',
  grand: '#be185d',
  premium: '#1e1b4b',
  line: '#374151',
};

const STORAGE_KEYS = {
  JUMP_RECORDS: 'abam_jump_records',
  POSTED_ADS: 'abam_posted_ads',
  RECRUITER_ID: 'abam_recruiter_id',
};

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function generateId(): string {
  return `ad_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// ─── Jump record helpers ───────────────────────────────────────────────────

export function getJumpRecord(tier: AdTier): JumpRecord {
  if (typeof window === 'undefined') {
    return { tier, usedCount: 0, lastResetDate: getTodayString() };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.JUMP_RECORDS);
    const records: JumpRecord[] = stored ? JSON.parse(stored) : [];
    const today = getTodayString();
    let record = records.find(r => r.tier === tier);
    // 날짜가 바뀌면 리셋
    if (!record || record.lastResetDate !== today) {
      return { tier, usedCount: 0, lastResetDate: today };
    }
    return record;
  } catch {
    return { tier, usedCount: 0, lastResetDate: getTodayString() };
  }
}

export function getRemainingJumps(tier: AdTier): number {
  const record = getJumpRecord(tier);
  return Math.max(0, JUMP_LIMITS[tier] - record.usedCount);
}

export function getAllRemainingJumps(): Record<AdTier, number> {
  return {
    vvip: getRemainingJumps('vvip'),
    grand: getRemainingJumps('grand'),
    premium: getRemainingJumps('premium'),
    line: getRemainingJumps('line'),
  };
}

function saveJumpRecord(record: JumpRecord): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.JUMP_RECORDS);
    const records: JumpRecord[] = stored ? JSON.parse(stored) : [];
    const idx = records.findIndex(r => r.tier === record.tier);
    if (idx >= 0) records[idx] = record;
    else records.push(record);
    localStorage.setItem(STORAGE_KEYS.JUMP_RECORDS, JSON.stringify(records));
  } catch {/* noop */}
}

// ─── Posted ads helpers ────────────────────────────────────────────────────

export function getPostedAds(): PostedAd[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.POSTED_ADS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function savePostedAds(ads: PostedAd[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.POSTED_ADS, JSON.stringify(ads));
  } catch {/* noop */}
}

/**
 * 새 광고 등록 - 최신순으로 맨 앞에 추가
 */
export function addPostedAd(
  data: Omit<PostedAd, 'id' | 'postedAt' | 'jumpedAt'>
): PostedAd {
  const now = Date.now();
  const newAd: PostedAd = {
    ...data,
    id: generateId(),
    postedAt: now,
    jumpedAt: 0,
  };
  const ads = getPostedAds();
  ads.unshift(newAd); // 신규 → 최상단
  savePostedAds(ads);
  dispatchAdEvent();
  return newAd;
}

/**
 * 광고 삭제
 */
export function deletePostedAd(id: string): void {
  const ads = getPostedAds().filter(a => a.id !== id);
  savePostedAds(ads);
  dispatchAdEvent();
}

// ─── Jump ─────────────────────────────────────────────────────────────────

/**
 * 점프 실행 - 해당 등급의 모든 광고를 현재 시각으로 jumpedAt 갱신
 * @returns true: 성공, false: 횟수 소진
 */
export function useJump(tier: AdTier): boolean {
  if (typeof window === 'undefined') return false;

  const record = getJumpRecord(tier);
  const today = getTodayString();

  // 오늘 횟수 소진 확인
  const effectiveCount =
    record.lastResetDate === today ? record.usedCount : 0;
  if (effectiveCount >= JUMP_LIMITS[tier]) return false;

  // 점프 기록 저장
  saveJumpRecord({
    tier,
    usedCount: effectiveCount + 1,
    lastResetDate: today,
  });

  // 해당 등급 광고 모두 jumpedAt 갱신
  const now = Date.now();
  const ads = getPostedAds().map(ad =>
    ad.tier === tier ? { ...ad, jumpedAt: now } : ad
  );
  savePostedAds(ads);
  dispatchAdEvent();
  return true;
}

// ─── Event bus (cross-component reactivity) ───────────────────────────────

function dispatchAdEvent(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('abam-ad-update'));
  }
}

// ─── Waterfall display logic ──────────────────────────────────────────────

/**
 * 등급별 폭포수 포함 범위
 * vvip  → vvip사이드 + grand + premium + 줄광고
 * grand → grand + premium + 줄광고
 * premium → premium + 줄광고
 * line  → 줄광고만
 */
const TIER_INCLUDES: Record<AdTier, AdTier[]> = {
  vvip:    ['vvip', 'grand', 'premium', 'line'],
  grand:   ['grand', 'premium', 'line'],
  premium: ['premium', 'line'],
  line:    ['line'],
};

/**
 * 특정 섹션에 노출되어야 할 등급 목록
 */
export function tiersForSection(section: AdTier): AdTier[] {
  return (Object.entries(TIER_INCLUDES) as [AdTier, AdTier[]][])
    .filter(([, sections]) => sections.includes(section))
    .map(([tier]) => tier);
}

/**
 * 특정 섹션(section)에 표시할 사용자 게시 광고 목록
 * 정렬: jumpedAt DESC → postedAt DESC
 */
export function getPostedAdsForSection(section: AdTier): PostedAd[] {
  const allowedTiers = tiersForSection(section);
  return getPostedAds()
    .filter(ad => allowedTiers.includes(ad.tier))
    .sort((a, b) => {
      const jd = b.jumpedAt - a.jumpedAt;
      if (jd !== 0) return jd;
      return b.postedAt - a.postedAt;
    });
}
