import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Pencil, Trash2, Filter, CalendarDays } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader.jsx'
import Panel from '../../components/admin/Panel.jsx'
import Modal from '../../components/admin/Modal.jsx'
import StatusBadge, { statusConfig } from '../../components/admin/StatusBadge.jsx'
import Button from '../../components/ui/Button.jsx'
import { Field, Input, Select } from '../../components/admin/Form.jsx'
import { initialAppointments } from '../../data/dashboard.js'
import { branches } from '../../data/branches.js'

const statuses = Object.keys(statusConfig)
const reasons = ['Examen visual', 'Anteojos oftálmicos', 'Gafas de sol', 'Lentes de contacto', 'Renovación de receta', 'Control anual', 'Ajuste de montura']
const emptyForm = { name: '', phone: '', date: '', time: '', reason: reasons[0], branch: branches[0].name, status: 'pendiente' }

export default function Appointments() {
  const [items, setItems] = useState(initialAppointments)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('todas')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [toDelete, setToDelete] = useState(null)

  const filtered = useMemo(() => {
    return items.filter((a) => {
      const matchesQuery = `${a.name} ${a.reason} ${a.id}`.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = filter === 'todas' || a.status === filter
      return matchesQuery && matchesFilter
    })
  }, [items, query, filter])

  const counts = useMemo(() => {
    const c = { todas: items.length }
    statuses.forEach((s) => (c[s] = items.filter((a) => a.status === s).length))
    return c
  }, [items])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setErrors({})
    setModalOpen(true)
  }
  const openEdit = (item) => {
    setEditing(item)
    setForm(item)
    setErrors({})
    setModalOpen(true)
  }

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const save = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Requerido'
    if (!form.date) e.date = 'Requerido'
    if (!form.time) e.time = 'Requerido'
    setErrors(e)
    if (Object.keys(e).length) return

    if (editing) {
      setItems((list) => list.map((a) => (a.id === editing.id ? { ...form } : a)))
    } else {
      const id = `C-${1048 + items.length}`
      setItems((list) => [{ ...form, id }, ...list])
    }
    setModalOpen(false)
  }

  const cycleStatus = (item) => {
    const idx = statuses.indexOf(item.status)
    const next = statuses[(idx + 1) % statuses.length]
    setItems((list) => list.map((a) => (a.id === item.id ? { ...a, status: next } : a)))
  }

  const confirmDelete = () => {
    setItems((list) => list.filter((a) => a.id !== toDelete.id))
    setToDelete(null)
  }

  return (
    <div>
      <PageHeader
        title="Gestión de Citas"
        subtitle="Administra, agenda y actualiza el estado de las citas."
        actions={<Button onClick={openCreate}><Plus size={18} /> Nueva cita</Button>}
      />

      {/* Filtros */}
      <Panel padded={false} className="mb-4">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre, motivo o folio…" className="pl-9" />
          </div>
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
            <Filter size={16} className="shrink-0 text-ink-400" />
            {['todas', ...statuses].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold capitalize transition-colors ${
                  filter === s
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white'
                    : 'bg-ink-100 text-ink-500 hover:text-brand-600 dark:bg-ink-800 dark:text-ink-300'
                }`}
              >
                {s === 'todas' ? 'Todas' : statusConfig[s].label} ({counts[s]})
              </button>
            ))}
          </div>
        </div>
      </Panel>

      {/* Tabla */}
      <Panel padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-200/60 text-xs uppercase tracking-wider text-ink-400 dark:border-white/5">
              <tr>
                <th className="px-5 py-3 font-semibold">Folio</th>
                <th className="px-5 py-3 font-semibold">Paciente</th>
                <th className="px-5 py-3 font-semibold">Fecha / Hora</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Motivo</th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">Sucursal</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 text-right font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200/50 dark:divide-white/5">
              <AnimatePresence>
                {filtered.map((a) => (
                  <motion.tr
                    key={a.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="group hover:bg-ink-50/60 dark:hover:bg-ink-800/40"
                  >
                    <td className="px-5 py-3.5 font-mono text-xs text-ink-400">{a.id}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold">{a.name}</p>
                      <p className="text-xs text-ink-400">{a.phone}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium">{a.date}</p>
                      <p className="text-xs text-ink-400">{a.time} h</p>
                    </td>
                    <td className="hidden px-5 py-3.5 text-ink-500 dark:text-ink-300 md:table-cell">{a.reason}</td>
                    <td className="hidden px-5 py-3.5 text-ink-500 dark:text-ink-300 lg:table-cell">{a.branch}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => cycleStatus(a)} title="Cambiar estado">
                        <StatusBadge status={a.status} />
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEdit(a)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-brand-500/10 hover:text-brand-600" aria-label="Editar">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => setToDelete(a)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-red-500/10 hover:text-red-500" aria-label="Eliminar">
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
              <CalendarDays size={32} />
              <p className="text-sm">No hay citas que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </Panel>

      {/* Modal crear/editar */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? `Editar cita ${editing.id}` : 'Nueva cita'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={save}>{editing ? 'Guardar cambios' : 'Crear cita'}</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre del paciente" error={errors.name} className="sm:col-span-2">
            <Input value={form.name} onChange={update('name')} placeholder="Nombre completo" />
          </Field>
          <Field label="Teléfono">
            <Input value={form.phone} onChange={update('phone')} placeholder="+52 …" />
          </Field>
          <Field label="Sucursal">
            <Select value={form.branch} onChange={update('branch')}>
              {branches.map((b) => <option key={b.id}>{b.name}</option>)}
            </Select>
          </Field>
          <Field label="Fecha" error={errors.date}>
            <Input type="date" value={form.date} onChange={update('date')} />
          </Field>
          <Field label="Hora" error={errors.time}>
            <Input type="time" value={form.time} onChange={update('time')} />
          </Field>
          <Field label="Motivo">
            <Select value={form.reason} onChange={update('reason')}>
              {reasons.map((r) => <option key={r}>{r}</option>)}
            </Select>
          </Field>
          <Field label="Estado">
            <Select value={form.status} onChange={update('status')}>
              {statuses.map((s) => <option key={s} value={s}>{statusConfig[s].label}</option>)}
            </Select>
          </Field>
        </div>
      </Modal>

      {/* Modal eliminar */}
      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Eliminar cita"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setToDelete(null)}>Cancelar</Button>
            <Button variant="danger" onClick={confirmDelete}><Trash2 size={16} /> Eliminar</Button>
          </>
        }
      >
        <p className="text-sm text-ink-500 dark:text-ink-300">
          ¿Seguro que deseas eliminar la cita de <strong className="text-ink-800 dark:text-white">{toDelete?.name}</strong> ({toDelete?.id})? Esta acción no se puede deshacer.
        </p>
      </Modal>
    </div>
  )
}
