# 👓 Óptica Sanchún

> Tu visión merece la mejor tecnología.

Sitio web completo y panel administrativo para una óptica premium, construido con un stack moderno de React. Estética inspirada en Apple, Ray-Ban, Warby Parker y Stripe: glassmorphism, animaciones fluidas, modo claro/oscuro y diseño 100% responsive (mobile first).

---

## 🚀 Stack Tecnológico

| Tecnología | Uso |
| --- | --- |
| **React 18 + Vite 6** | Base del proyecto y bundling ultrarrápido |
| **React Router DOM 6** | Enrutado público + panel administrativo |
| **Tailwind CSS v4** | Sistema de diseño con tokens de marca y dark mode |
| **Framer Motion** | Animaciones de entrada, scroll, hover y transiciones |
| **Recharts** | Gráficos del dashboard (área, barras, pastel) |
| **lucide-react** | Iconografía moderna y ligera |

---

## ✨ Características

### Landing pública (`/`)
- **Navbar** sticky con glassmorphism, animaciones hover y menú móvil.
- **Hero** con modelo de gafas "flotante" (SVG 3D + parallax) y CTA.
- **Promociones** con tarjetas degradadas animadas.
- **Anteojos Oftálmicos** — catálogo tipo e-commerce con filtros.
- **Gafas de Sol** — layout premium con producto destacado.
- **Lentes de Contacto** — categorías, marcas y beneficios.
- **Tecnologías** — iconografía animada (examen computarizado, antirreflejo, UV, luz azul…).
- **Sucursales** — tarjetas con dirección, horarios, teléfono e integración lista para Google Maps.
- **Solicitud de Cita** — formulario con validaciones y confirmación visual animada.

### Panel administrativo (`/admin`)
- **Sidebar** con indicador activo animado (`layoutId`) y topbar con búsqueda.
- **Dashboard** con KPIs, gráficos (ventas, categorías, visitas) y actividad reciente.
- **Citas** — CRUD completo + cambio de estados (Pendiente / Confirmada / Completada / Cancelada).
- **Productos** — CRUD completo (nombre, precio, categoría, color, stock, descripción).
- **Clientes**, **Promociones**, **Sucursales**, **Reportes** y **Configuración** (incluye toggle de tema).
- **Modo claro/oscuro** persistente en `localStorage`.

---

## 📁 Estructura

```
src/
├── components/
│   ├── admin/        → PageHeader, Panel, Modal, Form, StatusBadge
│   ├── cards/        → ProductCard
│   ├── layout/       → Navbar, Footer, Section, PublicLayout
│   ├── ui/           → Button, Badge, SectionHeader, ThemeToggle, Logo, PageLoader
│   └── visuals/      → FloatingGlasses, GlassesThumb (gráficos SVG)
├── context/          → ThemeContext (claro/oscuro)
├── data/             → mock data (products, promotions, branches, dashboard…)
├── lib/              → motion.js (variantes Framer Motion), cn.js
├── pages/
│   ├── LandingPage.jsx
│   └── admin/        → AdminLayout + 8 vistas del panel
├── sections/         → secciones de la landing
├── App.jsx           → rutas (con lazy loading del panel)
├── main.jsx
└── index.css         → design tokens + utilidades Tailwind
```

---

## 🛠️ Instalación y uso

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo → http://localhost:5173
npm run build    # build de producción (dist/)
npm run preview  # previsualiza el build
```

---

## ⚡ Optimización

- **Code-splitting**: el panel admin y Recharts se cargan bajo demanda (`React.lazy`).
- **Vendor chunks** separados (react / framer-motion / recharts) para mejor caché.
- La landing inicial no descarga el peso de los gráficos.

---

## 🗺️ Integración con Google Maps

Las tarjetas de sucursales enlazan a Google Maps mediante `mapsQuery` (`src/data/branches.js`).
Para incrustar mapas reales, sustituye el placeholder por un `<iframe>` de Google Maps Embed API usando tu API key.

---

Diseñado con precisión óptica · React · Framer Motion · Tailwind CSS
