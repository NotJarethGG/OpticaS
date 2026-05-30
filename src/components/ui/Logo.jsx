import { cn } from '../../lib/cn.js'

/**
 * Logo de Óptica Sanchún — recreación vectorial de la marca:
 * un ojo con párpado verde y el iris en azul profundo, con un destello.
 * Nítido a cualquier tamaño y compatible con modo oscuro.
 */
export default function Logo({ className, showText = true, showSubtitle = true, textClassName }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 72 56"
        className="h-10 w-12 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lidG" x1="4" y1="10" x2="68" y2="46" gradientUnits="userSpaceOnUse">
            <stop stopColor="#96c83f" />
            <stop offset="0.55" stopColor="#77ab24" />
            <stop offset="1" stopColor="#34d399" />
          </linearGradient>
          <radialGradient id="irisG" cx="0.38" cy="0.34" r="0.75">
            <stop stopColor="#3a86c9" />
            <stop offset="0.6" stopColor="#1f5fae" />
            <stop offset="1" stopColor="#173b7a" />
          </radialGradient>
        </defs>

        {/* Párpado superior (swoosh verde con cola) */}
        <path
          d="M5 31 C 22 9, 46 6, 69 16"
          stroke="url(#lidG)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Párpado inferior */}
        <path
          d="M5 31 C 20 47, 40 46, 55 37"
          stroke="url(#lidG)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Iris */}
        <circle cx="27" cy="29" r="12" fill="url(#irisG)" />
        {/* Pupila */}
        <circle cx="27" cy="29" r="5.5" fill="#0e2a57" />
        {/* Destello */}
        <circle cx="22.5" cy="24.5" r="3" fill="#ffffff" />
        <circle cx="32" cy="33" r="1.4" fill="#ffffff" fillOpacity="0.7" />
      </svg>

      {showText && (
        <span className={cn('flex flex-col leading-none', textClassName)}>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Óptica <span className="text-gradient">Sanchún</span>
          </span>
          {showSubtitle && (
            <span className="mt-0.5 text-[10px] font-medium tracking-wide text-ink-400">
              Nuestra preocupación es su visión
            </span>
          )}
        </span>
      )}
    </span>
  )
}
