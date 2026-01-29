import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])

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
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.1 * i,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-28 px-6 max-w-5xl mx-auto">
      <h2 ref={headingRef} className="text-3xl md:text-4xl font-semibold text-white mb-16">
        Selected projects
      </h2>
      <div className="space-y-12">
        {projects.map((project, i) => (
          <article
            key={project.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group border border-surface-800/50 rounded-2xl p-8 md:p-10 bg-surface-900/30 hover:bg-surface-900/50 hover:border-surface-700/50 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-surface-400 text-base md:text-lg leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-surface-500 bg-surface-800/80 px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    className="text-sm font-medium text-surface-300 hover:underline hover:text-white"
                  >
                    Live site
                  </a>
                  <a
                    href={project.githubUrl}
                    className="text-sm font-medium text-surface-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              {project.image && (
                <div className="w-full md:w-64 h-40 rounded-xl bg-surface-800 overflow-hidden shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
