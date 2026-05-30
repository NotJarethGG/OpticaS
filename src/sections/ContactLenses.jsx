import { motion } from 'framer-motion'
import { Droplets, Eye, ShieldCheck, Clock, Check } from 'lucide-react'
import Section from '../components/layout/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import GlassesThumb from '../components/visuals/GlassesThumb.jsx'
import { contactLenses } from '../data/products.js'
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from '../lib/motion.js'

const benefits = [
  { icon: Droplets, title: 'Hidratación prolongada', text: 'Tecnología HydraLuxe para 16 h de confort.' },
  { icon: Eye, title: 'Alta oxigenación', text: 'Silicona-hidrogel que cuida la córnea.' },
  { icon: ShieldCheck, title: 'Protección UV', text: 'Filtro integrado contra rayos dañinos.' },
  { icon: Clock, title: 'Uso flexible', text: 'Opciones diarias, mensuales y tóricas.' },
]

const brands = ['Acuvue', 'Biofinity', 'Air Optix', 'Bausch+Lomb', 'CooperVision']

export default function ContactLenses() {
  return (
    <Section id="lentes-contacto" className="bg-white/40 dark:bg-ink-900/30">
      <SectionHeader
        eyebrow="Lentes de Contacto"
        title="Libertad visual, máximo confort"
        subtitle="Encuentra la opción ideal según tu estilo de vida, con las mejores marcas del mercado."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Categorías */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-4 sm:grid-cols-2"
        >
          {contactLenses.map((lens) => (
            <motion.article
              key={lens.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group flex items-center gap-4 rounded-3xl glass p-5 shadow-soft"
            >
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent-400/15 to-brand-500/15">
                <GlassesThumb contact colors={['#10b981']} />
              </div>
              <div>
                <span className="rounded-full bg-accent-500/12 px-2.5 py-0.5 text-[11px] font-bold text-accent-700 dark:text-accent-300">
                  {lens.type}
                </span>
                <h3 className="mt-1.5 font-display text-lg font-bold">{lens.name}</h3>
                <p className="text-xs text-ink-500 dark:text-ink-300">{lens.brand}</p>
                <p className="mt-1 font-display text-lg font-extrabold text-gradient">${lens.price}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Beneficios */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-5 rounded-[2rem] bg-gradient-to-br from-brand-600 to-accent-500 p-8 text-white shadow-glow"
        >
          <h3 className="font-display text-2xl font-extrabold">¿Por qué elegirlos?</h3>
          <ul className="flex flex-col gap-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/20 backdrop-blur">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-bold">{title}</p>
                  <p className="text-sm text-white/80">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t border-white/20 pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/70">Marcas disponibles</p>
            <div className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <span key={b} className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                  <Check size={12} /> {b}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
