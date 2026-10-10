const fs = require('fs');
const file = 'src/app/layout.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/export const viewport: Viewport = \{[\s\S]*?\};/, `export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0c0d11',
};`);
fs.writeFileSync(file, content, 'utf8');
console.log('Updated layout.tsx viewport successfully!');
