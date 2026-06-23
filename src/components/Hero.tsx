import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface HeroProps {
  onOpenQuiz: () => void
}

function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 220 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Hero({ onOpenQuiz }: HeroProps) {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-dark via-space-mid to-space-dark" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(74,158,255,0.06) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 70% 60%, rgba(201,162,39,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Stars */}
      <StarField />

      {/* Animated ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(201,162,39,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(74,158,255,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.p
          variants={itemVariants}
          className="text-gold/80 text-xs md:text-sm font-medium tracking-[0.35em] uppercase mb-8"
        >
          Agence de voyage temporel de luxe
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-serif font-bold leading-tight mb-8"
        >
          <span className="block text-5xl md:text-7xl lg:text-8xl text-cream">
            Time<span className="text-gradient-gold">Travel</span>
          </span>
          <span className="block text-3xl md:text-4xl lg:text-5xl text-cream/60 font-light italic mt-2">
            Agency
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-cream/55 text-base md:text-lg max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Explorez les grandes heures de l'humanité. De l'effervescence de Paris 1889 aux
          dinosaures du Crétacé, en passant par la splendeur de la Renaissance florentine.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6 mb-14"
        >
          <span className="flex items-center gap-1.5 text-cream/40 text-xs tracking-wide">
            <span className="w-1 h-1 rounded-full bg-electric-blue" />
            Paris 1889
          </span>
          <span className="flex items-center gap-1.5 text-cream/40 text-xs tracking-wide">
            <span className="w-1 h-1 rounded-full bg-green-dino" />
            Crétacé −65M
          </span>
          <span className="flex items-center gap-1.5 text-cream/40 text-xs tracking-wide">
            <span className="w-1 h-1 rounded-full bg-amber-florence" />
            Florence 1504
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('#destinations')}
            className="px-8 py-4 rounded-full bg-gold text-space-dark font-semibold text-sm tracking-wide hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/25 hover:shadow-gold/50 hover:scale-105"
          >
            Découvrir nos destinations
          </button>
          <button
            onClick={onOpenQuiz}
            className="px-8 py-4 rounded-full border border-cream/15 text-cream/70 font-medium text-sm tracking-wide hover:border-gold/50 hover:text-gold hover:bg-gold/5 transition-all duration-300"
          >
            Trouver ma destination →
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-24 flex flex-col items-center gap-2 text-cream/25"
        >
          <span className="text-xs tracking-[0.25em] uppercase">Défiler</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-14 bg-gradient-to-b from-cream/25 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
