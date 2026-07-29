import { useRef } from 'react'
import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { FilmRoll } from '../ui/FilmRoll'
import { GhostCopy, GhostMedia, useExitProgress } from '../ui/Ghost'

/**
 * 01 — Identidad
 * Texto + rollo se disuelven en sombra fantasma al salir.
 */
export function About() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const mediaRef = useRef<HTMLDivElement | null>(null)
  const textProgress = useExitProgress(textRef)
  const mediaProgress = useExitProgress(mediaRef)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 isolate border-b border-line bg-paper pb-28 pt-24 dark:border-line-dark md:pb-36 md:pt-28"
    >
      <div className="mx-auto grid w-full max-w-content items-center gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
        <div ref={textRef} className="lg:col-span-6">
          <Reveal>
            <header className="mb-10 md:mb-12">
              <GhostCopy
                progress={textProgress}
                start={0.35}
                end={0.85}
                className="mb-3"
              >
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
                  01 — Identidad
                </p>
              </GhostCopy>

              <GhostCopy progress={textProgress} start={0.4} end={0.9}>
                <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
                  Código con carácter.
                </h2>
              </GhostCopy>

              <GhostCopy
                progress={textProgress}
                start={0.45}
                end={0.92}
                className="mt-5"
              >
                <p className="max-w-lg text-base leading-relaxed text-mute md:text-lg">
                  No solo entrego features: diseño sistemas, cuento productos y
                  cuido cada interacción.
                </p>
              </GhostCopy>
            </header>
          </Reveal>

          <div className="max-w-lg space-y-5">
            {profile.manifesto.map((paragraph, i) => (
              <Reveal key={paragraph} delay={0.08 * (i + 1)}>
                <GhostCopy
                  progress={textProgress}
                  start={0.5 + i * 0.05}
                  end={0.95}
                >
                  <p className="text-lg leading-relaxed text-ink md:text-xl md:leading-relaxed">
                    {paragraph}
                  </p>
                </GhostCopy>
              </Reveal>
            ))}
          </div>
        </div>

        <div ref={mediaRef} className="lg:col-span-6">
          <Reveal delay={0.1} className="h-full">
            <GhostCopy
              progress={mediaProgress}
              start={0.4}
              end={0.9}
              className="mb-3"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
                Rollo · el paso del tiempo
              </p>
            </GhostCopy>
            <GhostMedia
              progress={mediaProgress}
              start={0.45}
              end={0.95}
              className="h-[440px] md:h-[480px] lg:h-[520px]"
            >
              <FilmRoll />
            </GhostMedia>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
