// frontend/src/components/Gallery.js
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const images = [
  { src: '/images/fleet/sprinter.jpg', alt: 'Mercedes Sprinter' },
  { src: '/images/fleet/hiace.jpg', alt: 'Hiace Commuter' },
  { src: '/images/fleet/alphard.jpg', alt: 'Alphard Exclusive' },
  { src: '/images/fleet/bus25.jpg', alt: 'Bus Medium' },
  // tambahkan gambar perjalanan dari folder public/images
  { src: '/images/gallery/travel1.jpg', alt: 'Perjalanan nyaman' },
  { src: '/images/gallery/travel2.jpg', alt: 'Armada di jalan tol' },
]

export default function Gallery() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  const next = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-navy mb-4">Galeri Armada & Perjalanan</h2>
        <p className="text-gray-600 mb-10">Lihat sendiri kenyamanan armada premium kami.</p>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={images[current].src}
                alt={images[current].alt}
                className="w-full h-80 object-cover"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
          >
            <FaChevronLeft className="text-navy" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
          >
            <FaChevronRight className="text-navy" />
          </button>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition ${idx === current ? 'bg-gold scale-125' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}