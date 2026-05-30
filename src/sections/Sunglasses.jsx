import { motion } from 'framer-motion'
import { Star, ArrowUpRight, Sun } from 'lucide-react'
import Section from '../components/layout/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import GlassesThumb from '../components/visuals/GlassesThumb.jsx'
import Badge from '../components/ui/Badge.jsx'
import { sunglasses } from '../data/products.js'
import { staggerContainer, fadeUp, viewportOnce } from '../lib/motion.js'

export default function Sunglasses() {
  const [hero, ...rest] = sunglasses

  return (
    <Section id="gafas-sol">
      <SectionHeader
        eyebrow="Gafas de Sol"
        title="Protección que se ve increíble"
        subtitle="Colección premium con cristales polarizados UV400 y diseños que marcan tendencia."
      />

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-5 lg:grid-cols-3"
      >
        {/* Producto destacado grande */}
        <motion.article
          variants={fadeUp}
          className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink-900 to-brand-900 p-8 text-white shadow-glow lg:row-span-2"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.35),transparent_55%)]" />
          <div className="relative z-10">
            <Badge tone="accent" className="bg-white/15 text-white ring-white/20">{hero.tag}</Badge>
            <h3 className="mt-5 font-display text-3xl font-extrabold">{hero.name}</h3>
            <p className="mt-2 max-w-xs text-sm text-white/80">{hero.description}</p>
          </div>

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 my-8 grid place-items-center drop-shadow-2xl"
          >
            <GlassesThumb sunglasses colors={hero.colors} />
          </motion.div>

          <div className="relative z-10 flex items-end justify-between">
            <div>
              <span className="flex items-center gap-1 text-sm font-semibold text-amber-300">
                <Star size={14} className="fill-current" /> {hero.rating}
              </span>
              <p className="mt-1 font-display text-3xl font-extrabold">${hero.price}</p>
            </div>
            <a
              href="#cita"
              className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ink-900 transition-transform group-hover:scale-105"
            >
              Comprar <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.article>

        {/* Resto */}
        {rest.map((p) => (
          <motion.article
            key={p.id}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group relative flex items-center gap-4 overflow-hidden rounded-[2rem] glass p-5 shadow-soft"
          >
            <div className="relative grid h-28 w-32 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-accent-400/10">
              <GlassesThumb sunglasses colors={p.colors} />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">{p.brand}</p>
                {p.tag && <Badge tone="amber">{p.tag}</Badge>}
              </div>
              <h3 className="font-display text-lg font-bold">{p.name}</h3>
              <p className="line-clamp-1 text-sm text-ink-500 dark:text-ink-300">{p.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-display text-xl font-extrabold">${p.price}</span>
                <span className="flex items-center gap-1 text-xs font-medium text-ink-400">
                  <Sun size={13} className="text-amber-500" /> UV400
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
