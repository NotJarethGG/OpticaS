import { cn } from '../../lib/cn.js'

export const fieldInput =
  'h-11 w-full rounded-xl border border-ink-200/80 bg-white/70 px-3.5 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 dark:border-white/10 dark:bg-ink-900/60 dark:text-white'

export function Field({ label, error, className, children }) {
  return (
    <label className={cn('flex flex-col gap-1.5', className)}>
      <span className="text-sm font-semibold text-ink-700 dark:text-ink-200">{label}</span>
      {children}
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </label>
  )
}

export function Input(props) {
  return <input {...props} className={cn(fieldInput, props.className)} />
}

export function Select(props) {
  return <select {...props} className={cn(fieldInput, props.className)} />
}

export function Textarea(props) {
  return (
    <textarea
      {...props}
      className={cn(fieldInput, 'h-auto resize-none py-2.5', props.className)}
    />
  )
}
