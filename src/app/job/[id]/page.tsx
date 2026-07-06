'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, MapPin, Clock, ShieldCheck, PhoneCall, MessageCircle, Phone, MessageSquare, Eye, Tag, Star, MessageSquareCode } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import styles from './detail.module.css';
import BannerTemplate from '../../../components/BannerTemplate';
import { sendMessage } from '../../../lib/messages';

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { topBanners, priorityJobs, recommendedJobs, generalJobs, currentUser } = useApp();
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatText, setChatText] = useState('');

  const allJobs = [...topBanners, ...priorityJobs, ...recommendedJobs, ...generalJobs];
  const job = allJobs.find(j => String(j.id) === resolvedParams.id);

  if (!job) {
    if (allJobs.length === 0) {
      return (
        <div className={styles.container}>
          <div className={styles.loading}>로딩 중...</div>
        </div>
      );
    }
    notFound();
  }

  const phone = (job as any).contactPhone ?? null;
  const kakao = (job as any).contactKakao ?? null;

  const premium = (job as any).premium;

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <ChevronLeft size={22} />
          <span>목록으로</span>
        </Link>
        <div className={styles.headerTitle}>구인 상세 정보</div>
        <div className={styles.headerRight}>
          <Eye size={14} />
          <span>{job.viewCount}회 조회</span>
        </div>
      </header>

      <main className={styles.main}>
        {/* 배지 바 */}
        <div className={styles.badgeBar}>
          {job.type === 'top' && <span className={styles.badgeTop}>👑 프리미엄</span>}
          {job.type === 'priority' && <span className={styles.badgePriority}>⭐ 우대</span>}
          {premium?.urgentBadge && <span className={styles.badgeUrgent}>⚡ 급구</span>}
          {premium?.vipBadge && <span className={styles.badgeVip}>VIP</span>}
          <span className={styles.badgeLocation}><MapPin size={11} /> {job.location}</span>
        </div>

        {/* 히어로 이미지 */}
        {job.customStyle ? (
          <div style={{ marginBottom: 16 }}>
            <BannerTemplate
              data={{
                companyName: job.companyName,
                region: job.location,
                jobType: job.tag || '업종',
                payType: '일급',
                payAmount: '',
                description: job.title,
                tags: job.tag ? [job.tag] : [],
                customStyle: job.customStyle,
              }}
            />
          </div>
        ) : job.image ? (
          <div className={styles.heroImageWrapper}>
            <img src={job.image} alt={job.title} className={styles.heroImage} />
          </div>
        ) : (
          <div className={styles.heroPlaceholder}>
            <span>🌙 아름다운밤 공식 인증 업소</span>
          </div>
        )}

        {/* 공고 메인 정보 */}
        <div className={styles.infoCard}>
          <h1 className={styles.jobTitle}>{job.title}</h1>
          <div className={styles.companyName}>{job.companyName}</div>

          <div className={styles.keyInfoGrid}>
            <div className={styles.keyInfoItem}>
              <div className={styles.keyInfoLabel}>💰 급여</div>
              <div className={styles.keyInfoValue + ' ' + styles.payValue}>{job.pay}</div>
            </div>
            <div className={styles.keyInfoItem}>
              <div className={styles.keyInfoLabel}><MapPin size={13} /> 지역</div>
              <div className={styles.keyInfoValue}>{job.location}</div>
            </div>
            <div className={styles.keyInfoItem}>
              <div className={styles.keyInfoLabel}><Clock size={13} /> 근무시간</div>
              <div className={styles.keyInfoValue}>{job.workHours || '협의 가능'}</div>
            </div>
            <div className={styles.keyInfoItem}>
              <div className={styles.keyInfoLabel}><Tag size={13} /> 지원 조건</div>
              <div className={styles.keyInfoValue}>{job.requirements || '경력 무관'}</div>
            </div>
          </div>

          {/* 태그 */}
          {job.tag && (
            <div className={styles.tagRow}>
              <span className={styles.tagChip}>{job.tag}</span>
              <span className={styles.tagChip}>#당일지급가능</span>
              <span className={styles.tagChip}>#초보환영</span>
            </div>
          )}
        </div>

        {/* 연락처 카드 */}
        <div className={styles.contactCard}>
          <h3 className={styles.contactTitle}>📞 업소 직접 연락처</h3>
          {phone ? (
            <div className={styles.contactRow}>
              <Phone size={16} className={styles.contactIcon} />
              <div>
                <div className={styles.contactLabel}>대표 전화번호</div>
                <div className={styles.contactValue}>{phone}</div>
              </div>
              <a href={`tel:${phone}`} className={styles.callBtn}>전화하기</a>
            </div>
          ) : (
            <div className={styles.contactNoData}>📵 전화번호 미등록</div>
          )}
          {kakao ? (
            <div className={styles.contactRow}>
              <MessageSquare size={16} className={styles.contactIconKakao} />
              <div>
                <div className={styles.contactLabel}>카카오톡 ID</div>
                <div className={styles.contactValue}>{kakao}</div>
              </div>
              <a
                href={`https://open.kakao.com/o/${kakao}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.kakaoBtn}
              >카카오 문의</a>
            </div>
          ) : (
            <div className={styles.contactNoData}>💬 카카오톡 ID 미등록</div>
          )}

          {/* 아밤 안심 톡 연락망 */}
          <div className={styles.contactRow} style={{ borderTop: '1px dashed #f0e0ea', paddingTop: 12 }}>
            <MessageSquare size={16} className={styles.contactIcon} style={{ color: '#7c3aed' }} />
            <div>
              <div className={styles.contactLabel} style={{ color: '#7c3aed', fontWeight: 700 }}>아밤 안심 연락망</div>
              <div className={styles.contactValue} style={{ color: '#6d28d9', fontSize: '13px' }}>개인 번호/카톡 노출 없는 1:1 익명 채팅</div>
            </div>
            <button
              onClick={() => setShowChatModal(true)}
              className={styles.kakaoBtn}
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', marginLeft: 'auto' }}
            >
              안심 톡 시작
            </button>
          </div>
        </div>


        {/* 상세 설명 블록들 */}
        <div className={styles.blockPink}>
          <h3 className={styles.blockHeading}>💖 왜 저희 업소를 선택해야 할까요?</h3>
          <ul className={styles.blockList}>
            <li>✔ 100% 당일 결제 보장: <strong>{job.pay}</strong> (현금/계좌이체 즉시 지급)</li>
            <li>✔ 압도적인 테이블 수: 대기 없이 무한 매칭 최상의 고수익 보장</li>
            <li>✔ 가족 같은 편안한 분위기: 텃세 없는 행복한 근무지 제공</li>
            <li>✔ 초보자 전담 케어: 실장님 1:1 맞춤 안내 및 지원</li>
          </ul>
        </div>

        <div className={styles.blockBlue}>
          <h3 className={styles.blockHeading}>🙋‍♀️ 이런 분을 찾고 있어요!</h3>
          <ul className={styles.blockList}>
            <li>✔ 지원 대상: <strong>{job.requirements || '20세 이상 성인 여성이면 누구나 환영'}</strong></li>
            <li>✔ 대학생, 직장인, 투잡, 초보자, 단기·주말 알바 모두 환영</li>
            <li>✔ 근면 성실하고 밝은 미소로 함께 즐겁게 일하실 분</li>
          </ul>
        </div>

        <div className={styles.blockGreen}>
          <h3 className={styles.blockHeading}>📋 근무 조건 & 약속</h3>
          <ul className={styles.blockList}>
            <li>✔ 근무 시간: <strong>{job.workHours || '저녁 7시 ~ 새벽 3시 (시간 조절 가능)'}</strong></li>
            <li>✔ 근무지: <strong>{job.location}</strong> 인근 초역세권</li>
            <li>✔ 안심 귀가 케어: 전 지역 무료 안심 퇴근 차량 운행</li>
            <li>✔ 개인 정보 철저 보호: 100% 프라이버시 보장</li>
          </ul>
        </div>

        {/* 업소 설명 */}
        {job.description && (
          <div className={styles.descCard}>
            <h3 className={styles.descTitle}>📝 업소 소개</h3>
            <p className={styles.descText}>{job.description}</p>
          </div>
        )}

        {/* 인증 배지 */}
        <div className={styles.certBadgeRow}>
          <div className={styles.certBadge}><ShieldCheck size={16} /> 아름다운밤 인증 업소</div>
          <div className={styles.certBadge}><Star size={16} /> 안전 거래 보장</div>
          <div className={styles.certBadge}>🔒 개인정보 보호</div>
        </div>

        {/* 하단 여백 (플로팅 바 공간) */}
        <div style={{ height: 90 }} />
      </main>

      {/* 플로팅 액션 바 */}
      <div className={styles.floatingActionBar}>
        <button
          onClick={() => setShowChatModal(true)}
          className={styles.actionChat}
        >
          <MessageSquare size={18} />
          실시간 안심 톡
        </button>
        {phone ? (
          <a href={`tel:${phone}`} className={styles.actionPrimary}>
            <PhoneCall size={18} />
            전화하기
          </a>
        ) : (
          <span className={styles.actionDisabled}>
            <PhoneCall size={18} />
            번호 미등록
          </span>
        )}
      </div>

      {/* 실시간 안심 톡 모달 */}
      {showChatModal && (
        <div className={styles.modalOverlay} onClick={() => setShowChatModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>
              <MessageSquare size={20} color="#7c3aed" />
              1:1 실시간 안심 톡 문의
            </h3>
            <p className={styles.modalDesc}>
              수신업소: <strong>{job.companyName}</strong><br />
              개인 전화번호와 카카오톡 ID를 노출하지 않고 플랫폼 내에서 안전하게 직접 문의할 수 있습니다.
            </p>
            <textarea
              className={styles.chatTextArea}
              placeholder="안녕하세요! 공고 보고 연락드렸습니다. 근무 조건이나 면접 일정에 대해 문의드리고 싶습니다..."
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
            />
            <div className={styles.modalBtnRow}>
              <button className={styles.modalCloseBtn} onClick={() => setShowChatModal(false)}>
                취소
              </button>
              <button
                className={styles.modalSendBtn}
                onClick={() => {
                  if (!chatText.trim()) return;
                  if (!currentUser) {
                    alert('실시간 안심 톡을 이용하려면 먼저 로그인하세요.');
                    return;
                  }
                  sendMessage({
                    from: currentUser.id,
                    fromName: currentUser.nickname || currentUser.username,
                    to: (job as any).createdBy || 'u_test_employer',
                    toName: job.companyName,
                    subject: `[안심톡] ${job.companyName} 지원 문의`,
                    content: chatText,
                  });
                  alert('안심 톡 전송 완료! 사장님이 확인 후 답변드립니다.');
                  setChatText('');
                  setShowChatModal(false);
                }}
                disabled={!chatText.trim()}
              >
                전송하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

