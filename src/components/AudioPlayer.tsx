import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react'

interface AudioPlayerProps {
  src: string
  title?: string
  artist?: string
}

const AudioPlayer = ({ src, title, artist }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const progressBar = progressRef.current
    if (!audio || !progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = parseFloat(e.target.value)
    audio.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const skipTime = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = Math.max(0, Math.min(duration, currentTime + seconds))
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  const visualizerBars = Array.from({ length: 20 }, (_, i) => i)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-sm sm:max-w-md mx-auto border border-gray-100"
    >
      <audio ref={audioRef} src={src} />

      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {title || 'Audio Track'}
        </h3>
        {artist && (
          <p className="text-gray-600 text-sm">{artist}</p>
        )}
      </div>

      <div className="flex items-center justify-center space-x-1 h-16 mb-6">
        {visualizerBars.map((bar) => (
          <motion.div
            key={bar}
            animate={{
              height: isPlaying ? [20, Math.random() * 40 + 20, 20] : 20,
            }}
            transition={{
              duration: 0.5,
              repeat: isPlaying ? Infinity : 0,
              delay: bar * 0.1,
            }}
            className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
            style={{ height: '20px' }}
          />
        ))}
      </div>

      <div className="mb-4">
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer group/progress"
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg" />
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6 mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => skipTime(-10)}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          <SkipBack className="h-5 w-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-4 hover:shadow-lg transition-shadow"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => skipTime(10)}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          <SkipForward className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="flex items-center space-x-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </motion.button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        
        <span className="text-sm text-gray-500 w-8">
          {Math.round((isMuted ? 0 : volume) * 100)}%
        </span>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: linear-gradient(to right, #3b82f6, #8b5cf6);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: linear-gradient(to right, #3b82f6, #8b5cf6);
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        `
      }} />
    </motion.div>
  )
}

export default AudioPlayer 