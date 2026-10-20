import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'motion/react'

type Side = 'left' | 'right' | 'center'

type Bud = {
  id: string
  title: string
  titleJa: string
  glyph: string
  kicker: string
  phrase: string
  body: string
  accent: string
  x: number
  y: number
  at: number
  side: Side
  seal?: 'heart' | 'root'
}

const buds: Bud[] = [
  {
    id: 'dragonball',
    title: 'Dragon Ball',
    titleJa: 'ドラゴンボール',
    glyph: '龍',
    kicker: 'El primero',
    phrase: 'Insistir hasta que el cielo ceda.',
    body: 'Fue la puerta. Antes de las teorías estaba el entrenamiento: caer, volver y seguir.',
    accent: '#f2c14e',
    x: 50,
    y: 84,
    at: 0,
    side: 'center',
    seal: 'root',
  },
  {
    id: 'deathnote',
    title: 'Death Note',
    titleJa: 'デスノート',
    glyph: '死',
    kicker: 'Lo serio',
    phrase: 'Quien juzga también se escribe.',
    body: 'Aquí el anime dejó de ser solo aventura. La mente pesa más que el puño.',
    accent: '#e15a4a',
    x: 25,
    y: 63,
    at: 0.32,
    side: 'left',
  },
  {
    id: 'bleach',
    title: 'Bleach',
    titleJa: 'ブリーチ',
    glyph: '魂',
    kicker: 'Lo serio',
    phrase: 'Hay un deber detrás de lo visible.',
    body: 'El otro lado del mundo, y protegerlo aunque nadie lo vea.',
    accent: '#f08a2a',
    x: 75,
    y: 63,
    at: 0.32,
    side: 'right',
  },
  {
    id: 'aot',
    title: 'Attack on Titan',
    titleJa: '進撃の巨人',
    glyph: '壁',
    kicker: 'La adolescencia',
    phrase: 'La libertad cobra al cruzar el muro.',
    body: 'El golpe de esos años. No era cómo salir: era en qué te convertías al mirar afuera.',
    accent: '#d9c7a6',
    x: 50,
    y: 44,
    at: 0.52,
    side: 'center',
  },
  {
    id: 'fma',
    title: 'Fullmetal Alchemist',
    titleJa: '鋼の錬金術師',
    glyph: '鋼',
    kicker: 'El favorito',
    phrase: 'Nada vuelve si no entregas su valor.',
    body: 'La equivalencia se quedó como brújula. Lo que pides, lo pagas.',
    accent: '#e4b86a',
    x: 50,
    y: 28,
    at: 0.64,
    side: 'center',
    seal: 'heart',
  },
  {
    id: 'berserk',
    title: 'Berserk',
    titleJa: 'ベルセルク',
    glyph: '闇',
    kicker: 'El manga',
    phrase: 'Seguir, aunque el eclipse ya pasó.',
    body: 'El manga favorito. Por él empecé a leer: la viñeta se volvió camino.',
    accent: '#c9a27a',
    x: 24,
    y: 7,
    at: 0.84,
    side: 'left',
  },
  {
    id: 'onepiece',
    title: 'One Piece',
    titleJa: 'ワンピース',
    glyph: '海',
    kicker: 'El horizonte',
    phrase: 'El mar no tiene techo si vas acompañado.',
    body: 'La tripulación y un mapa que se niega a cerrarse.',
    accent: '#e6c27a',
    x: 76,
    y: 7,
    at: 0.84,
    side: 'right',
  },
]

const branches: { d: string; from: number; to: number; faint?: boolean }[] = [
  {
    d: 'M500 2320 C460 2368 400 2360 360 2324',
    from: -0.2,
    to: 0,
    faint: true,
  },
  {
    d: 'M500 2320 C540 2368 600 2360 640 2324',
    from: -0.2,
    to: 0,
    faint: true,
  },
  {
    d: 'M500 2348 C470 2384 430 2372 408 2340',
    from: -0.2,
    to: 0,
    faint: true,
  },
  {
    d: 'M500 2348 C530 2384 570 2372 592 2340',
    from: -0.2,
    to: 0,
    faint: true,
  },
  {
    d: 'M500 2288 C518 2180 476 2088 500 2016 C524 1900 478 1780 500 1680',
    from: -0.18,
    to: 0.18,
  },
  {
    d: 'M500 1680 C430 1620 330 1564 250 1512',
    from: 0.22,
    to: 0.36,
  },
  {
    d: 'M500 1680 C570 1620 670 1564 750 1512',
    from: 0.22,
    to: 0.36,
  },
  {
    d: 'M500 1680 C490 1500 510 1280 500 1056 C492 900 512 780 500 672 C496 560 506 470 500 400',
    from: 0.36,
    to: 0.72,
  },
  {
    d: 'M500 400 C430 330 330 250 240 168',
    from: 0.72,
    to: 0.9,
  },
  {
    d: 'M500 400 C570 330 670 250 760 168',
    from: 0.72,
    to: 0.9,
  },
]

function InkBranch({
  d,
  progress,
  from,
  to,
  faint = false,
}: {
  d: string
  progress: MotionValue<number>
  from: number
  to: number
  faint?: boolean
}) {
  const ref = useRef<SVGPathElement>(null)
  const [length, setLength] = useState(1)

  useLayoutEffect(() => {
    const next = ref.current?.getTotalLength()
    if (next && next > 0) setLength(next)
  }, [d])

  const offset = useTransform(progress, [from, to], [length, 0])
  const draw = {
    d,
    fill: 'none' as const,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    vectorEffect: 'non-scaling-stroke' as const,
    strokeDasharray: length,
    style: { strokeDashoffset: offset },
  }

  return (
    <g>
      <motion.path
        {...draw}
        stroke={faint ? '#4a3828' : '#5c4030'}
        strokeWidth={faint ? 2.4 : 6}
        opacity={0.55}
      />
      <motion.path
        ref={ref}
        {...draw}
        stroke={faint ? '#c4a574' : '#e4c48a'}
        strokeWidth={faint ? 1.05 : 1.55}
      />
    </g>
  )
}

function BudLabel({
  bud,
  progress,
  reduced,
}: {
  bud: Bud
  progress: MotionValue<number>
  reduced: boolean
}) {
  const rooted = bud.at <= 0
  const opacity = useTransform(
    progress,
    rooted ? [0, 1] : [bud.at, bud.at + 0.07],
    rooted ? [1, 1] : [0, 1],
  )
  const rise = useTransform(progress, rooted ? [0, 1] : [bud.at, bud.at + 0.08], rooted ? [0, 0] : [18, 0])
  const seal =
    bud.seal === 'heart' ? 'h-14 w-14 text-xl md:h-16 md:w-16' : 'h-11 w-11 text-base md:h-12 md:w-12'

  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: `${bud.x}%`,
        top: `${bud.y}%`,
        opacity: reduced ? 1 : opacity,
        y: reduced ? 0 : rise,
      }}
    >
      <div
        className={`absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-[#100c0a]/90 font-mincho ${seal}`}
        style={{ borderColor: bud.accent, color: bud.accent, boxShadow: `0 0 24px ${bud.accent}33` }}
      >
        <span lang="ja">{bud.glyph}</span>
        {bud.seal === 'heart' && (
          <span
            className="pointer-events-none absolute inset-[-5px] rounded-full border"
            style={{ borderColor: `${bud.accent}88` }}
          />
        )}
      </div>
      <div
        className={`absolute top-7 w-[min(36vw,14rem)] -translate-x-1/2 rounded-sm bg-[#100c0a] px-2.5 py-2 text-center shadow-[0_16px_40px_rgba(0,0,0,0.55)] md:top-8 md:px-3 ${
          bud.side === 'right'
            ? 'left-1/2 md:left-[calc(100%+0.85rem)] md:translate-x-0 md:text-left'
            : 'left-1/2 md:left-auto md:right-[calc(100%+0.85rem)] md:translate-x-0 md:text-right'
        }`}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">{bud.kicker}</p>
        <h3 className="mt-1 font-display text-[0.95rem] font-semibold leading-tight text-white md:text-lg">
          {bud.title}
        </h3>
        <p lang="ja" className="mt-0.5 font-mincho text-[11px] tracking-[0.18em] text-white/55">
          {bud.titleJa}
        </p>
        <p className="mt-1.5 font-mincho text-[0.95rem] leading-snug text-balance" style={{ color: bud.accent }}>
          {bud.phrase}
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-white/68 md:text-xs">{bud.body}</p>
      </div>
    </motion.div>
  )
}

function CrownLine({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.78, 0.9], [0, 1])
  return (
    <motion.p
      className="absolute left-1/2 top-[1.6%] w-[min(52vw,18rem)] -translate-x-1/2 text-center font-mincho text-sm leading-relaxed text-[#e0b15a]/85"
      style={{ opacity }}
    >
      La copa. El manga que me hizo leer, y el mar que sigue abierto.
    </motion.p>
  )
}

function StaticRoots() {
  return (
    <section id="raices" className="relative bg-[#070605] px-5 py-24 text-white sm:px-10 md:px-16">
      <div className="mx-auto max-w-xl">
        <p lang="ja" className="font-mincho text-sm tracking-[0.42em] text-[#e0b15a]">
          根
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">Cómo entré</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          El ranking es la casa. Esto es la raíz: el orden en que el anime me encontró.
        </p>
        <ol className="mt-12 space-y-10 border-l border-[#e4c48a]/35 pl-6">
          {buds.map((bud) => (
            <li key={bud.id}>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">{bud.kicker}</p>
              <h3 className="mt-1 font-display text-2xl font-semibold">{bud.title}</h3>
              <p className="mt-2 font-mincho text-lg leading-snug" style={{ color: bud.accent }}>
                {bud.phrase}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{bud.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function RootTree({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const treeRef = useRef<HTMLDivElement>(null)
  const treeHeight = useMotionValue(1)
  const viewHeight = useMotionValue(1)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  useLayoutEffect(() => {
    const measure = () => {
      treeHeight.set(treeRef.current?.offsetHeight ?? 1)
      viewHeight.set(window.innerHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [treeHeight, viewHeight])

  const climb = useTransform([scrollYProgress, treeHeight, viewHeight], ([progress, tree, view]: number[]) => {
    const hold = Math.min(1, Math.max(0, (progress - 0.06) / 0.88))
    const start = -tree + view * 0.78
    const end = view * 0.2
    return start + (end - start) * hold
  })
  const labelOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 1, 0])

  if (reduced) return <StaticRoots />

  return (
    <section ref={ref} id="raices" className="relative z-20 h-[320svh] bg-[#070605] text-white">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-[#070605] to-transparent" />
        <motion.div className="absolute left-5 top-20 z-20 sm:left-10 md:left-14" style={{ opacity: labelOpacity }}>
          <p lang="ja" className="font-mincho text-sm tracking-[0.42em] text-[#e0b15a]">
            根
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">Cómo entré</p>
        </motion.div>
        <motion.div
          ref={treeRef}
          className="absolute left-1/2 top-0 w-[min(92vw,680px)] max-md:w-[94vw]"
          style={{ x: '-50%', y: climb, aspectRatio: '1000 / 2400', minHeight: '250svh' }}
        >
          <svg
            viewBox="0 0 1000 2400"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden
          >
            {branches.map((branch) => (
              <InkBranch
                key={branch.d}
                d={branch.d}
                progress={scrollYProgress}
                from={branch.from}
                to={branch.to}
                faint={branch.faint}
              />
            ))}
          </svg>
          {buds.map((bud) => (
            <BudLabel key={bud.id} bud={bud} progress={scrollYProgress} reduced={false} />
          ))}
          <CrownLine progress={scrollYProgress} />
        </motion.div>
      </div>
    </section>
  )
}
