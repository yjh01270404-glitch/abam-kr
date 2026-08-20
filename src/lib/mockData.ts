export interface PremiumOptions {
  topFixed: boolean;
  urgentBadge: boolean;
  motionBanner: boolean;
  colorBorder: string | null;
  vipBadge: boolean;
  featuredSection: boolean;
  premiumCard: boolean;
  stickyAd: boolean;
}

/** 결제 이력 단건 */
export interface PaymentRecord {
  id: string;
  date: string;
  months: number;
  amount: number;
  plan: string;
  periodFrom: string;
  periodTo: string;
}

export type RefundStatus = 'pending' | 'approved' | 'rejected';

export interface RefundRequest {
  status: RefundStatus;
  requestedAt: string;
  reason: string;
  refundAmount: number;
  refundRatioLabel: string;
  processedAt?: string;
  rejectedReason?: string;
}

export interface JobAd {
  id: string;
  type: 'top' | 'priority' | 'special' | 'general';
  title: string;
  companyName: string;
  location: string;
  pay: string;
  image?: string;
  tag?: string;
  viewCount: number;
  description: string;
  addons?: {
    textHighlight?: boolean;
    borderGlow?: boolean;
    decorations?: boolean;
    containerMotion?: boolean;
  };
}

export interface TalentProfile {
  id: string;
  nickname: string;
  age: number;
  location: string;
  desiredPay: string;
  experience: string;
  introduction: string;
  availableDays: string;
  viewCount: number;
  createdAt: string;
}

// 오늘 날짜 기준으로 n일 전 MM-DD 날짜 자동 생성 (매일 새로운 날짜 동적 유지)
export function getRelativeDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${m}-${day}`;
}

export const generalJobs: JobAd[] = [];
export const talentProfiles: TalentProfile[] = [];

// ────────────────────────────────────────────────────────────────
// 2. 자유게시판 풍성한 댓글 데이터 (인기글 10개 이상, 일반글 1~5개)
// ────────────────────────────────────────────────────────────────
export const forumPosts = [
  // 👑 인기 1위 (댓글 10개)
  { 
    id: 1, 
    category: 'best', 
    title: '초이스 들어갈 때 반응 좋았던 스타일 및 매너 팁 정리', 
    content: '1. 들어가자마자 밝게 인사하기 (첫인상이 80% 이상 먹고 들어갑니다)\n2. 손님 멘트 잘 호응해주고 리액션 리듬 맞추기\n3. 진상 조짐 보이면 절대 혼자 해결하려 하지 말고 실장님한테 바로 사인 보내기\n이 세 가지만 지켜도 지명 손님 늘어나는 게 확 보여요!', 
    replies: [
      { id: 12, author: '청담동실장', text: '실장 사인 보내는 게 진짜 중요합니다. 혼자 참지 마세요! 저희가 해결해드립니다.' },
      { id: 13, author: '미소천사', text: '인사성이 진짜 제일 중요한 것 같아요. 눈맞춤 미소 스크랩해갑니다!' },
      { id: 14, author: '강남에이스', text: '추가로 팁 드리자면, 들어갈 때 어깨 쫙 펴고 자신감 있는 표정이 제일 반응 좋아요!' },
      { id: 15, author: '핑크다이아', text: '옷차림은 확실히 파스텔 톤이나 밝은 색상이 조명 받았을 때 얼굴 확 살아보입니다.' },
      { id: 16, author: '샤넬언니', text: '진상 조짐 보일 때 실장님 호출 팁 진짜 공감 ㅋㅋㅋ 혼자 끌려다니면 몸도 맘도 상함 ㅠ' },
      { id: 17, author: '초보언니', text: '면접 때 이런 팁 미리 알고 갔으면 훨씬 덜 떨었을 텐데 감사해요 저장했습니다!!' },
      { id: 18, author: '도산대로핑크', text: '리액션 리듬 맞추는 거 연습하니까 확실히 지명 전환율 높아지더라구요 추천!!' },
      { id: 19, author: '논현동여신', text: '3번 항목 백번 강조해도 부족함. 실장님이 케어 잘해주는 가게가 진짜 좋은 가게예요.' },
      { id: 20, author: '밤의장미', text: '초이스 문 열릴 때 미소 유지하기!! 이거 하나로 초이스 확률 2배 올라갔어요 ㅎㅎ' },
      { id: 21, author: '뷰티코치', text: '헤어 메이크업도 너무 과한 빡세팅보다는 깔끔한 드라이에 포인트 메이크업이 반응 좋습니다!' }
    ], 
    likes: 18,
    date: getRelativeDate(0)
  },
  // 🥈 인기 2위 (댓글 11개)
  { 
    id: 2, 
    category: 'best', 
    title: '오늘 비 오는데 손 없네요 ㅠ 언니들은 어떻게 하세요?', 
    content: '오늘 비 엄청 왔더니 손님이 거의 없었어요. 이런 날은 일찍 퇴근하는 게 나을까요 아니면 막방까지 버티는 게 나을까요?', 
    replies: [
      { id: 1, author: '언니쁜', text: '저도 오늘 일찍 퇴근했어요! 비 올 때는 어쩔 수 없더라구요~ 집에서 푹 쉬는 게 답인 듯!' },
      { id: 2, author: '달빛나비', text: '저희 가게는 오늘 지명 손님 많아서 분위기 완전 살았어요 ㅋㅋ 케바케인 듯!' },
      { id: 3, author: '청담릴리', text: '비 오는 날은 손님들 이동하기 귀찮아해서 초저녁보단 막방 타임에 몰려오더라구요!' },
      { id: 4, author: '역삼공주', text: '오늘 진짜 한가해서 대기실에서 언니들이랑 배달 떡볶이 시켜먹고 놀다 나왔어요 ㅋㅋㅋ' },
      { id: 5, author: '지명왕자스민', text: '비 오는 날 지명 손님 부르면 의외로 잘 와요! "오늘 비 오는데 술 한잔해요 언니 생각나서 연락했어요" 톡 하나 보내보세요 ㅎㅎ' },
      { id: 6, author: '도산대로핑크', text: '저 3시간 대기하다가 빈손으로 퇴근... 비 올 때는 멘탈 관리가 제일 중요함 ㅠ' },
      { id: 7, author: '초보탈출하자', text: '저는 비 오는 날 차라리 일찍 잘라 달라고 하고 뷰티데이로 씁니다! 마스크팩하고 꿀잠 자요!' },
      { id: 8, author: '수원실장님', text: '비 오는 날은 전 룸 세팅 미리 깔끔하게 해놓고 대기시킵니다. 늦은 시간에 한꺼번에 들어오는 경우가 많아요.' },
      { id: 9, author: '강남베테랑', text: '5년 차 경험상 비 오는 날 막타임에 알짜배기 손님들 꼭 옵니다 ㅋㅋㅋ 포기하지 마세요!' },
      { id: 10, author: '퇴근길아메리카노', text: '오늘 택시도 안 잡혀서 퇴근길 고생했네요 다들 빗길 조심해서 퇴근하세요 ㅠㅠ' },
      { id: 11, author: '새내기여우', text: '공감해요 ㅠㅠ 대기실 분위기 다운될까 봐 다 같이 수다 떨면서 버텼어요 파이팅!!' }
    ], 
    likes: 12,
    date: getRelativeDate(0)
  },
  // 🥉 인기 3위 (댓글 10개)
  { 
    id: 3, 
    category: 'best', 
    title: '오늘 방 연속으로 들어가서 막방 찍고 퇴근하네요 ㅎㅎ', 
    content: '지명 손님이 연속으로 찾아주셔서 쉴 새 없이 일하고 이제 막방 마감했네요! 몸은 피곤한데 보람찬 하루입니다. 언니들도 오늘 고생 많으셨어요!', 
    replies: [
      { id: 22, author: '하늘이', text: '우와 연타 뛰셨네요! 축하드려요~ 조심히 퇴근하세요!' },
      { id: 23, author: '역삼공주', text: '체력 진짜 대단하세요 ㅋㅋㅋ 저는 3타임만 뛰어도 다리 후들거리는데 부러워요!' },
      { id: 24, author: '지명왕자스민', text: '지명 손님 연속 방문은 진짜 기분 최고죠 ㅋㅋㅋ 고생하신 만큼 맛있는 거 드세요!' },
      { id: 25, author: '수원언니', text: '수고 많으셨어요! 연타 뛴 날은 집에 가서 족욕하고 꿀잠 자는 게 최고!!' },
      { id: 26, author: '강남베테랑', text: '마감 찍고 퇴근할 때 통장 든든해지는 그 느낌 알죠 ㅋㅋㅋ 고생하셨습니다 언니!' },
      { id: 27, author: '달빛나비', text: '저도 오늘 지명 2팀 연속 들어와서 신나게 일했네요 다들 대박 나는 하루 되시길!' },
      { id: 28, author: '초보탈출하자', text: '부럽습니다 ㅠㅠ 저도 빨리 지명 늘려서 연타 뛰어보고 싶네요 파이팅!!' },
      { id: 29, author: '청담릴리', text: '맛있는 야식 챙겨 드시고 푹 쉬세요! 다음 출근 때도 대박 나시길 ㅎㅎ' },
      { id: 30, author: '퇴근길아메리카노', text: '방 연속 들어가면 시간 금방 가죠 ㅋㅋㅋ 고생한 보람 있으시겠어요!!' },
      { id: 31, author: '실장님나빠요', text: '우리 가게 언니인 줄 ㅋㅋㅋ 오늘 진짜 고생 많았어요 언니 푹 쉬어요!' }
    ], 
    likes: 15,
    date: getRelativeDate(0)
  },
  // 오늘 신규글 4
  { 
    id: 101, 
    category: 'best', 
    title: '오늘 새벽 마감 후 24시 국밥집에서 따뜻하게 혼밥 중 ㅠㅠ', 
    content: '마감 치고 나오니까 바람이 제법 선선해졌네요! 오늘 지명 언니 손님이 팁도 두둑히 주셔서 기분 좋게 국밥 한 그릇 말아먹고 집에 갑니다. 오늘 하루 다들 고생하셨어요!', 
    replies: [
      { id: 101, author: '논현동핑크', text: '혼밥 국밥은 진리죠 ㅋㅋㅋ 수고 많으셨어요 언니 푹 쉬세요!' },
      { id: 102, author: '퇴근길요정', text: '팁 두둑히 받으신 거 부러워요~ 오늘 밤도 파이팅입니다!!' }
    ], 
    likes: 9,
    date: getRelativeDate(0)
  },
  // 일반글 5 (댓글 4개)
  { 
    id: 4, 
    category: 'best', 
    title: '초보 언니들 처음 면접 갈 때 팁 및 체크포인트', 
    content: '복장은 본인한테 제일 잘 어울리는 깨끗하고 밝은 톤으로 입으시고, 면접에서 꼭 당일 정산 여부랑 퇴근 차량 지원 여부, 텃세 없는지 분위기 잘 살펴보고 결정하세요!', 
    replies: [
      { id: 32, author: '초보집사', text: '와 진짜 필요한 정보네요. 면접 때 꼭 물어봐야겠어요.' },
      { id: 33, author: '신림동여우', text: '당일 정산 확실하게 선하나 안 긋는 가게로 가야 진짜 안심돼요!' },
      { id: 34, author: '강남베테랑', text: '퇴근 차량이나 택시비 지원 유무도 첫 달엔 생각보다 지출 커서 중요함!' },
      { id: 35, author: '새내기일기', text: '저 내일 첫 면접인데 저장해두고 계속 읽는 중입니다 ㅠㅠ 떨려요!' }
    ], 
    likes: 8,
    date: getRelativeDate(1)
  },
  // 일반글 6 (댓글 4개)
  { 
    id: 6, 
    category: 'night', 
    title: '요즘 일하면서 스트레스 해소하는 본인만의 방법?', 
    content: '매일 사람 상대하다 보면 감정적으로 지칠 때가 있는데, 언니들은 어떻게 스트레스 푸시나요? 좋은 팁 있으면 공유해요!', 
    replies: [
      { id: 39, author: '힐링요정', text: '저는 퇴근하고 맛있는 거 먹으면서 유튜브 보는 게 제일 좋아요~' },
      { id: 40, author: '수원언니', text: '주말에 필라테스 운동 시작했는데 땀 빼고 나면 정신이 엄청 맑아지더라구요!' },
      { id: 41, author: '샤넬언니', text: '친구들이랑 휴무날 예쁜 카페 탐방 다니면서 수다 떠는 걸로 풀어요 ㅎㅎ' },
      { id: 42, author: '퇴근길아메리카노', text: '반신욕 하면서 좋아하는 음악 틀어놓으면 스트레스 싹 날아감 추천합니다!' }
    ], 
    likes: 5,
    date: getRelativeDate(1)
  },
  // 일반글 7 (댓글 3개)
  { 
    id: 7, 
    category: 'night', 
    title: '초보는 어떤 가게가 무난할까요? 룸 vs 퍼블릭', 
    content: '처음 시작해보려고 하는 왕초보인데 대기 분위기 편하고 언니들끼리 분위기 좋은 곳으로 시작하고 싶어요. 조언 부탁드립니다!', 
    replies: [
      { id: 46, author: '강남에이스', text: '초보하시면 퍼블릭이나 토킹바 쪽이 초이스 부담 덜하고 적응하기 무난해요!' },
      { id: 47, author: '초보탈출하자', text: '저도 처음에 퍼블릭에서 한 달 일하면서 분위기 익히고 룸으로 넘어갔는데 괜찮은 코스 같아요.' },
      { id: 48, author: '청담동실장', text: '면접 오실 때 상세히 분위기 설명해드릴 테니 편하게 상담부터 받아보세요!' },
      { id: 49, author: '새내기여우', text: '가게 규모 크고 실장님 케어 확실한 데가 첫 스타트로 제일 안전해요!' }
    ], 
    likes: 4,
    date: getRelativeDate(1)
  },
  // 2일 전 글 8
  { 
    id: 8, 
    category: 'night', 
    title: '일주일차인데 실장님이 신경 많이 써주셔서 적응 완료했어요!', 
    content: '처음엔 대기할 때 많이 떨렸는데 언니들도 텃세 하나도 없고 실장님이 방 배정 차분하게 잘 챙겨주셔서 편하게 일하고 있어요~', 
    replies: [
      { id: 53, author: '달빛나비', text: '좋은 가게 만나셨네요! 텃세 없고 실장님 케어 좋은 곳이 장땡입니다 ㅎㅎ 축하드려요!' },
      { id: 54, author: '새내기일기', text: '부러워요 ㅠㅠ 저도 텃세 없는 클린 한 매장으로 가고 싶네요!' },
      { id: 55, author: '수원실장님', text: '앞으로도 언니 편하게 일할 수 있게 끝까지 챙겨드릴 테니 파이팅입니다!' }
    ], 
    likes: 7,
    date: getRelativeDate(2)
  },
  // 2일 전 글 9
  { 
    id: 9, 
    category: 'night', 
    title: '비 오니까 확실히 손님 성향이 다들 조용한 편이네요', 
    content: '오늘 비 와서 그런지 조용조용하게 대화 위주로 즐기시는 손님들 위주였어요. 진상도 없고 대화 잘 통해서 기분 좋게 퇴근했습니다 ㅎㅎ', 
    replies: [
      { id: 36, author: '힐링요정', text: '조용한 센스 만점 손님 만나면 진짜 시간 금방 가고 편하죠!' },
      { id: 37, author: '도산대로핑크', text: '비 오면 분위기가 잔잔해져서 조용한 룸이 많아지는 느낌 저도 들었어요 ㅋㅋㅋ' },
      { id: 38, author: '밤의장미', text: '진상 없이 편하게 일한 날이 최고의 날입니다 축하드려요~' }
    ], 
    likes: 6,
    date: getRelativeDate(2)
  },
  // 2일 전 글 10
  { 
    id: 10, 
    category: 'night', 
    title: '오늘 저녁에 처음 면접 가는데 같이 가주실 분 계신가요 ㅠㅠ', 
    content: '강남 쪽 첫 면접인데 너무 떨려서 근처 분위기라도 살필 겸 같이 가주시거나 면접 팁 나누실 언니 계신가요? 맛있는 커피 살게요!', 
    replies: [
      { id: 60, author: '역삼동언니', text: '저 강남 쪽 일하는데 시간 맞으시면 커피 한 잔 해요! 오픈채팅이나 쪽지 주세요~' },
      { id: 61, author: '새내기일기', text: '저도 첫 면접 때 엄청 떨렸는데 막상 가보면 실장님들이 다 친절하세요! 힘내세요 파이팅!' }
    ], 
    likes: 3,
    date: getRelativeDate(2)
  },
  // 3일 전 글 11
  { 
    id: 11, 
    category: 'night', 
    title: '지명 손님 관리할 때 본인만의 노하우 있으신가요?', 
    content: '특별한 날 소소하게 챙겨드리는 게 효과적인지, 멘트 관리 팁 있으시면 공유해요~', 
    replies: [
      { id: 50, author: '지명왕자스민', text: '생일이나 승진 같은 특별한 날에 짧은 감사 손편지나 음료 기프티콘 하나 챙겨드리면 감동하시더라구요!' },
      { id: 51, author: '역삼공주', text: '너무 자주 연락하기보다 출근하는 날 "오늘 출근했어요 파이팅 하세요!" 한 마디가 최고 ㅋㅋㅋ' },
      { id: 52, author: '논현동여신', text: '대화할 때 취향이나 하시는 일 기억해뒀다가 다음번에 살짝 언급해주면 엄청 좋아하세요.' }
    ], 
    likes: 5,
    date: getRelativeDate(3)
  },
  // 3일 전 글 12
  { 
    id: 12, 
    category: 'night', 
    title: '당일 정산은 퇴근할 때 바로 챙겨주시는 거 맞나요?', 
    content: '면접 때 당일 정산이라고 들었는데 실장님이 마감 후 1분 만에 깔끔하게 현금/계좌로 바로 챙겨주시는지 궁금합니다!', 
    replies: [
      { id: 65, author: '신림동여우', text: '정식 클린 매장이면 마감하자마자 1원도 안 깎고 즉시 챙겨줍니다! 조금이라도 미루면 바로 나오세요!' },
      { id: 66, author: '청담릴리', text: '당일 정산 확실한 가게가 최고예요. 수수료나 명목 없는 차감 절대 있으면 안 됨!' }
    ], 
    likes: 5,
    date: getRelativeDate(3)
  },
  // 3일 전 글 13
  { 
    id: 13, 
    category: 'night', 
    title: '초이스 때 첫인상 밝은 원피스 vs 세련된 투피스 추천해주세요', 
    content: '이번에 분위기 전면 리뉴얼된 가게로 면접 가는데 원피스가 반응이 더 좋을까요 아니면 투피스가 좋을까요?', 
    replies: [
      { id: 43, author: '스타일실장', text: '라인 살려주는 라일락이나 아이보리 톤 원피스가 제일 무난하고 호불호 없어요!' },
      { id: 44, author: '핑크다이아', text: '체형에 맞춰 입는 게 최고인데 보통 핏한 원피스가 실물 반응은 더 슬림해 보여요!' },
      { id: 45, author: '뷰티코치', text: '본인이 제일 입었을 때 자신감 생기는 옷으로 입고 가시는 게 표정도 밝아집니다.' }
    ], 
    likes: 4,
    date: getRelativeDate(3)
  },
  // 4일 전 글 14
  { 
    id: 14, 
    category: 'friend', 
    title: '야간 일 시작하는 분들끼리 소통방 만들고 싶은데 참여하실 분?', 
    content: '혼자 일하다 보니 외롭기도 하고 서로 정보도 공유하고 퇴근 후 커피 한잔할 단톡방 만드실 분 구해요!', 
    replies: [
      { id: 70, author: '초보집사', text: '저 참여하고 싶어요! 비밀댓글이나 쪽지로 링크 부탁드립니다~' },
      { id: 71, author: '새내기여우', text: '서로 멘탈 케어 해주고 팁 나누는 소통방 있으면 너무 좋을 것 같아요!' }
    ], 
    likes: 4,
    date: getRelativeDate(4)
  },
  // 4일 전 글 15
  { 
    id: 15, 
    category: 'friend', 
    title: '투잡 다니시는 룸메 구해요 (생활 패턴 비슷한 분)', 
    content: '낮엔 회사 다니고 밤엔 야간 근무 뛰느라 생활 패턴 비슷한 언니 구합니다! 깨끗하고 예의 바르신 분 환영해요~', 
    replies: [
      { id: 75, author: '수원언니', text: '지역이 어디신가요? 강남/서초 쪽이면 관심 있습니다!' }
    ], 
    likes: 3,
    date: getRelativeDate(4)
  },
  // 5일 전 글 16
  { 
    id: 16, 
    category: 'night', 
    title: '지방에서 올라와서 일하려는데 원룸이나 숙식 지원 되나요?', 
    content: '지방에서 이번에 서울로 올라가서 시작하려고 하는데 숙소 지원이나 보증금 조율 지원해주는 매장이 많은지 궁금합니다!', 
    replies: [
      { id: 80, author: '청담동실장', text: '저희 매장은 원룸 숙식 지원 옵션 제공하고 있으니 편하게 문의주세요!' },
      { id: 81, author: '역삼공주', text: '숙소 지원해주는 친절한 매장 은근 많아요! 아밤 채용공고 꼼꼼히 체크해보세요~' }
    ], 
    likes: 3,
    date: getRelativeDate(5)
  },
  // 5일 전 글 17
  { 
    id: 17, 
    category: 'night', 
    title: '메이크업 샵에서 받고 가나요 아니면 셀프가 무난한가요?', 
    content: '첫 출근인데 인근 샵에서 받아보고 가야 할지, 본인 메이크업으로 가도 충분한지 궁금해요!', 
    replies: [
      { id: 85, author: '뷰티코치', text: '첫날은 샵에서 분위기 한번 보고 따라 해보시는 것 추천하고, 적응되면 셀프 메이크업도 충분해요!' }
    ], 
    likes: 3,
    date: getRelativeDate(5)
  },
  // 6일 전 글 18
  { 
    id: 18, 
    category: 'friend', 
    title: '퇴근 후 같이 택시 타고 가실 언니 계세요?', 
    content: '새벽 마감 후 퇴근하는데 택시비 아낄 겸 같이 타면 좋을 것 같아서요~ 동선 맞으시는 분 연락주세요!', 
    replies: [
      { id: 90, author: '도산대로핑크', text: '저 서초역 쪽인데 동선 맞으시면 같이 타요! 쪽지 주세요~' }
    ], 
    likes: 2,
    date: getRelativeDate(6)
  },
  // 6일 전 글 19
  { 
    id: 19, 
    category: 'friend', 
    title: '주말 야간만 빡세게 같이 일할 메이트 구합니다!', 
    content: '금토일 주말 야간 타임만 연타 뛰실 메이트 언니 구해요! 서로 의지하면서 빡세게 모아봅시다!', 
    replies: [
      { id: 95, author: '강남베테랑', text: '주말 연타 최고죠 ㅋㅋㅋ 응원합니다 파이팅!!' }
    ], 
    likes: 2,
    date: getRelativeDate(6)
  },
  // 7일 전 글 20
  { 
    id: 20, 
    category: 'night', 
    title: '텃세 없는 가게 구분하는 노하우가 있을까요?', 
    content: '면접 때 매장 대기실 분위기나 언니들 표정 보면 대충 답 나온다는데 어떤 팁이 있을까요?', 
    replies: [
      { id: 100, author: '달빛나비', text: '대기실 들어갔을 때 서로 웃으면서 인사해 주고 수다 모드인 곳이 텃세 제로 클린매장이에요!' }
    ], 
    likes: 2,
    date: getRelativeDate(7)
  }
];

export const topBanners: JobAd[] = [
  {
    id: "top-1",
    type: "top",
    title: "[VVIP 단독] 업계 1위 매장 최고대우 모십니다",
    companyName: "강남 에이스 매장",
    location: "서울 강남구",
    pay: "월 3000만+ 보장",
    tag: "#VVIP #최고수익 #매장",
    viewCount: 9999,
    description: "상세설명",
    requirements: "20세이상",
    workHours: "협의"
  },
  {
    id: "top-2",
    type: "top",
    title: "[단독/신규] 최상위 매장 에이스 대모집",
    companyName: "청담 플래티넘",
    location: "서울 강남구",
    pay: "월 2500만+ 보장",
    tag: "#VVIP #매장",
    viewCount: 8741,
    description: "상세설명",
    requirements: "20세이상",
    workHours: "협의"
  }
];

export const priorityJobs: JobAd[] = [
  {
    id: "prio-1",
    type: "priority",
    title: "VIP 전담 최고시설 최고페이 보장",
    companyName: "도곡 골드",
    location: "서울 강남구",
    pay: "일급 150만+ 보장",
    tag: "#VVIP #최고시설",
    viewCount: 7654,
    description: "상세설명",
    requirements: "20세이상",
    workHours: "협의"
  }
];

export const recommendedJobs: JobAd[] = [
  {
    id: "rec-1",
    type: "general",
    title: "[독점] 강남권 넘버원 업소 특별모집",
    companyName: "서초 다이아몬드",
    location: "서울 서초구",
    pay: "일급 120만+ 보장",
    tag: "#VVIP #강남넘버원",
    viewCount: 9112,
    description: "상세설명",
    requirements: "20세이상",
    workHours: "협의"
  }
];


