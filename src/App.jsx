import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import StudyPlannerPrivacyPolicy from './pages/StudyPlannerPrivacyPolicy'
import SSPointPrivacyPolicy from './pages/SSPointPrivacyPolicy'
import VidyasparshPrivacyPolicy from './pages/VidyasparshPrivacyPolicy'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/study-planner-privacy-policy" element={<StudyPlannerPrivacyPolicy />} />
          <Route path="/sspoint-privacy-policy" element={<SSPointPrivacyPolicy />} />
          <Route path="/vidyasparsh-privacy-policy" element={<VidyasparshPrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </div>
  )
}

export default App
