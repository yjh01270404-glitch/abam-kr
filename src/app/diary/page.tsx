'use client';

import React, { useState, useEffect } from 'react';
import styles from './diary.module.css';
import { ChevronLeft, ChevronRight, Wallet, Lock, ShieldCheck, Delete } from 'lucide-react';
import Link from 'next/link';

interface DailyEntry {
  income: number;
  expense: number;
}

export default function PayDiaryPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entries, setEntries] = useState<Record<string, DailyEntry>>({});
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalIncome, setModalIncome] = useState('');
  const [modalExpense, setModalExpense] = useState('');

  // Security states
  const [isClient, setIsClient] = useState(false);
  const [showTrustNotice, setShowTrustNotice] = useState(false);
  const [savedPin, setSavedPin] = useState<string | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinSetupMode, setPinSetupMode] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const hasAgreed = localStorage.getItem('abam_diary_trust');
    const existingPin = localStorage.getItem('abam_diary_pin');
    
    if (!hasAgreed) {
      setShowTrustNotice(true);
    } else if (!existingPin) {
      setPinSetupMode(true);
    } else {
      setSavedPin(existingPin);
    }

    const savedData = localStorage.getItem('abam_pay_diary');
    if (savedData) {
      try {
        setEntries(JSON.parse(savedData));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleAgreeTrust = () => {
    localStorage.setItem('abam_diary_trust', 'true');
    setShowTrustNotice(false);
    setPinSetupMode(true);
  };

  const handlePinInput = (num: string) => {
    if (pinInput.length < 4) {
      const newVal = pinInput + num;
      setPinInput(newVal);
      
      if (newVal.length === 4) {
        setTimeout(() => {
          if (pinSetupMode) {
            localStorage.setItem('abam_diary_pin', newVal);
            setSavedPin(newVal);
            setPinSetupMode(false);
            setIsUnlocked(true);
          } else {
            if (newVal === savedPin) {
              setIsUnlocked(true);
            } else {
              alert('비밀번호가 일치하지 않습니다.');
              setPinInput('');
            }
          }
        }, 200);
      }
    }
  };

  const handlePinDelete = () => {
    setPinInput(prev => prev.slice(0, -1));
  };

  // Rest of the normal logic
  const saveEntries = (newEntries: Record<string, DailyEntry>) => {
    setEntries(newEntries);
    localStorage.setItem('abam_pay_diary', JSON.stringify(newEntries));
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthlyTotal = Object.entries(entries).reduce((acc, [dateStr, entry]) => {
    const [y, m] = dateStr.split('-');
    if (parseInt(y) === year && parseInt(m) === month + 1) {
      return acc + (entry.income || 0) - (entry.expense || 0);
    }
    return acc;
  }, 0);

  const openModal = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    const existing = entries[dateStr] || { income: 0, expense: 0 };
    setModalIncome(existing.income ? String(existing.income) : '');
    setModalExpense(existing.expense ? String(existing.expense) : '');
  };

  const saveModal = () => {
    if (!selectedDate) return;
    const incomeNum = parseInt(modalIncome.replace(/[^0-9]/g, '')) || 0;
    const expenseNum = parseInt(modalExpense.replace(/[^0-9]/g, '')) || 0;
    const newEntries = { ...entries, [selectedDate]: { income: incomeNum, expense: expenseNum } };
    saveEntries(newEntries);
    setSelectedDate(null);
  };

  if (!isClient) return null;

  // 1. Trust Notice Modal
  if (showTrustNotice) {
    return (
      <div className={styles.diaryWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={styles.modalContent} style={{ textAlign: 'center', padding: '30px 20px' }}>
          <div className={styles.trustIcon}>
            <ShieldCheck size={28} />
          </div>
          <h2 className={styles.trustTitle}>안심하고 기록하세요 💖</h2>
          <p className={styles.trustDesc}>
            아밤 페이다이어리에 기록되는 수입/지출 내역은 서버에 저장되지 않고, <strong>오직 현재 사용 중인 휴대폰 내부에만 안전하게 보관</strong>됩니다.<br/><br/>
            누구도 볼 수 없는 나만의 장부이니, 안심하고 편하게 사용해 보세요!
          </p>
          <button className={styles.trustAgreeBtn} onClick={handleAgreeTrust}>시작하기</button>
        </div>
      </div>
    );
  }

  // 2. PIN Lock Screen
  if (!isUnlocked) {
    return (
      <div className={styles.diaryWrapper}>
        <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>← 메인으로 돌아가기</Link>
        <div className={styles.pinWrapper}>
          <div style={{ marginBottom: 20 }}><Lock size={40} color="#c084fc" /></div>
          <h2 className={styles.pinTitle}>{pinSetupMode ? '나만의 장부 비밀번호 설정 (4자리)' : '장부 비밀번호를 입력하세요'}</h2>
          <div className={styles.pinDots}>
            {[0,1,2,3].map(i => (
              <div key={i} className={`${styles.pinDot} ${pinInput.length > i ? styles.pinDotFilled : ''}`} />
            ))}
          </div>
          <div className={styles.pinKeypad}>
            {[1,2,3,4,5,6,7,8,9].map(num => (
              <button key={num} className={styles.pinKey} onClick={() => handlePinInput(String(num))}>{num}</button>
            ))}
            <div />
            <button className={styles.pinKey} onClick={() => handlePinInput('0')}>0</button>
            <button className={styles.pinKey} onClick={handlePinDelete}><Delete size={24} /></button>
          </div>
        </div>
      </div>
    );
  }

  // Monthly Calculations
  const monthlyEntries = Object.entries(entries).filter(([dateStr]) => {
    const [y, m] = dateStr.split('-');
    return parseInt(y) === year && parseInt(m) === month + 1;
  });

  const monthlyTotalIncome = monthlyEntries.reduce((acc, [_, entry]) => acc + (entry.income || 0), 0);
  const monthlyTotalExpense = monthlyEntries.reduce((acc, [_, entry]) => acc + (entry.expense || 0), 0);
  const monthlyTotalNet = monthlyTotalIncome - monthlyTotalExpense;
  const monthlyDaysCount = monthlyEntries.length || 1;
  const monthlyAverageNet = Math.round(monthlyTotalNet / monthlyDaysCount);

  // Progress ratio
  const totalVolume = monthlyTotalIncome + monthlyTotalExpense || 1;
  const incomeRatio = Math.round((monthlyTotalIncome / totalVolume) * 100);
  const expenseRatio = 100 - incomeRatio;

  const handleExportCSV = () => {
    if (Object.keys(entries).length === 0) {
      alert('저장된 장부 내역이 없어 내보낼 수 없습니다.');
      return;
    }
    
    let csvContent = '\uFEFF'; // UTF-8 BOM for Excel
    csvContent += '날짜,총 수입(원),총 지출(원),순수익(원)\n';
    
    const sortedDates = Object.keys(entries).sort();
    sortedDates.forEach((dateStr) => {
      const entry = entries[dateStr];
      const net = entry.income - entry.expense;
      csvContent += `${dateStr},${entry.income},${entry.expense},${net}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `abam_diary_정산내역_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 3. Main Diary View
  return (
    <div className={styles.diaryWrapper}>
      <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
        ← 홈으로 돌아가기
      </Link>
      
      <div className={styles.header}>
        <h1 className={styles.title}>아밤 페이 다이어리 💖</h1>
        <p className={styles.subtitle}>
          <ShieldCheck size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          안심하세요! 데이터는 내 휴대폰에만 저장되어 있어요.
        </p>
      </div>

      <div className={styles.summaryCard}>
        <div>
          <div className={styles.summaryLabel}>{month + 1}월 총 순수익</div>
          <div className={styles.summaryAmount}>
            {monthlyTotalNet > 0 ? monthlyTotalNet.toLocaleString() : 0}<span>원</span>
          </div>
        </div>
        <Wallet size={32} color="#c084fc" opacity={0.8} />
      </div>

      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
          <button className={styles.navBtn} onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
          <div className={styles.monthYear}>{year}년 {month + 1}월</div>
          <button className={styles.navBtn} onClick={handleNextMonth}><ChevronRight size={20} /></button>
        </div>

        <div className={styles.weekdays}>
          <div>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
        </div>
        <div className={styles.daysGrid}>
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className={styles.dayCell}></div>)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const entry = entries[dateStr];
            const net = entry ? entry.income - entry.expense : 0;
            return (
              <div key={day} className={`${styles.dayCell} ${isToday ? styles.today : ''}`} onClick={() => openModal(day)}>
                <span className={styles.dayNumber}>{day}</span>
                {net > 0 && <span className={styles.dayIncomeBadge}>+{net / 10000}만</span>}
                {net < 0 && <span className={styles.dayExpenseBadge}>{net / 10000}만</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 📊 수입 통계 분석 패널 */}
      <div className={styles.statsCard}>
        <div className={styles.statsHeader}>
          <h3 className={styles.statsTitle}>📊 {month + 1}월 장부 리포트 & 분석</h3>
          <button className={styles.exportBtn} onClick={handleExportCSV}>
            📥 엑셀(CSV) 다운로드
          </button>
        </div>
        
        {monthlyTotalIncome === 0 && monthlyTotalExpense === 0 ? (
          <div className={styles.statsEmpty}>
            달력의 날짜를 터치하여 오늘 하루 동안 번 수입과 지출을 기록하면 분석 리포트가 실시간 활성화됩니다!
          </div>
        ) : (
          <div className={styles.statsContent}>
            <div className={styles.statsRow}>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>총 수입 💰</span>
                <span className={styles.statValIncome}>+{monthlyTotalIncome.toLocaleString()}원</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>총 지출 💸</span>
                <span className={styles.statValExpense}>-{monthlyTotalExpense.toLocaleString()}원</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>하루 평균 순수익 📈</span>
                <span className={styles.statValAverage}>{monthlyAverageNet.toLocaleString()}원</span>
              </div>
            </div>
            
            {/* CSS 차트 */}
            <div className={styles.chartWrapper}>
              <div className={styles.chartBar}>
                <div className={styles.chartBarIncome} style={{ width: `${incomeRatio}%` }} />
                <div className={styles.chartBarExpense} style={{ width: `${expenseRatio}%` }} />
              </div>
              <div className={styles.chartLabels}>
                <span>수입 비율 {incomeRatio}%</span>
                <span>지출 비율 {expenseRatio}%</span>
              </div>
            </div>
            
            <div className={styles.statsTip}>
              💡 <strong>총평:</strong> 지출 비율이 {expenseRatio}%로 매우 {expenseRatio > 25 ? '높습니다. 불필요한 고정 지출을 점검하고 알뜰한 자금 관리를 추천해 드립니다.' : '합리적인 저축 습관을 잘 유지하고 계십니다! 앞으로도 화이팅입니다. 💖'}
            </div>
          </div>
        )}
      </div>

      {selectedDate && (
        <div className={styles.modalOverlay} onClick={() => setSelectedDate(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTitle}>{selectedDate.split('-')[1]}월 {selectedDate.split('-')[2]}일 정산</div>
            
            <div className={styles.inputGroup}>
              <label>💰 오늘 총 수입 (T/C, 시급, 팁)</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputPrefix}>₩</span>
                <input
                  type="text"
                  inputMode="numeric"
                  className={styles.amountInput}
                  value={modalIncome !== '' ? Number(modalIncome).toLocaleString('ko-KR') : ''}
                  onChange={(e) => setModalIncome(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="예: 300000"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>💸 오늘 총 지출 (차비, 미용실, 기타)</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputPrefix}>₩</span>
                <input
                  type="text"
                  inputMode="numeric"
                  className={styles.amountInput}
                  value={modalExpense !== '' ? Number(modalExpense).toLocaleString('ko-KR') : ''}
                  onChange={(e) => setModalExpense(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="예: 20000"
                />
              </div>
            </div>

            <div className={styles.modalBtns}>
              <button className={styles.cancelBtn} onClick={() => setSelectedDate(null)}>취소</button>
              <button className={styles.saveBtn} onClick={saveModal}>비밀 장부에 저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
