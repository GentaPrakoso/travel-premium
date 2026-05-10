import Link from 'next/link'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h4 className="text-2xl font-bold mb-4"><span className="text-gold">Travel</span>Premium</h4>
          <p className="text-gray-400">Travel aman, nyaman, dan tepat waktu dengan armada premium.</p>
        </div>
        <div>
          <h5 className="text-lg font-semibold mb-4">Navigasi</h5>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/jadwal">Jadwal</Link></li>
            <li><Link href="/armada">Armada</Link></li>
            <li><Link href="/kontak">Kontak</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-lg font-semibold mb-4">Layanan</h5>
          <ul className="space-y-2 text-gray-400">
            <li>Antar Jemput</li>
            <li>Carter Mobil</li>
            <li>Paket Wisata</li>
            <li>Travel Bandara</li>
          </ul>
        </div>
        <div>
          <h5 className="text-lg font-semibold mb-4">Ikuti Kami</h5>
          <div className="flex gap-4 text-2xl mb-4">
            <FaFacebook className="cursor-pointer hover:text-gold" />
            <FaInstagram className="cursor-pointer hover:text-gold" />
            <FaWhatsapp className="cursor-pointer hover:text-gold" />
          </div>
          <form className="flex flex-col gap-2">
            <input type="email" placeholder="Newsletter" className="bg-white/10 rounded px-3 py-2 text-white placeholder-gray-400" />
            <button className="bg-gold text-navy font-semibold px-4 py-2 rounded">Berlangganan</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Travel Premium. All rights reserved.
      </div>
    </footer>
  )
}