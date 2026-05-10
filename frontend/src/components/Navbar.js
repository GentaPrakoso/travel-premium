'use client'
import { useState } from 'react'
import Link from 'next/link'
import useScrollPosition from '@/hooks/useScrollPosition'
import { HiMenu, HiX } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/jadwal', label: 'Jadwal' },
  { href: '/armada', label: 'Armada' },
  { href: '/paket-wisata', label: 'Paket Wisata' },
  { href: '/booking', label: 'Booking' },
  { href: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
  const scrollY = useScrollPosition()
  const [open, setOpen] = useState(false)
  const solid = scrollY > 50

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${solid ? 'bg-white shadow-lg' : 'bg-transparent'} ${solid ? 'text-gray-900' : 'text-white'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className={solid ? 'text-navy' : 'text-white'}>Travel</span><span className="text-gold">Premium</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(item => (
            <Link key={item.href} href={item.href} className={`font-medium hover:text-gold transition-colors`}>
              {item.label}
            </Link>
          ))}
          <Link href="/admin/login" className="bg-gold text-navy px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-navy transition">
            Login Admin
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white shadow-xl">
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map(item => (
                <Link key={item.href} href={item.href} className="text-gray-800 hover:text-gold font-medium" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Link href="/admin/login" className="bg-navy text-white py-2 px-4 rounded text-center" onClick={() => setOpen(false)}>Login Admin</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}