const NAV = [
  { label: 'Salon', href: '#salon' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#visit' },
]

const go = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="bg-[#2a160d] text-[#faf6f3] border-t border-[#faf6f3]/10 pt-14 pb-8">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-10 md:gap-x-8">
          {/* brand */}
          <div className="col-span-2 md:col-span-4">
            <span className="font-display text-2xl tracking-[0.35em]">ZORA</span>
            <p className="mt-4 text-[13px] leading-relaxed text-[#faf6f3]/50 max-w-[28ch]">
              Women's hair atelier — colour, cut and care as craft, one guest at a time.
            </p>
          </div>

          {/* explore */}
          <nav className="md:col-span-3 md:col-start-6" aria-label="Footer">
            <h3 className="text-[11px] uppercase tracking-[0.26em] text-[#faf6f3]/40 mb-4">Explore</h3>
            <ul className="space-y-2.5">
              {NAV.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => go(l.href)}
                    className="text-[14px] text-[#faf6f3]/70 hover:text-[#bc773f] transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* visit */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] uppercase tracking-[0.26em] text-[#faf6f3]/40 mb-4">Salon</h3>
            <address className="not-italic text-[14px] leading-relaxed text-[#faf6f3]/70">
              Ilica 142<br />
              10000 Zagreb, Croatia<br />
              <span className="text-[#faf6f3]/50">Tue – Sat · 09:00 – 19:00</span>
            </address>
          </div>

          {/* contact */}
          <div className="md:col-span-2">
            <h3 className="text-[11px] uppercase tracking-[0.26em] text-[#faf6f3]/40 mb-4">Contact</h3>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <a href="mailto:hello@zora.hr" className="text-[#faf6f3]/70 hover:text-[#bc773f] transition-colors">
                  hello@zora.hr
                </a>
              </li>
              <li>
                <a href="tel:+38515550142" className="text-[#faf6f3]/70 hover:text-[#bc773f] transition-colors">
                  +385 1 555 0142
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#faf6f3]/70 hover:text-[#bc773f] transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#faf6f3]/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-[#faf6f3]/40">
          <span>© {new Date().getFullYear()} ZORA · Zagreb, Croatia</span>
          <span className="tracking-[0.14em]">Women's hair atelier · Est. 2016</span>
        </div>
      </div>
    </footer>
  )
}
