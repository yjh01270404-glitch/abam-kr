'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UploadCloud, CheckCircle2, Building, User, Phone, Briefcase } from 'lucide-react';
import styles from './register.module.css';

export default function EmployerRegisterPage() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleNext = () => {
    if (step === 1 && !file) {
      alert('사업자등록증을 첨부해주세요.');
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = () => {
    alert('가입 신청이 완료되었습니다. 관리자 승인 후 프리미엄 공고 등록이 가능합니다.');
    window.location.href = '/employer/post'; // Mock redirect to post page
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>구인자 회원가입</h1>
          <p className={styles.subtitle}>여성 전문 고수익 구인 서비스 아름다운밤에 오신 것을 환영합니다.</p>
        </div>

        {/* Stepper */}
        <div className={styles.stepper}>
          <div className={`${styles.step} ${step >= 1 ? styles.activeStep : ''}`}>1. 약관 및 인증</div>
          <div className={styles.stepDivider}></div>
          <div className={`${styles.step} ${step >= 2 ? styles.activeStep : ''}`}>2. 사업자 등록</div>
          <div className={styles.stepDivider}></div>
          <div className={`${styles.step} ${step >= 3 ? styles.activeStep : ''}`}>3. 가입 완료</div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>사업자등록증 첨부 필수</h2>
            <p className={styles.cardDesc}>
              아름다운밤은 확실하고 안전한 안심 구인구직을 위해<br />
              모든 구인자의 사업자등록증을 필수로 확인하고 있습니다.
            </p>

            <label className={styles.uploadBox}>
              <input type="file" className={styles.hiddenInput} onChange={handleFileChange} accept="image/*,.pdf" />
              <UploadCloud size={48} className={styles.uploadIcon} />
              <span className={styles.uploadText}>
                {file ? file.name : '클릭하여 사업자등록증 업로드 (JPG, PNG, PDF)'}
              </span>
            </label>

            <button className={styles.primaryBtn} onClick={handleNext}>다음 단계로</button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>업체 정보 입력</h2>
            <div className={styles.formGroup}>
              <label><Building size={16}/> 업체명(상호명)</label>
              <input type="text" placeholder="예: 아름다운밤 라운지" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label><Briefcase size={16}/> 사업자등록번호</label>
              <input type="text" placeholder="예: 123-45-67890" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label><User size={16}/> 담당자명</label>
              <input type="text" placeholder="예: 홍길동" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label><Phone size={16}/> 담당자 연락처</label>
              <input type="text" placeholder="예: 010-1234-5678" className={styles.input} />
            </div>

            <div className={styles.buttonGroup}>
              <button className={styles.outlineBtn} onClick={() => setStep(1)}>이전</button>
              <button className={styles.primaryBtn} onClick={handleNext}>가입 완료하기</button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className={styles.card} style={{ textAlign: 'center' }}>
            <div className={styles.successIconWrapper}>
              <CheckCircle2 size={64} className={styles.successIcon} />
            </div>
            <h2 className={styles.cardTitle}>가입 신청이 완료되었습니다!</h2>
            <p className={styles.cardDesc}>
              관리자가 사업자등록증을 확인한 후 승인 처리를 진행합니다.<br />
              (테스트 환경: 지금 바로 공고 등록 테스트가 가능합니다)
            </p>

            <button className={styles.primaryBtn} onClick={handleSubmit}>
              공고 등록하러 가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
