import type { Destination, QuizQuestion } from '../types'

export const destinations: Destination[] = [
  {
    id: 'paris-1889',
    name: 'Paris 1889',
    era: 'Belle Époque',
    tagline: "L'effervescence d'une époque dorée",
    description:
      "Plongez au cœur de l'Exposition Universelle de 1889. Assistez à l'inauguration de la Tour Eiffel, fréquentez les cafés où Toulouse-Lautrec croque ses modèles, et vivez la frénésie d'une Paris en pleine révolution industrielle et artistique. Une expérience qui mêle élégance, modernité naissante et effervescence culturelle.",
    highlights: [
      'Inauguration de la Tour Eiffel',
      'Exposition Universelle',
      'Cabarets du Montmartre',
    ],
    price: '4 500 €',
    duration: '7 jours',
    color: '#4a9eff',
    imageUrl: '/images/paris-1889.png',
  },
  {
    id: 'cretace',
    name: 'Crétacé −65M',
    era: 'Ère Mésozoïque',
    tagline: 'Aux origines sauvages de la Terre',
    description:
      "Explorez la Terre telle qu'elle était 65 millions d'années avant notre ère. Observez des troupeaux de Triceratops depuis votre capsule sécurisée, ressentez le souffle d'un Tyrannosaure rex, et admirez une végétation tropicale luxuriante et une faune d'une richesse sans précédent. Un voyage pour les âmes aventurières.",
    highlights: [
      'Observation de T-Rex en liberté',
      'Nature préhistorique intacte',
      'Végétation tropicale luxuriante',
    ],
    price: '8 900 €',
    duration: '4 jours',
    color: '#22c55e',
    imageUrl: '/images/cretace.png',
  },
  {
    id: 'florence-1504',
    name: 'Florence 1504',
    era: 'Haute Renaissance',
    tagline: "Au cœur de la Renaissance italienne",
    description:
      "Côtoyez les plus grands génies de l'humanité dans la Florence des Médicis. Visitez l'atelier de Michel-Ange alors qu'il parachève le David, assistez aux joutes philosophiques chez Laurent le Magnifique, et déambulez dans une ville au sommet de sa splendeur artistique, intellectuelle et architecturale.",
    highlights: [
      "L'atelier de Michel-Ange",
      'Les Galeries Médicis',
      'Le David en cours de sculpture',
    ],
    price: '6 200 €',
    duration: '5 jours',
    color: '#f59e0b',
    imageUrl: '/images/florence-1504.png',
  },
]

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      {
        label: 'Culturelle et artistique',
        scores: { 'paris-1889': 2, cretace: 0, 'florence-1504': 3 },
      },
      {
        label: 'Aventure et nature',
        scores: { 'paris-1889': 0, cretace: 3, 'florence-1504': 0 },
      },
      {
        label: 'Élégance et raffinement',
        scores: { 'paris-1889': 3, cretace: 0, 'florence-1504': 2 },
      },
    ],
  },
  {
    id: 2,
    question: 'Votre période préférée ?',
    options: [
      {
        label: 'Histoire moderne (XIXe siècle)',
        scores: { 'paris-1889': 3, cretace: 0, 'florence-1504': 0 },
      },
      {
        label: 'Temps anciens et origines',
        scores: { 'paris-1889': 0, cretace: 3, 'florence-1504': 1 },
      },
      {
        label: 'Renaissance et classicisme',
        scores: { 'paris-1889': 0, cretace: 0, 'florence-1504': 3 },
      },
    ],
  },
  {
    id: 3,
    question: 'Vous préférez :',
    options: [
      {
        label: "L'effervescence urbaine",
        scores: { 'paris-1889': 3, cretace: 0, 'florence-1504': 2 },
      },
      {
        label: 'La nature sauvage',
        scores: { 'paris-1889': 0, cretace: 3, 'florence-1504': 0 },
      },
      {
        label: "L'art et l'architecture",
        scores: { 'paris-1889': 1, cretace: 0, 'florence-1504': 3 },
      },
    ],
  },
  {
    id: 4,
    question: 'Votre activité idéale :',
    options: [
      {
        label: 'Visiter des monuments',
        scores: { 'paris-1889': 3, cretace: 0, 'florence-1504': 2 },
      },
      {
        label: 'Observer la faune',
        scores: { 'paris-1889': 0, cretace: 3, 'florence-1504': 0 },
      },
      {
        label: 'Explorer des musées',
        scores: { 'paris-1889': 1, cretace: 0, 'florence-1504': 3 },
      },
    ],
  },
]
