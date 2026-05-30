import { motion } from 'framer-motion'
import { Clock, ArrowUpRight } from 'lucide-react'
import Section from '../components/layout/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import { promotions } from '../data/promotions.js'
import { staggerContainer, fadeUp, viewportOnce } from '../lib/motion.js'

export default function Promotions() {
  return (
    <Section id="promociones">
      <SectionHeader
        eyebrow="Promociones"
        title="Ofertas que enamoran tu mirada"
        subtitle="Aprovecha descuentos exclusivos por tiempo limitado en monturas, lentes y exámenes visuales."
      />

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {promotions.map((promo) => (
          <motion.article
            key={promo.id}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 text-white shadow-soft"
          >
            {/* Fondo degradado */}
            <div className={`absolute inset-0 bg-gradient-to-br ${promo.accent}`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_55%)]" />
            <div
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl transition-transform duration-500 group-hover:scale-150"
            />

            <div className="relative">
              <span className="inline-flex rounded-full bg-white/25 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur">
                {promo.badge}
              </span>
              <p className="mt-6 font-display text-5xl font-extrabold drop-shadow-sm">{promo.discount}</p>
              <h3 className="mt-3 font-display text-xl font-bold leading-tight">{promo.title}</h3>
              <p className="mt-2 text-sm text-white/85">{promo.description}</p>
            </div>

            <div className="relative mt-6 flex items-center justify-between border-t border-white/25 pt-4">
              <span className="flex items-center gap-1.5 text-xs font-medium text-white/85">
                <Clock size={14} /> Hasta {promo.expires}
              </span>
              <a
                href="#cita"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-900 transition-transform group-hover:rotate-45"
                aria-label="Aprovechar promoción"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
