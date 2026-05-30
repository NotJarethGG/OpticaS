export const kpis = [
  { id: 'citas', label: 'Citas del día', value: 18, delta: '+12%', trend: 'up', icon: 'CalendarCheck', accent: 'brand' },
  { id: 'clientes', label: 'Clientes registrados', value: 2486, delta: '+4.2%', trend: 'up', icon: 'Users', accent: 'accent' },
  { id: 'productos', label: 'Productos disponibles', value: 342, delta: '-1.1%', trend: 'down', icon: 'Glasses', accent: 'violet' },
  { id: 'ventas', label: 'Ventas mensuales', value: 48230, prefix: '$', delta: '+18%', trend: 'up', icon: 'TrendingUp', accent: 'emerald' },
]

export const salesByMonth = [
  { month: 'Ene', ventas: 28400, citas: 210 },
  { month: 'Feb', ventas: 31200, citas: 245 },
  { month: 'Mar', ventas: 35800, citas: 268 },
  { month: 'Abr', ventas: 33100, citas: 252 },
  { month: 'May', ventas: 41200, citas: 301 },
  { month: 'Jun', ventas: 48230, citas: 356 },
]

export const salesByCategory = [
  { name: 'Oftálmicos', value: 46, color: '#77ab24' },
  { name: 'Gafas de Sol', value: 31, color: '#34d399' },
  { name: 'Lentes Contacto', value: 23, color: '#7c3aed' },
]

export const weeklyVisits = [
  { day: 'Lun', visitas: 42 },
  { day: 'Mar', visitas: 51 },
  { day: 'Mié', visitas: 38 },
  { day: 'Jue', visitas: 65 },
  { day: 'Vie', visitas: 72 },
  { day: 'Sáb', visitas: 88 },
  { day: 'Dom', visitas: 24 },
]

export const initialAppointments = [
  { id: 'C-1042', name: 'Lucía Hernández', phone: '+52 55 1122 3344', date: '2026-05-29', time: '09:30', reason: 'Examen visual', branch: 'Sanchún Centro', status: 'confirmada' },
  { id: 'C-1043', name: 'Mateo Ríos', phone: '+52 55 9988 7766', date: '2026-05-29', time: '11:00', reason: 'Ajuste de montura', branch: 'Sanchún Norte', status: 'pendiente' },
  { id: 'C-1044', name: 'Sofía Delgado', phone: '+52 55 4455 6677', date: '2026-05-29', time: '12:15', reason: 'Lentes de contacto', branch: 'Sanchún Centro', status: 'completada' },
  { id: 'C-1045', name: 'Daniel Vargas', phone: '+52 55 7788 9900', date: '2026-05-30', time: '10:00', reason: 'Renovación de receta', branch: 'Sanchún Sur', status: 'pendiente' },
  { id: 'C-1046', name: 'Valentina Cruz', phone: '+52 55 3344 5566', date: '2026-05-30', time: '16:45', reason: 'Gafas de sol graduadas', branch: 'Sanchún Norte', status: 'cancelada' },
  { id: 'C-1047', name: 'Emilio Santos', phone: '+52 55 2233 4455', date: '2026-05-31', time: '13:30', reason: 'Control anual', branch: 'Sanchún Centro', status: 'confirmada' },
]

export const initialClients = [
  { id: 'CL-001', cedula: '0102345678', name: 'Lucía Hernández', email: 'lucia.h@mail.com', phone: '+52 55 1122 3344', visits: 7, lastVisit: '2026-05-12', spent: 1240, tier: 'Oro' },
  { id: 'CL-002', cedula: '1719284756', name: 'Mateo Ríos', email: 'mateo.rios@mail.com', phone: '+52 55 9988 7766', visits: 3, lastVisit: '2026-04-28', spent: 480, tier: 'Plata' },
  { id: 'CL-003', cedula: '0934512678', name: 'Sofía Delgado', email: 'sofia.d@mail.com', phone: '+52 55 4455 6677', visits: 12, lastVisit: '2026-05-20', spent: 2310, tier: 'Platino' },
  { id: 'CL-004', cedula: '1102938475', name: 'Daniel Vargas', email: 'dvargas@mail.com', phone: '+52 55 7788 9900', visits: 2, lastVisit: '2026-03-15', spent: 220, tier: 'Plata' },
  { id: 'CL-005', cedula: '1758493021', name: 'Valentina Cruz', email: 'vale.cruz@mail.com', phone: '+52 55 3344 5566', visits: 5, lastVisit: '2026-05-02', spent: 890, tier: 'Oro' },
]

// Ventas: cada venta desglosa el precio del aro, del lente y de la cita (examen),
// se asocia a un cliente por su cédula y a una cita (folio).
export const initialSales = [
  { id: 'V-2001', cedula: '0102345678', client: 'Lucía Hernández', frame: 'Gucci · GG Acetate', framePrice: 245, lensType: 'Antirreflejo + Anti-blue', lensPrice: 60, appointmentId: 'C-1042', examFee: 0, date: '2026-05-28', status: 'pagada' },
  { id: 'V-2002', cedula: '0934512678', client: 'Sofía Delgado', frame: 'Alpi · Titanium Flex', framePrice: 159, lensType: 'Fotocromático', lensPrice: 95, appointmentId: 'C-1044', examFee: 0, date: '2026-05-27', status: 'pagada' },
  { id: 'V-2003', cedula: '1719284756', client: 'Mateo Ríos', frame: 'Converse · All Star', framePrice: 119, lensType: 'Monofocal AR', lensPrice: 45, appointmentId: 'C-1043', examFee: 20, date: '2026-05-26', status: 'pendiente' },
  { id: 'V-2004', cedula: '1758493021', client: 'Valentina Cruz', frame: 'Carrera · Bold Round', framePrice: 135, lensType: 'Progresivo', lensPrice: 140, appointmentId: 'C-1046', examFee: 0, date: '2026-05-25', status: 'pagada' },
  { id: 'V-2005', cedula: '1102938475', client: 'Daniel Vargas', frame: 'Ray-Ban · Square', framePrice: 175, lensType: 'Antirreflejo', lensPrice: 55, appointmentId: 'C-1045', examFee: 20, date: '2026-05-24', status: 'pendiente' },
]

export const recentActivity = [
  { id: 1, text: 'Nueva cita confirmada — Lucía Hernández', time: 'Hace 5 min', type: 'cita' },
  { id: 2, text: 'Venta registrada — Solaris Pilot ($219)', time: 'Hace 22 min', type: 'venta' },
  { id: 3, text: 'Cliente nuevo — Emilio Santos', time: 'Hace 1 h', type: 'cliente' },
  { id: 4, text: 'Stock bajo — Vector Air (9 uds.)', time: 'Hace 2 h', type: 'alerta' },
  { id: 5, text: 'Promoción activada — 2x1 Oftálmicos', time: 'Hace 4 h', type: 'promo' },
]
