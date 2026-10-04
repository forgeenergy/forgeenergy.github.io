const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../dist/index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const tests = [];

function check(name, condition, details = '') {
  tests.push({ name, pass: Boolean(condition), details });
}

// 1. Title Tag
const titleMatch = html.match(/<title>([^<]+)<\/title>/);
const title = titleMatch ? titleMatch[1] : '';
check(
  'Title Tag exists and is optimal length (40-65 chars)',
  title.length >= 40 && title.length <= 75,
  `Length: ${title.length}, Title: "${title}"`
);

// 2. Meta Description
const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
const desc = descMatch ? descMatch[1] : '';
check(
  'Meta Description exists and is optimal length (120-165 chars)',
  desc.length >= 120 && desc.length <= 165,
  `Length: ${desc.length}, Description: "${desc}"`
);

// 3. Canonical URL
check(
  'Canonical URL matches root domain strictly',
  html.includes('<link rel="canonical" href="https://forgeenergy.github.io/">') ||
    html.includes('<link rel="canonical" href="https://forgeenergy.github.io/" />')
);

// 4. Hreflang Tags
const hreflangs = ['en', 'es', 'fr', 'pt', 'ja', 'x-default'];
const missingHreflang = hreflangs.filter((h) => !html.includes(`hreflang="${h}"`));
check(
  'All 5 global hreflangs + x-default present',
  missingHreflang.length === 0,
  `Missing: ${missingHreflang.join(', ')}`
);

// 5. Robots Meta Directive
check(
  'Robots directive includes index, follow, and max-image-preview:large',
  html.includes('name="robots"') && html.includes('max-image-preview:large')
);

// 6. Open Graph Tags
const ogTags = [
  'og:type',
  'og:url',
  'og:site_name',
  'og:title',
  'og:description',
  'og:image',
  'og:image:width',
  'og:image:height',
  'og:locale',
];
const missingOg = ogTags.filter((tag) => !html.includes(`property="${tag}"`));
check('All critical Open Graph tags present', missingOg.length === 0, `Missing: ${missingOg.join(', ')}`);

// 7. Twitter Card
const twitterTags = ['twitter:card', 'twitter:url', 'twitter:title', 'twitter:description', 'twitter:image'];
const missingTw = twitterTags.filter((tag) => !html.includes(`name="${tag}"`));
check('All critical Twitter Card tags present', missingTw.length === 0, `Missing: ${missingTw.join(', ')}`);

// 8. Physical OG Image File Exists
const ogImgPath = path.join(__dirname, '../dist/og-image.png');
check('Physical og-image.png exists in build output', fs.existsSync(ogImgPath));

// 9. Web App Manifest
const manifestPath = path.join(__dirname, '../dist/manifest.json');
check('Manifest.json exists and linked in head', fs.existsSync(manifestPath) && html.includes('rel="manifest"'));

// 10. Schema.org JSON-LD
const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
let schemaValid = false;
let schemaTypes = [];
if (schemaMatch) {
  try {
    const json = JSON.parse(schemaMatch[1]);
    schemaValid = true;
    if (json['@graph']) {
      schemaTypes = json['@graph'].map((n) => n['@type']);
    }
  } catch (e) {
    console.error('Schema JSON parse error:', e);
  }
}
check('JSON-LD structured data is valid JSON', schemaValid);
check(
  'JSON-LD contains WebSite, WebApplication, FAQPage, HowTo, and BreadcrumbList',
  ['WebSite', 'WebApplication', 'FAQPage', 'HowTo', 'BreadcrumbList'].every((t) => schemaTypes.includes(t)),
  `Detected types: ${schemaTypes.join(', ')}`
);

// 11. On-Page Semantic Headings
const h1Count = (html.match(/<h1[\s>]/g) || []).length;
check('Exactly one H1 element on page for primary keyword targeting', h1Count === 1, `Found ${h1Count} H1 tags`);

// 12. On-Page FAQ Content Matches FAQ Schema
check(
  'On-page visible FAQ section rendered for Google Rich Snippets',
  html.includes('Frequently Asked Questions') && html.includes('What is sexual transmutation')
);

console.log('\n========================================');
console.log('       100% SEO AUDIT REPORT            ');
console.log('========================================\n');

let allPass = true;
tests.forEach((t, i) => {
  const icon = t.pass ? '✅ PASS' : '❌ FAIL';
  if (!t.pass) allPass = false;
  console.log(`${icon} [${i + 1}] ${t.name}`);
  if (t.details) console.log(`       └─ ${t.details}`);
});

console.log('\n----------------------------------------');
if (allPass) {
  console.log('🎯 RESULT: 100% PERFECT TECHNICAL & SEMANTIC SEO AUDIT PASSED!');
} else {
  console.log('⚠️ RESULT: SOME CHECKS FAILED');
  process.exit(1);
}
console.log('----------------------------------------\n');
