'use client';

import React, { useState, useCallback, useEffect } from 'react';
import type { CommunityChannel, CommunityPost } from '../../lib/communityData';
import {
  CHANNEL_META,
  mockCommunityPosts,
  getSortedPosts,
} from '../../lib/communityData';
import { getUserNickname, setUserNickname } from '../../lib/propertyData';
import styles from './community.module.css';

// 상대 시간 포매터
function relTime(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return '방금';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

// 간단 숫자 포매터
function fNum(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + '만';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

// ─── 게시물 작성 모달 ────────────────────────────────────────────
function PostModal({ onClose, onSubmit, authorNickname }: { onClose: () => void; onSubmit: (p: Omit<CommunityPost, 'id' | 'views' | 'likes' | 'comments' | 'helpful' | 'verified' | 'createdAt'>) => void; authorNickname: string }) {
  const [channel, setChannel] = useState<CommunityChannel>('chat');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const channels: CommunityChannel[] = ['chat', 'review', 'safety', 'salary', 'tips'];

  const handleSubmit = () => {
    if (!title.trim() || content.trim().length < 20) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({
        channel,
        title: title.trim(),
        content: content.trim(),
        anonymousId: authorNickname || '익명',
        tags: [],
        region: undefined,
      });
      setSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>✍️ 새 글 쓰기</h2>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>

        <div className={styles.modalBody}>
          {/* 채널 선택 */}
          <div className={styles.fieldLabel}>채널 선택</div>
          <div className={styles.channelGrid}>
            {channels.map(ch => {
              const meta = CHANNEL_META[ch];
              return (
                <button
                  key={ch}
                  className={`${styles.channelChip} ${channel === ch ? styles.channelChipActive : ''}`}
                  onClick={() => setChannel(ch)}
                >
                  {meta.emoji} {meta.label}
                </button>
              );
            })}
          </div>

          {/* 제목 */}
          <div className={styles.fieldLabel}>제목</div>
          <input
            className={styles.modalInput}
            placeholder="제목을 입력하세요"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={60}
          />

          {/* 내용 */}
          <div className={styles.fieldLabel}>내용 <span className={styles.fieldHint}>(최소 20자)</span></div>
          <textarea
            className={styles.modalTextarea}
            placeholder="솔직한 경험을 공유해주세요. 매장 이름은 이니셜로 표현해주세요."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={7}
          />
          <div className={styles.contentLen}>{content.length}/1000</div>


          <div className={styles.modalNotice}>
            ⚠️ 특정 매장 비방, 개인정보 노출, 광고성 글은 관리팀이 즉시 삭제합니다.
          </div>

          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={!title.trim() || content.trim().length < 20 || submitting}
          >
            {submitting ? '게시 중...' : '✓ 게시하기'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 게시물 카드 ─────────────────────────────────────────────────
function PostCard({ post, onClick }: { post: CommunityPost; onClick: () => void }) {
  const meta = CHANNEL_META[post.channel];
  const isHot = post.likes >= 500 || post.helpful >= 300;

  return (
    <div className={`${styles.postCard} ${post.isPinned ? styles.postCardPinned : ''}`} onClick={onClick}>
      <div className={styles.postCardTop}>
        <span className={styles.channelTag} style={{ color: meta.color, borderColor: meta.color }}>
          {meta.emoji} {meta.label}
        </span>
        {post.isPinned && <span className={styles.pinnedTag}>📌 공지</span>}
        {isHot && !post.isPinned && <span className={styles.hotTag}>🔥 HOT</span>}
        {post.verified && <span className={styles.verifiedTag}>✓ 검증</span>}
      </div>

      <h3 className={styles.postTitle}>{post.title}</h3>
      <p className={styles.postPreview}>{post.content.slice(0, 100).replace(/\n/g, ' ')}...</p>

      <div className={styles.postMeta}>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>👤</span> {post.anonymousId}
        </span>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>🕐</span> {relTime(post.createdAt)}
        </span>
        {post.region && (
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📍</span> {post.region}
          </span>
        )}
        <span className={styles.metaSpacer} />
        <span className={styles.metaStat}>👁 {fNum(post.views)}</span>
        <span className={styles.metaStat}>❤️ {fNum(post.likes)}</span>
        <span className={styles.metaStat}>💬 {post.comments.length}</span>
        <span className={styles.metaStat}>🙌 {fNum(post.helpful)}</span>
      </div>

      {post.tags.length > 0 && (
        <div className={styles.postTags}>
          {post.tags.map(t => <span key={t} className={styles.postTag}>#{t}</span>)}
        </div>
      )}
    </div>
  );
}

// ─── 게시물 상세 모달 ────────────────────────────────────────────
function PostDetailModal({ post, onClose, onHelpful, onLike }: {
  post: CommunityPost;
  onClose: () => void;
  onHelpful: (id: string) => void;
  onLike: (id: string) => void;
}) {
  const meta = CHANNEL_META[post.channel];
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState(post.comments);

  const addComment = (nick: string) => {
    if (!newComment.trim()) return;
    const comment = {
      id: `c-${Date.now()}`,
      anonymousId: nick || '익명',
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setLocalComments(prev => [...prev, comment]);
    setNewComment('');
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={`${styles.modalBox} ${styles.detailModal}`} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <span className={styles.channelTag} style={{ color: meta.color, borderColor: meta.color }}>
            {meta.emoji} {meta.label}
          </span>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>

        <div className={styles.detailBody}>
          <h2 className={styles.detailTitle}>{post.title}</h2>
          <div className={styles.detailMeta}>
            {post.verified && <span className={styles.verifiedTag}>✓ 검증된 경험자</span>}
            <span className={styles.metaItem}>👤 {post.anonymousId}</span>
            <span className={styles.metaItem}>🕐 {relTime(post.createdAt)}</span>
            {post.region && <span className={styles.metaItem}>📍 {post.region}</span>}
          </div>

          <div className={styles.detailContent}>{post.content}</div>

          {/* 반응 버튼 */}
          <div className={styles.reactionRow}>
            <button className={styles.reactionBtn} onClick={() => onLike(post.id)}>
              ❤️ 좋아요 {fNum(post.likes)}
            </button>
            <button className={styles.reactionBtnGreen} onClick={() => onHelpful(post.id)}>
              🙌 도움됐어요 {fNum(post.helpful)}
            </button>
          </div>

          {/* 댓글 목록 */}
          <div className={styles.commentSection}>
            <div className={styles.commentTitle}>💬 댓글 {localComments.length}개</div>
            {localComments.map(c => (
              <div key={c.id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>{c.anonymousId}</span>
                  <span className={styles.commentTime}>{relTime(c.createdAt)}</span>
                </div>
                <div className={styles.commentContent}>{c.content}</div>
                <div className={styles.commentLike}>❤️ {c.likes}</div>
              </div>
            ))}

            {/* 댓글 작성 */}
            <div className={styles.commentInput}>
              <input
                placeholder="댓글을 입력하세요..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addComment(getUserNickname() || '익명')}
                className={styles.commentInputField}
              />
              <button className={styles.commentSubmit} onClick={() => addComment(getUserNickname() || '익명')}>게시</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 메인 커뮤니티 페이지 ────────────────────────────────────────
export default function CommunityPage() {
  const [activeChannel, setActiveChannel] = useState<CommunityChannel>('all');
  const [sort, setSort] = useState<'latest' | 'hot' | 'helpful'>('hot');
  const [search, setSearch] = useState('');
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [helpfulIds, setHelpfulIds] = useState<Set<string>>(new Set());
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const saved = getUserNickname();
    if (saved) setNickname(saved);
  }, []);

  const channels: CommunityChannel[] = ['all', 'chat', 'review', 'safety', 'salary', 'tips'];

  const sorted = getSortedPosts(posts, activeChannel, sort).filter(p =>
    !search || p.title.includes(search) || p.content.includes(search)
  );

  const handleLike = useCallback((id: string) => {
    if (likedIds.has(id)) return;
    setLikedIds(prev => new Set([...prev, id]));
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    if (selectedPost?.id === id) setSelectedPost(p => p ? { ...p, likes: p.likes + 1 } : null);
  }, [likedIds, selectedPost]);

  const handleHelpful = useCallback((id: string) => {
    if (helpfulIds.has(id)) return;
    setHelpfulIds(prev => new Set([...prev, id]));
    setPosts(prev => prev.map(p => p.id === id ? { ...p, helpful: p.helpful + 1 } : p));
    if (selectedPost?.id === id) setSelectedPost(p => p ? { ...p, helpful: p.helpful + 1 } : null);
  }, [helpfulIds, selectedPost]);

  const handleNewPost = (partial: Omit<CommunityPost, 'id' | 'views' | 'likes' | 'comments' | 'helpful' | 'verified' | 'createdAt'>) => {
    const newPost: CommunityPost = {
      ...partial,
      id: `post-${Date.now()}`,
      views: 1,
      likes: 0,
      comments: [],
      helpful: 0,
      verified: false,
      createdAt: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  // 채널별 통계
  const channelCounts = channels.reduce((acc, ch) => {
    acc[ch] = ch === 'all' ? posts.length : posts.filter(p => p.channel === ch).length;
    return acc;
  }, {} as Record<CommunityChannel, number>);

  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>💬 아밤 커뮤니티</h1>
          <p className={styles.heroSub}>언니들의 진짜 경험과 정보가 모이는 곳 — 익명으로 안전하게</p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}><strong>{posts.length}</strong> 게시글</div>
            <div className={styles.heroDivider} />
            <div className={styles.heroStat}><strong>142</strong> 지금 접속중</div>
            <div className={styles.heroDivider} />
            <div className={styles.heroStat}><strong>5개</strong> 전문 채널</div>
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        {/* 사이드바 — 채널 목록 */}
        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <div className={styles.sideTitle}>📋 채널</div>
            {channels.map(ch => {
              const meta = CHANNEL_META[ch];
              return (
                <button
                  key={ch}
                  className={`${styles.sideChannel} ${activeChannel === ch ? styles.sideChannelActive : ''}`}
                  onClick={() => setActiveChannel(ch)}
                  style={activeChannel === ch ? { borderLeftColor: meta.color } : {}}
                >
                  <span className={styles.sideChannelEmoji}>{meta.emoji}</span>
                  <span className={styles.sideChannelLabel}>{meta.label}</span>
                  <span className={styles.sideChannelCount}>{channelCounts[ch]}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.sideCard}>
            <div className={styles.sideTitle}>🏆 커뮤니티 가이드</div>
            <div className={styles.guideList}>
              <div className={styles.guideItem}>✓ 익명으로 안전하게 글쓰기</div>
              <div className={styles.guideItem}>✓ 매장 이름은 이니셜만 가능</div>
              <div className={styles.guideItem}>✓ 검증된 경험자 게시글 신뢰</div>
              <div className={styles.guideItem}>✓ 도움됐어요로 좋은 정보 상승</div>
            </div>
          </div>

          <button className={styles.writeBtn} onClick={() => setShowWriteModal(true)}>
            ✍️ 글쓰기
          </button>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className={styles.main}>
          {/* 검색 + 정렬 */}
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                className={styles.searchInput}
                placeholder="게시글 검색..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className={styles.sortBtns}>
              {(['hot', 'latest', 'helpful'] as const).map(s => (
                <button
                  key={s}
                  className={`${styles.sortBtn} ${sort === s ? styles.sortBtnActive : ''}`}
                  onClick={() => setSort(s)}
                >
                  {s === 'hot' ? '🔥 인기' : s === 'latest' ? '🕐 최신' : '🙌 도움'}
                </button>
              ))}
            </div>
          </div>

          {/* 채널 인디케이터 */}
          {activeChannel !== 'all' && (
            <div className={styles.channelIndicator} style={{ borderColor: CHANNEL_META[activeChannel].color }}>
              <span>{CHANNEL_META[activeChannel].emoji}</span>
              <span className={styles.channelIndicatorName}>{CHANNEL_META[activeChannel].label}</span>
              <span className={styles.channelIndicatorDesc}>— {CHANNEL_META[activeChannel].desc}</span>
            </div>
          )}

          {/* 게시물 목록 */}
          <div className={styles.postList}>
            {sorted.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>📭</div>
                <div>게시글이 없습니다. 첫 번째 글을 작성해보세요!</div>
              </div>
            ) : (
              sorted.map(post => (
                <PostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
              ))
            )}
          </div>
        </main>
      </div>

      {/* 모달들 */}
      {showWriteModal && (
        <PostModal onClose={() => setShowWriteModal(false)} onSubmit={handleNewPost} authorNickname={nickname} />
      )}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={handleLike}
          onHelpful={handleHelpful}
        />
      )}
    </div>
  );
}
