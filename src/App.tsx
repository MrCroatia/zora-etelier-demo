import { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import Home from './pages/Home'
import { setSmoothScroll } from './lib/smoothScroll'

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.09 })
    setSmoothScroll(lenis)
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setSmoothScroll(null)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MotionConfig>
  )
}