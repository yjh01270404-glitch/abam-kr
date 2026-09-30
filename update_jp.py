import re

# Update jp/page.tsx
jp_path = 'src/app/jp/page.tsx'
with open(jp_path, 'r', encoding='utf-8') as f:
    jp_content = f.read()

jp_content = re.sub(
    r"const LINE_LINK = 'https://line\.me/ti/p/~abam1004';\s*",
    "",
    jp_content
)
jp_content = re.sub(
    r"const TELEGRAM_LINK = 'https://t\.me/abam1004';\s*",
    "",
    jp_content
)

# Replace header buttons
header_old_jp = """          {/* Quick Contact Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.35)' }}>
              WhatsApp
            </a>
            <a href={LINE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#06C755', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(6,199,85,0.35)' }}>
              LINE
            </a>
          </div>"""

header_new_jp = """          {/* Quick Contact Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.35)' }}>
              💬 WhatsApp
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 800, color: '#090d16', backgroundColor: '#f3e5ab', border: '1px solid #d4af37', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none' }}>
              📞 お電話
            </a>
          </div>"""

jp_content = jp_content.replace(header_old_jp, header_new_jp)

# Hero actions
hero_old_jp = """              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '14.5px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
                  WhatsAppで即時予約
                </a>
                <a href={LINE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#06C755', color: '#ffffff', fontWeight: 900, fontSize: '14.5px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(6,199,85,0.4)' }}>
                  LINE公式 (ID: abam1004)
                </a>
                <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 800, fontSize: '14.5px', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #d4af37' }}>
                  電話: {PHONE_DISPLAY}
                </a>
              </div>"""

hero_new_jp = """              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.45)' }}>
                  💬 WhatsAppで即時予約 (24時間日本語対応)
                </a>
                <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 24px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
                  📞 お電話: {PHONE_DISPLAY}
                </a>
              </div>"""

jp_content = jp_content.replace(hero_old_jp, hero_new_jp)

# Bottom section
sec_old_jp = """          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              WhatsApp: +82 10-6607-2239
            </a>
            <a href={LINE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#06C755', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              LINE ID: abam1004
            </a>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#229ED9', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              Telegram: @abam1004
            </a>
          </div>"""

sec_new_jp = """          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
              💬 WhatsApp: +82 10-6607-2239
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', border: '1px solid #d4af37', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              📞 国際電話: {PHONE_DISPLAY}
            </a>
          </div>"""

jp_content = jp_content.replace(sec_old_jp, sec_new_jp)

# Fixed bar
bar_old_jp = """        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1.3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.35)' }}>
            WhatsApp予約
          </a>
          <a href={LINE_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#06C755', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(6,199,85,0.35)' }}>
            LINE (abam1004)
          </a>
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 800, fontSize: '14px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', border: '1px solid #d4af37' }}>
            お電話
          </a>
        </div>"""

bar_new_jp = """        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.35)' }}>
            💬 WhatsApp 24時間予約
          </a>
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '14.5px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37' }}>
            📞 今すぐお電話
          </a>
        </div>"""

jp_content = jp_content.replace(bar_old_jp, bar_new_jp)

with open(jp_path, 'w', encoding='utf-8') as f:
    f.write(jp_content)

print("Updated jp/page.tsx successfully!")
