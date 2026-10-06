import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import Statement from '../sections/Statement'
import About from '../sections/About'
import Services from '../sections/Services'
import Gallery from '../sections/Gallery'
import Visit from '../sections/Visit'
import Footer from '../sections/Footer'
import Cursor from '../components/Cursor'
import useReveal from '../hooks/useReveal'

export default function Home() {
  useReveal()
  return (
    <main className="bg-[#faf6f3] text-[#3c3835]">
      <div className="grain-overlay" aria-hidden />
      <Cursor />
      <Nav />
      <Hero />
      <Statement />
      <About />
      <Services />
      <Gallery />
      <Visit />
      <Footer />
    </main>
  )
}
