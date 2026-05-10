// frontend/src/app/admin/bookings/page.js
'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { FaCheck, FaDownload } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    try {
      const res = await api.get('/admin/bookings')
      setBookings(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBookings() }, [])

  const handleVerify = async (id) => {
    await api.put(`/admin/bookings/${id}/verify`)
    toast.success('Pembayaran diverifikasi')
    fetchBookings()
  }

  const handleExport = async (format) => {
    try {
      const res = await api.get(`/admin/export-bookings?format=${format}`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `bookings.${format === 'excel' ? 'csv' : 'pdf'}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      toast.error('Gagal export')
    }
  }

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-blue-100 text-blue-800',
      processed: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || ''}`}>{status}</span>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-navy dark:text-white">Manajemen Booking</h1>
        <div className="flex gap-3">
          <button onClick={() => handleExport('excel')} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"><FaDownload /> Excel</button>
          <button onClick={() => handleExport('pdf')} className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"><FaDownload /> PDF</button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Kode</th>
              <th className="p-3 text-left">Pelanggan</th>
              <th className="p-3 text-left">Rute</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} className="border-t border-gray-100 dark:border-gray-700">
                <td className="p-3 font-mono">{b.booking_code}</td>
                <td className="p-3">{b.customer_name}<br/><span className="text-xs text-gray-500">{b.phone}</span></td>
                <td className="p-3">{b.origin} → {b.destination}</td>
                <td className="p-3 font-semibold">Rp{b.total_price?.toLocaleString()}</td>
                <td className="p-3">{getStatusBadge(b.status)}</td>
                <td className="p-3">
                  {b.status === 'paid' && (
                    <button onClick={() => handleVerify(b.id)} className="text-green-600 flex items-center gap-1">
                      <FaCheck /> Verifikasi
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}