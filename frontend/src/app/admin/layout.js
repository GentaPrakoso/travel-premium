// frontend/src/app/admin/layout.js
'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  FaTachometerAlt, FaCalendarAlt, FaBus, FaSuitcase, FaClipboardList, FaSignOutAlt, FaMoon, FaSun, FaBars, FaTimes
} from 'react-icons/fa'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuth, setIsAuth] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Cek autentikasi
  useEffect(() => {
    if (pathname === '/admin/login') {
      setMounted(true)
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/admin/login')
    } else {
      setIsAuth(true)
      setMounted(true)
    }
  }, [pathname, router])

  // Dark mode: baca dari localStorage saat pertama kali
  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else if (saved === 'false') {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    } else {
      // Default: ikuti preferensi sistem
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(prefersDark)
      if (prefersDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode.toString())
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/admin/login')
  }

  // Untuk halaman login, render tanpa sidebar
  if (pathname === '/admin/login' && mounted) {
    return <>{children}</>
  }

  if (!mounted || (!isAuth && pathname !== '/admin/login')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { href: '/admin/schedules', label: 'Jadwal', icon: <FaCalendarAlt /> },
    { href: '/admin/fleets', label: 'Armada', icon: <FaBus /> },
    { href: '/admin/packages', label: 'Paket Wisata', icon: <FaSuitcase /> },
    { href: '/admin/bookings', label: 'Booking', icon: <FaClipboardList /> },
  ]

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy dark:bg-gray-950 text-white transform transition-transform duration-300 overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto lg:min-h-screen`}
      >
        <div className="p-6 flex justify-between items-center">
          <Link href="/admin" className="text-2xl font-bold">
            <span className="text-gold">Travel</span>Premium
          </Link>
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>
        <nav className="mt-6 flex flex-col flex-1">
          {menuItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-6 py-3 mx-3 rounded-lg transition mb-1 ${
                pathname === item.href
                  ? 'bg-gold text-navy font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Dark mode toggle */}
          <div className="mx-6 mt-6 flex items-center justify-between">
            <span className="text-sm text-gray-300">Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`w-10 h-5 rounded-full flex items-center transition px-0.5 ${
                darkMode ? 'bg-gold justify-end' : 'bg-gray-600 justify-start'
              }`}
            >
              {darkMode ? (
                <FaSun className="text-navy text-xs" />
              ) : (
                <FaMoon className="text-gray-300 text-xs" />
              )}
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 mx-3 rounded-lg transition hover:bg-red-500/20 text-red-400 mt-auto mb-4"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Konten utama */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar mobile */}
        <header className="lg:hidden bg-white dark:bg-gray-900 shadow p-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="text-navy dark:text-white text-2xl">
            <FaBars />
          </button>
          <h1 className="font-bold text-navy dark:text-white">Admin Panel</h1>
        </header>
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-800 dark:text-white">
          {children}
        </main>
      </div>
    </div>
  )
}