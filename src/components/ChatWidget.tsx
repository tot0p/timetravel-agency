import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Message } from '../types'

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux, passionné d'histoire
- Enthousiaste sans être trop familier, crédible et fictif à la fois
- Toujours positif et orienté conseils

Tu connais parfaitement ces 3 destinations :
- Paris 1889 (Belle Époque, Tour Eiffel inaugurée, Exposition Universelle, cafés Montmartre, Toulouse-Lautrec) — à partir de 4 500 € / 7 jours
- Crétacé −65M (dinosaures, T-Rex, Triceratops, végétation tropicale luxuriante) — à partir de 8 900 € / 4 jours
- Florence 1504 (Haute Renaissance, Michel-Ange et le David en cours, Médicis, Léonard de Vinci) — à partir de 6 200 € / 5 jours

Nos capsules temporelles sont sécurisées, équipées de blindage anti-prédateur (Crétacé) et d'une interface holographique multilingue.

Réponds en français, réponses courtes (2-4 phrases max). Si pertinent, suggère une destination.`

const MOCK_RESPONSES = [
  "Bonjour et bienvenue chez TimeTravel Agency ! 👋 Nos trois destinations phares sont Paris 1889, le Crétacé −65M et Florence 1504. Laquelle vous attire le plus ?",
  "Paris 1889 est notre voyage le plus romantique — vous assisterez à l'inauguration de la Tour Eiffel pour 4 500 € sur 7 jours. Une expérience inoubliable de la Belle Époque !",
  "Le voyage au Crétacé est notre expérience la plus intense. Observer un T-Rex depuis notre capsule blindée est tout simplement unique. Comptez 8 900 € pour 4 jours.",
  "Florence 1504 vous permet de rencontrer Michel-Ange en personne, alors qu'il achève le David ! Un privilège historique pour seulement 6 200 € sur 5 jours.",
  "Toutes nos capsules sont équipées de systèmes de sécurité de dernière génération et d'un accompagnement par des experts historiens. Votre sécurité est notre priorité absolue.",
  "Pour choisir votre destination, je vous recommande notre quiz de personnalité ! Il vous guidera vers l'époque qui correspond le mieux à vos aspirations.",
]

let mockIdx = 0

async function callMistral(history: { role: string; content: string }[]): Promise<string> {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY

  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 800))
    const response = MOCK_RESPONSES[mockIdx % MOCK_RESPONSES.length]
    mockIdx++
    return response
  }

  const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'mistral-small-latest',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
      temperature: 0.75,
      max_tokens: 280,
    }),
  })

  if (!res.ok) throw new Error(`Mistral API ${res.status}`)
  const data = await res.json()
  return (data.choices[0].message.content as string).trim()
}

const WELCOME: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Bonjour ! Je suis votre conseiller temporel ✨ Comment puis-je vous aider à planifier votre voyage dans le temps ?",
  timestamp: new Date(),
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setIsLoading(true)

    try {
      const history = updated.map((m) => ({ role: m.role, content: m.content }))
      const reply = await callMistral(history)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-24 right-5 z-40 w-80 sm:w-96 rounded-2xl
                       border border-gold/20 shadow-2xl shadow-black/60
                       flex flex-col overflow-hidden"
            style={{
              height: 480,
              background: 'rgba(5,5,16,0.92)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
              <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center flex-shrink-0">
                <span className="text-gold text-base">⏱</span>
              </div>
              <div className="min-w-0">
                <p className="text-cream text-sm font-semibold">Conseiller Temporel</p>
                <p className="text-xs flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400">En ligne</span>
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-cream/30 hover:text-cream/70 transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gold text-space-dark font-medium rounded-br-sm'
                        : 'bg-white/6 border border-white/8 text-cream/85 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Loading dots */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/6 border border-white/8 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gold/50"
                        animate={{ y: [-3, 0, -3] }}
                        transition={{
                          duration: 0.75,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/8">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Posez vos questions sur nos voyages..."
                  disabled={isLoading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5
                             text-cream text-sm placeholder-cream/25 focus:outline-none
                             focus:border-gold/40 transition-colors disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 flex-shrink-0 rounded-full bg-gold flex items-center justify-center
                             hover:bg-gold-light transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-4 h-4 text-space-dark rotate-90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19V5m0 0l-7 7m7-7 7 7"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-cream/15 text-xs text-center mt-2">
                {import.meta.env.VITE_MISTRAL_API_KEY
                  ? 'Propulsé par Mistral AI'
                  : 'Mode démo — Ajoutez VITE_MISTRAL_API_KEY dans .env'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB button ── */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 180, damping: 15 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-gold
                   shadow-xl shadow-gold/30 flex items-center justify-center
                   hover:bg-gold-light transition-colors"
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-space-dark text-xl font-bold leading-none"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-space-dark text-2xl leading-none"
            >
              💬
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
