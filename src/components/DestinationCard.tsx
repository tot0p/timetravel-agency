import { motion } from 'framer-motion'
import type { Destination } from '../types'

interface Props {
  destination: Destination
  index: number
}

export default function DestinationCard({ destination, index }: Props) {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ minHeight: 500 }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url(${destination.imageUrl})` }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/15 transition-opacity duration-300" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${destination.color}60, transparent 60%)`,
        }}
      />

      {/* Top badges */}
      <div className="absolute top-5 left-5">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide backdrop-blur-sm"
          style={{
            background: `${destination.color}20`,
            border: `1px solid ${destination.color}60`,
            color: destination.color,
          }}
        >
          {destination.era}
        </span>
      </div>

      <div className="absolute top-5 right-5 text-right">
        <p className="text-white font-bold text-xl leading-none">{destination.price}</p>
        <p className="text-white/50 text-xs mt-1">{destination.duration}</p>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <h3 className="font-serif font-bold text-3xl text-white mb-1 group-hover:text-gradient-gold transition-all duration-300">
          {destination.name}
        </h3>
        <p className="text-white/50 text-sm mb-5 italic">{destination.tagline}</p>

        {/* Highlights — revealed on hover */}
        <ul className="space-y-1.5 mb-5">
          {destination.highlights.map((h, i) => (
            <li
              key={h}
              className="flex items-center gap-2 text-white/0 group-hover:text-white/75 text-sm
                         translate-y-3 group-hover:translate-y-0 transition-all duration-500"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="flex-shrink-0 text-xs" style={{ color: destination.color }}>
                ✦
              </span>
              {h}
            </li>
          ))}
        </ul>

        {/* Description snippet (hidden on hover) */}
        <p className="text-white/40 text-xs mb-4 line-clamp-2 group-hover:opacity-0 transition-opacity duration-300">
          {destination.description.slice(0, 100)}…
        </p>

        <button
          onClick={() => scrollTo('#booking')}
          className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300
                     opacity-80 group-hover:opacity-100 hover:scale-[1.02]"
          style={{
            background: destination.color,
            color: '#050510',
            boxShadow: `0 4px 20px ${destination.color}40`,
          }}
        >
          Réserver cette destination →
        </button>
      </div>
    </motion.article>
  )
}
