'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Search, PlusCircle, MessageSquare, Phone, MapPin, Sparkles, ShieldCheck, Heart, Clock, Lock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { talentProfiles as mockTalents } from '../../lib/mockData';
import { getPostedAdsForSection } from '../../lib/recruiterStore';

export default function TalentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [talents, setTalents] = useState<any[]>(mockTalents);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [selectedTalentContact, setSelectedTalentContact] = useState<any>(null);

  // 구인자 유료 채용공고 결제 유무 상태
  const [hasPaidAd, setHasPaidAd] = useState(false);

  // New Talent Registration Form State
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('20대 초반');
  const [region, setRegion] = useState('서울 강남구');
  const [category, setCategory] = useState('룸/라이브 카페');
  const [payTarget, setPayTarget] = useState('일급 50만원 이상');
  const [intro, setIntro] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    // 1. 인재 리스트 로딩
    const stored = localStorage.getItem('abam_user_talents');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTalents([...parsed, ...mockTalents]);
      } catch (e) {
        setTalents(mockTalents);
      }
    }

    // 2. 구인자 유료 구인공고 결제 여부 검증
    checkPaidStatus();
  }, []);

  const checkPaidStatus = () => {
    try {
      // 로컬스토리지 전용 결제 플래그 및 결제 등록 공고 체크
      const isPaidFlag = localStorage.getItem('abam_paid_recruiter') === 'true';
      const postedVvip = getPostedAdsForSection('vvip') || [];
      const postedGrand = getPostedAdsForSection('grand') || [];
      const postedPremium = getPostedAdsForSection('premium') || [];
      const postedLine = getPostedAdsForSection('line') || [];

      const totalPaidCount = postedVvip.length + postedGrand.length + postedPremium.length + postedLine.length;
      
      if (isPaidFlag || totalPaidCount > 0) {
        setHasPaidAd(true);
      } else {
        setHasPaidAd(false);
      }
    } catch (err) {
      setHasPaidAd(false);
    }
  };

  const handleContactClick = (item: any) => {
    // 결제 여부 재검증
    const isPaidFlag = localStorage.getItem('abam_paid_recruiter') === 'true';
    const postedVvip = getPostedAdsForSection('vvip') || [];
    const postedGrand = getPostedAdsForSection('grand') || [];
    const postedPremium = getPostedAdsForSection('premium') || [];
    const postedLine = getPostedAdsForSection('line') || [];
    const totalPaidCount = postedVvip.length + postedGrand.length + postedPremium.length + postedLine.length;

    if (isPaidFlag || totalPaidCount > 0 || hasPaidAd) {
      // 결제 사장님 ➔ 연락처 & 1:1 대화 허용
      alert(`✅ [결제 완료 업소 인증] ${item.name || item.nickname} 님의 1:1 비밀 연락처:\n\n📞 ${item.contact || '카톡 ID: abam_talent_01 (연락 시 "아밤 보고 연락드렸습니다"라고 말씀해주세요)'}`);
    } else {
      // 미결제 사장님 ➔ 철통 잠금 안내 모달 팝업
      setSelectedTalentContact(item);
      setShowLockModal(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !intro.trim() || !contact.trim()) {
      alert('닉네임, 한줄소개, 연락처(카톡 ID 또는 전화번호)를 입력해 주세요.');
      return;
    }

    const newTalent = {
      id: `custom-talent-${Date.now()}`,
      name: nickname.trim(),
      age: age,
      region: region,
      category: category,
      payTarget: payTarget,
      intro: intro.trim(),
      contact: contact.trim(),
      badge: 'NEW 구직자',
      createdAt: '방금 전'
    };

    const updated = [newTalent, ...talents];
    setTalents(updated);
    
    // Save custom talents to localStorage
    const storedCustoms = JSON.parse(localStorage.getItem('abam_user_talents') || '[]');
    localStorage.setItem('abam_user_talents', JSON.stringify([newTalent, ...storedCustoms]));

    alert('✨ 인재 등록이 성공적으로 완료되었습니다! 유료 공고를 결제한 업소 대표님들에게 인재 프로필이 우선 노출됩니다.');
    setShowRegisterModal(false);
    setNickname('');
    setIntro('');
    setContact('');
  };

  const filteredTalents = talents.filter(t => {
    const matchesSearch = (t.name || t.nickname || '').includes(searchTerm) || 
                          (t.intro || '').includes(searchTerm) ||
                          (t.category || t.tag || '').includes(searchTerm);
    const matchesRegion = selectedRegion === '전체' || (t.region || t.location || '').includes(selectedRegion);
    const matchesCategory = selectedCategory === '전체' || (t.category || t.tag || '').includes(selectedCategory);

    return matchesSearch && matchesRegion && matchesCategory;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fcf6f9',
      color: '#1f2937',
      fontFamily: '"Noto Sans KR", -apple-system, sans-serif',
      paddingBottom: '80px'
    }}>
      {/* Header Bar */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #f3e2eb',
        padding: '14px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(190, 24, 93, 0.04)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/" style={{ color: '#4b5563', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={20} />
            </Link>
            <h1 style={{ fontSize: '19px', fontWeight: 900, color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users color="#be185d" size={22} />
              <span>실시간 여성 구직 인재정보</span>
            </h1>
          </div>
          <button
            onClick={() => setShowRegisterModal(true)}
            style={{
              background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 18px',
              fontSize: '13.5px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(190, 24, 93, 0.25)'
            }}
          >
            <PlusCircle size={16} />
            <span>내 인재 프로필 등록 (무료)</span>
          </button>
        </div>
      </div>

      {/* Main Banner Header (White Light Theme) */}
      <div style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%)',
        padding: '32px 20px 24px',
        textAlign: 'center',
        borderBottom: '1px solid #f3e2eb'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ background: '#fce7f3', border: '1px solid #fbcfe8', color: '#be185d', fontSize: '12.5px', fontWeight: 900, padding: '4px 14px', borderRadius: '20px', letterSpacing: '0.02em' }}>
            🔒 유료 채용공고 결제 업소 전용 1:1 인재 스카우트
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1f2937', margin: '12px 0 6px', letterSpacing: '-0.02em' }}>
            검증된 전국 여성 알바 구직자 실시간 매칭
          </h2>
          <p style={{ fontSize: '14.5px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
            결제가 완료된 정식 업소 회원만 구직자의 비밀 연락처 열람 및 1:1 스카우트 대화가 가능합니다.
          </p>

          {/* Search & Filter Bar */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #e2b8cf',
            borderRadius: '16px',
            padding: '12px',
            marginTop: '20px',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            alignItems: 'center',
            boxShadow: '0 4px 15px rgba(226, 184, 207, 0.15)'
          }}>
            <div style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', background: '#fdfafc', border: '1px solid #f3e2eb', borderRadius: '10px', padding: '0 12px' }}>
              <Search size={18} color="#9ca3af" />
              <input
                type="text"
                placeholder="희망 지역, 직종, 한줄소개 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#1f2937',
                  padding: '10px 8px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              style={{
                background: '#fdfafc',
                border: '1px solid #f3e2eb',
                color: '#374151',
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="전체">전국 전체 지역</option>
              <option value="서울">서울 전체</option>
              <option value="강남">서울 강남/서초</option>
              <option value="경기">경기 전체</option>
              <option value="인천">인천 전체</option>
              <option value="부산">부산/경남</option>
              <option value="대구">대구/경북</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                background: '#fdfafc',
                border: '1px solid #f3e2eb',
                color: '#374151',
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="전체">전체 업종</option>
              <option value="룸">비즈니스 채용 / 룸살롱</option>
              <option value="라이브 카페">라이브 카페 / 하이퍼블릭</option>
              <option value="프리미엄 살롱">프리미엄 살롱 / 텐카페</option>
              <option value="바">토킹바 / 칵테일바</option>
              <option value="노래방">노래방 / 프라이빗 라운지</option>
            </select>
          </div>
        </div>
      </div>

      {/* Talent Cards Grid Container */}
      <div style={{ maxWidth: '1100px', margin: '24px auto 0', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#374151' }}>
            등록된 추천 인재 <strong style={{ color: '#be185d' }}>{filteredTalents.length}명</strong>
          </span>
          <span style={{ fontSize: '13px', color: '#6b7280' }}>⚡ 실시간 인재정보 갱신 완료</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredTalents.map((item, idx) => (
            <div
              key={item.id || idx}
              style={{
                background: '#ffffff',
                border: '1.5px solid #f3e2eb',
                borderRadius: '16px',
                padding: '20px',
                boxSizing: 'border-box',
                position: 'relative',
                boxShadow: '0 4px 15px rgba(190, 24, 93, 0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Badge & Age */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{
                  background: 'linear-gradient(90deg, #be185d, #e11d48)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 900,
                  padding: '3px 10px',
                  borderRadius: '12px',
                  letterSpacing: '0.02em'
                }}>
                  {item.badge || 'VIP 구직자'}
                </span>
                <span style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {item.createdAt || '방금 전'}
                </span>
              </div>

              {/* Title & Nickname */}
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#1f2937', marginBottom: '6px' }}>
                {item.name || item.nickname || '익명 구직자'} <span style={{ fontSize: '14px', color: '#be185d', fontWeight: 700 }}>({item.age || '20대 초반'})</span>
              </div>

              {/* Intro */}
              <p style={{
                fontSize: '13.5px',
                color: '#374151',
                lineHeight: 1.5,
                margin: '0 0 16px 0',
                background: '#fdf7fb',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #f3e2eb',
                fontWeight: 500
              }}>
                "{item.intro || '밝고 성실한 성격으로 즉시 출근 가능합니다. 당일 일급 확실한 업소 우대합니다.'}"
              </p>

              {/* Specs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12.5px', marginBottom: '16px' }}>
                <div style={{ background: '#fdfafc', padding: '6px 10px', borderRadius: '8px', color: '#4b5563', border: '1px solid #f3e2eb' }}>
                  📍 <strong>희망지역:</strong> {item.region || item.location || '서울 강남'}
                </div>
                <div style={{ background: '#fdfafc', padding: '6px 10px', borderRadius: '8px', color: '#4b5563', border: '1px solid #f3e2eb' }}>
                  👠 <strong>희망업종:</strong> {item.category || item.tag || '룸/라이브 카페'}
                </div>
                <div style={{ background: '#fff1f2', padding: '6px 10px', borderRadius: '8px', color: '#be185d', gridColumn: 'span 2', fontWeight: 900, border: '1px solid #fecdd3' }}>
                  💰 <strong>희망 페이:</strong> {item.payTarget || item.pay || '일급 45만원 이상'}
                </div>
              </div>

              {/* Contact Action Button (결제 유무 체크) */}
              <button
                onClick={() => handleContactClick(item)}
                style={{
                  width: '100%',
                  background: hasPaidAd ? 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)' : '#f43f5e',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '13.5px',
                  padding: '11px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(190, 24, 93, 0.2)'
                }}
              >
                {hasPaidAd ? <MessageSquare size={16} /> : <Lock size={16} />}
                <span>{hasPaidAd ? '1:1 인재 스카우트 문의하기' : '🔒 1:1 연락처 열람 (결제 업소 전용)'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🔒 미결제 구인자 전용 철통 잠금 안내 모달 */}
      {showLockModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            border: '2.5px solid #be185d',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '460px',
            padding: '28px',
            boxSizing: 'border-box',
            color: '#1f2937',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(190, 24, 93, 0.3)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#ffe4e6',
              border: '2px solid #f43f5e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#be185d'
            }}>
              <Lock size={32} />
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1f2937', margin: '0 0 8px 0' }}>
              유료 구인공고 결제 업소 전용 기능입니다
            </h3>
            
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              아름다운밤 무분별한 스팸 방지 및 안심 채용을 위해,<br />
              <strong style={{ color: '#be185d' }}>채용공고를 게시/결제하신 결제 업소 회원님만</strong><br />
              구직자 1:1 비밀 연락처 열람 및 스카우트가 가능합니다.
            </p>

            <div style={{
              background: '#fdf2f8',
              border: '1px solid #fbcfe8',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '24px',
              textAlign: 'left',
              fontSize: '13px',
              color: '#9d174d',
              fontWeight: 700
            }}>
              💡 <strong>채용공고 게재 시 혜택:</strong>
              <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px', lineHeight: 1.5 }}>
                <li>실시간 전국 구직자 1:1 연락처 무제한 열람</li>
                <li>인재 스카우트 대화 및 우선 매칭 지원</li>
                <li>VVIP / GRAND VIP 메인 상단 노출 혜택</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowLockModal(false)}
                style={{
                  flex: 1,
                  background: '#f3f4f6',
                  color: '#4b5563',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                닫기
              </button>
              <Link
                href="/employer/ad"
                onClick={() => setShowLockModal(false)}
                style={{
                  flex: 1.4,
                  background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 900,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 15px rgba(190, 24, 93, 0.3)'
                }}
              >
                <span>채용공고 결제/게시하기</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form for Free Talent Registration */}
      {showRegisterModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            border: '2px solid #f3e2eb',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '500px',
            padding: '24px',
            boxSizing: 'border-box',
            color: '#1f2937',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#be185d', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={18} /> 여성 구직자 인재 프로필 등록 (무료)
              </h3>
              <button onClick={() => setShowRegisterModal(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 800, color: '#374151', display: 'block', marginBottom: '4px' }}>닉네임 / 성함 *</label>
                <input
                  type="text"
                  placeholder="예: 민지, 지은"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#fdfafc', border: '1px solid #f3e2eb', borderRadius: '8px', color: '#1f2937', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 800, color: '#374151', display: 'block', marginBottom: '4px' }}>연령대</label>
                  <select value={age} onChange={(e) => setAge(e.target.value)} style={{ width: '100%', padding: '10px', background: '#fdfafc', border: '1px solid #f3e2eb', borderRadius: '8px', color: '#1f2937', fontSize: '14px', outline: 'none' }}>
                    <option value="20대 초반">20대 초반</option>
                    <option value="20대 중반">20대 중반</option>
                    <option value="20대 후반">20대 후반</option>
                    <option value="30대 초반">30대 초반</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 800, color: '#374151', display: 'block', marginBottom: '4px' }}>희망 업종</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px', background: '#fdfafc', border: '1px solid #f3e2eb', borderRadius: '8px', color: '#1f2937', fontSize: '14px', outline: 'none' }}>
                    <option value="룸/라이브 카페">룸 / 라이브 카페</option>
                    <option value="하이퍼블릭">하이퍼블릭 / 프라이빗 라운지</option>
                    <option value="프리미엄 살롱/텐카페">프리미엄 살롱 / 텐카페</option>
                    <option value="토킹바/바">토킹바 / 칵테일바</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 800, color: '#374151', display: 'block', marginBottom: '4px' }}>희망 근무지역 & 희망 페이</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input type="text" placeholder="예: 서울 강남구" value={region} onChange={(e) => setRegion(e.target.value)} style={{ padding: '10px', background: '#fdfafc', border: '1px solid #f3e2eb', borderRadius: '8px', color: '#1f2937', fontSize: '14px', outline: 'none' }} />
                  <input type="text" placeholder="예: 일급 50만원" value={payTarget} onChange={(e) => setPayTarget(e.target.value)} style={{ padding: '10px', background: '#fdfafc', border: '1px solid #f3e2eb', borderRadius: '8px', color: '#1f2937', fontSize: '14px', outline: 'none' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 800, color: '#374151', display: 'block', marginBottom: '4px' }}>한줄 소개 *</label>
                <textarea
                  rows={3}
                  placeholder="업소 대표님에게 어필할 매력이나 출근 조건, 스타일을 자유롭게 적어주세요."
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#fdfafc', border: '1px solid #f3e2eb', borderRadius: '8px', color: '#1f2937', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 800, color: '#374151', display: 'block', marginBottom: '4px' }}>비밀 연락처 (카톡 ID 또는 전화번호) *</label>
                <input
                  type="text"
                  placeholder="예: 카톡ID abam_beauty 또는 010-XXXX-XXXX"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#fdfafc', border: '1px solid #f3e2eb', borderRadius: '8px', color: '#1f2937', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '15px',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  marginTop: '8px',
                  boxShadow: '0 4px 12px rgba(190, 24, 93, 0.3)'
                }}
              >
                ✨ 무료 인재 등록하기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
