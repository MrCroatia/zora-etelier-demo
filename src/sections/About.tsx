import { motion } from 'framer-motion'
import SectionHead from '../components/SectionHead'

const ease = [0.22, 1, 0.36, 1] as const

const DETAILS = [
  { label: 'Founded', value: '2016' },
  { label: 'Chairs', value: 'Three, one guest each' },
  { label: 'Floor', value: 'Ilica 142, first courtyard' },
]

export default function About() {
  return (
    <section id="salon" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-y-14 md:gap-x-8 items-start">
        {/* text column */}
        <div className="col-span-12 md:col-span-5 md:pt-16 order-2 md:order-1">
          <SectionHead
            label="The Salon"
            index="01"
            title={
              <>
                A quiet room<br />
                for <span className="italic text-[#bc773f]">loud</span> hair.
              </>
            }
          />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="mt-8 text-[15px] md:text-base leading-relaxed text-[#3c3835]/75 max-w-md"
          >
            Tucked into Ilica, ZORA is a women's atelier where colour, cut and
            care are treated as craft — slow, precise, and entirely yours.
          </motion.p>

          {/* detail list — replaces generic "fun facts" blocks */}
          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="mt-10 border-t border-[#dec9b8] max-w-md"
          >
            {DETAILS.map((d) => (
              <div key={d.label} className="flex items-baseline justify-between gap-6 border-b border-[#dec9b8]/70 py-3.5">
                <dt className="text-[11px] uppercase tracking-[0.24em] text-[#3c3835]/45">{d.label}</dt>
                <dd className="text-[14px] text-[#3c3835]/85 text-right">{d.value}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            href="#visit"
            className="group inline-flex items-center gap-3 mt-10 text-[13px] uppercase tracking-[0.2em] text-[#3c3835] min-h-[44px]"
          >
            <span className="border-b border-[#3c3835] pb-1 transition-colors group-hover:text-[#bc773f] group-hover:border-[#bc773f]">
              Find us
            </span>
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>
              <path d="M0 5 H16 M12 1 L16 5 L12 9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </motion.a>
        </div>

        {/* offset images */}
        <div className="col-span-12 md:col-span-7 relative order-1 md:order-2 h-[70vw] md:h-[640px]">
          <div
            data-reveal
            className="absolute left-0 top-0 w-[62%] aspect-[3/2]"
          >
            <div className="reveal-clip w-full h-full overflow-hidden">
              <img
                src="/images/about-1.jpg"
                alt="ZORA salon interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div
            data-reveal
            data-reveal-delay="200"
            className="absolute right-0 bottom-0 w-[52%] aspect-[3/4]"
          >
            <div className="reveal-clip w-full h-full overflow-hidden rounded-t-full">
              <img
                src="/images/gallery-4.jpg"
                alt="Stylist at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* sand line */}
          <svg className="absolute -left-10 top-1/2 hidden md:block" width="200" height="1" aria-hidden>
            <line x1="0" y1="0" x2="200" y2="0" stroke="#dec9b8" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </section>
  )
}
