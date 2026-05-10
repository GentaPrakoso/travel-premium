// frontend/src/app/admin/packages/page.js
'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function PackagesAdmin() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    name: '',
    destination: '',
    duration: '',
    price: '',
    itinerary: '',
    image: null,
    existing_image: ''
  })

  const fetchPackages = async () => {
    try {
      const res = await api.get('/admin/packages')
      setPackages(res.data)
    } catch (err) {
      toast.error('Gagal memuat data paket wisata')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPackages()
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setForm(prev => ({ ...prev, image: files[0] }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const resetForm = () => {
    setForm({
      name: '',
      destination: '',
      duration: '',
      price: '',
      itinerary: '',
      image: null,
      existing_image: ''
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleCreate = () => {
    resetForm()
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setForm({
      name: item.name,
      destination: item.destination,
      duration: item.duration,
      price: item.price,
      itinerary: item.itinerary,
      image: null,
      existing_image: item.image
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus paket wisata ini?')) return
    try {
      await api.delete(`/admin/packages/${id}`)
      toast.success('Paket dihapus')
      fetchPackages()
    } catch (err) {
      toast.error('Gagal menghapus paket')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('destination', form.destination)
    formData.append('duration', form.duration)
    formData.append('price', form.price)
    formData.append('itinerary', form.itinerary)
    if (form.image) {
      formData.append('image', form.image)
    } else if (editingId && form.existing_image) {
      formData.append('existing_image', form.existing_image)
    }

    try {
      if (editingId) {
        await api.put(`/admin/packages/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Paket wisata diperbarui')
      } else {
        await api.post('/admin/packages', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Paket wisata ditambahkan')
      }
      resetForm()
      fetchPackages()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Gagal menyimpan paket')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-navy dark:text-white">Manajemen Paket Wisata</h1>
        <button
          onClick={handleCreate}
          className="bg-gold text-navy px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-500 transition"
        >
          <FaPlus /> Tambah Paket
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-navy dark:text-white">
                {editingId ? 'Edit Paket Wisata' : 'Tambah Paket Wisata'}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Nama Paket</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
                    placeholder="Wisata Bandung 2 Hari"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Destinasi</label>
                  <input
                    type="text"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
                    placeholder="Bandung"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Durasi</label>
                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
                    placeholder="2 Hari 1 Malam"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Harga (Rp)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
                    placeholder="850000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Itinerary</label>
                <textarea
                  name="itinerary"
                  value={form.itinerary}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
                  placeholder="Day 1: ... Day 2: ..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Foto Paket</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {editingId && form.existing_image && !form.image && (
                  <div className="mt-2">
                    <img
                      src={form.existing_image}
                      alt="existing"
                      className="h-20 rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-400 mt-1">Foto saat ini</p>
                  </div>
                )}
                {form.image && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(form.image)}
                      alt="preview"
                      className="h-20 rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-400 mt-1">Preview foto baru</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-navy text-white rounded-lg font-semibold hover:bg-blue-900"
                >
                  {editingId ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabel Paket Wisata */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Foto</th>
              <th className="p-3 text-left">Nama Paket</th>
              <th className="p-3 text-left">Destinasi</th>
              <th className="p-3 text-left">Durasi</th>
              <th className="p-3 text-left">Harga</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {packages.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">Belum ada data paket wisata</td>
              </tr>
            )}
            {packages.map((item) => (
              <tr key={item.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-3">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded-lg" />
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">-</div>
                  )}
                </td>
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3">{item.destination}</td>
                <td className="p-3">{item.duration}</td>
                <td className="p-3 font-semibold text-gold">Rp{Number(item.price).toLocaleString()}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}