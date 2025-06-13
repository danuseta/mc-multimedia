import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomePage from './pages/HomePage'
import CoursePage from './pages/CoursePage'
import LessonPage from './pages/LessonPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-16"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/lesson/:id" element={<LessonPage />} />
          </Routes>
        </motion.main>
        <Footer />
      </div>
    </Router>
  )
}

export default App 