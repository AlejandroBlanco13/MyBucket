import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { focusLayers } from '../../data/focus'
import {
  stickyStageClass,
  useOwnProgress,
} from '../../hooks/useSectionTransit'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { GhostCopy, GhostMedia } from '../ui/Ghost'

/**
 * 02 — Señal
 * Entra suave; al final se disuelve en fantasma (texto + cards).
 */
export function Focus() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const ownProgress = useOwnProgress(sectionRef)

  const { scrollYProgress: enterRaw } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'start 0.35'],
  })
  const enterProgress = useSpring(enterRaw, {
    stiffness: reduced ? 400 : 70,
    damping: reduced ? 40 : 28,
    mass: 0.55,
    restDelta: 0.001,
  })

  const enterOpacity = useTransform(
    enterProgress,
    reduced ? [0, 1] : [0, 0.45, 1],
    reduced ? [1, 1] : [0, 0.75, 1],
  )
  const enterY = useTransform(
    enterProgress,
    reduced ? [0, 1] : [0, 1],
    reduced ? [0, 0] : [22, 0],
  )

  return (
    <section
      id="focus"
      ref={sectionRef}
      className="relative z-10 bg-surface"
      style={{ height: reduced ? 'auto' : '170vh' }}
    >
      <div
        className={
          reduced
            ? 'relative py-28 md:py-36'
            : `${stickyStageClass} bg-surface`
        }
      >
        <motion.div
          style={reduced ? undefined : { opacity: enterOpacity, y: enterY }}
          className="relative z-10 mx-auto w-full max-w-content origin-center px-5 md:px-8 will-change-[opacity,transform]"
        >
          <header className="mb-12 md:mb-16">
            <GhostCopy
              progress={ownProgress}
              start={0.55}
              end={0.88}
              className="mb-3"
            >
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
                02 — Señal
              </p>
            </GhostCopy>
            <GhostCopy progress={ownProgress} start={0.58} end={0.9}>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
                Lo que define el craft.
              </h2>
            </GhostCopy>
            <GhostCopy
              progress={ownProgress}
              start={0.6}
              end={0.92}
              className="mt-5"
            >
              <p className="max-w-xl text-base leading-relaxed text-mute md:text-lg">
                Tres capas de identidad: sistemas, narrativa y disciplina —
                reveladas al scroll.
              </p>
            </GhostCopy>
          </header>

          <GhostMedia progress={ownProgress} start={0.62} end={0.95}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {focusLayers.map((layer, index) => (
                <FocusLayerCard
                  key={layer.id}
                  layer={layer}
                  index={index}
                  progress={ownProgress}
                  reduced={reduced}
                />
              ))}
            </div>
          </GhostMedia>
        </motion.div>
      </div>
    </section>
  )
}

type LayerProps = {
  layer: (typeof focusLayers)[number]
  index: number
  progress: MotionValue<number>
  reduced: boolean
}

function FocusLayerCard({ layer, index, progress, reduced }: LayerProps) {
  const startHold = 0.12 + index * 0.08
  const mid = 0.28 + index * 0.08
  const done = 0.48 + index * 0.06

  const opacity = useTransform(
    progress,
    reduced ? [0, 1] : [0, startHold, mid, done],
    reduced ? [1, 1] : [0, 0, 0.55, 1],
  )

  const scale = useTransform(
    progress,
    reduced ? [0, 1] : [0, startHold, mid, done],
    reduced ? [1, 1] : [0.96, 0.96, 0.985, 1],
  )

  return (
    <motion.article
      style={{ opacity, scale }}
      className="group relative aspect-[3/4] origin-center overflow-hidden border border-line bg-paper will-change-transform dark:border-line-dark"
    >
      <img
        src={layer.image}
        alt={layer.alt}
        className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
          0{index + 1}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-white">
          {layer.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          {layer.detail}
        </p>
      </div>
    </motion.article>
  )
}
