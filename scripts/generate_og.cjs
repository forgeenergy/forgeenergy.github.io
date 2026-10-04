const fs = require('fs');
const path = require('path');
const sharp = require(path.join(__dirname, '../node_modules/sharp'));

async function run() {
  const width = 1200;
  const height = 630;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0E0F0D" />
        <stop offset="50%" stop-color="#161813" />
        <stop offset="100%" stop-color="#10110E" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    <rect x="50" y="40" width="1100" height="550" rx="28" fill="#181A15" stroke="#2C3026" stroke-width="2" />
    <rect x="90" y="80" width="460" height="38" rx="19" fill="#20241C" stroke="#3D452E" stroke-width="1.5" />
    <text x="115" y="104" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#A5BD84" letter-spacing="1.5">
      100% CLIENT-SIDE • ZERO-SERVER • PRIVACY VAULT
    </text>
    <rect x="90" y="140" width="70" height="70" rx="20" fill="#8B9A6E" />
    <path d="M125 155 C127 162, 135 168, 135 178 C135 189, 127 197, 125 200 C123 197, 115 189, 115 178 C115 168, 123 162, 125 155 Z" fill="#F7F2EB" />
    <text x="180" y="180" font-family="system-ui, sans-serif" font-size="42" font-weight="900" fill="#EFECE6">
      ForgeEnergy
    </text>
    <text x="180" y="205" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#8B9A6E" letter-spacing="2">
      ENERGY TRANSMUTATION &amp; DEEP WORK VAULT
    </text>
    <text x="90" y="290" font-family="system-ui, sans-serif" font-size="36" font-weight="800" fill="#FFFFFF">
      Alchemize Compulsive Urges into
    </text>
    <text x="90" y="335" font-family="system-ui, sans-serif" font-size="36" font-weight="800" fill="#8B9A6E">
      Unstoppable Creative &amp; Intellectual Output
    </text>
    <g transform="translate(90, 385)">
      <rect x="0" y="0" width="310" height="80" rx="16" fill="#131410" stroke="#252820" stroke-width="1.5" />
      <text x="20" y="33" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#EFECE6">
        2-Min Box Breathing
      </text>
      <text x="20" y="58" font-family="system-ui, sans-serif" font-size="12" fill="#8D9683">
        Tactical autonomic impulse intercept
      </text>
      <rect x="330" y="0" width="310" height="80" rx="16" fill="#131410" stroke="#252820" stroke-width="1.5" />
      <text x="350" y="33" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#EFECE6">
        Converted Ledger
      </text>
      <text x="350" y="58" font-family="system-ui, sans-serif" font-size="12" fill="#8D9683">
        Track code, reading &amp; physical PRs
      </text>
      <rect x="660" y="0" width="350" height="80" rx="16" fill="#131410" stroke="#252820" stroke-width="1.5" />
      <text x="680" y="33" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#EFECE6">
        Stealth Mode &amp; AES-GCM
      </text>
      <text x="680" y="58" font-family="system-ui, sans-serif" font-size="12" fill="#8D9683">
        Instant [Esc] panic pad &amp; encrypted backup
      </text>
    </g>
    <text x="1080" y="520" font-family="monospace" font-size="14" font-weight="700" fill="#8B9A6E" text-anchor="end">
      https://forgeenergy.github.io
    </text>
  </svg>
  `;

  const outputPath = path.join(__dirname, '../public/og-image.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log('Successfully written:', outputPath);
}

run().catch(console.error);
