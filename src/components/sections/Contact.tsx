import { useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../../data/profile'
import { GhostCopy, GhostMedia, useExitProgress } from '../ui/Ghost'

/**
 * 05 — Contacto
 * Cabecera e info se disuelven en fantasma; el form se mantiene usable
 * un poco más y luego también cede.
 */
export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const progress = useExitProgress(contentRef)

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contacto desde MyBucket — ${form.name}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  const info = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: profile.location,
      href: '#contact',
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 bg-paper">
      <div
        ref={contentRef}
        className="mx-auto max-w-content px-5 py-24 md:px-8 md:py-32"
      >
        <header className="mb-12 md:mb-16">
          <GhostCopy
            progress={progress}
            start={0.35}
            end={0.85}
            className="mb-3"
          >
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
              05 — Contacto
            </p>
          </GhostCopy>
          <GhostCopy progress={progress} start={0.4} end={0.9}>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
              Hablemos de lo siguiente.
            </h2>
          </GhostCopy>
          <GhostCopy
            progress={progress}
            start={0.45}
            end={0.92}
            className="mt-5"
          >
            <p className="max-w-xl text-base leading-relaxed text-mute md:text-lg">
              Proyectos, colaboraciones o una idea que quieras materializar.
            </p>
          </GhostCopy>
        </header>

        <GhostMedia progress={progress} start={0.5} end={0.95}>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-5">
              {info.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-start gap-4"
                >
                  <span className="mt-0.5 flex h-10 w-10 items-center justify-center border border-line text-ink dark:border-line-dark">
                    <item.icon size={16} />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-lg text-ink transition-opacity group-hover:opacity-70">
                      {item.value}
                    </span>
                  </span>
                </a>
              ))}

              <div className="flex flex-wrap gap-4 pt-4">
                {profile.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.2em] text-mute transition-colors hover:text-ink"
                  >
                    {social.label}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="border border-line bg-surface p-6 dark:border-line-dark md:p-8 lg:col-span-7"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block md:col-span-1">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                    Nombre
                  </span>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border-b border-line bg-transparent py-3 text-ink outline-none transition-colors placeholder:text-mute/50 focus:border-ink dark:border-line-dark"
                    placeholder="Tu nombre"
                  />
                </label>
                <label className="block md:col-span-1">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full border-b border-line bg-transparent py-3 text-ink outline-none transition-colors placeholder:text-mute/50 focus:border-ink dark:border-line-dark"
                    placeholder="tu@email.com"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                  Mensaje
                </span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full resize-none border-b border-line bg-transparent py-3 text-ink outline-none transition-colors placeholder:text-mute/50 focus:border-ink dark:border-line-dark"
                  placeholder="Cuéntame sobre el proyecto..."
                />
              </label>

              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                  {sent
                    ? 'Listo — abre tu cliente de correo'
                    : 'Respuesta en 24–48h'}
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
                >
                  Enviar
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </form>
          </div>
        </GhostMedia>
      </div>
    </section>
  )
}
