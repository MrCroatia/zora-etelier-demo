import { motion } from 'framer-motion'
import SectionHead from '../components/SectionHead'

const ease = [0.22, 1, 0.36, 1] as const

const services = [
  { name: 'Cut & Finish', note: 'Precision cut, styled to go', time: '60 min', price: 'from €38' },
  { name: 'Colour & Balayage', note: 'Lived-in dimension, glossed', time: '2.5 hrs', price: 'from €85' },
  { name: 'Blonde Atelier', note: 'Full lightening, bond care', time: '3 hrs', price: 'from €120' },
  { name: 'Bridal & Occasion', note: 'Updos, waves, trials', time: 'by arrangement', price: 'on request' },
  { name: 'Ritual Treatments', note: 'Scalp, repair, shine', time: '30 min', price: 'from €30' },
]

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHead label="Price List" index="02" title="Cut, colour & care." className="mb-12 md:mb-16" />

        <div className="border-t border-[#dec9b8]">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease }}
              className="service-row border-b border-[#dec9b8] px-2 md:px-6 py-7 md:py-9 grid grid-cols-12 items-baseline gap-x-4 gap-y-2"
            >
              <span className="hidden md:block md:col-span-1 text-[12px] text-[#aeaaa7] font-normal">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="sr-name col-span-12 md:col-span-5 font-display text-2xl md:text-4xl text-[#3c3835]">
                {s.name}
              </h3>
              <p className="col-span-7 md:col-span-3 text-[13px] md:text-sm text-[#3c3835]/60">
                {s.note}
              </p>
              <span className="hidden md:block md:col-span-1 text-[12px] tracking-wide text-[#3c3835]/40 font-normal">
                {s.time}
              </span>
              <span className="col-span-5 md:col-span-2 text-right text-sm tracking-wide text-[#bc773f] font-normal">
                {s.price}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 text-[13px] leading-relaxed text-[#3c3835]/55 max-w-xl"
        >
          Every colour service begins with a consultation and a patch test.
          Final pricing follows length, density and time in the chair.
        </motion.p>
      </div>
    </section>
  )
}
