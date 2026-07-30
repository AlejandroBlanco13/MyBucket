import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  alejandriaCopy,
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
import { RealmRail } from '../components/alejandria/RealmRail'
import { PersonalModal } from '../components/alejandria/PersonalModal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

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
    preloadRealmBackgrounds()
  }, [])

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
      <RealmBackground background={pageBackground} reduced={reduced} />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black/90"
        aria-hidden
      />
      <div className="noise-overlay" aria-hidden />

      <main className="relative z-10 flex h-full flex-col justify-center px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-content">
          <motion.header
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 md:mb-12"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/45">
              {alejandriaCopy.brand}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white text-balance md:text-6xl lg:text-7xl">
              {alejandriaCopy.welcome}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              {alejandriaCopy.support}
            </p>
          </motion.header>

          <RealmRail
            onSelect={onSelect}
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
            locked={activeRealm !== null}
          />

          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0 : 0.75, duration: 0.6 }}
            className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-white/35"
          >
            Desplaza para explorar · selecciona un reino
          </motion.p>
        </div>
      </main>

      <PersonalModal
        realm={activeRealm}
        onClose={() => setActiveRealm(null)}
      />
    </div>
  )
}
