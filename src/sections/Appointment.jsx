import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Phone, Mail, Calendar, Clock, Stethoscope, CheckCircle2, Send, PartyPopper } from 'lucide-react'
import Section from '../components/layout/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Button from '../components/ui/Button.jsx'
import { fadeUp, scaleIn, viewportOnce } from '../lib/motion.js'

const reasons = ['Examen visual', 'Anteojos oftálmicos', 'Gafas de sol', 'Lentes de contacto', 'Ajuste / reparación', 'Otro']

const emptyForm = { nombre: '', apellidos: '', telefono: '', correo: '', fecha: '', hora: '', motivo: '' }

function validate(form) {
  const e = {}
  if (!form.nombre.trim()) e.nombre = 'Ingresa tu nombre'
  if (!form.apellidos.trim()) e.apellidos = 'Ingresa tus apellidos'
  if (!/^[\d\s+()-]{8,}$/.test(form.telefono)) e.telefono = 'Teléfono no válido'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) e.correo = 'Correo no válido'
  if (!form.fecha) e.fecha = 'Selecciona una fecha'
  else if (form.fecha < new Date().toISOString().split('T')[0]) e.fecha = 'La fecha no puede ser pasada'
  if (!form.hora) e.hora = 'Selecciona una hora'
  if (!form.motivo) e.motivo = 'Selecciona un motivo'
  return e
}

function Field({ icon: Icon, label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-700 dark:text-ink-200">
        <Icon size={15} className="text-brand-500" /> {label}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs font-medium text-red-500"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}

const inputCls =
  'h-11 rounded-xl border border-ink-200/80 bg-white/70 px-3.5 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 dark:border-white/10 dark:bg-ink-900/50 dark:text-white'

export default function Appointment() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const v = validate(form)
    setErrors(v)
    if (Object.keys(v).length === 0) {
      setSent(true)
    }
  }

  const reset = () => {
    setForm(emptyForm)
    setErrors({})
    setSent(false)
  }

  return (
    <Section id="cita">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Columna informativa */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <SectionHeader
            align="left"
            eyebrow="Solicitar Cita"
            title="Agenda tu visita en segundos"
            subtitle="Reserva tu examen visual o asesoría con nuestros especialistas. Te confirmaremos por teléfono y correo."
          />
          <ul className="mt-8 flex flex-col gap-4">
            {[
              'Atención por optometristas certificados',
              'Examen visual computarizado de alta precisión',
              'Sin costo al adquirir tus lentes',
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm text-ink-600 dark:text-ink-300">
                <CheckCircle2 size={20} className="shrink-0 text-emerald-500" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Formulario / Confirmación */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative rounded-[2rem] glass-strong p-6 shadow-glow sm:p-8"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-10 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                  className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-accent-500 text-white shadow-glow"
                >
                  <PartyPopper size={36} />
                </motion.span>
                <h3 className="font-display text-2xl font-extrabold">¡Cita solicitada!</h3>
                <p className="max-w-sm text-sm text-ink-500 dark:text-ink-300">
                  Gracias <strong className="text-ink-800 dark:text-white">{form.nombre}</strong>, recibimos tu
                  solicitud para el <strong className="text-ink-800 dark:text-white">{form.fecha}</strong> a las{' '}
                  <strong className="text-ink-800 dark:text-white">{form.hora}</strong>. Te contactaremos para confirmar.
                </p>
                <Button variant="secondary" onClick={reset}>Agendar otra cita</Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <Field icon={User} label="Nombre" error={errors.nombre}>
                  <input className={inputCls} value={form.nombre} onChange={update('nombre')} placeholder="Ej. María" />
                </Field>
                <Field icon={User} label="Apellidos" error={errors.apellidos}>
                  <input className={inputCls} value={form.apellidos} onChange={update('apellidos')} placeholder="Ej. González" />
                </Field>
                <Field icon={Phone} label="Teléfono" error={errors.telefono}>
                  <input className={inputCls} value={form.telefono} onChange={update('telefono')} placeholder="+52 55 0000 0000" inputMode="tel" />
                </Field>
                <Field icon={Mail} label="Correo" error={errors.correo}>
                  <input className={inputCls} value={form.correo} onChange={update('correo')} placeholder="tucorreo@mail.com" inputMode="email" />
                </Field>
                <Field icon={Calendar} label="Fecha" error={errors.fecha}>
                  <input type="date" className={inputCls} value={form.fecha} onChange={update('fecha')} min={new Date().toISOString().split('T')[0]} />
                </Field>
                <Field icon={Clock} label="Hora" error={errors.hora}>
                  <input type="time" className={inputCls} value={form.hora} onChange={update('hora')} min="09:00" max="20:00" />
                </Field>
                <div className="sm:col-span-2">
                  <Field icon={Stethoscope} label="Motivo de consulta" error={errors.motivo}>
                    <select className={inputCls} value={form.motivo} onChange={update('motivo')}>
                      <option value="">Selecciona un motivo…</option>
                      {reasons.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" className="w-full">
                    <Send size={18} /> Confirmar solicitud
                  </Button>
                  <p className="mt-3 text-center text-xs text-ink-400">
                    Al enviar aceptas nuestra política de privacidad.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  )
}
