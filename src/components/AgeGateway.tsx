'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import styles from './AgeGateway.module.css';

export default function AgeGateway({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already verified
    const verified = localStorage.getItem('isVerified19');
    if (verified === 'true') {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, []);

  const handleVerify = () => {
    // Mocking the mobile verification process
    alert('PASS / 간편본인인증 화면이 팝업됩니다. (테스트 환경)');
    setTimeout(() => {
      localStorage.setItem('isVerified19', 'true');
      setIsVerified(true);
    }, 1000);
  };

  // While checking localStorage, show nothing to prevent flashing
  if (isVerified === null) return null;

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <ShieldAlert size={48} className={styles.icon} />
        </div>
        <h1 className={styles.title}>19세 미만 출입금지</h1>
        <p className={styles.description}>
          본 사이트는 청소년 유해 매체물로서<br />
          정보통신망 이용촉진 및 정보보호 등에 관한 법률 및<br />
          청소년 보호법의 규정에 의하여<br />
          <strong>19세 미만의 청소년은 이용할 수 없습니다.</strong>
        </p>
        <div className={styles.divider}></div>
        <p className={styles.subtext}>
          정보통신망 이용촉진 및 정보보호 등에 관한 법률<br />
          제 42조의 2에 의거하여 본인인증이 필요합니다.
        </p>
        
        <button className={styles.verifyBtn} onClick={handleVerify}>
          <CheckCircle2 size={20} />
          휴대폰 본인인증하기
        </button>

        <a href="https://www.google.com" className={styles.exitLink}>
          19세 미만이므로 나가기
        </a>
      </div>
    </div>
  );
}
