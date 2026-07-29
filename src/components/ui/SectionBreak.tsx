import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Umbral fluido entre capítulos.
 * Cada título se lee nítido un tramo largo; el crossfade solo al final.
 */
export function SectionBreak({
  from,
  to,
  fromCode = '01',
  toCode = '02',
}: {
  from: string
  to: string
  fromCode?: string
  toCode?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: reduced ? 400 : 48,
    damping: reduced ? 40 : 32,
    mass: 0.75,
    restDelta: 0.001,
  })

  // Cierra: nítido ~40% del scroll, luego cede
  const fromOpacity = useTransform(
    progress,
    reduced ? [0, 1] : [0.08, 0.38, 0.52, 0.62],
    reduced ? [1, 1] : [0, 1, 1, 0],
  )
  const fromY = useTransform(
    progress,
    reduced ? [0, 1] : [0.08, 0.22, 0.52, 0.62],
    reduced ? [0, 0] : [16, 0, 0, -12],
  )
  const fromBlur = useTransform(
    progress,
    reduced ? [0, 1] : [0.5, 0.62],
    reduced ? [0, 0] : [0, 5],
  )
  const fromFilter = useTransform(fromBlur, (b) => `blur(${b}px)`)

  // Entra: aparece tarde y se queda nítido hasta casi el final
  const toOpacity = useTransform(
    progress,
    reduced ? [0, 1] : [0.55, 0.66, 0.78, 0.94],
    reduced ? [1, 1] : [0, 1, 1, 0],
  )
  const toY = useTransform(
    progress,
    reduced ? [0, 1] : [0.55, 0.66, 0.78, 0.94],
    reduced ? [0, 0] : [16, 0, 0, -10],
  )
  const toBlur = useTransform(
    progress,
    reduced ? [0, 1] : [0.55, 0.66, 0.88, 0.94],
    reduced ? [0, 0] : [5, 0, 0, 4],
  )
  const toFilter = useTransform(toBlur, (b) => `blur(${b}px)`)

  const lineScale = useTransform(
    progress,
    reduced ? [0, 1] : [0.42, 0.55, 0.72],
    reduced ? [1, 1] : [0.12, 1, 1],
  )
  const lineOpacity = useTransform(
    progress,
    reduced ? [0, 1] : [0.4, 0.5, 0.68, 0.78],
    reduced ? [0.4, 0.4] : [0, 0.9, 0.9, 0.15],
  )

  const veilOpacity = useTransform(
    progress,
    reduced ? [0, 1] : [0.48, 0.58, 0.7],
    reduced ? [0, 0] : [0, 0.22, 0],
  )

  // Pico corto en el centro — el protagonismo es de los títulos
  const midLabelOpacity = useTransform(
    progress,
    reduced ? [0, 1] : [0.48, 0.56, 0.64],
    reduced ? [1, 1] : [0, 1, 0],
  )

  return (
    <section
      ref={ref}
      className="relative z-20 h-[130vh] bg-paper md:h-[145vh]"
      aria-label={`Transición de ${from} a ${to}`}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 bg-ink/8 dark:bg-paper/8"
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-content px-5 md:px-8">
          <div className="relative flex min-h-[42vh] flex-col items-center justify-center gap-10 md:gap-14">
            <motion.div
              style={{
                opacity: fromOpacity,
                y: fromY,
                filter: reduced ? undefined : fromFilter,
              }}
              className="text-center will-change-[opacity,transform,filter]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-mute">
                Cierra · {fromCode}
              </p>
              <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                {from}
              </p>
            </motion.div>

            <div className="relative flex w-full max-w-lg flex-col items-center gap-3">
              <motion.div
                style={{ scaleX: lineScale, opacity: lineOpacity }}
                className="h-px w-full origin-center bg-ink dark:bg-paper"
                aria-hidden
              />
              <motion.p
                style={{ opacity: midLabelOpacity }}
                className="font-mono text-[10px] uppercase tracking-[0.36em] text-mute"
              >
                Cambio de capítulo
              </motion.p>
              <motion.div
                style={{ scaleX: lineScale, opacity: lineOpacity }}
                className="h-px w-full origin-center bg-ink dark:bg-paper"
                aria-hidden
              />
            </div>

            <motion.div
              style={{
                opacity: toOpacity,
                y: toY,
                filter: reduced ? undefined : toFilter,
              }}
              className="text-center will-change-[opacity,transform,filter]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-mute">
                Entra · {toCode}
              </p>
              <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                {to}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
