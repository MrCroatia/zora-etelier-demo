import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

type SectionHeadProps = {
  /** Small bronze label, e.g. "The Salon" */
  label: string
  /** Section index shown at the end of the rule, e.g. "01" */
  index: string
  /** Heading content — accepts JSX for emphasis */
  title: ReactNode
  /** Use light-on-dark styling (Visit / Footer) */
  dark?: boolean
  className?: string
}

/**
 * Consistent section header: label — hairline rule — index, then the heading.
 * Every section below the hero uses this so the rhythm stays editorial
 * instead of each section inventing its own header.
 */
export default function SectionHead({ label, index, title, dark, className = '' }: SectionHeadProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease }}
      className={className}
    >
      <div className="flex items-center gap-5 mb-7">
        <span className="text-[11px] uppercase tracking-[0.32em] text-[#bc773f] whitespace-nowrap">
          {label}
        </span>
        <span className={`h-px flex-1 ${dark ? 'bg-[#faf6f3]/15' : 'bg-[#dec9b8]'}`} />
        <span
          className={`text-[11px] tracking-[0.2em] whitespace-nowrap ${
            dark ? 'text-[#faf6f3]/40' : 'text-[#3c3835]/40'
          }`}
        >
          {index}
        </span>
      </div>
      <h2
        className={`font-display text-4xl md:text-6xl leading-[1.05] ${
          dark ? 'text-[#faf6f3]' : 'text-[#3c3835]'
        }`}
      >
        {title}
      </h2>
    </motion.div>
  )
}