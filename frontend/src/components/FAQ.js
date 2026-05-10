// frontend/src/components/FAQ.js
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaMinus } from 'react-icons/fa'

const faqs = [
  {
    question: 'Bagaimana cara memesan travel?',
    answer: 'Anda bisa memesan langsung melalui website kami dengan mengisi form booking, atau menghubungi WhatsApp resmi kami.'
  },
  {
    question: 'Apakah armada dilengkapi AC dan WiFi?',
    answer: 'Seluruh armada kami dilengkapi AC, WiFi gratis, charger USB, dan reclining seat untuk kenyamanan Anda.'
  },
  {
    question: 'Bisakah saya mengubah jadwal setelah booking?',
    answer: 'Perubahan jadwal bisa dilakukan maksimal 24 jam sebelum keberangkatan dengan menghubungi customer service.'
  },
  {
    question: 'Bagaimana cara upload bukti pembayaran?',
    answer: 'Setelah mendapatkan kode booking, Anda akan menerima email berisi link untuk upload. Atau bisa melalui halaman cek booking.'
  },
  {
    question: 'Apakah ada antar jemput ke alamat?',
    answer: 'Ya, kami menyediakan layanan antar jemput gratis untuk area tertentu. Silakan isi titik jemput saat booking.'
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-navy mb-12">Pertanyaan Seputar Layanan Kami</h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center p-5 text-left font-medium text-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <span>{faq.question}</span>
                {openIndex === idx ? <FaMinus className="text-gold" /> : <FaPlus className="text-gold" />}
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="p-5 text-gray-600 bg-white">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}