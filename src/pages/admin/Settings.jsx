import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Bell, Globe, ShieldCheck, Save } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader.jsx'
import Panel from '../../components/admin/Panel.jsx'
import Button from '../../components/ui/Button.jsx'
import { Field, Input, Select } from '../../components/admin/Form.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-brand-500' : 'bg-ink-300 dark:bg-ink-700'}`}
      role="switch"
      aria-checked={checked}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${checked ? 'right-0.5' : 'left-0.5'}`}
      />
    </button>
  )
}

function Row({ icon: Icon, title, desc, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-300">
          <Icon size={16} />
        </span>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-ink-400">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const [notif, setNotif] = useState({ email: true, push: false, sms: true })

  return (
    <div>
      <PageHeader title="Configuración" subtitle="Personaliza tu cuenta y las preferencias del sistema." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Perfil del negocio">
          <div className="grid gap-4">
            <Field label="Nombre de la óptica"><Input defaultValue="Óptica Sanchún" /></Field>
            <Field label="Correo de contacto"><Input defaultValue="hola@opticasanchun.com" /></Field>
            <Field label="Teléfono"><Input defaultValue="+52 55 1234 5678" /></Field>
            <Field label="Zona horaria">
              <Select defaultValue="GMT-6">
                <option>GMT-6 (Ciudad de México)</option>
                <option>GMT-5 (Bogotá / Lima)</option>
                <option>GMT-3 (Buenos Aires)</option>
              </Select>
            </Field>
            <Button className="w-fit"><Save size={16} /> Guardar cambios</Button>
          </div>
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel title="Apariencia">
            <p className="mb-3 text-sm text-ink-500 dark:text-ink-300">Elige el tema del panel.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'light', label: 'Claro', icon: Sun },
                { id: 'dark', label: 'Oscuro', icon: Moon },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-colors ${
                    theme === t.id
                      ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-300'
                      : 'border-ink-200 text-ink-500 hover:border-brand-300 dark:border-white/10 dark:text-ink-300'
                  }`}
                >
                  <t.icon size={16} /> {t.label}
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="Notificaciones">
            <div className="divide-y divide-ink-200/60 dark:divide-white/5">
              <Row icon={Bell} title="Notificaciones por correo" desc="Resumen diario de citas y ventas.">
                <Toggle checked={notif.email} onChange={(v) => setNotif((n) => ({ ...n, email: v }))} />
              </Row>
              <Row icon={Globe} title="Notificaciones push" desc="Alertas en tiempo real en el navegador.">
                <Toggle checked={notif.push} onChange={(v) => setNotif((n) => ({ ...n, push: v }))} />
              </Row>
              <Row icon={ShieldCheck} title="Recordatorios SMS" desc="Avisa a pacientes 24 h antes de su cita.">
                <Toggle checked={notif.sms} onChange={(v) => setNotif((n) => ({ ...n, sms: v }))} />
              </Row>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
