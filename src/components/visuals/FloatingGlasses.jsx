import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Lentes reales (PNG con transparencia) flotando con efecto premium:
 * glow, anillos orbitales, flotación continua y parallax 3D al mover el cursor.
 */
export default function FloatingGlasses() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [16, -16]), { stiffness: 120, damping: 18 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      className="relative grid place-items-center"
      style={{ perspective: 1200 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Halo de glow */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="h-72 w-72 rounded-full bg-brand-500/30 blur-[90px] sm:h-96 sm:w-96" />
        <div className="absolute h-60 w-60 rounded-full bg-accent-400/35 blur-[80px] sm:h-80 sm:w-80" />
      </div>

      {/* Anillos orbitales */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[22rem] w-[22rem] rounded-full border border-brand-400/25 sm:h-[28rem] sm:w-[28rem]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent-400 shadow-[0_0_18px_4px_rgba(52,211,153,0.7)]" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[16rem] w-[16rem] rounded-full border border-accent-400/25 sm:h-[21rem] sm:w-[21rem]"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-400 shadow-[0_0_16px_4px_rgba(119,171,36,0.7)]" />
      </motion.div>

      {/* Lentes reales flotando */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <img
          src="/glasses.png"
          alt="Anteojos oftálmicos Óptica Sanchún"
          loading="eager"
          draggable="false"
          className="w-[20rem] select-none drop-shadow-[0_24px_45px_rgba(0,0,0,0.4)] sm:w-[26rem] md:w-[31rem] dark:drop-shadow-[0_18px_55px_rgba(52,211,153,0.55)]"
        />
      </motion.div>

      {/* Etiqueta flotante */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute -right-2 bottom-4 z-20 glass rounded-2xl px-4 py-3 text-left shadow-soft sm:right-2"
      >
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink-400">Tecnología</p>
        <p className="text-sm font-bold">Free-form 4K · Anti-blue</p>
      </motion.div>
    </div>
  )
}
