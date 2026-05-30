import { motion } from 'framer-motion'
import {
  CalendarCheck, Users, Glasses, TrendingUp, TrendingDown, ArrowUpRight,
  Calendar, ShoppingBag, UserPlus, AlertTriangle, Tag,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import PageHeader from '../../components/admin/PageHeader.jsx'
import Panel from '../../components/admin/Panel.jsx'
import StatusBadge from '../../components/admin/StatusBadge.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'
import {
  kpis, salesByMonth, salesByCategory, weeklyVisits, recentActivity, initialAppointments, initialSales,
} from '../../data/dashboard.js'
import { Link } from 'react-router-dom'
import { staggerContainer, fadeUp } from '../../lib/motion.js'

const kpiIcons = { CalendarCheck, Users, Glasses, TrendingUp }
const kpiAccent = {
  brand: 'from-brand-600 to-brand-500',
  accent: 'from-accent-500 to-accent-400',
  violet: 'from-violet-600 to-violet-500',
  emerald: 'from-emerald-500 to-emerald-400',
}
const activityIcons = { cita: Calendar, venta: ShoppingBag, cliente: UserPlus, alerta: AlertTriangle, promo: Tag }

function ChartTooltip({ active, payload, label, prefix = '' }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-ink-200/70 bg-white/90 px-3 py-2 text-xs shadow-soft backdrop-blur dark:border-white/10 dark:bg-ink-900/90">
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color || p.fill }} className="font-medium">
          {p.name}: {prefix}{p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function DashboardHome() {
  const { theme } = useTheme()
  const grid = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(11,17,32,0.06)'
  const axis = theme === 'dark' ? '#8290ab' : '#647191'

  return (
    <div>
      <PageHeader
        title="Buenos días, Admin 👋"
        subtitle="Aquí tienes el resumen de Óptica Sanchún para hoy, 29 de mayo."
      />

      {/* KPIs */}
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {kpis.map((k) => {
          const Icon = kpiIcons[k.icon]
          const up = k.trend === 'up'
          return (
            <motion.div
              key={k.id}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl border border-ink-200/70 bg-white/70 p-5 shadow-soft backdrop-blur-xl dark:border-white/5 dark:bg-ink-900/50"
            >
              <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${kpiAccent[k.accent]} opacity-15 blur-xl`} />
              <div className="flex items-start justify-between">
                <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${kpiAccent[k.accent]} text-white shadow-soft`}>
                  <Icon size={20} />
                </span>
                <span className={`flex items-center gap-1 text-xs font-bold ${up ? 'text-emerald-500' : 'text-red-500'}`}>
                  {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {k.delta}
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-extrabold">
                {k.prefix}{k.value.toLocaleString()}
              </p>
              <p className="text-sm text-ink-500 dark:text-ink-300">{k.label}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Gráficos */}
      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <Panel title="Ventas e ingresos" className="xl:col-span-2" action={<span className="text-xs font-semibold text-ink-400">Últimos 6 meses</span>}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesByMonth} margin={{ top: 10, right: 6, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="gVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#77ab24" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#77ab24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
                <XAxis dataKey="month" stroke={axis} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={axis} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip content={<ChartTooltip prefix="$" />} />
                <Area type="monotone" dataKey="ventas" name="Ventas" stroke="#77ab24" strokeWidth={3} fill="url(#gVentas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Ventas por categoría">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={salesByCategory} dataKey="value" nameKey="name" innerRadius={58} outerRadius={86} paddingAngle={3} stroke="none">
                  {salesByCategory.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 flex flex-col gap-2">
            {salesByCategory.map((c) => (
              <li key={c.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink-500 dark:text-ink-300">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                  {c.name}
                </span>
                <span className="font-bold">{c.value}%</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Visitas + Citas próximas + Actividad */}
      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <Panel title="Visitas por día" className="xl:col-span-1">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyVisits} margin={{ top: 10, right: 6, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
                <XAxis dataKey="day" stroke={axis} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={axis} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(119,171,36,0.06)' }} />
                <Bar dataKey="visitas" name="Visitas" radius={[6, 6, 0, 0]} fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Próximas citas"
          action={<a href="#" className="flex items-center gap-1 text-xs font-bold text-brand-500">Ver todas <ArrowUpRight size={13} /></a>}
        >
          <ul className="flex flex-col divide-y divide-ink-200/60 dark:divide-white/5">
            {initialAppointments.slice(0, 4).map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-500/10 text-xs font-bold text-brand-600 dark:text-brand-300">
                    {a.time}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{a.name}</p>
                    <p className="text-xs text-ink-400">{a.reason}</p>
                  </div>
                </div>
                <StatusBadge status={a.status} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Actividad reciente">
          <ul className="flex flex-col gap-3">
            {recentActivity.map((act) => {
              const Icon = activityIcons[act.type] || Calendar
              return (
                <li key={act.id} className="flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-300">
                    <Icon size={15} />
                  </span>
                  <div>
                    <p className="text-sm leading-snug">{act.text}</p>
                    <p className="text-xs text-ink-400">{act.time}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Panel>
      </div>

      {/* Ventas recientes */}
      <div className="mt-6">
        <Panel
          title="Ventas recientes"
          padded={false}
          action={
            <Link to="/admin/ventas" className="flex items-center gap-1 text-xs font-bold text-brand-500">
              Ir a ventas <ArrowUpRight size={13} />
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink-200/60 text-xs uppercase tracking-wider text-ink-400 dark:border-white/5">
                <tr>
                  <th className="px-5 py-3 font-semibold">Cliente / Cédula</th>
                  <th className="hidden px-5 py-3 font-semibold md:table-cell">Aro</th>
                  <th className="px-5 py-3 text-right font-semibold">Aro</th>
                  <th className="px-5 py-3 text-right font-semibold">Lente</th>
                  <th className="hidden px-5 py-3 text-right font-semibold sm:table-cell">Cita</th>
                  <th className="px-5 py-3 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200/50 dark:divide-white/5">
                {initialSales.slice(0, 5).map((s) => {
                  const total = s.framePrice + s.lensPrice + s.examFee
                  return (
                    <tr key={s.id} className="hover:bg-ink-50/60 dark:hover:bg-ink-800/40">
                      <td className="px-5 py-3">
                        <p className="font-semibold">{s.client}</p>
                        <p className="font-mono text-xs text-ink-400">{s.cedula}</p>
                      </td>
                      <td className="hidden px-5 py-3 text-ink-500 dark:text-ink-300 md:table-cell">{s.frame}</td>
                      <td className="px-5 py-3 text-right font-medium">${s.framePrice}</td>
                      <td className="px-5 py-3 text-right font-medium">${s.lensPrice}</td>
                      <td className="hidden px-5 py-3 text-right sm:table-cell">${s.examFee}</td>
                      <td className="px-5 py-3 text-right font-display font-extrabold text-gradient">${total.toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  )
}
