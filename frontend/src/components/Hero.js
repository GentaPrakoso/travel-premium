// frontend/src/components/Hero.js
'use client'
import { motion } from 'framer-motion'
import SearchBooking from './SearchBooking'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-start md:items-center justify-center bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-navy/70"></div>

      {/* Konten */}
      <div className="relative z-10 max-w-7xl mx-auto text-center text-white px-4 pt-24 md:pt-0 pb-12">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-6xl font-bold leading-tight"
        >
          Travel Nyaman, Aman, dan Tepat Waktu
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base md:text-xl text-gray-200 max-w-2xl mx-auto"
        >
          Nikmati perjalanan eksklusif dengan armada premium, layanan antar jemput, dan sistem booking online termudah.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col md:flex-row justify-center gap-4"
        >
          <a href="#booking" className="bg-gold text-navy px-8 py-3 rounded-full font-bold hover:bg-white transition text-sm md:text-base">
            Pesan Sekarang
          </a>
          <a href="/jadwal" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-navy transition text-sm md:text-base">
            Lihat Jadwal
          </a>
        </motion.div>

        <div className="mt-8 md:mt-12">
          <SearchBooking />
        </div>
      </div>
    </section>
  )
}