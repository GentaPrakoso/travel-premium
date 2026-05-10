'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function BookingPage() {
  const searchParams = useSearchParams()
  const selectedSchedule = searchParams.get('schedule') || ''

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    origin: 'Jakarta',
    destination: 'Bandung',
    pickup: '',
    passengers: 1,
    seatNumbers: '',
    paymentMethod: 'transfer',
    scheduleId: selectedSchedule,
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Di sini nanti kirim ke API backend
    alert(`Booking berhasil! Kode booking: TRV-${Math.random().toString(36).substring(2,8).toUpperCase()}`)
    setStep(3) // Selesai
  }

  if (step === 3) {
    return (
      <div className="pt-24 pb-16 text-center max-w-xl mx-auto px-4">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Berhasil!</h1>
        <p className="text-gray-700 mb-6">Kode booking Anda telah dikirim ke email. Silakan upload bukti pembayaran untuk konfirmasi.</p>
        <a href="/" className="bg-navy text-white px-6 py-3 rounded-full font-semibold">Kembali ke Home</a>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-navy mb-8">Form Booking Travel</h1>

        {/* Step Indicator */}
        <div className="flex mb-8">
          {[1,2].map(num => (
            <div key={num} className={`flex-1 h-2 rounded-full ${step >= num ? 'bg-gold' : 'bg-gray-200'} mx-1`}></div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Data Diri</h2>
              <input type="text" name="name" placeholder="Nama Lengkap" onChange={handleChange} required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold" />
              <input type="tel" name="phone" placeholder="Nomor HP" onChange={handleChange} required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold" />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold" />
              <button type="button" onClick={() => setStep(2)}
                className="w-full bg-navy text-white py-3 rounded-xl font-semibold hover:bg-blue-900">
                Lanjutkan
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Detail Perjalanan</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="origin" placeholder="Kota Asal" value={form.origin} onChange={handleChange} required
                  className="border rounded-xl px-4 py-3" />
                <input type="text" name="destination" placeholder="Kota Tujuan" value={form.destination} onChange={handleChange} required
                  className="border rounded-xl px-4 py-3" />
              </div>
              <input type="text" name="pickup" placeholder="Titik Jemput (Alamat)" onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3" />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" name="passengers" min="1" defaultValue={1} onChange={handleChange}
                  className="border rounded-xl px-4 py-3" />
                <input type="text" name="seatNumbers" placeholder="Pilih Kursi (mis. A1,A2)" onChange={handleChange}
                  className="border rounded-xl px-4 py-3" />
              </div>
              <select name="paymentMethod" onChange={handleChange} className="w-full border rounded-xl px-4 py-3">
                <option value="transfer">Transfer Bank</option>
                <option value="cash">Bayar di Tempat</option>
                <option value="qris">QRIS</option>
              </select>

              <div className="flex gap-4">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold">Kembali</button>
                <button type="submit"
                  className="flex-1 bg-gold text-navy py-3 rounded-xl font-bold hover:bg-yellow-500">
                  Selesaikan Booking
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}