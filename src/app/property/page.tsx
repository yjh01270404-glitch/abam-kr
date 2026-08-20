'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, User, PenLine } from 'lucide-react';
import { PropertyItem, getProperties, addProperty, getUserNickname, setUserNickname } from '../../lib/propertyData';

// ── 닉네임 설정 모달 ──────────────────────────────────────────────
function NicknameModal({ onSave }: { onSave: (nick: string) => void }) {
  const [value, setValue] = useState('');
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: '#1e293b',
        border: '2px solid #38bdf8',
        borderRadius: '12px',
        padding: '32px 28px',
        width: '340px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
      }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#38bdf8', fontWeight: '900' }}>
          👤 닉네임 설정
        </h2>
        <p style={{ margin: '0 0 20px 0', fontSize: '13.5px', color: '#94a3b8', lineHeight: '1.6' }}>
          서비스 이용을 위해 닉네임을 설정해주세요.<br />
          닉네임은 작성글에 표시되며, 이후 마이페이지에서 변경 가능합니다.
        </p>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="예: 강남사장님, 서울언니 등"
          maxLength={20}
          style={{
            width: '100%', boxSizing: 'border-box',
            background: '#0f172a', border: '1.5px solid #475569',
            borderRadius: '6px', padding: '10px 12px',
            color: '#ffffff', fontSize: '15px', marginBottom: '16px',
            outline: 'none',
          }}
          onKeyDown={e => { if (e.key === 'Enter' && value.trim().length >= 2) onSave(value.trim()); }}
          autoFocus
        />
        <button
          disabled={value.trim().length < 2}
          onClick={() => onSave(value.trim())}
          style={{
            width: '100%',
            background: value.trim().length >= 2 ? '#38bdf8' : '#334155',
            border: 'none', borderRadius: '6px',
            color: '#0f172a', fontWeight: '900', fontSize: '15px',
            padding: '11px', cursor: value.trim().length >= 2 ? 'pointer' : 'default',
            transition: 'background 0.15s'
          }}
        >
          닉네임 저장하고 시작하기
        </button>
      </div>
    </div>
  );
}

// ── 닉네임 수정 모달 ──────────────────────────────────────────────
function EditNicknameModal({ current, onSave, onClose }: { current: string; onSave: (nick: string) => void; onClose: () => void }) {
  const [value, setValue] = useState(current);
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: '#1e293b',
        border: '2px solid #7c3aed',
        borderRadius: '12px',
        padding: '28px',
        width: '320px',
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '17px', color: '#a78bfa', fontWeight: '900' }}>✏️ 닉네임 변경</h3>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          maxLength={20}
          style={{
            width: '100%', boxSizing: 'border-box',
            background: '#0f172a', border: '1.5px solid #475569',
            borderRadius: '6px', padding: '9px 12px',
            color: '#fff', fontSize: '14px', marginBottom: '14px'
          }}
          autoFocus
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onClose} style={{ flex: 1, background: 'transparent', border: '1px solid #475569', color: '#94a3b8', borderRadius: '5px', padding: '8px', cursor: 'pointer' }}>취소</button>
          <button
            disabled={value.trim().length < 2}
            onClick={() => onSave(value.trim())}
            style={{ flex: 1, background: '#7c3aed', border: 'none', color: '#fff', borderRadius: '5px', padding: '8px', fontWeight: '900', cursor: 'pointer' }}
          >저장</button>
        </div>
      </div>
    </div>
  );
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function PropertySalePage() {
  const [items, setItems] = useState<PropertyItem[]>([]);
  const [nickname, setNickname] = useState<string | null>(null); // null = 미확인, '' = 미설정
  const [showNicknameEdit, setShowNicknameEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // 폼 상태
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('서울 강남구');
  const [type, setType] = useState('모던바');
  const [size, setSize] = useState('');
  const [deposit, setDeposit] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [premium, setPremium] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setItems(getProperties());
    const handler = () => setItems(getProperties());
    window.addEventListener('abam-property-update', handler);

    // 닉네임 초기화
    const saved = getUserNickname();
    setNickname(saved); // '' 이면 모달 표시

    return () => window.removeEventListener('abam-property-update', handler);
  }, []);

  const handleNicknameSave = (nick: string) => {
    setUserNickname(nick);
    setNickname(nick);
    setShowNicknameEdit(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname) {
      alert('닉네임을 먼저 설정해주세요.');
      return;
    }
    if (!title || !deposit || !monthlyRent || !phone) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    addProperty({
      title: title.trim(),
      region: region.trim(),
      type,
      size: size.trim() || '협의',
      deposit: deposit.trim(),
      monthlyRent: monthlyRent.trim(),
      premium: premium.trim() || '협의/없음',
      totalPrice: premium.trim() || deposit.trim(),
      description: description.trim() || '2026년 7월 현존 양도양수 매물입니다.',
      phone: phone.trim(),
    });

    alert('✅ 2026년 7월 실매물 검증 등록 신청이 완료되었습니다.');
    setShowForm(false);
    setTitle(''); setSize(''); setDeposit(''); setMonthlyRent(''); setPremium(''); setDescription(''); setPhone('');
  };

  const handleOpenForm = () => {
    if (!nickname) {
      alert('매물 등록은 닉네임 설정 후 이용 가능합니다.');
      return;
    }
    setShowForm(!showForm);
  };

  return (
    <>
      {/* 닉네임 초기 설정 모달 */}
      {nickname === '' && (
        <NicknameModal onSave={handleNicknameSave} />
      )}

      {/* 닉네임 수정 모달 */}
      {showNicknameEdit && nickname && (
        <EditNicknameModal
          current={nickname}
          onSave={handleNicknameSave}
          onClose={() => setShowNicknameEdit(false)}
        />
      )}

      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        color: '#f8fafc',
        fontFamily: '"Noto Sans KR", sans-serif',
        padding: '24px 16px',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', textDecoration: 'none', fontSize: '14.5px', fontWeight: '800' }}>
              <ArrowLeft size={16} /> 홈으로 이동
            </Link>
            <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#38bdf8', margin: 0 }}>🏢 업소 양도양수 매매 센터</h1>
            <button
              onClick={handleOpenForm}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: nickname ? '#38bdf8' : '#475569',
                color: '#0f172a', border: 'none', borderRadius: '6px',
                padding: '8px 14px', fontSize: '13.5px', fontWeight: '900',
                cursor: 'pointer', boxShadow: '0 4px 10px rgba(56,189,248,0.2)'
              }}
            >
              <Plus size={16} /> 매물 등록하기
            </button>
          </div>

          {/* 닉네임 표시 + 변경 */}
          {nickname && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: '#1e293b', border: '1px solid #334155',
              borderRadius: '8px', padding: '10px 16px',
              marginBottom: '16px', fontSize: '13.5px'
            }}>
              <User size={14} color="#38bdf8" />
              <span style={{ color: '#94a3b8' }}>현재 닉네임:</span>
              <span style={{ color: '#f1f5f9', fontWeight: '800' }}>{nickname}</span>
              <button
                onClick={() => setShowNicknameEdit(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent', border: '1px solid #475569', color: '#94a3b8', borderRadius: '4px', padding: '3px 8px', fontSize: '12px', cursor: 'pointer', marginLeft: '4px' }}
              >
                <PenLine size={11} /> 변경
              </button>
            </div>
          )}

          {/* Info Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            border: '1.5px solid #334155',
            borderRadius: '8px', padding: '16px', marginBottom: '24px',
            fontSize: '14px', lineHeight: '1.6', color: '#cbd5e1'
          }}>
            💡 <strong>아름다운밤(아밤) 회원 전용 직거래 매장 장터</strong>
            <p style={{ margin: '6px 0 0 0' }}>
              본 센터는 업소 사장님과 인수 희망자 간의 안전한 직거래를 지원합니다. 등록하신 매물 정보는 관리자 검토를 통해 실시간으로 노출되며, 불법적이거나 사칭성 정보는 제재 대상이 될 수 있습니다.
            </p>
          </div>

          {/* Registration Form */}
          {showForm && (
            <form onSubmit={handleRegister} style={{
              background: '#1e293b', border: '2px solid #38bdf8',
              borderRadius: '8px', padding: '20px', marginBottom: '24px'
            }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#38bdf8', fontWeight: '900' }}>📢 신규 매물 정보 등록</h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#64748b' }}>작성자: <strong style={{ color: '#a78bfa' }}>{nickname}</strong></p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '800', color: '#94a3b8' }}>매물 제목 *</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="예: 강남역 먹자골목 모던바 양도"
                    style={{ background: '#0f172a', border: '1.5px solid #475569', borderRadius: '4px', padding: '8px', color: '#ffffff' }} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '800', color: '#94a3b8' }}>소재 지역 *</label>
                  <input type="text" value={region} onChange={e => setRegion(e.target.value)} placeholder="예: 서울 강남구 역삼동"
                    style={{ background: '#0f172a', border: '1.5px solid #475569', borderRadius: '4px', padding: '8px', color: '#ffffff' }} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '800', color: '#94a3b8' }}>업종 분류 *</label>
                  <select value={type} onChange={e => setType(e.target.value)}
                    style={{ background: '#0f172a', border: '1.5px solid #475569', borderRadius: '4px', padding: '8px', color: '#ffffff' }}>
                    <option value="모던바">모던바</option>
                    <option value="노래방">노래방</option>
                    <option value="라운지펍">라운지펍</option>
                    <option value="토킹바">토킹바</option>
                    <option value="기타">기타 업소</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '800', color: '#94a3b8' }}>평수 (크기)</label>
                  <input type="text" value={size} onChange={e => setSize(e.target.value)} placeholder="예: 30평"
                    style={{ background: '#0f172a', border: '1.5px solid #475569', borderRadius: '4px', padding: '8px', color: '#ffffff' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '800', color: '#94a3b8' }}>보증금 *</label>
                  <input type="text" value={deposit} onChange={e => setDeposit(e.target.value)} placeholder="예: 3,000만"
                    style={{ background: '#0f172a', border: '1.5px solid #475569', borderRadius: '4px', padding: '8px', color: '#ffffff' }} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '800', color: '#94a3b8' }}>월세 *</label>
                  <input type="text" value={monthlyRent} onChange={e => setMonthlyRent(e.target.value)} placeholder="예: 250만"
                    style={{ background: '#0f172a', border: '1.5px solid #475569', borderRadius: '4px', padding: '8px', color: '#ffffff' }} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '800', color: '#94a3b8' }}>희망 권리금</label>
                  <input type="text" value={premium} onChange={e => setPremium(e.target.value)} placeholder="예: 4,000만"
                    style={{ background: '#0f172a', border: '1.5px solid #475569', borderRadius: '4px', padding: '8px', color: '#ffffff' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '800', color: '#94a3b8' }}>연락처 *</label>
                  <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="예: 010-0000-0000"
                    style={{ background: '#0f172a', border: '1.5px solid #475569', borderRadius: '4px', padding: '8px', color: '#ffffff' }} required />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: '800', color: '#94a3b8' }}>상세 설명</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)}
                  placeholder="인프라, 유동인구, 시설 상태 등을 적어주세요."
                  rows={4}
                  style={{ background: '#0f172a', border: '1.5px solid #475569', borderRadius: '4px', padding: '8px', color: '#ffffff', fontFamily: 'inherit' }} />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowForm(false)}
                  style={{ background: 'transparent', border: '1px solid #475569', color: '#94a3b8', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}>
                  취소
                </button>
                <button type="submit"
                  style={{ background: '#38bdf8', border: 'none', color: '#0f172a', borderRadius: '4px', padding: '8px 20px', fontWeight: '900', cursor: 'pointer' }}>
                  등록 신청 완료
                </button>
              </div>
            </form>
          )}

          {/* Property Grid List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map((item) => (
              <div key={item.id} style={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '18px',
                transition: 'transform 0.15s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      background: 'rgba(56,189,248,0.1)', color: '#38bdf8',
                      fontSize: '11px', fontWeight: '900', padding: '2px 8px', borderRadius: '12px'
                    }}>
                      {item.type}
                    </span>
                    {item.postedBy && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#64748b' }}>
                        <User size={11} /> {item.postedBy}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '12.5px', color: '#64748b' }}>{item.date}</span>
                </div>
                <h2 style={{ fontSize: '17px', fontWeight: '900', margin: '0 0 10px 0', color: '#f1f5f9' }}>{item.title}</h2>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 14px 0', lineHeight: '1.5' }}>{item.description}</p>

                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: '16px',
                  paddingTop: '12px', borderTop: '1.5px solid #334155', fontSize: '13.5px'
                }}>
                  <div>📍 <strong>지역:</strong> <span style={{ color: '#cbd5e1' }}>{item.region}</span></div>
                  <div>📐 <strong>면적:</strong> <span style={{ color: '#cbd5e1' }}>{item.size}</span></div>
                  <div>💰 <strong>보증/월세:</strong> <span style={{ color: '#ef4444', fontWeight: '900' }}>{item.deposit} / {item.monthlyRent}</span></div>
                  <div>🔑 <strong>권리금:</strong> <span style={{ color: '#f59e0b', fontWeight: '900' }}>{item.premium}</span></div>
                  <div style={{ marginLeft: 'auto' }}>📞 <strong>문의처:</strong> <span style={{ color: '#38bdf8', fontWeight: '900' }}>{item.phone}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
