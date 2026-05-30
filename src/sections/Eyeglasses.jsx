import { motion } from 'framer-motion'
import { ScanEye, Glasses, ReceiptText, ArrowRight } from 'lucide-react'
import Section from '../components/layout/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import FrameCard from '../components/cards/FrameCard.jsx'
import Button from '../components/ui/Button.jsx'
import { eyeglasses } from '../data/products.js'
import { staggerContainer, fadeUp, viewportOnce } from '../lib/motion.js'

const filters = ['Todos', 'Acetato', 'Titanio', 'Metal', 'Redondas']

const steps = [
  { icon: ScanEye, title: 'Te hacemos el examen', text: 'Examen visual computarizado para conocer tu graduación exacta.' },
  { icon: Glasses, title: 'Eliges tu aro', text: 'Escoge entre nuestras marcas el aro que mejor va contigo.' },
  { icon: ReceiptText, title: 'Te damos el total', text: 'Sumamos el precio del aro + el lente y te decimos el total final.' },
]

export default function Eyeglasses() {
  return (
    <Section id="oftalmicos" className="bg-white/40 dark:bg-ink-900/30">
      <SectionHeader
        eyebrow="Anteojos Oftálmicos"
        title="Tú eliges el aro, nosotros tus lentes"
        subtitle="Así funciona en Óptica Sanchún: te hacemos el examen, eliges tu montura y te damos el precio del aro y el total ya con el lente puesto."
      />

      {/* Cómo funciona */}
      <motion.ol
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3"
      >
        {steps.map((s, i) => (
          <motion.li
            key={s.title}
            variants={fadeUp}
            className="relative flex flex-col gap-2 rounded-2xl glass p-5 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-soft">
                <s.icon size={20} />
              </span>
              <span className="font-display text-2xl font-extrabold text-ink-200 dark:text-ink-700">
                0{i + 1}
              </span>
            </div>
            <h3 className="font-display text-base font-bold">{s.title}</h3>
            <p className="text-sm leading-relaxed text-ink-500 dark:text-ink-300">{s.text}</p>
          </motion.li>
        ))}
      </motion.ol>

      {/* Filtros por tipo de aro */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="no-scrollbar mt-12 flex gap-2 overflow-x-auto pb-1"
      >
        {filters.map((f, i) => (
          <button
            key={f}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              i === 0
                ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-soft'
                : 'glass text-ink-600 hover:text-brand-600 dark:text-ink-200'
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Aros disponibles */}
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {eyeglasses.map((p) => (
          <FrameCard key={p.id} product={p} />
        ))}
      </motion.div>

      <div className="mt-10 flex flex-col items-center gap-2">
        <a href="#cita">
          <Button size="lg">
            Agenda tu examen visual <ArrowRight size={18} />
          </Button>
        </a>
        <p className="text-xs text-ink-400">Precios de referencia. El total depende del tipo de lente y tu graduación.</p>
      </div>
    </Section>
  )
}
