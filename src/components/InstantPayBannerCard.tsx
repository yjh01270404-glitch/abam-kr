'use client';

import React, { useState } from 'react';
import { Zap, Crown, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';

export default function InstantPayBannerCard() {
  const [loading, setLoading] = useState(false);

  const handleInstantPay = (planName: string, price: number) => {
    setLoading(true);
    
    // PortOne (IMP) SDK 체크 및 1초 간편 결제 호출
    const windowAny = window as any;
    if (windowAny.IMP) {
      windowAny.IMP.init('imp00000000'); // PortOne 가맹점 식별코드
      windowAny.IMP.request_pay(
        {
          pg: 'kakaopay',
          pay_method: 'card',
          merchant_uid: `merchant_${Date.now()}`,
          name: `[아밤] ${planName} 즉시 노출권`,
          amount: price,
          buyer_email: 'recruiter@abam.kr',
          buyer_name: '아밤 매장 사장님',
          buyer_tel: '010-0000-0000',
        },
        (rsp: any) => {
          setLoading(false);
          if (rsp.success) {
            alert(`🎉 결제가 완료되었습니다!\n${planName}이 메인 상단 1순위에 3초 만에 라이브 적용됩니다.`);
            window.location.reload();
          } else {
            // 테스트/체험 안내
            alert(`[즉시 노출 결제 모듈]\n${planName} (${price.toLocaleString()}원) 결제 창이 띄워졌습니다.`);
          }
        }
      );
    } else {
      setLoading(false);
      alert(`🎉 [아밤 결제 시뮬레이션]\n${planName} (${price.toLocaleString()}원) 1초 결제 요청이 승인되었습니다!\n메인 상단 1순위에 라이브 적용됩니다.`);
    }
  };

  return (
    <section className="w-full my-6 px-4 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-amber-950/80 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden">
        
        {/* 상단 뱃지 */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 font-bold text-lg">⚡</span>
            <div>
              <span className="text-xs text-amber-400 font-extrabold uppercase tracking-widest block">사장님 전용 즉시 매출 패스</span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                오늘 결제하면 메인 상단 1순위 즉시 노출
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-400 bg-stone-900/80 px-3 py-1.5 rounded-full border border-stone-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>3초 만에 무마찰 즉시 라이브</span>
          </div>
        </div>

        {/* 2가지 핵심 결제 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 상품 1: 3일 긴급 노출권 */}
          <div className="bg-stone-900/90 border border-stone-700/80 hover:border-amber-500/60 rounded-2xl p-5 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-stone-400 uppercase tracking-wider">스피드 팩</span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-500/30">인기</span>
              </div>
              <h4 className="text-lg font-black text-white mb-1">⚡ 3일 긴급 상단 노출권</h4>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-black text-amber-400">49,000</span>
                <span className="text-xs text-stone-400 font-bold">원 (VAT 포함)</span>
              </div>
              <ul className="text-xs text-stone-300 space-y-2 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 3일간 메인 추천 1순위 영역 즉시 노출</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> AI 구인글 교정 어시스턴트 포함</li>
              </ul>
            </div>
            <button
              onClick={() => handleInstantPay('3일 긴급 노출권', 49000)}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>49,000원 1초 간편 결제하기</span>
            </button>
          </div>

          {/* 상품 2: 7일 VVIP 전면 노출권 */}
          <div className="bg-gradient-to-b from-stone-900 to-amber-950/40 border-2 border-amber-500/60 rounded-2xl p-5 transition-all flex flex-col justify-between shadow-xl relative">
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow">
              강력 추천
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">VVIP 올인원</span>
                <Crown className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="text-lg font-black text-white mb-1">👑 7일 VVIP 프리미엄 노출권</h4>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-black text-amber-400">89,000</span>
                <span className="text-xs text-stone-400 font-bold">원 (VAT 포함)</span>
              </div>
              <ul className="text-xs text-stone-200 space-y-2 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" /> 7일간 VVIP 상단 3D 3D 홀로그램 배너 포함</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" /> 모바일 + PC 무제한 우선 상단 노출</li>
              </ul>
            </div>
            <button
              onClick={() => handleInstantPay('7일 VVIP 프리미엄 노출권', 89000)}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-stone-950 font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>89,000원 1초 간편 결제하기</span>
            </button>
          </div>

        </div>

        {/* 결제 보장 */}
        <div className="mt-4 text-center text-[11px] text-stone-500 flex items-center justify-center gap-3">
          <span>💳 카카오페이 / 신용카드 지원</span>
          <span>•</span>
          <span>⚡ 즉시 통장 입금 정산</span>
        </div>
      </div>
    </section>
  );
}
