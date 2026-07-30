import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { realmCards, type PageBackgroundState, type RealmAction } from '../../data/alejandria'
import { RealmCard } from './RealmCard'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const DRAG_THRESHOLD = 10

type RealmRailProps = {
  onSelect: (action: RealmAction) => void
  onHoverRealm?: (pageBackground: PageBackgroundState | null) => void
  /** true cuando el carril ya se desplazó del inicio */
  onRailScroll?: (scrolled: boolean) => void
  /** Cards un poco más grandes al explorar */
  expanded?: boolean
  locked?: boolean
}

/**
 * Carril horizontal de reinos.
 * Página estática: rueda / arrastre mueven las cards; el click entra al reino.
 */
export function RealmRail({
  onSelect,
  onHoverRealm,
  onRailScroll,
  expanded = false,
  locked = false,
}: RealmRailProps) {
  const reduced = usePrefersReducedMotion()
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const maxX = useRef(0)
  const pointerId = useRef<number | null>(null)
  const dragging = useRef(false)
  const moved = useRef(false)
  const startX = useRef(0)
  const lastX = useRef(0)
  const lastT = useRef(0)
  const velocity = useRef(0)
  const lockedRef = useRef(locked)
  const onRailScrollRef = useRef(onRailScroll)
  const scrolledRef = useRef(false)
  const [, setReady] = useState(false)

  lockedRef.current = locked
  onRailScrollRef.current = onRailScroll

  const raw = useMotionValue(0)
  const x = useSpring(raw, {
    stiffness: reduced ? 320 : 70,
    damping: reduced ? 40 : 24,
    mass: 0.55,
  })

  useEffect(() => {
    return raw.on('change', (value) => {
      const scrolled = Math.abs(value) > 28
      if (scrolled === scrolledRef.current) return
      scrolledRef.current = scrolled
      onRailScrollRef.current?.(scrolled)
    })
  }, [raw])

  const measure = useCallback(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    maxX.current = Math.max(0, track.scrollWidth - viewport.clientWidth)
    const clamped = Math.min(0, Math.max(-maxX.current, raw.get()))
    raw.set(clamped)
    setReady(true)
  }, [raw])

  useEffect(() => {
    measure()
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    const ro = new ResizeObserver(measure)
    ro.observe(viewport)
    ro.observe(track)
    return () => ro.disconnect()
  }, [measure])

  const scrubBy = useCallback(
    (delta: number) => {
      const next = Math.min(0, Math.max(-maxX.current, raw.get() + delta))
      raw.set(next)
    },
    [raw],
  )

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (lockedRef.current) return
      if (maxX.current <= 0) return

      const dominant =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(dominant) < 0.5) return

      e.preventDefault()
      scrubBy(-dominant * 1.15)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [scrubBy])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (lockedRef.current) return
      if (maxX.current <= 0) return
      const target = e.target as Node | null
      const viewport = viewportRef.current
      if (viewport && target && viewport.contains(target)) return

      const dominant =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(dominant) < 0.5) return

      e.preventDefault()
      scrubBy(-dominant * 1.15)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [scrubBy])

  const endDrag = (el: HTMLElement, id: number) => {
    if (pointerId.current !== id) return
    const wasDragging = dragging.current
    const didMove = moved.current
    dragging.current = false
    pointerId.current = null
    try {
      if (wasDragging) el.releasePointerCapture(id)
    } catch {
      /* ignore */
    }
    if (didMove) {
      const boost = velocity.current * 180
      if (Math.abs(boost) > 2) scrubBy(boost)
    }
  }

  const onPointerDown = (e: ReactPointerEvent) => {
    if (locked || e.button !== 0) return
    pointerId.current = e.pointerId
    dragging.current = false
    moved.current = false
    startX.current = e.clientX
    lastX.current = e.clientX
    lastT.current = performance.now()
    velocity.current = 0
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    if (pointerId.current !== e.pointerId) return

    const total = Math.abs(e.clientX - startX.current)
    if (!dragging.current && total >= DRAG_THRESHOLD) {
      dragging.current = true
      moved.current = true
      e.currentTarget.setPointerCapture(e.pointerId)
      lastX.current = e.clientX
      lastT.current = performance.now()
    }

    if (!dragging.current) return

    const now = performance.now()
    const dx = e.clientX - lastX.current
    const dt = Math.max(now - lastT.current, 1)
    velocity.current = dx / dt
    lastX.current = e.clientX
    lastT.current = now
    scrubBy(dx)
  }

  const onPointerUp = (e: ReactPointerEvent) => {
    endDrag(e.currentTarget, e.pointerId)
  }

  return (
    <div
      ref={viewportRef}
      className="relative w-full cursor-grab touch-pan-x active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={() => {
        if (!lockedRef.current) onHoverRealm?.(null)
      }}
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null
        if (next && e.currentTarget.contains(next)) return
        if (!lockedRef.current) onHoverRealm?.(null)
      }}
      role="region"
      aria-label="Reinos de Alejandría"
    >
      <motion.div
        ref={trackRef}
        className="flex w-max gap-4 will-change-transform md:gap-6"
        style={{ x }}
      >
        {realmCards.map((realm, i) => (
          <motion.div
            key={realm.id}
            className="shrink-0"
            initial={reduced ? false : { opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: reduced ? 0 : 0.2 + i * 0.08,
              duration: reduced ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <RealmCard
              realm={realm}
              expanded={expanded}
              onFocusRealm={() => {
                if (dragging.current || lockedRef.current) return
                onHoverRealm?.({
                  image: realm.pageBackground,
                  position: realm.pageBackgroundPosition ?? 'center',
                })
              }}
              onSelect={() => {
                // Solo bloquea si hubo arrastre real
                if (moved.current) return
                onSelect(realm.action)
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
