import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const widths = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center p-4"
        >
          <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className={`relative z-10 w-full ${widths[size]} overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-2xl dark:border-white/10 dark:bg-ink-900`}
          >
            <header className="flex items-center justify-between border-b border-ink-200/60 px-5 py-4 dark:border-white/5">
              <h3 className="font-display text-lg font-bold">{title}</h3>
              <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800" aria-label="Cerrar">
                <X size={18} />
              </button>
            </header>
            <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
            {footer && <footer className="flex justify-end gap-2 border-t border-ink-200/60 px-5 py-4 dark:border-white/5">{footer}</footer>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
