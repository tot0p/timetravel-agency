export interface Destination {
  id: string
  name: string
  era: string
  tagline: string
  description: string
  highlights: string[]
  price: string
  duration: string
  color: string
  imageUrl: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface QuizOption {
  label: string
  scores: {
    'paris-1889': number
    'cretace': number
    'florence-1504': number
  }
}

export interface QuizQuestion {
  id: number
  question: string
  options: QuizOption[]
}
