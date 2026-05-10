'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBooking() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({ origin, destination, date, passengers })
    router.push(`/jadwal?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="glass p-4 rounded-xl flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
      <div className="flex-1">
        <label className="text-sm text-gray-300">Kota Asal</label>
        <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} className="w-full bg-white/20 rounded px-3 py-2 text-white placeholder-gray-300" placeholder="Jakarta" required />
      </div>
      <div className="flex-1">
        <label className="text-sm text-gray-300">Kota Tujuan</label>
        <input type="text" value={destination} onChange={e => setDestination(e.target.value)} className="w-full bg-white/20 rounded px-3 py-2 text-white placeholder-gray-300" placeholder="Bandung" required />
      </div>
      <div className="flex-1">
        <label className="text-sm text-gray-300">Tanggal</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-white/20 rounded px-3 py-2 text-white" required />
      </div>
      <div className="flex-1">
        <label className="text-sm text-gray-300">Penumpang</label>
        <input type="number" min={1} value={passengers} onChange={e => setPassengers(e.target.value)} className="w-full bg-white/20 rounded px-3 py-2 text-white" />
      </div>
      <button type="submit" className="bg-gold text-navy font-bold px-6 py-3 rounded-xl hover:bg-white transition">Cari</button>
    </form>
  )
}