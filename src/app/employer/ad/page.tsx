'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Award, CheckCircle2, ChevronRight, CreditCard, HelpCircle, Palette, Settings } from 'lucide-react';
import AbamLogo from '../../../components/AbamLogo';
import DynamicBanner from '../../../components/DynamicBanner';
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
  const { registerJob } = useApp();
  const [step, setStep] = useState(1);
  
  // Advertiser account info
  const [companyName, setCompanyName] = useState('아름다운밤 라운지');
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [regNo, setRegNo] = useState('');
  
  // Banner Builder info
  const [payText, setPayText] = useState('시급 15만');
  const [subText, setSubText] = useState('초보환영 · 당일지급');
  const [selectedArchetype, setSelectedArchetype] = useState(0);
  const [adSlot, setAdSlot] = useState<'vip' | 'special' | 'sidebar'>('vip');
  
  // Paid Add-ons
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

  const slotPrices = {
    vip: 500000,
    special: 200000,
    sidebar: 150000,
  };

  const slotNames = {
    vip: 'VIP 프리미엄 스퀘어 배너 (500,000원 / 월)',
    special: '스페셜 그리드 배너 (200,000원 / 월)',
    sidebar: '사이드바 세로형 배너 (150,000원 / 월)',
  };

    const addonPrices = {
    textHighlight: 10000,
    borderGlow: 15000,
    decorations: 20000,
    containerMotion: 30000,
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
      <div className={styles.wrapper}>
        
        {/* Breadcrumb Navigation */}
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadLink}>홈</Link>
          <ChevronRight size={12} />
          <span className={styles.breadCurrent}>광고주 센터</span>
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>
            <AbamLogo fontSize={28} /> 광고주 센터
          </h1>
          <p className={styles.subtitle} style={{ wordBreak: 'keep-all', lineHeight: 1.6 }}>
            국내 최초 11가지 배너 모션 그래픽 템플릿과 정교한 구인 상세 매칭 시스템으로<br/>브랜드를 연동해 보세요.
          </p>
        </div>

        {/* Stepper */}
        <div className={styles.stepper}>
          <div className={`${styles.step} ${step >= 1 ? styles.activeStep : ''}`}>1. 광고 계정 정보</div>
          <div className={styles.stepDivider}></div>
          <div className={`${styles.step} ${step >= 2 ? styles.activeStep : ''}`}>2. 실시간 배너 빌더 & 구인글 작성</div>
          <div className={styles.stepDivider}></div>
          <div className={`${styles.step} ${step >= 3 ? styles.activeStep : ''}`}>3. 신청 정보 확인</div>
          <div className={styles.stepDivider}></div>
          <div className={`${styles.step} ${step >= 4 ? styles.activeStep : ''}`}>4. 신청 완료</div>
        </div>

        {/* Step 1: 광고주 계정 정보 입력 */}
        {step === 1 && (
          <div className={styles.formCard}>
            <h2 className={styles.sectionTitle}><Settings size={18} /> 광고 계정 생성 및 업체 정보</h2>
            <p className={styles.sectionDesc}>광고 게재 후 세금계산서 발행 및 승인 안내를 위한 기본 정보를 입력해 주세요.</p>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>업체명 (상호명) *</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="예: 아름다운밤 라운지" 
                  className={styles.input} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>대표자명 *</label>
                <input 
                  type="text" 
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  placeholder="예: 홍길동" 
                  className={styles.input} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>사업자등록번호 *</label>
                <input 
                  type="text" 
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="예: 123-45-67890" 
                  className={styles.input} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>담당자 연락처 *</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="예: 010-1234-5678" 
                  className={styles.input} 
                />
              </div>
            </div>
            
            <div className={styles.buttonRight}>
              <button onClick={handleNext} className={styles.primaryBtn}>다음 단계 (배너 빌더 & 구인글)</button>
            </div>
          </div>
        )}

        {/* Step 2: 실시간 배너 빌더 & Preview & 구인글 작성 */}
        {step === 2 && (
          <div className={styles.builderGrid}>
            {/* Editor Area */}
            <div className={styles.editorPanel}>
              
              {/* Section 1: 배너 정보 및 영역 */}
              <h2 className={styles.sectionTitle}><Palette size={18} /> 1. 배너 디자인 & 광고 영역 설정</h2>
              
              <div className={styles.formGroup}>
                <label>배너 상호명 (실시간 연동) *</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="배너에 들어갈 상호명을 입력하세요" 
                  className={styles.input} 
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>급여 정보 입력 (실시간 연동) *</label>
                  <input 
                    type="text" 
                    value={payText}
                    onChange={(e) => setPayText(e.target.value)}
                    placeholder="예: 시급 15만 / 일급 50만" 
                    className={styles.input} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>구인 한줄소개 / 우대조건 입력 (실시간 연동) *</label>
                  <input 
                    type="text" 
                    value={subText}
                    onChange={(e) => setSubText(e.target.value)}
                    placeholder="예: 초보환영 / 복장자유" 
                    className={styles.input} 
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>광고 게재 영역 선택</label>
                <select 
                  className={styles.select}
                  value={adSlot}
                  onChange={(e) => setAdSlot(e.target.value as any)}
                >
                  <option value="vip">VIP 최상단 구인 배너 (500,000원 / 월)</option>
                  <option value="special">메인 중앙 스페셜 그리드 배너 (200,000원 / 월)</option>
                  <option value="sidebar">좌/우 사이드바 광고 배너 (150,000원 / 월)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>배너 그래픽 아키타입 선택 (11가지 옵션)</label>
                <div className={styles.archetypeList}>
                  {ARCHETYPES.map((arch) => (
                    <div 
                      key={arch.id}
                      className={`${styles.archetypeCard} ${selectedArchetype === arch.id ? styles.archActive : ''}`}
                      onClick={() => setSelectedArchetype(arch.id)}
                    >
                      <div className={styles.archName}>{arch.name}</div>
                      <div className={styles.archDesc}>{arch.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: 애니메이션 모션 그래픽 등급 */}
                              <div className={styles.formGroupSeparator}></div>
                <h2 className={styles.sectionTitle}><Palette size={18} /> 2. 프리미엄 배너 부가 기능 (Add-ons)</h2>
                <p className={styles.sectionDesc}>체크박스를 토글하여 하단 실시간 미리보기에서 효과를 확인해 보세요.</p>
  
                <div className={styles.formGroup}>
                  <div className={styles.motionLevelGrid}>
                    <div 
                      className={`${styles.motionCard} ${useTextHighlight ? styles.motionActive : ''}`}
                      onClick={() => setUseTextHighlight(!useTextHighlight)}
                    >
                      <div className={styles.motionHeader}>
                        <span className={styles.motionTitle}>텍스트 네온 하이라이트</span>
                        <span className={styles.motionPriceTag}>+10,000원</span>
                      </div>
                      <p className={styles.motionDesc}>주요 키워드(당일지급, 급여 등)가 네온으로 빛나며 깜빡이는 모션</p>
                    </div>
                    
                    <div 
                      className={`${styles.motionCard} ${useBorderGlow ? styles.motionActive : ''}`}
                      onClick={() => setUseBorderGlow(!useBorderGlow)}
                    >
                      <div className={styles.motionHeader}>
                        <span className={styles.motionTitle}>테두리 네온 깜빡임</span>
                        <span className={styles.motionPriceTag}>+15,000원</span>
                      </div>
                      <p className={styles.motionDesc}>배너 외곽선에 형광등처럼 강렬한 네온 빛이 깜빡이는 효과</p>
                    </div>

                    <div 
                      className={`${styles.motionCard} ${useDecorations ? styles.motionActive : ''}`}
                      onClick={() => setUseDecorations(!useDecorations)}
                    >
                      <div className={styles.motionHeader}>
                        <span className={styles.motionTitle}>무작위 장식 흩뿌리기</span>
                        <span className={styles.motionPriceTag}>+20,000원</span>
                      </div>
                      <p className={styles.motionDesc}>시선을 집중시키는 반짝이는 미니 별, 번개 장식들이 무작위로 추가</p>
                    </div>

                    <div 
                      className={`${styles.motionCard} ${useContainerMotion ? styles.motionActive : ''}`}
                      onClick={() => setUseContainerMotion(!useContainerMotion)}
                    >
                      <div className={styles.motionHeader}>
                        <span className={styles.motionTitle}>전체 다이나믹 모션</span>
                        <span className={styles.motionPriceTag}>+30,000원</span>
                      </div>
                      <p className={styles.motionDesc}>카드 전체가 흔들리거나 둥둥 떠다니는 입체적인 움직임 적용</p>
                    </div>
                  </div>
                </div>

              {/* Section 3: 구인 상세 게시글 정보 입력 */}
              <div className={styles.formGroupSeparator}></div>
              <h2 className={styles.sectionTitle}><Settings size={18} /> 3. 연결될 구인 요강 상세 작성</h2>
              <p className={styles.sectionDesc}>배너 클릭 시 사용자들에게 바로 연결되는 노출 게시판의 상세 구인 요강입니다.</p>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>모집 업종 분류 *</label>
                  <select 
                    className={styles.select}
                    value={jobSector}
                    onChange={(e) => setJobSector(e.target.value)}
                  >
                    <option value="바텐더">바텐더</option>
                    <option value="모던바">모던바</option>
                    <option value="노래방알바">노래방알바</option>
                    <option value="클래식바">클래식바</option>
                    <option value="라운지펍">라운지펍</option>
                    <option value="토킹바">토킹바</option>
                    <option value="DJ/이벤트">DJ/이벤트</option>
                    <option value="스태프/서빙">스태프/서빙</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>지원 대상 / 자격 요건 *</label>
                  <input 
                    type="text" 
                    value={qualifications}
                    onChange={(e) => setQualifications(e.target.value)}
                    placeholder="예: 20세 이상 여성 (초보 가능 / 대학생 환영)" 
                    className={styles.input} 
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>연락처 및 지원 경로 *</label>
                <input 
                  type="text" 
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                  placeholder="예: 010-1234-5678 (카카오톡: abam)" 
                  className={styles.input} 
                />
              </div>

              <div className={styles.formGroup}>
                <label>상세 모집 요강 설명 (급여 우대, 근무 시간, 복리후생 등) *</label>
                <textarea 
                  value={jobDetails}
                  onChange={(e) => setJobDetails(e.target.value)}
                  placeholder="구인 구직자들이 안심하고 지원할 수 있도록 근무 일자, 시간, 제공되는 복지 혜택 등을 상세히 적어주세요." 
                  className={styles.textarea} 
                  rows={5}
                />
              </div>

              <div className={styles.buttonGroup}>
                <button onClick={() => setStep(1)} className={styles.outlineBtn}>이전 단계로</button>
                <button onClick={handleNext} className={styles.primaryBtn}>신청 내역 확인</button>
              </div>
            </div>

            {/* Live Preview Panel (Sticky) */}
            <div className={styles.previewPanel}>
              <h3 className={styles.previewTitle}>✨ 실시간 모션 배너 프리뷰</h3>
              <p className={styles.previewDesc}>실제 사이트에 게재될 배너의 디자인과 특수 모션 효과를 확인해보세요.</p>
              
              <div className={styles.previewContainer}>
                                  <div className={styles.previewBannerWrapper}>
                    <DynamicBanner jobAd={livePreviewJobAd as any} />
                  </div>
              </div>
              
              <div className={styles.priceEstimate}>
                <div className={styles.estimateRow}>
                  <span>선택 광고 영역</span>
                  <span>{adSlot === 'vip' ? 'VIP 프리미엄' : adSlot === 'special' ? '스페셜' : '사이드바'}</span>
                </div>
                                  <div className={styles.estimateRow}>
                    <span>선택 부가 기능</span>
                    <span>
                      {[
                        useTextHighlight && '텍스트 하이라이트',
                        useBorderGlow && '테두리 네온',
                        useDecorations && '무작위 장식',
                        useContainerMotion && '다이나믹 모션'
                      ].filter(Boolean).join(', ') || '없음'}
                    </span>
                  </div>
                <div className={styles.estimateDivider}></div>
                <div className={styles.estimateTotal}>
                  <span>총 예상 광고 비용</span>
                  <span className={styles.totalPrice}>{calculateTotal().toLocaleString()}원</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 신청 내역 확인 및 구인글 프리뷰 */}
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
                  <span className={styles.receiptLabel}>광고 위치</span>
                  <span className={styles.receiptVal}>{slotNames[adSlot]}</span>
                </div>
                                  <div className={styles.receiptItem}>
                    <span className={styles.receiptLabel}>적용된 부가 기능 (Add-ons)</span>
                    <span className={styles.receiptVal}>
                      {[
                        useTextHighlight && '텍스트 하이라이트',
                        useBorderGlow && '테두리 네온',
                        useDecorations && '무작위 장식',
                        useContainerMotion && '다이나믹 모션'
                      ].filter(Boolean).join(', ') || '없음'}
                    </span>
                  </div>
                <div className={styles.receiptItem}>
                  <span className={styles.receiptLabel}>모집 업종 / 지원 자격</span>
                  <span className={styles.receiptVal}>{jobSector} / {qualifications}</span>
                </div>
              </div>

              <div className={styles.estimateDivider}></div>
              
              <div className={styles.receiptFooter}>
                <div className={styles.receiptTotalLabel}>최종 청구 금액 (월 기준)</div>
                <div className={styles.receiptTotalVal}>{calculateTotal().toLocaleString()}원</div>
              </div>
            </div>

            {/* Linked Job Card Preview */}
            <div className={styles.jobCardPreviewContainer}>
              <h3 className={styles.previewCardTitle}>📢 게재 후 노출될 구인 상세 요강 카드 미리보기</h3>
              <div className={styles.mockJobCard}>
                <div className={styles.mockJobCardHeader}>
                  <span className={styles.mockJobSectorBadge}>{jobSector}</span>
                  <span className={styles.mockJobCompanyName}>{companyName}</span>
                </div>
                <h4 className={styles.mockJobTitle}>{subText}</h4>
                <div className={styles.mockJobGrid}>
                  <div className={styles.mockJobField}>
                    <strong>급여 조건:</strong> <span>{payText}</span>
                  </div>
                  <div className={styles.mockJobField}>
                    <strong>지원 자격:</strong> <span>{qualifications}</span>
                  </div>
                  <div className={styles.mockJobField}>
                    <strong>연락 정보:</strong> <span className={styles.highlightText}>{contactMethod}</span>
                  </div>
                </div>
                <div className={styles.mockJobDetailsDivider}></div>
                <div className={styles.mockJobDetailsBody}>
                  <strong>상세 모집 내용:</strong>
                  <p>{jobDetails}</p>
                </div>
              </div>
            </div>

            <div className={styles.paymentGuideCard}>
              <HelpCircle size={18} className={styles.guideIcon} />
              <div>
                <strong>세금계산서 및 입금 안내</strong>
                <p>
                  아름다운밤 광고 심사는 매일 순차적으로 진행됩니다. 승인 완료 후 아래 계좌로 입금해 주시면 광고 노출이 시작됩니다.
                  <br />
                  - 기업은행 070-8057-6615-11 (예금주: 아름다운밤 주식회사)
                </p>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button onClick={() => setStep(2)} className={styles.outlineBtn}>이전 단계로</button>
              <button onClick={handleSubmit} className={styles.payBtn}>
                <CreditCard size={18} /> 광고 신청 완료하기
              </button>
            </div>
          </div>
        )}

        {/* Step 4: 신청 완료 */}
        {step === 4 && (
          <div className={styles.successCard}>
            <div className={styles.successIconWrapper}>
              <CheckCircle2 size={64} className={styles.successIcon} />
            </div>
            <h2 className={styles.successTitle}>광고 및 채용공고 신청 완료!</h2>
            <p className={styles.successDesc}>
              기재하신 담당자 연락처(<strong>{phone}</strong>)로 1시간 이내에 승인 및 진행 절차 안내 전화를 드리겠습니다.<br />
              감사합니다.
            </p>

            <div className={styles.successActions}>
              <Link href="/" className={styles.primaryBtn}>메인 페이지로 이동</Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
