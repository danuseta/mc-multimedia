import { motion } from 'framer-motion'
import { Play, BookOpen, Users, Trophy, Volume2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import AudioPlayer from '../components/AudioPlayer'
import AnimatedCard from '../components/AnimatedCard'

const HomePage = () => {
  const features = [
    {
      icon: Play,
      title: 'Video Pembelajaran',
      description: 'Video berkualitas HD dengan penjelasan yang mudah dipahami',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Volume2,
      title: 'Audio Narasi',
      description: 'Audio berkualitas tinggi untuk pembelajaran yang lebih imersif',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: BookOpen,
      title: 'Materi Interaktif',
      description: 'Materi pembelajaran dengan animasi dan interaksi yang menarik',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Trophy,
      title: 'Quiz & Assessment',
      description: 'Ujian dan kuis untuk mengukur pemahaman Anda',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const courses = [
    {
      id: 1,
      title: 'Dasar-dasar Pemrograman',
      description: 'Pelajari konsep dasar pemrograman dengan JavaScript',
      duration: '2 jam',
      students: 1250,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'
    },
    {
      id: 2,
      title: 'Web Development Modern',
      description: 'Bangun aplikasi web dengan React dan TypeScript',
      duration: '4 jam',
      students: 890,
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400'
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Desain antarmuka yang indah dan user-friendly',
      duration: '3 jam',
      students: 650,
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400'
    }
  ]

  return (
    <div className="min-h-screen">
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Belajar dengan
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {' '}Multimedia
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mt-4 sm:mt-6 max-w-lg">
                Platform pembelajaran interaktif yang menggabungkan video, audio, dan animasi 
                untuk pengalaman belajar yang tak terlupakan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <Link to="/course/1" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl transition-shadow"
                  >
                    Mulai Belajar Sekarang
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  Lihat Demo
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12"
              >
                <div className="text-center py-3 sm:py-0">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm sm:text-base text-gray-600">Siswa</div>
                </div>
                <div className="text-center py-3 sm:py-0">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">50+</div>
                  <div className="text-sm sm:text-base text-gray-600">Kursus</div>
                </div>
                <div className="text-center py-3 sm:py-0">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">98%</div>
                  <div className="text-sm sm:text-base text-gray-600">Kepuasan</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <VideoPlayer
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
                title="Demo Video Pembelajaran"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Mengapa Memilih EduLearn?</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Kami menghadirkan pengalaman belajar multimedia yang komprehensif 
              dengan teknologi terdepan untuk hasil pembelajaran yang optimal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedCard
                key={feature.title}
                delay={index * 0.1}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Dengarkan Kualitas Audio Kami</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
              Audio narasi berkualitas studio untuk pengalaman belajar yang lebih imersif
            </p>
            
            <AudioPlayer
              src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
              title="Contoh Audio Pembelajaran"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Kursus Populer</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Jelajahi kursus-kursus terbaik dengan konten multimedia interaktif
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <AnimatedCard
                key={course.id}
                delay={index * 0.1}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="bg-white/90 rounded-full p-3"
                    >
                      <Play className="h-8 w-8 text-blue-600" />
                    </motion.div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Play className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students} siswa</span>
                    </div>
                  </div>
                  
                  <Link to={`/course/${course.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      Mulai Kursus
                    </motion.button>
                  </Link>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage 