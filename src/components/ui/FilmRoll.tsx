import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import { timeFrames } from '../../data/timeline'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const FRAME_H = 168
const reel = [...timeFrames, ...timeFrames]

/**
 * Rollo cinematográfico a escala de sección.
 * Interacción: arrastre con inercia + rueda (sin scrollear la página).
 */
export function FilmRoll() {
  const reduced = usePrefersReducedMotion()
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const loopH = useRef(0)
  const dragging = useRef(false)
  const lastY = useRef(0)
  const lastT = useRef(0)
  const velocity = useRef(0)
  const reducedRef = useRef(reduced)
  const [, setReady] = useState(false)

  reducedRef.current = reduced

  const raw = useMotionValue(0)
  const smooth = useSpring(raw, {
    stiffness: reduced ? 380 : 90,
    damping: reduced ? 40 : 22,
    mass: 0.45,
  })

  const y = useTransform(smooth, (v) => {
    const h = loopH.current
    if (h <= 0) return 0
    const m = ((v % h) + h) % h
    return -m
  })

  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    loopH.current = el.scrollHeight / 2
    setReady(true)
  }, [])

  useEffect(() => {
    measure()
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  const scrubBy = useCallback(
    (delta: number) => {
      if (loopH.current <= 0) return
      raw.set(raw.get() + delta)
    },
    [raw],
  )

  // Wheel nativo non-passive: bloquea el scroll de la página dentro del rollo
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (reducedRef.current || loopH.current <= 0) return
      e.preventDefault()
      e.stopPropagation()
      scrubBy(e.deltaY * 0.65)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [scrubBy])

  const lockPageScroll = (lock: boolean) => {
    document.documentElement.style.overflow = lock ? 'hidden' : ''
    document.body.style.overflow = lock ? 'hidden' : ''
  }

  const fling = (vy: number) => {
    if (reduced || Math.abs(vy) < 40) return
    const start = raw.get()
    animate(raw, start - vy * 0.28, {
      type: 'spring',
      stiffness: 55,
      damping: 18,
      mass: 0.7,
      velocity: -vy * 0.015,
      restDelta: 0.5,
    })
  }

  const onPointerDown = (e: ReactPointerEvent) => {
    if (reduced) return
    dragging.current = true
    lastY.current = e.clientY
    lastT.current = performance.now()
    velocity.current = 0
    lockPageScroll(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging.current || reduced) return
    const now = performance.now()
    const dy = e.clientY - lastY.current
    const dt = Math.max(now - lastT.current, 1)
    velocity.current = (dy / dt) * 1000
    lastY.current = e.clientY
    lastT.current = now
    scrubBy(-dy)
  }

  const onPointerUp = (e: ReactPointerEvent) => {
    if (!dragging.current) return
    dragging.current = false
    lockPageScroll(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
    fling(velocity.current)
  }

  useEffect(() => {
    return () => lockPageScroll(false)
  }, [])

  return (
    <div
      className="relative h-full w-full select-none overscroll-contain"
      aria-label="Rollo cinematográfico — paso del tiempo"
    >
      <div className="flex h-full min-h-[420px] overflow-hidden border border-line bg-neutral-950 dark:border-line-dark md:min-h-[460px]">
        <SprocketRail />

        <div
          ref={viewportRef}
          className="relative min-w-0 flex-1 cursor-grab touch-none overflow-hidden overscroll-contain active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-neutral-950 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-neutral-950 to-transparent"
            aria-hidden
          />

          <motion.div
            ref={trackRef}
            className="flex flex-col will-change-transform"
            style={{ y }}
          >
            {reel.map((frame, i) => (
              <figure
                key={`${frame.id}-${i}`}
                className="shrink-0 border-b border-white/10 px-3 py-2.5"
              >
                <div
                  className="relative overflow-hidden border border-white/12 bg-neutral-900"
                  style={{ height: FRAME_H }}
                >
                  <img
                    src={frame.image}
                    alt={frame.alt}
                    className="pointer-events-none h-full w-full object-cover grayscale contrast-125"
                    draggable={false}
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-semibold text-white md:text-base">
                        {frame.title}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                        {frame.detail}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                      {frame.era}
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </motion.div>
        </div>

        <SprocketRail />
      </div>
    </div>
  )
}

function SprocketRail() {
  return (
    <div
      className="flex w-6 shrink-0 flex-col items-center justify-between gap-2 border-x border-white/12 bg-neutral-950 px-1 py-3 md:w-7"
      aria-hidden
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="h-3 w-2.5 shrink-0 rounded-[1px] border border-white/25 bg-neutral-950"
        />
      ))}
    </div>
  )
}
