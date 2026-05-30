import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Clock, Trash2, Power } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import { promotions as seed } from '../../data/promotions.js'

export default function AdminPromotions() {
  const [items, setItems] = useState(seed.map((p) => ({ ...p, active: true })))

  const toggle = (id) => setItems((l) => l.map((p) => (p.id === id ? { ...p, active: !p.active } : p)))
  const remove = (id) => setItems((l) => l.filter((p) => p.id !== id))

  return (
    <div>
      <PageHeader
        title="Promociones"
        subtitle="Activa, pausa o elimina las campañas vigentes."
        actions={<Button><Plus size={18} /> Nueva promoción</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {items.map((promo) => (
            <motion.article
              key={promo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 text-white shadow-soft transition-opacity ${
                promo.active ? '' : 'opacity-55 grayscale'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${promo.accent}`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/25 px-3 py-1 text-xs font-bold uppercase backdrop-blur">{promo.badge}</span>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${promo.active ? 'bg-emerald-400/90 text-emerald-950' : 'bg-white/30'}`}>
                    {promo.active ? 'Activa' : 'Pausada'}
                  </span>
                </div>
                <p className="mt-5 font-display text-4xl font-extrabold">{promo.discount}</p>
                <h3 className="mt-2 font-display text-lg font-bold">{promo.title}</h3>
                <p className="mt-1 text-sm text-white/85">{promo.description}</p>
              </div>
              <div className="relative mt-5 flex items-center justify-between border-t border-white/25 pt-4">
                <span className="flex items-center gap-1.5 text-xs"><Clock size={13} /> Hasta {promo.expires}</span>
                <div className="flex gap-1.5">
                  <button onClick={() => toggle(promo.id)} className="grid h-8 w-8 place-items-center rounded-lg bg-white/20 transition-colors hover:bg-white/35" aria-label="Activar/pausar">
                    <Power size={15} />
                  </button>
                  <button onClick={() => remove(promo.id)} className="grid h-8 w-8 place-items-center rounded-lg bg-white/20 transition-colors hover:bg-red-500/70" aria-label="Eliminar">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
