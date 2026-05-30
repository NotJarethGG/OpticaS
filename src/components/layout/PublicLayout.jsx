import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { pageTransition } from '../../lib/motion.js'

export default function PublicLayout() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <motion.main {...pageTransition}>
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}
