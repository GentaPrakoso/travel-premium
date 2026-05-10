export default function TentangPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-navy mb-8">Tentang Travel Premium</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Profil Perusahaan</h2>
            <p className="text-gray-700 leading-relaxed">
              Travel Premium adalah perusahaan jasa transportasi darat yang berfokus pada kenyamanan, keamanan, dan ketepatan waktu. 
              Berdiri sejak 2018, kami telah melayani lebih dari 12.000 pelanggan dengan armada modern dan tim driver profesional.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Visi</h3>
            <p className="text-gray-700">Menjadi penyedia jasa travel terpercaya dan premium di Indonesia.</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Misi</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Menyediakan armada terawat dengan fasilitas lengkap.</li>
              <li>Memberikan pelayanan ramah dan profesional.</li>
              <li>Menjamin keamanan dan kenyamanan setiap perjalanan.</li>
              <li>Terus berinovasi dalam sistem booking online.</li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-2xl p-6 flex items-center justify-center">
            <img src="/images/about-team.jpg" alt="Tim Travel Premium" className="rounded-xl shadow" />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Keunggulan Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🛡️', title: 'Aman', desc: 'Driver berpengalaman & armada terawat' },
              { icon: '⏰', title: 'Tepat Waktu', desc: 'Keberangkatan sesuai jadwal' },
              { icon: '🛋️', title: 'Nyaman', desc: 'Kursi reclining, AC, WiFi' },
              { icon: '💳', title: 'Booking Mudah', desc: 'Pesan online 24 jam' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 border rounded-xl hover:shadow">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Perjalanan Kami</h2>
          <div className="space-y-6">
            {[
              { year: '2018', desc: 'Berdiri dengan 5 armada pertama' },
              { year: '2020', desc: 'Ekspansi ke 10 kota, luncurkan booking online' },
              { year: '2022', desc: 'Mendapatkan sertifikasi Kemenhub' },
              { year: '2024', desc: '12.000+ pelanggan, 45 armada, 20 kota tujuan' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="bg-gold text-white font-bold px-4 py-1 rounded-full text-sm">{item.year}</span>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}