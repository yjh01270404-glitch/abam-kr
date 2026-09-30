import re

# Update en/page.tsx
en_path = 'src/app/en/page.tsx'
with open(en_path, 'r', encoding='utf-8') as f:
    en_content = f.read()

# Replace metadata description
en_content = re.sub(
    r'Book easily via WhatsApp & LINE\.',
    'Book easily via WhatsApp (+82 10-6607-2239) & Direct Call.',
    en_content
)
en_content = re.sub(
    r'English concierge via WhatsApp & LINE\.',
    'English concierge via WhatsApp & Direct Phone Call.',
    en_content
)

# Remove unused consts LINE_LINK and TELEGRAM_LINK
en_content = re.sub(
    r"const LINE_LINK = 'https://line\.me/ti/p/~abam1004';\s*const TELEGRAM_LINK = 'https://t\.me/abam1004';",
    "// Clean 2-Channel Concierge: WhatsApp & Direct Phone",
    en_content
)

# Header contact buttons
header_old_en = """          {/* Quick Contact Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.35)' }}>
              WhatsApp
            </a>
            <a href={LINE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#06C755', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(6,199,85,0.35)' }}>
              LINE
            </a>
          </div>"""

header_new_en = """          {/* Quick Contact Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.35)' }}>
              💬 WhatsApp
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 800, color: '#090d16', backgroundColor: '#f3e5ab', border: '1px solid #d4af37', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none' }}>
              📞 Call
            </a>
          </div>"""

en_content = en_content.replace(header_old_en, header_new_en)

# Hero actions
hero_old_en = """              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '14.5px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
                  Book on WhatsApp (Instant)
                </a>
                <a href={LINE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#06C755', color: '#ffffff', fontWeight: 900, fontSize: '14.5px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(6,199,85,0.4)' }}>
                  LINE (ID: abam1004)
                </a>
                <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 800, fontSize: '14.5px', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #d4af37' }}>
                  Call {PHONE_DISPLAY}
                </a>
              </div>"""

hero_new_en = """              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.45)' }}>
                  💬 Book on WhatsApp (Instant 24/7)
                </a>
                <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 24px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
                  📞 Call {PHONE_DISPLAY}
                </a>
              </div>"""

en_content = en_content.replace(hero_old_en, hero_new_en)

# English concierge card
en_content = re.sub(
    r'<div style=\{\{ fontSize: \'11\.5px\', color: \'#64748b\' \}\}>Instant WhatsApp / LINE support</div>',
    "<div style={{ fontSize: '11.5px', color: '#64748b' }}>Instant WhatsApp & Phone hotline</div>",
    en_content
)

# Global Messenger Floating Card
sec_old_en = """        {/* Global Messenger Floating Card */}
        <section style={{ backgroundColor: '#090d16', borderRadius: '20px', border: '1.5px solid #d4af37', padding: '36px 28px', color: '#ffffff', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#f3e5ab', margin: '0 0 10px' }}>
            Ready to Unwind Tonight? We Are Standing By 24/7.
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            No Korean phone number required. Speak with our English concierge right now through your preferred international messenger.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              WhatsApp: +82 10-6607-2239
            </a>
            <a href={LINE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#06C755', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              LINE ID: abam1004
            </a>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#229ED9', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              Telegram: @abam1004
            </a>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#07C160', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '12px 24px', borderRadius: '8px' }}>
              WeChat ID: Abam1004
            </div>
          </div>
        </section>"""

sec_new_en = """        {/* Global Messenger Floating Card */}
        <section style={{ backgroundColor: '#090d16', borderRadius: '20px', border: '1.5px solid #d4af37', padding: '36px 28px', color: '#ffffff', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#f3e5ab', margin: '0 0 10px' }}>
            Ready to Unwind Tonight? We Are Standing By 24/7.
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            No Korean phone number required. Connect directly with our English concierge via WhatsApp or call our international hotline.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
              💬 WhatsApp: +82 10-6607-2239
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', border: '1px solid #d4af37', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              📞 International Call: {PHONE_DISPLAY}
            </a>
          </div>
        </section>"""

en_content = en_content.replace(sec_old_en, sec_new_en)

# Fixed bottom bar
bar_old_en = """      {/* Fixed Bottom Bar for Mobile/Tablet */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderTop: '1.5px solid rgba(212, 175, 55, 0.4)', padding: '10px 16px', zIndex: 50, boxShadow: '0 -6px 25px rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1.3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.35)' }}>
            WhatsApp Booking
          </a>
          <a href={LINE_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#06C755', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(6,199,85,0.35)' }}>
            LINE (abam1004)
          </a>
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 800, fontSize: '14px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', border: '1px solid #d4af37' }}>
            Call Us
          </a>
        </div>
      </div>"""

bar_new_en = """      {/* Fixed Bottom Bar for Mobile/Tablet */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderTop: '1.5px solid rgba(212, 175, 55, 0.4)', padding: '10px 16px', zIndex: 50, boxShadow: '0 -6px 25px rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.35)' }}>
            💬 WhatsApp 24/7 Booking
          </a>
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '14.5px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37' }}>
            📞 Call Now
          </a>
        </div>
      </div>"""

en_content = en_content.replace(bar_old_en, bar_new_en)

with open(en_path, 'w', encoding='utf-8') as f:
    f.write(en_content)

print("Updated en/page.tsx successfully!")
