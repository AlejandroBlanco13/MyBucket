import type { AnimeId } from '../../data/anime'

function CrestRing() {
  return (
    <circle
      cx="200"
      cy="200"
      r="186"
      fill="none"
      stroke="var(--tale-gold)"
      strokeWidth="0.7"
      opacity="0.5"
    />
  )
}

function AlchemyCrest() {
  const ticks = Array.from({ length: 48 }, (_, index) => {
    const angle = (index / 48) * Math.PI * 2 - Math.PI / 2
    const major = index % 6 === 0
    const inner = major ? 156 : 170
    return {
      x1: 200 + Math.cos(angle) * inner,
      y1: 200 + Math.sin(angle) * inner,
      x2: 200 + Math.cos(angle) * 182,
      y2: 200 + Math.sin(angle) * 182,
      major,
    }
  })

  const moons = Array.from({ length: 6 }, (_, index) => {
    const angle = (index / 6) * Math.PI * 2 - Math.PI / 2
    return {
      cx: 200 + Math.cos(angle) * 78,
      cy: 200 + Math.sin(angle) * 78,
    }
  })

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="fma-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--tale-accent)" stopOpacity="0.28" />
          <stop offset="72%" stopColor="var(--tale-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="170" fill="url(#fma-glow)" />
      <g className="crest-spin">
        <circle
          cx="200"
          cy="200"
          r="178"
          fill="none"
          stroke="var(--tale-gold)"
          strokeWidth="0.6"
        />
        <circle
          cx="200"
          cy="200"
          r="148"
          fill="none"
          stroke="var(--tale-accent)"
          strokeWidth="0.45"
          strokeDasharray="1.5 7"
        />
        {ticks.map((tick) => (
          <line
            key={`${tick.x1}-${tick.y1}`}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="var(--tale-gold)"
            strokeWidth={tick.major ? 1.3 : 0.45}
          />
        ))}
      </g>
      <g className="crest-spin-rev">
        <polygon
          points="200,92 292,248 108,248"
          fill="none"
          stroke="var(--tale-gold)"
          strokeWidth="0.9"
        />
        <polygon
          points="200,308 108,152 292,152"
          fill="none"
          stroke="var(--tale-accent)"
          strokeWidth="0.9"
        />
        <circle
          cx="200"
          cy="200"
          r="46"
          fill="none"
          stroke="var(--tale-gold)"
          strokeWidth="0.8"
        />
        {moons.map((moon) => (
          <circle
            key={`${moon.cx}-${moon.cy}`}
            cx={moon.cx}
            cy={moon.cy}
            r="2.4"
            fill="var(--tale-gold)"
          />
        ))}
      </g>
      <circle cx="200" cy="200" r="7" fill="var(--tale-accent)" />
      <CrestRing />
    </svg>
  )
}

const WAVE_ARCS = Array.from({ length: 8 }, (_, row) => {
  const y = 214 + row * 26
  return Array.from({ length: 14 }, (_, col) => {
    const x = -112 + col * 56
    return { key: `${row}-${col}`, d: `M ${x} ${y} A 28 28 0 0 1 ${x + 56} ${y}` }
  })
}).flat()

function SeaCrest() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id="sea-clip">
          <circle cx="200" cy="200" r="184" />
        </clipPath>
        <radialGradient id="sea-glow" cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor="var(--tale-gold)" stopOpacity="0.28" />
          <stop offset="70%" stopColor="var(--tale-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g clipPath="url(#sea-clip)">
        <circle cx="200" cy="200" r="184" fill="#061820" />
        <circle cx="200" cy="200" r="184" fill="url(#sea-glow)" />
        <circle cx="200" cy="146" r="34" fill="var(--tale-gold)" opacity="0.92" />
        <circle
          cx="200"
          cy="146"
          r="52"
          fill="none"
          stroke="var(--tale-gold)"
          strokeWidth="0.6"
          opacity="0.7"
        />
        <ellipse
          cx="200"
          cy="112"
          rx="86"
          ry="15"
          fill="none"
          stroke="var(--tale-gold)"
          strokeWidth="2.2"
        />
        <ellipse
          cx="200"
          cy="104"
          rx="34"
          ry="12"
          fill="none"
          stroke="var(--tale-gold)"
          strokeWidth="1.2"
          opacity="0.8"
        />
        <line
          x1="28"
          y1="206"
          x2="372"
          y2="206"
          stroke="var(--tale-gold)"
          strokeWidth="0.6"
          opacity="0.45"
        />
        <g className="wave-drift">
          {WAVE_ARCS.map((arc) => (
            <path
              key={arc.key}
              d={arc.d}
              fill="none"
              stroke="var(--tale-gold)"
              strokeWidth="0.8"
              opacity="0.55"
            />
          ))}
        </g>
      </g>
      <CrestRing />
    </svg>
  )
}

function WallCrest() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="wall-fog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--tale-gold)" stopOpacity="0.02" />
          <stop offset="100%" stopColor="var(--tale-gold)" stopOpacity="0.16" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="170" fill="url(#wall-fog)" />
      <line
        x1="36"
        y1="332"
        x2="200"
        y2="78"
        stroke="var(--tale-gold)"
        strokeWidth="0.45"
        opacity="0.35"
      />
      <line
        x1="364"
        y1="332"
        x2="200"
        y2="78"
        stroke="var(--tale-gold)"
        strokeWidth="0.45"
        opacity="0.35"
      />
      <line
        x1="78"
        y1="348"
        x2="200"
        y2="128"
        stroke="var(--tale-accent)"
        strokeWidth="0.4"
        opacity="0.4"
      />
      <line
        x1="322"
        y1="348"
        x2="200"
        y2="128"
        stroke="var(--tale-accent)"
        strokeWidth="0.4"
        opacity="0.4"
      />
      <path
        d="M28 312 Q200 28 372 312"
        fill="none"
        stroke="var(--tale-gold)"
        strokeWidth="7"
        opacity="0.28"
      />
      <path
        d="M58 312 Q200 86 342 312"
        fill="none"
        stroke="var(--tale-gold)"
        strokeWidth="4.5"
        opacity="0.48"
      />
      <path
        d="M96 312 Q200 148 304 312"
        fill="none"
        stroke="var(--tale-gold)"
        strokeWidth="3"
        opacity="0.8"
      />
      <line
        x1="200"
        y1="36"
        x2="200"
        y2="330"
        stroke="var(--tale-accent)"
        strokeWidth="1.4"
      />
      <circle cx="200" cy="36" r="4" fill="var(--tale-accent)" />
      <CrestRing />
    </svg>
  )
}

function EclipseCrest() {
  const spikes = Array.from({ length: 28 }, (_, index) => {
    const angle = (index / 28) * Math.PI * 2
    const outer = index % 2 === 0 ? 176 : 154
    return {
      x1: 200 + Math.cos(angle) * 102,
      y1: 200 + Math.sin(angle) * 102,
      x2: 200 + Math.cos(angle) * outer,
      y2: 200 + Math.sin(angle) * outer,
    }
  })

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <g className="crest-spin">
        {spikes.map((spike) => (
          <line
            key={`${spike.x2}-${spike.y2}`}
            x1={spike.x1}
            y1={spike.y1}
            x2={spike.x2}
            y2={spike.y2}
            stroke="var(--tale-accent)"
            strokeWidth="0.7"
            opacity="0.7"
          />
        ))}
      </g>
      <circle cx="168" cy="196" r="74" fill="var(--tale-gold)" opacity="0.92" />
      <circle cx="236" cy="204" r="88" fill="var(--tale-ink)" />
      <circle
        cx="236"
        cy="204"
        r="88"
        fill="none"
        stroke="var(--tale-accent)"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <path
        d="M262 78 L274 118 L266 118 L266 292 L254 292 L254 118 L246 118 Z"
        fill="var(--tale-gold)"
        opacity="0.9"
      />
      <rect x="240" y="116" width="36" height="7" fill="var(--tale-accent)" />
      <CrestRing />
    </svg>
  )
}

function AuraCrest() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id="aura-clip">
          <circle cx="200" cy="200" r="184" />
        </clipPath>
        <radialGradient id="aura-glow" cx="50%" cy="42%" r="48%">
          <stop offset="0%" stopColor="var(--tale-accent)" stopOpacity="0.45" />
          <stop offset="68%" stopColor="var(--tale-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g clipPath="url(#aura-clip)">
        <circle cx="200" cy="200" r="184" fill="#07111c" />
        <circle cx="200" cy="200" r="184" fill="url(#aura-glow)" />
        <path
          d="M16 318 L92 228 L146 268 L200 176 L258 258 L318 206 L384 318 Z"
          fill="var(--tale-gold)"
          opacity="0.16"
        />
        <path
          d="M24 340 L118 246 L176 292 L230 214 L304 300 L376 340 Z"
          fill="var(--tale-gold)"
          opacity="0.28"
        />
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index / 12) * Math.PI * 2
          return (
            <line
              key={angle}
              x1={200 + Math.cos(angle) * 26}
              y1={168 + Math.sin(angle) * 26}
              x2={200 + Math.cos(angle) * 44}
              y2={168 + Math.sin(angle) * 44}
              stroke="var(--tale-gold)"
              strokeWidth="1.3"
            />
          )
        })}
        <circle
          cx="200"
          cy="168"
          r="52"
          fill="none"
          stroke="var(--tale-gold)"
          strokeWidth="0.7"
          opacity="0.45"
        />
        <circle
          cx="200"
          cy="168"
          r="78"
          fill="none"
          stroke="var(--tale-accent)"
          strokeWidth="0.6"
          opacity="0.35"
        />
        {[0, 1, 2].map((index) => (
          <circle
            key={index}
            className="ki-ring"
            cx="200"
            cy="168"
            r="36"
            fill="none"
            stroke="var(--tale-accent)"
            strokeWidth="1.2"
            style={{ animationDelay: `${index * 1.25}s` }}
          />
        ))}
        <circle cx="200" cy="168" r="14" fill="var(--tale-accent)" />
        <circle cx="200" cy="168" r="5" fill="var(--tale-gold)" />
      </g>
      <CrestRing />
    </svg>
  )
}

const crests: Record<AnimeId, () => JSX.Element> = {
  fma: AlchemyCrest,
  onepiece: SeaCrest,
  aot: WallCrest,
  berserk: EclipseCrest,
  dragonball: AuraCrest,
}

export function TaleCrest({ id }: { id: AnimeId }) {
  const Crest = crests[id]
  return <Crest />
}
