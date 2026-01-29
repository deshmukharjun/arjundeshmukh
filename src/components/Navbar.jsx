import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile } from '../data/content'

const DEVANAGARI_NAME = 'अर्जुन देशमुख'
const ENGLISH_NAME = 'Arjun Deshmukh'
const LOCATION = 'Pune, Maharashtra'

function formatTime(date) {
  const h = date.getHours().toString().padStart(2, '0')
  const m = date.getMinutes().toString().padStart(2, '0')
  const s = date.getSeconds().toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState(() => formatTime(new Date()))
  const logoWrapRef = useRef(null)
  const devanagariRef = useRef(null)
  const englishRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setTime(formatTime(new Date()))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (englishRef.current) gsap.set(englishRef.current, { y: '100%', opacity: 0 })
  }, [])

  const handleLogoMouseEnter = () => {
    if (!logoWrapRef.current || !devanagariRef.current || !englishRef.current) return
    gsap.to(devanagariRef.current, { y: '-100%', opacity: 0, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(englishRef.current, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.3, ease: 'power2.out' })
  }

  const handleLogoMouseLeave = () => {
    if (!logoWrapRef.current || !devanagariRef.current || !englishRef.current) return
    gsap.to(englishRef.current, { y: '-100%', opacity: 0, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(devanagariRef.current, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-surface-950/80 backdrop-blur-xl border-b border-surface-800/50' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          ref={logoWrapRef}
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
          className="text-xl font-semibold tracking-tight text-white hover:text-surface-300 transition-colors overflow-hidden h-7 flex items-center shrink-0"
          style={{ fontFamily: 'Yatra One, sans-serif' }}
        >
          <span className="relative block h-7 overflow-hidden min-w-[160px]">
            <span
              ref={devanagariRef}
              className="absolute inset-0 flex items-center left-0 top-0 w-full h-full"
              style={{ fontFamily: 'Yatra One, sans-serif' }}
            >
              {DEVANAGARI_NAME}
            </span>
            <span
              ref={englishRef}
              className="absolute inset-0 flex items-center left-0 top-0 w-full h-full font-sans"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {ENGLISH_NAME}
            </span>
          </span>
        </a>
        <div className="flex items-center gap-4 sm:gap-6 text-surface-500 text-sm tabular-nums">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-surface-400 hover:text-white transition-colors font-medium"
          >
            Resume
          </a>
          <span>{LOCATION}</span>
          <span>{time}</span>
        </div>
      </nav>
    </header>
  )
}
