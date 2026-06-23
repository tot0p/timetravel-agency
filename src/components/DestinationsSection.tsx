import { motion } from 'framer-motion'
import DestinationCard from './DestinationCard'
import { destinations } from '../data/destinations'

export default function DestinationsSection() {
  return (
    <section id="destinations" className="py-32 px-6 bg-space-mid relative">
      {/* Top decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-gold/65 text-xs tracking-[0.35em] uppercase mb-5">
            Nos voyages exclusifs
          </p>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-cream mb-6">
            Destinations temporelles
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
          <p className="text-cream/45 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Trois époques soigneusement sélectionnées pour leur richesse historique, artistique
            et naturelle. Chaque expérience est encadrée par nos experts et entièrement sécurisée.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.id} destination={dest} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-cream/25 text-xs mt-14 tracking-wide"
        >
          ✦ Tous nos voyages incluent équipement de protection temporelle, guide expert et assurance
          tous risques ✦
        </motion.p>
      </div>
    </section>
  )
}
