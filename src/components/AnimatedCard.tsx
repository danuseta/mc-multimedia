import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

const AnimatedCard = ({ children, delay = 0, className = '', direction = 'up' }: AnimatedCardProps) => {
  const directionVariants = {
    up: { y: 20, opacity: 0 },
    down: { y: -20, opacity: 0 },
    left: { x: 20, opacity: 0 },
    right: { x: -20, opacity: 0 }
  }

  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02, 
        transition: { duration: 0.2 } 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedCard 