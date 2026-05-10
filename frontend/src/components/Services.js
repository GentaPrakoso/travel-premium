import { FaCar, FaSuitcase, FaPlane, FaMapMarkedAlt } from 'react-icons/fa'

const services = [
  { icon: FaCar, title: 'Antar Jemput', desc: 'Door to door service' },
  { icon: FaSuitcase, title: 'Carter Mobil', desc: 'Fleksibel dan eksklusif' },
  { icon: FaMapMarkedAlt, title: 'Paket Wisata', desc: 'Tour + transport' },
  { icon: FaPlane, title: 'Travel Bandara', desc: 'Tepat waktu' },
]

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-navy">Layanan Unggulan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {services.map((s, i) => (
            <div key={i} className="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition">
              <s.icon className="text-4xl text-gold mx-auto mb-4" />
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}