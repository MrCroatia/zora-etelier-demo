import { useEffect } from 'react'

/**
 * Observes all [data-reveal] elements once mounted and adds `.revealed`
 * when they enter the viewport. CSS handles the actual transition.
 */
export default function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('revealed'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            const delay = el.dataset.revealDelay
            const clip = el.querySelector<HTMLElement>('.reveal-clip')
            if (delay) (clip ?? el).style.transitionDelay = `${delay}ms`
            el.classList.add('revealed')
            io.unobserve(el)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
