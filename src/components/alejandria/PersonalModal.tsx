import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { personalRealms, type PersonalRealm } from '../../data/alejandria'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type PersonalModalProps = {
  realm: PersonalRealm | null
  onClose: () => void
}

export function PersonalModal({ realm, onClose }: PersonalModalProps) {
  const reduced = usePrefersReducedMotion()
  const open = realm !== null

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const others = personalRealms.filter((r) => r.id !== realm?.id)

  return (
    <AnimatePresence>
      {open && realm && (
        <motion.div
          key={`personal-${realm.id}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="personal-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.4 }}
          className="fixed inset-0 z-[70] flex items-end justify-center md:items-center"
        >
          <button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 bg-black/80"
            onClick={onClose}
          />

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{
              duration: reduced ? 0.15 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden border border-white/10 bg-neutral-950 md:mx-6"
          >
            <div className="relative h-[220px] shrink-0 overflow-hidden md:h-[280px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${realm.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/50 to-black/30" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar modal"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
              >
                <X size={16} />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
                  {realm.subtitle}
                </p>
                <h2
                  id="personal-modal-title"
                  className="mt-2 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl"
                >
                  {realm.title}
                </h2>
              </div>
            </div>

            <div className="overflow-y-auto px-6 py-6 md:px-8 md:py-8">
              <p className="max-w-xl text-base leading-relaxed text-white/65">
                {realm.description}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                Contenido en construcción
              </p>

              {others.length > 0 && (
                <div className="mt-10 border-t border-white/10 pt-8">
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                    Otros mundos
                  </p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {others.map((item) => (
                      <li key={item.id}>
                        <article className="relative h-[120px] overflow-hidden border border-white/10">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.image})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-3">
                            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                              {item.subtitle}
                            </p>
                            <p className="font-display text-lg font-semibold text-white">
                              {item.title}
                            </p>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
