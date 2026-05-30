import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import Section from '../components/layout/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import { brands } from '../data/brands.js'

function BrandChip({ brand }) {
  return (
    <div className="group flex h-20 min-w-[12rem] shrink-0 items-center justify-center rounded-2xl glass px-8 shadow-soft transition-colors hover:bg-white/90 dark:hover:bg-ink-800/70">
      <span
        className="whitespace-nowrap text-xl text-ink-500 transition-colors group-hover:text-brand-600 dark:text-ink-200 dark:group-hover:text-accent-300"
        style={{ fontFamily: brand.font, fontWeight: brand.weight, letterSpacing: brand.tracking }}
      >
        {brand.name}
      </span>
    </div>
  )
}

function Marquee({ items, reverse = false, duration = 32 }) {
  const loop = [...items, ...items]
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex w-max gap-4 py-1"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((b, i) => (
          <BrandChip key={`${b.name}-${i}`} brand={b} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Brands() {
  const half = Math.ceil(brands.length / 2)
  return (
    <Section id="marcas">
      <SectionHeader
        eyebrow="Marcas"
        title="Las mejores marcas de aros"
        subtitle="Trabajamos con marcas reconocidas a nivel mundial para que elijas el aro perfecto, y nosotros le montamos tus lentes a medida."
      />

      <div className="mt-12 flex flex-col gap-4">
        <Marquee items={brands.slice(0, half)} duration={34} />
        <Marquee items={brands.slice(half)} reverse duration={30} />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-ink-500 dark:text-ink-300"
      >
        <BadgeCheck size={18} className="text-brand-500" />
        Todos los aros incluyen garantía y se adaptan a tu graduación.
      </motion.p>
    </Section>
  )
}
