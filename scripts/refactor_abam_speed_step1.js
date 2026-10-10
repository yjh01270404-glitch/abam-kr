const fs = require('fs');

const targetFile = 'src/components/AbamLanding.tsx';
let src = fs.readFileSync(targetFile, 'utf8');

// 1. state에 menuOpen 추가
src = src.replace(
  "const [status, setStatus] = useState<'open' | 'pre' | 'closed' | null>(null);",
  "const [status, setStatus] = useState<'open' | 'pre' | 'closed' | null>(null);\n  const [menuOpen, setMenuOpen] = useState(false);"
);

fs.writeFileSync(targetFile, src, 'utf8');
console.log('Added menuOpen state');
