'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Award, CheckCircle2, ChevronRight, CreditCard, HelpCircle, Palette, Settings } from 'lucide-react';
import AbamLogo from '../../../components/AbamLogo';
import DynamicBanner from '../../../components/DynamicBanner';
import PortOneVBankModal from '../../../components/PortOneVBankModal';
import { useApp } from '../../../context/AppContext';
import styles from './ad.module.css';

const ARCHETYPES = [
  { id: 0, name: '핑크 블라썸', desc: '1인샵/여성전용 부드러운 분홍' },
  { id: 1, name: '글로시 크롬 3D', desc: '고급 크롬 텍스처 및 입체 쉐도우' },
  { id: 2, name: '클래식 블랙 품격', desc: '동양적 미감의 한문 스탬프 블랙' },
  { id: 3, name: '골든 스타 라이트', desc: 'VVIP 전용 밤하늘 골드스타 테마' },
  { id: 4, name: '명품 브러쉬 스크립트', desc: '필기체 로고 타입 명품 브랜드 스타일' },
  { id: 5, name: '골드 네온 블록', desc: '화려한 옐로우 골드 네온 글자 테마' },
  { id: 6, name: '화이트 아웃라인 박스', desc: '심플하고 모던한 블랙앤화이트 대비' },
  { id: 7, name: '룸 바 골드 배지', desc: '라운지/룸바에 어울리는 배지 형태' },
  { id: 8, name: '퍼플 네온 튜브', desc: '강렬한 3D 보라 네온 튜브 라이트' },
  { id: 9, name: '전단지 프린트', desc: '가독성이 극대화된 전단지 인쇄 스타일' },
  { id: 10, name: '오렌지 가라오케 팝', desc: '통통 튀는 캐주얼 복고풍 가라오케 스타일' },
];

export default function AdAccountPage() {
  const { registerJob, currentUser, topBanners, priorityJobs, recommendedJobs, generalJobs } = useApp();
  const [step, setStep] = useState(1);
  const [isVBankModalOpen, setIsVBankModalOpen] = useState(false);
  const [issuedVBankNum, setIssuedVBankNum] = useState<string | null>(null);
  
  // Advertiser account info
  const [companyName, setCompanyName] = useState('아름다운밤 라운지');
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [regNo, setRegNo] = useState('');
  
  // Banner Builder info
  const [payText, setPayText] = useState('시급 15만');
  const [subText, setSubText] = useState('초보환영 · 당일지급');
  const [selectedArchetype, setSelectedArchetype] = useState(0);
  const [adSlot, setAdSlot] = useState<'line' | 'special' | 'grand' | 'vip'>('vip');
  // 사이드배너 추가 옵션 (VVIP 결제 후에만 선택 가능)
  const [sidebarAddon, setSidebarAddon] = useState(false);

  // 사이드배너 슬롯 현황 (실제 운영 시 서버에서 조회)
  const sidebarSlots = {
    left:  { total: 6, used: 3 },
    right: { total: 6, used: 4 },
  };
  const totalSlotsAvailable = (sidebarSlots.left.total - sidebarSlots.left.used) + (sidebarSlots.right.total - sidebarSlots.right.used);
  const allSlotsFull = totalSlotsAvailable <= 0;
  
  // Paid Add-ons (파격 할인 옵션)
  const [useTextHighlight, setUseTextHighlight] = useState(false);
  const [useBorderGlow, setUseBorderGlow] = useState(false);
  const [useDecorations, setUseDecorations] = useState(false);
  const [useContainerMotion, setUseContainerMotion] = useState(false);

  // Detailed recruitment details
  const [jobSector, setJobSector] = useState('바텐더');
  const [qualifications, setQualifications] = useState('20세 이상 여성 (초보 가능 / 대학생 환영)');
  const [contactMethod, setContactMethod] = useState('010-1234-5678 (카카오톡: abam)');
  const [jobDetails, setJobDetails] = useState(
    '가족같은 편안한 분위기에서 즐겁게 일할 가족을 찾고 있습니다.\n근무 시간 조율 가능하고 당일 결제 100% 보장해 드립니다.\n초보자분들도 첫날 바로 일 적응할 수 있게 전담 마킹 케어 제공해 드립니다.'
  );

  // 업계 파격 최저가 요금 체계
  const slotPrices = {
    line: 29000,
    special: 69000,
    grand: 119000,
    vip: 169000,
  };

  const slotNames = {
    line: '줄광고 (월 29,000원 / 파격 최저가)',
    special: '스페셜 그리드 배너 (월 69,000원)',
    grand: '그랜드 메인 배너 (월 119,000원)',
    vip: '👑 VVIP 최상단 프리미엄 배너 (월 169,000원)',
  };

  // 사이드배너 추가 요금 (VVIP 결제 후 추가)
  const SIDEBAR_ADDON_PRICE = 39000;

  const addonPrices = {
    textHighlight: 0,
    borderGlow: 5000,
    decorations: 5000,
    containerMotion: 10000,
  };

  const livePreviewJobAd = {
    id: 'preview-ad-1234',
    type: adSlot === 'vip' ? 'top' : adSlot === 'special' ? 'special' : 'general',
    title: subText,
    companyName: companyName,
    location: '미리보기',
    pay: payText,
    viewCount: 0,
    description: jobDetails,
    addons: {
      textHighlight: useTextHighlight,
      borderGlow: useBorderGlow,
      decorations: useDecorations,
      containerMotion: useContainerMotion,
    }
  };

  const calculateTotal = () => {
    let total = slotPrices[adSlot];
    if (adSlot === 'vip' && sidebarAddon) total += SIDEBAR_ADDON_PRICE;
    if (useTextHighlight) total += addonPrices.textHighlight;
    if (useBorderGlow) total += addonPrices.borderGlow;
    if (useDecorations) total += addonPrices.decorations;
    if (useContainerMotion) total += addonPrices.containerMotion;
    return total;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!companyName || !owner || !phone || !regNo) {
        alert('광고 계정 등록을 위해 모든 항목을 입력해주세요.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!jobSector || !qualifications || !contactMethod || !jobDetails) {
        alert('구인 게시글의 필수 입력 항목들을 작성해 주세요.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = () => {
    const jobType = adSlot === 'vip' ? 'top' : adSlot === 'special' ? 'special' : 'general';
    registerJob({
      type: jobType,
      title: subText,
      companyName: companyName,
      location: '서울 강남구 역삼동',
      pay: payText,
      tag: jobSector,
      description: jobDetails,
      requirements: qualifications,
      workHours: '협의 후 결정',
    });
    alert('광고 배너 및 구인 정보 등록 신청이 완료되었습니다. 담당자 확인 후 빠르게 승인 도와드리겠습니다.');
    setStep(4);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerBar}>
        <Link href="/" className={styles.logoLink}>
          <AbamLogo fontSize={22} />
        </Link>
        <div className={styles.headerTag}>
          <span>🌙 광고주 파트너 센터</span>
        </div>
      </div>

      <div className={styles.content}>
        {/* Step Indicator */}
        <div className={styles.stepProgress}>
          <div className={`${styles.stepItem} ${step >= 1 ? styles.active : ''}`}>
            <span className={styles.stepNum}>1</span>
            <span className={styles.stepText}>계정 & 상품 선택</span>
          </div>
          <ChevronRight size={16} className={styles.stepArrow} />
          <div className={`${styles.stepItem} ${step >= 2 ? styles.active : ''}`}>
            <span className={styles.stepNum}>2</span>
            <span className={styles.stepText}>구인 정보 & 디자인</span>
          </div>
          <ChevronRight size={16} className={styles.stepArrow} />
          <div className={`${styles.stepItem} ${step >= 3 ? styles.active : ''}`}>
            <span className={styles.stepNum}>3</span>
            <span className={styles.stepText}>신청 내역 확인</span>
          </div>
          <ChevronRight size={16} className={styles.stepArrow} />
          <div className={`${styles.stepItem} ${step >= 4 ? styles.active : ''}`}>
            <span className={styles.stepNum}>4</span>
            <span className={styles.stepText}>결제 및 승인 대기</span>
          </div>
        </div>

        {/* Dynamic Pricing Banner Notice */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(219, 39, 119, 0.15), rgba(168, 85, 247, 0.15))',
          border: '1px solid rgba(219, 39, 119, 0.4)',
          borderRadius: '14px',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: '#fde047', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🔥 [업계 최저가 보장] 아름다운밤 광고 요금 대폭 인하 이벤트!
            </div>
            <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
              타사 대비 최대 60% 이상 저렴한 파격 단가! 최초 결제 시 1개월 추가 연장 (1+1 혜택)
            </div>
          </div>
          <span style={{ fontSize: '11px', background: '#db2777', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontWeight: 800 }}>
            최초 결제 1+1 연장
          </span>
        </div>

        {/* Step 1: 계정 정보 및 광고 상품 선택 */}
        {step === 1 && (
          <div className={styles.formCard}>
            <h2 className={styles.sectionTitle}><Settings size={18} /> 광고주 기본 정보 & 상품 등급 선택</h2>
            <p className={styles.sectionDesc}>광고 세금계산서 발급 및 빠른 심사를 위해 사업자 정보를 정확히 작성해 주세요.</p>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>업소 상호명 <span className={styles.req}>*</span></label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="예: 아름다운밤 라운지" 
                />
              </div>

              <div className={styles.formGroup}>
                <label>대표자 성명 <span className={styles.req}>*</span></label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={owner} 
                  onChange={(e) => setOwner(e.target.value)}
                  placeholder="예: 홍길동" 
                />
              </div>

              <div className={styles.formGroup}>
                <label>대표 연락처 (휴대폰) <span className={styles.req}>*</span></label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678" 
                />
              </div>

              <div className={styles.formGroup}>
                <label>사업자 등록번호 <span className={styles.req}>*</span></label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={regNo} 
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="123-45-67890" 
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>노출 희망 광고 상품 등급 (월 정액 파격 특가)</label>
                <select 
                  className={styles.select}
                  value={adSlot}
                  onChange={(e) => {
                    setAdSlot(e.target.value as any);
                    if (e.target.value !== 'vip') setSidebarAddon(false);
                  }}
                >
                  <option value="line">📄 줄광고 (월 29,000원 / 일 960원 특가)</option>
                  <option value="special">⭐ 스페셜 그리드 배너 (월 69,000원)</option>
                  <option value="grand">🏆 그랜드 메인 배너 (월 119,000원)</option>
                  <option value="vip">👑 VVIP 최상단 프리미엄 배너 (월 169,000원)</option>
                </select>
              </div>

              {/* 사이드배너 추가 옵션 — VVIP 선택 시에만 노출 */}
              {adSlot === 'vip' && (
                <div style={{
                  marginTop: '8px',
                  background: allSlotsFull
                    ? 'linear-gradient(135deg, #1f2937, #111827)'
                    : 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                  border: allSlotsFull ? '1.5px solid #374151' : '1.5px solid #f59e0b',
                  borderRadius: '12px',
                  padding: '14px 18px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px' }}>🪟</span>
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: '900', color: allSlotsFull ? '#9ca3af' : '#78350f' }}>
                          좌/우 사이드 날개배너 동시 고정 노출 (VVIP 파트너 전용)
                        </div>
                        <div style={{ fontSize: '11.5px', color: allSlotsFull ? '#6b7280' : '#b45309', marginTop: '2px' }}>
                          데스크톱 화면 양옆 날개 영역에 24시간 브랜딩 배너 고정 노출
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: allSlotsFull ? '#374151' : '#f59e0b',
                        color: '#fff',
                        display: 'inline-block',
                        marginBottom: '4px'
                      }}>
                        {allSlotsFull ? '🔒 잔여 슬롯 없음 (마감)' : `⚡ 잔여 ${totalSlotsAvailable}개 슬롯`}
                      </span>
                    </div>
                  </div>

                  {!allSlotsFull && (
                    <div style={{
                      marginTop: '10px',
                      paddingTop: '10px',
                      borderTop: '1px dashed #fcd34d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={sidebarAddon}
                          onChange={(e) => setSidebarAddon(e.target.checked)}
                          style={{ width: '16px', height: '16px', accentColor: '#d97706' }}
                        />
                        <span style={{ fontSize: '13px', fontWeight: '800', color: '#92400e' }}>
                          사이드 날개배너 추가 결제 신청
                        </span>
                      </label>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '900',
                        color: '#b45309'
                      }}>+39,000원 / 월 (파격 할인가)</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.btnRow}>
              <button className={styles.btnPrimary} onClick={handleNext}>
                다음 단계 (구인글 & 디자인) <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: 구인 상세 정보 작성 & 배너 빌더 */}
        {step === 2 && (
          <div className={styles.formCard}>
            <h2 className={styles.sectionTitle}><Palette size={18} /> 구인 내용 상세 작성 & 배너 디자인 빌더</h2>
            <p className={styles.sectionDesc}>실시간 3D 그래픽 아키타입 선택 및 추가 부가 기능(Add-ons)을 설정해 보세요.</p>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>대표 급여 문구 <span className={styles.req}>*</span></label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={payText} 
                  onChange={(e) => setPayText(e.target.value)}
                  placeholder="예: 시급 15만원 / 일급 80만원" 
                />
              </div>

              <div className={styles.formGroup}>
                <label>서브 타이틀 (강조문구) <span className={styles.req}>*</span></label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={subText} 
                  onChange={(e) => setSubText(e.target.value)}
                  placeholder="예: 초보환영 · 당일지급 · 퇴근차량지원" 
                />
              </div>

              <div className={styles.formGroup}>
                <label>모집 업종 분류 <span className={styles.req}>*</span></label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={jobSector} 
                  onChange={(e) => setJobSector(e.target.value)}
                  placeholder="예: 바텐더 / 룸알바 / 가라오케" 
                />
              </div>

              <div className={styles.formGroup}>
                <label>지원 자격 요건 <span className={styles.req}>*</span></label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={qualifications} 
                  onChange={(e) => setQualifications(e.target.value)}
                  placeholder="예: 20세 이상 여성 (초보 가능 / 대학생 환영)" 
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>담당자 연락처 & 카카오톡 ID <span className={styles.req}>*</span></label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={contactMethod} 
                  onChange={(e) => setContactMethod(e.target.value)}
                  placeholder="010-1234-5678 (카카오톡 ID: abam)" 
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>구인 상세 소개글 <span className={styles.req}>*</span></label>
                <textarea 
                  className={styles.textarea}
                  rows={4}
                  value={jobDetails}
                  onChange={(e) => setJobDetails(e.target.value)}
                />
              </div>

              {/* Add-ons Section (파격 할인 부가 기능) */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label style={{ fontSize: '14px', color: '#db2777', fontWeight: 900 }}>
                  ✨ 프리미엄 부가 기능 선택 (Add-ons 특가)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#192231', padding: '10px 12px', borderRadius: '8px', border: '1px solid #2d3748', cursor: 'pointer' }}>
                    <input type="checkbox" checked={useTextHighlight} onChange={(e) => setUseTextHighlight(e.target.checked)} />
                    <span style={{ fontSize: '12.5px', color: '#e2e8f0' }}>텍스트 하이라이트 <strong style={{ color: '#34d399' }}>(무료)</strong></span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#192231', padding: '10px 12px', borderRadius: '8px', border: '1px solid #2d3748', cursor: 'pointer' }}>
                    <input type="checkbox" checked={useBorderGlow} onChange={(e) => setUseBorderGlow(e.target.checked)} />
                    <span style={{ fontSize: '12.5px', color: '#e2e8f0' }}>테두리 네온 <strong style={{ color: '#fde047' }}>(+5,000원)</strong></span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#192231', padding: '10px 12px', borderRadius: '8px', border: '1px solid #2d3748', cursor: 'pointer' }}>
                    <input type="checkbox" checked={useDecorations} onChange={(e) => setUseDecorations(e.target.checked)} />
                    <span style={{ fontSize: '12.5px', color: '#e2e8f0' }}>스티커 배지 <strong style={{ color: '#fde047' }}>(+5,000원)</strong></span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#192231', padding: '10px 12px', borderRadius: '8px', border: '1px solid #2d3748', cursor: 'pointer' }}>
                    <input type="checkbox" checked={useContainerMotion} onChange={(e) => setUseContainerMotion(e.target.checked)} />
                    <span style={{ fontSize: '12.5px', color: '#e2e8f0' }}>다이나믹 모션 <strong style={{ color: '#fde047' }}>(+10,000원)</strong></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Price Estimate Summary Bar */}
            <div className={styles.priceEstimateBar}>
              <div className={styles.priceEstimate}>
                <div className={styles.estimateRow}>
                  <span>선택 광고 등급</span>
                  <span>{slotNames[adSlot]}</span>
                </div>
                {adSlot === 'vip' && sidebarAddon && (
                  <div className={styles.estimateRow}>
                    <span>🪟 사이드 날개배너 추가</span>
                    <span style={{ color: '#d97706', fontWeight: '800' }}>+39,000원</span>
                  </div>
                )}
                <div className={styles.estimateRow}>
                  <span>선택 부가 기능</span>
                  <span>
                    {[
                      useTextHighlight && '텍스트 하이라이트(무료)',
                      useBorderGlow && '테두리 네온(+5천원)',
                      useDecorations && '스티커 배지(+5천원)',
                      useContainerMotion && '다이나믹 모션(+1만원)'
                    ].filter(Boolean).join(', ') || '없음'}
                  </span>
                </div>
                <div className={styles.estimateDivider}></div>
                <div className={styles.estimateTotal}>
                  <span>총 예상 광고 비용 (월)</span>
                  <span className={styles.totalPrice}>{calculateTotal().toLocaleString()}원</span>
                </div>
              </div>
            </div>

            <div className={styles.btnRow}>
              <button className={styles.btnSecondary} onClick={() => setStep(1)}>이전 단계</button>
              <button className={styles.btnPrimary} onClick={handleNext}>
                최종 확인 단계로 이동 <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: 신청 내역 최종 확인 */}
        {step === 3 && (
          <div className={styles.formCard}>
            <h2 className={styles.sectionTitle}><Award size={18} /> 광고 신청 내역 최종 확인</h2>
            <p className={styles.sectionDesc}>기재하신 광고 정보와 디자인 선택 사항을 다시 한번 검토해 주세요.</p>
            
            <div className={styles.receipt}>
              <div className={styles.receiptGrid}>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>신청 상호명</span>
                  <span className={styles.receiptVal}>{companyName}</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>대표자 / 사업자번호</span>
                  <span className={styles.receiptVal}>{owner} ({regNo})</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>연락처</span>
                  <span className={styles.receiptVal}>{phone}</span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>광고 등급 / 위치</span>
                  <span className={styles.receiptVal}>
                    {slotNames[adSlot]}
                    {adSlot === 'vip' && sidebarAddon && (
                      <span style={{ display: 'block', fontSize: '12px', color: '#d97706', marginTop: '3px', fontWeight: '700' }}>
                        + 🪟 사이드 날개배너 추가 (+39,000원/월)
                      </span>
                    )}
                  </span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>적용된 부가 기능 (Add-ons)</span>
                  <span className={styles.receiptVal}>
                    {[
                      useTextHighlight && '텍스트 하이라이트(무료)',
                      useBorderGlow && '테두리 네온(+5천원)',
                      useDecorations && '스티커 배지(+5천원)',
                      useContainerMotion && '다이나믹 모션(+1만원)'
                    ].filter(Boolean).join(', ') || '없음'}
                  </span>
                </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>모집 업종 / 지원 자격</span>
                  <span className={styles.receiptVal}>{jobSector} / {qualifications}</span>
                </div>
              </div>

              <div className={styles.estimateDivider}></div>

              <div className={styles.receiptTotalRow}>
                <span>최종 결제 금액 (월)</span>
                <span className={styles.receiptTotalAmt}>{calculateTotal().toLocaleString()}원</span>
              </div>
            </div>

            <div className={styles.btnRow}>
              <button className={styles.btnSecondary} onClick={() => setStep(2)}>수정하기</button>
              <button className={styles.btnPrimary} onClick={handleSubmit}>
                <CreditCard size={18} /> 결제 및 광고 신청 제출하기
              </button>
            </div>
          </div>
        )}

        {/* Step 4: 완료 및 결제 진행 */}
        {step === 4 && (
          <div className={styles.formCard} style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CheckCircle2 size={54} style={{ color: '#10b981', margin: '0 auto 16px' }} />
            <h2 className={styles.sectionTitle} style={{ justifyContent: 'center' }}>광고 신청 접수가 완료되었습니다!</h2>
            <p className={styles.sectionDesc} style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto 24px' }}>
              담당자 확인 후 10분 내로 안내 문자 및 가상계좌 발급 조회가 도와드릴 예정입니다.
            </p>

            <div className={styles.btnRow} style={{ justifyContent: 'center' }}>
              <Link href="/" className={styles.btnPrimary}>
                메인 페이지로 이동
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
