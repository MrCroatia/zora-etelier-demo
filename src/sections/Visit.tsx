import { motion } from 'framer-motion'
import SectionHead from '../components/SectionHead'

const ease = [0.22, 1, 0.36, 1] as const

const DETAILS = [
  { label: 'Address', value: 'Ilica 142, 10000 Zagreb', href: null },
  { label: 'Hours', value: 'Tue – Sat · 09:00 – 19:00', href: null },
  { label: 'Phone', value: '+385 1 555 0142', href: 'tel:+38515550142' },
  { label: 'Mail', value: 'hello@zora.hr', href: 'mailto:hello@zora.hr' },
  { label: 'Instagram', value: '@zora.atelier', href: 'https://instagram.com' },
]

export default function Visit() {
  return (
    <section id="visit" className="relative bg-[#2a160d] text-[#faf6f3] py-28 md:py-44 overflow-hidden">
      {/* faint oversized word */}
      <div className="absolute inset-x-0 top-8 text-center pointer-events-none select-none" aria-hidden>
        <span className="font-display text-[26vw] md:text-[20vw] leading-none text-[#faf6f3]/[0.04]">ZORA</span>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-y-14 md:gap-x-8 items-start">
        {/* heading + CTA */}
        <div className="col-span-12 md:col-span-6 lg:col-span-5">
          <SectionHead
            label="Visit"
            index="04"
            dark
            title={
              <>
                Your chair<br />is <span className="italic text-[#bc773f]">waiting.</span>
              </>
            }
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="mt-7 text-[15px] leading-relaxed text-[#faf6f3]/65 max-w-md"
          >
            Book by phone or mail and we'll find a time that isn't rushed.
            First visits begin with a proper consultation — sit down, talk it
            through, decide together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="mt-10"
          >
            <a
              href="mailto:hello@zora.hr?subject=Appointment%20request"
              className="group inline-flex items-center gap-4 border border-[#bc773f] text-[#faf6f3] px-10 md:px-12 py-5 text-[13px] uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-[#bc773f] min-h-[44px]"
            >
              Book your appointment
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>
                <path d="M0 5 H16 M12 1 L16 5 L12 9" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* details table */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="col-span-12 md:col-span-6 lg:col-start-7 lg:col-span-6 border-t border-[#faf6f3]/15"
        >
          {DETAILS.map((d) => (
            <div
              key={d.label}
              className="flex items-baseline justify-between gap-6 border-b border-[#faf6f3]/10 py-5"
            >
              <dt className="text-[11px] uppercase tracking-[0.26em] text-[#faf6f3]/40">{d.label}</dt>
              <dd className="text-[15px] text-[#faf6f3]/85 text-right">
                {d.href ? (
                  <a
                    href={d.href}
                    target={d.href.startsWith('http') ? '_blank' : undefined}
                    rel={d.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="hover:text-[#bc773f] transition-colors"
                  >
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </dd>
            </div>
          ))}
          <p className="mt-5 text-[13px] leading-relaxed text-[#faf6f3]/40">
            Tram 11, stop 'Ilica 143' — street parking behind the building.
          </p>
        </motion.dl>
      </div>
    </section>
  )
}
