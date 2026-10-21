/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT_DIR = path.join(__dirname, '../public/flyers');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Convert an image file to a base64 data URI
function toDataUri(filePath, mime = 'image/png') {
  const bitmap = fs.readFileSync(filePath);
  return `data:${mime};base64,${bitmap.toString('base64')}`;
}

const logoDataUri = toDataUri(path.join(__dirname, '../img/LogoFloreria.jpeg'), 'image/jpeg');
const buchRosUri = toDataUri(path.join(__dirname, '../img/Ramo-RosasAzul-removebg-preview.png'), 'image/png');
const girasolesUri = toDataUri(path.join(__dirname, '../img/Girasoles1.png'), 'image/png');
const girasolRosasUri = toDataUri(path.join(__dirname, '../img/ArregloRyG.png'), 'image/png');

// ─────────────────────────────────────────────────────────────────────────────
// ALTERNATIVA 1 — PREMIUM (Minimalista, Lujo Atemporal, Espacio Negativo)
// ─────────────────────────────────────────────────────────────────────────────
function getAlt1_4x5() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <defs>
    <linearGradient id="bgAlt1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBF9F5"/>
      <stop offset="50%" stop-color="#F4EFEA"/>
      <stop offset="100%" stop-color="#EBE5DC"/>
    </linearGradient>
    <radialGradient id="glowAlt1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#F4EFEA" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadowAlt1" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#1F2A22" flood-opacity="0.22"/>
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#141D17" flood-opacity="0.15"/>
    </filter>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#2D3B31" flood-opacity="0.14"/>
    </filter>
    <clipPath id="logoClipAlt1">
      <circle cx="540" cy="140" r="54"/>
    </clipPath>
  </defs>

  <!-- Background Base -->
  <rect width="1080" height="1350" fill="url(#bgAlt1)"/>
  
  <!-- Subtle Architectural Border Frame -->
  <rect x="36" y="36" width="1008" height="1278" fill="none" stroke="#C5BAA8" stroke-width="1.2" opacity="0.6"/>
  <rect x="44" y="44" width="992" height="1262" fill="none" stroke="#C5BAA8" stroke-width="0.6" opacity="0.4"/>

  <!-- Radial Soft Glow Behind Products -->
  <circle cx="540" cy="670" r="480" fill="url(#glowAlt1)"/>

  <!-- Official Logo at Top -->
  <g filter="url(#cardShadow)">
    <circle cx="540" cy="140" r="56" fill="#FAF8F5" stroke="#CBBFA8" stroke-width="1.5"/>
    <image href="${logoDataUri}" x="486" y="86" width="108" height="108" clip-path="url(#logoClipAlt1)" preserveAspectRatio="xMidYMid slice"/>
  </g>

  <!-- Brand Typography Top -->
  <text x="540" y="240" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', 'Georgia', serif" font-size="28" font-weight="700" letter-spacing="8" fill="#1C2E24">FLORERÍA LEO</text>
  <text x="540" y="268" text-anchor="middle" font-family="'Cinzel', 'Montserrat', sans-serif" font-size="12" font-weight="600" letter-spacing="5" fill="#8C7A62">ALTA FLORISTERÍA ARTESANAL</text>

  <!-- Hero Phrase (Single Phrase Constraint) -->
  <text x="540" y="360" text-anchor="middle" font-family="'Playfair Display', 'Georgia', serif" font-style="italic" font-size="44" font-weight="600" fill="#24362B" letter-spacing="1">“Flores que hablan por ti.”</text>
  
  <line x1="480" y1="390" x2="600" y2="390" stroke="#C0AC8F" stroke-width="1.5"/>

  <!-- HERO PRODUCT 1: Ramo Buchón de Rosas Rojas y Azules -->
  <g filter="url(#shadowAlt1)">
    <image href="${buchRosUri}" x="120" y="440" width="520" height="520" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- HERO PRODUCT 2: Girasoles Radiantes con Rosa -->
  <g filter="url(#shadowAlt1)">
    <image href="${girasolesUri}" x="490" y="470" width="470" height="550" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- Product Labels Subtle -->
  <g opacity="0.85">
    <text x="240" y="990" font-family="'Cinzel', 'Montserrat', sans-serif" font-size="12" font-weight="600" letter-spacing="3" fill="#6E6252">RAMO BUCHÓN EXCLUSIVO</text>
    <text x="240" y="1008" font-family="'Montserrat', sans-serif" font-size="11" font-weight="400" fill="#8F8272">Rosas Rojas &amp; Azules Místicas</text>

    <text x="840" y="990" text-anchor="end" font-family="'Cinzel', 'Montserrat', sans-serif" font-size="12" font-weight="600" letter-spacing="3" fill="#6E6252">DESTELLO FLORAL</text>
    <text x="840" y="1008" text-anchor="end" font-family="'Montserrat', sans-serif" font-size="11" font-weight="400" fill="#8F8272">Girasoles Frescos &amp; Rosas</text>
  </g>

  <!-- Bottom CTA & Contact -->
  <g transform="translate(0, 1070)">
    <!-- Pill CTA Button -->
    <rect x="360" y="20" width="360" height="64" rx="32" fill="#1C3829" filter="url(#cardShadow)"/>
    <text x="540" y="60" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700" letter-spacing="3" fill="#FFFFFF">COTIZA TU ARREGLO</text>

    <!-- WhatsApp & Social details -->
    <text x="540" y="125" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="600" letter-spacing="2" fill="#24362B">WhatsApp: +52 56 1916 7705</text>
    <text x="540" y="152" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#7C6E5A">Instagram: @leo_floreria  •  TikTok: @leosg_10</text>
  </g>
</svg>`;
}

function getAlt1_9x16() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <linearGradient id="bgAlt1Story" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDFBF7"/>
      <stop offset="45%" stop-color="#F5EFE8"/>
      <stop offset="100%" stop-color="#E9E2D7"/>
    </linearGradient>
    <radialGradient id="glowAlt1Story" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#F5EFE8" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadowAlt1Story" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="28" stdDeviation="32" flood-color="#18241C" flood-opacity="0.24"/>
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#121B15" flood-opacity="0.16"/>
    </filter>
    <filter id="cardShadowStory" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#2D3B31" flood-opacity="0.15"/>
    </filter>
    <clipPath id="logoClipAlt1Story">
      <circle cx="540" cy="220" r="70"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1920" fill="url(#bgAlt1Story)"/>

  <!-- Elegant Luxury Frame -->
  <rect x="40" y="40" width="1000" height="1840" fill="none" stroke="#C9BEAC" stroke-width="1.2" opacity="0.6"/>
  <rect x="52" y="52" width="976" height="1816" fill="none" stroke="#C9BEAC" stroke-width="0.6" opacity="0.4"/>

  <!-- Ambient Glow -->
  <circle cx="540" cy="980" r="540" fill="url(#glowAlt1Story)"/>

  <!-- Official Logo -->
  <g filter="url(#cardShadowStory)">
    <circle cx="540" cy="220" r="72" fill="#FAF8F5" stroke="#CBBFA8" stroke-width="1.5"/>
    <image href="${logoDataUri}" x="470" y="150" width="140" height="140" clip-path="url(#logoClipAlt1Story)" preserveAspectRatio="xMidYMid slice"/>
  </g>

  <!-- Brand Typography -->
  <text x="540" y="340" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', 'Georgia', serif" font-size="34" font-weight="700" letter-spacing="10" fill="#1C2E24">FLORERÍA LEO</text>
  <text x="540" y="375" text-anchor="middle" font-family="'Cinzel', 'Montserrat', sans-serif" font-size="14" font-weight="600" letter-spacing="6" fill="#8C7A62">ALTA FLORISTERÍA ARTESANAL</text>

  <!-- Hero Phrase -->
  <text x="540" y="490" text-anchor="middle" font-family="'Playfair Display', 'Georgia', serif" font-style="italic" font-size="52" font-weight="600" fill="#24362B" letter-spacing="1">“Flores que hablan por ti.”</text>
  <line x1="460" y1="530" x2="620" y2="530" stroke="#C0AC8F" stroke-width="1.5"/>

  <!-- HERO PRODUCT 1: Ramo Buchón de Rosas Rojas y Azules -->
  <g filter="url(#shadowAlt1Story)">
    <image href="${buchRosUri}" x="100" y="600" width="580" height="580" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- HERO PRODUCT 2: Girasoles Radiantes -->
  <g filter="url(#shadowAlt1Story)">
    <image href="${girasolesUri}" x="460" y="850" width="560" height="660" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- Labels -->
  <g opacity="0.9">
    <rect x="80" y="1190" width="300" height="54" rx="10" fill="#FAF8F5" opacity="0.9" filter="url(#cardShadowStory)"/>
    <text x="230" y="1214" text-anchor="middle" font-family="'Cinzel', 'Montserrat', sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="#1C3829">RAMO BUCHÓN</text>
    <text x="230" y="1232" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="11" font-weight="500" fill="#756755">Rosas Rojas &amp; Azules</text>

    <rect x="700" y="1480" width="300" height="54" rx="10" fill="#FAF8F5" opacity="0.9" filter="url(#cardShadowStory)"/>
    <text x="850" y="1504" text-anchor="middle" font-family="'Cinzel', 'Montserrat', sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="#1C3829">DESTELLO FLORAL</text>
    <text x="850" y="1522" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="11" font-weight="500" fill="#756755">Girasoles &amp; Rosas</text>
  </g>

  <!-- Bottom CTA Section -->
  <g transform="translate(0, 1600)">
    <rect x="320" y="30" width="440" height="74" rx="37" fill="#1C3829" filter="url(#cardShadowStory)"/>
    <text x="540" y="76" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="18" font-weight="700" letter-spacing="4" fill="#FFFFFF">COTIZA TU ARREGLO</text>

    <text x="540" y="150" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="16" font-weight="600" letter-spacing="2" fill="#1E3024">WhatsApp: +52 56 1916 7705</text>
    <text x="540" y="180" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="500" letter-spacing="2" fill="#786B58">Instagram: @leo_floreria  •  TikTok: @leosg_10</text>
  </g>
</svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// ALTERNATIVA 2 — ROMÁNTICA (Cálida, Emocional, Rosa Suave, Crema, Romance)
// ─────────────────────────────────────────────────────────────────────────────
function getAlt2_4x5() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <defs>
    <linearGradient id="bgAlt2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF8F7"/>
      <stop offset="40%" stop-color="#FCEEEF"/>
      <stop offset="80%" stop-color="#F6DFE3"/>
      <stop offset="100%" stop-color="#EED0D7"/>
    </linearGradient>
    <radialGradient id="roseGlowAlt2" cx="45%" cy="55%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#FCEEEF" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadowAlt2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="26" flood-color="#4A1825" flood-opacity="0.25"/>
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#2D0B14" flood-opacity="0.15"/>
    </filter>
    <filter id="cardShadowAlt2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#5E1D2D" flood-opacity="0.15"/>
    </filter>
    <clipPath id="logoClipAlt2">
      <circle cx="540" cy="135" r="52"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1350" fill="url(#bgAlt2)"/>

  <!-- Soft Romantic Frame -->
  <rect x="36" y="36" width="1008" height="1278" rx="20" fill="none" stroke="#E5BAC4" stroke-width="1.5" opacity="0.6"/>

  <!-- Soft Ambient Glow -->
  <circle cx="500" cy="680" r="480" fill="url(#roseGlowAlt2)"/>

  <!-- Logo Top -->
  <g filter="url(#cardShadowAlt2)">
    <circle cx="540" cy="135" r="54" fill="#FFFBFB" stroke="#E3B3BE" stroke-width="1.5"/>
    <image href="${logoDataUri}" x="488" y="83" width="104" height="104" clip-path="url(#logoClipAlt2)" preserveAspectRatio="xMidYMid slice"/>
  </g>

  <!-- Header -->
  <text x="540" y="235" text-anchor="middle" font-family="'Playfair Display', 'Cinzel', serif" font-size="28" font-weight="700" letter-spacing="7" fill="#571728">FLORERÍA LEO</text>
  <text x="540" y="262" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600" letter-spacing="4" fill="#9C4459">DETALLES QUE ENAMORAN</text>

  <!-- Main Romantic Phrase (Single Phrase) -->
  <text x="540" y="350" text-anchor="middle" font-family="'Playfair Display', 'Georgia', serif" font-style="italic" font-size="44" font-weight="600" fill="#420F1D" letter-spacing="1">“Cada flor, una historia de amor.”</text>
  
  <line x1="460" y1="380" x2="620" y2="380" stroke="#D18797" stroke-width="1.5"/>

  <!-- HERO PRODUCT 1: Ramo Buchón de Rosas Rojas y Azules -->
  <g filter="url(#shadowAlt2)">
    <image href="${buchRosUri}" x="110" y="430" width="530" height="530" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- HERO PRODUCT 2: Arreglo Girasoles y Rosas -->
  <g filter="url(#shadowAlt2)">
    <image href="${girasolRosasUri}" x="490" y="470" width="480" height="560" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- Elegant Product Tags -->
  <g>
    <rect x="150" y="970" width="260" height="46" rx="23" fill="#FFF0F2" stroke="#E3B3BE" stroke-width="1" opacity="0.95" filter="url(#cardShadowAlt2)"/>
    <text x="280" y="998" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="#751A31">ROSAS DE PASIÓN</text>

    <rect x="670" y="970" width="260" height="46" rx="23" fill="#FFF0F2" stroke="#E3B3BE" stroke-width="1" opacity="0.95" filter="url(#cardShadowAlt2)"/>
    <text x="800" y="998" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="#751A31">LUZ &amp; GIRASOLES</text>
  </g>

  <!-- Bottom CTA Section -->
  <g transform="translate(0, 1070)">
    <rect x="340" y="20" width="400" height="64" rx="32" fill="#7D1E35" filter="url(#cardShadowAlt2)"/>
    <text x="540" y="59" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700" letter-spacing="3" fill="#FFFFFF">COTIZA TU ARREGLO</text>

    <text x="540" y="125" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="15" font-weight="600" letter-spacing="2" fill="#521323">WhatsApp: +52 56 1916 7705</text>
    <text x="540" y="152" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#8C3A4F">Instagram: @leo_floreria  •  TikTok: @leosg_10</text>
  </g>
</svg>`;
}

function getAlt2_9x16() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <linearGradient id="bgAlt2Story" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9F8"/>
      <stop offset="40%" stop-color="#FBEEF0"/>
      <stop offset="80%" stop-color="#F5DBE0"/>
      <stop offset="100%" stop-color="#ECC6CF"/>
    </linearGradient>
    <radialGradient id="roseGlowAlt2Story" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#FBEEF0" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadowAlt2Story" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="26" stdDeviation="30" flood-color="#4A1825" flood-opacity="0.26"/>
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#2D0B14" flood-opacity="0.16"/>
    </filter>
    <filter id="cardShadowAlt2Story" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#5E1D2D" flood-opacity="0.16"/>
    </filter>
    <clipPath id="logoClipAlt2Story">
      <circle cx="540" cy="210" r="68"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1920" fill="url(#bgAlt2Story)"/>

  <!-- Border Frame -->
  <rect x="40" y="40" width="1000" height="1840" rx="24" fill="none" stroke="#E3B3BD" stroke-width="1.5" opacity="0.65"/>

  <!-- Radial Glow -->
  <circle cx="540" cy="980" r="520" fill="url(#roseGlowAlt2Story)"/>

  <!-- Official Logo -->
  <g filter="url(#cardShadowAlt2Story)">
    <circle cx="540" cy="210" r="70" fill="#FFFBFB" stroke="#E3B3BE" stroke-width="1.5"/>
    <image href="${logoDataUri}" x="472" y="142" width="136" height="136" clip-path="url(#logoClipAlt2Story)" preserveAspectRatio="xMidYMid slice"/>
  </g>

  <!-- Typography Header -->
  <text x="540" y="330" text-anchor="middle" font-family="'Playfair Display', 'Cinzel', serif" font-size="34" font-weight="700" letter-spacing="9" fill="#571728">FLORERÍA LEO</text>
  <text x="540" y="365" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="600" letter-spacing="5" fill="#9C4459">DETALLES QUE ENAMORAN</text>

  <!-- Main Phrase -->
  <text x="540" y="480" text-anchor="middle" font-family="'Playfair Display', 'Georgia', serif" font-style="italic" font-size="50" font-weight="600" fill="#420F1D" letter-spacing="1">“Cada flor, una historia de amor.”</text>
  <line x1="450" y1="520" x2="630" y2="520" stroke="#D18797" stroke-width="1.5"/>

  <!-- HERO PRODUCT 1: Ramo Buchón de Rosas Rojas y Azules -->
  <g filter="url(#shadowAlt2Story)">
    <image href="${buchRosUri}" x="110" y="590" width="570" height="570" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- HERO PRODUCT 2: Girasoles y Rosas -->
  <g filter="url(#shadowAlt2Story)">
    <image href="${girasolRosasUri}" x="440" y="850" width="550" height="650" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- Product Labels -->
  <g>
    <rect x="80" y="1180" width="300" height="54" rx="27" fill="#FFF0F2" stroke="#E3B3BE" stroke-width="1" opacity="0.95" filter="url(#cardShadowAlt2Story)"/>
    <text x="230" y="1213" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" letter-spacing="2" fill="#751A31">ROSAS DE PASIÓN</text>

    <rect x="700" y="1480" width="300" height="54" rx="27" fill="#FFF0F2" stroke="#E3B3BE" stroke-width="1" opacity="0.95" filter="url(#cardShadowAlt2Story)"/>
    <text x="850" y="1513" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" letter-spacing="2" fill="#751A31">LUZ &amp; GIRASOLES</text>
  </g>

  <!-- CTA Bottom -->
  <g transform="translate(0, 1600)">
    <rect x="300" y="30" width="480" height="74" rx="37" fill="#7D1E35" filter="url(#cardShadowAlt2Story)"/>
    <text x="540" y="76" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="18" font-weight="700" letter-spacing="4" fill="#FFFFFF">COTIZA TU ARREGLO</text>

    <text x="540" y="150" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="16" font-weight="600" letter-spacing="2" fill="#521323">WhatsApp: +52 56 1916 7705</text>
    <text x="540" y="180" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="500" letter-spacing="2" fill="#8C3A4F">Instagram: @leo_floreria  •  TikTok: @leosg_10</text>
  </g>
</svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// ALTERNATIVA 3 — MODERNA (Contemporánea, Alto Impacto Redes Sociales, Esmeralda & Oro)
// ─────────────────────────────────────────────────────────────────────────────
function getAlt3_4x5() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <defs>
    <linearGradient id="bgAlt3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F2119"/>
      <stop offset="50%" stop-color="#142B20"/>
      <stop offset="100%" stop-color="#09140F"/>
    </linearGradient>
    <radialGradient id="goldGlowAlt3" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#0F2119" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadowAlt3" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000000" flood-opacity="0.6"/>
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
    <filter id="cardShadowAlt3" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
    <clipPath id="logoClipAlt3">
      <circle cx="540" cy="135" r="52"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1350" fill="url(#bgAlt3)"/>

  <!-- Subtle Modern Grid Lines -->
  <line x1="80" y1="0" x2="80" y2="1350" stroke="#254234" stroke-width="0.8" opacity="0.4"/>
  <line x1="1000" y1="0" x2="1000" y2="1350" stroke="#254234" stroke-width="0.8" opacity="0.4"/>
  <line x1="0" y1="300" x2="1080" y2="300" stroke="#254234" stroke-width="0.8" opacity="0.4"/>
  <line x1="0" y1="1050" x2="1080" y2="1050" stroke="#254234" stroke-width="0.8" opacity="0.4"/>

  <!-- Golden Radial Glow -->
  <circle cx="540" cy="670" r="480" fill="url(#goldGlowAlt3)"/>

  <!-- Logo Top -->
  <g filter="url(#cardShadowAlt3)">
    <circle cx="540" cy="135" r="54" fill="#1C3829" stroke="#E6C875" stroke-width="1.5"/>
    <image href="${logoDataUri}" x="488" y="83" width="104" height="104" clip-path="url(#logoClipAlt3)" preserveAspectRatio="xMidYMid slice"/>
  </g>

  <!-- Brand Typography -->
  <text x="540" y="235" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', serif" font-size="28" font-weight="700" letter-spacing="8" fill="#F4EFE6">FLORERÍA LEO</text>
  <text x="540" y="262" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700" letter-spacing="5" fill="#D4AF37">MODERN BOTANICAL STUDIO</text>

  <!-- Phrase (Single Phrase) -->
  <text x="540" y="355" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-size="44" font-weight="600" fill="#FFFFFF" letter-spacing="1">“Regala algo que permanezca.”</text>
  <line x1="470" y1="385" x2="610" y2="385" stroke="#D4AF37" stroke-width="1.5"/>

  <!-- HERO PRODUCT 1: Ramo Buchón de Rosas Rojas y Azules -->
  <g filter="url(#shadowAlt3)">
    <image href="${buchRosUri}" x="110" y="430" width="530" height="530" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- HERO PRODUCT 2: Girasoles Radiantes con Rosa -->
  <g filter="url(#shadowAlt3)">
    <image href="${girasolesUri}" x="490" y="470" width="470" height="550" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- Modern Contrast Badges -->
  <g>
    <rect x="130" y="970" width="280" height="44" rx="8" fill="#183626" stroke="#2B543E" stroke-width="1" filter="url(#cardShadowAlt3)"/>
    <text x="270" y="997" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="#E2F0D9">ROSAS ROJAS &amp; AZULES</text>

    <rect x="670" y="970" width="280" height="44" rx="8" fill="#183626" stroke="#2B543E" stroke-width="1" filter="url(#cardShadowAlt3)"/>
    <text x="810" y="997" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="#FFE58F">GIRASOLES &amp; ROSAS</text>
  </g>

  <!-- Bottom CTA -->
  <g transform="translate(0, 1070)">
    <rect x="340" y="20" width="400" height="64" rx="32" fill="#D4AF37" filter="url(#cardShadowAlt3)"/>
    <text x="540" y="59" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="16" font-weight="800" letter-spacing="3" fill="#112217">COTIZA TU ARREGLO</text>

    <text x="540" y="125" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="15" font-weight="600" letter-spacing="2" fill="#FFFFFF">WhatsApp: +52 56 1916 7705</text>
    <text x="540" y="152" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#A2BDAE">Instagram: @leo_floreria  •  TikTok: @leosg_10</text>
  </g>
</svg>`;
}

function getAlt3_9x16() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <linearGradient id="bgAlt3Story" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E1F17"/>
      <stop offset="50%" stop-color="#142B20"/>
      <stop offset="100%" stop-color="#08140E"/>
    </linearGradient>
    <radialGradient id="goldGlowAlt3Story" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#0E1F17" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadowAlt3Story" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="28" stdDeviation="32" flood-color="#000000" flood-opacity="0.65"/>
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
    <filter id="cardShadowAlt3Story" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
    <clipPath id="logoClipAlt3Story">
      <circle cx="540" cy="210" r="68"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1920" fill="url(#bgAlt3Story)"/>

  <!-- Lines -->
  <line x1="80" y1="0" x2="80" y2="1920" stroke="#254234" stroke-width="0.8" opacity="0.4"/>
  <line x1="1000" y1="0" x2="1000" y2="1920" stroke="#254234" stroke-width="0.8" opacity="0.4"/>

  <!-- Glow -->
  <circle cx="540" cy="980" r="540" fill="url(#goldGlowAlt3Story)"/>

  <!-- Official Logo -->
  <g filter="url(#cardShadowAlt3Story)">
    <circle cx="540" cy="210" r="70" fill="#1C3829" stroke="#E6C875" stroke-width="1.5"/>
    <image href="${logoDataUri}" x="472" y="142" width="136" height="136" clip-path="url(#logoClipAlt3Story)" preserveAspectRatio="xMidYMid slice"/>
  </g>

  <!-- Brand Typography -->
  <text x="540" y="330" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', serif" font-size="34" font-weight="700" letter-spacing="10" fill="#F4EFE6">FLORERÍA LEO</text>
  <text x="540" y="365" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700" letter-spacing="6" fill="#D4AF37">MODERN BOTANICAL STUDIO</text>

  <!-- Phrase -->
  <text x="540" y="480" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-size="52" font-weight="600" fill="#FFFFFF" letter-spacing="1">“Regala algo que permanezca.”</text>
  <line x1="460" y1="520" x2="620" y2="520" stroke="#D4AF37" stroke-width="1.5"/>

  <!-- HERO PRODUCT 1: Ramo Buchón de Rosas Rojas y Azules -->
  <g filter="url(#shadowAlt3Story)">
    <image href="${buchRosUri}" x="100" y="600" width="580" height="580" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- HERO PRODUCT 2: Girasoles Radiantes -->
  <g filter="url(#shadowAlt3Story)">
    <image href="${girasolesUri}" x="460" y="850" width="560" height="660" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- Product Labels -->
  <g>
    <rect x="80" y="1180" width="320" height="52" rx="8" fill="#183626" stroke="#2B543E" stroke-width="1" filter="url(#cardShadowAlt3Story)"/>
    <text x="240" y="1212" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" letter-spacing="2" fill="#E2F0D9">ROSAS ROJAS &amp; AZULES</text>

    <rect x="680" y="1480" width="320" height="52" rx="8" fill="#183626" stroke="#2B543E" stroke-width="1" filter="url(#cardShadowAlt3Story)"/>
    <text x="840" y="1512" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" letter-spacing="2" fill="#FFE58F">GIRASOLES &amp; ROSAS</text>
  </g>

  <!-- CTA Bottom -->
  <g transform="translate(0, 1600)">
    <rect x="300" y="30" width="480" height="74" rx="37" fill="#D4AF37" filter="url(#cardShadowAlt3Story)"/>
    <text x="540" y="76" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="18" font-weight="800" letter-spacing="4" fill="#112217">COTIZA TU ARREGLO</text>

    <text x="540" y="150" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="16" font-weight="600" letter-spacing="2" fill="#FFFFFF">WhatsApp: +52 56 1916 7705</text>
    <text x="540" y="180" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="500" letter-spacing="2" fill="#A2BDAE">Instagram: @leo_floreria  •  TikTok: @leosg_10</text>
  </g>
</svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// ALTERNATIVA 4 — FLORERÍA EDITORIAL (Lookbook de Alta Gama, Fotografía de Lujo)
// ─────────────────────────────────────────────────────────────────────────────
function getAlt4_4x5() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <defs>
    <linearGradient id="bgAlt4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2EEE9"/>
      <stop offset="50%" stop-color="#E8E2D9"/>
      <stop offset="100%" stop-color="#DCD4C7"/>
    </linearGradient>
    <filter id="shadowAlt4" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#24211D" flood-opacity="0.22"/>
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#141311" flood-opacity="0.15"/>
    </filter>
    <filter id="cardShadowAlt4" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#36312B" flood-opacity="0.12"/>
    </filter>
    <clipPath id="logoClipAlt4">
      <circle cx="540" cy="135" r="50"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1350" fill="url(#bgAlt4)"/>

  <!-- High-End Editorial Folio Layout -->
  <text x="60" y="80" font-family="'Cinzel', 'Montserrat', sans-serif" font-size="12" font-weight="700" letter-spacing="4" fill="#7C7367">EDICIÓN EXCLUSIVA</text>
  <text x="1020" y="80" text-anchor="end" font-family="'Cinzel', 'Montserrat', sans-serif" font-size="12" font-weight="700" letter-spacing="4" fill="#7C7367">MOMENTOS INOLVIDABLES</text>
  
  <line x1="60" y1="95" x2="1020" y2="95" stroke="#B8AEA0" stroke-width="1"/>

  <!-- Official Logo -->
  <g filter="url(#cardShadowAlt4)">
    <circle cx="540" cy="170" r="52" fill="#FAF7F2" stroke="#BFB5A5" stroke-width="1.5"/>
    <image href="${logoDataUri}" x="490" y="120" width="100" height="100" clip-path="url(#logoClipAlt4)" preserveAspectRatio="xMidYMid slice"/>
  </g>

  <!-- Brand Typography -->
  <text x="540" y="270" text-anchor="middle" font-family="'Playfair Display', 'Cinzel', serif" font-size="32" font-weight="700" letter-spacing="8" fill="#1C1815">FLORERÍA LEO</text>
  <text x="540" y="298" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600" letter-spacing="5" fill="#6B6256">COLECCIÓN FLORAL DE AUTOR</text>

  <!-- Phrase (Single Phrase) -->
  <text x="540" y="375" text-anchor="middle" font-family="'Playfair Display', 'Georgia', serif" font-style="italic" font-size="44" font-weight="600" fill="#2E2822" letter-spacing="1">“Diseños para momentos inolvidables.”</text>
  <line x1="470" y1="405" x2="610" y2="405" stroke="#9C8F7E" stroke-width="1.5"/>

  <!-- Gallery Frame for Products -->
  <rect x="80" y="440" width="920" height="570" fill="#FAF7F2" rx="4" stroke="#D3C9BA" stroke-width="1" filter="url(#cardShadowAlt4)"/>

  <!-- HERO PRODUCT 1: Ramo Buchón de Rosas Rojas y Azules -->
  <g filter="url(#shadowAlt4)">
    <image href="${buchRosUri}" x="120" y="460" width="490" height="490" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- HERO PRODUCT 2: Destello Floral Girasoles -->
  <g filter="url(#shadowAlt4)">
    <image href="${girasolesUri}" x="510" y="460" width="460" height="520" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- Editorial Subtitles -->
  <text x="365" y="980" text-anchor="middle" font-family="'Cinzel', serif" font-size="13" font-weight="700" letter-spacing="2" fill="#3D362E">RAMO BUCHÓN</text>
  <text x="740" y="980" text-anchor="middle" font-family="'Cinzel', serif" font-size="13" font-weight="700" letter-spacing="2" fill="#3D362E">DESTELLO FLORAL</text>

  <!-- Bottom CTA -->
  <g transform="translate(0, 1060)">
    <line x1="60" y1="10" x2="1020" y2="10" stroke="#B8AEA0" stroke-width="1"/>

    <rect x="360" y="35" width="360" height="60" rx="4" fill="#241E19" filter="url(#cardShadowAlt4)"/>
    <text x="540" y="72" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700" letter-spacing="3" fill="#FFFFFF">COTIZA TU ARREGLO</text>

    <text x="540" y="135" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="600" letter-spacing="2" fill="#2E2822">WhatsApp: +52 56 1916 7705</text>
    <text x="540" y="160" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#756A5C">Instagram: @leo_floreria  •  TikTok: @leosg_10</text>
  </g>
</svg>`;
}

function getAlt4_9x16() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <linearGradient id="bgAlt4Story" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F4F0EC"/>
      <stop offset="50%" stop-color="#EAE3D9"/>
      <stop offset="100%" stop-color="#DDD3C5"/>
    </linearGradient>
    <filter id="shadowAlt4Story" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="28" stdDeviation="32" flood-color="#24211D" flood-opacity="0.25"/>
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#141311" flood-opacity="0.16"/>
    </filter>
    <filter id="cardShadowAlt4Story" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#36312B" flood-opacity="0.14"/>
    </filter>
    <clipPath id="logoClipAlt4Story">
      <circle cx="540" cy="220" r="68"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1920" fill="url(#bgAlt4Story)"/>

  <!-- Editorial Top Header -->
  <text x="60" y="90" font-family="'Cinzel', 'Montserrat', sans-serif" font-size="13" font-weight="700" letter-spacing="4" fill="#7C7367">EDICIÓN EXCLUSIVA</text>
  <text x="1020" y="90" text-anchor="end" font-family="'Cinzel', 'Montserrat', sans-serif" font-size="13" font-weight="700" letter-spacing="4" fill="#7C7367">MOMENTOS INOLVIDABLES</text>
  
  <line x1="60" y1="110" x2="1020" y2="110" stroke="#B8AEA0" stroke-width="1"/>

  <!-- Official Logo -->
  <g filter="url(#cardShadowAlt4Story)">
    <circle cx="540" cy="220" r="70" fill="#FAF7F2" stroke="#BFB5A5" stroke-width="1.5"/>
    <image href="${logoDataUri}" x="472" y="152" width="136" height="136" clip-path="url(#logoClipAlt4Story)" preserveAspectRatio="xMidYMid slice"/>
  </g>

  <!-- Typography -->
  <text x="540" y="340" text-anchor="middle" font-family="'Playfair Display', 'Cinzel', serif" font-size="36" font-weight="700" letter-spacing="9" fill="#1C1815">FLORERÍA LEO</text>
  <text x="540" y="375" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="600" letter-spacing="6" fill="#6B6256">COLECCIÓN FLORAL DE AUTOR</text>

  <!-- Phrase -->
  <text x="540" y="480" text-anchor="middle" font-family="'Playfair Display', 'Georgia', serif" font-style="italic" font-size="50" font-weight="600" fill="#2E2822" letter-spacing="1">“Diseños para momentos inolvidables.”</text>
  <line x1="450" y1="520" x2="630" y2="520" stroke="#9C8F7E" stroke-width="1.5"/>

  <!-- Gallery Frame for Products -->
  <rect x="70" y="580" width="940" height="970" fill="#FAF7F2" rx="6" stroke="#D3C9BA" stroke-width="1" filter="url(#cardShadowAlt4Story)"/>

  <!-- HERO PRODUCT 1: Ramo Buchón de Rosas Rojas y Azules -->
  <g filter="url(#shadowAlt4Story)">
    <image href="${buchRosUri}" x="100" y="610" width="550" height="550" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- HERO PRODUCT 2: Girasoles Radiantes -->
  <g filter="url(#shadowAlt4Story)">
    <image href="${girasolesUri}" x="460" y="850" width="530" height="630" preserveAspectRatio="xMidYMid contain"/>
  </g>

  <!-- Labels -->
  <text x="360" y="1180" text-anchor="middle" font-family="'Cinzel', serif" font-size="14" font-weight="700" letter-spacing="2" fill="#3D362E">RAMO BUCHÓN</text>
  <text x="740" y="1500" text-anchor="middle" font-family="'Cinzel', serif" font-size="14" font-weight="700" letter-spacing="2" fill="#3D362E">DESTELLO FLORAL</text>

  <!-- Bottom CTA -->
  <g transform="translate(0, 1600)">
    <line x1="60" y1="10" x2="1020" y2="10" stroke="#B8AEA0" stroke-width="1"/>

    <rect x="320" y="35" width="440" height="74" rx="6" fill="#241E19" filter="url(#cardShadowAlt4Story)"/>
    <text x="540" y="80" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="17" font-weight="700" letter-spacing="4" fill="#FFFFFF">COTIZA TU ARREGLO</text>

    <text x="540" y="150" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="16" font-weight="600" letter-spacing="2" fill="#2E2822">WhatsApp: +52 56 1916 7705</text>
    <text x="540" y="180" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="500" letter-spacing="2" fill="#756A5C">Instagram: @leo_floreria  •  TikTok: @leosg_10</text>
  </g>
</svg>`;
}

async function renderAll() {
  const configs = [
    { name: 'flyer-1-premium-4x5.png', svg: getAlt1_4x5(), w: 1080, h: 1350 },
    { name: 'flyer-1-premium-9x16.png', svg: getAlt1_9x16(), w: 1080, h: 1920 },
    { name: 'flyer-2-romantica-4x5.png', svg: getAlt2_4x5(), w: 1080, h: 1350 },
    { name: 'flyer-2-romantica-9x16.png', svg: getAlt2_9x16(), w: 1080, h: 1920 },
    { name: 'flyer-3-moderna-4x5.png', svg: getAlt3_4x5(), w: 1080, h: 1350 },
    { name: 'flyer-3-moderna-9x16.png', svg: getAlt3_9x16(), w: 1080, h: 1920 },
    { name: 'flyer-4-editorial-4x5.png', svg: getAlt4_4x5(), w: 1080, h: 1350 },
    { name: 'flyer-4-editorial-9x16.png', svg: getAlt4_9x16(), w: 1080, h: 1920 },
  ];

  console.log('Rendering 8 high-resolution master flyer images...');
  for (const c of configs) {
    const dest = path.join(OUT_DIR, c.name);
    await sharp(Buffer.from(c.svg))
      .resize(c.w, c.h)
      .png({ quality: 100, compressionLevel: 8 })
      .toFile(dest);
    console.log(`Rendered: ${c.name} (${c.w}x${c.h})`);
  }
  console.log('All 8 flyers generated successfully!');
}

renderAll().catch(err => {
  console.error('Error generating flyers:', err);
  process.exit(1);
});
