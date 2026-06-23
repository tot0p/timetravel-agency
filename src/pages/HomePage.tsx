import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import DestinationsSection from '../components/DestinationsSection'
import BookingSection from '../components/BookingSection'
import ChatWidget from '../components/ChatWidget'
import Footer from '../components/Footer'
import QuizModal from '../components/QuizModal'

export default function HomePage() {
  const [quizOpen, setQuizOpen] = useState(false)

  return (
    <div className="min-h-screen bg-space-dark">
      <Navbar />
      <Hero onOpenQuiz={() => setQuizOpen(true)} />
      <DestinationsSection />
      <BookingSection />
      <Footer />
      <ChatWidget />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  )
}
