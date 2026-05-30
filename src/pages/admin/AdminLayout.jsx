import { useState, Suspense } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, CalendarDays, Users, Glasses, Tag, MapPin, BarChart3, Settings,
  ShoppingBag, Search, Bell, Menu, X, ArrowLeft, ChevronRight,
} from 'lucide-react'
import { adminNav } from '../../data/adminNav.js'
import Logo from '../../components/ui/Logo.jsx'
import ThemeToggle from '../../components/ui/ThemeToggle.jsx'
import { cn } from '../../lib/cn.js'

const icons = { LayoutDashboard, CalendarDays, Users, Glasses, Tag, MapPin, BarChart3, Settings, ShoppingBag }

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <Link to="/admin" className="px-2 py-3" onClick={onNavigate}>
        <Logo />
      </Link>

      <nav className="mt-2 flex flex-1 flex-col gap-1">
        {adminNav.map((item) => {
          const Icon = icons[item.icon]
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors',
                  isActive
                    ? 'text-white'
                    : 'text-ink-500 hover:bg-ink-100 hover:text-brand-600 dark:text-ink-300 dark:hover:bg-ink-800/60 dark:hover:text-white',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 -z-0 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 shadow-[0_8px_20px_-8px_rgba(119,171,36,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon size={18} className="relative z-10 shrink-0" />
                  <span className="relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink-500 transition-colors hover:bg-ink-100 hover:text-brand-600 dark:text-ink-300 dark:hover:bg-ink-800/60"
      >
        <ArrowLeft size={18} /> Volver al sitio
      </Link>
    </div>
  )
}

function Breadcrumb() {
  const { pathname } = useLocation()
  const current = adminNav.find((n) => n.to === pathname) || adminNav[0]
  return (
    <div className="hidden items-center gap-1.5 text-sm text-ink-400 sm:flex">
      <span>Admin</span>
      <ChevronRight size={14} />
      <span className="font-semibold text-ink-700 dark:text-ink-100">{current.label}</span>
    </div>
  )
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-ink-100/60 dark:bg-ink-950">
      {/* Sidebar escritorio */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-ink-200/70 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-ink-900/50 lg:block">
        <SidebarContent />
      </aside>

      {/* Sidebar móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 left-0 w-72 glass-strong shadow-2xl"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-4 grid h-9 w-9 place-items-center rounded-full glass"
                aria-label="Cerrar menú"
              >
                <X size={18} />
              </button>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink-200/70 bg-white/70 px-4 backdrop-blur-xl dark:border-white/5 dark:bg-ink-900/50 sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl glass lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>

          <Breadcrumb />

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                placeholder="Buscar…"
                className="h-10 w-44 rounded-full border border-ink-200/80 bg-white/60 pl-9 pr-3 text-sm outline-none transition focus:w-56 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 dark:border-white/10 dark:bg-ink-900/50 md:w-56 md:focus:w-64"
              />
            </div>
            <button className="relative grid h-10 w-10 place-items-center rounded-full glass text-ink-600 dark:text-ink-200" aria-label="Notificaciones">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-ink-900" />
            </button>
            <ThemeToggle />
            <div className="flex items-center gap-2.5 rounded-full glass py-1 pl-1 pr-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-sm font-bold text-white">
                AS
              </span>
              <span className="hidden text-sm font-semibold sm:block">Admin</span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Suspense
            fallback={
              <div className="flex h-64 items-center justify-center">
                <span className="h-9 w-9 animate-spin rounded-full border-2 border-ink-200 border-t-brand-500 dark:border-ink-700 dark:border-t-brand-400" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
