import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions, destinations } from '../data/destinations'
import type { Destination, QuizOption } from '../types'

interface Props {
  isOpen: boolean
  onClose: () => void
}

type Scores = {
  'paris-1889': number
  cretace: number
  'florence-1504': number
}

const INITIAL_SCORES: Scores = { 'paris-1889': 0, cretace: 0, 'florence-1504': 0 }

export default function QuizModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Scores>(INITIAL_SCORES)
  const [result, setResult] = useState<Destination | null>(null)

  const reset = () => {
    setStep(0)
    setScores(INITIAL_SCORES)
    setResult(null)
  }

  const handleAnswer = (option: QuizOption) => {
    const newScores: Scores = {
      'paris-1889': scores['paris-1889'] + option.scores['paris-1889'],
      cretace: scores.cretace + option.scores.cretace,
      'florence-1504': scores['florence-1504'] + option.scores['florence-1504'],
    }
    setScores(newScores)

    const nextStep = step + 1
    if (nextStep > quizQuestions.length) {
      const winnerId = Object.entries(newScores).sort(([, a], [, b]) => b - a)[0][0]
      const dest = destinations.find((d) => d.id === winnerId) ?? destinations[0]
      setResult(dest)
    }
    setStep(nextStep)
  }

  const currentQuestion =
    step >= 1 && step <= quizQuestions.length ? quizQuestions[step - 1] : null
  const showResult = step > quizQuestions.length

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="relative glass border border-gold/20 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-black/60"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-cream/30 hover:text-cream/80 text-xl transition-colors"
            >
              ✕
            </button>

            {/* ── Step 0: Intro ── */}
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <div className="text-5xl mb-5">⏱</div>
                  <h3 className="font-serif text-2xl text-cream mb-3">
                    Votre destination idéale
                  </h3>
                  <p className="text-cream/50 text-sm leading-relaxed mb-8">
                    Répondez à 4 questions pour que notre algorithme de recommandation vous
                    propose la destination temporelle parfaite.
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-3 rounded-full bg-gold text-space-dark font-semibold text-sm hover:bg-gold-light transition-colors"
                  >
                    Commencer →
                  </button>
                </motion.div>
              )}

              {/* ── Steps 1-4: Questions ── */}
              {!showResult && currentQuestion && (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Progress bar */}
                  <div className="flex gap-1.5 mb-8">
                    {quizQuestions.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                          i < step ? 'bg-gold' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gold/60 text-xs tracking-[0.25em] uppercase mb-3">
                    Question {step} sur {quizQuestions.length}
                  </p>
                  <h3 className="font-serif text-xl text-cream mb-6">
                    {currentQuestion.question}
                  </h3>

                  <div className="space-y-3">
                    {currentQuestion.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleAnswer(opt)}
                        className="w-full text-left px-5 py-4 rounded-xl border border-white/10 text-cream/70
                                   text-sm hover:border-gold/50 hover:bg-gold/5 hover:text-cream
                                   transition-all duration-200 group"
                      >
                        <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Result ── */}
              {showResult && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <p className="text-gold/65 text-xs tracking-[0.3em] uppercase mb-5">
                    Votre destination idéale
                  </p>

                  <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: 220 }}>
                    <img
                      src={result.imageUrl}
                      alt={result.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                    <div className="absolute bottom-5 left-5 text-left">
                      <p className="text-white/60 text-xs mb-0.5">{result.era}</p>
                      <h3 className="font-serif font-bold text-2xl text-white">{result.name}</h3>
                      <p className="text-white/50 text-xs mt-1">
                        {result.price} · {result.duration}
                      </p>
                    </div>
                  </div>

                  <p className="text-cream/55 text-sm leading-relaxed mb-7">
                    <em>{result.tagline}</em> — {result.description.slice(0, 120)}…
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={reset}
                      className="flex-1 py-3 rounded-full border border-white/10 text-cream/50
                                 text-sm hover:border-gold/30 hover:text-cream/80 transition-colors"
                    >
                      Recommencer
                    </button>
                    <button
                      onClick={() => {
                        onClose()
                        reset()
                        setTimeout(
                          () =>
                            document
                              .querySelector('#booking')
                              ?.scrollIntoView({ behavior: 'smooth' }),
                          300,
                        )
                      }}
                      className="flex-1 py-3 rounded-full text-space-dark text-sm font-semibold
                                 hover:opacity-90 transition-opacity"
                      style={{ background: result.color }}
                    >
                      Réserver →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
