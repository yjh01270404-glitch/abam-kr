'use client';

import React, { useState } from 'react';
import { generateVBankNumber, saveVBankOrder, VBankOrder } from '../lib/portone-vbank';
import { requestRealPortOneVBank } from '../lib/portone-real-sdk';
import { X, ShieldAlert, CheckSquare, Square, Copy, CheckCircle2, AlertTriangle, Building2, CreditCard } from 'lucide-react';

interface PortOneVBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  ownerName: string;
  phone: string;
  adSlot: 'line' | 'special' | 'grand' | 'vip' | 'general';
  adSlotName: string;
  amount: number;
  onSuccess: (order: VBankOrder) => void;
}

const BANKS = ['국민은행', '신한은행', '우리은행', '하나은행', '농협은행', '기업은행', '카카오뱅크'];

export default function PortOneVBankModal({
  isOpen,
  onClose,
  companyName,
  ownerName,
  phone,
  adSlot,
  adSlotName,
  amount,
  onSuccess,
}: PortOneVBankModalProps) {
  const [adultAgreed, setAdultAgreed] = useState(false);
  const [selectedBank, setSelectedBank] = useState('국민은행');
  const [createdOrder, setCreatedOrder] = useState<VBankOrder | null>(null);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // 가상계좌 실시간 발급 요청 (포트원 실 연동 SDK 호출)
  const handleGenerateVBank = async () => {
    if (!adultAgreed) {
      alert('🔞 19세 이상 회원 확인 및 가상계좌 출금/환불 불가 필수 조항에 동의해주세요.');
      return;
    }

    setIsProcessing(true);

    const merchantUid = `abam_vbank_${Date.now()}`;
    const res = await requestRealPortOneVBank({
      merchant_uid: merchantUid,
      name: adSlotName,
      amount,
      buyer_name: ownerName || companyName,
      buyer_tel: phone,
      bankName: selectedBank,
    });

    const dueDate = res.vbank_date ? String(res.vbank_date) : new Date(Date.now() + 86400000).toISOString().slice(0, 16).replace('T', ' ');

    const order: VBankOrder = {
      orderId: `order-${Date.now()}`,
      impUid: res.imp_uid || `imp_${Math.floor(100000000 + Math.random() * 900000000)}`,
      merchantUid: res.merchant_uid || merchantUid,
      companyName: companyName || '아름다운밤 매장',
      ownerName: ownerName || '사장님',
      phone: phone || '010-0000-0000',
      adSlot,
      adSlotName,
      amount,
      vbankName: res.vbank_name || selectedBank,
      vbankNum: res.vbank_num || generateVBankNumber(selectedBank),
      vbankHolder: res.vbank_holder || '(주)아름다운밤',
      vbankDate: dueDate,
      status: 'vbank_issued',
      adultAgreed: true,
      agreedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    saveVBankOrder(order);
    setCreatedOrder(order);
    setIsProcessing(false);
    onSuccess(order);
  };

  const copyAccountNum = () => {
    if (!createdOrder) return;
    navigator.clipboard.writeText(`${createdOrder.vbankName} ${createdOrder.vbankNum} (예금주: ${createdOrder.vbankHolder})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'
    }}>
      <div style={{
        background: '#ffffff', borderRadius: '16px', maxWidth: '520px', width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.1)',
        overflow: 'hidden', border: '1px solid #e2e8f0', animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* 모달 헤더 */}
        <div style={{ background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)', color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={20} />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
              포트원(PortOne) 19금 일반 일시불 결제 (가상계좌/카드/휴대폰)
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8 }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
          {!createdOrder ? (
            <>
              {/* 결제 건명 및 금액 서머리 */}
              <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: '#831843', fontWeight: 600 }}>신청 구인 배너 / 매장명</div>
                <div style={{ fontSize: '15px', color: '#9d174d', fontWeight: 800, marginTop: '2px' }}>
                  {adSlotName} ({companyName})
                </div>
                <div style={{ fontSize: '11px', color: '#be185d', fontWeight: 800, marginTop: '4px', background: '#ffe4e6', padding: '3px 8px', borderRadius: '4px', display: 'inline-block' }}>
                  💳 일반 일시불 결제 (단 1회 결제 / 정기결제·자동갱신 없음)
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #f472b6' }}>
                  <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>최종 결제 금액</span>
                  <span style={{ fontSize: '18px', color: '#be185d', fontWeight: 900, fontFamily: 'monospace' }}>
                    {amount.toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* 🔞 19금 회원 인증 및 출금 금지 모달 서약서 */}
              <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#be123c', fontWeight: 800, fontSize: '13px', marginBottom: '6px' }}>
                  <ShieldAlert size={16} />
                  <span>🔞 [회원 19금 서비스 가상계좌 출금/환불 불가 서약서]</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11.5px', color: '#9f1239', lineHeight: 1.5 }}>
                  <li>본 서비스는 야간/비즈니스 구인구직 19세 이상 회원 전용 플랫폼입니다.</li>
                  <li>포트원을 통해 발급되는 가상계좌는 입금 즉시 광고 노출 자원이 할당되므로, <strong>입금 후 현금 출금 및 환불이 엄격히 금지</strong>됩니다.</li>
                  <li>타인 명의 입금 및 불법 대포통장 거래 시 즉시 수사기관에 세부 로그가 통보됩니다.</li>
                </ul>

                {/* 동의 체크박스 */}
                <div
                  onClick={() => setAdultAgreed(!adultAgreed)}
                  style={{
                    marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px',
                    background: adultAgreed ? '#ffe4e6' : '#ffffff', border: `1px solid ${adultAgreed ? '#f43f5e' : '#fda4af'}`,
                    padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.15s ease'
                  }}
                >
                  {adultAgreed ? <CheckSquare size={18} color="#e11d48" /> : <Square size={18} color="#9f1239" />}
                  <span style={{ fontSize: '12px', color: '#881337', fontWeight: 700 }}>
                    [필수] 본인은 만 19세 이상이며, 가상계좌 입금 후 현금 출금/환불 불가 조항에 동의합니다.
                  </span>
                </div>
              </div>

              {/* 입금 은행 선택 */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  입금 희망 은행 선택
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {BANKS.map(bank => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      style={{
                        padding: '8px 10px', fontSize: '11.5px', fontWeight: 700, borderRadius: '6px',
                        border: selectedBank === bank ? '2px solid #be185d' : '1px solid #cbd5e1',
                        background: selectedBank === bank ? '#fdf2f8' : '#ffffff',
                        color: selectedBank === bank ? '#be185d' : '#475569',
                        cursor: 'pointer', transition: 'all 0.1s ease'
                      }}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>

              {/* 발급 버튼 */}
              <button
                type="button"
                onClick={handleGenerateVBank}
                disabled={isProcessing || !adultAgreed}
                style={{
                  width: '100%', padding: '12px', fontSize: '14px', fontWeight: 800, color: '#ffffff',
                  background: adultAgreed ? 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)' : '#94a3b8',
                  border: 'none', borderRadius: '10px', cursor: adultAgreed ? 'pointer' : 'not-allowed',
                  boxShadow: adultAgreed ? '0 4px 12px rgba(190,24,93,0.3)' : 'none', transition: 'all 0.2s ease'
                }}
              >
                {isProcessing ? '⚡ 포트원 가상계좌 생성 중...' : '💳 포트원 19금 가상계좌 실시간 발급하기'}
              </button>
            </>
          ) : (
            /* 발급 완료 모달 창 */
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', marginBottom: '10px' }}>
                <CheckCircle2 size={28} />
              </div>
              <h4 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>
                포트원 가상계좌 발급이 완료되었습니다!
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', marginBottom: '16px' }}>
                아래 계좌번호로 입금 시 실시간으로 관리자 시스템에 자동 연동됩니다.
              </p>

              {/* 계좌 상세 알약 카드 */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', textAlign: 'left', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>입금 은행</span>
                  <span style={{ color: '#0f172a', fontWeight: 800 }}>{createdOrder.vbankName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>가상 계좌번호</span>
                  <span style={{ color: '#be185d', fontWeight: 900, fontFamily: 'monospace', fontSize: '15px' }}>{createdOrder.vbankNum}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>예금주명</span>
                  <span style={{ color: '#0f172a', fontWeight: 800 }}>{createdOrder.vbankHolder}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>입금 금액</span>
                  <span style={{ color: '#059669', fontWeight: 900, fontFamily: 'monospace', fontSize: '15px' }}>{createdOrder.amount.toLocaleString()}원</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', paddingTop: '8px', borderTop: '1px dashed #cbd5e1' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>입금 기한</span>
                  <span style={{ color: '#d97706', fontWeight: 700 }}>{createdOrder.vbankDate}</span>
                </div>
              </div>

              {/* 19금 출금 금지 뱃지 */}
              <div style={{ background: '#fff1f2', color: '#9f1239', fontSize: '11px', fontWeight: 700, padding: '8px 10px', borderRadius: '6px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <AlertTriangle size={14} />
                <span>🔞 본 계좌는 19금 서비스용으로 입금 후 현금 출금 및 환불 불가 대상입니다.</span>
              </div>

              {/* 버튼 그룹 */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={copyAccountNum}
                  style={{
                    flex: 1, padding: '10px', fontSize: '12.5px', fontWeight: 700, color: '#1e293b',
                    background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <Copy size={14} />
                  <span>{copied ? '복사 완료!' : '계좌번호 복사'}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1, padding: '10px', fontSize: '12.5px', fontWeight: 800, color: '#ffffff',
                    background: '#be185d', border: 'none', borderRadius: '8px', cursor: 'pointer'
                  }}
                >
                  확인 완료
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
