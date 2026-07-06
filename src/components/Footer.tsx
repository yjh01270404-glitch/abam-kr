import Link from 'next/link';
import AbamLogo from './AbamLogo';
import styles from './Footer.module.css';
import { Phone, MessageSquare, BookOpen, Headset, CreditCard, Monitor, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* 1. Upper Four-Column Dashboard */}
      <div className={styles.upperFooter}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Column 1: Customer Center */}
            <div className={styles.gridCol}>
              <div className={styles.csHeader}>
                <div className={styles.phoneIconCircle}>
                  <Phone size={20} />
                </div>
                <div className={styles.csNumbers}>
                  <div className={styles.mainPhone}>070-8057-6615</div>
                  <div className={styles.csHours}>평일 10:00~19:00 점심 12:00~13:30</div>
                  <div className={styles.csSub}>* 주말 및 공휴일은 근무하지 않습니다.</div>
                </div>
              </div>
              <div className={styles.csBanner} style={{ cursor: 'pointer' }} onClick={() => window.dispatchEvent(new Event('abam-open-chat'))}>
                업무시간 외 실시간 문의 남기기 (클릭)
              </div>
            </div>

            {/* Column 2: Quick Links A */}
            <div className={styles.gridColCenter}>
              <div className={styles.quickLinkItem} onClick={() => window.dispatchEvent(new Event('abam-open-chat'))} style={{ cursor: 'pointer' }}>
                <MessageSquare size={16} className={styles.linkIcon} />
                <span>제휴/광고문의</span>
              </div>
              <Link href="/employer/post" className={styles.quickLinkItem} style={{ textDecoration: 'none' }}>
                <BookOpen size={16} className={styles.linkIcon} />
                <span>광고등록안내</span>
              </Link>
            </div>

            {/* Column 3: Quick Links B */}
            <div className={styles.gridColCenter}>
              <div className={styles.quickLinkItem} onClick={() => window.dispatchEvent(new Event('abam-open-chat'))} style={{ cursor: 'pointer' }}>
                <Headset size={16} className={styles.linkIcon} />
                <span>고객지원센터</span>
              </div>
              <div className={styles.quickLinkItem} onClick={() => alert('Q. 가상계좌 입금 확인은 얼마나 걸리나요?\nA. 포트원 결제 연동을 통해 가상계좌 입금 완료 즉시 1초 만에 실시간 자동으로 구인 광고 등록 승인이 처리됩니다.')} style={{ cursor: 'pointer' }}>
                <HelpCircle size={16} className={styles.linkIcon} />
                <span>자주묻는질문</span>
              </div>
            </div>

            {/* Column 4: Portone Virtual Account Guide */}
            <div className={styles.gridCol}>
              <div className={styles.bankTitle}>
                <CreditCard size={14} />
                <span>가상계좌 안전 결제 안내</span>
              </div>
              <div className={styles.bankList} style={{ fontSize: '11.5px', color: '#64748b', lineHeight: '1.5' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#334155', marginBottom: '4px' }}>💳 포트원(PortOne) 가상계좌 발급</p>
                <p style={{ margin: 0 }}>구인 공고 및 광고 배너 비용 결제 시, 각 주문건별로 전용 가상계좌가 발급됩니다. 카드 안전 결제 및 가상계좌 실시간 입금 확인을 지원합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Navigation Link Bar */}
      <div className={styles.middleBar}>
        <div className={styles.container}>
          <div className={styles.middleContent}>
            <div className={styles.middleLinks}>
              <span onClick={() => alert('아름다운밤(abam)은 고품격 프리미엄 여성 구인구직 정보를 제공하는 1위 전문 매칭 서비스 플랫폼입니다.')}>회사소개</span>
              <span className={styles.boldLink} onClick={() => alert('개인정보처리방침: 아밤은 회원의 소중한 개인정보 보호를 최우선 가치로 여기며, 암호화 통신을 통해 절대 외부로 노출되지 않음을 보장합니다.')}>개인정보처리방침</span>
              <span onClick={() => alert('이용약관: 본 서비스는 만 19세 이상만 가입 및 열람이 가능하며, 대리 등록이나 불법 구인 행위 적발 시 민형사상 조치가 행해질 수 있습니다.')}>이용약관</span>
              <span onClick={() => alert('공지사항: 7월 구인광고 신규 가입 무료 이벤트 및 가상계좌 결제 간소화 패치가 완료되었습니다. 공지 게시글을 확인하세요.')}>공지사항</span>
              <span onClick={() => document.getElementById('community-section')?.scrollIntoView({ behavior: 'smooth' })}>커뮤니티</span>
              <span onClick={() => window.dispatchEvent(new Event('abam-open-chat'))}>고객의견게시판</span>
            </div>
            <button className={styles.resolutionBtn} onClick={() => alert('해상도가 최적화되었습니다.')}>
              <Monitor size={12} />
              <span>모니터 해상도 조절</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Corporate Information Section */}
      <div className={styles.bottomSection}>
        <div className={styles.container}>
          <div className={styles.bottomFlex}>
            <div className={styles.corpInfo}>
              <p>상호: <AbamLogo fontSize="12px" />(abam) | 대표자: 양정호 | 사업자등록번호: 541-09-03234 | 통신판매업신고: 제2026-서울서대문-0168호</p>
              <p>주소: 서울 서대문구 거북골로 18가길 23 | 직업정보제공사업 신고번호: 제2026-서울서대문-</p>
              <p>TEL: 070-8057-6615 | E-mail: help@abam.kr | 개인정보관리책임자: 양정호</p>
              <div style={{ marginTop: '10px', fontSize: '11px', color: '#64748b', lineHeight: '1.4', wordBreak: 'keep-all' }}>
                아름다운밤은 유흥알바, 밤알바, 노래방알바, 바알바, 퀸알바, 악녀알바, 여우알바, 텐프로, 룸알바 등 고수익 여성 구인구직 정보를 제공하는 안전한 일자리 플랫폼입니다. 당사는 직업안정법 등 관련 법규를 준수하며 불건전한 직업 소개 및 알선을 엄격히 금지합니다.
              </div>
              <p className={styles.copyright} style={{ marginTop: '10px' }}>Copyright(c) 2026 <AbamLogo fontSize="12px" />.kr Net, <AbamLogo fontSize="12px" />. All rights reserved.</p>
            </div>
            
            {/* Adult Safety Badges */}
            <div className={styles.badgeWrapper}>
              <div className={styles.adultBadge}>
                <span>19</span>
              </div>
              <div className={styles.secureBadge}>
                <span>CLEAN<br/>SERVICE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
