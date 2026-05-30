import { motion } from 'framer-motion'
import { Star, ShoppingBag, Heart } from 'lucide-react'
import { fadeUp } from '../../lib/motion.js'
import Badge from '../ui/Badge.jsx'
import GlassesThumb from '../visuals/GlassesThumb.jsx'

const tagTone = {
  'Más vendido': 'brand',
  Nuevo: 'accent',
  Oferta: 'amber',
  Premium: 'violet',
  Deportivo: 'emerald',
}

export default function ProductCard({ product, variant = 'default' }) {
  const isSun = product.category === 'sol'

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl glass shadow-soft"
    >
      {/* Imagen / visual */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-500/10 via-transparent to-accent-400/10">
        <div className="ring-grid absolute inset-0 opacity-50" />
        <motion.div
          className="absolute inset-0 grid place-items-center"
          whileHover={{ scale: 1.08, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        >
          <GlassesThumb sunglasses={isSun} colors={product.colors} contact={product.category === 'contacto'} />
        </motion.div>

        {product.tag && (
          <Badge tone={tagTone[product.tag] || 'brand'} className="absolute left-3 top-3 backdrop-blur">
            {product.tag}
          </Badge>
        )}
        <button
          aria-label="Añadir a favoritos"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass text-ink-500 opacity-0 transition-all duration-300 hover:text-red-500 group-hover:opacity-100 dark:text-ink-200"
        >
          <Heart size={16} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">{product.brand}</p>
            <h3 className="font-display text-lg font-bold leading-tight">{product.name}</h3>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-300">
            <Star size={12} className="fill-current" /> {product.rating}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
          {product.description}
        </p>

        {product.type && (
          <Badge tone="accent" className="mt-1 w-fit">{product.type}</Badge>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-extrabold">${product.price}</span>
            {product.oldPrice && (
              <span className="text-sm text-ink-400 line-through">${product.oldPrice}</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            aria-label={`Agregar ${product.name}`}
            className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-[0_8px_20px_-8px_rgba(119,171,36,0.8)] transition-transform group-hover:scale-110"
          >
            <ShoppingBag size={17} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
