# -*- coding: utf-8 -*-

def refine_page():
    path = 'src/app/page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update line 1323 (Night banner paragraph)
    old_p = '선입금 X · 100% 현장 대면결제. 새벽 5시 마감 전까지 수도권 전지역 30분 내외 즉시 찾아갑니다. 강남·청담 VIP 라운지의 깊은 힐링과 매혹적인 손길을 고객님의 프라이빗 공간에서 누리세요.'
    new_p = '선입금 0원 · 100% 현장 대면결제! 새벽 5시 마감 전까지 서울 25개 구 전역 및 가까운 경기 핵심권 어디든 20~30분 내외로 즉시 찾아갑니다. 최고급 VIP 라운지의 깊은 힐링과 매혹적인 손길을 고객님의 프라이빗 룸에서 편안하게 누리세요.'
    content = content.replace(old_p, new_p)

    # 2. Update line 1749 (Directory paragraph)
    old_dir_p = '정통 왓포 건식 & 천연 아로마 림프 케어 · 강남·서초·송파·수도권 전지역 30분 즉시 배차'
    new_dir_p = '정통 왓포 건식 & 천연 아로마 림프 케어 · 서울 25개 구 전지역 & 가까운 경기 핵심권 20~30분 즉시 배차'
    content = content.replace(old_dir_p, new_dir_p)

    # 3. Update FAQ comment
    content = content.replace('{/* ── [벤치마크 특화 4] ❓ 강남출장안마 자주 묻는 질문 (FAQ 8문 8답 아코디언) ── */}', '{/* ── [벤치마크 특화 4] ❓ 서울 전지역 & 경기권 출장 홈케어 자주 묻는 질문 (FAQ 8문 8답 아코디언) ── */}')

    # 4. Global CSS styling refinement for perfect indentation and line-breaks on PC & Mobile
    # Ensure all section paragraphs and headings have wordBreak: 'keep-all', overflowWrap: 'break-word'
    content = content.replace("wordBreak: 'keep-all',", "wordBreak: 'keep-all', overflowWrap: 'break-word',")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Refined page.tsx text and formatting successfully!')

refine_page()
