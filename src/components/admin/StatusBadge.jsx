import Badge from '../ui/Badge.jsx'

export const statusConfig = {
  pendiente: { label: 'Pendiente', tone: 'amber' },
  confirmada: { label: 'Confirmada', tone: 'brand' },
  completada: { label: 'Completada', tone: 'emerald' },
  cancelada: { label: 'Cancelada', tone: 'red' },
}

export default function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.pendiente
  return (
    <Badge tone={cfg.tone}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {cfg.label}
    </Badge>
  )
}
