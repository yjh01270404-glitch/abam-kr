'use client';
import Image from 'next/image';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, Wand2, Check, RotateCcw, 
  CreditCard, Lock, Unlock, Sparkles, AlertTriangle, 
  ArrowRight, Upload, FileText, X 
} from 'lucide-react';
import styles from './post.module.css';
import { useApp } from '../../../context/AppContext';
import { addPostedAd } from '../../../lib/recruiterStore';
import { broadcastAdminPush } from '../../../lib/audioAlert';

export default function EmployerPostPage() {
  const { registerJob, currentUser } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // --- Step 1: Raw Input Fields ---
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // 4 Structural Pre-defined Interview Questions
  const [qna, setQna] = useState<Array<{ question: string; answer: string }>>([
    { 
      question: 'Q. 급여 지급 방식 및 보너스 혜택이 어떻게 되나요?', 
      answer: '' 
    },
    { 
      question: 'Q. 근무 일정 및 시간 조율이 자유로운가요?', 
      answer: '' 
    },
    { 
      question: 'Q. 초보자나 대학생도 쉽게 배울 수 있나요?', 
      answer: '' 
    },
    { 
      question: 'Q. 개인정보 보안 및 익명 보장이 철저한가요?', 
      answer: '' 
    }
  ]);

  const [highlightSentence, setHighlightSentence] = useState('');

  // 3 New Self-PR Fields
  const [welfare, setWelfare] = useState('');
  const [atmosphere, setAtmosphere] = useState('');
  const [prMessage, setPrMessage] = useState('');

  // Business License File Attachment
  const [licenseFileName, setLicenseFileName] = useState('');
  const [licenseFileSize, setLicenseFileSize] = useState('');

  const [location, setLocation] = useState('서울 강남구 역삼동');
  const [pay, setPay] = useState('일급 300,000원');
  const [workHours, setWorkHours] = useState('오후 8시 ~ 오전 3시 (자율조정)');
  const [requirements, setRequirements] = useState('만 20세 이상 회원 여성');
  const [contactPhone, setContactPhone] = useState('010-1234-5678');
  const [contactKakao, setContactKakao] = useState('acevip77');

  // Update Q&A row fields
  const handleQnaChange = (index: number, value: string) => {
    const updated = qna.map((q, i) => i === index ? { ...q, answer: value } : q);
    setQna(updated);
  };

  // Mock File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLicenseFileName(file.name);
      setLicenseFileSize((file.size / 1024).toFixed(1) + ' KB');
    }
  };

  const removeFile = () => {
    setLicenseFileName('');
    setLicenseFileSize('');
  };

  // --- Step 2: Refinement ---
  const [refinedText, setRefinedText] = useState<any>(null);

  // Call Refinement API
  const handleRefinement = async () => {
    if (!companyName || !title || !description) {
      alert('상호명, 공고 제목, 상세 모집글은 필수 입력 항목입니다.');
      return;
    }
    if (!licenseFileName) {
      alert('사업자등록증 첨부는 필수 사항입니다. 첨부 후 진행해 주세요.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/ai/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raw_input: {
            companyName,
            title,
            description,
            qna,
            highlightSentence,
            welfare,
            atmosphere,
            prMessage,
            location,
            pay,
            workHours,
            requirements,
            contactPhone,
            contactKakao
          }
        })
      });
      const data = await response.json();
      if (data.success) {
        setRefinedText(data.refined);
        setStep(2);
      } else {
        alert('문장 정제 실패: ' + data.error);
      }
    } catch (e) {
      console.error(e);
      alert('정제 API 호출 중 네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // --- Step 3: Typesetting Preview ---
  const [generatedJobId, setGeneratedJobId] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(1);

  const handleGeneratePreview = async () => {
    setLoading(true);
    try {
      const jobId = `dynamic-${Date.now()}`;
      setGeneratedJobId(jobId);

      // Save dynamic job in server memory database as 'unpaid'
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: jobId,
          type: 'general', 
          companyName: refinedText.companyName,
          title: refinedText.title,
          description: refinedText.description,
          location: refinedText.location,
          pay: refinedText.pay,
          workHours: refinedText.workHours,
          requirements: refinedText.requirements,
          contactPhone: refinedText.contactPhone,
          contactKakao: refinedText.contactKakao,
          business_license_name: licenseFileName,
          raw_input: {
            companyName, title, description, qna, highlightSentence, welfare, atmosphere, prMessage, location, pay, workHours, requirements, contactPhone, contactKakao, licenseFileName
          },
          ai_refined_text: refinedText,
          preview_image_url: `/api/detail-image/${jobId}?preview=true`,
          approval_status: 'preview_generated',
          payment_status: 'unpaid',
          createdBy: currentUser?.id || 'u_test_employer'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setStep(3);
      } else {
        alert('서버에 프리뷰 등록을 실패했습니다.');
      }
    } catch (e) {
      console.error(e);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // --- Step 4: Checkout Tiers & Options ---
  const [selectedTier, setSelectedTier] = useState<'top' | 'priority' | 'special' | 'general'>('general');
  const tierPrices = {
    top: 500000,
    priority: 300000,
    special: 200000,
    general: 50000
  };
  const [addMotion, setAddMotion] = useState(false);
  const [jumpCount, setJumpCount] = useState(0);

  const calculateTotal = () => {
    let total = tierPrices[selectedTier];
    if (addMotion) total += 50000;
    total += jumpCount * 10000;
    return total;
  };

  // Final Payment Processing
  const handlePayment = async () => {
    setLoading(true);
    try {
      const finalJob = {
        id: generatedJobId,
        type: selectedTier,
        companyName: refinedText.companyName,
        title: refinedText.title,
        description: refinedText.description,
        location: refinedText.location,
        pay: refinedText.pay,
        workHours: refinedText.workHours,
        requirements: refinedText.requirements,
        contactPhone: refinedText.contactPhone,
        contactKakao: refinedText.contactKakao,
        business_license_name: licenseFileName,
        raw_input: {
          companyName, title, description, qna, highlightSentence, welfare, atmosphere, prMessage, location, pay, workHours, requirements, contactPhone, contactKakao, licenseFileName
        },
        ai_refined_text: refinedText,
        preview_image_url: `/api/detail-image/${generatedJobId}?preview=true`,
        final_image_url: `/api/detail-image/${generatedJobId}`,
        approval_status: 'approved' as const,
        payment_status: 'paid' as const,
        createdBy: currentUser?.id || 'u_test_employer',
        viewCount: 0
      };

      // 1. Update the server status to paid
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalJob)
      });
      const data = await response.json();

      if (data.success) {
        // 2. Register job on the client-side AppContext & recruiterStore for live tier section display
        registerJob(finalJob);

        const mappedTier = selectedTier === 'top' ? 'vvip' : selectedTier === 'priority' ? 'grand' : selectedTier === 'special' ? 'premium' : 'line';
        addPostedAd({
          companyName: refinedText?.companyName || companyName,
          tier: mappedTier,
          title: refinedText?.title || title,
          location: refinedText?.location || location,
          pay: refinedText?.pay || pay,
          tag: '#신규구인공고'
        });

        // 관리자 PWA 실시간 결제 완료 알림 전송
        broadcastAdminPush(
          '💳 [신규 결제 완료]',
          `매장 (${companyName})에서 ${selectedTier.toUpperCase()} 등급 광고 결제 (${calculateTotal().toLocaleString()}원)가 등록되었습니다!`,
          '/abam-nightman-2026'
        );

        alert(`총 결제금액: ${calculateTotal().toLocaleString()}원\n포트원(PortOne) 가상계좌 결제가 완료되었습니다!\n상세 페이지 및 최종 원본 조판이 잠금 해제되었습니다.`);
        window.location.href = `/job/${generatedJobId}`;
      } else {
        alert('Server update failed.');
      }
    } catch (e) {
      console.error(e);
      alert('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <Link href="/" className={styles.backBtn}>
          <ChevronLeft size={16} />
          <span>홈으로</span>
        </Link>
        <h1 className={styles.pageTitle}>자동 조판 구인 광고 등록</h1>
        <div className={styles.headerRight}>
          <span className={styles.userBadge}>구인자 모드</span>
        </div>
      </header>

      {/* Indicator */}
      <div className={styles.stepIndicator}>
        <div className={`${styles.stepItem} ${step === 1 ? styles.stepActive : ''} ${step > 1 ? styles.stepDone : ''}`}>
          <div className={styles.stepCircle}>1</div>
          <span className={styles.stepLabel}>초안 작성</span>
        </div>
        <div className={styles.stepLine}></div>
        <div className={`${styles.stepItem} ${step === 2 ? styles.stepActive : ''} ${step > 2 ? styles.stepDone : ''}`}>
          <div className={styles.stepCircle}>2</div>
          <span className={styles.stepLabel}>문장 자동 정제</span>
        </div>
        <div className={styles.stepLine}></div>
        <div className={`${styles.stepItem} ${step === 3 ? styles.stepActive : ''} ${step > 3 ? styles.stepDone : ''}`}>
          <div className={styles.stepCircle}>3</div>
          <span className={styles.stepLabel}>조판 미리보기</span>
        </div>
        <div className={styles.stepLine}></div>
        <div className={`${styles.stepItem} ${step === 4 ? styles.stepActive : ''}`}>
          <div className={styles.stepCircle}>4</div>
          <span className={styles.stepLabel}>등급 및 결제</span>
        </div>
      </div>

      <div className={styles.content}>
        {/* Step 1: Input form */}
        {step === 1 && (
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>초안 입력 (러프하게 자유롭게 기재해 주세요)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>상호명 (매장명) *</label>
                  <input 
                    type="text" 
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="예: 텐텐 룸카페"
                    className={styles.input}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>공고 제목 *</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="예: 선릉 최고 대우 일당 당일정산"
                    className={styles.input}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>상세 모집글 초안 (아래 내용을 수려하게 정제합니다) *</label>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="예: 선릉역 부근에서 함께 일할 분 구해요. 초보자도 바로 할 수 있고 술 강요 전혀 없습니다. 오시면 친절히 가르쳐 드리니 초보자 대학생 부담없이 오세요. 페이는 퇴근할 때 바로 현금 정산해 드립니다."
                  className={styles.textarea}
                  style={{ width: '100%', minHeight: '120px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Pre-defined Structural Q&A Interview Form */}
              <div style={{ background: '#fff1f2', border: '1.5px solid #fecdd3', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#be123c', borderBottom: '1px solid #fda4af', paddingBottom: '6px' }}>
                  📋 구인 조건 상세 인터뷰 (문답 양식)
                </h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#4b5563', lineHeight: '1.4' }}>
                  구직자들이 가장 많이 질문하고 신중하게 확인하는 조건들입니다. 각 문항에 상세히 응답해 주시면 완성도 높은 홍보 광고판이 제작됩니다.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {qna.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 700, color: '#e11d48', display: 'flex' }}>
                        {item.question}
                      </label>
                      <textarea 
                        value={item.answer}
                        onChange={e => handleQnaChange(idx, e.target.value)}
                        placeholder="질문에 대한 답변을 자세하게 적어주세요. (예: 주말 가능 자율근무, 당일 현금지급 등)"
                        className={styles.textarea}
                        style={{ width: '100%', minHeight: '60px', fontSize: '13px', boxSizing: 'border-box', border: '1px solid #d1d5db' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 New Self-PR Fields Section */}
              <div style={{ background: '#f5f3ff', border: '1.5px solid #ddd6fe', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#6d28d9', borderBottom: '1px solid #c084fc', paddingBottom: '6px' }}>
                  ⭐ 우리 매장만의 특별한 매력 & PR (자기소개 고도화)
                </h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#4b5563', lineHeight: '1.4' }}>
                  타 매장와 차별화되는 고유의 강점이나 혜택, 실장님의 각오를 자세히 기재해 주세요.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#7c3aed' }}>💎 독보적 강점 및 복지 혜택</label>
                    <textarea 
                      value={welfare}
                      onChange={e => setWelfare(e.target.value)}
                      placeholder="예: 최고급 대기실 1인 1실 완비, 성실 근무자 추가 인센티브 제공, 출퇴근 차량 운행 등"
                      className={styles.textarea}
                      style={{ width: '100%', minHeight: '60px', fontSize: '13px', boxSizing: 'border-box', border: '1px solid #d1d5db' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#7c3aed' }}>✨ 근무 환경 및 매장 분위기</label>
                    <textarea 
                      value={atmosphere}
                      onChange={e => setAtmosphere(e.target.value)}
                      placeholder="예: 술 강요 및 텃세가 절대 없으며, 가족처럼 편안하고 매너 넘치는 쾌적한 매장입니다."
                      className={styles.textarea}
                      style={{ width: '100%', minHeight: '60px', fontSize: '13px', boxSizing: 'border-box', border: '1px solid #d1d5db' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#7c3aed' }}>💬 구직자에게 전하는 실장님의 각오/당부</label>
                    <textarea 
                      value={prMessage}
                      onChange={e => setPrMessage(e.target.value)}
                      placeholder="예: 처음 일하시는 두려움을 잘 압니다. 든든한 조력자로서 다치지 않고 안전하게 목돈 마련하시도록 실장이 끝까지 도울게요."
                      className={styles.textarea}
                      style={{ width: '100%', minHeight: '60px', fontSize: '13px', boxSizing: 'border-box', border: '1px solid #d1d5db' }}
                    />
                  </div>
                </div>
              </div>

              {/* Mandatory Highlight Sentence Input */}
              <div style={{ background: '#fef3c7', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 900, color: '#92400e' }}>
                  ✨ 공고 최하단 강조 한 줄 문구 (선택 사항)
                </label>
                <p style={{ margin: 0, fontSize: '12px', color: '#78350f', lineHeight: '1.4' }}>
                  상세 페이지 최하단에 강조용 점선 박스로 게시하고 싶은 사장님의 다짐이나 핵심 혜택을 남겨주세요.
                </p>
                <input 
                  type="text" 
                  value={highlightSentence}
                  onChange={e => setHighlightSentence(e.target.value)}
                  placeholder="예: 초보자도 첫날부터 100% 적응할 수 있도록 실장이 끝까지 책임지고 케어하겠습니다!"
                  className={styles.input}
                  style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #d1d5db' }}
                />
              </div>

              {/* Business Registration Certificate Attachment Field */}
              <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 900, color: '#166534' }}>
                  💼 사업자등록증 첨부 (필수) *
                </label>
                <p style={{ margin: 0, fontSize: '12px', color: '#14532d', lineHeight: '1.4' }}>
                  허위 구인을 차단하고 안심인증 매장 신뢰도를 증명하기 위해 사업자등록증 첨부가 의무화되었습니다. 첨부된 문서는 외부로 노출되지 않고 내부 확인용으로만 안전하게 암호화 보관됩니다.
                </p>

                {licenseFileName ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', border: '1px solid #86efac', borderRadius: '8px', padding: '10px 14px', marginTop: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534' }}>
                      <FileText size={18} />
                      <span style={{ fontSize: '13px', fontWeight: 700 }}>{licenseFileName}</span>
                      <span style={{ fontSize: '11px', color: '#6b7280' }}>({licenseFileSize})</span>
                    </div>
                    <button onClick={removeFile} style={{ display: 'flex', border: 0, background: 'transparent', color: '#ef4444', cursor: 'pointer' }}>
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #86efac', borderRadius: '8px', padding: '24px 16px', background: '#ffffff', cursor: 'pointer', marginTop: '6px' }}>
                    <Upload size={24} color="#16a34a" style={{ marginBottom: '8px' }} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a' }}>여기를 눌러 사업자등록증 파일을 선택해 주세요</span>
                    <span style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>지원 파일: PDF, PNG, JPG (최대 10MB)</span>
                    <input 
                      type="file" 
                      onChange={handleFileUpload} 
                      accept="application/pdf, image/*" 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} 
                    />
                  </div>
                )}
              </div>

              {/* Fact Table Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>근무 지역 *</label>
                  <input type="text" value={location} onChange={e => setLocation(e.target.value)} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>급여 기준 *</label>
                  <input type="text" value={pay} onChange={e => setPay(e.target.value)} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>근무 시간 *</label>
                  <input type="text" value={workHours} onChange={e => setWorkHours(e.target.value)} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>지원 자격 *</label>
                  <input type="text" value={requirements} onChange={e => setRequirements(e.target.value)} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>연락처 전화번호 *</label>
                  <input type="text" value={contactPhone} onChange={e => setContactPhone(e.target.value)} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>카카오톡 ID *</label>
                  <input type="text" value={contactKakao} onChange={e => setContactKakao(e.target.value)} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
              </div>

              <button 
                onClick={handleRefinement} 
                className={styles.primaryBtn}
                style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                disabled={loading}
              >
                <Wand2 size={16} />
                {loading ? '문장 자동 정제 중...' : '문장 정제 요청 (2단계 이동)'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Confirm Refined text */}
        {step === 2 && refinedText && (
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="#e11d48" /> 자동 정제 결과 확인 및 수정
            </h2>
            <p style={{ fontSize: '12.5px', color: '#6b7280', marginBottom: '20px' }}>
              자동 문장 교정기가 가독성을 높이고 문장을 다듬었습니다. 고유 수치 정보(연락처, 일당 등)가 정확한지 확인 후 미세수정이 가능합니다.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>정제된 상호명</label>
                  <input type="text" value={refinedText.companyName} onChange={e => setRefinedText({...refinedText, companyName: e.target.value})} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>정제된 제목</label>
                  <input type="text" value={refinedText.title} onChange={e => setRefinedText({...refinedText, title: e.target.value})} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>정제된 상세 구인내용</label>
                <textarea 
                  value={refinedText.description}
                  onChange={e => setRefinedText({...refinedText, description: e.target.value})}
                  className={styles.textarea}
                  style={{ width: '100%', minHeight: '150px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Q&A editor list */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '8px' }}>정제된 문답 목록</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {refinedText.qna.map((item: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', padding: '12px' }}>
                      <input 
                        type="text" 
                        value={item.question}
                        onChange={e => {
                          const updated = refinedText.qna.map((q: any, i: number) => i === idx ? { ...q, question: e.target.value } : q);
                          setRefinedText({ ...refinedText, qna: updated });
                        }}
                        className={styles.input}
                        style={{ width: '100%', fontSize: '12.5px', boxSizing: 'border-box' }}
                      />
                      <textarea 
                        value={item.answer}
                        onChange={e => {
                          const updated = refinedText.qna.map((q: any, i: number) => i === idx ? { ...q, answer: e.target.value } : q);
                          setRefinedText({ ...refinedText, qna: updated });
                        }}
                        className={styles.textarea}
                        style={{ width: '100%', minHeight: '40px', fontSize: '12.5px', boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 PR fields review */}
              <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#6d28d9' }}>정제된 매장 강점 및 상세 PR</h4>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#7c3aed', marginBottom: '2px' }}>정제된 복지 혜택</label>
                  <textarea 
                    value={refinedText.welfare} 
                    onChange={e => setRefinedText({...refinedText, welfare: e.target.value})} 
                    className={styles.textarea} 
                    style={{ width: '100%', minHeight: '40px', fontSize: '12.5px', boxSizing: 'border-box' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#7c3aed', marginBottom: '2px' }}>정제된 근무 환경</label>
                  <textarea 
                    value={refinedText.atmosphere} 
                    onChange={e => setRefinedText({...refinedText, atmosphere: e.target.value})} 
                    className={styles.textarea} 
                    style={{ width: '100%', minHeight: '40px', fontSize: '12.5px', boxSizing: 'border-box' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#7c3aed', marginBottom: '2px' }}>정제된 실장의 각오</label>
                  <textarea 
                    value={refinedText.prMessage} 
                    onChange={e => setRefinedText({...refinedText, prMessage: e.target.value})} 
                    className={styles.textarea} 
                    style={{ width: '100%', minHeight: '40px', fontSize: '12.5px', boxSizing: 'border-box' }} 
                  />
                </div>
              </div>

              {/* Highlight sentence review */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>정제된 강조 한 줄 문구</label>
                <input 
                  type="text" 
                  value={refinedText.highlightSentence} 
                  onChange={e => setRefinedText({...refinedText, highlightSentence: e.target.value})} 
                  className={styles.input} 
                  style={{ width: '100%', boxSizing: 'border-box' }} 
                />
              </div>

              {/* Facts check inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>근무 지역 (고정)</label>
                  <input type="text" value={refinedText.location} onChange={e => setRefinedText({...refinedText, location: e.target.value})} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>급여 기준 (고정)</label>
                  <input type="text" value={refinedText.pay} onChange={e => setRefinedText({...refinedText, pay: e.target.value})} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>근무 시간 (고정)</label>
                  <input type="text" value={refinedText.workHours} onChange={e => setRefinedText({...refinedText, workHours: e.target.value})} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>지원 자격 (고정)</label>
                  <input type="text" value={refinedText.requirements} onChange={e => setRefinedText({...refinedText, requirements: e.target.value})} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>연락처 전화번호 (고정)</label>
                  <input type="text" value={refinedText.contactPhone} onChange={e => setRefinedText({...refinedText, contactPhone: e.target.value})} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>카카오톡 ID (고정)</label>
                  <input type="text" value={refinedText.contactKakao} onChange={e => setRefinedText({...refinedText, contactKakao: e.target.value})} className={styles.input} style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button className={styles.outlineBtn} onClick={() => setStep(1)}>
                  <RotateCcw size={16} /> 초안 수정하러 가기
                </button>
                <button className={styles.primaryBtn} onClick={handleGeneratePreview} disabled={loading}>
                  <Check size={16} /> {loading ? '생성 중...' : '확인 완료 - 프리뷰 이미지 조판 요청'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Typesetting preview and approval */}
        {step === 3 && generatedJobId && (
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>자동 조판 미리보기 (프리뷰 워터마크 보호 모드)</h2>
            <p style={{ fontSize: '12.5px', color: '#6b7280', marginBottom: '20px' }}>
              안심 보호용 고밀도 워터마크 및 결제 대기 경고가 합성된 저해상도 파일입니다. 결제가 완료되면 다운로드와 옅은 최종 워터마크 원본이 잠금 해제됩니다.
            </p>

            {/* Preview Image with Drag-disable & Right-click prevention CSS wrapper */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: '28px',
                userSelect: 'none',
                pointerEvents: 'none',
                WebkitUserSelect: 'none',
                position: 'relative'
              }}
              onContextMenu={e => e.preventDefault()}
            >
              <Image unoptimized 
                src={`/api/detail-image/${generatedJobId}?preview=true&template=${previewTemplate}`} 
                alt="typesetting preview image"
                style={{ 
                  width: '100%', 
                  maxWidth: '420px', 
                  height: 'auto', 
                  borderRadius: '12px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                  border: '3px solid #ef4444'
                }}
              />
              <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#f97316', color: '#fff', fontSize: '11px', fontWeight: 900, padding: '4px 10px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                🔒 다운로드 방지 보안 모드
              </span>
            </div>

            <div className={styles.buttonGroup}>
              <button className={styles.outlineBtn} onClick={() => setStep(2)}>
                <RotateCcw size={16} /> 다시 만들기 (문구/색상 수정)
              </button>
              <button className={styles.primaryBtn} onClick={() => setStep(4)}>
                <Check size={16} /> 이대로 진행할게요 (결제 상품 선택)
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Product Tier Select & Checkouts */}
        {step === 4 && (
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>배너/상세 광고 노출 등급 선택</h2>
            
            {/* Tiers Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '24px' }}>
              <div 
                onClick={() => setSelectedTier('general')} 
                style={{ 
                  border: selectedTier === 'general' ? '3px solid #db2777' : '1.5px solid #e5e7eb', 
                  borderRadius: '10px', 
                  padding: '16px', 
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: selectedTier === 'general' ? '#fff1f2' : '#fff'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 900, marginBottom: '6px' }}>스탠다드 (일반 리스트)</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#db2777', marginBottom: '4px' }}>50,000원</div>
                <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: '1.4' }}>메인 및 목록 일반 게시글로 무제한 스크롤 노출</div>
              </div>

              <div 
                onClick={() => setSelectedTier('special')} 
                style={{ 
                  border: selectedTier === 'special' ? '3px solid #db2777' : '1.5px solid #e5e7eb', 
                  borderRadius: '10px', 
                  padding: '16px', 
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: selectedTier === 'special' ? '#fff1f2' : '#fff'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 900, marginBottom: '6px' }}>GRAND VIP (스페셜 그리드)</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#db2777', marginBottom: '4px' }}>200,000원</div>
                <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: '1.4' }}>그리드 메인 상단부에 강조 테두리와 함께 서빙</div>
              </div>

              <div 
                onClick={() => setSelectedTier('top')} 
                style={{ 
                  border: selectedTier === 'top' ? '3px solid #db2777' : '1.5px solid #e5e7eb', 
                  borderRadius: '10px', 
                  padding: '16px', 
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: selectedTier === 'top' ? '#fff1f2' : '#fff'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 900, marginBottom: '6px' }}>VIP (상단 고해상도 배너)</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#db2777', marginBottom: '4px' }}>500,000원</div>
                <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: '1.4' }}>홈페이지 최상단에 화려한 배너와 함께 고정 서빙</div>
              </div>
            </div>

            {/* Receipt Summary */}
            <div style={{ background: '#f9fafb', borderRadius: '10px', padding: '16px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '13.5px', borderBottom: '1px dashed #d1d5db', paddingBottom: '8px' }}>결제 요약 내역</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#4b5563' }}>상세 페이지 자동 조판 서비스</span>
                <span style={{ fontWeight: 700, color: '#16a34a' }}>무료 탑재 (결제 프로모션)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '12px' }}>
                <span style={{ color: '#4b5563' }}>광고 노출 등급 ({selectedTier.toUpperCase()})</span>
                <span style={{ fontWeight: 700 }}>{tierPrices[selectedTier].toLocaleString()}원</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 900, borderTop: '1px dashed #d1d5db', paddingTop: '10px' }}>
                <span style={{ color: '#111827' }}>최종 결제 금액</span>
                <span style={{ color: '#db2777' }}>{calculateTotal().toLocaleString()}원</span>
              </div>
            </div>

            {/* Notice */}
            <div style={{ display: 'flex', gap: '8px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '12px', marginBottom: '24px' }}>
              <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '12px', color: '#78350f', lineHeight: '1.5' }}>
                <strong>결제 전 최종 고지 사항:</strong><br />
                결제 승인이 완료되는 즉시 이미지 우측 상단의 잠금장치가 해제되며, 구직자가 상세 페이지를 열람할 때 고해상도 원본 및 전화문의/카카오톡 링크가 공개됩니다.
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button className={styles.outlineBtn} onClick={() => setStep(3)}>
                <RotateCcw size={16} /> 조판 프리뷰 다시 확인
              </button>
              <button className={styles.primaryBtn} onClick={handlePayment} disabled={loading} style={{ background: '#db2777', color: '#fff', border: 0 }}>
                <CreditCard size={16} /> {loading ? '처리 중...' : '포트원 결제창 열기 및 승인 완료'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
