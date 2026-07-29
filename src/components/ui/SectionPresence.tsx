import { useRef, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { useSectionPresence } from '../../hooks/useSectionTransit'

type SectionPresenceProps = {
  children: ReactNode
  className?: string
  id?: string
}

/** Aparece al entrar y se esconde al pasar a la siguiente sección. */
export function SectionPresence({
  children,
  className = '',
  id,
}: SectionPresenceProps) {
  const ref = useRef<HTMLElement | null>(null)
  const { opacity, scale, reduced } = useSectionPresence(ref)

  return (
    <section id={id} ref={ref} className={className}>
      <motion.div
        style={reduced ? undefined : { opacity, scale }}
        className="origin-center will-change-[opacity,transform]"
      >
        {children}
      </motion.div>
    </section>
  )
}
