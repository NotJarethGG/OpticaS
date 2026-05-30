import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, Phone, Star, UserPlus } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader.jsx'
import Panel from '../../components/admin/Panel.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import { Input } from '../../components/admin/Form.jsx'
import { initialClients } from '../../data/dashboard.js'

const tierTone = { Platino: 'violet', Oro: 'amber', Plata: 'neutral' }

function avatarFrom(name) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('')
}

export default function Clients() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(
    () => initialClients.filter((c) => `${c.name} ${c.email} ${c.cedula}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  return (
    <div>
      <PageHeader
        title="Clientes"
        subtitle="Base de datos de pacientes registrados."
        actions={<Button><UserPlus size={18} /> Nuevo cliente</Button>}
      />

      {/* Resumen */}
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total clientes', value: '2,486' },
          { label: 'Nuevos este mes', value: '+118' },
          { label: 'Tasa de retorno', value: '67%' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-ink-200/70 bg-white/70 p-5 shadow-soft backdrop-blur-xl dark:border-white/5 dark:bg-ink-900/50"
          >
            <p className="font-display text-2xl font-extrabold text-gradient">{s.value}</p>
            <p className="text-sm text-ink-500 dark:text-ink-300">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <Panel padded={false}>
        <div className="border-b border-ink-200/60 p-4 dark:border-white/5">
          <div className="relative sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar cliente…" className="pl-9" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-200/60 text-xs uppercase tracking-wider text-ink-400 dark:border-white/5">
              <tr>
                <th className="px-5 py-3 font-semibold">Cliente</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Cédula</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Contacto</th>
                <th className="px-5 py-3 font-semibold">Visitas</th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">Última visita</th>
                <th className="px-5 py-3 font-semibold">Gastado</th>
                <th className="px-5 py-3 font-semibold">Nivel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200/50 dark:divide-white/5">
              {filtered.map((c) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-ink-50/60 dark:hover:bg-ink-800/40"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-xs font-bold text-white">
                        {avatarFrom(c.name)}
                      </span>
                      <div>
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-xs text-ink-400">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3.5 font-mono text-xs text-ink-500 dark:text-ink-300 sm:table-cell">{c.cedula}</td>
                  <td className="hidden px-5 py-3.5 md:table-cell">
                    <p className="flex items-center gap-1.5 text-xs text-ink-500 dark:text-ink-300"><Mail size={13} /> {c.email}</p>
                    <p className="flex items-center gap-1.5 text-xs text-ink-400"><Phone size={13} /> {c.phone}</p>
                  </td>
                  <td className="px-5 py-3.5 font-medium">{c.visits}</td>
                  <td className="hidden px-5 py-3.5 text-ink-500 dark:text-ink-300 lg:table-cell">{c.lastVisit}</td>
                  <td className="px-5 py-3.5 font-bold">${c.spent.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={tierTone[c.tier]}>
                      <Star size={11} className="fill-current" /> {c.tier}
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}
