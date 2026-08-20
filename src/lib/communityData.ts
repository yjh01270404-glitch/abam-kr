/**
 * 아밤 커뮤니티 데이터 (Community System)
 *
 * 2단계 설계:
 * - 5개 전문 채널로 정보 품질 세분화
 * - 정보 신뢰도 레이어: 검증된 경험자 게시물에 배지
 * - 핫 알고리즘: (좋아요 × 2 + 댓글 × 3) ÷ 시간가중치
 * - 구직자만 글 작성 가능, 업소 광고 금지
 */

export type CommunityChannel =
  | 'all'       // 전체
  | 'chat'      // 수다방 (일상/잡담)
  | 'review'    // 업소 후기 (익명)
  | 'safety'    // 안전 정보 (중요)
  | 'salary'    // 급여 정보 (팩트)
  | 'tips';     // 취업 팁 (노하우)

export type PostTag =
  | '정보공유' | '질문' | '조언' | '경험담' | '주의' | '추천' | '팁' | '공지' | '긴급'
  | '급여정보' | '초보환영' | '수다';

export interface CommunityComment {
  id: string;
  anonymousId: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface CommunityPost {
  id: string;
  channel: CommunityChannel;
  title: string;
  content: string;
  /** 익명 ID (언니XXX호, 초보XXX) */
  anonymousId: string;
  createdAt: string;
  /** 조회수 */
  views: number;
  /** 좋아요 수 */
  likes: number;
  /** 댓글 */
  comments: CommunityComment[];
  /** 태그 */
  tags: PostTag[];
  /** 검증된 경험자 여부 */
  verified: boolean;
  /** 고정 공지 */
  isPinned?: boolean;
  /** 도움이 됐어요 수 */
  helpful: number;
  /** 관련 지역 */
  region?: string;
}

const ago = (days: number, hours = 0) =>
  new Date(Date.now() - (days * 86400 + hours * 3600) * 1000).toISOString();
const anon = (prefix: string, n: number) => `${prefix}${n}호`;

export const CHANNEL_META: Record<CommunityChannel, { label: string; emoji: string; desc: string; color: string }> = {
  all:    { label: '전체',     emoji: '🏠', desc: '모든 게시글',             color: '#6b7280' },
  chat:   { label: '수다방',   emoji: '💬', desc: '일상 대화, 잡담',         color: '#8b5cf6' },
  review: { label: '업소 후기', emoji: '⭐', desc: '익명 업소 경험 공유',     color: '#f59e0b' },
  safety: { label: '안전 정보', emoji: '🛡️', desc: '피해 예방, 주의 정보',   color: '#ef4444' },
  salary: { label: '급여 정보', emoji: '💰', desc: '실제 급여, 조건 정보',   color: '#10b981' },
  tips:   { label: '취업 팁',   emoji: '💡', desc: '근무 노하우, 조언',       color: '#3b82f6' },
};

/** 핫 스코어 계산 (시간 감쇠 포함) */
export function hotScore(post: CommunityPost): number {
  const ageHours = (Date.now() - new Date(post.createdAt).getTime()) / 3600000;
  const engagement = post.likes * 2 + post.comments.length * 3 + post.helpful;
  return engagement / Math.pow(ageHours + 2, 1.5);
}

export const mockCommunityPosts: CommunityPost[] = [
  // ── 고정 공지 ──
  {
    id: 'post-pinned-1', channel: 'safety', isPinned: true,
    title: '⚠️ 아밤 커뮤니티 이용 규칙 (필독)',
    content: '커뮤니티는 구직자 여러분의 안전한 정보 공유를 위한 공간입니다.\n\n✅ 허용: 업무 조언, 안전 팁, 초보 질문, 일상 수다\n❌ 금지: 업소 광고, 개인정보 공유, 타인 비방, 미확인 정보\n\n특정 업소·인물은 절대 명시하지 마세요. 확인 불가한 후기는 게시 불가합니다.\n신고 누적 게시글은 즉시 삭제 처리됩니다.',
    anonymousId: '아밤 운영팀', createdAt: ago(30), views: 4823, likes: 234,
    comments: [], tags: ['공지'], verified: true, helpful: 312, region: '전국',
  },

  // ── 안전 정보 ──
  {
    id: 'post-safety-1', channel: 'safety',
    title: '정산 약속이 지켜지지 않을 때 대처하는 법 (경험 공유)',
    content: '면접 때 분명히 약속한 정산 조건이 실제로는 달랐던 경험을 정리해봤어요.\n\n① 출근 후 \"세팅비/유지비\" 등 처음에 없던 항목이 생기는 경우\n② 초과 근무에 대한 추가 지원이 약속과 다른 경우\n③ 정산 날 이유 없이 차감을 요구하는 경우\n\n대처법:\n- 면접 때 반드시 정산 방식을 구두로 명확히 확인하기\n- 매 정산 내역은 문자/메모로 꼭 기록해두기\n- 조건이 다르면 즉시 그 자리에서 이유를 물어볼 것\n\n혼자 참으면 상황이 계속됩니다. 커뮤니티에 공유해주세요.',
    anonymousId: '밤의장미🌹', createdAt: ago(2, 3), views: 12450, likes: 892,
    comments: [
      { id: 'c1', anonymousId: '소주한잔하쥬🍶', content: '나 이거 당해봤는데 진짜 그냥 멍하더라고요... 말도 못 하고 그냥 받고 나왔어 ㅠ 다음엔 절대 그러지 말자 싶었음', createdAt: ago(2), likes: 145 },
      { id: 'c2', anonymousId: '강남언니✨', content: '세팅비는 진짜 처음 듣는 소리였는데 나중에 떼가더라고. 씨X 진짜 말이 나오질 않았음. 그냥 바로 안 나간 내가 바보지', createdAt: ago(1, 18), likes: 238 },
      { id: 'c3', anonymousId: '달빛아가씨🌙', content: '기록 진짜 중요해요 언니들. 저 사진 찍어뒀다가 그걸로 해결했어요. 안 찍었으면 그냥 날린 거였음', createdAt: ago(1, 6), likes: 89 },
    ],
    tags: ['주의', '경험담'], verified: true, helpful: 634, region: '전국',
  },
  {
    id: 'post-safety-2', channel: 'safety',
    title: '면접 때 이런 분위기면 바로 나오세요 (블랙리스트 업소 특징)',
    content: '여러 가게 면접 다녀보면서 느낀 \"피해야 할 매장 패턴\" 정리해봤어요.\n\n🚨 위험 신호:\n- \"처음이니까 조건 조금 낮추고 나중에 올려줄게\" → 나중에도 안 올려줌\n- \"계약 및 조건 안내는 출근하고 말해주겠다\" → 불명확함\n- \"언니들 다 유연하게 일해\" → 구체적인 일정/방식 안 가르쳐줌\n- \"초이스 및 세팅 기준이 애매함\" → 첫 단추가 중요함\n\n처음 면접 때 지켜지는 조건인지 꼭 확실하게 짚고 가세요.',
    anonymousId: '핑크다이아💎', createdAt: ago(5), views: 8234, likes: 1023,
    comments: [
      { id: 'c4', anonymousId: '서면의여왕👑', content: '\"나중에 올려줄게\"라는 말 저도 들었는데 그게 3개월 뒤에도 똑같더라고요. 그냥 처음부터 거짓말인 거예요 진짜', createdAt: ago(4), likes: 167 },
      { id: 'c5', anonymousId: '예쁜척쟁이🎀', content: '저 세 번째 가게에서 드디어 깨달았어요ㅋㅋ 면접 때 딱 봐도 애매하게 넘기려는 느낌 오면 그냥 일어나는 게 맞음. 아깝지 않아요 진짜로', createdAt: ago(3, 12), likes: 254 },
      { id: 'c5-1', anonymousId: '홍대키다리🎸', content: '공감 100배. 저도 첫 직장이 그런 데였는데 덕분에 2달 날렸어요. 이런 글 진작 봤으면..', createdAt: ago(2, 8), likes: 98 },
    ],
    tags: ['정보공유', '주의', '팁'], verified: true, helpful: 789, region: '전국',
  },

  // ── 급여/정산 조언 ──
  {
    id: 'post-salary-1', channel: 'salary',
    title: '면접 때 반드시 확인해야 할 정산 조건 체크리스트',
    content: '정산 관련해서 나중에 문제되는 경우를 예방하는 체크리스트예요.\n\n✅ 면접 시 필수 확인 항목:\n□ 정산 주기 (당일 / 주 1회 / 월 정산 중 어떤 방식인지)\n□ 차감 항목이 존재하는지 (세팅비, 의상비 등)\n□ 지각/조기 퇴근 시 불이익 여부\n□ 초과 근무 추가 지원 여부\n□ 첫날부터 동일 조건인지 확인\n\n이 중 하나라도 애매하게 넘어가려는 가게는 한 번 더 생각해보는 게 좋아요.',
    anonymousId: '연봉협상러💼', createdAt: ago(8), views: 15678, likes: 1456,
    comments: [
      { id: 'c6', anonymousId: '밤하늘별이🌟', content: '의상비는 진짜 몰랐는데 첫날 끝나고 그 소리 들었을 때 눈앞이 캄캄했어요. 왜 말 안 해줬냐고 했더니 \"다들 그렇게 해요\"라고... 기가 막혀서', createdAt: ago(7), likes: 289 },
      { id: 'c7', anonymousId: '현금쏟아짐💰', content: '당일 정산 확실히 해주는 곳이 진짜 복이에요. 그거 하나만으로도 믿을 수 있는 가게인지 아닌지 거의 판별됨', createdAt: ago(6, 8), likes: 134 },
      { id: 'c7-1', anonymousId: '체리블라썸🌸', content: '이 글 스크린샷 찍어서 면접 전에 항상 보고 가요. 언니 진짜 감사해요', createdAt: ago(5), likes: 76 },
    ],
    tags: ['정보공유', '급여정보'], verified: true, helpful: 1023, region: '전국',
  },

  // ── 취업 팁 ──
  {
    id: 'post-tips-1', channel: 'tips',
    title: '초보 언니들 초이스 들어갈 때 첫인상 잡는 법',
    content: '초보일 때 제일 긴장되는 게 초이스 문 열릴 때잖아요 ㅎㅎ 팁 몇 개 드릴게요.\n\n1. 들어갈 때 자신감 있는 미소로 자연스럽게 인사\n2. 자세는 바르게, 눈맞춤 1~2초 자연스럽게\n3. 옷차림은 본인 체형 살려주는 깔끔한 톤 원피스 추천\n4. 표정이 경직되어 있으면 손님도 어색해하니 편안한 마음가짐!\n\n이것만 연습해도 반응이 확실히 달라집니다.',
    anonymousId: '비비드핑크💗', createdAt: ago(15), views: 11234, likes: 1089,
    comments: [
      { id: 'c9', anonymousId: '첫날설레임🦋', content: '저 첫날 너무 긴장해서 인사 목소리가 기어들어가더라고요ㅋㅋㅋ 손님이 \"괜찮아요 편하게~\" 해줬는데 그게 더 부끄러웠음ㅋㅋ 연습이 정답이에요', createdAt: ago(14), likes: 223 },
      { id: 'c10', anonymousId: '눈웃음장인😊', content: '눈맞춤 진짜 중요해요. 처음엔 무서워서 바닥만 봤는데 그러면 손님도 불편해하더라고. 몇 번 하면 돼요!', createdAt: ago(13), likes: 167 },
      { id: 'c10-1', anonymousId: '설레는밤이야🌃', content: '솔직히 초이스 처음 들어갈 때 다리 떨렸어요... 근데 몇 번 하면 오히려 설레는 느낌도 있어요ㅋㅋ 적응되면 완전 달라져요', createdAt: ago(12), likes: 88 },
    ],
    tags: ['팁', '초보환영', '조언'], verified: true, helpful: 856, region: '전국',
  },
  {
    id: 'post-tips-2', channel: 'tips',
    title: '현직 5년차 언니가 전하는 건강 관리 & 지명 관리 노하우',
    content: '오래 일하면서 배운 몇 가지 팁이에요.\n\n1. 수면 패턴 관리\n야간 근무 특성상 낮 수면을 깊게 취해야 피부나 컨디션 유지가 됩니다.\n\n2. 멘탈 관리 & 동료 교류\n일하다 보면 지치는 날도 있는데, 커뮤니티 언니들이랑 수다 떨면서 스트레스 푸는 게 제일 좋더라구요.\n\n3. 좋은 실장님 만나는 게 핵심\n방 배정 정직하게 해주고 언니들 케어 잘 해주는 실장님이랑 일해야 오래 편하게 일해요.',
    anonymousId: '오년차베테랑💪', createdAt: ago(20), views: 18930, likes: 2341,
    comments: [
      { id: 'c11', anonymousId: '잠이최고야😴', content: '수면이 진짜 전부예요. 잠 못 자면 표정부터 티가 나고 손님도 바로 눈치챔. 저 한 달 개고생하고 나서야 깨달았어요', createdAt: ago(19), likes: 334 },
      { id: 'c12', anonymousId: '좋은실장찾아라🙏', content: '나쁜 실장님한테 걸리면 진짜 그 가게 일하는 게 고역이에요. 방 배정 하나로 하루 기분이 갈리거든요. 좋은 실장님 찾으면 절대 안 떠나야 함ㅋㅋ', createdAt: ago(18), likes: 256 },
      { id: 'c12-1', anonymousId: '동탄의여신🏆', content: '5년차 언니 말 한마디 한마디가 다 경험에서 나온 말이네요. 저장해두고 지치는 날마다 다시 읽을게요', createdAt: ago(17, 6), likes: 112 },
    ],
    tags: ['경험담', '조언', '팁'], verified: true, helpful: 1678, region: '전국',
  },

  // ── 수다방 ──
  {
    id: 'post-chat-1', channel: 'chat',
    title: '비 오는 날은 손 진짜 없네요ㅠ 언니들은 어떠세요',
    content: '오늘 비 엄청 오더니 손님이 거의 없었어요. 이런 날은 일찍 퇴근하는 게 나을까요? 아니면 막방까지 기다리는 게 나을까요? 비 오는 날 다들 어떻게 하세요?',
    anonymousId: '비오는날싫어☔', createdAt: ago(0, 5), views: 3421, likes: 456,
    comments: [
      { id: 'c14', anonymousId: '허무한하루야😮‍💨', content: '저 오늘 4시간 대기하다가 손 한 명도 없어서 그냥 나왔어요ㅋㅋㅋ 진짜 허무하더라... 그냥 집에서 쉬는 게 낫겠다 싶었음', createdAt: ago(0, 4), likes: 134 },
      { id: 'c15', anonymousId: '스킨케어여왕👸', content: '비 오는 날은 죽어도 손 없음ㅋㅋㅋ 저도 오늘 일찍 잘랐어요. 몸 쉬는 날이라 생각하고 집에서 스킨케어나 했어요', createdAt: ago(0, 3), likes: 212 },
      { id: 'c15-1', anonymousId: '지명만오면돼🎯', content: '비 오는 날도 지명 손님은 온다는 말 있긴 한데... 걔네도 오늘은 안 왔더라고요ㅋㅋ 오늘 진짜 완전 뻘쭘하게 있다가 퇴근함', createdAt: ago(0, 2), likes: 88 },
    ],
    tags: ['수다'], verified: false, helpful: 0, region: '전국',
  },
  {
    id: 'post-chat-2', channel: 'chat',
    title: '오늘 방 연속으로 들어가서 연타 뛰고 기분 좋게 퇴근해요!',
    content: '오랜만에 찾아주신 지명 손님이 계속 챙겨주셔서 쉬는 시간 없이 지루할 틈도 없이 일하고 마감했네요 ㅎㅎ 다들 오늘 수고 많으셨고 조심히 퇴근하세요!',
    anonymousId: '연타의여왕⚡', createdAt: ago(1), views: 2156, likes: 234,
    comments: [
      { id: 'c16', anonymousId: '살아있는느낌🔥', content: '연타 뛰면 몸은 진짜 죽어나는데 그 느낌이 또 살아있는 것 같기도 하죠ㅋㅋㅋ 축하드려요 푹 쉬세요!!', createdAt: ago(0, 20), likes: 145 },
      { id: 'c16-1', anonymousId: '오늘은빈손😢', content: '지명 손님 연속이면 진짜 최고의 날이잖아요ㅜㅜ 부러워요 저는 오늘 막방 한 타임만 들어가고 빈손으로 퇴근ㅋㅋㅋ', createdAt: ago(0, 15), likes: 67 },
    ],
    tags: ['수다'], verified: false, helpful: 0, region: '전국',
  },
  {
    id: 'post-chat-3', channel: 'chat',
    title: '오늘 처음 출근했는데 생각보다 적응이 빨리 됐어요!',
    content: '긴장 엄청 했는데 실장님이 초이스 전에 미리 설명 잘 해주시고, 언니들도 텃세 없이 잘 챙겨줘서 금방 적응했어요. 처음엔 무섭다고 들었는데 잘 찾아가면 괜찮은 것 같아요. 화이팅!',
    anonymousId: '새벽이슬이🌿', createdAt: ago(0, 3), views: 2340, likes: 312,
    comments: [
      { id: 'c50', anonymousId: '첫날화장실💦', content: '저도 첫날 화장실에서 울뻔했어요ㅋㅋㅋ 근데 언니들이 옆에서 챙겨주니까 금방 괜찮아지더라고요. 좋은 가게 잘 고르셨네요!', createdAt: ago(0, 2), likes: 131 },
      { id: 'c50-1', anonymousId: '텃세없는천국🏠', content: '텃세 없는 곳은 진짜 복이에요. 저 첫 직장에서 언니들한테 엄청 치였거든요... 그거 때문에 한동안 일 못 했어요. 좋은 곳 찾으셨다 축하해요!', createdAt: ago(0, 1), likes: 89 },
    ],
    tags: ['수다', '초보환영'], verified: false, helpful: 0, region: '전국',
  },

];


/** 핫 게시글 정렬 */
export function getSortedPosts(
  posts: CommunityPost[],
  channel: CommunityChannel,
  sort: 'latest' | 'hot' | 'helpful',
): CommunityPost[] {
  let filtered = channel === 'all' ? posts : posts.filter(p => p.channel === channel);
  // 고정 게시글 항상 위로
  const pinned = filtered.filter(p => p.isPinned);
  const rest = filtered.filter(p => !p.isPinned);

  switch (sort) {
    case 'hot':
      rest.sort((a, b) => hotScore(b) - hotScore(a));
      break;
    case 'helpful':
      rest.sort((a, b) => b.helpful - a.helpful);
      break;
    case 'latest':
    default:
      rest.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  return [...pinned, ...rest];
}