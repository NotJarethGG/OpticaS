import { motion } from 'framer-motion'
import { CalendarPlus, ArrowRight, ShieldCheck } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import FloatingGlasses from '../components/visuals/FloatingGlasses.jsx'
import { staggerContainer, fadeUp } from '../lib/motion.js'

const stats = [
  { value: '+15 años', label: 'de experiencia' },
  { value: '+25k', label: 'pacientes felices' },
  { value: '3', label: 'sucursales' },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pt-40">
      {/* Fondos */}
      <div className="ring-grid pointer-events-none absolute inset-0 mask-fade-b opacity-70 dark:opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-40 h-72 w-72 rounded-full bg-accent-400/20 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        {/* Texto */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Tu visión merece la{' '}
            <span className="text-gradient">mejor tecnología</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-ink-500 dark:text-ink-300 sm:text-lg"
          >
            En <strong className="text-ink-700 dark:text-ink-100">Óptica Sanchún</strong> combinamos
            precisión clínica, diseño premium y la última tecnología en lentes para que veas — y te
            veas — excepcional.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <a href="#cita">
              <Button size="lg">
                <CalendarPlus size={18} /> Solicitar Cita
              </Button>
            </a>
            <a href="#oftalmicos">
              <Button variant="secondary" size="lg">
                Ver Catálogo <ArrowRight size={18} />
              </Button>
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-ink-500 dark:text-ink-300">
            <ShieldCheck size={18} className="text-emerald-500" />
            Garantía de satisfacción y atención por especialistas certificados.
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-2 flex w-full max-w-md divide-x divide-ink-200/70 rounded-2xl glass p-1 dark:divide-white/10"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex-1 px-3 py-2 text-center">
                <p className="font-display text-xl font-extrabold text-gradient">{s.value}</p>
                <p className="text-xs text-ink-500 dark:text-ink-300">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual 3D */}
        <div className="relative h-[24rem] sm:h-[30rem]">
          <FloatingGlasses />
        </div>
      </div>
    </section>
  )
}
