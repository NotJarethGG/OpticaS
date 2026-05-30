import { motion } from 'framer-motion'
import { cn } from '../../lib/cn.js'

export default function Panel({ title, action, children, className, padded = true }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'rounded-2xl border border-ink-200/70 bg-white/70 shadow-soft backdrop-blur-xl dark:border-white/5 dark:bg-ink-900/50',
        className,
      )}
    >
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 border-b border-ink-200/60 px-5 py-4 dark:border-white/5">
          {title && <h3 className="font-display text-base font-bold">{title}</h3>}
          {action}
        </header>
      )}
      <div className={cn(padded && 'p-5')}>{children}</div>
    </motion.section>
  )
}
