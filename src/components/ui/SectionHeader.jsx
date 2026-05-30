import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../../lib/motion.js'
import Badge from './Badge.jsx'

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', tone = 'brand' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`flex max-w-2xl flex-col gap-4 ${alignment}`}
    >
      {eyebrow && (
        <Badge tone={tone} className="uppercase tracking-[0.18em]">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-[2.7rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed text-ink-500 dark:text-ink-300 sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
