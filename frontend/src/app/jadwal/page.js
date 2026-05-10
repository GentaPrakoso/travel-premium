'use client'
import { useState } from 'react'
import Link from 'next/link'

const dummySchedules = [
  { id: 1, origin: 'Jakarta', destination: 'Bandung', departure: '08:00', arrival: '10:30', price: 150000, seats: 12, fleet: 'Mercedes Sprinter' },
  { id: 2, origin: 'Jakarta', destination: 'Bandung', departure: '13:00', arrival: '15:30', price: 150000, seats: 10, fleet: 'Hiace Commuter' },
  { id: 3, origin: 'Jakarta', destination: 'Yogyakarta', departure: '09:00', arrival: '17:00', price: 350000, seats: 6, fleet: 'Alphard Exclusive' },
  { id: 4, origin: 'Bandung', destination: 'Jakarta', departure: '11:00', arrival: '13:30', price: 150000, seats: 14, fleet: 'Mercedes Sprinter' },
  { id: 5, origin: 'Jakarta', destination: 'Surabaya', departure: '07:00', arrival: '19:00', price: 450000, seats: 25, fleet: 'Bus Medium' },
]

export default function JadwalPage() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')

  // Filter sederhana (di frontend, data dummy)
  const filtered = dummySchedules.filter(s => {
    if (origin && !s.origin.toLowerCase().includes(origin.toLowerCase())) return false
    if (destination && !s.destination.toLowerCase().includes(destination.toLowerCase())) return false
    // date bisa diabaikan untuk dummy
    return true
  })

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-navy mb-8">Jadwal Travel</h1>

        {/* Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-50 p-4 rounded-xl">
          <input
            type="text" placeholder="Kota Asal" value={origin} onChange={e => setOrigin(e.target.value)}
            className="border rounded px-4 py-2 w-full md:w-auto"
          />
          <input
            type="text" placeholder="Kota Tujuan" value={destination} onChange={e => setDestination(e.target.value)}
            className="border rounded px-4 py-2 w-full md:w-auto"
          />
          <input
            type="date" value={date} onChange={e => setDate(e.target.value)}
            className="border rounded px-4 py-2 w-full md:w-auto"
          />
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full">
            <thead className="bg-navy text-white">
              <tr>
                <th className="py-3 px-4 text-left">Asal</th>
                <th className="py-3 px-4 text-left">Tujuan</th>
                <th className="py-3 px-4 text-left">Berangkat</th>
                <th className="py-3 px-4 text-left">Tiba</th>
                <th className="py-3 px-4 text-left">Harga</th>
                <th className="py-3 px-4 text-left">Kursi</th>
                <th className="py-3 px-4 text-left">Armada</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{s.origin}</td>
                  <td className="py-3 px-4">{s.destination}</td>
                  <td className="py-3 px-4">{s.departure}</td>
                  <td className="py-3 px-4">{s.arrival}</td>
                  <td className="py-3 px-4 text-gold font-bold">Rp{s.price.toLocaleString()}</td>
                  <td className="py-3 px-4">{s.seats} tersedia</td>
                  <td className="py-3 px-4">{s.fleet}</td>
                  <td className="py-3 px-4">
                    <Link href={`/booking?schedule=${s.id}`} className="bg-gold text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition">
                      Booking
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}