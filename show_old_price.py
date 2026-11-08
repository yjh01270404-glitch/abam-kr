import subprocess

out = subprocess.check_output(['git', '-C', r'C:\Users\yjh01\.gemini\antigravity-ide\scratch\abam-kr', 'show', '1f8d3f5:src/components/AbamLanding.tsx'], text=True, encoding='utf-8')
idx = out.find('id="price"')
print(out[idx:idx+2500])

