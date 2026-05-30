import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import { cn } from '../../lib/cn.js'

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className={cn(
        'relative grid h-10 w-10 place-items-center rounded-full glass overflow-hidden',
        'text-ink-700 dark:text-ink-100 hover:text-brand-600 dark:hover:text-accent-300 transition-colors',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25 }}
          className="absolute"
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
