import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHead from '../components/SectionHead'
import { pauseSmoothScroll, resumeSmoothScroll } from '../lib/smoothScroll'

const ease = [0.22, 1, 0.36, 1] as const

type Item = {
  src: string
  name: string
  tag: string
  ratio: string
  /** desktop 12-col placement */
  place: string
}

const items: Item[] = [
  { src: '/images/gallery-1.jpg', name: 'Honey balayage', tag: 'Colour', ratio: 'aspect-[4/5]', place: 'md:col-start-1 md:col-span-6' },
  { src: '/images/gallery-2.jpg', name: 'Natural curls', tag: 'Cut & care', ratio: 'aspect-[3/4]', place: 'md:col-start-8 md:col-span-4 md:mt-40' },
  { src: '/images/gallery-3.jpg', name: 'Braided updo', tag: 'Occasion', ratio: 'aspect-[3/4]', place: 'md:col-start-2 md:col-span-4' },
  { src: '/images/gallery-4.jpg', name: 'In the chair', tag: 'Atelier', ratio: 'aspect-[3/2]', place: 'md:col-start-7 md:col-span-6' },
  { src: '/images/gallery-5.jpg', name: 'French bob', tag: 'Cut', ratio: 'aspect-[4/5]', place: 'md:col-start-1 md:col-span-5' },
  { src: '/images/gallery-6.jpg', name: 'Silk & waves', tag: 'Finish', ratio: 'aspect-[3/4]', place: 'md:col-start-7 md:col-span-4 md:mt-32' },
]

const pad = (i: number) => String(i + 1).padStart(2, '0')

function GalleryItem({ item, i, onOpen }: { item: Item; i: number; onOpen: (i: number) => void }) {
  return (
    <figure
      data-reveal
      data-reveal-delay={(i % 3) * 120}
      className={`gallery-item group items-start ${item.place} ${i % 2 === 1 ? 'w-[86%] ml-auto md:w-full md:ml-0' : ''}`}
    >
      <button
        type="button"
        onClick={() => onOpen(i)}
        className="block w-full text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bc773f]"
        aria-label={`View ${item.name} full size`}
      >
        <div className={`reveal-clip relative overflow-hidden w-full ${item.ratio}`}>
          <img
            src={item.src}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-[#dec9b8] pt-3">
          <span className="text-[12px] uppercase tracking-[0.18em] text-[#3c3835]/75 transition-colors duration-300 group-hover:text-[#bc773f]">
            {item.name}
            <span className="hidden md:inline text-[#3c3835]/40"> â€” {item.tag}</span>
          </span>
          <span className="text-[11px] tracking-[0.2em] text-[#3c3835]/40 transition-colors duration-300 group-hover:text-[#bc773f]">
            {pad(i)} / {pad(items.length - 1)}
          </span>
        </figcaption>
      </button>
    </figure>
  )
}

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const item = items[index]
  const touchX = useRef<number | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    // lock scroll: stop Lenis (owned by App) + hide native scrollbar
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    pauseSmoothScroll()
    return () => {
      window.removeEventListener('keydown', onKey)
      root.style.overflow = prevOverflow
      resumeSmoothScroll()
    }
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[100] bg-[#1a0e08]/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name}, image ${index + 1} of ${items.length}`}
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 48) (dx < 0 ? onNext : onPrev)()
        touchX.current = null
      }}
    >
      {/* counter */}
      <span className="absolute top-5 left-6 md:left-10 text-[11px] tracking-[0.28em] text-[#faf6f3]/50">
        {pad(index)} <span className="text-[#faf6f3]/25">/ {pad(items.length - 1)}</span>
      </span>

      {/* close */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label="Close gallery"
        className="absolute top-4 right-5 md:right-10 w-11 h-11 flex items-center justify-center text-[#faf6f3]/70 hover:text-[#bc773f] transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
          <path d="M1 1 L17 17 M17 1 L1 17" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      {/* prev / next */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous image"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-[#faf6f3]/60 hover:text-[#bc773f] transition-colors"
      >
        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
          <path d="M21 7 H2 M7 1 L1 7 L7 13" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next image"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-[#faf6f3]/60 hover:text-[#bc773f] transition-colors"
      >
        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
          <path d="M1 7 H20 M15 1 L21 7 L15 13" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      {/* image */}
      <div
        className="absolute inset-0 flex items-center justify-center px-6 md:px-24 py-16"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={item.src}
            src={item.src}
            alt={item.name}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.3, ease }}
            className="max-h-[74vh] max-w-full object-contain shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
          />
        </AnimatePresence>
      </div>

      {/* caption */}
      <div
        className="absolute bottom-0 inset-x-0 flex items-baseline justify-between gap-4 px-6 md:px-10 pb-6 md:pb-8 border-t border-[#faf6f3]/10 pt-5 mx-4 md:mx-10 mb-4 md:mb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-display text-lg md:text-2xl text-[#faf6f3]">{item.name}</span>
        <span className="text-[11px] uppercase tracking-[0.24em] text-[#bc773f]">{item.tag}</span>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % items.length)), [])
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length)), [])

  return (
    <section id="gallery" className="py-24 md:py-36 bg-[#f5ece5]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <SectionHead
            label="Selected Work"
            index="03"
            title={
              <>
                Hair, <span className="italic text-[#bc773f]">caught</span> mid-motion
              </>
            }
            className="max-w-2xl"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-[13px] leading-relaxed text-[#3c3835]/55 max-w-[26ch] md:text-right md:pb-2"
          >
            Six recent pieces from the floor â€” tap any frame to see it full size.
          </motion.p>
        </div>

        {/* editorial grid: varied spans, ratios and offsets instead of uniform columns */}
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-8 md:gap-y-16 items-start">
          {items.map((it, i) => (
            <GalleryItem key={it.src} item={it} i={i} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox index={open} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </section>
  )
}

