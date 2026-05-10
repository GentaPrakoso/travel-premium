import Link from 'next/link'

const packages = [
  {
    id: 1,
    name: 'Wisata Bandung 2 Hari',
    destination: 'Bandung',
    duration: '2 Hari 1 Malam',
    price: 850000,
    itinerary: 'Day 1: Kawah Putih, Glamping Lakeside. Day 2: Farmhouse Lembang, Floating Market.',
    image: '/images/packages/bandung.jpg'
  },
  {
    id: 2,
    name: 'Eksplorasi Yogyakarta',
    destination: 'Yogyakarta',
    duration: '3 Hari 2 Malam',
    price: 1350000,
    itinerary: 'Day 1: Malioboro, Keraton. Day 2: Borobudur, Prambanan. Day 3: Pantai Parangtritis.',
    image: '/images/packages/yogya.jpg'
  },
]

export default function PaketWisataPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-navy mb-8">Paket Wisata</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map(p => (
            <div key={p.id} className="border rounded-2xl overflow-hidden shadow flex flex-col md:flex-row">
              <img src={p.image} alt={p.name} className="w-full md:w-1/3 h-56 object-cover" />
              <div className="p-6 md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">{p.name}</h2>
                <p className="text-gray-500 mb-1">{p.duration} • {p.destination}</p>
                <p className="text-gold font-bold text-xl mb-3">Rp{p.price.toLocaleString()}/orang</p>
                <p className="text-gray-700 mb-4">{p.itinerary}</p>
                <Link href={`/booking?package=${p.id}`} className="bg-navy text-white px-6 py-2 rounded-full inline-block hover:bg-blue-900">
                  Booking Paket
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}