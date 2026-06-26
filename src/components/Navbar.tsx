import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Réservation', href: '#booking' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-hidden ${
        scrolled
          ? 'glass border-b border-gold/10 shadow-xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-gold/60 via-gold to-gold/60"
      />
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-200">
            <span className="text-gold font-serif font-bold text-sm">T</span>
          </div>
          <span className="font-serif font-bold text-lg text-gradient-gold hidden sm:block">
            TimeTravel Agency
          </span>
        </button>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="text-cream/60 hover:text-gold text-sm font-medium tracking-wide transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => scrollTo('#booking')}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/40 text-gold text-sm font-medium hover:bg-gold/10 hover:border-gold/70 transition-all duration-200"
        >
          Réserver un voyage
        </button>

        {/* Mobile menu */}
        <div className="md:hidden flex gap-3">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-cream/50 text-xs"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
