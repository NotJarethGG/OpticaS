import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import PublicLayout from './components/layout/PublicLayout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import PageLoader from './components/ui/PageLoader.jsx'

// El panel administrativo (incluye Recharts) se carga bajo demanda
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'))
const DashboardHome = lazy(() => import('./pages/admin/DashboardHome.jsx'))
const Appointments = lazy(() => import('./pages/admin/Appointments.jsx'))
const Clients = lazy(() => import('./pages/admin/Clients.jsx'))
const Sales = lazy(() => import('./pages/admin/Sales.jsx'))
const Products = lazy(() => import('./pages/admin/Products.jsx'))
const AdminPromotions = lazy(() => import('./pages/admin/AdminPromotions.jsx'))
const AdminBranches = lazy(() => import('./pages/admin/AdminBranches.jsx'))
const Reports = lazy(() => import('./pages/admin/Reports.jsx'))
const Settings = lazy(() => import('./pages/admin/Settings.jsx'))

export default function App() {
  const location = useLocation()

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname.split('/')[1] || 'home'}>
          {/* Landing pública */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          {/* Panel administrativo */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="citas" element={<Appointments />} />
            <Route path="clientes" element={<Clients />} />
            <Route path="ventas" element={<Sales />} />
            <Route path="productos" element={<Products />} />
            <Route path="promociones" element={<AdminPromotions />} />
            <Route path="sucursales" element={<AdminBranches />} />
            <Route path="reportes" element={<Reports />} />
            <Route path="configuracion" element={<Settings />} />
          </Route>

          {/* 404 → landing */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}
