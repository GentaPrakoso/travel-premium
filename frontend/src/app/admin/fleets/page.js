// frontend/src/app/admin/fleets/page.js
'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function FleetsAdmin() {
  const [fleets, setFleets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    name: '',
    type: '',
    capacity: '',
    facilities: '', // nanti diparse, atau bisa langsung string
    status: 'active',
    image: null, // file object
    existing_image: '' // untuk preview saat edit
  })

  const fetchFleets = async () => {
    try {
      const res = await api.get('/admin/fleets')
      setFleets(res.data)
    } catch (err) {
      toast.error('Gagal memuat data armada')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFleets()
  }, [])

  // Handle form change
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setForm(prev => ({ ...prev, image: files[0] }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  // Reset form
  const resetForm = () => {
    setForm({
      name: '',
      type: '',
      capacity: '',
      facilities: '',
      status: 'active',
      image: null,
      existing_image: ''
    })
    setEditingId(null)
    setShowForm(false)
  }

  // Open form for create
  const handleCreate = () => {
    resetForm()
    setShowForm(true)
  }

  // Open form for edit
  const handleEdit = (item) => {
    setEditingId(item.id)
    setForm({
      name: item.name,
      type: item.type,
      capacity: item.capacity,
      facilities: item.facilities, // asumsikan string JSON atau array string
      status: item.status,
      image: null,
      existing_image: item.image
    })
    setShowForm(true)
  }

  // Delete fleet
  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus armada ini?')) return
    try {
      await api.delete(`/admin/fleets/${id}`)
      toast.success('Armada dihapus')
      fetchFleets()
    } catch (err) {
      toast.error('Gagal menghapus armada')
    }
  }

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('type', form.type)
    formData.append('capacity', form.capacity)
    formData.append('facilities', form.facilities)
    formData.append('status', form.status)
    if (form.image) {
      formData.append('image', form.image)
    } else if (editingId && form.existing_image) {
      formData.append('existing_image', form.existing_image)
    }

    try {
      if (editingId) {
        await api.put(`/admin/fleets/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Armada diperbarui')
      } else {
        await api.post('/admin/fleets', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Armada ditambahkan')
      }
      resetForm()
      fetchFleets()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Gagal menyimpan armada')
    }
  }

  // Helper untuk menampilkan fasilitas (jika string JSON)
  const renderFacilities = (facilities) => {
    try {
      const parsed = JSON.parse(facilities)
      if (Array.isArray(parsed)) {
        return parsed.join(', ')
      }
      return facilities
    } catch {
      return facilities
    }
  }

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-navy dark:text-white">Manajemen Armada</h1>
        <button
          onClick={handleCreate}
          className="bg-gold text-navy px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-500 transition"
        >
          <FaPlus /> Tambah Armada
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-navy dark:text-white">
                {editingId ? 'Edit Armada' : 'Tambah Armada Baru'}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Nama Armada</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
                    placeholder="Mis: Mercedes Sprinter Premium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Tipe</label>
                  <input
                    type="text"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
                    placeholder="Minibus / MPV / Bus"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Kapasitas</label>
                  <input
                    type="number"
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
                    placeholder="12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="active">Aktif</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Fasilitas (JSON format, mis: ["AC","WiFi"])</label>
                <textarea
                  name="facilities"
                  value={form.facilities}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
                  placeholder='["AC","WiFi","Charger USB"]'
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Foto Armada</label>
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

      {/* Tabel Armada */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Foto</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Tipe</th>
              <th className="p-3 text-left">Kapasitas</th>
              <th className="p-3 text-left">Fasilitas</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {fleets.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">Belum ada data armada</td>
              </tr>
            )}
            {fleets.map((item) => (
              <tr key={item.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-3">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded-lg" />
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">-</div>
                  )}
                </td>
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3">{item.type}</td>
                <td className="p-3">{item.capacity}</td>
                <td className="p-3 text-sm">{renderFacilities(item.facilities)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status === 'active' ? 'Aktif' : 'Maintenance'}
                  </span>
                </td>
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