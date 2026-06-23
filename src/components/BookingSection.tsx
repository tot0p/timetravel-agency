import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { destinations } from '../data/destinations'

interface FormState {
  firstName: string
  lastName: string
  email: string
  destination: string
  date: string
  travelers: string
  message: string
}

const EMPTY: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  destination: '',
  date: '',
  travelers: '1',
  message: '',
}

export default function BookingSection() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const validate = (): boolean => {
    const e: Partial<FormState> = {}
    if (!form.firstName.trim()) e.firstName = 'Requis'
    if (!form.lastName.trim()) e.lastName = 'Requis'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
    if (!form.destination) e.destination = 'Veuillez choisir une destination'
    if (!form.date) e.date = 'Date requise'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
    setForm(EMPTY)
    setErrors({})
    setTimeout(() => setSubmitted(false), 5500)
  }

  const selectedDest = destinations.find((d) => d.id === form.destination)
  const totalPrice = selectedDest
    ? parseInt(selectedDest.price.replace(/\D/g, '')) * parseInt(form.travelers)
    : null

  const inputClass = (field: keyof FormState) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-cream text-sm placeholder-cream/25
     focus:outline-none transition-colors ${
       errors[field]
         ? 'border-red-500/60 focus:border-red-400/60'
         : 'border-white/10 focus:border-gold/50'
     }`

  return (
    <section id="booking" className="py-32 px-6 bg-space-dark relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-gold/65 text-xs tracking-[0.35em] uppercase mb-5">
            Commencer l'aventure
          </p>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-cream mb-6">
            Réservation
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-cream/45 text-base">
            Remplissez ce formulaire et notre équipe vous contactera dans les 24 heures pour
            confirmer votre voyage.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8 md:p-10 border border-white/8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First name */}
            <div>
              <label className="block text-cream/55 text-xs tracking-wide uppercase mb-2.5">
                Prénom
              </label>
              <input
                value={form.firstName}
                onChange={set('firstName')}
                className={inputClass('firstName')}
                placeholder="Jean"
              />
              {errors.firstName && (
                <p className="text-red-400/80 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last name */}
            <div>
              <label className="block text-cream/55 text-xs tracking-wide uppercase mb-2.5">
                Nom
              </label>
              <input
                value={form.lastName}
                onChange={set('lastName')}
                className={inputClass('lastName')}
                placeholder="Dupont"
              />
              {errors.lastName && (
                <p className="text-red-400/80 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className="block text-cream/55 text-xs tracking-wide uppercase mb-2.5">
                Adresse email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                className={inputClass('email')}
                placeholder="jean.dupont@email.com"
              />
              {errors.email && (
                <p className="text-red-400/80 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Destination */}
            <div>
              <label className="block text-cream/55 text-xs tracking-wide uppercase mb-2.5">
                Destination
              </label>
              <select
                value={form.destination}
                onChange={set('destination')}
                className={`${inputClass('destination')} bg-space-mid cursor-pointer`}
              >
                <option value="">Choisir une époque…</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.price}
                  </option>
                ))}
              </select>
              {errors.destination && (
                <p className="text-red-400/80 text-xs mt-1">{errors.destination}</p>
              )}
            </div>

            {/* Travelers */}
            <div>
              <label className="block text-cream/55 text-xs tracking-wide uppercase mb-2.5">
                Voyageurs
              </label>
              <select
                value={form.travelers}
                onChange={set('travelers')}
                className="w-full bg-space-mid border border-white/10 rounded-xl px-4 py-3
                           text-cream text-sm focus:outline-none focus:border-gold/50
                           transition-colors cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} personne{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="sm:col-span-2">
              <label className="block text-cream/55 text-xs tracking-wide uppercase mb-2.5">
                Date souhaitée
              </label>
              <input
                type="date"
                value={form.date}
                onChange={set('date')}
                min={new Date().toISOString().split('T')[0]}
                className={`${inputClass('date')} [color-scheme:dark]`}
              />
              {errors.date && (
                <p className="text-red-400/80 text-xs mt-1">{errors.date}</p>
              )}
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label className="block text-cream/55 text-xs tracking-wide uppercase mb-2.5">
                Message (optionnel)
              </label>
              <textarea
                value={form.message}
                onChange={set('message')}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                           text-cream text-sm placeholder-cream/25 focus:outline-none
                           focus:border-gold/50 transition-colors resize-none"
                placeholder="Demandes particulières, régime alimentaire, accessibilité…"
              />
            </div>
          </div>

          {/* Price summary */}
          <AnimatePresence>
            {selectedDest && totalPrice !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: `${selectedDest.color}10`,
                    border: `1px solid ${selectedDest.color}30`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold" style={{ color: selectedDest.color }}>
                        {selectedDest.name}
                      </p>
                      <p className="text-cream/40 text-xs mt-0.5">
                        {selectedDest.duration} · {form.travelers} personne
                        {parseInt(form.travelers) > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-cream">
                        {totalPrice.toLocaleString('fr-FR')} €
                      </p>
                      <p className="text-cream/30 text-xs">estimation</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full mt-7 py-4 rounded-2xl bg-gold text-space-dark font-semibold
                       text-sm tracking-wide transition-all duration-300
                       hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.01]"
          >
            Envoyer ma demande de réservation →
          </button>
        </motion.form>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 40, x: '-50%' }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-24 left-1/2 z-50 whitespace-nowrap
                       bg-green-900/90 border border-green-600/40 backdrop-blur-md
                       text-cream px-7 py-4 rounded-2xl text-sm shadow-2xl"
          >
            ✅ Demande envoyée ! Notre équipe vous contactera sous 24h.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
