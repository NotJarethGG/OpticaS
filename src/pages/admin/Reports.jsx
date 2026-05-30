import {
  LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { Download, TrendingUp, Users, ShoppingBag, Percent } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader.jsx'
import Panel from '../../components/admin/Panel.jsx'
import Button from '../../components/ui/Button.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'
import { salesByMonth } from '../../data/dashboard.js'

const summary = [
  { icon: ShoppingBag, label: 'Ingresos totales', value: '$217,930', delta: '+14.2%', accent: 'from-brand-600 to-brand-500' },
  { icon: Users, label: 'Nuevos clientes', value: '624', delta: '+8.7%', accent: 'from-accent-500 to-accent-400' },
  { icon: TrendingUp, label: 'Ticket promedio', value: '$148', delta: '+3.1%', accent: 'from-violet-600 to-violet-500' },
  { icon: Percent, label: 'Conversión citas', value: '72%', delta: '+5.4%', accent: 'from-emerald-500 to-emerald-400' },
]

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-ink-200/70 bg-white/90 px-3 py-2 text-xs shadow-soft backdrop-blur dark:border-white/10 dark:bg-ink-900/90">
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">{p.name}: {p.value.toLocaleString()}</p>
      ))}
    </div>
  )
}

export default function Reports() {
  const { theme } = useTheme()
  const grid = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(11,17,32,0.06)'
  const axis = theme === 'dark' ? '#8290ab' : '#647191'

  return (
    <div>
      <PageHeader
        title="Reportes"
        subtitle="Análisis de desempeño del negocio."
        actions={<Button variant="secondary"><Download size={16} /> Exportar PDF</Button>}
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((s) => (
          <div key={s.label} className="rounded-2xl border border-ink-200/70 bg-white/70 p-5 shadow-soft backdrop-blur-xl dark:border-white/5 dark:bg-ink-900/50">
            <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-white`}>
              <s.icon size={18} />
            </span>
            <p className="mt-3 font-display text-2xl font-extrabold">{s.value}</p>
            <p className="text-sm text-ink-500 dark:text-ink-300">{s.label}</p>
            <p className="mt-1 text-xs font-bold text-emerald-500">{s.delta} vs. periodo anterior</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Tendencia de ingresos">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesByMonth} margin={{ top: 10, right: 6, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
                <XAxis dataKey="month" stroke={axis} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={axis} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="ventas" name="Ventas" stroke="#77ab24" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Citas atendidas por mes">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByMonth} margin={{ top: 10, right: 6, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
                <XAxis dataKey="month" stroke={axis} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={axis} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(16,185,129,0.06)' }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="citas" name="Citas" radius={[6, 6, 0, 0]} fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </div>
  )
}
