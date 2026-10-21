/* 아밤 랜딩 UI 문구 — 언어별(ko/en/jp/cn) 번역 사전. **굵게** 표기와 \n 줄바꿈은 rich()로 렌더링됩니다. */
export type UiLang = 'ko' | 'en' | 'jp' | 'cn';

export interface UiStrings {
  logoA: string; logoB: string; badge: string;
  hnav: [string, string, string, string, string];
  heroMain: string; heroTag: string; heroSub: string;
  leadA: string; leadB: string; leadC: string; leadD: string; leadE: string;
  sum: [string, string, string];
  adv: string;
  noticeTitle: string; notice1: string; notice2: string;
  callHero: string; smsHero: string; formHero: string; smsNote: string;
  altHero: string; altNight: string; altAroma: string; altCare: string;
  introTitle: string; introSub: string; intro1: string; intro2: string; intro3: string;
  priceTitle: string; priceSub: string; priceBar1: string; priceBar2: string;
  courseLetter: [string, string, string]; courseSuffix: string;
  tags: [string, string, string];
  chips: [string[], string[], string[]];
  vipFull: string; recommend: string;
  rulesTitle: string; rulesSub: string;
  rules: [[string, string], [string, string], [string, string], [string, string], [string, string]];
  safetyTitle: string; safety1: string; safety2: string;
  guideSub: string; reviewsSub: string;
  smsBar: string; callBar: string;
  modalHead: string; modalDesc: string; modalNotice: string; previewTitle: string;
  preview: [string, string, string, string, string, string];
  send: string; copy: string; callModal: string; assure1: string; assure2: string; close: string; toast: string;
  tpl: string; smsBody: string;
}

export const UI: Record<UiLang, UiStrings> = {
  ko: {
    logoA: '아름다운밤', logoB: '아밤', badge: '100% 대면결제',
    hnav: ['소개', '코스', '안내', '후기', 'FAQ'],
    heroMain: '아름다운밤', heroTag: '[아밤]',
    heroSub: '서울·경기 전지역 출장마사지 · 출장 홈타이 [100% 현장 대면결제]',
    leadA: '아름다운 밤', leadB: '을 약속드리는 1:1 프라이빗 케어, ', leadC: '아밤(Abam)', leadD: '입니다.',
    leadE: '고객님이 계신 자택·호텔로 전문 테라피스트가 실시간 도로 배차 동선에 맞춰 방문 관리해 드립니다.',
    sum: ['100% 현장 대면결제', '전문 힐러 1:1 케어', '1시간 전 예약 권장'],
    adv: '예약 접수 **18:00부터** · 매니저 출발 **19:00부터** · 마지막 예약 **새벽 05:00** 마감\n이용 희망 시간 **1시간 전쯤 미리 예약**해 주시면 가장 수월하게 이용 가능합니다.',
    noticeTitle: '방문 전 확인 안내',
    notice1: '• 주차장·1층 공동현관 **비밀번호를 예약 시 미리 알려주세요.** 어려우시면 **호출버튼으로 열어주실 수 있다**고 미리 말씀해 주세요.',
    notice2: '• 호텔·모텔은 **1층 로비에서 매니저를 만나 대면결제** 후 객실까지 함께 이동합니다.',
    callHero: '전화예약', smsHero: '문자로 간편 예약하기', formHero: '예약 양식 보기',
    smsNote: '※ 전화 통화가 부담스러우실 때도 문자(SMS)로 편하게 접수하실 수 있습니다. (예약 접수 18:00 ~ 익일 05:00)',
    altHero: '아밤 출장마사지 힐링 케어', altNight: '서울의 밤 프라이빗 출장마사지 아밤', altAroma: '천연 아로마 오일 테라피', altCare: '프라이빗 1:1 맞춤 힐링 케어',
    introTitle: '출장안마 서비스 안내', introSub: '서울·경기 전지역 100% 현장 대면결제',
    intro1: '출장안마는 고객님이 계신 곳(자택, 아파트, 오피스텔, 호텔, 모텔)으로 전문 힐러가 직접 찾아가는 1:1 방문 맞춤 마사지 케어 서비스입니다.',
    intro2: '아밤(Abam)은 선입금, 예약금, 출발비 등을 절대 요구하지 않는 **100% 현장 대면결제 원칙**을 준수합니다. 매니저가 현장에 도착하여 고객님과 직접 대면한 후 결제가 진행되므로 안심하고 이용하실 수 있습니다.',
    intro3: '과중한 업무와 일상에서 지친 심신을 가장 편안하고 익숙한 프라이빗 공간에서 최고의 힐링으로 채워드립니다.',
    priceTitle: '코스 안내 및 정찰 가격표', priceSub: '선입금 없는 100% 현장 대면결제 · 3대 시그니처 코스',
    priceBar1: '아밤 3대 프라이빗 맞춤 코스', priceBar2: '전 코스 100% 현장 대면결제 정찰제',
    courseLetter: ['A코스', 'B코스', 'C코스'], courseSuffix: ' 코스',
    tags: ['기본 충실 · 뭉친 피로 케어', '고객 선호 1위 · BEST', 'VIP 프리미엄 올케어'],
    chips: [
      ['전신 수기 건식 지압', '뭉친 어깨·허리 피로 해소', '스트레칭 균형 회복'],
      ['최고급 천연 식물성 아로마', '림프 순환 & 딥 릴랙싱', '부드럽고 섬세한 힐링'],
      ['시원한 지압 + 부드러운 오일', '집중 VIP 케어', '만족도 1위 종합 테라피'],
    ],
    vipFull: 'VIP 풀코스', recommend: '추천 코스',
    rulesTitle: '이용 및 방문 안내', rulesSub: '편안하고 안전한 방문을 위한 필수 안내',
    rules: [
      ['1. 예약·출발 시간', '예약 접수는 18:00부터, 매니저 출발은 19:00부터, 마지막 예약 마감은 새벽 05:00입니다. 1시간 전 예약을 권장드립니다.'],
      ['2. 주차장·1층 공동현관 안내', '주차장과 공동현관 비밀번호는 예약 시 미리 알려주세요. 알려주기 어려우시면 호출버튼으로 열어주실 수 있다고 미리 말씀해 주시면, 도착 후 매니저가 전화드리고 호출버튼을 누릅니다.'],
      ['3. 호텔·모텔 이용 안내', '예약 시 호텔명을 알려주시면 도착 전 매니저가 연락드립니다. 1층 로비에서 매니저를 만나 대면결제 후, 매니저가 객실까지 함께 이동합니다.'],
      ['4. 100% 현장 대면결제', '현금, 계좌이체, 카드 결제 모두 가능합니다. 어떠한 선입금도 요구하지 않습니다.'],
      ['5. 문자(SMS) 간편 예약 접수', '전화 통화 없이 문자로도 예약 가능합니다. (접수 18:00 ~ 익일 05:00 · 희망 시간 1시간 전 예약 시 가장 수월합니다.)'],
    ],
    safetyTitle: '아밤(Abam) 100% 현장 직접 대면결제 원칙',
    safety1: '아밤은 고객님께 사전 입금을 단 1원도 요구하지 않습니다.',
    safety2: '매니저가 고객님이 계신 곳(자택) 또는 호텔 1층 로비에서 고객님과 직접 대면하여 결제(현금, 계좌이체, 카드)를 진행하므로 안심하고 안전하게 이용하실 수 있습니다.',
    guideSub: '전화나 문자 한 통으로 간편하게 예약 (1시간 전 예약 시 원하는 시간 이용 수월)',
    reviewsSub: '실제 이용 고객님들의 진솔한 이용 후기',
    smsBar: '문자 간편예약', callBar: '전화예약',
    modalHead: '문자 간편 예약 양식',
    modalDesc: '아래 양식을 확인하신 후 **[문자 앱으로 바로 전송]**을 누르시면 내용이 자동으로 입력된 문자창이 열립니다.',
    modalNotice: '이용 희망 시간 **1시간 전쯤** 예약하시면 원하시는 시간대에 가장 수월하게 받으실 수 있습니다.',
    previewTitle: '[아밤 빠른 예약 양식]',
    preview: ['1. 희망 코스: 타이 / 아로마 / 스페셜', '2. 방문 주소: (동·호수 상세 기재)', '3. 주차장 유무: (도착 시 전화 요망)', '4. 1층 공동현관: (비밀번호 또는 호출버튼 가능)', '5. 호텔·모텔명: (1층 로비에서 기사에게 대면결제)', '6. 결제 수단: 현금 / 계좌이체 / 카드'],
    send: '문자 앱으로 바로 전송하기', copy: '예약 양식 복사하기', callModal: '전화 바로 연결',
    assure1: '• 선입금·예약금 없는 100% 현장 대면결제', assure2: '• 18시 접수 · 19시 순차 출발 (1시간 전 예약 권장)', close: '닫기',
    toast: '📋 예약 양식이 복사되었습니다. 문자에 붙여넣어 주세요.',
    tpl: `[아밤] 예약 신청 양식
• 성함: 
• 연락처: 
• 방문 주소 (호텔/모텔명 및 객실번호): 
• 희망 코스 및 시간: (60분 / 90분 / 120분)
• 방문 희망 시간: 
• 주차 / 1층 공동현관: (비밀번호 또는 호출버튼)
• 결제 방식: 현장에서 운전기사에게 대면결제 (현금 / 계좌이체 / 카드)
----------------------------------------
※ 안내 사항:
호텔/모텔은 1층 로비에서 기사와 관리사를 만나 대면결제 후, 관리사를 객실로 안내해 주시면 됩니다.`,
    smsBody: `[아밤] 예약 신청 양식
• 성함: 
• 연락처: 
• 방문 주소 (호텔/모텔명 및 객실번호): 
• 희망 코스 및 시간: (60분 / 90분 / 120분)
• 방문 희망 시간: 
• 주차 / 1층 공동현관: (비밀번호 또는 호출버튼)
• 결제 방식: 현장에서 운전기사에게 대면결제 (현금 / 계좌이체 / 카드)
----------------------------------------
※ 안내 사항:
호텔/모텔은 1층 로비에서 기사와 관리사를 만나 대면결제 후, 관리사를 객실로 안내해 주시면 됩니다.`,
  },
  en: {
    logoA: 'Abam', logoB: '.kr', badge: '100% Pay on arrival',
    hnav: ['Intro', 'Courses', 'Info', 'Reviews', 'FAQ'],
    heroMain: 'A Beautiful Night', heroTag: '[Abam]',
    heroSub: 'Private 1:1 home & hotel visit care across Seoul & Gyeonggi',
    leadA: 'A Beautiful Night', leadB: ' — premium 1:1 care we promise you. That is why we are ', leadC: 'Abam', leadD: '.',
    leadE: 'Our professional therapists visit your home or hotel according to real-time traffic and dispatch schedules.',
    sum: ['100% pay on arrival', 'Professional 1:1 care', 'Book 1 hr ahead recommended'],
    adv: 'Booking from **18:00** · Departures from **19:00** · Last booking **05:00**\nBooking **about 1 hour ahead** gives you the smoothest experience.',
    noticeTitle: 'Please tell us before we visit',
    notice1: '• Please give us the **parking / 1st-floor entrance password when booking.** If you cannot, tell us in advance that **you can open the door via the call button.**',
    notice2: '• For hotels / motels, **meet the manager in the 1st-floor lobby and pay face to face**, then go to your room together.',
    callHero: 'Call to book', smsHero: 'Book via WhatsApp', formHero: 'Booking form',
    smsNote: '※ Prefer not to call? Message us anytime during booking hours (18:00 ~ 05:00).',
    altHero: 'Abam outcall massage healing care', altNight: 'Private outcall massage in Seoul at night, Abam', altAroma: 'Natural aroma oil therapy', altCare: 'Private 1:1 healing care',
    introTitle: 'About our service', introSub: 'All of Seoul & Gyeonggi · 100% pay on arrival',
    intro1: 'Our therapist comes directly to where you are (home, apartment, officetel, hotel, motel) for a private 1:1 massage care service.',
    intro2: 'Abam never asks for a deposit, reservation fee or travel fee. We follow a **100% pay-on-arrival principle**: you pay only after the manager arrives and meets you in person.',
    intro3: 'Recharge your tired body and mind in the comfort of your own private space.',
    priceTitle: 'Courses & Prices', priceSub: 'No deposit · 100% pay on arrival · 3 signature courses',
    priceBar1: 'Abam 3 private signature courses', priceBar2: 'Flat prices · 100% pay on arrival',
    courseLetter: ['Course A', 'Course B', 'Course C'], courseSuffix: '',
    tags: ['Solid basics · Beat the fatigue', 'Customer choice #1 · BEST', 'VIP Special all-care'],
    chips: [
      ['Full-body dry acupressure', 'Relieves shoulder & back tension', 'Stretching to restore balance'],
      ['Premium natural plant-based aroma', 'Lymph circulation & deep relaxing', 'Gentle, delicate healing'],
      ['Refreshing acupressure + soft oil', 'Top-tier VIP care', '#1 rated total therapy'],
    ],
    vipFull: 'VIP Full Course', recommend: 'Recommended',
    rulesTitle: 'Visit & Payment Guide', rulesSub: 'Essential notes for a comfortable and safe visit',
    rules: [
      ['1. Booking & departure hours', 'Booking is accepted from 18:00, managers depart from 19:00, and the last booking deadline is 05:00 (early morning). We recommend booking 1 hour ahead.'],
      ['2. Parking & 1st-floor entrance', 'Please tell us the parking / entrance password when booking. If you cannot, tell us in advance that you can open the door via the call (intercom) button — your manager will phone you on arrival and press the button.'],
      ['3. Hotels & motels', 'Tell us the hotel name when booking; your manager will contact you before arriving. Meet the manager in the 1st-floor lobby and pay face to face, then the manager escorts you to your room.'],
      ['4. 100% pay on arrival', 'Cash, bank transfer and card are all accepted. We never ask for any deposit.'],
      ['5. Message booking', 'You can also book by message without calling (18:00 ~ 05:00). Booking 1 hour ahead is the smoothest.'],
    ],
    safetyTitle: 'Abam 100% pay-on-the-spot principle',
    safety1: 'Abam never asks for even 1 won in advance.',
    safety2: 'You pay (cash, bank transfer or card) only after meeting the manager face to face at your place or in the hotel lobby, so you can use the service with full peace of mind.',
    guideSub: 'Book with a single call or message (booking 1 hour ahead is smoothest)',
    reviewsSub: 'Honest reviews from real customers',
    smsBar: 'Message', callBar: 'Call to book',
    modalHead: 'Booking form',
    modalDesc: 'Check the form below, then tap **[Send via messages]** to open a message with the details pre-filled.',
    modalNotice: 'Booking **about 1 hour ahead** gives you the smoothest experience.',
    previewTitle: '[Abam quick booking form]',
    preview: ['1. Course: Thai / Aroma / Special', '2. Address: (building, room no.)', '3. Parking: (please call on arrival)', '4. 1st-floor entrance: (password or call button OK)', '5. Hotel / motel name: (meet in 1st-floor lobby, pay face to face)', '6. Payment: Cash / Transfer / Card'],
    send: 'Send via messages', copy: 'Copy booking form', callModal: 'Call now',
    assure1: '• No deposit · 100% pay on arrival', assure2: '• Booking from 18:00 · Departures from 19:00 (Book 1 hr ahead)', close: 'Close',
    toast: '📋 Form copied. Please paste it into your message.',
    tpl: `[아밤] 예약 신청 양식
• 성함: 
• 연락처: 
• 방문 주소 (호텔/모텔명 및 객실번호): 
• 희망 코스 및 시간: (60분 / 90분 / 120분)
• 방문 희망 시간: 
• 주차 / 1층 공동현관: (비밀번호 또는 호출버튼)
• 결제 방식: 현장에서 운전기사에게 대면결제 (현금 / 계좌이체 / 카드)
----------------------------------------
※ 안내 사항:
호텔/모텔은 1층 로비에서 기사와 관리사를 만나 대면결제 후, 관리사를 객실로 안내해 주시면 됩니다.`,
    smsBody: `[아밤] 예약 신청 양식
• 성함: 
• 연락처: 
• 방문 주소 (호텔/모텔명 및 객실번호): 
• 희망 코스 및 시간: (60분 / 90분 / 120분)
• 방문 희망 시간: 
• 주차 / 1층 공동현관: (비밀번호 또는 호출버튼)
• 결제 방식: 현장에서 운전기사에게 대면결제 (현금 / 계좌이체 / 카드)
----------------------------------------
※ 안내 사항:
호텔/모텔은 1층 로비에서 기사와 관리사를 만나 대면결제 후, 관리사를 객실로 안내해 주시면 됩니다.`,
  },
  jp: {
    logoA: 'Abam', logoB: '.kr', badge: '100%対面後払い',
    hnav: ['紹介', 'コース', '案内', 'レビュー', 'FAQ'],
    heroMain: '美しい夜', heroTag: '[Abam]',
    heroSub: 'ソウル・京畿全域 1:1訪問ホームケア [100%対面後払い]',
    leadA: '美しい夜', leadB: 'をお約束する1:1プライベートケア、', leadC: 'Abam', leadD: 'です。',
    leadE: 'ご自宅・ホテルへ専門セラピストが交通状況と配車動線に合わせてお伺いします。',
    sum: ['100%対面後払い', '専門セラピスト 1:1ケア', '1時間前のご予約推奨'],
    adv: 'ご予約は**18:00から** · 出発は**19:00から** · 最終受付は**翌朝05:00**\nご希望の**1時間前**までにご予約いただくと最もスムーズです。',
    noticeTitle: '訪問前にお知らせください',
    notice1: '• 駐車場・1階エントランスの**暗証番号はご予約時にお知らせください。**難しい場合は**呼び出しボタンで開けられる**ことを事前にお伝えください。',
    notice2: '• ホテル・モーテルは**1階ロビーでマネージャーと合流し対面でお支払い**後、お部屋までご一緒します。',
    callHero: 'お電話で予約', smsHero: 'WhatsAppで予約', formHero: '予約フォーム',
    smsNote: '※ お電話が難しい場合も、受付時間内(18:00〜翌05:00)にメッセージで承ります。',
    altHero: 'Abam 出張マッサージ ヒーリングケア', altNight: 'ソウルの夜のプライベート出張マッサージ Abam', altAroma: '天然アロマオイルセラピー', altCare: 'プライベート1:1ヒーリングケア',
    introTitle: 'サービスのご案内', introSub: 'ソウル・京畿全域 · 100%対面後払い',
    intro1: 'お客様のいらっしゃる場所(ご自宅、マンション、ホテル、モーテル)へ専門セラピストが直接伺う、1:1訪問マッサージケアです。',
    intro2: 'Abamは前払い・予約金・出発費などを一切いただきません。**100%対面後払いの原則**を守り、マネージャーが到着して直接お会いした後にお支払いいただきます。',
    intro3: 'お仕事や日常でお疲れの心身を、最も落ち着くプライベート空間で癒します。',
    priceTitle: 'コース・料金表', priceSub: '前払いなし · 100%対面後払い · 3つのシグネチャーコース',
    priceBar1: 'Abam 3大プライベートコース', priceBar2: '全コース定額 · 100%対面後払い',
    courseLetter: ['Aコース', 'Bコース', 'Cコース'], courseSuffix: '',
    tags: ['基本に忠実 · 凝りを解消', 'お客様人気No.1 · BEST', 'VIPスペシャルオールケア'],
    chips: [
      ['全身の乾式指圧', '肩・腰の凝りを解消', 'ストレッチでバランス回復'],
      ['最高級の天然植物性アロマ', 'リンパ循環 & ディープリラックス', 'やさしく繊細なヒーリング'],
      ['爽快な指圧 + やさしいオイル', 'エースによるVIPケア', '満足度No.1の総合セラピー'],
    ],
    vipFull: 'VIPフルコース', recommend: 'おすすめ',
    rulesTitle: 'ご利用・訪問のご案内', rulesSub: '安心・快適にご利用いただくための大切なご案内',
    rules: [
      ['1. ご予約・出発時間', 'ご予約受付は18:00から、マネージャーの出発は19:00から、最終予約受付は翌朝05:00です。1時間前のご予約をおすすめします。'],
      ['2. 駐車場・1階エントランス', '駐車場・エントランスの暗証番号はご予約時にお知らせください。難しい場合は呼び出し(インターホン)ボタンで開けられることを事前にお伝えください。到着後、マネージャーがお電話のうえボタンを押します。'],
      ['3. ホテル・モーテル', 'ご予約時にホテル名をお知らせください。到着前にマネージャーがご連絡します。1階ロビーで合流し対面でお支払い後、お部屋までご案内します。'],
      ['4. 100%対面後払い', '現金・振込・カードがご利用いただけます。前払いは一切いただきません。'],
      ['5. メッセージ予約', 'お電話なしでもメッセージでご予約いただけます(18:00〜翌05:00)。1時間前のご予約が最もスムーズです。'],
    ],
    safetyTitle: 'Abam 100%対面後払いの原則',
    safety1: 'Abamは事前のお支払いを1ウォンもいただきません。',
    safety2: 'マネージャーがご自宅またはホテル1階ロビーで直接お会いした後にお支払い(現金・振込・カード)いただくため、安心してご利用いただけます。',
    guideSub: 'お電話またはメッセージ一つで簡単予約(1時間前のご予約がスムーズ)',
    reviewsSub: '実際にご利用いただいたお客様の率直なレビュー',
    smsBar: 'メッセージ', callBar: 'お電話で予約',
    modalHead: 'ご予約フォーム',
    modalDesc: '下記フォームをご確認のうえ、**[メッセージで送信]**を押すと内容が入力されたメッセージ画面が開きます。',
    modalNotice: 'ご希望の**1時間前**までにご予約いただくと最もスムーズです。',
    previewTitle: '[Abam クイック予約フォーム]',
    preview: ['1. コース: タイ / アロマ / スペシャル', '2. 住所: (建物名・部屋番号)', '3. 駐車場: (到着時にお電話ください)', '4. 1階エントランス: (暗証番号または呼び出しボタン可)', '5. ホテル・モーテル名: (1階ロビーで合流し対面払い)', '6. お支払い: 現金 / 振込 / カード'],
    send: 'メッセージで送信', copy: '予約フォームをコピー', callModal: '電話する',
    assure1: '• 前払いなし · 100%対面後払い', assure2: '• 18時受付 · 19時順次出発 (1時間前予約推奨)', close: '閉じる',
    toast: '📋 フォームをコピーしました。メッセージに貼り付けてください。',
    tpl: `[Abam 1:1 クイック予約申込]
• コース: (タイ / アロマ / スペシャル / 時間)
• 住所: (例: 江南区駅三洞 OOO)
• 駐車場: (あり / なし / 到着時に電話希望)
• 1階エントランス: (暗証番号 または 呼び出しボタンで開錠可)
• ホテル・モーテル名: (1階ロビーで合流・対面払い後にお部屋へ)
• お支払い: (現金 / 振込 / カード)
(※ ご予約18:00から · 出発19:00から · 最終受付05:00 / 1時間前のご予約が最もスムーズです)`,
    smsBody: `[Abam ご予約申込]
1. コース: 
2. 住所/部屋番号: 
3. 駐車場(到着時に電話): 
4. エントランス(暗証番号または呼び出しボタン): 
5. ホテル・モーテル名(1階ロビー合流): 
6. お支払い(現金/振込/カード): 
(予約18:00~05:00 · 出発19:00から · 100%対面後払い)`,
  },
  cn: {
    logoA: 'Abam', logoB: '.kr', badge: '100%当面付款',
    hnav: ['介绍', '项目', '须知', '评价', 'FAQ'],
    heroMain: '美丽的夜晚', heroTag: '[Abam]',
    heroSub: '首尔·京畿全境 1:1上门居家护理 [100%现场当面付款]',
    leadA: '美丽的夜晚', leadB: '，我们承诺的1:1尊享护理，这就是', leadC: 'Abam', leadD: '。',
    leadE: '专业技师根据实时路况与派车路线前往您所在的住宅或酒店。',
    sum: ['100%现场当面付款', '专业理疗师 1:1护理', '建议提前1小时预约'],
    adv: '预约从**18:00开始** · **19:00起**出发 · 最晚预约**凌晨05:00**截止\n建议**提前1小时**预约，体验最顺畅。',
    noticeTitle: '上门前请提前告知',
    notice1: '• 停车场·一楼公共大门的**密码请在预约时告知。**如不方便，请提前说明**可通过呼叫按钮开门**。',
    notice2: '• 酒店/汽车旅馆请**在一楼大堂与经理会合并当面付款**，随后一同前往客房。',
    callHero: '电话预约', smsHero: '通过WhatsApp预约', formHero: '预约表单',
    smsNote: '※ 不方便通话时，也可在受理时间(18:00 ~ 次日05:00)内留言预约。',
    altHero: 'Abam 上门按摩 疗愈护理', altNight: '首尔夜晚私密上门按摩 Abam', altAroma: '天然芳香精油疗愈', altCare: '私密1:1疗愈护理',
    introTitle: '服务介绍', introSub: '首尔·京畿全境 · 100%现场当面付款',
    intro1: '专业理疗师直接前往您所在的地方(住宅、公寓、酒店、汽车旅馆)，提供1:1上门按摩护理服务。',
    intro2: 'Abam绝不收取定金、预约金或出车费，坚持**100%现场当面付款原则**：经理到达并当面见到您之后才付款。',
    intro3: '让您在最舒适、熟悉的私密空间里，消除工作与生活的疲惫。',
    priceTitle: '项目与价格表', priceSub: '无需定金 · 100%现场当面付款 · 3大招牌项目',
    priceBar1: 'Abam 3大私密专属项目', priceBar2: '全项目明码标价 · 100%当面付款',
    courseLetter: ['A项目', 'B项目', 'C项目'], courseSuffix: '',
    tags: ['基础扎实 · 消除酸痛疲劳', '顾客首选No.1 · BEST', 'VIP特别全方位护理'],
    chips: [
      ['全身干式指压', '缓解肩腰酸痛', '拉伸恢复平衡'],
      ['顶级天然植物芳香', '淋巴循环 & 深度放松', '温柔细腻的疗愈'],
      ['清爽指压 + 柔和精油', '王牌技师VIP护理', '满意度第一的综合疗法'],
    ],
    vipFull: 'VIP全套项目', recommend: '推荐项目',
    rulesTitle: '使用与上门须知', rulesSub: '为了舒适安全的服务，请您务必了解',
    rules: [
      ['1. 预约·出发时间', '18:00开始受理预约，经理19:00起出发，最晚预约截止时间为凌晨05:00。建议提前1小时预约。'],
      ['2. 停车场·一楼公共大门', '停车场与公共大门密码请在预约时告知。如不方便，请提前说明可通过呼叫(门铃)按钮开门——到达后经理会先致电，再按下呼叫按钮。'],
      ['3. 酒店·汽车旅馆', '预约时请告知酒店名称，经理到达前会提前联系您。在一楼大堂与经理会合并当面付款后，经理陪同您前往客房。'],
      ['4. 100%现场当面付款', '可使用现金、转账、刷卡。我们不收取任何定金。'],
      ['5. 留言预约', '无需通话，也可留言预约(18:00 ~ 次日05:00)。提前1小时预约最顺畅。'],
    ],
    safetyTitle: 'Abam 100%现场当面付款原则',
    safety1: 'Abam不会事先收取您哪怕1韩元。',
    safety2: '经理在您所在处或酒店一楼大堂当面见到您之后，才进行付款(现金、转账、刷卡)，让您安心、放心地使用服务。',
    guideSub: '一个电话或一条留言即可轻松预约(提前1小时预约更顺畅)',
    reviewsSub: '真实顾客的真诚评价',
    smsBar: '留言预约', callBar: '电话预约',
    modalHead: '预约表单',
    modalDesc: '请确认下方表单，然后点击**[通过短信发送]**，将打开已自动填好内容的短信窗口。',
    modalNotice: '建议**提前1小时**预约，体验最顺畅。',
    previewTitle: '[Abam 快速预约表单]',
    preview: ['1. 项目: 泰式 / 芳香 / 特别', '2. 地址: (楼栋、房号)', '3. 停车场: (到达时请来电)', '4. 一楼大门: (密码或呼叫按钮均可)', '5. 酒店/旅馆名称: (一楼大堂会合并当面付款)', '6. 付款方式: 现金 / 转账 / 刷卡'],
    send: '通过短信发送', copy: '复制预约表单', callModal: '立即致电',
    assure1: '• 无需定金 · 100%现场当面付款', assure2: '• 18点起接单 · 19点起顺次出发 (建议提前1小时预约)', close: '关闭',
    toast: '📋 预约表单已复制，请粘贴到短信中。',
    tpl: `[Abam 1:1 快速预约申请]
• 项目: (泰式 / 芳香 / 特别 / 时长)
• 地址: (例: 江南区驿三洞 OOO)
• 停车场: (有 / 无 / 到达时请来电)
• 一楼公共大门: (告知密码，或可通过呼叫按钮开门)
• 酒店/旅馆名称: (一楼大堂会合，当面付款后前往客房)
• 付款方式: (现金 / 转账 / 刷卡)
(※ 18:00起接受预约 · 19:00起出发 · 最晚预约05:00 / 提前1小时预约最顺畅)`,
    smsBody: `[Abam 预约申请]
1. 项目: 
2. 地址/房号: 
3. 停车场(到达时来电): 
4. 公共大门(密码或呼叫按钮): 
5. 酒店/旅馆名称(一楼大堂会合): 
6. 付款(现金/转账/刷卡): 
(预约18:00~05:00 · 19:00起出发 · 100%现场当面付款)`,
  },
};
