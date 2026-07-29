import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import { motionEase } from '../../hooks/useSectionTransit'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

/** Entrada sutil al viewport — fade + micro-scale. */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: motionEase }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
