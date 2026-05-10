export default function ArmadaPage() {
  const fleets = [
    { name: 'Mercedes Sprinter Premium', type: 'Minibus', capacity: 12, facilities: ['AC','WiFi','Charger USB','Reclining Seat','Toilet'], image: '/images/fleet/sprinter.jpg' },
    { name: 'Hiace Commuter Luxury', type: 'Minibus', capacity: 14, facilities: ['AC','WiFi','Charger USB','Reclining Seat'], image: '/images/fleet/hiace.jpg' },
    { name: 'Alphard Exclusive', type: 'MPV', capacity: 6, facilities: ['AC','WiFi','Charger USB','Massage Seat'], image: '/images/fleet/alphard.jpg' },
    { name: 'Bus Medium 25 Seater', type: 'Bus', capacity: 25, facilities: ['AC','WiFi','Toilet','Reclining Seat'], image: '/images/fleet/bus25.jpg' },
  ]

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-navy mb-8">Armada Kami</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {fleets.map((f, i) => (
            <div key={i} className="border rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
              <img src={f.image} alt={f.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{f.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{f.type} • {f.capacity} penumpang</p>
                <div className="flex flex-wrap gap-2">
                  {f.facilities.map((fac, j) => (
                    <span key={j} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">{fac}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}