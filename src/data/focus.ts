export type FocusLayer = {
  id: string
  title: string
  detail: string
  image: string
  alt: string
}

/** Capas visuales alineadas al entorno developer (tech, narrativa, craft) */
export const focusLayers: FocusLayer[] = [
  {
    id: 'tech',
    title: 'Sistemas',
    detail: 'Arquitectura limpia, UX exigente y productos que escalan.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80',
    alt: 'Circuitos y hardware en blanco y negro',
  },
  {
    id: 'narrative',
    title: 'Narrativa',
    detail: 'Anime, juegos y lectura alimentan cómo cuento productos en pantalla.',
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1400&q=80',
    alt: 'Libros y atmósfera de lectura',
  },
  {
    id: 'craft',
    title: 'Craft',
    detail: 'Disciplina y detalle: constancia aplicada al código y al diseño.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80',
    alt: 'Código en pantalla monocromo',
  },
]

export const heroVisual = {
  image:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80',
  alt: 'Horizonte tecnológico abstracto',
  /** Tamaño final relativo al viewport (no demasiado pequeño) */
  endScale: 0.72,
}
