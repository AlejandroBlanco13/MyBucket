import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { ArrowUpRight, Code2 } from 'lucide-react'
import { GAP, ITEM_WIDTH, projects } from '../../data/projects'
import {
  stickyStageClass,
  useOwnProgress,
} from '../../hooks/useSectionTransit'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { GhostCopy, GhostMedia } from '../ui/Ghost'

/**
 * 03 — Trabajo
 * Galería sticky; texto e imágenes se disuelven en fantasma al salir.
 */
export function ProjectsGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const ownProgress = useOwnProgress(sectionRef)

  const totalDistance = (projects.length - 1) * (ITEM_WIDTH + GAP)
  const x = useTransform(ownProgress, [0.08, 0.62], [0, -totalDistance])

  const trackHeight = reduced
    ? undefined
    : `${Math.max(projects.length * 55, 200)}vh`

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 bg-paper"
      style={{ height: reduced ? 'auto' : trackHeight }}
    >
      <div className={reduced ? 'relative py-24' : stickyStageClass}>
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-content px-5 pt-8 md:px-8 md:pt-10">
            <header className="mb-8 md:mb-10">
              <GhostCopy
                progress={ownProgress}
                start={0.58}
                end={0.88}
                className="mb-3"
              >
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
                  03 — Trabajo seleccionado
                </p>
              </GhostCopy>
              <GhostCopy progress={ownProgress} start={0.6} end={0.9}>
                <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
                  Proyectos que construyen.
                </h2>
              </GhostCopy>
              <GhostCopy
                progress={ownProgress}
                start={0.62}
                end={0.92}
                className="mt-5"
              >
                <p className="max-w-xl text-base leading-relaxed text-mute md:text-lg">
                  Del ecommerce a sistemas de gestión y experiencias narrativas —
                  trabajo real desde 2023.
                </p>
              </GhostCopy>
            </header>
          </div>

          <GhostMedia progress={ownProgress} start={0.65} end={0.96}>
            <div className="flex gap-4 overflow-x-auto px-5 pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} compact />
              ))}
            </div>

            <div className="relative hidden md:block">
              <div className="flex h-[min(58vh,520px)] w-full items-center justify-center">
                <div
                  className="relative overflow-visible"
                  style={{ width: ITEM_WIDTH, height: 480 }}
                >
                  <motion.div
                    className="absolute left-0 top-0 flex will-change-transform"
                    style={{ x, gap: GAP }}
                  >
                    {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </GhostMedia>
        </div>
      </div>
    </section>
  )
}

type CardProps = {
  project: (typeof projects)[number]
  compact?: boolean
}

function ProjectCard({ project, compact }: CardProps) {
  return (
    <article
      className={`group relative shrink-0 overflow-hidden border border-white/10 bg-neutral-900 ${
        compact ? 'h-[360px] w-[280px]' : ''
      }`}
      style={compact ? undefined : { width: ITEM_WIDTH, height: 480 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/15" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
        <span className="font-mono text-xs text-white/55">
          0{project.id} · {project.year}
        </span>
        <div className="mt-2 flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
              {project.label}
            </p>
            <h3
              className={`mt-1 font-display font-semibold text-white ${
                compact ? 'text-2xl' : 'text-3xl'
              }`}
            >
              {project.title}
            </h3>
          </div>
          <div className="flex gap-2 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} en GitHub`}
                className="flex h-9 w-9 items-center justify-center border border-white/30 text-white hover:bg-white hover:text-black"
              >
                <Code2 size={14} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Demo de ${project.title}`}
                className="flex h-9 w-9 items-center justify-center border border-white/30 text-white hover:bg-white hover:text-black"
              >
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65 line-clamp-3">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="border border-white/20 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/65"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
