import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { heroAudiences } from '../data/content'
import { profile } from '../data/content'

/** Split copy into lines by sentence for staggered animation */
function copyToLines(text) {
  if (!text?.trim()) return [text]
  return text
    .split(/(?<=[.!?;])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Render text with (this.app) and (that.one) as GitHub repo links when URLs provided */
function copyWithRepoLinks(line, repoThisApp, repoThatOne) {
  if (!repoThisApp || !repoThatOne) return line
  const thisApp = '(this.app)'
  const thatOne = '(that.one)'
  const out = []
  let s = line
  let key = 0
  while (s.length) {
    const i = s.indexOf(thisApp)
    const j = s.indexOf(thatOne)
    const first = (i === -1 ? Infinity : i) <= (j === -1 ? Infinity : j) ? thisApp : thatOne
    const idx = s.indexOf(first)
    if (idx === -1) {
      out.push(s)
      break
    }
    if (idx > 0) out.push(s.slice(0, idx))
    out.push(
      <a
        key={key++}
        href={first === thisApp ? repoThisApp : repoThatOne}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white underline underline-offset-2 decoration-surface-500 hover:decoration-white transition-colors"
      >
        {first}
      </a>
    )
    s = s.slice(idx + first.length)
  }
  return out
}

export default function Hero() {
  const [activeId, setActiveId] = useState(heroAudiences[0].id)
  const containerRef = useRef(null)
  const tabsRef = useRef(null)
  const copyRef = useRef(null)
  const isFirstMount = useRef(true)

  const active = heroAudiences.find((a) => a.id === activeId) ?? heroAudiences[0]
  const lines = copyToLines(active.copy)
  const showYoutube = active.youtube && profile.social?.youtube

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(tabsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      gsap.fromTo(copyRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: 'power3.out' })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    const el = copyRef.current
    if (!el) return
    gsap.set(el, { opacity: 1 })
    const lineEls = el.querySelectorAll('.hero-line')
    if (lineEls.length) {
      gsap.fromTo(
        lineEls,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
      )
    } else {
      gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' })
    }
  }, [activeId])

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 max-w-5xl mx-auto"
    >
      {/* Audience tabs */}
      <div
        ref={tabsRef}
        className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-10 md:mb-12 opacity-0"
        role="tablist"
        aria-label="Who is viewing"
      >
        {heroAudiences.map((audience) => (
          <button
            key={audience.id}
            type="button"
            role="tab"
            aria-selected={activeId === audience.id}
            onClick={() => setActiveId(audience.id)}
            className={`
              relative pb-1 font-medium transition-colors duration-200
              ${activeId === audience.id ? 'text-white' : 'text-surface-500 hover:text-surface-300'}
            `}
          >
            {audience.label}
            {activeId === audience.id && (
              <span className="absolute left-0 right-0 bottom-0 h-px bg-white" aria-hidden />
            )}
          </button>
        ))}
      </div>

      {/* Hero copy — key so content remounts on audience change; GSAP animates in */}
      <div key={activeId} ref={copyRef} className="opacity-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.15] max-w-3xl">
          {lines.length > 1 ? (
            lines.map((line, i) => (
              <span key={i} className="hero-line block">
                {copyWithRepoLinks(line, active.repoThisApp, active.repoThatOne)}
                {i < lines.length - 1 ? ' ' : ''}
              </span>
            ))
          ) : (
            <span className="hero-line block">
              {copyWithRepoLinks(active.copy, active.repoThisApp, active.repoThatOne)}
            </span>
          )}
        </h1>
        {showYoutube && (
          <div className="hero-line mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={profile.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-surface-400 hover:text-white font-medium text-sm transition-colors"
            >
              Watch my edits on YouTube
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {profile.social?.instagramArt && (
              <a
                href={profile.social.instagramArt}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-surface-400 hover:text-white font-medium text-sm transition-colors"
              >
                Art & 3D on Instagram
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-12">
        <a
          href="#work"
          className="inline-flex items-center px-6 py-3 rounded-full bg-white text-surface-950 font-medium text-sm hover:bg-surface-200 transition-colors"
        >
          View work
        </a>
        <a
          href="#contact"
          className="inline-flex items-center px-6 py-3 rounded-full border border-surface-600 text-surface-300 font-medium text-sm hover:border-surface-400 hover:text-white transition-colors"
        >
          Get in touch
        </a>
      </div>
    </section>
  )
}
