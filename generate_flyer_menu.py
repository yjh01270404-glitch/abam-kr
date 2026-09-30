import os
from PIL import Image, ImageDraw, ImageFont

def create_circular_image(img_path, size, border_color=(212, 175, 55), border_width=4):
    img = Image.open(img_path).convert("RGBA")
    w, h = img.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    img = img.crop((left, top, left + min_dim, top + min_dim))
    img = img.resize((size, size), Image.Resampling.LANCZOS)
    
    mask = Image.new('L', (size, size), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.ellipse((border_width, border_width, size - border_width, size - border_width), fill=255)
    
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(img, (0, 0), mask)
    
    draw_out = ImageDraw.Draw(output)
    draw_out.ellipse((border_width//2, border_width//2, size - border_width//2, size - border_width//2), 
                     outline=border_color, width=border_width)
    return output

def build_flyer():
    W, H = 1080, 2150
    # 100% White/Light Theme
    im = Image.new('RGB', (W, H), '#ffffff')
    draw = ImageDraw.Draw(im)
    
    font_bold = "C:/Windows/Fonts/malgunbd.ttf"
    font_reg = "C:/Windows/Fonts/malgun.ttf"
    
    f_huge = ImageFont.truetype(font_bold, 56)
    f_large = ImageFont.truetype(font_bold, 44)
    f_sub = ImageFont.truetype(font_bold, 34)
    f_mid_bold = ImageFont.truetype(font_bold, 28)
    f_mid = ImageFont.truetype(font_reg, 26)
    f_small_bold = ImageFont.truetype(font_bold, 22)
    f_small = ImageFont.truetype(font_reg, 21)
    f_xs = ImageFont.truetype(font_bold, 17)
    f_price_bold = ImageFont.truetype(font_bold, 35)
    f_time_bold = ImageFont.truetype(font_bold, 28)
    
    # Gold decorative top/bottom border
    draw.rectangle([0, 0, W, 14], fill='#d4af37')
    draw.rectangle([0, H-14, W, H], fill='#d4af37')
    
    # Outer frame
    draw.rectangle([20, 20, W-20, H-20], outline='#e8e0d0', width=2)
    
    # 1. Top Capsule Badge
    badge_w, badge_h = 800, 52
    badge_x = (W - badge_w) // 2
    badge_y = 45
    draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h], radius=26, fill='#fdf8eb', outline='#d4af37', width=2)
    draw.text((badge_x + 35, badge_y + 11), "오후 7시 ~ 새벽 5시 예약가능  |  서울 25개 구 전지역", font=f_small_bold, fill='#854d0e')
    
    # 2. Main Title
    draw.text((60, 118), "정통 왓포 수기 & 감성 힐링", font=f_huge, fill='#090d16')
    draw.text((60, 195), "아름다운 밤 (Abam) 홈케어", font=f_large, fill='#b38728')
    
    # 3. Model Avatar
    try:
        model_thumb = create_circular_image("public/images/model_avatar.jpg", 175, border_color=(212, 175, 55), border_width=5)
        im.paste(model_thumb, (840, 95), model_thumb)
        draw.text((860, 280), "VIP 프라이빗 홈케어", font=f_xs, fill='#64748b')
    except Exception as e:
        print("Model thumb error:", e)
        
    # 4. Top Call Banner Pill
    call_pill_y = 300
    draw.rounded_rectangle([60, call_pill_y, W-60, call_pill_y + 88], radius=44, fill='#dc2626')
    draw.rounded_rectangle([62, call_pill_y+2, W-62, call_pill_y + 86], radius=42, outline='#ffffff', width=2)
    draw.text((100, call_pill_y + 18), "CALL : 010-6607-2239", font=f_large, fill='#ffffff')
    draw.rounded_rectangle([630, call_pill_y + 14, 960, call_pill_y + 74], radius=28, fill='#991b1b')
    draw.text((655, call_pill_y + 24), "화면 클릭 시 즉시 전화연결", font=f_mid_bold, fill='#fef08a')
    
    # 5. Course Cards
    courses = [
        {
            "name": "타이 정통 코스",
            "img": "public/images/thai.jpg",
            "tag": "왓포 정통 건식 수기",
            "p1_t": "60분", "p1_v": "8만",
            "p2_t": "90분", "p2_v": "10만",
            "p3_t": "120분", "p3_v": "12만",
            "is_vip": False,
            "ribbon": None,
        },
        {
            "name": "아로마 힐링 코스",
            "img": "public/images/aroma.jpg",
            "tag": "100% 천연 에센셜 오일",
            "p1_t": "60분", "p1_v": "9만",
            "p2_t": "90분", "p2_v": "11만",
            "p3_t": "120분", "p3_v": "14만",
            "is_vip": False,
            "ribbon": None,
        },
        {
            "name": "감성힐링 테라피",
            "img": "public/images/sensual_touch.jpg",
            "tag": "섬세하고 감미로운 릴렉싱",
            "p1_t": "60분", "p1_v": "9만",
            "p2_t": "90분", "p2_v": "12만",
            "p3_t": "120분", "p3_v": "15만",
            "is_vip": False,
            "ribbon": "추천코스",
        },
        {
            "name": "스페셜 듀얼 코스",
            "img": "public/images/sensual_care.jpg",
            "tag": "타이 + 아로마 오일 믹스",
            "p1_t": "60분", "p1_v": "10만",
            "p2_t": "90분", "p2_v": "14만",
            "p3_t": "120분", "p3_v": "17만",
            "is_vip": False,
            "ribbon": "만족도 1위",
        },
        {
            "name": "황제 VIP 시그니처",
            "img": "public/images/hero_sensual_goddess.jpg",
            "tag": "풀코스 VIP 림프 집중 케어",
            "p1_t": "60분", "p1_v": "12만",
            "p2_t": "90분", "p2_v": "16만",
            "p3_t": "120분", "p3_v": "20만",
            "is_vip": True,
            "ribbon": "강추 1티어 코스",
        },
    ]
    
    start_y = 415
    card_h = 166
    card_gap = 20
    
    for i, c in enumerate(courses):
        cy = start_y + i * (card_h + card_gap)
        
        if c["is_vip"]:
            draw.rounded_rectangle([50, cy, W-50, cy + card_h], radius=24, fill='#fefcf4', outline='#d4af37', width=3)
            draw.rounded_rectangle([54, cy+4, W-54, cy + card_h - 4], radius=20, outline='#fef3c7', width=2)
        else:
            draw.rounded_rectangle([50, cy, W-50, cy + card_h], radius=24, fill='#ffffff', outline='#e2e8f0', width=2)
            
        # Left circular thumbnail
        try:
            border_c = (212, 175, 55) if c["is_vip"] else (226, 232, 240)
            thumb = create_circular_image(c["img"], 134, border_color=border_c, border_width=4)
            im.paste(thumb, (70, cy + 16), thumb)
        except Exception as e:
            print("Thumb error:", e)
            
        # Course Title Header
        title_x = 230
        title_y = cy + 20
        draw.text((title_x, title_y), c["name"], font=f_sub, fill='#090d16')
        
        # Tag
        draw.rounded_rectangle([title_x + 310, title_y + 4, title_x + 500, title_y + 38], radius=8, fill='#f1f5f9')
        draw.text((title_x + 325, title_y + 8), c["tag"], font=f_small, fill='#475569')
        
        # Ribbon badge
        if c["ribbon"]:
            r_bg = '#dc2626' if '추천' in c["ribbon"] else ('#d4af37' if '1티어' in c["ribbon"] else '#2563eb')
            r_fg = '#ffffff' if r_bg != '#d4af37' else '#000000'
            draw.rounded_rectangle([W - 270, title_y + 2, W - 75, title_y + 40], radius=10, fill=r_bg)
            draw.text((W - 250, title_y + 7), c["ribbon"], font=f_small_bold, fill=r_fg)
            
        # Price Pill Box with exact 3-segment pricing
        pill_y = cy + 80
        pill_w = W - 50 - title_x - 20
        pill_bg = '#fffdf7' if c["is_vip"] else '#f8fafc'
        pill_bd = '#d4af37' if c["is_vip"] else '#e2e8f0'
        draw.rounded_rectangle([title_x, pill_y, title_x + pill_w, pill_y + 64], radius=16, fill=pill_bg, outline=pill_bd, width=1)
        
        # Draw formatted 3 segments
        seg_w = pill_w // 3
        # Seg 1
        draw.text((title_x + 20, pill_y + 16), c["p1_t"], font=f_time_bold, fill='#334155')
        draw.text((title_x + 95, pill_y + 11), c["p1_v"], font=f_price_bold, fill='#dc2626')
        draw.text((title_x + seg_w - 15, pill_y + 14), "·", font=f_price_bold, fill='#94a3b8')
        
        # Seg 2
        draw.text((title_x + seg_w + 10, pill_y + 16), c["p2_t"], font=f_time_bold, fill='#334155')
        draw.text((title_x + seg_w + 85, pill_y + 11), c["p2_v"], font=f_price_bold, fill='#dc2626')
        draw.text((title_x + seg_w * 2 - 15, pill_y + 14), "·", font=f_price_bold, fill='#94a3b8')
        
        # Seg 3
        draw.text((title_x + seg_w * 2 + 10, pill_y + 16), c["p3_t"], font=f_time_bold, fill='#334155')
        draw.text((title_x + seg_w * 2 + 105, pill_y + 11), c["p3_v"], font=f_price_bold, fill='#dc2626')

    # 6. Dual Guarantee Badges
    badges_y = start_y + 5 * (card_h + card_gap) + 15
    b_h = 100
    b_w = (W - 100 - 20) // 2
    
    # Left Guarantee Badge
    draw.rounded_rectangle([50, badges_y, 50 + b_w, badges_y + b_h], radius=18, fill='#f8fafc', outline='#cbd5e1', width=2)
    draw.text((70, badges_y + 18), "20~30분 내 신속 방문", font=f_mid_bold, fill='#090d16')
    draw.text((70, badges_y + 55), "서울 25개 구 전지역 즉시 배차", font=f_small, fill='#64748b')
    
    # Right Guarantee Badge
    draw.rounded_rectangle([50 + b_w + 20, badges_y, W - 50, badges_y + b_h], radius=18, fill='#fdfcf8', outline='#d4af37', width=2)
    draw.text((50 + b_w + 40, badges_y + 18), "100% 현장 대면결제", font=f_mid_bold, fill='#854d0e')
    draw.text((50 + b_w + 40, badges_y + 55), "선입금 0원 · 카드/계좌이체 가능", font=f_small, fill='#b45309')
    
    # 7. Notice Box (이용 안내)
    notice_y = badges_y + b_h + 20
    notice_h = 190
    draw.rounded_rectangle([50, notice_y, W - 50, notice_y + notice_h], radius=20, fill='#f8fafc', outline='#e2e8f0', width=2)
    
    # Notice Left: No Vice Badge
    draw.rounded_rectangle([75, notice_y + 35, 290, notice_y + 155], radius=16, fill='#fee2e2', outline='#ef4444', width=2)
    draw.text((105, notice_y + 55), "[ 이용 안내 ]", font=f_mid_bold, fill='#991b1b')
    draw.text((95, notice_y + 100), "퇴폐 문의 X", font=f_price_bold, fill='#dc2626')
    
    # Notice Right: Checklist
    nl_x = 320
    draw.text((nl_x, notice_y + 24), "• 자택(아파트·빌라) 및 서울 전역 호텔·오피스텔 방문 가능", font=f_small_bold, fill='#1e293b')
    draw.text((nl_x, notice_y + 64), "• 서울 이외에는 이동이 어려운 점 너른 양해 부탁드립니다", font=f_small_bold, fill='#b91c1c')
    draw.text((nl_x, notice_y + 104), "• 과도한 만취 · 폭언 · 비매너 · 발신번호표시제한 이용 불가", font=f_small_bold, fill='#475569')
    draw.text((nl_x, notice_y + 144), "• 기상 악화나 심야 교통 상황에 따라 5~10분 지연될 수 있습니다", font=f_small, fill='#64748b')
    
    # 8. Bottom Call Button
    bot_btn_y = notice_y + notice_h + 25
    draw.rounded_rectangle([50, bot_btn_y, W - 50, bot_btn_y + 92], radius=46, fill='#dc2626')
    draw.rounded_rectangle([52, bot_btn_y + 2, W - 52, bot_btn_y + 90], radius=44, outline='#ffffff', width=2)
    draw.text((90, bot_btn_y + 20), "CALL : 010-6607-2239", font=f_large, fill='#ffffff')
    draw.rounded_rectangle([630, bot_btn_y + 14, 960, bot_btn_y + 74], radius=28, fill='#991b1b')
    draw.text((655, bot_btn_y + 24), "화면 클릭 시 즉시 전화연결", font=f_mid_bold, fill='#fef08a')
    
    out_path = "public/images/abam_flyer_menu.jpg"
    im.save(out_path, quality=95)
    print("Saved:", out_path, os.path.getsize(out_path))

if __name__ == '__main__':
    build_flyer()
