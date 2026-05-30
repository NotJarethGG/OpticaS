import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import { navLinks } from '../../data/navigation.js'

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Twitter, label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-200/60 bg-white/60 py-14 dark:border-white/5 dark:bg-ink-950/60">
      <div className="ring-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-ink-500 dark:text-ink-300">
            Nuestra preocupación es su visión. Cuidamos tu salud visual con precisión, tecnología y cercanía.
          </p>
          <div className="flex gap-2">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full glass text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-200 dark:hover:text-accent-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-400">Navegación</h4>
          <ul className="flex flex-col gap-2.5">
            {navLinks.slice(0, 5).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-ink-500 transition-colors hover:text-brand-600 dark:text-ink-300 dark:hover:text-accent-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-400">Empresa</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-ink-500 dark:text-ink-300">
            <li><a href="#sucursales" className="transition-colors hover:text-brand-600 dark:hover:text-accent-300">Sucursales</a></li>
            <li><a href="#cita" className="transition-colors hover:text-brand-600 dark:hover:text-accent-300">Agendar cita</a></li>
            <li><Link to="/admin" className="transition-colors hover:text-brand-600 dark:hover:text-accent-300">Panel administrativo</Link></li>
            <li><a href="#" className="transition-colors hover:text-brand-600 dark:hover:text-accent-300">Aviso de privacidad</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-400">Contacto</h4>
          <ul className="flex flex-col gap-3 text-sm text-ink-500 dark:text-ink-300">
            <li className="flex items-center gap-2.5"><Phone size={16} className="text-brand-500" /> +52 55 1234 5678</li>
            <li className="flex items-center gap-2.5"><Mail size={16} className="text-brand-500" /> hola@opticasanchun.com</li>
            <li className="flex items-center gap-2.5"><MapPin size={16} className="text-brand-500" /> Av. Central 1234, Centro</li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-ink-200/60 px-5 pt-6 text-center text-xs text-ink-400 dark:border-white/5 sm:flex-row sm:px-8 sm:text-left">
        <p>© {new Date().getFullYear()} Óptica Sanchún. Todos los derechos reservados.</p>
        <p>Diseñado con precisión óptica · React · Framer Motion</p>
      </div>
    </footer>
  )
}
