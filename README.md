# TimeTravel Agency — Webapp Interactive

Webapp moderne pour une agence de voyage temporel fictive.  
**Projet pédagogique M2 IA — Ynov Campus Paris 2025/2026**

---

## 🛠️ Stack technique

| Technologie | Usage |
|---|---|
| React 18 + TypeScript | Framework UI |
| Vite | Build tool |
| Tailwind CSS | Styling utilitaire |
| Framer Motion | Animations |
| Mistral AI API | Chatbot conversationnel |

---

## ✨ Features

- **Hero section** — Animation d'étoiles, stagger Framer Motion, CTA interactifs
- **Galerie destinations** — 3 cards interactives (Paris 1889, Crétacé −65M, Florence 1504)
- **Agent conversationnel** — Chatbot IA flottant propulsé par Mistral AI (`mistral-small-latest`)
- **Quiz de recommandation** — 4 questions → algorithme de scoring → destination idéale
- **Formulaire de réservation** — Validation, calcul prix, toast de confirmation
- **Design Dark Luxury** — Glassmorphism, accents or, responsive mobile-first

---

## 🚀 Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer la clé API Mistral
cp .env.example .env
# Éditez .env et ajoutez votre clé : VITE_MISTRAL_API_KEY=your_key_here

# 3. Lancer en développement
npm run dev

# 4. Build production
npm run build
```

> Sans clé API Mistral, le chatbot fonctionne en mode démo avec des réponses pré-écrites.

---

## 🤖 IA utilisées

- **Code** : Claude Sonnet 4.6 (via Claude Code)
- **Chatbot** : Mistral AI `mistral-small-latest`
- **Visuels** : Images Unsplash (libres de droits)

---

## 📁 Structure du projet

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation fixe + smooth-scroll
│   ├── Hero.tsx            # Section hero plein écran + étoiles animées
│   ├── DestinationCard.tsx # Card destination interactive (hover reveal)
│   ├── DestinationsSection.tsx # Galerie des 3 destinations
│   ├── ChatWidget.tsx      # Widget chatbot Mistral AI flottant
│   ├── QuizModal.tsx       # Quiz 4 questions → recommandation
│   ├── BookingSection.tsx  # Formulaire de réservation
│   └── Footer.tsx          # Pied de page
├── data/
│   └── destinations.ts     # Données destinations + questions quiz
├── types/
│   └── index.ts            # Types TypeScript
└── pages/
    └── HomePage.tsx        # Assemblage de tous les composants
```

---

## 👥 Équipe

- Thomas LEMAITRE
- Membre 2
- Membre 3
- Membre 4

---

## 📄 Licence

Projet pédagogique — M1/M2 Digital & IA — Ynov Campus
