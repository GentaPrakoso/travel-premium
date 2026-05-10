// frontend/src/app/admin/page.js
'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { FaUsers, FaMoneyBillWave, FaCalendarCheck, FaBus } from 'react-icons/fa'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard')
        setStats(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Total Booking', value: stats?.total_bookings || 0, icon: <FaCalendarCheck className="text-blue-500" />, bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Pendapatan', value: `Rp${(stats?.total_revenue || 0).toLocaleString()}`, icon: <FaMoneyBillWave className="text-green-500" />, bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Customer', value: stats?.total_customers || 0, icon: <FaUsers className="text-purple-500" />, bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Jadwal Aktif', value: stats?.active_schedules || 0, icon: <FaBus className="text-orange-500" />, bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy dark:text-white mb-8">Dashboard</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow animate-pulse h-32"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((c, i) => (
            <div key={i} className={`${c.bg} p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{c.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{c.value}</p>
                </div>
                <div className="text-2xl">{c.icon}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {stats?.monthly && (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-navy dark:text-white">Booking Bulanan</h2>
          <div className="space-y-3">
            {stats.monthly.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">{item.month}</span>
                <span className="font-medium">{item.count} booking</span>
                <span className="text-gold font-semibold">Rp{item.revenue?.toLocaleString() || 0}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}