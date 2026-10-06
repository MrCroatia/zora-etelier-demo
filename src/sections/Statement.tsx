import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const MANIFESTO: { text: string; em?: boolean }[] = [
  { text: 'One' }, { text: 'guest' }, { text: 'at' }, { text: 'a' }, { text: 'time' },
  { text: '—' }, { text: 'two' }, { text: 'hands' }, { text: 'on' }, { text: 'one' }, { text: 'head,' },
  { text: 'and' }, { text: 'as' }, { text: 'long' }, { text: 'as' }, { text: 'it' }, { text: 'takes.', em: true },
]

const PRINCIPLES = [
  {
    n: 'i',
    title: 'Consultation first',
    body: 'We talk before we touch — colour is patched and planned, never guessed.',
  },
  {
    n: 'ii',
    title: 'Unhurried chairs',
    body: 'One guest at a time. Nobody is ever double-booked or handed to a junior.',
  },
  {
    n: 'iii',
    title: 'Yours to keep',
    body: 'You leave with a routine you can actually repeat at home, not just a blow-dry.',
  },
]

/**
 * The bridge between the hero and the rest of the page.
 * A rising arch (echoing the hero portrait's rounded top) lifts out of the
 * hero, the tone steps from cream to sand, and the manifesto reveals word
 * by word as you scroll into the site.
 */
export default function Statement() {
  return (
    <section className="relative">
      {/* hairline arch floating just above the filled one */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-[14px] h-[9vw] min-h-[52px] border-t border-[#dec9b8] [border-radius:50%_50%_0_0/100%_100%_0_0]"
      />
      {/* filled arch — rises out of the hero */}
      <div
        aria-hidden
        className="h-[9vw] min-h-[52px] bg-[#f5ece5] [border-radius:50%_50%_0_0/100%_100%_0_0]"
      />

      <div className="bg-[#f5ece5] pt-16 md:pt-24 pb-24 md:pb-36">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          {/* eyebrow with short rules */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease }}
            className="flex items-center justify-center gap-5 mb-10 md:mb-14"
          >
            <span className="h-px w-10 md:w-16 bg-[#dec9b8]" />
            <span className="text-[11px] uppercase tracking-[0.32em] text-[#bc773f]">
              The Atelier
            </span>
            <span className="h-px w-10 md:w-16 bg-[#dec9b8]" />
          </motion.div>

          {/* manifesto — word-by-word reveal */}
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15%' }}
            transition={{ staggerChildren: 0.045 }}
            className="font-display text-center text-[8.5vw] sm:text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.28] text-[#3c3835] max-w-[22ch] sm:max-w-[26ch] mx-auto"
          >
            {MANIFESTO.map((w, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: '0.35em', filter: 'blur(6px)' },
                  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
                }}
                className={`inline-block ${w.em ? 'italic text-[#bc773f]' : ''}`}
              >
                {w.text}
                {i < MANIFESTO.length - 1 ? '\u00A0' : ''}
              </motion.span>
            ))}
          </motion.h2>

          {/* three principles */}
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease }}
                className="border-t border-[#dec9b8] pt-6"
              >
                <span className="block text-[11px] lowercase italic tracking-[0.2em] text-[#bc773f]/80 mb-3">
                  {p.n}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-[#3c3835] mb-3">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#3c3835]/70 max-w-[38ch]">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}