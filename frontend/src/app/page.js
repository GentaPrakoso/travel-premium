import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Gallery from '@/components/Gallery'
import FAQ from '@/components/FAQ'
import CTABanner from '@/components/CTABanner'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Testimonials />
      <Gallery />
      <FAQ />
      <CTABanner />
    </>
  )
}