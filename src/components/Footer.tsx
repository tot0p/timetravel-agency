import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Réservation', href: '#booking' },
]

const destinations = ['Paris 1889', 'Crétacé −65M', 'Florence 1504']

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/5 bg-space-dark py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center">
                <span className="text-gold font-serif font-bold">T</span>
              </div>
              <span className="font-serif font-bold text-xl text-gradient-gold">
                TimeTravel Agency
              </span>
            </div>
            <p className="text-cream/35 text-sm leading-relaxed max-w-sm mb-6">
              L'agence de voyage temporel de référence depuis 2025. Explorez Paris 1889,
              le Crétacé −65M et Florence 1504 dans un luxe intemporel.
            </p>
            <button
              onClick={() => scrollTo('#booking')}
              className="px-6 py-2.5 rounded-full border border-gold/30 text-gold text-sm hover:bg-gold/10 hover:border-gold/50 transition-all duration-200"
            >
              Réserver un voyage
            </button>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-gold/60 text-xs tracking-[0.25em] uppercase mb-6">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-cream/45 text-sm hover:text-gold transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <p className="text-gold/60 text-xs tracking-[0.25em] uppercase mb-6">Destinations</p>
            <ul className="space-y-3">
              {destinations.map((d) => (
                <li key={d}>
                  <button
                    onClick={() => scrollTo('#destinations')}
                    className="text-cream/45 text-sm hover:text-gold transition-colors"
                  >
                    {d}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/20 text-xs">
            © 2025 TimeTravel Agency · Projet pédagogique M2 IA — Ynov Campus Paris
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-cream/20 text-xs"
          >
            <span>Propulsé par</span>
            <span className="text-gold/40">React</span>
            <span>·</span>
            <span className="text-gold/40">Tailwind CSS</span>
            <span>·</span>
            <span className="text-gold/40">Framer Motion</span>
            <span>·</span>
            <span className="text-gold/40">Mistral AI</span>
          </motion.div>
        </div>

        {/* Groupe */}
        <div className="mt-6 pt-6 border-t border-white/5">
          <p className="text-cream/15 text-xs text-center tracking-wide">
            Membres du groupe : Thomas LEMAITRE · Axel Sénécal · Luca Morgado
          </p>
        </div>
      </div>
    </footer>
  )
}
