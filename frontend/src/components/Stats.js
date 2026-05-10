export default function Stats() {
  const stats = [
    { label: 'Pelanggan', value: '12,000+' },
    { label: 'Armada', value: '45+' },
    { label: 'Kota Tujuan', value: '20' },
    { label: 'Rating', value: '4.9' },
  ]
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map(s => (
          <div key={s.label} className="p-6">
            <div className="text-4xl font-bold text-navy">{s.value}</div>
            <div className="text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}