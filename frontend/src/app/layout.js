// frontend/src/app/layout.js
import '../styles/globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

export const metadata = {
  title: 'Travel Premium - Jasa Travel Aman & Nyaman',
  description: 'Booking travel online dengan armada premium, antar jemput, paket wisata.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}