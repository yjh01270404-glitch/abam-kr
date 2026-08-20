import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MapPin, Search, Flame } from 'lucide-react';
import { SEO_KEYWORDS } from '../../lib/seo-keywords';

export const metadata: Metadata = {
  title: '아름다운밤 | 지역별·업종별 검색어 모음',
  description: '아름다운밤(아밤) 서울 강남, 홍대, 마포, 영등포, 경기, 부산, 대구 등 전국 주요 지역별 및 업종별 고수익 밤알바·유흥알바 인기 검색어 모음입니다.',
  keywords: '강남밤알바, 서울유흥알바, 지역별밤알바, 업종별밤알바, 아름다운밤, 아밤',
};

// 경쟁업체 상호 제외 필터
const isCleanKeyword = (kw: string) => !kw.includes('여우') && !kw.includes('퀸');

// 핵심 직종 키워드 (지역명 미포함 및 경쟁사 상호 제외)
const CORE_KW = SEO_KEYWORDS
  .filter(isCleanKeyword)
  .filter(kw =>
    !kw.includes('강남') && !kw.includes('역삼') && !kw.includes('선릉') && !kw.includes('서초') &&
    !kw.includes('반포') && !kw.includes('논현') && !kw.includes('마포') && !kw.includes('홍대') &&
    !kw.includes('신촌') && !kw.includes('합정') && !kw.includes('연남') && !kw.includes('강서') &&
    !kw.includes('영등포') && !kw.includes('송파') && !kw.includes('잠실') && !kw.includes('여의도') &&
    !kw.includes('수원') && !kw.includes('인천') && !kw.includes('부천') && !kw.includes('일산') &&
    !kw.includes('분당') && !kw.includes('평택') && !kw.includes('화성') && !kw.includes('안산') &&
    !kw.includes('안양') && !kw.includes('용인') && !kw.includes('부산') && !kw.includes('대구') &&
    !kw.includes('광주') && !kw.includes('대전') && !kw.includes('울산') && !kw.includes('천안') &&
    !kw.includes('청주') && !kw.includes('전주') && !kw.includes('제주') && !kw.includes('창원') &&
    !kw.includes('포항') && !kw.includes('구미') && !kw.includes('춘천') && !kw.includes('강릉')
  );

// 지역별 그룹 정의
const REGION_GROUPS = [
  { label: '📍 서울 강남 / 서초 / 역삼', keys: ['강남', '강남구', '역삼', '선릉', '서초', '논현', '신논현'] },
  { label: '📍 서울 마포 / 홍대 / 신촌', keys: ['마포', '홍대', '신촌', '합정', '연남', '상수', '망원'] },
  { label: '📍 서울 영등포 / 송파 / 강서', keys: ['영등포', '여의도', '송파', '잠실', '강동', '강서', '발산'] },
  { label: '📍 경기 / 인천 수도권', keys: ['수원', '수원역', '분당', '일산', '일산동구', '일산서구', '부천', '부천역', '용인', '안산', '안양', '평택', '화성', '인천'] },
  { label: '📍 부산 / 대구 / 광주 / 대전 / 울산', keys: ['부산', '부산진구', '대구', '광주', '대전', '울산'] },
  { label: '📍 지방 주요 도시', keys: ['천안', '청주', '전주', '제주', '제주시', '서귀포', '창원', '포항', '구미', '김해', '춘천', '강릉', '원주', '순천', '목포'] },
];

export default function KeywordsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      color: '#1e293b',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '32px 16px 60px 16px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 상단 네비게이션 */}
        <div style={{ marginBottom: '24px' }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            padding: '6px 12px',
            borderRadius: '6px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
          }}>
            <ArrowLeft size={16} /> 메인 홈으로 돌아가기
          </Link>
        </div>

        {/* 헤더 타이틀 & 이전 푸터 상세 설명 배치 */}
        <div style={{
          background: 'linear-gradient(135deg, #be185d 0%, #880e4f 100%)',
          borderRadius: '16px',
          padding: '32px 24px',
          color: '#ffffff',
          marginBottom: '32px',
          boxShadow: '0 10px 25px rgba(190, 24, 93, 0.15)',
        }}>
          <h1 style={{
            fontSize: '26px',
            fontWeight: '900',
            margin: '0 0 12px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <MapPin size={28} color="#fbcfe8" /> 지역별 & 업종별 검색어 모음
          </h1>
          <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#fce7f3', opacity: 0.95, lineHeight: '1.6' }}>
            전국 주요 유흥상권 및 업종별 인기 검색어를 한눈에 확인하고 원하시는 일자리 정보를 빠르게 찾아보세요.
          </p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '13.5px',
            color: '#fbe8f3',
            lineHeight: '1.6',
            borderLeft: '4px solid #f472b6',
          }}>
            아름다운밤(아밤)은 밤알바, 유흥알바, 룸알바, 바알바, 노래방알바, 술집알바, 클럽알바, 하이퍼블릭알바, 셔츠룸알바, 텐프로알바, 쩜오알바, 란제리알바, 풀싸롱알바 등 여성 고수익 구인구직 정보를 제공하는 전문 플랫폼입니다. 서울 강남, 홍대, 마포, 신촌, 영등포, 수원, 인천, 부산, 대구, 대전, 광주, 제주 등 전국 검증 업소 채용정보를 실시간 제공합니다.
          </div>
        </div>

        {/* 1. 인기 대표 직종 키워드 */}
        <section style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '800',
            color: '#be185d',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Flame size={20} color="#be185d" /> 🔥 인기 직종 / 시그니처 검색어
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            {CORE_KW.slice(0, 50).map((kw) => (
              <Link
                key={kw}
                href={`/seo/${encodeURIComponent(kw.replace(/\s+/g, '-'))}`}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: '#fdf2f8',
                  color: '#be185d',
                  fontSize: '13px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  border: '1px solid #fbcfe8',
                  transition: 'all 0.15s ease',
                }}
              >
                {kw}
              </Link>
            ))}
          </div>
        </section>

        {/* 2. 지역별 키워드 리스트 그룹 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {REGION_GROUPS.map((group) => {
            const keywords = SEO_KEYWORDS
              .filter(isCleanKeyword)
              .filter(kw => group.keys.some(k => kw.startsWith(k + ' ') || (kw.startsWith(k) && (kw[k.length] === undefined || !'가나다라마바사아자차카타파하'.includes(kw[k.length])))))
              .slice(0, 200);

            if (keywords.length === 0) return null;

            return (
              <section
                key={group.label}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <h3 style={{
                  fontSize: '17px',
                  fontWeight: '800',
                  color: '#1e293b',
                  margin: '0 0 16px 0',
                  paddingBottom: '10px',
                  borderBottom: '2px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  {group.label}
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginLeft: 'auto' }}>
                    총 {keywords.length}개 키워드
                  </span>
                </h3>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px 10px',
                }}>
                  {keywords.map((kw) => (
                    <Link
                      key={kw}
                      href={`/seo/${encodeURIComponent(kw.replace(/\s+/g, '-'))}`}
                      style={{
                        fontSize: '13px',
                        color: '#475569',
                        textDecoration: 'none',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: '#f8fafc',
                        border: '1px solid #f1f5f9',
                        transition: 'all 0.12s ease',
                      }}
                    >
                      {kw}
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* 하단 푸터 연결 */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#1e293b',
            color: '#ffffff',
            padding: '12px 28px',
            borderRadius: '30px',
            fontSize: '14px',
            fontWeight: '700',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}>
            <Search size={16} /> 메인 페이지로 이동하여 채용정보 검색하기
          </Link>
        </div>

      </div>
    </div>
  );
}
