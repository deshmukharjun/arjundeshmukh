import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BentoGrid from './components/BentoGrid'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <div className="relative min-h-screen">
      <div className="gradient-orb gradient-orb-1" aria-hidden="true" />
      <div className="gradient-orb gradient-orb-2" aria-hidden="true" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <BentoGrid />
          <Work />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
