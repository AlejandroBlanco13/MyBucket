import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import {
  defaultPageBackground,
  personalRealms,
  type PageBackgroundState,
  type PersonalRealm,
  type RealmAction,
} from '../data/alejandria'
import {
  preloadRealmBackgrounds,
  RealmBackground,
} from '../components/alejandria/RealmBackground'
import { BootLoader } from '../components/alejandria/BootLoader'
import { RealmRail } from '../components/alejandria/RealmRail'
import { PersonalModal } from '../components/alejandria/PersonalModal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const MIN_BOOT_MS = 1600

/**
 * Puerta de entrada — Alejandría (/)
 * Página estática (sin scroll vertical); la rueda desplaza solo los reinos.
 */
export function Alejandria() {
  const navigate = useNavigate()
  const reduced = usePrefersReducedMotion()
  const [activeRealm, setActiveRealm] = useState<PersonalRealm | null>(null)
  const [pageBackground, setPageBackground] =
    useState<PageBackgroundState>(defaultPageBackground)
  const [bootProgress, setBootProgress] = useState(0)
  const [booting, setBooting] = useState(true)
  const [headerHidden, setHeaderHidden] = useState(false)

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const started = performance.now()

    void (async () => {
      await preloadRealmBackgrounds((ratio) => {
        if (!cancelled) setBootProgress(ratio)
      })
      const elapsed = performance.now() - started
      const wait = Math.max(0, (reduced ? 400 : MIN_BOOT_MS) - elapsed)
      if (wait > 0) await new Promise((r) => setTimeout(r, wait))
      if (!cancelled) {
        setBootProgress(1)
        setBooting(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [reduced])

  const onSelect = (action: RealmAction) => {
    if (action === 'mybucket') {
      navigate('/mybucket')
      return
    }
    const realm = personalRealms.find((r) => r.id === action) ?? null
    setActiveRealm(realm)
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-black text-white">
      <AnimatePresence>
        {booting && (
          <BootLoader key="boot" progress={bootProgress} reduced={reduced} />
        )}
      </AnimatePresence>

      <RealmBackground
        background={pageBackground}
        reduced={reduced}
        armed={!booting}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black/90"
        aria-hidden
      />
      <div className="noise-overlay" aria-hidden />

      <motion.main
        className="relative z-10 flex h-full flex-col justify-start px-5 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14"
        initial={false}
        animate={
          booting ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }
        }
        transition={{
          duration: reduced ? 0.2 : 0.9,
          delay: booting ? 0 : reduced ? 0 : 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.header
          className="w-full"
          initial={false}
          animate={
            headerHidden
              ? {
                  opacity: 0,
                  y: -12,
                  height: 0,
                  marginBottom: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                }
              : {
                  opacity: 1,
                  y: 0,
                  height: 'auto',
                  marginBottom: 8,
                  paddingTop: 4,
                  paddingBottom: 4,
                }
          }
          transition={{
            duration: reduced ? 0.2 : 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ overflow: headerHidden ? 'hidden' : 'visible' }}
        >
          <span
            className="inline-block select-none px-2 text-[clamp(3.5rem,9vw,5.25rem)] text-white"
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              lineHeight: 1.2,
            }}
            aria-hidden
          >
            P
          </span>
        </motion.header>

        <div className="flex w-full min-h-0 flex-1 items-center">
          <div className="w-full">
            <RealmRail
              onSelect={onSelect}
              onRailScroll={setHeaderHidden}
              expanded={headerHidden}
              onHoverRealm={(bg) => {
                if (!bg) {
                  setPageBackground(defaultPageBackground)
                  return
                }
                setPageBackground((prev) =>
                  prev.image === bg.image && prev.position === bg.position
                    ? prev
                    : bg,
                )
              }}
              locked={activeRealm !== null || booting}
            />
          </div>
        </div>
      </motion.main>

      <p className="pointer-events-none absolute bottom-5 left-0 right-0 z-10 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-white/35 md:bottom-7">
        Desplaza para explorar · selecciona un reino
      </p>

      <PersonalModal
        realm={activeRealm}
        onClose={() => setActiveRealm(null)}
      />
    </div>
  )
}
