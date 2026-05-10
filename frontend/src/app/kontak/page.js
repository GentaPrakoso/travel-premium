export default function KontakPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-navy mb-6">Hubungi Kami</h1>
          <form className="space-y-4">
            <input type="text" placeholder="Nama" className="w-full border rounded-xl px-4 py-3" />
            <input type="email" placeholder="Email" className="w-full border rounded-xl px-4 py-3" />
            <input type="text" placeholder="Subjek" className="w-full border rounded-xl px-4 py-3" />
            <textarea rows={4} placeholder="Pesan Anda" className="w-full border rounded-xl px-4 py-3"></textarea>
            <button className="bg-gold text-navy font-bold px-8 py-3 rounded-xl hover:bg-yellow-500">Kirim Pesan</button>
          </form>
        </div>
        <div>
          <div className="mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
              width="100%" height="300" style={{ border:0 }} allowFullScreen="" loading="lazy"
              className="rounded-xl"
            ></iframe>
          </div>
          <div className="space-y-3 text-gray-700">
            <p><strong>Alamat:</strong> Jl. Sudirman No. 123, Jakarta Pusat</p>
            <p><strong>Telepon:</strong> (021) 12345678</p>
            <p><strong>Email:</strong> info@travelpremium.com</p>
            <p><strong>Jam Operasional:</strong> Senin - Minggu, 06:00 - 22:00</p>
          </div>
        </div>
      </div>
    </div>
  )
}