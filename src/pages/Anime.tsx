import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { animeTales } from '../data/anime'
import { TalePassage } from '../components/anime/Passages'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function Asanoha({ id }: { id: string }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
      aria-hidden
    >
      <defs>
        <pattern id={id} width="56" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M28 0 L56 16 L28 32 L0 16 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.7"
          />
          <path d="M28 0 V32 M0 16 H56" fill="none" stroke="white" strokeWidth="0.45" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

function Gate({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onEnter}
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#100c0a] text-white"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <Asanoha id="asanoha-gate" />
      <div className="relative flex flex-col items-center px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-white/45">
          Alejandría · Anime
        </p>
        <div className="relative mt-5">
          <p
            lang="ja"
            className="font-mincho text-[clamp(4.5rem,14vw,8rem)] leading-none tracking-[0.14em]"
          >
            番付
          </p>
          <span
            aria-hidden
            lang="ja"
            className="seal-stamp absolute -right-2 -top-3 flex h-16 w-16 items-center justify-center border-2 border-[#c4372a] font-mincho text-lg text-[#e15a4a] md:-right-8 md:h-[4.5rem] md:w-[4.5rem] md:text-xl"
            style={{ writingMode: 'vertical-rl' }}
          >
            五大
          </span>
        </div>
        <p lang="ja" className="mt-6 font-mincho text-lg tracking-[0.42em] text-[#e0b15a]">
          五大物語
        </p>
        <p className="mt-3 max-w-xs text-center text-sm leading-relaxed text-white/60">
          Cinco pasajes. Desplaza para atravesarlos.
        </p>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.32em] text-white/35">
          Toca para entrar
        </p>
      </div>
    </motion.button>
  )
}

function scrollToTale(id: string, reduced: boolean) {
  document.getElementById(id)?.scrollIntoView({
    behavior: reduced ? 'auto' : 'smooth',
    block: 'start',
  })
}

/**
 * 番付 — emaki de cinco pasajes.
 * El scroll fija cada relato y lo anima con su propio gesto.
 */
export function Anime() {
  const reduced = usePrefersReducedMotion()
  const [gate, setGate] = useState(() => !prefersReducedMotion())
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<string | null>(null)
  const tale = animeTales[active]
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  })

  useEffect(() => {
    const previousTitle = document.title
    return () => {
      document.title = previousTitle
    }
  }, [])

  useEffect(() => {
    document.title = `${tale.title} · 番付`
  }, [tale.title])

  useEffect(() => {
    if (!gate) return
    const previousHtml = document.documentElement.style.overflow
    const previousBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    const timeout = window.setTimeout(() => setGate(false), reduced ? 280 : 1600)
    return () => {
      window.clearTimeout(timeout)
      document.documentElement.style.overflow = previousHtml
      document.body.style.overflow = previousBody
    }
  }, [gate, reduced])

  useEffect(() => {
    const nodes = animeTales
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const index = animeTales.findIndex((item) => item.id === visible.target.id)
        if (index >= 0) setActive(index)
      },
      { rootMargin: '-42% 0px -48% 0px', threshold: [0, 0.15, 0.4] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const shellVars = {
    '--tale-accent': tale.accent,
    '--tale-gold': tale.gold,
  } as CSSProperties

  const preview = animeTales.find((item) => item.id === hovered) ?? null

  return (
    <div className="min-h-screen bg-[#070605] text-white" style={shellVars}>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />
        <Link
          to="/"
          className="relative z-10 font-mono text-[10px] uppercase tracking-[0.28em] text-white/60 transition-colors hover:text-white"
        >
          <span className="sm:hidden">← Volver</span>
          <span className="hidden sm:inline">← Alejandría</span>
        </Link>
        <p
          lang="ja"
          className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 font-mincho text-sm tracking-[0.45em]"
        >
          番付
        </p>
        <p className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
          {String(tale.rank).padStart(2, '0')} / 05
        </p>
      </header>

      <div className="fixed inset-x-0 top-0 z-40 h-px bg-white/10" aria-hidden>
        <motion.div
          className="h-px origin-left bg-[var(--tale-accent)]"
          style={{ scaleX: reduced ? 1 : progress }}
        />
      </div>

      <nav
        aria-label="Pasajes del ranking"
        className="fixed left-1/2 top-[3.15rem] z-40 flex -translate-x-1/2 gap-1.5 rounded-full border border-white/10 bg-black/45 px-2 py-1 backdrop-blur-md md:left-auto md:right-5 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:flex-col md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none"
      >
        {animeTales.map((item, index) => {
          const selected = index === active
          return (
            <button
              key={item.id}
              type="button"
              aria-label={`${item.rank}. ${item.title}`}
              aria-current={selected ? 'true' : undefined}
              onClick={() => scrollToTale(item.id, reduced)}
              className={`flex items-center gap-2 px-2 py-1 font-mincho text-sm transition-colors md:px-0 ${
                selected ? 'text-[color:var(--tale-gold)]' : 'text-white/40 hover:text-white'
              }`}
            >
              <span
                className={`hidden h-px transition-all md:block ${
                  selected ? 'w-8 bg-[var(--tale-accent)]' : 'w-3 bg-white/30'
                }`}
              />
              <span lang="ja">{item.kanjiRank}</span>
            </button>
          )
        })}
      </nav>

      <main>
        <section
          id="anime-index"
          className="relative flex min-h-svh flex-col justify-center overflow-x-hidden px-5 pb-24 pt-24 sm:px-10 md:px-16 md:pb-16 lg:px-24"
        >
          <Asanoha id="asanoha-index" />
          <div className="relative grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
                Alejandría · ranking personal
              </p>
              <h1
                lang="ja"
                className="mt-4 font-mincho text-[clamp(4rem,12vw,8rem)] leading-none tracking-[0.08em]"
              >
                番付
              </h1>
              <p className="mt-4 max-w-md font-mincho text-2xl leading-snug text-[#e0b15a] text-balance">
                Cinco relatos. Un emaki para atravesar.
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                El orden es el de esta casa. Desplaza: cada pasaje se queda,
                respira y recién entonces cede el sitio al siguiente.
              </p>
            </div>

            <div className="relative">
              <AnimatePresence>
                {preview && (
                  <motion.img
                    key={preview.id}
                    src={preview.image}
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.38 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0.01 : 0.45 }}
                    className="pointer-events-none absolute -inset-6 hidden object-cover lg:block"
                  />
                )}
              </AnimatePresence>
              <ol className="relative flex flex-col">
                {animeTales.map((item) => (
                  <li key={item.id} className="border-t border-white/10 last:border-b">
                    <button
                      type="button"
                      onClick={() => scrollToTale(item.id, reduced)}
                      onMouseEnter={() => setHovered(item.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(item.id)}
                      onBlur={() => setHovered(null)}
                      className="flex w-full items-baseline justify-between gap-4 py-3 text-left transition-colors hover:text-[color:var(--tale-gold)]"
                    >
                      <span className="flex items-baseline gap-4">
                        <span lang="ja" className="font-mincho text-xl text-white/45">
                          {item.kanjiRank}
                        </span>
                        <span className="font-display text-lg font-semibold tracking-tight md:text-2xl">
                          {item.title}
                        </span>
                      </span>
                      <span
                        lang="ja"
                        className="hidden font-mincho text-sm tracking-[0.22em] text-white/40 sm:inline"
                      >
                        {item.titleJa}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {animeTales.map((item) => (
          <TalePassage key={item.id} tale={item} reduced={reduced} />
        ))}
      </main>

      <AnimatePresence>
        {gate && <Gate key="gate" onEnter={() => setGate(false)} />}
      </AnimatePresence>
    </div>
  )
}
