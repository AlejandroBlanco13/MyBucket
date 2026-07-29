import { type ReactNode, type RefObject } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/** Progress cuando el bloque sale por arriba (tarde, para verlo completo). */
export function useExitProgress(targetRef: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 0.15', 'end 0.05'],
  })
  return scrollYProgress
}

type GhostProps = {
  progress: MotionValue<number>
  start?: number
  end?: number
  className?: string
  children: ReactNode
}

/**
 * Fantasma de texto: sólido → eco difuso → desaparece.
 */
export function GhostCopy({
  progress,
  start = 0.4,
  end = 0.9,
  className = '',
  children,
}: GhostProps) {
  const reduced = usePrefersReducedMotion()
  const span = Math.max(end - start, 0.05)
  const a = start
  const b = start + span * 0.3
  const c = start + span * 0.6
  const d = end

  const solidOpacity = useTransform(
    progress,
    reduced ? [0, 1] : [a, b, c],
    reduced ? [1, 1] : [1, 0.45, 0],
  )

  const ghostOpacity = useTransform(
    progress,
    reduced ? [0, 1] : [a, b, c, d],
    reduced ? [0, 0] : [0, 0.4, 0.65, 0],
  )
  const ghostBlur = useTransform(
    progress,
    reduced ? [0, 1] : [a, c, d],
    reduced ? [0, 0] : [0, 8, 18],
  )
  const ghostFilter = useMotionTemplate`blur(${ghostBlur}px)`
  const ghostY = useTransform(
    progress,
    reduced ? [0, 1] : [b, d],
    reduced ? [0, 0] : [0, -10],
  )

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        aria-hidden
        style={{
          opacity: ghostOpacity,
          filter: ghostFilter,
          y: ghostY,
        }}
        className="pointer-events-none absolute inset-0 select-none text-ink/60 will-change-[opacity,filter,transform]"
      >
        {children}
      </motion.div>

      <motion.div
        style={{ opacity: solidOpacity }}
        className="relative will-change-[opacity]"
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * Fantasma de media: blur + disolución (sin duplicar DOM pesado).
 */
export function GhostMedia({
  progress,
  start = 0.45,
  end = 0.95,
  className = '',
  children,
}: GhostProps) {
  const reduced = usePrefersReducedMotion()
  const span = Math.max(end - start, 0.05)
  const a = start
  const b = start + span * 0.35
  const c = start + span * 0.7
  const d = end

  const opacity = useTransform(
    progress,
    reduced ? [0, 1] : [a, b, c, d],
    reduced ? [1, 1] : [1, 0.75, 0.35, 0],
  )
  const blur = useTransform(
    progress,
    reduced ? [0, 1] : [a, b, c, d],
    reduced ? [0, 0] : [0, 2, 10, 22],
  )
  const filter = useMotionTemplate`blur(${blur}px)`
  const scale = useTransform(
    progress,
    reduced ? [0, 1] : [a, d],
    reduced ? [1, 1] : [1, 0.97],
  )
  const y = useTransform(
    progress,
    reduced ? [0, 1] : [b, d],
    reduced ? [0, 0] : [0, -12],
  )

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      style={{ opacity, filter, scale, y }}
      className={`origin-center will-change-[opacity,filter,transform] ${className}`}
    >
      {children}
    </motion.div>
  )
}
