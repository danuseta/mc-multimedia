import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Clock, Users, Star, BookOpen, CheckCircle } from 'lucide-react'
import VideoPlayer from '../components/VideoPlayer'
import AnimatedCard from '../components/AnimatedCard'

const CoursePage = () => {
  const [selectedLesson, setSelectedLesson] = useState(0)

  const course = {
    id: 1,
    title: 'Dasar-dasar Pemrograman dengan JavaScript',
    description: 'Pelajari konsep fundamental pemrograman menggunakan JavaScript modern. Kursus ini dirancang untuk pemula yang ingin memahami dasar-dasar coding dengan pendekatan multimedia yang interaktif.',
    instructor: 'Prof. Dr. Ahmad Ridwan',
    rating: 4.8,
    students: 1250,
    duration: '6 jam',
    level: 'Pemula',
    price: 299000,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    lessons: [
      {
        id: 1,
        title: 'Pengenalan Programming',
        duration: '15 menit',
        type: 'video',
        completed: true,
        preview: true,
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      },
      {
        id: 2,
        title: 'Variable dan Data Types',
        duration: '20 menit',
        type: 'video',
        completed: true,
        preview: false,
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
      },
      {
        id: 3,
        title: 'Functions dan Scope',
        duration: '25 menit',
        type: 'video',
        completed: false,
        preview: false,
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      },
      {
        id: 4,
        title: 'DOM Manipulation',
        duration: '30 menit',
        type: 'interactive',
        completed: false,
        preview: false
      },
      {
        id: 5,
        title: 'Quiz: Pemahaman Dasar',
        duration: '10 menit',
        type: 'quiz',
        completed: false,
        preview: false
      }
    ]
  }

  const currentLesson = course.lessons[selectedLesson]
  const completedLessons = course.lessons.filter(lesson => lesson.completed).length

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        >
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-colors"
                  >
                    <Play className="h-12 w-12 text-white ml-1" fill="currentColor" />
                  </motion.button>
                </div>
              </div>
              
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="text-gray-600 mb-6">{course.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} siswa</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.level}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Instruktur:</p>
                    <p className="font-semibold">{course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      Rp {course.price.toLocaleString('id-ID')}
                    </p>
                    <p className="text-sm text-gray-600">Akses selamanya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <AnimatedCard className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Progress Pembelajaran</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Selesai: {completedLessons}/{course.lessons.length}</span>
                    <span>{Math.round((completedLessons / course.lessons.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedLessons / course.lessons.length) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Aksi Cepat</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  Mulai Belajar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  Download Materi
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  Diskusi
                </motion.button>
              </div>
            </AnimatedCard>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatedCard delay={0.3}>
              <h2 className="text-2xl font-bold mb-4">
                Lesson {currentLesson.id}: {currentLesson.title}
              </h2>
              {currentLesson.videoSrc ? (
                <VideoPlayer
                  src={currentLesson.videoSrc}
                  title={currentLesson.title}
                  poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
                />
              ) : (
                <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Konten interaktif akan segera dimuat</p>
                  </div>
                </div>
              )}
            </AnimatedCard>
          </div>

          <div>
            <AnimatedCard delay={0.4} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Daftar Pelajaran</h3>
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedLesson(index)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedLesson === index
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{lesson.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>{lesson.duration}</span>
                          {lesson.type === 'video' && <Play className="h-3 w-3" />}
                          {lesson.type === 'quiz' && <BookOpen className="h-3 w-3" />}
                          {lesson.type === 'interactive' && <span>✨</span>}
                        </div>
                      </div>
                      {lesson.completed && (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link to={`/lesson/${currentLesson.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    Lanjutkan ke Lesson Berikutnya
                  </motion.button>
                </Link>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePage 