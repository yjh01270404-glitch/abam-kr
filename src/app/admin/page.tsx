'use client';

import { useState } from 'react';
import { ShieldCheck, Search, Users, FileText, Check, X } from 'lucide-react';
import styles from './admin.module.css';

// Mock Data
const mockEmployers = [
  { id: 1, name: '아름다운밤 라운지', regNumber: '123-45-67890', owner: '홍길동', phone: '010-1111-2222', status: 'pending', date: '2026-07-02' },
  { id: 2, name: '강남 에이스룸', regNumber: '222-33-44444', owner: '김에이스', phone: '010-3333-4444', status: 'approved', date: '2026-07-01' },
  { id: 3, name: '역삼 텐카페', regNumber: '555-66-77777', owner: '이마담', phone: '010-5555-6666', status: 'pending', date: '2026-07-02' },
];

export default function AdminDashboard() {
  const [employers, setEmployers] = useState(mockEmployers);

  const handleApprove = (id: number) => {
    if(confirm('승인하시겠습니까?')) {
      setEmployers(employers.map(e => e.id === id ? { ...e, status: 'approved' } : e));
    }
  };

  const handleReject = (id: number) => {
    if(confirm('거절하시겠습니까?')) {
      setEmployers(employers.map(e => e.id === id ? { ...e, status: 'rejected' } : e));
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className="text-gold">아름다운밤</span> ADMIN
        </div>
        <nav className={styles.nav}>
          <a href="#" className={`${styles.navItem} ${styles.active}`}>
            <Users size={20} />
            가입 승인 관리
          </a>
          <a href="#" className={styles.navItem}>
            <FileText size={20} />
            공고 및 결제 내역
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>가입 승인 관리</h1>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input type="text" placeholder="업체명 또는 사업자번호 검색" className={styles.searchInput} />
          </div>
        </header>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>승인 대기</h3>
            <div className={styles.statValue}>{employers.filter(e => e.status === 'pending').length}건</div>
          </div>
          <div className={styles.statCard}>
            <h3>오늘 가입자</h3>
            <div className={styles.statValue}>2명</div>
          </div>
          <div className={styles.statCard}>
            <h3>총 가입 업체</h3>
            <div className={styles.statValue}>154곳</div>
          </div>
        </div>

        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>가입일</th>
                <th>업체명</th>
                <th>사업자등록번호</th>
                <th>대표자명</th>
                <th>연락처</th>
                <th>사업자등록증</th>
                <th>상태 / 관리</th>
              </tr>
            </thead>
            <tbody>
              {employers.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.date}</td>
                  <td className={styles.bold}>{emp.name}</td>
                  <td>{emp.regNumber}</td>
                  <td>{emp.owner}</td>
                  <td>{emp.phone}</td>
                  <td>
                    <button className={styles.docBtn}>증명서 보기</button>
                  </td>
                  <td>
                    {emp.status === 'pending' && (
                      <div className={styles.actionBtns}>
                        <button className={styles.approveBtn} onClick={() => handleApprove(emp.id)}>
                          <Check size={16} /> 승인
                        </button>
                        <button className={styles.rejectBtn} onClick={() => handleReject(emp.id)}>
                          <X size={16} /> 거절
                        </button>
                      </div>
                    )}
                    {emp.status === 'approved' && <span className={styles.statusBadge}><ShieldCheck size={14}/> 승인완료</span>}
                    {emp.status === 'rejected' && <span className={`${styles.statusBadge} ${styles.rejected}`}>거절됨</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
