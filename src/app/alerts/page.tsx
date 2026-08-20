'use client';

import React, { useState, useEffect } from 'react';
import styles from './alerts.module.css';

/** 구직자 매칭 선호도 */
interface AlertPrefs {
  /** 선호 지역 */
  regions: string[];
  /** 선호 직종 */
  jobTypes: string[];
  /** 최소 일급 (만원) */
  minDailyPay: number;
  /** 알림 빈도 */
  frequency: 'realtime' | 'daily' | 'weekly';
  /** SOS 긴급 알림 수신 */
  sosAlert: boolean;
  /** 관심 매장 추적 */
  savedBusinesses: string[];
  /** 알림 활성화 */
  enabled: boolean;
}

const defaultPrefs: AlertPrefs = {
  regions: [],
  jobTypes: [],
  minDailyPay: 3,
  frequency: 'daily',
  sosAlert: true,
  savedBusinesses: [],
  enabled: true,
};

/** 스마트 매칭 스코어 설명 */
const SCORE_FACTORS = [
  { icon: '💰', label: '급여 조건 일치', weight: '40%', desc: '설정한 최소 일급 이상의 공고 우선' },
  { icon: '📍', label: '지역 일치도', weight: '30%', desc: '선호 지역과 가까울수록 높은 점수' },
  { icon: '🏷️', label: '직종 적합도', weight: '20%', desc: '선호 직종과 일치하는 공고 상위 노출' },
  { icon: '🔐', label: '매장 신뢰 레벨', weight: '10%', desc: '신뢰도 높은 매장 공고 추가 가산점' },
];

const REGIONS = ['서울 강남', '서울 마포/홍대', '서울 기타', '경기 성남', '경기 일산', '부산 서면', '대구', '광주', '기타 지방'];
const JOB_TYPES = ['모던바', '룸살롱', '노래방', '나이트클럽', '바/포차', 'DJ/이벤트', '스태프', '기타'];

/** 알림 이력 (Mock) */
const mockAlerts = [
  {
    id: 'al-1', type: 'match', score: 94, title: '로즈 모던바 — 서울 관악구',
    pay: '시급 4만5천', tag: '💎 최우수 매장', time: '2시간 전', isNew: true,
  },
  {
    id: 'al-2', type: 'sos', score: 88, title: 'SOS! 세인트 클럽 즉시 매칭',
    pay: '일급 8만', tag: '🆘 긴급', time: '4시간 전', isNew: true,
  },
  {
    id: 'al-3', type: 'match', score: 81, title: '스타 클럽 — 경기 성남시',
    pay: '일급 54만+', tag: '🥇 우수 매장', time: '어제 오후 3시', isNew: false,
  },
  {
    id: 'al-4', type: 'review', score: 0, title: '관심 매장: 로즈 모던바 새 리뷰 등록',
    pay: '별점 4.8 / 34개', tag: '⭐ 리뷰', time: '어제 오후 7시', isNew: false,
  },
  {
    id: 'al-5', type: 'salary', score: 0, title: '오션 하이엔드 스튜디오 — 급여 인상 공지',
    pay: '협의 → 월 1847만+', tag: '💰 급여변동', time: '2일 전', isNew: false,
  },
  {
    id: 'al-6', type: 'match', score: 77, title: '엔젤 서츠룸 — 서울 마포구',
    pay: '일급 14만+', tag: '🥈 검증 매장', time: '3일 전', isNew: false,
  },
];

export default function AlertsPage() {
  const [prefs, setPrefs] = useState<AlertPrefs>(defaultPrefs);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'alerts' | 'prefs'>('alerts');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('abam_alert_prefs');
      if (stored) setPrefs(JSON.parse(stored));
    } catch {}
  }, []);

  const savePrefs = () => {
    localStorage.setItem('abam_alert_prefs', JSON.stringify(prefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleRegion = (r: string) => {
    setPrefs(p => ({
      ...p,
      regions: p.regions.includes(r) ? p.regions.filter(x => x !== r) : [...p.regions, r],
    }));
  };

  const toggleJobType = (t: string) => {
    setPrefs(p => ({
      ...p,
      jobTypes: p.jobTypes.includes(t) ? p.jobTypes.filter(x => x !== t) : [...p.jobTypes, t],
    }));
  };

  const newAlerts = mockAlerts.filter(a => a.isNew);
  const oldAlerts = mockAlerts.filter(a => !a.isNew);

  return (
    <div className={styles.page}>
      {/* 히어로 */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>🔔 맞춤 채용 알림</h1>
          <p className={styles.heroSub}>
            나에게 맞는 조건의 공고를 <strong>AI 스마트 매칭</strong>으로 자동 선별해드립니다
          </p>
          {newAlerts.length > 0 && (
            <div className={styles.newBadge}>새 알림 {newAlerts.length}개</div>
          )}
        </div>
      </div>

      <div className={styles.layout}>
        {/* 탭 */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'alerts' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            🔔 알림 이력 <span className={styles.tabCount}>{mockAlerts.length}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'prefs' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('prefs')}
          >
            ⚙️ 알림 설정
          </button>
        </div>

        {/* 알림 이력 탭 */}
        {activeTab === 'alerts' && (
          <div className={styles.alertList}>
            {/* 스마트 매칭 설명 */}
            <div className={styles.scoreCard}>
              <div className={styles.scoreCardTitle}>🤖 아밤 스마트 매칭 점수란?</div>
              <div className={styles.scoreFactors}>
                {SCORE_FACTORS.map(f => (
                  <div key={f.label} className={styles.scoreFactor}>
                    <span className={styles.scoreFactorIcon}>{f.icon}</span>
                    <div className={styles.scoreFactorInfo}>
                      <span className={styles.scoreFactorLabel}>{f.label}</span>
                      <span className={styles.scoreFactorDesc}>{f.desc}</span>
                    </div>
                    <span className={styles.scoreFactorWeight}>{f.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 새 알림 */}
            {newAlerts.length > 0 && (
              <>
                <div className={styles.sectionLabel}>🆕 새 알림 ({newAlerts.length})</div>
                {newAlerts.map(al => <AlertCard key={al.id} alert={al} />)}
              </>
            )}

            {/* 이전 알림 */}
            {oldAlerts.length > 0 && (
              <>
                <div className={styles.sectionLabel}>📋 이전 알림</div>
                {oldAlerts.map(al => <AlertCard key={al.id} alert={al} />)}
              </>
            )}
          </div>
        )}

        {/* 알림 설정 탭 */}
        {activeTab === 'prefs' && (
          <div className={styles.prefsPanel}>
            {/* 알림 활성화 */}
            <div className={styles.prefCard}>
              <div className={styles.prefCardHeader}>
                <div className={styles.prefCardTitle}>알림 활성화</div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={prefs.enabled}
                    onChange={e => setPrefs(p => ({ ...p, enabled: e.target.checked }))}
                  />
                  <span className={styles.toggleSlider} />
                </label>
              </div>
              <div className={styles.prefCardDesc}>
                {prefs.enabled ? '✅ 알림이 활성화되어 있습니다.' : '🔕 알림이 비활성화되어 있습니다.'}
              </div>
            </div>

            {/* SOS 긴급 알림 */}
            <div className={styles.prefCard}>
              <div className={styles.prefCardHeader}>
                <div>
                  <div className={styles.prefCardTitle}>🆘 SOS 긴급알바 알림</div>
                  <div className={styles.prefCardDesc}>당일 즉시 매칭 공고 실시간 수신</div>
                </div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={prefs.sosAlert}
                    onChange={e => setPrefs(p => ({ ...p, sosAlert: e.target.checked }))}
                  />
                  <span className={styles.toggleSlider} />
                </label>
              </div>
            </div>

            {/* 알림 빈도 */}
            <div className={styles.prefCard}>
              <div className={styles.prefCardTitle}>알림 빈도</div>
              <div className={styles.prefCardDesc} style={{ marginBottom: 12 }}>새 매칭 공고 알림을 받을 주기</div>
              <div className={styles.freqButtons}>
                {([
                  { val: 'realtime', label: '⚡ 실시간', desc: '공고 등록 즉시' },
                  { val: 'daily', label: '📅 일간', desc: '매일 오전 10시' },
                  { val: 'weekly', label: '📆 주간', desc: '매주 월요일' },
                ] as const).map(f => (
                  <button
                    key={f.val}
                    className={`${styles.freqBtn} ${prefs.frequency === f.val ? styles.freqBtnActive : ''}`}
                    onClick={() => setPrefs(p => ({ ...p, frequency: f.val }))}
                  >
                    <div className={styles.freqBtnLabel}>{f.label}</div>
                    <div className={styles.freqBtnDesc}>{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 최소 일급 */}
            <div className={styles.prefCard}>
              <div className={styles.prefCardTitle}>최소 일급 설정</div>
              <div className={styles.prefCardDesc} style={{ marginBottom: 12 }}>
                현재: <strong style={{ color: '#c2185b' }}>{prefs.minDailyPay}만원 이상</strong>
              </div>
              <input
                type="range"
                min={2} max={15} step={0.5}
                value={prefs.minDailyPay}
                onChange={e => setPrefs(p => ({ ...p, minDailyPay: Number(e.target.value) }))}
                className={styles.slider}
              />
              <div className={styles.sliderLabels}>
                <span>2만</span><span>8만</span><span>15만+</span>
              </div>
            </div>

            {/* 선호 지역 */}
            <div className={styles.prefCard}>
              <div className={styles.prefCardTitle}>선호 지역 <span className={styles.prefCardHint}>(복수 선택 가능)</span></div>
              <div className={styles.chipGrid}>
                {REGIONS.map(r => (
                  <button
                    key={r}
                    className={`${styles.chip} ${prefs.regions.includes(r) ? styles.chipActive : ''}`}
                    onClick={() => toggleRegion(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* 선호 직종 */}
            <div className={styles.prefCard}>
              <div className={styles.prefCardTitle}>선호 직종 <span className={styles.prefCardHint}>(복수 선택 가능)</span></div>
              <div className={styles.chipGrid}>
                {JOB_TYPES.map(t => (
                  <button
                    key={t}
                    className={`${styles.chip} ${prefs.jobTypes.includes(t) ? styles.chipActive : ''}`}
                    onClick={() => toggleJobType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 저장 버튼 */}
            <button className={`${styles.saveBtn} ${saved ? styles.saveBtnDone : ''}`} onClick={savePrefs}>
              {saved ? '✓ 저장 완료!' : '💾 알림 설정 저장'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: typeof mockAlerts[0] }) {
  const typeColors: Record<string, string> = {
    match: '#c2185b', sos: '#dc2626', review: '#f59e0b', salary: '#10b981',
  };
  const color = typeColors[alert.type] ?? '#6b7280';

  return (
    <div className={`${styles.alertCard} ${alert.isNew ? styles.alertCardNew : ''}`}>
      {alert.isNew && <div className={styles.alertNewDot} />}

      <div className={styles.alertTop}>
        <span className={styles.alertTag} style={{ color, borderColor: color }}>
          {alert.tag}
        </span>
        {alert.score > 0 && (
          <div className={styles.alertScore}>
            매칭 점수 <strong style={{ color }}>{alert.score}점</strong>
          </div>
        )}
        <span className={styles.alertTime}>{alert.time}</span>
      </div>

      <div className={styles.alertTitle}>{alert.title}</div>
      <div className={styles.alertPay}>{alert.pay}</div>

      {alert.score > 0 && (
        <div className={styles.scoreBar}>
          <div className={styles.scoreBarFill} style={{ width: `${alert.score}%`, background: color }} />
        </div>
      )}
    </div>
  );
}
