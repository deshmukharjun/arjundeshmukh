import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { workItems } from '../data/content'
import DevicePhone from './DevicePhone'
import DeviceLaptop from './DeviceLaptop'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const listRef = useRef(null)
  const previewRef = useRef(null)
  const deviceWrapRef = useRef(null)
  const [activeId, setActiveId] = useState(workItems[0]?.id ?? null)
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false)
  const activeItem = workItems.find((w) => w.id === activeId) ?? workItems[0]

  const openMobilePreview = (item) => {
    setActiveId(item.id)
    setMobilePreviewOpen(true)
  }

  const closeMobilePreview = () => setMobilePreviewOpen(false)

  // Subtle fade when switching work item (desktop)
  useEffect(() => {
    if (!deviceWrapRef.current) return
    gsap.fromTo(deviceWrapRef.current, { opacity: 0.7 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
  }, [activeId])

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
        listRef.current,
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      gsap.fromTo(
        previewRef.current,
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
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

  const devicePreview = (
    <div ref={deviceWrapRef} key={activeId}>
      {activeItem.device === 'phone' ? (
        <DevicePhone />
      ) : (
        <DeviceLaptop />
      )}
    </div>
  )

  const devicePreviewContent = (
    <div key={activeId}>
      {activeItem.device === 'phone' ? (
        <DevicePhone />
      ) : (
        <DeviceLaptop />
      )}
    </div>
  )

  return (
    <section id="work" ref={sectionRef} className="py-20 md:py-28 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-semibold text-white mb-12 md:mb-16">
          My work
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* Left — project list */}
          <div ref={listRef} className="flex-1 w-full lg:max-w-md space-y-0">
            {workItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => !mobilePreviewOpen && setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                onClick={() => {
                  if (window.innerWidth < 1024) openMobilePreview(item)
                }}
                className="w-full text-left py-4 sm:py-5 px-0 border-b border-surface-800/80 group flex items-baseline justify-between gap-4 transition-colors duration-200 hover:border-surface-600 touch-manipulation"
              >
                <span
                  className={`text-base sm:text-lg md:text-xl font-medium transition-colors duration-200 ${
                    activeId === item.id ? 'text-white' : 'text-surface-400 group-hover:text-surface-300'
                  }`}
                >
                  {item.title}
                </span>
                <span className="text-surface-500 text-sm shrink-0">{item.year}</span>
              </button>
            ))}
          </div>

          {/* Right — device preview (desktop only) */}
          <div
            ref={previewRef}
            className="hidden lg:flex flex-1 w-full lg:min-h-[480px] items-center justify-center xl:justify-end lg:sticky lg:top-24"
          >
            {devicePreview}
          </div>
        </div>

        {/* Mobile overlay — device on top of list with close button */}
        {mobilePreviewOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden bg-surface-950/95 backdrop-blur-sm flex flex-col"
            aria-modal="true"
            role="dialog"
            aria-label="Work preview"
          >
            <div className="flex-none flex justify-end p-4 sm:p-5 shrink-0">
              <button
                type="button"
                onClick={closeMobilePreview}
                className="w-11 h-11 rounded-full bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-300 hover:text-white hover:bg-surface-700 transition-colors touch-manipulation"
                aria-label="Close preview"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center px-4 pb-8 overflow-auto min-h-0">
              {devicePreviewContent}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
