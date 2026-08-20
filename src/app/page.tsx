'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Store, Megaphone, MapPin, Sparkles, ShieldCheck, CreditCard,
  CheckCircle, ArrowRight, Star, Award, TrendingUp, Users, PhoneCall, ChevronRight
} from 'lucide-react';

const CATEGORIES = [
  { id: 'beauty', name: '뷰티·에스테틱', count: '1,420개', icon: Sparkles, color: '#ec4899', desc: '피부관리, 네일아트, 프리미엄 스파' },
  { id: 'hair', name: '헤어·바디케어', count: '980개', icon: Award, color: '#8b5cf6', desc: '헤어살롱, 바디테라피, 스파 테라피' },
  { id: 'cafe', name: '카페·베이커리', count: '2,350개', icon: Store, color: '#f59e0b', desc: '스페셜티 카페, 디저트, 베이커리' },
  { id: 'dining', name: '다이닝·F&B', count: '3,120개', icon: Star, color: '#ef4444', desc: '프리미엄 레스토랑, 퓨전 다이닝' },
  { id: 'fitness', name: '헬스·피트니스', count: '890개', icon: TrendingUp, color: '#10b981', desc: 'PT 스튜디오, 필라테스, 요가' },
  { id: 'studio', name: '스튜디오·문화', count: '640개', icon: Users, color: '#3b82f6', desc: '촬영 스튜디오, 라이프스타일 샵' },
];

const FEATURED_STORES = [
  {
    id: 1,
    name: '루미에르 에스테틱 강남본점',
    category: '뷰티·에스테틱',
    location: '서울 강남구 테헤란로',
    rating: 4.9,
    reviews: 128,
    tag: 'VIP 추천',
    desc: '1:1 맞춤형 프리미엄 피부관리 및 스킨 스케일링 전문 살롱입니다.',
    badgeColor: '#ec4899'
  },
  {
    id: 2,
    name: '아틀리에 헤어 디자인 청담',
    category: '헤어·바디케어',
    location: '서울 강남구 도산대로',
    rating: 4.8,
    reviews: 95,
    tag: '인기 매장',
    desc: '최신 트렌드 헤어 스타일링과 두피 스파 케어 전문.',
    badgeColor: '#8b5cf6'
  },
  {
    id: 3,
    name: '카페 드 로맨티크 한남',
    category: '카페·베이커리',
    location: '서울 용산구 한남대로',
    rating: 4.9,
    reviews: 210,
    tag: '핫플레이스',
    desc: '직접 로스팅한 스페셜티 커피와 유기농 수제 디저트.',
    badgeColor: '#f59e0b'
  },
  {
    id: 4,
    name: '더 프라임 피트니스 & 필라테스',
    category: '헬스·피트니스',
    location: '서울 서초구 사임당로',
    rating: 5.0,
    reviews: 84,
    tag: '신규 입점',
    desc: '체형 교정 전문 1:1 기구 필라테스 및 프라이빗 PT 룸 완비.',
    badgeColor: '#10b981'
  }
];

const AD_PACKAGES = [
  {
    id: 'vip',
    name: '메인 최상단 VIP 배너',
    period: '30일 노출',
    price: '100,000',
    popular: true,
    features: [
      '홈페이지 메인 최상단 롤링 배너 독점 노출',
      '네이버/구글 검색 최상단 키워드 하이라이트',
      '전국 및 지역 타겟 동시 노출',
      '실시간 클릭률/조회수 분석 리포트 제공',
      '배너 무료 디자인 제작 지원'
    ]
  },
  {
    id: 'premium',
    name: '지역 추천 프리미엄 배너',
    period: '30일 노출',
    price: '50,000',
    popular: false,
    features: [
      '해당 시/구 카테고리 최상단 고정 노출',
      '매장 상세 소개 페이지 무료 제작',
      '전화 및 예약 바로가기 버튼 제공',
      '네이버 스마트플레이스 연동 링크'
    ]
  },
  {
    id: 'standard',
    name: '신규 매장 스탠다드 등록',
    period: '30일 노출',
    price: '30,000',
    popular: false,
    features: [
      '카테고리별 매장 디렉토리 등록',
      '매장 사진 최대 10장 등록',
      '고객 리뷰 및 평점 관리 기능'
    ]
  }
];

export default function HomePage() {
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [paySuccess, setPaySuccess] = useState(false);

  const handlePayTest = (pkgName: string, price: string) => {
    // PortOne (아임포트) 표준 테스트 결제 창 연동
    if (typeof window !== 'undefined' && (window as any).IMP) {
      const { IMP } = window as any;
      IMP.init('imp38871032'); // PortOne 기본 테스트 식별코드

      IMP.request_pay({
        pg: 'kcp',
        pay_method: 'card',
        merchant_uid: `abam_ad_${Date.now()}`,
        name: `아밤 ${pkgName}`,
        amount: parseInt(price.replace(/,/g, ''), 10),
        buyer_email: 'buyer@example.com',
        buyer_name: '테스트 광고주',
        buyer_tel: '010-1234-5678',
      }, (rsp: any) => {
        if (rsp.success) {
          alert(`결제가 성공적으로 완료되었습니다! 승인번호: ${rsp.apply_num}`);
          setPaySuccess(true);
        } else {
          alert(`결제 테스트가 취소되었거나 정상적으로 호출되었습니다. (${rsp.error_msg || '테스트 모드'})`);
        }
      });
    } else {
      alert(`[${pkgName}] 결제 신청이 접수되었습니다. (금액: ${price}원)`);
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* 1. Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#FFF',
        padding: '60px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '20px'
          }}>
            <Sparkles size={16} /> 대한민국 1등 로컬 비즈니스 & 디지털 광고 플랫폼
          </div>
          
          <h1 style={{ fontSize: '36px', fontWeight: 900, lineHeight: '1.3', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            우리 매장을 전국 고객에게<br />
            <span style={{ color: '#38bdf8' }}>가장 확실하게 알리는</span> 스마트 배너 광고
          </h1>
          
          <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '650px', margin: '0 auto 30px', lineHeight: '1.6' }}>
            뷰티, 에스테틱, 카페, 다이닝, 헬스·피트니스 등 전국 검증 매장 정보 제공.<br />
            월 수만 명의 잠재 고객에게 우리 매장을 실시간으로 홍보하세요.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#ad-pricing" style={{
              background: '#0284c7',
              color: '#FFF',
              padding: '14px 28px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Megaphone size={18} /> 배너 광고 상품 보기 <ArrowRight size={16} />
            </a>
            <a href="#stores" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#FFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '14px 24px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none'
            }}>
              🔍 입점 매장 둘러보기
            </a>
          </div>
        </div>
      </section>

      {/* 2. Category Grid */}
      <section style={{ maxWidth: '1200px', margin: '-30px auto 50px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          background: '#FFF',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.06)'
        }}>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} style={{
                padding: '16px',
                borderRadius: '12px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: `${cat.color}15`,
                  color: cat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px'
                }}>
                  <Icon size={22} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>{cat.name}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{cat.count} 매장</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Verified Stores */}
      <section id="stores" style={{ maxWidth: '1200px', margin: '0 auto 70px', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>Verified Business</div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>이달의 추천 인증 매장</h2>
          </div>
          <Link href="/business" style={{ fontSize: '14px', fontWeight: 700, color: '#0284c7', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            전체 매장 보기 <ChevronRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {FEATURED_STORES.map(store => (
            <div key={store.id} style={{
              background: '#FFF',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: `${store.badgeColor}15`,
                    color: store.badgeColor
                  }}>
                    {store.tag}
                  </span>
                  <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Star size={14} fill="#f59e0b" /> {store.rating} ({store.reviews})
                  </span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>{store.name}</h3>
                <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                  <MapPin size={14} /> {store.location}
                </div>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>{store.desc}</p>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{store.category}</span>
                <button onClick={() => alert(`[${store.name}] 매장 상세 정보 페이지로 연결됩니다.`)} style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}>
                  매장 보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Banner Ad Pricing & PortOne Checkout */}
      <section id="ad-pricing" style={{
        background: '#0f172a',
        color: '#FFF',
        padding: '70px 20px',
        borderTop: '1px solid #1e293b'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 700
            }}>
              Digital Marketing Packages
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 900, marginTop: '12px', letterSpacing: '-0.5px' }}>
              합리적인 비용의 프리미엄 배너 광고 상품
            </h2>
            <p style={{ fontSize: '15px', color: '#94a3b8', marginTop: '8px' }}>
              원하는 위치와 기간을 선택하고 실시간 온라인 결제를 통해 즉시 광고를 개시하세요.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {AD_PACKAGES.map(pkg => (
              <div key={pkg.id} style={{
                background: '#1e293b',
                borderRadius: '16px',
                border: pkg.popular ? '2px solid #38bdf8' : '1px solid #334155',
                padding: '30px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '24px',
                    background: '#38bdf8',
                    color: '#0f172a',
                    fontWeight: 900,
                    fontSize: '11px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    letterSpacing: '0.5px'
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFF' }}>{pkg.name}</h3>
                  <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>{pkg.period}</div>

                  <div style={{ margin: '20px 0', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 900, color: '#38bdf8' }}>₩{pkg.price}</span>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>/ 30일 (VAT 포함)</span>
                  </div>

                  <div style={{ borderTop: '1px solid #334155', paddingTop: '16px', marginTop: '16px' }}>
                    {pkg.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1', marginBottom: '10px' }}>
                        <CheckCircle size={15} color="#10b981" /> {feat}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handlePayTest(pkg.name, pkg.price)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: pkg.popular ? '#0284c7' : '#334155',
                    color: '#FFF',
                    fontWeight: 800,
                    fontSize: '15px',
                    cursor: 'pointer',
                    marginTop: '24px',
                    transition: 'all 0.2s'
                  }}
                >
                  💳 신청 및 결제하기
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="#10b981" />
            안전한 거래를 위해 포트원(PortOne) 및 공인 전자결제대행사(PG) 시스템을 통해 암호화 결제됩니다.
          </div>
        </div>
      </section>
    </div>
  );
}
