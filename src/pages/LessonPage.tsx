import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowLeft, ArrowRight, Target } from 'lucide-react'
import VideoPlayer from '../components/VideoPlayer'
import AudioPlayer from '../components/AudioPlayer'
import AnimatedCard from '../components/AnimatedCard'

// Define proper types
interface InteractiveContent {
  term: string
  definition: string
}

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
}

interface LessonStep {
  id: number
  type: 'intro' | 'video' | 'audio' | 'interactive' | 'quiz'
  title: string
  content?: string | InteractiveContent[]
  animation?: string
  videoSrc?: string
  audioSrc?: string
  description?: string
  questions?: QuizQuestion[]
}

const LessonPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({})
  const [showQuizResult, setShowQuizResult] = useState(false)

  const lesson = {
    id: 1,
    title: 'Pengenalan Programming',
    course: 'Dasar-dasar Pemrograman',
    steps: [
      {
        id: 1,
        type: 'intro' as const,
        title: 'Selamat Datang di Dunia Programming!',
        content: 'Dalam lesson ini, kita akan mempelajari konsep dasar pemrograman dan mengapa programming sangat penting di era digital.',
        animation: '👋'
      },
      {
        id: 2,
        type: 'video' as const,
        title: 'Video: Apa itu Programming?',
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: 'Tonton video ini untuk memahami konsep dasar programming'
      },
      {
        id: 3,
        type: 'audio' as const,
        title: 'Audio: Sejarah Komputer',
        audioSrc: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        description: 'Dengarkan penjelasan tentang sejarah perkembangan komputer dan programming'
      },
      {
        id: 4,
        type: 'interactive' as const,
        title: 'Konsep Penting dalam Programming',
        content: [
          {
            term: 'Algorithm',
            definition: 'Langkah-langkah logis untuk menyelesaikan masalah'
          },
          {
            term: 'Variable',
            definition: 'Tempat menyimpan data dalam program'
          },
          {
            term: 'Function',
            definition: 'Blok kode yang dapat digunakan berulang kali'
          },
          {
            term: 'Loop',
            definition: 'Pengulangan eksekusi kode'
          }
        ] as InteractiveContent[]
      },
      {
        id: 5,
        type: 'quiz' as const,
        title: 'Quiz: Pemahaman Dasar',
        questions: [
          {
            id: 1,
            question: 'Apa itu algorithm dalam programming?',
            options: [
              'Bahasa pemrograman',
              'Langkah-langkah logis untuk menyelesaikan masalah',
              'Jenis komputer',
              'Software development'
            ],
            correct: 1
          },
          {
            id: 2,
            question: 'Variable digunakan untuk?',
            options: [
              'Menjalankan program',
              'Menyimpan data',
              'Membuat website',
              'Menginstal software'
            ],
            correct: 1
          }
        ]
      }
    ] as LessonStep[]
  }

  const currentStepData = lesson.steps[currentStep]
  const isLastStep = currentStep === lesson.steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNextStep = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const submitQuiz = () => {
    setShowQuizResult(true)
  }

  const calculateQuizScore = () => {
    if (currentStepData.type !== 'quiz') return 0
    const questions = currentStepData.questions || []
    const correct = questions.filter(q => quizAnswers[q.id] === q.correct).length
    return Math.round((correct / questions.length) * 100)
  }

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case 'intro':
        return (
          <AnimatedCard className="text-center py-16">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-8xl mb-8"
            >
              {currentStepData.animation}
            </motion.div>
            <h2 className="text-3xl font-bold mb-6">{currentStepData.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {typeof currentStepData.content === 'string' ? currentStepData.content : ''}
            </p>
          </AnimatedCard>
        )

      case 'video':
        return (
          <AnimatedCard>
            <h2 className="text-2xl font-bold mb-4">{currentStepData.title}</h2>
            <p className="text-gray-600 mb-6">{currentStepData.description}</p>
            <VideoPlayer
              src={currentStepData.videoSrc!}
              title={currentStepData.title}
              poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
            />
          </AnimatedCard>
        )

      case 'audio':
        return (
          <AnimatedCard>
            <h2 className="text-2xl font-bold mb-4">{currentStepData.title}</h2>
            <p className="text-gray-600 mb-8">{currentStepData.description}</p>
            <AudioPlayer
              src={currentStepData.audioSrc!}
              title={currentStepData.title}
              artist="EduLearn Narrator"
            />
          </AnimatedCard>
        )

      case 'interactive':
        return (
          <AnimatedCard>
            <h2 className="text-2xl font-bold mb-8">{currentStepData.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(currentStepData.content) && currentStepData.content.map((item: InteractiveContent, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-gray-200 cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">{item.term}</h3>
                  <p className="text-gray-700">{item.definition}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        )

      case 'quiz':
        return (
          <AnimatedCard>
            <h2 className="text-2xl font-bold mb-8">{currentStepData.title}</h2>
            
            {!showQuizResult ? (
              <div className="space-y-8">
                {currentStepData.questions?.map((question, qIndex) => (
                  <div key={question.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      {qIndex + 1}. {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, oIndex) => (
                        <motion.label
                          key={oIndex}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                            quizAnswers[question.id] === oIndex
                              ? 'bg-blue-100 border-2 border-blue-500'
                              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={oIndex}
                            checked={quizAnswers[question.id] === oIndex}
                            onChange={() => handleQuizAnswer(question.id, oIndex)}
                            className="mr-3"
                          />
                          <span>{option}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length < (currentStepData.questions?.length || 0)}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Target className="inline h-5 w-5 mr-2" />
                    Submit Quiz
                  </motion.button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 1 }}
                  className="inline-block mb-6"
                >
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">Quiz Selesai!</h3>
                <p className="text-xl mb-6">
                  Skor Anda: <span className="font-bold text-green-600">{calculateQuizScore()}%</span>
                </p>
                <p className="text-gray-600">
                  {calculateQuizScore() >= 80 
                    ? 'Excellent! Anda memahami materi dengan baik.' 
                    : 'Bagus! Tapi ada baiknya review materi sekali lagi.'}
                </p>
              </motion.div>
            )}
          </AnimatedCard>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            to="/course/1" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Kursus
          </Link>
          <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-gray-600">{lesson.course}</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentStep + 1} dari {lesson.steps.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              animate={{ width: `${((currentStep + 1) / lesson.steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            />
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevStep}
            disabled={isFirstStep}
            className="flex items-center px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Sebelumnya
          </motion.button>

          <div className="text-sm text-gray-600">
            Step {currentStep + 1} of {lesson.steps.length}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextStep}
            disabled={isLastStep}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastStep ? 'Selesai' : 'Selanjutnya'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default LessonPage 