// PortOne (Iamport) Virtual Account & 19+ Non-Withdrawal Payment Module

export interface VBankOrder {
  orderId: string;
  impUid: string;
  merchantUid: string;
  companyName: string;
  ownerName: string;
  phone: string;
  adSlot: 'line' | 'special' | 'grand' | 'vip' | 'general';
  adSlotName: string;
  amount: number;
  vbankName: string;
  vbankNum: string;
  vbankHolder: string;
  vbankDate: string;
  status: 'vbank_issued' | 'paid' | 'cancelled' | 'refund_blocked';
  adultAgreed: boolean;
  agreedAt: string;
  createdAt: string;
}

const STORAGE_KEY = 'abam_vbank_orders';

// 가상계좌 발급 목록 조회
export function getVBankOrders(): VBankOrder[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // 초기 데모 데이터 제공
      const initial: VBankOrder[] = [
        {
          orderId: 'order-vbank-1001',
          impUid: 'imp_9401827401',
          merchantUid: 'abam_vbank_178486001',
          companyName: '아름다운밤 라운지',
          ownerName: '홍길동',
          phone: '010-1234-5678',
          adSlot: 'vip',
          adSlotName: 'VVIP 최상단 프리미엄 배너 (169,000원)',
          amount: 169000,
          vbankName: '국민은행',
          vbankNum: '794280-04-190042',
          vbankHolder: '(주)아름다운밤',
          vbankDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16).replace('T', ' '),
          status: 'vbank_issued',
          adultAgreed: true,
          agreedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
        {
          orderId: 'order-vbank-1002',
          impUid: 'imp_9401827402',
          merchantUid: 'abam_vbank_178486002',
          companyName: '강남 프리미엄 살롱 클럽',
          ownerName: '김대표',
          phone: '010-9876-5432',
          adSlot: 'special',
          adSlotName: '스페셜 그리드 배너 (69,000원)',
          amount: 69000,
          vbankName: '신한은행',
          vbankNum: '110-482-910248',
          vbankHolder: '(주)아름다운밤',
          vbankDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16).replace('T', ' '),
          status: 'paid',
          adultAgreed: true,
          agreedAt: new Date(Date.now() - 3600000).toISOString(),
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// 가상계좌 주문 저장
export function saveVBankOrder(order: VBankOrder) {
  if (typeof window === 'undefined') return;
  const list = getVBankOrders();
  const next = [order, ...list];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

  // 포트원 결제 완료 내역에도 등록
  try {
    const payments = JSON.parse(localStorage.getItem('abam_payments') ?? '[]');
    payments.unshift({
      id: order.orderId,
      merchant_uid: order.merchantUid,
      companyName: order.companyName,
      amount: order.amount,
      pay_method: 'vbank',
      vbank_num: order.vbankNum,
      vbank_name: order.vbankName,
      status: order.status,
      adultAgreed: order.adultAgreed,
      createdAt: order.createdAt,
    });
    localStorage.setItem('abam_payments', JSON.stringify(payments));
  } catch {}

  // 관리자 및 페이지 동기화 전파
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new CustomEvent('abam_data_update'));
}

// 가상계좌 상태 변경 (입금확인 완료 / 취소 / 출금금지)
export function updateVBankOrderStatus(orderId: string, status: VBankOrder['status']) {
  if (typeof window === 'undefined') return;
  const list = getVBankOrders();
  const next = list.map(item => item.orderId === orderId ? { ...item, status } : item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new CustomEvent('abam_data_update'));
}

// 은행별 가상계좌 모의 번호 생성기
export function generateVBankNumber(bankName: string): string {
  const bankPrefixes: Record<string, string> = {
    '국민은행': '794280-04-',
    '신한은행': '110-482-',
    '우리은행': '1002-831-',
    '하나은행': '584-9102-',
    '농협은행': '302-0192-',
    '기업은행': '010-9281-',
    '카카오뱅크': '3333-01-',
  };
  const prefix = bankPrefixes[bankName] || '794280-04-';
  const randomSuffix = Math.floor(100000 + Math.random() * 900000).toString();
  return prefix + randomSuffix;
}
