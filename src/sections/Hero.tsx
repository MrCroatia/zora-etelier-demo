import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const SLIDES = ['/images/hero-1.jpg', '/images/hero-2.jpg']

function SplitWord({ word, baseDelay, className }: { word: string; baseDelay: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden ${className ?? ''}`} style={{ paddingRight: '0.12em', marginRight: '-0.12em', paddingBottom: '0.08em', marginBottom: '-0.08em' }} aria-label={word}>
      {word.split('').map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="hero-char"
          style={{ animationDelay: `${baseDelay + i * 0.05}s` }}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const [slide, setSlide] = useState(0)
  const { scrollY } = useScroll()
  const yImg = useTransform(scrollY, [0, 800], [0, 120])
  const yText = useTransform(scrollY, [0, 800], [0, -80])

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* oversized brand word — behind image */}
      <motion.div
        style={{ y: yText }}
        className="absolute inset-x-0 top-[16%] md:top-[14%] text-center pointer-events-none select-none z-0"
      >
        <h1 className="font-display text-[#3c3835] leading-[0.85] tracking-[0.06em] text-[24vw] md:text-[19vw]">
          <SplitWord word="ZORA" baseDelay={0.25} />
        </h1>
      </motion.div>

      {/* arched portrait — center */}
      <motion.div style={{ y: yImg }} className="relative z-10 flex-1 flex items-end justify-center pt-[26vh] md:pt-[22vh]">
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[76vw] max-w-[320px] md:w-[26vw] md:max-w-[380px] aspect-[3/4.2] overflow-hidden rounded-t-full"
        >
          {SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Editorial hair portrait"
              className="absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out"
              style={{ opacity: slide === i ? 1 : 0, transitionDuration: '1600ms' }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* overlay word — in front of image */}
      <motion.div
        style={{ y: yText }}
        className="absolute inset-x-0 bottom-[24%] md:bottom-[20%] text-center pointer-events-none select-none z-20"
      >
        <span className="font-display italic text-[#bc773f] text-[9vw] md:text-[5.5vw] leading-none">
          <SplitWord word="atelier" baseDelay={1.1} />
        </span>
      </motion.div>

      {/* side meta — desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="hidden md:block absolute left-10 bottom-[22%] z-20 max-w-[220px]"
      >
        <p className="text-[13px] uppercase tracking-[0.25em] text-[#3c3835]/70 leading-relaxed">
          Women's hair atelier<br />Ilica · Zagreb
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        className="hidden md:block absolute right-10 bottom-[22%] z-20 text-right"
      >
        <p className="font-display text-2xl text-[#3c3835] leading-snug">
          Hair that feels<br />like you, only more.
        </p>
      </motion.div>

      {/* center meta — mobile */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="md:hidden absolute inset-x-0 top-[34%] z-20 text-center px-8"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#3c3835]/60 mb-4">
          Women's hair atelier · Ilica, Zagreb
        </p>
        <p className="font-display text-xl text-[#3c3835] leading-snug">
          Hair that feels like you,<br />only more.
        </p>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#3c3835]/50">Scroll</span>
        <span className="scroll-line block w-px h-10 bg-[#bc773f]" />
      </motion.div>

      {/* sand line decoration */}
      <svg className="absolute bottom-0 left-0 w-full z-0" height="1" aria-hidden>
        <line x1="0" y1="0" x2="100%" y2="0" stroke="#dec9b8" strokeWidth="1" />
      </svg>
    </section>
  )
}
