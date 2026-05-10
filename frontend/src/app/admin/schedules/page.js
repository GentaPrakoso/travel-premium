// frontend/src/app/admin/schedules/page.js
'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function SchedulesAdmin() {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    origin: '', destination: '', departure_time: '', arrival_time: '', price: '', available_seats: '', fleet_id: ''
  })
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const fetchSchedules = async () => {
    try {
      const res = await api.get('/admin/schedules')
      setSchedules(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSchedules() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await api.put(`/admin/schedules/${editingId}`, form)
        toast.success('Jadwal diperbarui')
      } else {
        await api.post('/admin/schedules', form)
        toast.success('Jadwal ditambahkan')
      }
      setShowForm(false)
      setEditingId(null)
      setForm({ origin: '', destination: '', departure_time: '', arrival_time: '', price: '', available_seats: '', fleet_id: '' })
      fetchSchedules()
    } catch (err) {
      toast.error('Gagal menyimpan jadwal')
    }
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setForm({
      origin: item.origin,
      destination: item.destination,
      departure_time: item.departure_time?.slice(0, 16),
      arrival_time: item.arrival_time?.slice(0, 16),
      price: item.price,
      available_seats: item.available_seats,
      fleet_id: item.fleet_id
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin hapus jadwal ini?')) {
      await api.delete(`/admin/schedules/${id}`)
      toast.success('Jadwal dihapus')
      fetchSchedules()
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-navy dark:text-white">Manajemen Jadwal</h1>
        <button
          onClick={() => { setEditingId(null); setForm({ origin: '', destination: '', departure_time: '', arrival_time: '', price: '', available_seats: '', fleet_id: '' }); setShowForm(true) }}
          className="bg-gold text-navy px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-500"
        >
          <FaPlus /> Tambah Jadwal
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Asal" value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} required className="border rounded-xl px-4 py-2" />
            <input type="text" placeholder="Tujuan" value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} required className="border rounded-xl px-4 py-2" />
            <input type="datetime-local" value={form.departure_time} onChange={e => setForm({...form, departure_time: e.target.value})} required className="border rounded-xl px-4 py-2" />
            <input type="datetime-local" value={form.arrival_time} onChange={e => setForm({...form, arrival_time: e.target.value})} required className="border rounded-xl px-4 py-2" />
            <input type="number" placeholder="Harga" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required className="border rounded-xl px-4 py-2" />
            <input type="number" placeholder="Kursi Tersedia" value={form.available_seats} onChange={e => setForm({...form, available_seats: e.target.value})} required className="border rounded-xl px-4 py-2" />
            <input type="number" placeholder="ID Armada" value={form.fleet_id} onChange={e => setForm({...form, fleet_id: e.target.value})} required className="border rounded-xl px-4 py-2" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-navy text-white px-6 py-2 rounded-lg">{editingId ? 'Update' : 'Simpan'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 px-6 py-2 rounded-lg">Batal</button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Asal</th><th className="p-3 text-left">Tujuan</th><th className="p-3 text-left">Berangkat</th>
              <th className="p-3 text-left">Harga</th><th className="p-3 text-left">Kursi</th><th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(s => (
              <tr key={s.id} className="border-t border-gray-100 dark:border-gray-700">
                <td className="p-3">{s.origin}</td>
                <td className="p-3">{s.destination}</td>
                <td className="p-3">{new Date(s.departure_time).toLocaleString()}</td>
                <td className="p-3">Rp{s.price}</td>
                <td className="p-3">{s.available_seats}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(s)} className="text-blue-600"><FaEdit /></button>
                  <button onClick={() => handleDelete(s.id)} className="text-red-500"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}