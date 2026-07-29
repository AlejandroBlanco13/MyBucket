import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function Footer() {
  const year = new Date().getFullYear()
  const reduced = usePrefersReducedMotion()

  return (
    <footer className="relative z-0 border-t border-line bg-paper py-10 dark:border-line-dark">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center md:px-8"
      >
        <div>
          <p className="font-display text-xl font-semibold text-ink">
            {profile.brand}
          </p>
          <p className="mt-1 text-sm text-mute">{profile.fullName}</p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
          © {year} · Hecho con disciplina en blanco, gris y negro
        </p>
      </motion.div>
    </footer>
  )
}
