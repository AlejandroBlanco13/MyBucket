import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  type MotionValue,
} from 'motion/react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { profile } from '../../data/profile'
import { heroVisual } from '../../data/focus'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function Hero() {
  const scrollTo = useSmoothScroll()
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [viewport, setViewport] = useState({ w: 1200, h: 800 })
  const [planetGone, setPlanetGone] = useState(false)

  useEffect(() => {
    const update = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: reduced ? 500 : 120,
    damping: reduced ? 50 : 32,
    mass: reduced ? 0.1 : 0.35,
    restDelta: 0.0005,
  })

  const midW = Math.round(viewport.w * heroVisual.endScale)
  const midH = Math.round(viewport.h * heroVisual.endScale)

  /* Planeta: se retrae con suavidad; el copy permanece legible. */
  const imgWidth = useTransform(
    progress,
    reduced ? [0, 1] : [0, 0.45, 1],
    reduced ? [midW, midW] : [viewport.w, midW, midW * 0.92],
  )
  const imgHeight = useTransform(
    progress,
    reduced ? [0, 1] : [0, 0.45, 1],
    reduced ? [midH, midH] : [viewport.h, midH, midH * 0.92],
  )

  const imgOpacity = useTransform(
    progress,
    reduced ? [0, 1] : [0, 0.35, 0.65, 0.85],
    reduced ? [0.55, 0.55] : [1, 1, 0.35, 0],
  )
  const imgScale = useTransform(
    progress,
    reduced ? [0, 1] : [0.35, 0.85],
    reduced ? [1, 1] : [1, 0.96],
  )
  const imgBlur = useTransform(
    progress,
    reduced ? [0, 1] : [0.4, 0.85],
    reduced ? [0, 0] : [0, 6],
  )
  const imgFilter = useMotionTemplate`grayscale(1) contrast(1.25) blur(${imgBlur}px)`

  useMotionValueEvent(imgOpacity, 'change', (v) => {
    setPlanetGone(v < 0.02)
  })

  /* Veil suave sobre el planeta (no tapa el copy). */
  const veilOpacity = useTransform(
    progress,
    reduced ? [0, 1] : [0.15, 0.4, 0.7],
    reduced ? [0.15, 0.15] : [0.04, 0.22, 0.4],
  )

  const gridOpacity = useTransform(
    progress,
    reduced ? [0, 1] : [0, 0.4, 0.75],
    reduced ? [0.25, 0.25] : [0.35, 0.18, 0.1],
  )

  /* Se esconde al pasar a About — sin dejar pantalla vacía prolongada. */
  const heroContentOpacity = useTransform(
    progress,
    reduced ? [0, 1] : [0, 0.72, 0.88, 1],
    reduced ? [1, 1] : [1, 1, 0.4, 0],
  )
  const heroContentScale = useTransform(
    progress,
    reduced ? [0, 1] : [0.72, 0.88, 1],
    reduced ? [1, 1] : [1, 0.99, 0.98],
  )

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 bg-paper"
      style={{ height: reduced ? 'auto' : '140vh' }}
    >
      <div
        className={`relative flex w-full flex-col justify-end ${
          reduced ? 'min-h-[100svh]' : 'sticky top-0 h-screen overflow-hidden'
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          aria-hidden={planetGone || undefined}
        >
          <ScalerImage
            width={imgWidth}
            height={imgHeight}
            opacity={imgOpacity}
            scale={imgScale}
            filter={imgFilter}
            reduced={reduced}
            endW={midW}
            endH={midH}
            hidden={planetGone}
          />
        </div>

        <motion.div
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 z-[1] bg-paper"
        />
        <motion.div
          style={{ opacity: gridOpacity }}
          className="pointer-events-none absolute inset-0 z-[1] grid-atmosphere"
        />

        <motion.div
          style={
            reduced
              ? undefined
              : { opacity: heroContentOpacity, scale: heroContentScale }
          }
          className="relative z-10 mx-auto flex w-full max-w-content flex-1 origin-center flex-col justify-between px-5 pb-16 pt-28 will-change-[opacity,transform] md:px-8 md:pb-20 md:pt-32"
        >
          <div className="pt-4">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-mute">
              {profile.role} · {profile.location}
            </p>
            <h1 className="font-display text-[clamp(3.5rem,14vw,9.5rem)] font-semibold leading-[0.86] tracking-[-0.04em] text-ink">
              {profile.brand}
            </h1>
          </div>

          <div>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-md">
                <p className="text-lg leading-relaxed text-mute md:text-xl">
                  {profile.tagline}
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-mute">
                  {profile.name} · {profile.yearsActive}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => scrollTo('#projects')}
                  className="group inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
                >
                  Ver trabajo
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('#contact')}
                  className="inline-flex items-center gap-2 border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface dark:border-line-dark"
                >
                  Contactar
                </button>
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-mute transition-colors hover:text-ink"
                >
                  CV
                  <ArrowDownRight size={14} />
                </a>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-4 border-t border-line pt-6 dark:border-line-dark">
              <span className="h-px flex-1 bg-line dark:bg-line-dark" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
                Scroll para explorar
              </span>
              <span className="h-px flex-1 bg-line dark:bg-line-dark" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ScalerImage({
  width,
  height,
  opacity,
  scale,
  filter,
  reduced,
  endW,
  endH,
  hidden,
}: {
  width: MotionValue<number>
  height: MotionValue<number>
  opacity: MotionValue<number>
  scale: MotionValue<number>
  filter: MotionValue<string>
  reduced: boolean
  endW: number
  endH: number
  hidden: boolean
}) {
  if (reduced) {
    return (
      <img
        src={heroVisual.image}
        alt={heroVisual.alt}
        className="object-cover opacity-50 grayscale contrast-125"
        style={{ width: endW, height: endH }}
      />
    )
  }

  return (
    <motion.img
      src={heroVisual.image}
      alt={hidden ? '' : heroVisual.alt}
      className="origin-center object-cover will-change-[width,height,opacity,filter,transform]"
      style={{
        width,
        height,
        opacity,
        scale,
        filter,
        visibility: hidden ? 'hidden' : 'visible',
      }}
    />
  )
}
