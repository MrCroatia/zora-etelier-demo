import { useEffect, useState } from 'react'

const links = [
  { label: 'Salon', href: '#salon' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#visit' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#faf6f3]/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-2xl tracking-[0.35em] text-[#3c3835] min-h-[44px] flex items-center"
            aria-label="ZORA home"
          >
            ZORA
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => go(l.href)}
                className="nav-link text-[13px] uppercase tracking-[0.2em] text-[#3c3835]"
              >
                <span className="nl-top">{l.label}</span>
                <span className="nl-bottom" aria-hidden>{l.label}</span>
              </button>
            ))}
            <button
              onClick={() => go('#visit')}
              className="border border-[#3c3835] px-7 py-3 text-[13px] uppercase tracking-[0.2em] text-[#3c3835] transition-colors duration-300 hover:bg-[#bc773f] hover:border-[#bc773f] hover:text-[#faf6f3] min-h-[44px]"
            >
              Book
            </button>
          </nav>

          <button
            className="md:hidden flex flex-col justify-center gap-[7px] w-11 h-11 items-end"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className={`block h-px bg-[#3c3835] transition-all duration-300 ${open ? 'w-7 rotate-45 translate-y-[4px]' : 'w-7'}`} />
            <span className={`block h-px bg-[#3c3835] transition-all duration-300 ${open ? 'w-7 -rotate-45 -translate-y-[4px]' : 'w-5'}`} />
          </button>
        </div>
      </header>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#faf6f3] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map((l, i) => (
          <button
            key={l.label}
            onClick={() => go(l.href)}
            className="font-display text-4xl text-[#3c3835] transition-all duration-500"
            style={{ transitionDelay: `${i * 60}ms`, opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(16px)' }}
          >
            {l.label}
          </button>
        ))}
        <button
          onClick={() => go('#visit')}
          className="mt-4 border border-[#bc773f] text-[#bc773f] px-10 py-4 text-sm uppercase tracking-[0.25em] transition-all duration-500"
          style={{ transitionDelay: '280ms', opacity: open ? 1 : 0 }}
        >
          Book
        </button>
      </div>
    </>
  )
}
