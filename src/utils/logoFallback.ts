/**
 * Generates an SVG data URL academic crest / seal for a university
 * when an external logo fails to load or for offline resilience.
 */
export function generateUniversityCrestSvg(
  shortName: string,
  primaryColor = '#1e3a8a',
  accentColor = '#b45309'
): string {
  const monogram = shortName.replace(/[^A-Za-z0-9]/g, '').slice(0, 4) || 'UNIV';
  
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="crestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" />
      <stop offset="50%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="${accentColor}" />
    </linearGradient>
  </defs>

  <!-- Outer Double Circle -->
  <circle cx="100" cy="100" r="92" fill="none" stroke="url(#goldGrad)" stroke-width="3" />
  <circle cx="100" cy="100" r="86" fill="none" stroke="${primaryColor}" stroke-width="1.5" stroke-dasharray="3,2" />

  <!-- Main Shield Body -->
  <path d="M 100 28 C 142 28 165 42 165 88 C 165 142 100 172 100 172 C 100 172 35 142 35 88 C 35 42 58 28 100 28 Z"
        fill="url(#crestGrad)" stroke="url(#goldGrad)" stroke-width="3" />

  <!-- Shield Inner Border -->
  <path d="M 100 36 C 136 36 155 48 155 88 C 155 134 100 160 100 160 C 100 160 45 134 45 88 C 45 48 64 36 100 36 Z"
        fill="none" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1" />

  <!-- Academic Torch / Book Icon -->
  <g transform="translate(100, 68) scale(0.9)">
    <!-- Open Book -->
    <path d="M -26 -10 Q 0 -6 0 10 Q 0 -6 26 -10 L 26 12 Q 0 16 0 28 Q 0 16 -26 12 Z" 
          fill="#f8fafc" stroke="url(#goldGrad)" stroke-width="1.5" />
    <!-- Book Spine -->
    <line x1="0" y1="-6" x2="0" y2="28" stroke="${primaryColor}" stroke-width="1.5" />
    <!-- Small Star of Knowledge above book -->
    <path d="M 0 -22 L 2 -16 L 8 -16 L 3 -12 L 5 -6 L 0 -10 L -5 -6 L -3 -12 L -8 -16 L -2 -16 Z" 
          fill="url(#goldGrad)" />
  </g>

  <!-- Monogram / Initials -->
  <text x="100" y="132" font-family="'Times New Roman', serif" font-weight="bold" font-size="${monogram.length > 3 ? '22' : '26'}" 
        text-anchor="middle" fill="#ffffff" letter-spacing="1">
    ${monogram}
  </text>

  <!-- Sub-label -->
  <text x="100" y="148" font-family="'Arial', sans-serif" font-weight="600" font-size="8" 
        text-anchor="middle" fill="#fef08a" letter-spacing="1.5">
    ESTD. ACADEMIA
  </text>

  <!-- Outer Stars -->
  <circle cx="100" cy="18" r="2.5" fill="url(#goldGrad)" />
  <circle cx="30" cy="100" r="2.5" fill="url(#goldGrad)" />
  <circle cx="170" cy="100" r="2.5" fill="url(#goldGrad)" />
</svg>
`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
