export const profile = {
  brand: 'MyBucket',
  name: 'Alejandro Blanco',
  fullName: 'Luis Alejandro Blanco Barrett',
  role: 'Desarrollador Full Stack',
  location: 'Costa Rica',
  email: 'alejandroblanco1313@gmail.com',
  phone: '+506 8304 7436',
  tagline:
    'Construyo productos digitales con precisión: interfaces claras, sistemas escalables y detalle que se siente.',
  manifesto: [
    'Desde 2023 diseño y desarrollo software real: ecommerce, sistemas de gestión, experiencias interactivas y landings que convierten.',
    'Me mueven la tecnología, el storytelling visual y la disciplina de construir con intención — del pixel al backend.',
  ],
  interests: [
    {
      label: 'Tech & sistemas',
      detail: 'Arquitectura limpia, UX exigente y productos que escalan.',
    },
    {
      label: 'Narrativa visual',
      detail: 'Anime, juegos y lectura alimentan cómo cuento productos en pantalla.',
    },
    {
      label: 'Foco & craft',
      detail: 'Disciplina del gym aplicada al código: constancia, detalle, mejora continua.',
    },
  ],
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/AlejandroBlanco13',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/luis-alejandro-blanco-barrett-102212307/',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/alejandroblanco1313/',
    },
  ],
  yearsActive: '2023 — 2026',
} as const

export const navItems = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Identidad', href: '#about' },
  { name: 'Señal', href: '#focus' },
  { name: 'Trabajo', href: '#projects' },
  { name: 'Stack', href: '#skills' },
  { name: 'Contacto', href: '#contact' },
] as const
