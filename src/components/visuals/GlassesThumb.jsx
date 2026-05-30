/**
 * Miniatura vectorial de un producto óptico.
 * Renderiza unas gafas (oftálmicas o de sol) o un lente de contacto,
 * usando el color principal del producto. Sin imágenes externas.
 */
export default function GlassesThumb({ sunglasses = false, contact = false, colors = ['#5d8a18'] }) {
  const frame = colors[0] || '#5d8a18'

  if (contact) {
    return (
      <svg viewBox="0 0 200 160" className="w-3/5" fill="none">
        <defs>
          <radialGradient id={`lensc-${frame}`} cx="0.4" cy="0.35" r="0.8">
            <stop stopColor={frame} stopOpacity="0.55" />
            <stop offset="1" stopColor={frame} stopOpacity="0.08" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="80" rx="64" ry="52" fill={`url(#lensc-${frame})`} stroke={frame} strokeWidth="4" />
        <ellipse cx="100" cy="80" rx="40" ry="32" stroke={frame} strokeWidth="3" strokeOpacity="0.5" />
        <path d="M64 56 q22 -18 50 -6" stroke="#fff" strokeOpacity="0.7" strokeWidth="5" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 280 130" className="w-4/5" fill="none">
      <defs>
        <linearGradient id={`g-${frame}`} x1="0" y1="0" x2="280" y2="130" gradientUnits="userSpaceOnUse">
          <stop stopColor={frame} />
          <stop offset="1" stopColor={colors[2] || frame} />
        </linearGradient>
        <linearGradient id={`lens-${frame}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={sunglasses ? frame : '#bcd3ff'} stopOpacity={sunglasses ? '0.85' : '0.45'} />
          <stop offset="1" stopColor={sunglasses ? '#0b1120' : '#34d399'} stopOpacity={sunglasses ? '0.6' : '0.15'} />
        </linearGradient>
      </defs>

      <rect x="20" y="30" width="100" height="78" rx={sunglasses ? 24 : 34} fill={`url(#lens-${frame})`} />
      <rect x="160" y="30" width="100" height="78" rx={sunglasses ? 24 : 34} fill={`url(#lens-${frame})`} />
      <rect x="20" y="30" width="100" height="78" rx={sunglasses ? 24 : 34} stroke={`url(#g-${frame})`} strokeWidth="7" />
      <rect x="160" y="30" width="100" height="78" rx={sunglasses ? 24 : 34} stroke={`url(#g-${frame})`} strokeWidth="7" />
      <path d="M120 56 q20 -16 40 0" stroke={`url(#g-${frame})`} strokeWidth="7" strokeLinecap="round" />
      <path d="M260 58 q22 -4 20 -26" stroke={`url(#g-${frame})`} strokeWidth="7" strokeLinecap="round" />
      <path d="M20 58 q-22 -4 -20 -26" stroke={`url(#g-${frame})`} strokeWidth="7" strokeLinecap="round" />
      <path d="M36 46 q26 -12 56 2" stroke="#fff" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
