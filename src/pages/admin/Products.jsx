import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Pencil, Trash2, PackageOpen, AlertTriangle } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader.jsx'
import Panel from '../../components/admin/Panel.jsx'
import Modal from '../../components/admin/Modal.jsx'
import Button from '../../components/ui/Button.jsx'
import Badge from '../../components/ui/Badge.jsx'
import GlassesThumb from '../../components/visuals/GlassesThumb.jsx'
import { Field, Input, Select, Textarea } from '../../components/admin/Form.jsx'
import { allProducts, categories } from '../../data/products.js'

const catKeys = Object.keys(categories)
const emptyForm = { name: '', brand: '', price: '', category: 'oftalmicos', stock: '', description: '', colors: ['#5d8a18'] }

export default function Products() {
  const [items, setItems] = useState(allProducts)
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('todas')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [toDelete, setToDelete] = useState(null)

  const filtered = useMemo(
    () =>
      items.filter((p) => {
        const mq = `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase())
        const mc = cat === 'todas' || p.category === cat
        return mq && mc
      }),
    [items, query, cat],
  )

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setErrors({})
    setModalOpen(true)
  }
  const openEdit = (p) => {
    setEditing(p)
    setForm({ ...p, price: String(p.price), stock: String(p.stock), colors: p.colors || ['#5d8a18'] })
    setErrors({})
    setModalOpen(true)
  }
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const save = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Requerido'
    if (!form.price || Number(form.price) <= 0) e.price = 'Precio inválido'
    if (form.stock === '' || Number(form.stock) < 0) e.stock = 'Stock inválido'
    setErrors(e)
    if (Object.keys(e).length) return

    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) }
    if (editing) {
      setItems((list) => list.map((p) => (p.id === editing.id ? { ...p, ...payload } : p)))
    } else {
      setItems((list) => [{ ...payload, id: `np-${Date.now()}`, rating: 4.5 }, ...list])
    }
    setModalOpen(false)
  }

  const confirmDelete = () => {
    setItems((list) => list.filter((p) => p.id !== toDelete.id))
    setToDelete(null)
  }

  return (
    <div>
      <PageHeader
        title="Gestión de Productos"
        subtitle="CRUD completo de anteojos, gafas de sol y lentes de contacto."
        actions={<Button onClick={openCreate}><Plus size={18} /> Nuevo producto</Button>}
      />

      <Panel padded={false} className="mb-4">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar producto o marca…" className="pl-9" />
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {['todas', ...catKeys].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                  cat === c
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white'
                    : 'bg-ink-100 text-ink-500 hover:text-brand-600 dark:bg-ink-800 dark:text-ink-300'
                }`}
              >
                {c === 'todas' ? 'Todas' : categories[c]}
              </button>
            ))}
          </div>
        </div>
      </Panel>

      {/* Grid de productos */}
      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence>
          {filtered.map((p) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-white/70 shadow-soft backdrop-blur-xl dark:border-white/5 dark:bg-ink-900/50"
            >
              <div className="relative grid aspect-[5/3] place-items-center bg-gradient-to-br from-brand-500/10 to-accent-400/10">
                <GlassesThumb
                  sunglasses={p.category === 'sol'}
                  contact={p.category === 'contacto'}
                  colors={p.colors || ['#5d8a18']}
                />
                <Badge tone="neutral" className="absolute left-2 top-2 backdrop-blur">{categories[p.category]}</Badge>
                {p.stock <= 10 && (
                  <Badge tone="amber" className="absolute right-2 top-2 backdrop-blur">
                    <AlertTriangle size={11} /> Stock {p.stock}
                  </Badge>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">{p.brand}</p>
                <h3 className="font-display text-base font-bold leading-tight">{p.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-display text-lg font-extrabold">${p.price}</span>
                  <span className="text-xs text-ink-400">{p.stock} uds.</span>
                </div>
                <div className="mt-3 flex gap-1.5 border-t border-ink-200/60 pt-3 dark:border-white/5">
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => openEdit(p)}>
                    <Pencil size={14} /> Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => setToDelete(p)} aria-label="Eliminar">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-16 text-center text-ink-400">
          <PackageOpen size={32} />
          <p className="text-sm">No se encontraron productos.</p>
        </div>
      )}

      {/* Modal crear/editar */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Editar producto' : 'Nuevo producto'}
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={save}>{editing ? 'Guardar cambios' : 'Crear producto'}</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Preview */}
          <div className="sm:col-span-2 grid place-items-center rounded-xl bg-gradient-to-br from-brand-500/10 to-accent-400/10 py-6">
            <GlassesThumb
              sunglasses={form.category === 'sol'}
              contact={form.category === 'contacto'}
              colors={form.colors}
            />
          </div>
          <Field label="Nombre" error={errors.name}>
            <Input value={form.name} onChange={update('name')} placeholder="Ej. Aera Titanium" />
          </Field>
          <Field label="Marca">
            <Input value={form.brand} onChange={update('brand')} placeholder="Ej. Sanchún Lab" />
          </Field>
          <Field label="Precio (USD)" error={errors.price}>
            <Input type="number" min="0" value={form.price} onChange={update('price')} placeholder="0.00" />
          </Field>
          <Field label="Stock" error={errors.stock}>
            <Input type="number" min="0" value={form.stock} onChange={update('stock')} placeholder="0" />
          </Field>
          <Field label="Categoría">
            <Select value={form.category} onChange={update('category')}>
              {catKeys.map((c) => <option key={c} value={c}>{categories[c]}</option>)}
            </Select>
          </Field>
          <Field label="Color de montura">
            <input
              type="color"
              value={form.colors[0]}
              onChange={(e) => setForm((f) => ({ ...f, colors: [e.target.value, f.colors[1], e.target.value] }))}
              className="h-11 w-full cursor-pointer rounded-xl border border-ink-200/80 bg-white/70 dark:border-white/10 dark:bg-ink-900/60"
            />
          </Field>
          <Field label="Descripción" className="sm:col-span-2">
            <Textarea rows={3} value={form.description} onChange={update('description')} placeholder="Describe las características del producto…" />
          </Field>
        </div>
      </Modal>

      {/* Modal eliminar */}
      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Eliminar producto"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setToDelete(null)}>Cancelar</Button>
            <Button variant="danger" onClick={confirmDelete}><Trash2 size={16} /> Eliminar</Button>
          </>
        }
      >
        <p className="text-sm text-ink-500 dark:text-ink-300">
          ¿Eliminar <strong className="text-ink-800 dark:text-white">{toDelete?.name}</strong> del catálogo?
        </p>
      </Modal>
    </div>
  )
}
