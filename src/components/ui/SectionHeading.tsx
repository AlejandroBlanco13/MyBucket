import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-mute">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-xl text-base leading-relaxed text-mute md:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
