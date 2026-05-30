import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Trash2, ShoppingBag, IdCard, UserCheck, UserX,
  Glasses, ScanLine, DollarSign,
} from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader.jsx'
import Panel from '../../components/admin/Panel.jsx'
import Modal from '../../components/admin/Modal.jsx'
import Button from '../../components/ui/Button.jsx'
import Badge from '../../components/ui/Badge.jsx'
import { Field, Input, Select } from '../../components/admin/Form.jsx'
import { initialSales, initialClients, initialAppointments } from '../../data/dashboard.js'

const lensTypes = [
  'Monofocal AR',
  'Antirreflejo',
  'Antirreflejo + Anti-blue',
  'Fotocromático',
  'Progresivo',
  'Bifocal',
]

const emptyForm = {
  cedula: '', client: '', phone: '',
  frame: '', framePrice: '',
  lensType: lensTypes[0], lensPrice: '',
  appointmentId: '', examFee: '0',
  status: 'pagada',
}

const money = (n) => `$${Number(n || 0).toLocaleString()}`
const saleTotal = (s) => Number(s.framePrice || 0) + Number(s.lensPrice || 0) + Number(s.examFee || 0)

export default function Sales() {
  const [items, setItems] = useState(initialSales)
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [lookup, setLookup] = useState(null) // null | 'found' | 'notfound'
  const [toDelete, setToDelete] = useState(null)

  const filtered = useMemo(
    () => items.filter((s) => `${s.client} ${s.cedula} ${s.frame} ${s.id}`.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  )

  const kpis = useMemo(() => {
    const total = items.reduce((a, s) => a + saleTotal(s), 0)
    const paid = items.filter((s) => s.status === 'pagada').reduce((a, s) => a + saleTotal(s), 0)
    const avg = items.length ? Math.round(total / items.length) : 0
    return { total, paid, avg, count: items.length }
  }, [items])

  const liveTotal = Number(form.framePrice || 0) + Number(form.lensPrice || 0) + Number(form.examFee || 0)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const openNew = () => {
    setForm(emptyForm)
    setErrors({})
    setLookup(null)
    setModalOpen(true)
  }

  // Búsqueda del cliente por número de cédula
  const findByCedula = () => {
    const c = initialClients.find((cl) => cl.cedula === form.cedula.trim())
    if (c) {
      setForm((f) => ({ ...f, client: c.name, phone: c.phone }))
      setLookup('found')
    } else {
      setLookup('notfound')
    }
  }

  const save = () => {
    const e = {}
    if (!form.cedula.trim()) e.cedula = 'Ingresa la cédula'
    if (!form.client.trim()) e.client = 'Cliente requerido (busca por cédula)'
    if (!form.frame.trim()) e.frame = 'Indica el aro'
    if (!form.framePrice || Number(form.framePrice) < 0) e.framePrice = 'Precio inválido'
    if (form.lensPrice === '' || Number(form.lensPrice) < 0) e.lensPrice = 'Precio inválido'
    setErrors(e)
    if (Object.keys(e).length) return

    const id = `V-${2006 + items.length}`
    setItems((list) => [
      {
        id,
        cedula: form.cedula.trim(),
        client: form.client,
        frame: form.frame,
        framePrice: Number(form.framePrice),
        lensType: form.lensType,
        lensPrice: Number(form.lensPrice),
        appointmentId: form.appointmentId || '—',
        examFee: Number(form.examFee || 0),
        date: new Date().toISOString().split('T')[0],
        status: form.status,
      },
      ...list,
    ])
    setModalOpen(false)
  }

  const confirmDelete = () => {
    setItems((list) => list.filter((s) => s.id !== toDelete.id))
    setToDelete(null)
  }

  return (
    <div>
      <PageHeader
        title="Ventas"
        subtitle="Registra ventas con el desglose de aro, lente y cita. Busca al cliente por su cédula."
        actions={<Button onClick={openNew}><Plus size={18} /> Nueva venta</Button>}
      />

      {/* KPIs */}
      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total facturado', value: money(kpis.total), icon: DollarSign, accent: 'from-brand-600 to-brand-500' },
          { label: 'Cobrado', value: money(kpis.paid), icon: ShoppingBag, accent: 'from-emerald-500 to-accent-400' },
          { label: 'Ticket promedio', value: money(kpis.avg), icon: ScanLine, accent: 'from-violet-600 to-violet-500' },
          { label: 'Ventas registradas', value: kpis.count, icon: Glasses, accent: 'from-accent-500 to-accent-400' },
        ].map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-ink-200/70 bg-white/70 p-5 shadow-soft backdrop-blur-xl dark:border-white/5 dark:bg-ink-900/50"
          >
            <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${k.accent} text-white`}>
              <k.icon size={18} />
            </span>
            <p className="mt-3 font-display text-2xl font-extrabold">{k.value}</p>
            <p className="text-sm text-ink-500 dark:text-ink-300">{k.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabla */}
      <Panel padded={false}>
        <div className="border-b border-ink-200/60 p-4 dark:border-white/5">
          <div className="relative sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por cliente, cédula o folio…" className="pl-9" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-200/60 text-xs uppercase tracking-wider text-ink-400 dark:border-white/5">
              <tr>
                <th className="px-5 py-3 font-semibold">Folio</th>
                <th className="px-5 py-3 font-semibold">Cliente / Cédula</th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">Montura</th>
                <th className="px-5 py-3 text-right font-semibold">Aro</th>
                <th className="px-5 py-3 text-right font-semibold">Lente</th>
                <th className="hidden px-5 py-3 text-right font-semibold sm:table-cell">Cita</th>
                <th className="px-5 py-3 text-right font-semibold">Total</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Estado</th>
                <th className="px-5 py-3 text-right font-semibold">Acc.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200/50 dark:divide-white/5">
              <AnimatePresence>
                {filtered.map((s) => (
                  <motion.tr
                    key={s.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="hover:bg-ink-50/60 dark:hover:bg-ink-800/40"
                  >
                    <td className="px-5 py-3.5 font-mono text-xs text-ink-400">{s.id}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold">{s.client}</p>
                      <p className="font-mono text-xs text-ink-400">{s.cedula}</p>
                    </td>
                    <td className="hidden px-5 py-3.5 text-ink-500 dark:text-ink-300 lg:table-cell">{s.frame}</td>
                    <td className="px-5 py-3.5 text-right font-medium">{money(s.framePrice)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="font-medium">{money(s.lensPrice)}</span>
                      <span className="block text-[11px] text-ink-400">{s.lensType}</span>
                    </td>
                    <td className="hidden px-5 py-3.5 text-right sm:table-cell">
                      <span className="font-medium">{money(s.examFee)}</span>
                      <span className="block font-mono text-[11px] text-ink-400">{s.appointmentId}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-display font-extrabold text-gradient">{money(saleTotal(s))}</td>
                    <td className="hidden px-5 py-3.5 md:table-cell">
                      <Badge tone={s.status === 'pagada' ? 'emerald' : 'amber'}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {s.status === 'pagada' ? 'Pagada' : 'Pendiente'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end">
                        <button onClick={() => setToDelete(s)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-red-500/10 hover:text-red-500" aria-label="Eliminar">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-16 text-center text-ink-400">
              <ShoppingBag size={32} />
              <p className="text-sm">No hay ventas que coincidan.</p>
            </div>
          )}
        </div>
      </Panel>

      {/* Modal nueva venta */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nueva venta"
        size="lg"
        footer={
          <>
            <div className="mr-auto flex items-baseline gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">Total</span>
              <span className="font-display text-xl font-extrabold text-gradient">{money(liveTotal)}</span>
            </div>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={save}>Registrar venta</Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          {/* Cliente por cédula */}
          <div className="rounded-2xl border border-ink-200/70 bg-ink-50/60 p-4 dark:border-white/10 dark:bg-ink-800/40">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold"><IdCard size={16} className="text-brand-500" /> Cliente</p>
            <div className="flex items-end gap-2">
              <Field label="Número de cédula" error={errors.cedula} className="flex-1">
                <Input
                  value={form.cedula}
                  onChange={(e) => { setForm((f) => ({ ...f, cedula: e.target.value })); setLookup(null) }}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), findByCedula())}
                  placeholder="Ej. 0102345678"
                  inputMode="numeric"
                />
              </Field>
              <Button variant="secondary" size="md" onClick={findByCedula} className="mb-[1px]">
                <Search size={16} /> Buscar
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {lookup === 'found' && (
                <motion.div
                  key="found"
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-3 flex items-center gap-3 rounded-xl bg-emerald-500/10 px-3 py-2.5 text-sm"
                >
                  <UserCheck size={18} className="text-emerald-500" />
                  <span><strong>{form.client}</strong> · {form.phone}</span>
                </motion.div>
              )}
              {lookup === 'notfound' && (
                <motion.div
                  key="nf"
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-3 flex flex-col gap-2 rounded-xl bg-amber-500/10 px-3 py-2.5 text-sm"
                >
                  <span className="flex items-center gap-2"><UserX size={18} className="text-amber-500" /> Cédula no registrada. Ingresa el nombre manualmente:</span>
                  <Input value={form.client} onChange={update('client')} placeholder="Nombre del cliente" />
                </motion.div>
              )}
            </AnimatePresence>
            {errors.client && <p className="mt-2 text-xs font-medium text-red-500">{errors.client}</p>}
          </div>

          {/* Aro */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Aro (marca / modelo)" error={errors.frame}>
              <Input value={form.frame} onChange={update('frame')} placeholder="Ej. Gucci · GG Acetate" />
            </Field>
            <Field label="Precio del aro" error={errors.framePrice}>
              <Input type="number" min="0" value={form.framePrice} onChange={update('framePrice')} placeholder="0" />
            </Field>
          </div>

          {/* Lente */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tipo de lente">
              <Select value={form.lensType} onChange={update('lensType')}>
                {lensTypes.map((t) => <option key={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Precio del lente" error={errors.lensPrice}>
              <Input type="number" min="0" value={form.lensPrice} onChange={update('lensPrice')} placeholder="0" />
            </Field>
          </div>

          {/* Cita */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Cita asociada">
              <Select value={form.appointmentId} onChange={update('appointmentId')}>
                <option value="">Sin cita</option>
                {initialAppointments.map((a) => (
                  <option key={a.id} value={a.id}>{a.id} · {a.name} · {a.date}</option>
                ))}
              </Select>
            </Field>
            <Field label="Costo de la cita / examen">
              <Input type="number" min="0" value={form.examFee} onChange={update('examFee')} placeholder="0" />
            </Field>
          </div>

          {/* Estado */}
          <Field label="Estado de pago" className="sm:max-w-[12rem]">
            <Select value={form.status} onChange={update('status')}>
              <option value="pagada">Pagada</option>
              <option value="pendiente">Pendiente</option>
            </Select>
          </Field>
        </div>
      </Modal>

      {/* Modal eliminar */}
      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Eliminar venta"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setToDelete(null)}>Cancelar</Button>
            <Button variant="danger" onClick={confirmDelete}><Trash2 size={16} /> Eliminar</Button>
          </>
        }
      >
        <p className="text-sm text-ink-500 dark:text-ink-300">
          ¿Eliminar la venta <strong className="text-ink-800 dark:text-white">{toDelete?.id}</strong> de {toDelete?.client}?
        </p>
      </Modal>
    </div>
  )
}
