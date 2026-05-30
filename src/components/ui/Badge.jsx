import { cn } from '../../lib/cn.js'

const tones = {
  brand: 'bg-brand-500/12 text-brand-700 dark:text-brand-300 ring-brand-500/20',
  accent: 'bg-accent-500/12 text-accent-700 dark:text-accent-300 ring-accent-500/20',
  emerald: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 ring-emerald-500/20',
  amber: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-amber-500/25',
  violet: 'bg-violet-500/12 text-violet-700 dark:text-violet-300 ring-violet-500/20',
  red: 'bg-red-500/12 text-red-600 dark:text-red-300 ring-red-500/20',
  neutral: 'bg-ink-500/10 text-ink-600 dark:text-ink-300 ring-ink-500/20',
}

export default function Badge({ children, tone = 'brand', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        tones[tone] || tones.brand,
        className,
      )}
    >
      {children}
    </span>
  )
}
