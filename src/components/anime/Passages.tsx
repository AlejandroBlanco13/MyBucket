import { useRef, type CSSProperties, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
} from 'motion/react'
import type { AnimeTale } from '../../data/anime'

type PassageProps = {
  tale: AnimeTale
  reduced: boolean
  /** La lámina siguiente sube y tapa a esta mientras sigue fija. */
  overlapNext: boolean
}

function useScrub() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  // 0: el pasaje asoma por abajo. 1: ya ocupa la pantalla.
  const { scrollYProgress: arrive } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  return { ref, scrollYProgress, arrive }
}

type Scrub = ReturnType<typeof useScrub>

function stageHeight(reduced: boolean) {
  return reduced ? 'relative h-svh' : 'relative h-[260svh]'
}

function taleStyle(tale: AnimeTale, reduced: boolean): CSSProperties {
  return {
    backgroundColor: reduced ? tale.ink : 'transparent',
    '--tale-accent': tale.accent,
    '--tale-gold': tale.gold,
    '--tale-ink': tale.ink,
  } as CSSProperties
}

function PassageStage({
  tale,
  reduced,
  overlapNext,
  scrub,
  frameClassName = 'absolute inset-0',
  children,
}: {
  tale: AnimeTale
  reduced: boolean
  overlapNext: boolean
  scrub: Scrub
  frameClassName?: string
  children: ReactNode
}) {
  const { ref, scrollYProgress, arrive } = scrub
  const bridge = !reduced
  const radius = useTransform(arrive, [0, 0.94], [48, 0])
  const gutter = useTransform(arrive, [0, 0.94], [22, 0])
  const sheetWidth = useTransform(gutter, (value) => `calc(100% - ${value * 2}px)`)
  const clip = useTransform(radius, (value) => `inset(0 round ${value}px ${value}px 0 0)`)
  const shadow = useTransform(arrive, (value) => {
    const alpha = (1 - Math.min(1, Math.max(0, value))) * 0.62
    return `0 -42px 80px rgba(0,0,0,${alpha.toFixed(3)})`
  })
  const depth = useTransform([arrive, scrollYProgress], ([entered, progressed]: number[]) => {
    const enter = 1.07 - entered * 0.07
    if (!overlapNext) return enter
    const covered = Math.min(1, Math.max(0, (progressed - 0.34) / 0.66))
    return enter * (1 - covered * 0.14)
  })
  const drift = useTransform(scrollYProgress, (value) => {
    if (!overlapNext) return 0
    const covered = Math.min(1, Math.max(0, (value - 0.34) / 0.66))
    return -covered * 120
  })
  const dim = useTransform(scrollYProgress, [0.4, 1], [0, overlapNext ? 0.28 : 0])

  return (
    <section
      id={tale.id}
      ref={ref}
      className={`${stageHeight(reduced)} ${bridge && overlapNext ? '-mb-[100svh]' : ''}`}
      style={{ ...taleStyle(tale, reduced), zIndex: tale.rank }}
    >
      <motion.div
        className="sticky top-0 h-svh"
        style={
          bridge
            ? {
                marginInline: gutter,
                width: sheetWidth,
                borderTopLeftRadius: radius,
                borderTopRightRadius: radius,
                boxShadow: shadow,
              }
            : undefined
        }
      >
        <motion.div
          className="h-full overflow-hidden"
          style={{
            backgroundColor: tale.ink,
            borderTopLeftRadius: bridge ? radius : 0,
            borderTopRightRadius: bridge ? radius : 0,
            clipPath: bridge ? clip : undefined,
          }}
        >
        <motion.div
          className={frameClassName}
          style={
            bridge
              ? {
                  backgroundColor: tale.ink,
                  scale: depth,
                  y: drift,
                  transformOrigin: 'center center',
                }
              : { backgroundColor: tale.ink }
          }
        >
          {children}
          {bridge && overlapNext && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 bg-black"
              style={{ opacity: dim }}
            />
          )}
        </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function TaleCopy({
  tale,
  className,
  style,
}: {
  tale: AnimeTale
  className?: string
  style?: MotionStyle
}) {
  return (
    <motion.div className={className} style={style}>
      <div className="flex items-center gap-3">
        <span
          lang="ja"
          className="font-mincho text-sm tracking-[0.32em] text-[color:var(--tale-gold)]"
        >
          {tale.position}
        </span>
        <span className="h-px w-8 bg-white/30" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
          {String(tale.rank).padStart(2, '0')} / 05
        </span>
      </div>
      <h2 className="mt-3 max-w-[11ch] font-display text-[clamp(2.35rem,5.6vw,5.15rem)] font-extrabold leading-[0.88] tracking-[-0.03em] text-balance text-white">
        {tale.title}
      </h2>
      <p
        lang="ja"
        className="mt-3 font-mincho text-lg tracking-[0.28em] text-white/80 md:text-xl"
      >
        {tale.titleJa}
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
        {tale.author} · {tale.edition}
      </p>
      <p className="mt-4 max-w-[28ch] font-mincho text-[clamp(1.12rem,1.8vw,1.7rem)] leading-snug text-balance text-[color:var(--tale-gold)]">
        {tale.thesis}
      </p>
      <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-white/78 md:text-[15px]">
        {tale.body}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {tale.themes.map((theme) => (
          <li
            key={theme}
            className="border border-white/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/75"
          >
            {theme}
          </li>
        ))}
      </ul>
      <p
        lang="ja"
        className="mt-4 font-mincho text-sm tracking-[0.42em] text-[color:var(--tale-accent)]"
      >
        {tale.phrase}
      </p>
    </motion.div>
  )
}

function Credit({ tale }: { tale: AnimeTale }) {
  if (!tale.credit) return null
  return (
    <p className="pointer-events-none absolute right-4 top-16 z-20 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40 md:top-20">
      {tale.credit}
    </p>
  )
}

function motionOr<T>(reduced: boolean, style: T): T | undefined {
  return reduced ? undefined : style
}

function FmaPassage({ tale, reduced, overlapNext }: PassageProps) {
  const scrub = useScrub()
  const { scrollYProgress } = scrub
  const scale = useTransform(scrollYProgress, [0, 1], [1.22, 1.04])
  const mask = useTransform(scrollYProgress, (value: number) => {
    const opened = Math.min(1, Math.max(0, value / 0.72))
    const solid = 84 + opened * 16
    const fade = Math.min(100, solid + 12 - opened * 8)
    return `radial-gradient(circle at 50% 52%, #000 ${solid}%, transparent ${fade}%)`
  })
  const ring = useTransform(scrollYProgress, [0.08, 0.78], [760, 0])
  const copyY = useTransform(scrollYProgress, [0, 0.32], [28, 0])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.24], [0.35, 1])

  return (
    <PassageStage tale={tale} reduced={reduced} overlapNext={overlapNext} scrub={scrub}>
        <motion.img
          src={tale.image}
          alt={tale.imageAlt}
          className="absolute inset-[-8%] h-[116%] w-[116%] max-w-none object-cover"
          style={motionOr(reduced, {
            scale,
            maskImage: mask,
            WebkitMaskImage: mask,
          })}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#140e0c] via-[#140e0c]/80 to-[#140e0c]/25 sm:bg-gradient-to-r sm:from-[#140e0c] sm:via-[#140e0c]/75 sm:to-transparent" />
        <svg
          viewBox="0 0 400 400"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[min(72vh,640px)] w-[min(72vh,640px)] -translate-x-1/2 -translate-y-1/2 md:block"
          aria-hidden
        >
          <motion.circle
            cx="200"
            cy="200"
            r="168"
            fill="none"
            stroke="var(--tale-gold)"
            strokeWidth="0.8"
            strokeDasharray="760"
            style={motionOr(reduced, { strokeDashoffset: ring })}
          />
          <circle
            cx="200"
            cy="200"
            r="8"
            fill="var(--tale-accent)"
          />
        </svg>
        <div className="passage-grain" aria-hidden />
        <TaleCopy
          tale={tale}
          className="absolute inset-x-0 bottom-0 z-10 px-5 pb-20 sm:bottom-auto sm:left-0 sm:top-1/2 sm:w-[min(48vw,34rem)] sm:-translate-y-1/2 sm:px-10 sm:pb-0 lg:px-16"
          style={motionOr(reduced, { y: copyY, opacity: copyOpacity })}
        />
        <Credit tale={tale} />
    </PassageStage>
  )
}

const WAVE_PATH =
  'M0 80 Q40 28 80 80 T160 80 T240 80 T320 80 T400 80 T480 80 T560 80 T640 80 T720 80 T800 80 T880 80 T960 80 T1040 80 T1120 80 T1200 80 T1280 80 V140 H0 Z'

function SeaPassage({ tale, reduced, overlapNext }: PassageProps) {
  const scrub = useScrub()
  const { scrollYProgress } = scrub
  const driftY = useTransform(scrollYProgress, [0, 1], ['-7%', '9%'])
  const waveX = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const horizon = useTransform(scrollYProgress, [0.08, 0.5], [0.15, 1])
  const copyY = useTransform(scrollYProgress, [0, 0.4], [48, 0])

  return (
    <PassageStage tale={tale} reduced={reduced} overlapNext={overlapNext} scrub={scrub}>
        <motion.img
          src={tale.image}
          alt={tale.imageAlt}
          className="absolute inset-x-[-4%] top-[-8%] h-[120%] w-[108%] max-w-none object-cover object-[center_45%]"
          style={motionOr(reduced, { y: driftY })}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041018] via-[#041018]/55 to-black/10" />
        <motion.div
          className="pointer-events-none absolute inset-x-8 top-[46%] hidden h-px origin-left bg-[var(--tale-gold)] md:block"
          style={motionOr(reduced, { scaleX: horizon })}
        />
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-16 h-28 md:bottom-8"
          style={motionOr(reduced, { x: waveX })}
          aria-hidden
        >
          <svg
            viewBox="0 0 1280 140"
            className="h-full w-[150%] max-w-none"
            preserveAspectRatio="none"
          >
            <path d={WAVE_PATH} fill="var(--tale-gold)" opacity="0.16" />
          </svg>
        </motion.div>
        <div className="passage-grain" aria-hidden />
        <TaleCopy
          tale={tale}
          className="absolute inset-x-0 bottom-0 z-10 px-5 pb-28 sm:px-10 md:px-14 md:pb-16 lg:px-16"
          style={motionOr(reduced, { y: copyY })}
        />
    </PassageStage>
  )
}

function WallPassage({ tale, reduced, overlapNext }: PassageProps) {
  const scrub = useScrub()
  const { scrollYProgress } = scrub
  const clipPath = useTransform(scrollYProgress, (value: number) => {
    const opened = Math.min(1, Math.max(0, value / 0.62))
    const side = 12 * (1 - opened)
    return `inset(0% ${side}% 0% ${side}%)`
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1.16, 1.02])
  const line = useTransform(scrollYProgress, [0.05, 0.7], [0.04, 1])
  const textX = useTransform(scrollYProgress, [0, 0.38], [-36, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [0, 1])

  return (
    <PassageStage tale={tale} reduced={reduced} overlapNext={overlapNext} scrub={scrub}>
        <motion.img
          src={tale.image}
          alt={tale.imageAlt}
          className="absolute inset-[-6%] h-[112%] w-[112%] max-w-none object-cover object-center"
          style={motionOr(reduced, { clipPath, scale })}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/40 sm:to-transparent" />
        <motion.span
          className="pointer-events-none absolute left-[18%] top-0 z-10 hidden w-px bg-[var(--tale-accent)] md:block"
          style={motionOr(reduced, {
            height: '100%',
            scaleY: line,
            transformOrigin: 'top center',
          })}
        />
        <div className="passage-grain opacity-40" aria-hidden />
        <TaleCopy
          tale={tale}
          className="absolute inset-x-0 bottom-0 z-10 px-5 pb-20 sm:bottom-auto sm:left-0 sm:top-1/2 sm:w-[min(46vw,32rem)] sm:-translate-y-1/2 sm:px-10 sm:pb-0 lg:px-14"
          style={motionOr(reduced, { x: textX, opacity: textOpacity })}
        />
        <Credit tale={tale} />
    </PassageStage>
  )
}

function EclipsePassage({ tale, reduced, overlapNext }: PassageProps) {
  const scrub = useScrub()
  const { scrollYProgress } = scrub
  const scale = useTransform(scrollYProgress, [0, 1], [1.35, 1])
  const corona = useTransform(scrollYProgress, [0.1, 0.8], [0.12, 0.7])
  const grain = useTransform(scrollYProgress, [0, 1], [0.12, 0.38])
  const copyY = useTransform(scrollYProgress, [0.12, 0.48], [40, 0])
  const copyOpacity = useTransform(scrollYProgress, [0.08, 0.4], [0, 1])

  return (
    <PassageStage
      tale={tale}
      reduced={reduced}
      overlapNext={overlapNext}
      scrub={scrub}
      frameClassName="absolute inset-0 flex items-end"
    >
        <motion.img
          src={tale.image}
          alt={tale.imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={motionOr(reduced, { scale })}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(120,16,12,0.28)_42%,rgba(0,0,0,0.72)_78%)]"
          style={motionOr(reduced, { opacity: corona })}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
        <motion.div
          className="passage-grain"
          style={motionOr(reduced, { opacity: grain })}
          aria-hidden
        />
        <TaleCopy
          tale={tale}
          className="relative z-10 w-full px-5 pb-24 sm:px-10 md:px-16 md:pb-16"
          style={motionOr(reduced, { y: copyY, opacity: copyOpacity })}
        />
        <Credit tale={tale} />
    </PassageStage>
  )
}

function AuraPassage({ tale, reduced, overlapNext }: PassageProps) {
  const scrub = useScrub()
  const { scrollYProgress } = scrub
  const driftY = useTransform(scrollYProgress, [0, 1], ['-4%', '6%'])
  const burst = useTransform(scrollYProgress, [0.12, 0.86], [0.35, 2.4])
  const burstOpacity = useTransform(scrollYProgress, [0.12, 0.42, 0.86], [0, 0.85, 0])
  const burstLate = useTransform(scrollYProgress, [0.28, 0.95], [0.2, 1.9])
  const titleScale = useTransform(scrollYProgress, [0, 0.42], [0.92, 1])

  return (
    <PassageStage tale={tale} reduced={reduced} overlapNext={overlapNext} scrub={scrub}>
        <motion.img
          src={tale.image}
          alt={tale.imageAlt}
          className="absolute inset-[-4%] h-[112%] w-[108%] max-w-none object-cover object-center"
          style={motionOr(reduced, { y: driftY })}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />
        <motion.span
          className="pointer-events-none absolute left-[22%] top-[42%] h-40 w-40 rounded-full border border-[#f2c14e]"
          style={motionOr(reduced, {
            x: '-50%',
            y: '-50%',
            scale: burst,
            opacity: burstOpacity,
          })}
        />
        <motion.span
          className="pointer-events-none absolute left-[22%] top-[42%] h-56 w-56 rounded-full border border-[#f08a2a]/80"
          style={motionOr(reduced, {
            x: '-50%',
            y: '-50%',
            scale: burstLate,
            opacity: burstOpacity,
          })}
        />
        <div className="passage-grain" aria-hidden />
        <TaleCopy
          tale={tale}
          className="absolute inset-x-0 bottom-0 z-10 px-5 pb-24 sm:px-10 md:px-16 md:pb-16"
          style={motionOr(reduced, { scale: titleScale, transformOrigin: 'left bottom' })}
        />
        <Credit tale={tale} />
    </PassageStage>
  )
}

const scenes: Record<
  AnimeTale['id'],
  (props: PassageProps) => JSX.Element
> = {
  fma: FmaPassage,
  onepiece: SeaPassage,
  aot: WallPassage,
  berserk: EclipsePassage,
  dragonball: AuraPassage,
}

export function TalePassage({ tale, reduced }: Omit<PassageProps, 'overlapNext'>) {
  const Scene = scenes[tale.id]
  const overlapNext = tale.id !== 'dragonball'
  return <Scene tale={tale} reduced={reduced} overlapNext={overlapNext} />
}
