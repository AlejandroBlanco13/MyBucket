import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { profile, navItems } from '../../data/profile'
import { useTheme } from '../../context/ThemeContext'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const scrollTo = useSmoothScroll()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > 40) {
        setHidden(true)
        if (idleTimer.current) clearTimeout(idleTimer.current)
        idleTimer.current = setTimeout(() => setHidden(false), 700)
      } else {
        setHidden(false)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (href: string) => {
    scrollTo(href)
    setOpen(false)
  }

  const controlsHidden = hidden && !open

  return (
    <>
      {/* Retorno a la puerta Alejandría */}
      <motion.div
        initial={false}
        animate={{
          opacity: controlsHidden ? 0 : 1,
          y: controlsHidden ? -12 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed left-5 top-5 z-50 md:left-8 md:top-7"
        style={{ pointerEvents: controlsHidden ? 'none' : 'auto' }}
      >
        <Link
          to="/"
          className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.28em] text-mute transition-colors hover:text-ink"
        >
          ← Alejandría
        </Link>
      </motion.div>

      {/* Controles flotantes — sin barra */}
      <motion.div
        initial={false}
        animate={{
          opacity: controlsHidden ? 0 : 1,
          y: controlsHidden ? -12 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed right-5 top-5 z-50 flex items-center gap-2 md:right-8 md:top-7"
        style={{ pointerEvents: controlsHidden ? 'none' : 'auto' }}
      >
        <button
          onClick={toggleTheme}
          aria-label="Cambiar tema"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-line/80 bg-paper/70 text-ink backdrop-blur-md transition-colors hover:bg-paper dark:border-line-dark dark:bg-paper/60"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          className="pointer-events-auto relative flex h-11 w-11 items-center justify-center rounded-full border border-line/80 bg-paper/70 text-ink backdrop-blur-md transition-colors hover:bg-paper dark:border-line-dark dark:bg-paper/60"
        >
          <span className="sr-only">{open ? 'Cerrar' : 'Menú'}</span>
          <span className="relative flex h-3.5 w-4 flex-col justify-between">
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-[1.5px] w-full origin-center bg-ink"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-[1.5px] w-full bg-ink"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-[1.5px] w-full origin-center bg-ink"
            />
          </span>
        </button>
      </motion.div>

      {/* Overlay menú pantalla completa */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-paper"
          >
            <div className="flex h-full flex-col justify-between px-6 py-8 md:px-12 md:py-12">
              <div className="pt-14">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
                  {profile.brand}
                </p>
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.24em] text-mute transition-colors hover:text-ink"
                >
                  ← Volver a Alejandría
                </Link>
                <nav className="mt-10 flex flex-col gap-1 md:mt-14">
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{
                        delay: 0.05 + i * 0.05,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => go(item.href)}
                      className="group flex items-baseline gap-4 border-b border-line py-4 text-left transition-colors dark:border-line-dark"
                    >
                      <span className="font-mono text-[10px] text-mute">
                        0{i + 1}
                      </span>
                      <span className="font-display text-3xl font-semibold tracking-tight text-ink transition-opacity group-hover:opacity-50 md:text-5xl">
                        {item.name}
                      </span>
                    </motion.button>
                  ))}
                </nav>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6 dark:border-line-dark">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                  {profile.name} · {profile.location}
                </p>
                <div className="flex gap-4">
                  {profile.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute transition-colors hover:text-ink"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
