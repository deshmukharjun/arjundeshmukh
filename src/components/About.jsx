import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-28 px-6 max-w-5xl mx-auto">
      <h2 ref={headingRef} className="text-3xl md:text-4xl font-semibold text-white mb-8">
        About
      </h2>
      <div ref={textRef} className="max-w-2xl space-y-6 text-surface-400 text-lg leading-relaxed">
        <p>{profile.bio}</p>
        <p>
          I focus on building interfaces that feel fast, accessible, and delightful. When I'm not coding,
          I'm exploring new tools and staying curious about what's next on the web.
        </p>
        <p className="text-surface-500 text-base">
          Based in {profile.location}.
        </p>
      </div>
    </section>
  )
}
