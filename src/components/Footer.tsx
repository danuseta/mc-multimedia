import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="bg-gray-900 text-white py-12 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">EduLearn</span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Platform pembelajaran multimedia yang menggabungkan video, audio, dan animasi 
              untuk pengalaman belajar yang menyenangkan dan efektif.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Beranda</a></li>
              <li><a href="/course/1" className="text-gray-400 hover:text-white transition-colors">Kursus</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Fitur Multimedia</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">🎥 Video Pembelajaran HD</li>
              <li className="text-gray-400">🎵 Audio Narasi Berkualitas</li>
              <li className="text-gray-400">✨ Animasi Interaktif</li>
              <li className="text-gray-400">🎮 Quiz & Game</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 EduLearn. Semua hak dilindungi.
          </p>
          <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 sm:mt-0">
            <span>Dibuat oleh Kelompok Mobile Computing</span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer 