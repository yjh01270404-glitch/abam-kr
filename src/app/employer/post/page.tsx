'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { ImagePlus, Bold, Italic, Type, CheckCircle2, CreditCard } from 'lucide-react';
import styles from './post.module.css';

export default function EmployerPostPage() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  
  // Tier selection
  const [tier, setTier] = useState<'top' | 'mid' | 'bot' | null>(null);
  const tierPrices = { top: 500000, mid: 200000, bot: 50000 };
  
  // Options
  const [addMotion, setAddMotion] = useState(false);
  const [jumpCount, setJumpCount] = useState(0);
  
  const motionPrice = 50000;
  const jumpPrice = 10000; // per jump

  // TipTap Editor
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '<p>모집 상세 내용을 자유롭게 작성해주세요. 사진 첨부나 텍스트 꾸미기가 가능합니다.</p>',
    editorProps: {
      attributes: {
        class: styles.prose,
      },
    },
  });

  const addImage = () => {
    const url = window.prompt('이미지 URL을 입력하세요 (테스트환경)');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (tier) total += tierPrices[tier];
    if (addMotion) total += motionPrice;
    total += jumpCount * jumpPrice;
    return total;
  };

  const handlePayment = () => {
    alert(`총 결제금액: ${calculateTotal().toLocaleString()}원\n포트원(PortOne) 결제창이 팝업됩니다. (가상계좌/신용카드)\n결제가 완료되었습니다!`);
    window.location.href = '/';
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>프리미엄 공고 등록</h1>
          <p className={styles.subtitle}>눈에 띄는 공고로 최고의 인재를 구해보세요.</p>
        </div>

        {/* Stepper */}
        <div className={styles.stepper}>
          <div className={`${styles.step} ${step >= 1 ? styles.activeStep : ''}`}>1. 내용 작성</div>
          <div className={styles.stepDivider}></div>
          <div className={`${styles.step} ${step >= 2 ? styles.activeStep : ''}`}>2. 등급 및 옵션</div>
          <div className={styles.stepDivider}></div>
          <div className={`${styles.step} ${step >= 3 ? styles.activeStep : ''}`}>3. 결제</div>
        </div>

        {/* Step 1: Content Editor */}
        {step === 1 && (
          <div className={styles.card}>
            <div className={styles.formGroup}>
              <label>공고 제목</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="예: [논현] 최고 대우 보장, 당일 지급"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>상세 모집 내용</label>
              <div className={styles.editorToolbar}>
                <button onClick={() => editor?.chain().focus().toggleBold().run()} className={styles.toolbarBtn}>
                  <Bold size={16} />
                </button>
                <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={styles.toolbarBtn}>
                  <Italic size={16} />
                </button>
                <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={styles.toolbarBtn}>
                  <Type size={16} />
                </button>
                <button onClick={addImage} className={styles.toolbarBtn}>
                  <ImagePlus size={16} />
                </button>
              </div>
              <div className={styles.editorContentWrapper}>
                <EditorContent editor={editor} />
              </div>
            </div>

            <button className={styles.primaryBtn} onClick={() => setStep(2)}>다음 단계 (광고 상품 선택)</button>
          </div>
        )}

        {/* Step 2: Tiers and Options */}
        {step === 2 && (
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>1. 배너 등급 선택</h2>
            <div className={styles.tierGrid}>
              <div className={`${styles.tierCard} ${tier === 'top' ? styles.tierActive : ''}`} onClick={() => setTier('top')}>
                <div className={styles.tierName}>VIP (상위)</div>
                <div className={styles.tierPrice}>500,000원</div>
                <p className={styles.tierDesc}>메인 최상단 썸네일과 함께 노출</p>
              </div>
              <div className={`${styles.tierCard} ${tier === 'mid' ? styles.tierActive : ''}`} onClick={() => setTier('mid')}>
                <div className={styles.tierName}>스페셜 (중위)</div>
                <div className={styles.tierPrice}>200,000원</div>
                <p className={styles.tierDesc}>그리드 형태로 눈에 띄게 노출</p>
              </div>
              <div className={`${styles.tierCard} ${tier === 'bot' ? styles.tierActive : ''}`} onClick={() => setTier('bot')}>
                <div className={styles.tierName}>스탠다드 (하위)</div>
                <div className={styles.tierPrice}>50,000원</div>
                <p className={styles.tierDesc}>기본 퀵광고 리스트 노출</p>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>2. 추가 옵션 (선택)</h2>
            <div className={styles.optionBox}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={addMotion} onChange={(e) => setAddMotion(e.target.checked)} />
                <span className={styles.optionText}>
                  <strong>모션(애니메이션) 추가</strong> (+50,000원)
                  <p>목록에서 배너가 반짝이거나 움직이는 효과로 시선을 사로잡습니다.</p>
                </span>
              </label>
            </div>

            <div className={styles.optionBox}>
              <div className={styles.jumpHeader}>
                <span className={styles.optionText}>
                  <strong>상단 점프 추가</strong> (+10,000원 / 회)
                  <p>클릭 시 지정한 등급의 최상단으로 게시글을 끌어올립니다. (하루 횟수 제공)</p>
                </span>
              </div>
              <div className={styles.jumpControls}>
                <button onClick={() => setJumpCount(Math.max(0, jumpCount - 1))} className={styles.jumpBtn}>-</button>
                <span className={styles.jumpVal}>{jumpCount}회</span>
                <button onClick={() => setJumpCount(jumpCount + 1)} className={styles.jumpBtn}>+</button>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button className={styles.outlineBtn} onClick={() => setStep(1)}>이전</button>
              <button className={styles.primaryBtn} onClick={() => {
                if(!tier) return alert('배너 등급을 선택해주세요.');
                setStep(3);
              }}>결제 확인</button>
            </div>
          </div>
        )}

        {/* Step 3: Checkout */}
        {step === 3 && (
          <div className={styles.card}>
            <div className={styles.checkoutHeader}>
              <CheckCircle2 size={48} className={styles.checkoutIcon} />
              <h2>결제 내역 확인</h2>
            </div>

            <div className={styles.receipt}>
              <div className={styles.receiptRow}>
                <span>배너 등급 ({tier === 'top' ? 'VIP' : tier === 'mid' ? '스페셜' : '스탠다드'})</span>
                <span>{tier ? tierPrices[tier].toLocaleString() : 0}원</span>
              </div>
              {addMotion && (
                <div className={styles.receiptRow}>
                  <span>모션 추가</span>
                  <span>50,000원</span>
                </div>
              )}
              {jumpCount > 0 && (
                <div className={styles.receiptRow}>
                  <span>상단 점프 ({jumpCount}회)</span>
                  <span>{(jumpCount * jumpPrice).toLocaleString()}원</span>
                </div>
              )}
              <div className={styles.receiptTotal}>
                <span>총 결제 금액</span>
                <span className={styles.totalPrice}>{calculateTotal().toLocaleString()}원</span>
              </div>
            </div>

            <p className={styles.paymentGuide}>
              * 결제는 신용카드 및 가상계좌(무통장입금)를 지원합니다.
            </p>

            <div className={styles.buttonGroup}>
              <button className={styles.outlineBtn} onClick={() => setStep(2)}>이전</button>
              <button className={styles.payBtn} onClick={handlePayment}>
                <CreditCard size={20} />
                결제하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
