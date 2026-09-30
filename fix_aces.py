import re

# 1. en/page.tsx
with open('src/app/en/page.tsx', 'r', encoding='utf-8') as f:
    en = f.read()

en = re.sub(
    r'<div style=\{\{ display: \'flex\', gap: \'8px\', marginTop: \'auto\' \}\}>[\s\S]*?<\/div>\s*<\/div>\s*\)\)\}',
    '''<div style={{ marginTop: 'auto' }}>
                  <a href={`${WHATSAPP_LINK}&text=Hi,%20I%20would%20like%20to%20request%20Therapist%20${ace.name}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: '#25D366', color: '#ffffff', fontSize: '12.5px', fontWeight: 900, padding: '10px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.3)' }}>
                    💬 Request {ace.name} on WhatsApp
                  </a>
                </div>
              </div>
            ))}''',
    en
)
with open('src/app/en/page.tsx', 'w', encoding='utf-8') as f:
    f.write(en)
print('en ace fixed')

# 2. jp/page.tsx
with open('src/app/jp/page.tsx', 'r', encoding='utf-8') as f:
    jp = f.read()

jp = jp.replace("backgroundColor: '#06C755'", "backgroundColor: '#25D366'")
jp = jp.replace('LINEで{ace.name}を指名予約', '💬 WhatsAppで{ace.name}を指名予約')
with open('src/app/jp/page.tsx', 'w', encoding='utf-8') as f:
    f.write(jp)
print('jp ace fixed')

# 3. cn/page.tsx
with open('src/app/cn/page.tsx', 'r', encoding='utf-8') as f:
    cn = f.read()

cn = cn.replace("backgroundColor: '#07C160'", "backgroundColor: '#25D366'")
cn = cn.replace('微信/WhatsApp点单预约 {ace.name}', '💬 WhatsApp点单预约 {ace.name}')
with open('src/app/cn/page.tsx', 'w', encoding='utf-8') as f:
    f.write(cn)
print('cn ace fixed')
