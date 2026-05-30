import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Plus, Pencil, Users, Star } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader.jsx'
import Panel from '../../components/admin/Panel.jsx'
import Button from '../../components/ui/Button.jsx'
import Badge from '../../components/ui/Badge.jsx'
import { branches } from '../../data/branches.js'

const extra = { 'suc-centro': { staff: 8, sales: '$21.4k' }, 'suc-norte': { staff: 5, sales: '$15.1k' }, 'suc-sur': { staff: 4, sales: '$11.7k' } }

export default function AdminBranches() {
  return (
    <div>
      <PageHeader
        title="Sucursales"
        subtitle="Gestiona la información y el rendimiento de cada sucursal."
        actions={<Button><Plus size={18} /> Nueva sucursal</Button>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {branches.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Panel padded={false}>
              <div className="relative h-32 overflow-hidden rounded-t-2xl bg-gradient-to-br from-brand-500/20 to-accent-400/20">
                <div className="ring-grid absolute inset-0 opacity-60" />
                <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-glow">
                  <MapPin size={20} />
                </span>
                {b.featured && (
                  <Badge tone="brand" className="absolute right-3 top-3 backdrop-blur"><Star size={11} className="fill-current" /> Principal</Badge>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold">{b.name}</h3>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-500 dark:text-ink-300">
                  <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-brand-500" /> {b.address}</li>
                  <li className="flex items-center gap-2"><Clock size={15} className="text-brand-500" /> {b.hours}</li>
                  <li className="flex items-center gap-2"><Phone size={15} className="text-brand-500" /> {b.phone}</li>
                </ul>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-ink-200/60 pt-4 dark:border-white/5">
                  <div>
                    <p className="flex items-center gap-1.5 text-xs text-ink-400"><Users size={13} /> Personal</p>
                    <p className="font-display text-lg font-extrabold">{extra[b.id].staff}</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-400">Ventas / mes</p>
                    <p className="font-display text-lg font-extrabold text-gradient">{extra[b.id].sales}</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="mt-4 w-full"><Pencil size={14} /> Editar sucursal</Button>
              </div>
            </Panel>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
