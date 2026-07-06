'use client';

import styles from './LogoBanner.module.css';

interface LogoBannerProps {
  companyName: string;
  themeIdx: number;
  subText?: string;
  payText?: string;
  motionLevel?: number; // 0: Static, 1: Neon Blink (+10k), 2: Golden Sweep (+20k), 3: Rainbow Blast (+30k)
}

export default function LogoBanner({ companyName, themeIdx, subText, payText, motionLevel = 0 }: LogoBannerProps) {
  const index = themeIdx % 11;
  
  // Map motionLevel to dynamic CSS classes
  const motionClass = motionLevel === 1 
    ? styles.level1 
    : motionLevel === 2 
    ? styles.level2 
    : motionLevel === 3 
    ? styles.level3 
    : '';

  switch(index) {
    case 0: // 1. 핑크 블라썸 (청라여자친구 느낌)
      return (
        <div className={`${styles.customBanner} ${styles.archetypePink} ${motionClass}`}>
          <span className={styles.pinkSub}>{subText || '여성전용 1인샵'}</span>
          <span className={styles.pinkMain}>{companyName}</span>
          {payText && <span className={styles.pinkPay}>{payText}</span>}
        </div>
      );
    case 1: // 2. 글로시 크롬 3D (오브제 느낌)
      return (
        <div className={`${styles.customBanner} ${styles.archetypeChrome} ${motionClass}`}>
          <span className={styles.chromeMain}>{companyName}</span>
          <span className={styles.chromeBadge}>{payText || subText || 'HIGHCLASS'}</span>
        </div>
      );
    case 2: // 3. 클래식 블랙 품격 (고품격스웨디시 느낌)
      const leftText = payText && payText.length <= 4 ? payText : '1인\n샵';
      return (
        <div className={`${styles.customBanner} ${styles.archetypeTraditional} ${motionClass}`}>
          <div className={styles.traditionalBorder}>
            <div className={styles.traditionalLeft}>{leftText}</div>
            <div className={styles.traditionalMain}>
              {companyName}
              {subText && <div className={styles.traditionalSub}>{subText}</div>}
            </div>
            <div className={styles.traditionalStamp}>雅</div>
          </div>
        </div>
      );
    case 3: // 4. 골든 스타 라이트 (성민오빠 느낌)
      return (
        <div className={`${styles.customBanner} ${styles.archetypeGoldStar} ${motionClass}`}>
          <span className={styles.goldStarMain}>{companyName}</span>
          <span className={styles.goldStarBadge}>{payText || subText || 'VVIP 멤버십'}</span>
        </div>
      );
    case 4: // 5. 명품 브러쉬 스크립트 (구찌 느낌)
      return (
        <div className={`${styles.customBanner} ${styles.archetypeBrand} ${motionClass}`}>
          <span className={styles.brandMain}>{companyName}</span>
          <span className={styles.brandTag}>{subText || payText || 'LUXURY'}</span>
        </div>
      );
    case 5: // 6. 골드 네온 블록 (신림구찌 느낌)
      return (
        <div className={`${styles.customBanner} ${styles.archetypeGoldBlock} ${motionClass}`}>
          <span className={styles.goldBlockMain}>{companyName}</span>
          {(subText || payText) && <span className={styles.goldBlockSub}>{subText || payText}</span>}
        </div>
      );
    case 6: // 7. 화이트 아웃라인 박스 (봄썸 느낌)
      return (
        <div className={`${styles.customBanner} ${styles.archetypeOutlineBox} ${motionClass}`}>
          <div className={styles.outlineBoxInner}>
            <div className={styles.outlineBoxContent}>
              <span className={styles.outlineBoxMain}>{companyName}</span>
              {(subText || payText) && <span className={styles.outlineBoxSub}>{subText || payText}</span>}
            </div>
          </div>
        </div>
      );
    case 7: // 8. 룸 바 골드 배지 (EN 느낌)
      return (
        <div className={`${styles.customBanner} ${styles.archetypeGoldBadge} ${motionClass}`}>
          <div className={styles.goldBadgeInner}>
            <span className={styles.goldBadgeMain}>{companyName}</span>
            <span className={styles.goldBadgeSub}>{payText || subText || 'PREMIUM ROOM BAR'}</span>
          </div>
        </div>
      );
    case 8: // 9. 퍼플 네온 튜브 (시그널 느낌)
      return (
        <div className={`${styles.customBanner} ${styles.archetypePurpleNeon} ${motionClass}`}>
          <span className={styles.purpleNeonMain}>{companyName}</span>
          {(subText || payText) && <span className={styles.purpleNeonSub}>{subText || payText}</span>}
        </div>
      );
    case 9: // 10. 전단지 프린트 (1시간30분 16만원 느낌)
      return (
        <div className={`${styles.customBanner} ${styles.archetypeFlyer} ${motionClass}`}>
          <span className={styles.flyerMain}>{companyName}</span>
          <span className={styles.flyerSub}>{payText || '시급 15만'}</span>
          {subText && <span className={styles.flyerDetail}>{subText}</span>}
        </div>
      );
    case 10: // 11. 오렌지 가라오케 팝 (비타민 느낌)
      return (
        <div className={`${styles.customBanner} ${styles.archetypeOrangePop} ${motionClass}`}>
          <span className={styles.orangePopMain}>{companyName}</span>
          {(subText || payText) && <span className={styles.orangePopSub}>{subText || payText}</span>}
        </div>
      );
    default:
      return (
        <div className={`${styles.customBanner} ${styles.archetypeChrome} ${motionClass}`}>
          <span className={styles.chromeMain}>{companyName}</span>
        </div>
      );
  }
}
