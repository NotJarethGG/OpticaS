import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-50 dark:bg-ink-950">
      <div className="flex flex-col items-center gap-4">
        <motion.span
          className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white"
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
            <circle cx="22" cy="36" r="11" stroke="currentColor" strokeWidth="4" />
            <circle cx="44" cy="36" r="11" stroke="currentColor" strokeWidth="4" />
            <path d="M33 35c0-2-3-3-1-3h1c2 0-1 1-1 3Z" fill="currentColor" />
          </svg>
        </motion.span>
        <div className="h-1 w-32 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
          <motion.span
            className="block h-full w-1/2 rounded-full bg-gradient-to-r from-brand-500 to-accent-400"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  )
}
