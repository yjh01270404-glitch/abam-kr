# -*- coding: utf-8 -*-
import re

# 1. Update layout.tsx
def update_layout():
    path = 'src/app/layout.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace(
        "default: '아름다운 밤 타이 홈케어 (Abam) | 왓포 정통 수기 & 아로마 · 수도권 30분 도착 100% 대면결제',",
        "default: '아름다운 밤 타이 홈케어 (Abam) | 왓포 정통 수기 & 아로마 · 서울 전지역 20~30분 도착 100% 대면결제',"
    )
    content = content.replace(
        "'아름다운 밤을 선물하는 프리미엄 방문 힐링, 아름다운 밤 타이 홈케어(Abam). 서울·경기 전 지역 30분 내외 방문. 선입금 0원, 관리사 도착 후 100% 현장 대면결제. 타이·아로마·힐링 VIP 정찰제 홈케어. 24시간 연중무휴 상시 운영.'",
        "'아름다운 밤을 선물하는 프리미엄 방문 힐링, 아름다운 밤 타이 홈케어(Abam). 오직 서울특별시 25개 구 전지역 20~30분 내외 총알 방문! 선입금 0원, 관리사 도착 후 100% 현장 대면결제. 타이·아로마·힐링 VIP 정찰제 홈케어. 24시간 연중무휴 상시 운영.'"
    )
    content = content.replace(
        "'분당출장홈케어', '판교출장홈케어', '일산출장홈케어', '수원출장홈케어', '동탄출장홈케어', '부천출장홈케어', '광교출장홈케어', '위례출장홈케어',",
        "'종로출장홈케어', '중구출장홈케어', '동작출장홈케어', '관악출장홈케어', '강서출장홈케어', '양천출장홈케어', '구로출장홈케어', '광진출장홈케어',"
    )
    content = content.replace(
        "'서울출장마사지', '서울출장홈케어', '경기출장마사지', '경기출장홈케어', '분당출장마사지', '수원출장홈타이',",
        "'서울출장마사지', '서울출장홈케어', '서울25개구홈타이', '서울호텔마사지', '서울방문마사지', '서울야간출장마사지',"
    )
    content = content.replace(
        "description: '선입금 없는 안전한 서울·경기 24시 출장 홈케어. 100% 현장 대면결제. 30분 도착.',",
        "description: '선입금 없는 안전한 서울 전지역 24시 출장 홈케어. 100% 현장 대면결제. 20~30분 도착.',"
    )
    content = content.replace(
        "'선입금 0원! 관리사 도착 후 직접 확인하고 결제하는 가장 안전한 홈케어. 강남·서울·경기 전 지역 30분 내 방문. 타이·아로마·힐링 VIP 24시간 운영.'",
        "'선입금 0원! 관리사 도착 후 직접 확인하고 결제하는 가장 안전한 홈케어. 오직 서울 전지역 25개 구 20~30분 내 방문. 타이·아로마·힐링 VIP 24시간 운영.'"
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Updated layout.tsx successfully!')

# 2. Update sitemap.ts
def update_sitemap():
    path = 'src/app/sitemap.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace('SEOUL_SEO, GYEONGGI_SEO,', 'SEOUL_SEO,')
    content = content.replace('  // 경기 지역 (0.88)\n  const gyeonggiPages = GYEONGGI_SEO.map(k => toSeoPage(k, 0.88));\n', '')
    content = content.replace('    ...gyeonggiPages,\n', '')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Updated sitemap.ts successfully!')

# 3. Update en/page.tsx, jp/page.tsx, cn/page.tsx
def update_foreign_pages():
    for lang, title_kw, area_desc in [
        ('en', 'Seoul 25 Districts In-Room Spa', 'Exclusive to Seoul · All 25 Districts 100% Covered within 20~30 Mins · Pay on Arrival'),
        ('jp', 'ソウル全25区専属出張マッサージ', 'ソウル市内全25区100%専属出張・20〜30分到着・100%対面決済'),
        ('cn', '首尔全境25区专属上门按摩', '专营首尔全境25个行政区100%上门·20~30分钟极速送达·100%当面结账'),
    ]:
        p = f'src/app/{lang}/page.tsx'
        with open(p, 'r', encoding='utf-8') as f:
            c = f.read()
        c = c.replace('Seoul & Metropolitan Area', 'Seoul Exclusive (All 25 Districts)')
        c = c.replace('ソウル・首都圏エリア', 'ソウル全域専属（25区100%対応）')
        c = c.replace('首尔及首都圈', '首尔专营全境（25区100%上门）')
        with open(p, 'w', encoding='utf-8') as f:
            f.write(c)
        print(f'Updated {lang}/page.tsx successfully!')

update_layout()
update_sitemap()
update_foreign_pages()
