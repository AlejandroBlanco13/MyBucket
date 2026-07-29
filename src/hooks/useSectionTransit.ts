import { type RefObject } from 'react'
import {
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Curva estándar — limpia, moderna. */
export const motionEase = [0.16, 1, 0.3, 1] as const

/** Spring suave: sigue el scroll sin tirones. */
const springConfig = {
  stiffness: 70,
  damping: 26,
  mass: 0.55,
  restDelta: 0.001,
} as const

const springInstant = {
  stiffness: 500,
  damping: 50,
  mass: 0.1,
  restDelta: 0.0005,
} as const

function useMotionSpring(raw: MotionValue<number>) {
  const reduced = usePrefersReducedMotion()
  return useSpring(raw, reduced ? springInstant : springConfig)
}

/** Progress 0→1 ligado al scroll sticky de una sección. */
export function useOwnProgress(
  targetRef: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })
  return useMotionSpring(scrollYProgress)
}

/**
 * Presencia de sección: aparece al entrar y se esconde al salir.
 */
export function useSectionPresence(targetRef: RefObject<HTMLElement | null>) {
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })
  const progress = useMotionSpring(scrollYProgress)

  const opacity = useTransform(
    progress,
    reduced ? [0, 1] : [0, 0.12, 0.78, 1],
    reduced ? [1, 1] : [0, 1, 1, 0],
  )

  const scale = useTransform(
    progress,
    reduced ? [0, 1] : [0, 0.12, 0.78, 1],
    reduced ? [1, 1] : [0.99, 1, 1, 0.99],
  )

  return { opacity, scale, progress, reduced }
}

/**
 * Salida para stages sticky.
 */
export function useStickyExit(progress: MotionValue<number>) {
  const reduced = usePrefersReducedMotion()

  const opacity = useTransform(
    progress,
    reduced ? [0, 1] : [0, 0.72, 0.9, 1],
    reduced ? [1, 1] : [1, 1, 0.45, 0],
  )

  const scale = useTransform(
    progress,
    reduced ? [0, 1] : [0.72, 0.9, 1],
    reduced ? [1, 1] : [1, 0.995, 0.985],
  )

  return { opacity, scale, reduced }
}

export const stickyStageClass =
  'sticky top-0 flex h-screen flex-col justify-center overflow-hidden'
