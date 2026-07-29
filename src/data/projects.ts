export type Project = {
  id: number
  title: string
  label: string
  year: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  accent: string
  image: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Quinpart',
    label: 'Ecommerce',
    year: '2024–26',
    description:
      'Ecommerce de gran escala para el mercado costarricense: catálogo, roles, flujos de venta y experiencia de compra de alto impacto.',
    technologies: ['Next.js', 'TypeScript', 'React', 'API'],
    accent: '#111111',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
  },
  {
    id: 2,
    title: 'MEA CULPA',
    label: 'Roleplay',
    year: '2025',
    description:
      'Experiencia de roleplay inmersiva con narrativa, interacción y identidad visual propia.',
    technologies: ['TypeScript', 'React'],
    github: 'https://github.com/AlejandroBlanco13/MeaCulpaUni',
    accent: '#1a1a1a',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
  },
  {
    id: 3,
    title: 'Gestión Ganadera',
    label: 'Sistemas',
    year: '2024',
    description:
      'Sistema de gestión para operaciones ganaderas: control de inventario, trazabilidad y operación diaria.',
    technologies: ['Python', 'SQL', 'Desktop/Web'],
    accent: '#222222',
    image:
      'https://images.unsplash.com/photo-1500595046743-cd271d815f13?w=1200&q=80',
  },
  {
    id: 4,
    title: 'Gestión de Empleados',
    label: 'HR Tech',
    year: '2024',
    description:
      'Plataforma para administrar personal, procesos internos y operación del equipo con claridad.',
    technologies: ['Java', 'SQL'],
    github: 'https://github.com/AlejandroBlanco13/SistemaGestionAcademia',
    accent: '#2a2a2a',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
  },
  {
    id: 5,
    title: 'Menú Interactivo',
    label: 'Restaurantes',
    year: '2023',
    description:
      'Menú digital interactivo para restaurantes: exploración de platos, UX móvil y presentación visual.',
    technologies: ['PHP', 'JavaScript', 'HTML/CSS'],
    github: 'https://github.com/AlejandroBlanco13/Restaurante-Footie',
    accent: '#333333',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  },
  {
    id: 6,
    title: 'Landings CR',
    label: 'Turismo',
    year: '2024',
    description:
      'Landing pages turísticas en Costa Rica orientadas a conversión, storytelling del destino y performance.',
    technologies: ['TypeScript', 'React', 'Vite'],
    github: 'https://github.com/AlejandroBlanco13/ProyectoSistemasInformacion',
    demo: 'https://proyecto-sistemas-informacion.vercel.app',
    accent: '#0d0d0d',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  },
]

export const ITEM_WIDTH = 420
export const GAP = 28
