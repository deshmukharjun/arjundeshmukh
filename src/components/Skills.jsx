import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const listRef = useRef(null)

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
        listRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.2,
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
    <section id="work" ref={sectionRef} className="py-28 px-6 max-w-5xl mx-auto">
      <h2 ref={headingRef} className="text-3xl md:text-4xl font-semibold text-white mb-12">
        Skills & tools
      </h2>
      <div ref={listRef} className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="px-4 py-2 rounded-full bg-surface-800/80 text-surface-300 text-sm border border-surface-700/50 hover:border-surface-600 hover:text-surface-200 transition-colors"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  )
}
