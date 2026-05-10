# Travel Premium - Website Jasa Travel Modern

Website travel profesional dengan sistem booking online, admin dashboard, dan desain premium.

## Teknologi

- Frontend: Next.js 14, Tailwind CSS, Framer Motion, React Icons
- Backend: Node.js, Express, MySQL, JWT, Nodemailer, QR Code

## Instalasi & Menjalankan

1. Clone repositori
2. **Backend**
   - Masuk ke folder `backend`
   - Salin `.env.example` ke `.env` dan isi konfigurasi
   - Import `database.sql` ke MySQL
   - `npm install`
   - `npm run dev` (berjalan di port 5000)
3. **Frontend**
   - Masuk ke folder `frontend`
   - Salin `.env.local.example` ke `.env.local`
   - `npm install`
   - `npm run dev` (berjalan di port 3000)

## Akun Admin Default

- Email: admin@travelpremium.com
- Password: admin123

## Bila ada Admin baru

- Rubah password baru/diganti pada file generateHash.js dibackend.
- Masuk powershell dan ke folder backend.
- klik node generateHash.js.
- hasil kodenya copy dan paste pada password diMYSQL.