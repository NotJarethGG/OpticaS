import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, CalendarPlus, LayoutDashboard } from 'lucide-react'
import { navLinks } from '../../data/navigation.js'
import Logo from '../ui/Logo.jsx'
import Button from '../ui/Button.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import { cn } from '../../lib/cn.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  // Bloquea el scroll cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5',
            scrolled ? 'glass-strong shadow-soft' : 'bg-transparent',
          )}
        >
          <a href="#inicio" className="shrink-0">
            <Logo showSubtitle={false} />
          </a>

          {/* Links de escritorio */}
          <ul className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-200 dark:hover:text-accent-300"
                >
                  {link.label}
                  <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand-500 to-accent-400 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:grid" />
            <Link to="/admin" className="hidden lg:block" title="Panel administrativo">
              <Button variant="secondary" size="sm" className="px-3 2xl:px-4">
                <LayoutDashboard size={16} />
                <span className="hidden 2xl:inline">Panel</span>
              </Button>
            </Link>
            <a href="#cita" className="hidden sm:block">
              <Button size="sm">
                <CalendarPlus size={16} /> Solicitar Cita
              </Button>
            </a>

            {/* Botón hamburguesa */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menú"
              className="grid h-10 w-10 place-items-center rounded-full glass text-ink-700 dark:text-white xl:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 glass-strong p-6 pt-24 shadow-2xl"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="rounded-2xl px-4 py-3 text-lg font-semibold text-ink-800 transition-colors hover:bg-brand-500/10 hover:text-brand-600 dark:text-ink-100 dark:hover:text-accent-300"
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="mt-auto flex flex-col gap-3 pt-6">
                <div className="flex items-center justify-between rounded-2xl glass px-4 py-2">
                  <span className="text-sm font-medium text-ink-500 dark:text-ink-300">Tema</span>
                  <ThemeToggle />
                </div>
                <Link to="/admin" onClick={() => setOpen(false)}>
                  <Button variant="secondary" className="w-full">
                    <LayoutDashboard size={16} /> Panel administrativo
                  </Button>
                </Link>
                <a href="#cita" onClick={() => setOpen(false)}>
                  <Button className="w-full">
                    <CalendarPlus size={16} /> Solicitar Cita
                  </Button>
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
