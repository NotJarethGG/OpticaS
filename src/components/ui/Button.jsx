import { motion } from 'framer-motion'
import { cn } from '../../lib/cn.js'

const variants = {
  primary:
    'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-[0_10px_30px_-10px_rgba(119,171,36,0.7)] hover:shadow-[0_14px_40px_-10px_rgba(119,171,36,0.85)]',
  secondary:
    'glass text-ink-900 dark:text-white hover:bg-white/90 dark:hover:bg-ink-800/80',
  ghost:
    'text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800/60',
  accent:
    'bg-gradient-to-r from-accent-500 to-accent-400 text-ink-950 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.6)]',
  danger:
    'bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20',
}

const sizes = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-13 px-8 text-base gap-2.5 py-3.5',
}

// Componentes de motion predefinidos (no se crean durante el render)
const motionTags = { button: motion.button, a: motion.a, span: motion.span }

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  as = 'button',
  ...props
}) {
  const MotionTag = motionTags[as] || motion.button
  return (
    <MotionTag
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold tracking-tight',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        'disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
