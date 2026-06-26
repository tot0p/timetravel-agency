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
- Axel Sénécal
- Luca Morgado

---

## 📄 Licence

Projet pédagogique — M1/M2 Digital & IA — Ynov Campus

---

## 💭 Réflexion sur le processus

### Approche adoptée

Ce projet a été entièrement construit selon une approche **"vibe coding"** assistée par IA. L'ensemble de l'architecture, du code et des choix techniques ont été générés et itérés avec **Claude Sonnet 4.6 via Claude Code**, utilisé comme véritable co-pilote de développement plutôt que comme simple outil de complétion.

### Ce que l'IA a apporté

L'IA a permis de **compresser radicalement le temps de développement** : une webapp React complète (composants, animations Framer Motion, intégration API, CI/CD GitHub Actions, déploiement GitHub Pages) qui aurait nécessité plusieurs jours de travail classique a été produite en quelques heures.

Les apports concrets :
- **Génération de l'architecture** complète dès le départ (structure de fichiers, types TypeScript, design system)
- **Cohérence visuelle** maintenue automatiquement sur tous les composants grâce au contexte global conservé par l'IA
- **Débogage proactif** : l'IA a anticipé des problèmes comme le path de base pour GitHub Pages (`VITE_BASE_URL`) ou la gestion des erreurs API Mistral avant qu'ils ne causent des régressions
- **Parallélisation** : plusieurs fichiers écrits simultanément via des appels d'outils en parallèle, impossible à reproduire manuellement

### Limites et apprentissages

L'expérience a aussi mis en lumière des **limites importantes** :

- **L'IA ne remplace pas le jugement** : chaque suggestion de code a nécessité une validation humaine. Des décisions comme le choix du thème visuel, la structure du quiz ou l'UX du chatbot restaient des décisions d'équipe.
- **Les actions interactives restent manuelles** : l'authentification GitHub CLI (`gh auth login`) a illustré qu'un LLM ne peut pas se substituer à l'utilisateur pour les actions nécessitant une interaction humaine authentifiée.
- **Le contexte a une limite** : sur les longues sessions, la compréhension globale du projet par l'IA nécessite un résumé structuré pour maintenir la cohérence.
- **La revue critique reste essentielle** : certains bugs subtils (slash manquant dans l'URL, fallback chatbot incomplet) n'ont été détectés qu'à l'usage réel.

### Réflexion sur le rôle de l'ingénieur IA

Ce projet illustre une réalité qui s'impose dans notre domaine : **le développeur assisté par IA n'écrit plus du code ligne par ligne, il orchestre, valide et itère**. Le vrai savoir-faire se déplace vers la capacité à formuler des intentions précises, à détecter les erreurs dans le code généré, et à maintenir une vision d'ensemble que l'IA seule ne peut pas avoir.

L'IA est un multiplicateur de productivité exceptionnel — à condition de savoir ce qu'on veut construire.
