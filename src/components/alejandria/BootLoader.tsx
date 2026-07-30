import { motion, useSpring, useTransform } from 'motion/react'
import { useEffect, type CSSProperties } from 'react'

type BootLoaderProps = {
  progress: number
  reduced?: boolean
}

const NAME = 'P'

const SCRIPT: CSSProperties = {
  fontFamily: '"Great Vibes", cursive',
  fontWeight: 400,
  fontStyle: 'normal',
  lineHeight: 1.25,
}

/**
 * Boot firma — P en cursiva (Great Vibes).
 */
export function BootLoader({ progress, reduced = false }: BootLoaderProps) {
  const pct = Math.min(100, Math.max(0, Math.round(progress * 100)))
  const fill = Math.min(1, Math.max(0, progress))

  const smooth = useSpring(fill, {
    stiffness: reduced ? 320 : 55,
    damping: reduced ? 40 : 20,
    mass: 0.55,
  })

  useEffect(() => {
    smooth.set(fill)
  }, [fill, smooth])

  const clipPath = useTransform(smooth, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`)

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070707] text-white"
      role="status"
      aria-live="polite"
      aria-label={`Cargando ${pct}%`}
      initial={false}
      exit={
        reduced
          ? { opacity: 0 }
          : {
              opacity: 0,
              filter: 'blur(6px)',
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            }
      }
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 50% 48%, rgba(255,255,255,0.045) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <motion.div
        className="relative flex flex-col items-center px-6"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative select-none px-4 py-6">
          <span
            className="block text-[clamp(7rem,22vw,12rem)] text-transparent"
            style={{
              ...SCRIPT,
              WebkitTextStroke: '1px rgba(255,255,255,0.28)',
            }}
            aria-hidden
          >
            {NAME}
          </span>
          <motion.span
            className="absolute inset-0 overflow-hidden px-4 py-6"
            style={{ clipPath }}
          >
            <span
              className="block text-[clamp(7rem,22vw,12rem)] text-white"
              style={SCRIPT}
            >
              {NAME}
            </span>
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}
