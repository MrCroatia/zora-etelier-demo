import type Lenis from 'lenis'

/**
 * Reference to the app-wide Lenis smooth-scroll instance.
 * Set by App on mount, so overlays (e.g. the gallery lightbox) can pause
 * scrolling while open — avoids fighting lenis's own `window.lenis`
 * global type declaration.
 */
let instance: Lenis | null = null

export function setSmoothScroll(lenis: Lenis | null) {
  instance = lenis
}

export function pauseSmoothScroll() {
  instance?.stop()
}

export function resumeSmoothScroll() {
  instance?.start()
}