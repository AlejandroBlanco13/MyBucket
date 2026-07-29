import { useRef } from 'react'
import { motion } from 'motion/react'
import { skillGroups } from '../../data/skills'
import { motionEase } from '../../hooks/useSectionTransit'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { GhostCopy, GhostMedia, useExitProgress } from '../ui/Ghost'
import { Reveal } from '../ui/Reveal'

const levelTone: Record<string, string> = {
  Core: 'bg-ink text-paper',
  Fuerte: 'border border-line text-ink dark:border-line-dark',
  Práctica: 'text-mute',
}

/**
 * 04 — Stack
 * Texto y columnas se disuelven en fantasma al salir.
 */
export function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const progress = useExitProgress(contentRef)
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 bg-paper py-24 md:py-32"
    >
      <div
        ref={contentRef}
        className="mx-auto w-full max-w-content px-5 md:px-8"
      >
        <header className="mb-12 md:mb-16">
          <GhostCopy
            progress={progress}
            start={0.35}
            end={0.85}
            className="mb-3"
          >
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
              04 — Stack
            </p>
          </GhostCopy>
          <GhostCopy progress={progress} start={0.4} end={0.9}>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
              Herramientas con intención.
            </h2>
          </GhostCopy>
          <GhostCopy
            progress={progress}
            start={0.45}
            end={0.92}
            className="mt-5"
          >
            <p className="max-w-xl text-base leading-relaxed text-mute md:text-lg">
              Un stack disciplinado en blanco, gris y negro — lo justo para
              construir productos sólidos.
            </p>
          </GhostCopy>
        </header>

        <GhostMedia progress={progress} start={0.5} end={0.95}>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {skillGroups.map((group, gi) => (
              <Reveal key={group.category} delay={reduced ? 0 : gi * 0.08}>
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{
                    duration: 0.65,
                    delay: reduced ? 0 : gi * 0.1,
                    ease: motionEase,
                  }}
                  className="origin-top"
                >
                  <h3 className="border-b border-line pb-4 font-mono text-xs uppercase tracking-[0.24em] text-mute dark:border-line-dark">
                    {group.category}
                  </h3>
                  <ul className="mt-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center justify-between border-b border-line/70 py-4 dark:border-line-dark/70"
                      >
                        <span className="font-display text-lg font-medium text-ink">
                          {skill.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${levelTone[skill.level]}`}
                        >
                          {skill.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </GhostMedia>
      </div>
    </section>
  )
}
