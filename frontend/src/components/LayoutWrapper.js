// frontend/src/components/LayoutWrapper.js
'use client'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()

  // Navbar & Footer TIDAK ditampilkan HANYA di halaman admin (kecuali halaman login)
  const isAdminRoute =
    pathname.startsWith('/admin') && pathname !== '/admin/login'

  return (
    <>
      <Toaster position="top-center" />
      {!isAdminRoute && <Navbar />}
      <main className={`flex-grow ${isAdminRoute ? 'pt-0' : ''}`}>{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  )
}