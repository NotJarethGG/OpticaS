import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Navigation, Star } from 'lucide-react'
import Section from '../components/layout/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Badge from '../components/ui/Badge.jsx'
import { branches } from '../data/branches.js'
import { staggerContainer, fadeUp, viewportOnce } from '../lib/motion.js'

export default function Branches() {
  return (
    <Section id="sucursales" className="bg-white/40 dark:bg-ink-900/30">
      <SectionHeader
        eyebrow="Sucursales"
        title="Estamos cerca de ti"
        subtitle="Visítanos en cualquiera de nuestras sucursales y vive la experiencia Sanchún."
      />

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-5 md:grid-cols-3"
      >
        {branches.map((b) => (
          <motion.article
            key={b.id}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl glass shadow-soft"
          >
            {/* Mapa (placeholder preparado para Google Maps embed) */}
            <div className="relative h-40 overflow-hidden bg-gradient-to-br from-brand-500/20 to-accent-400/20">
              <div className="ring-grid absolute inset-0 opacity-60" />
              {/* Trazas de calles decorativas */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 160" fill="none" preserveAspectRatio="none">
                <path d="M0 110 H400 M120 0 V160 M260 0 V160" stroke="currentColor" strokeOpacity="0.12" strokeWidth="14" className="text-ink-500" />
                <path d="M0 60 H400" stroke="currentColor" strokeOpacity="0.1" strokeWidth="8" className="text-ink-500" />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-glow">
                  <MapPin size={22} />
                  <span className="absolute inset-0 rounded-full bg-brand-500/50" style={{ animation: 'var(--animate-pulse-ring)' }} />
                </span>
              </div>
              {b.featured && (
                <Badge tone="brand" className="absolute right-3 top-3 backdrop-blur">
                  <Star size={12} className="fill-current" /> Principal
                </Badge>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="font-display text-xl font-bold">{b.name}</h3>
              <ul className="flex flex-col gap-2.5 text-sm text-ink-500 dark:text-ink-300">
                <li className="flex items-start gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-brand-500" /> {b.address}, {b.city}</li>
                <li className="flex items-center gap-2.5"><Clock size={16} className="shrink-0 text-brand-500" /> {b.hours}</li>
                <li className="flex items-center gap-2.5"><Phone size={16} className="shrink-0 text-brand-500" /> {b.phone}</li>
              </ul>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${b.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 py-2.5 text-sm font-bold text-white transition-transform group-hover:scale-[1.02]"
              >
                <Navigation size={16} /> Cómo llegar
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
