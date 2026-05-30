import { motion } from 'framer-motion'
import { ScanEye, Sparkles, Sun, MonitorSmartphone, Crosshair, Aperture } from 'lucide-react'
import Section from '../components/layout/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import { technologies } from '../data/technologies.js'
import { staggerContainer, fadeUp, viewportOnce } from '../lib/motion.js'

const iconMap = { ScanEye, Sparkles, Sun, MonitorSmartphone, Crosshair, Aperture }

export default function Technologies() {
  return (
    <Section id="tecnologias">
      <div className="ring-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative">
        <SectionHeader
          eyebrow="Tecnologías"
          title="Innovación al servicio de tu visión"
          subtitle="Equipos de última generación y tratamientos avanzados para cuidar tus ojos con precisión."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {technologies.map((tech) => {
            const Icon = iconMap[tech.icon] || Sparkles
            return (
              <motion.article
                key={tech.id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl glass p-7 shadow-soft"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl transition-all duration-500 group-hover:bg-accent-400/20" />
                <motion.span
                  whileHover={{ rotate: 8, scale: 1.05 }}
                  className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-[0_12px_30px_-10px_rgba(119,171,36,0.7)]"
                >
                  <Icon size={26} />
                </motion.span>
                <h3 className="relative mt-5 font-display text-xl font-bold">{tech.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
                  {tech.description}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </Section>
  )
}
