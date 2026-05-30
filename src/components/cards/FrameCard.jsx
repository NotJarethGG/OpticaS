import { motion } from 'framer-motion'
import { Star, CalendarPlus } from 'lucide-react'
import { fadeUp } from '../../lib/motion.js'
import Badge from '../ui/Badge.jsx'
import GlassesThumb from '../visuals/GlassesThumb.jsx'

const tagTone = {
  'Más vendido': 'brand',
  Nuevo: 'accent',
  Oferta: 'amber',
  Premium: 'violet',
}

export default function FrameCard({ product }) {
  const total = product.price + (product.lensFrom || 0)

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl glass shadow-soft"
    >
      {/* Visual del aro */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-500/10 via-transparent to-accent-400/10">
        <div className="ring-grid absolute inset-0 opacity-50" />
        <motion.div
          className="absolute inset-0 grid place-items-center"
          whileHover={{ scale: 1.08, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        >
          <GlassesThumb colors={product.colors} />
        </motion.div>

        {product.tag && (
          <Badge tone={tagTone[product.tag] || 'brand'} className="absolute left-3 top-3 backdrop-blur">
            {product.tag}
          </Badge>
        )}
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-bold text-amber-600 backdrop-blur dark:text-amber-300">
          <Star size={12} className="fill-current" /> {product.rating}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">{product.brand}</p>
          <h3 className="font-display text-lg font-bold leading-tight">{product.name}</h3>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
          {product.description}
        </p>

        {/* Desglose de precios: aro + lente = total */}
        <div className="mt-auto rounded-2xl border border-ink-200/70 bg-white/50 p-3 text-sm dark:border-white/10 dark:bg-ink-900/40">
          <div className="flex items-center justify-between text-ink-500 dark:text-ink-300">
            <span>Aro</span>
            <span className="font-semibold text-ink-800 dark:text-ink-100">${product.price}</span>
          </div>
          <div className="flex items-center justify-between text-ink-500 dark:text-ink-300">
            <span>Lente desde</span>
            <span className="font-semibold text-ink-800 dark:text-ink-100">${product.lensFrom}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-ink-200/70 pt-2 dark:border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">Total desde</span>
            <span className="font-display text-xl font-extrabold text-gradient">${total}</span>
          </div>
        </div>

        <a
          href="#cita"
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(119,171,36,0.8)] transition-transform group-hover:scale-[1.02]"
        >
          <CalendarPlus size={16} /> Agendar y cotizar
        </a>
      </div>
    </motion.article>
  )
}
