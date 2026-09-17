import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import Hero from './sections/Hero'
import { About, Marquee } from './sections/About'
import Work from './sections/Work'
import { Skills, Services, Why, Education } from './sections/Skills'
import Testimonials from './sections/Testimonials'
import { Contact, FinalCta, Footer } from './sections/Contact'
import { useLenis, scrollTo } from './hooks/useLenis'

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])
  useLenis(ready)

  useEffect(() => {
    if (ready) requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [ready])

  return (
    <div className="grain">
      <Loader onDone={onDone} />
      <Cursor />
      <Nav />
      <main>
        <Hero started={ready} />
        <About />
        <Marquee />
        <Work />
        <Skills />
        <Services />
        <Why />
        <Education />
        <Testimonials />
        <Contact />
        <FinalCta onCta={() => scrollTo('#contact')} />
      </main>
      <Footer />
    </div>
  )
}
