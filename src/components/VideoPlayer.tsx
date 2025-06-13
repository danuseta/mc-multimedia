import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  autoplay?: boolean
}

const VideoPlayer = ({ src, poster, title, autoplay = false }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    const progressBar = progressRef.current
    if (!video || !progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = parseFloat(e.target.value)
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      video.requestFullscreen()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-black rounded-lg overflow-hidden shadow-2xl group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
    >
      {title && (
        <div className="absolute top-4 left-4 right-4 z-30">
          <h3 className="text-white text-lg font-semibold bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
            {title}
          </h3>
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-auto max-h-64 sm:max-h-80 lg:max-h-96 cursor-pointer"
        onClick={togglePlay}
        autoPlay={autoplay}
        muted={autoplay}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: !isPlaying ? 1 : 0 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-colors"
        >
          <Play className="h-12 w-12 text-white ml-1" fill="currentColor" />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
      >
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="w-full h-2 bg-white/30 rounded-full cursor-pointer mb-4 group/progress"
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </motion.button>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="text-white hover:text-blue-400 transition-colors"
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
                className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFullscreen}
            className="text-white hover:text-blue-400 transition-colors"
          >
            <Maximize className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
          }
          .slider::-moz-range-thumb {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: none;
          }
        `
      }} />
    </motion.div>
  )
}

export default VideoPlayer 