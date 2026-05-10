// frontend/src/components/CTABanner.js
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTABanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-navy to-blue-900 text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Siap Bepergian dengan Aman & Nyaman?
        </motion.h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Pesan sekarang dan dapatkan potongan harga untuk perjalanan pertama Anda. Armada premium, pelayanan bintang lima.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/booking" className="bg-gold text-navy px-8 py-3 rounded-full font-bold hover:bg-white transition-transform hover:scale-105">
            Booking Sekarang
          </Link>
          <Link href="/kontak" className="border border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-navy transition-transform hover:scale-105">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  )
}