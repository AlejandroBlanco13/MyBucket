export type TimeFrame = {
  id: string
  /** Momento / etiqueta de tiempo */
  era: string
  title: string
  detail: string
  image: string
  alt: string
}

/**
 * Fotogramas del rollo de Identidad:
 * características y atmósferas del paso del tiempo — no proyectos.
 */
export const timeFrames: TimeFrame[] = [
  {
    id: 'origen',
    era: '2023',
    title: 'El arranque',
    detail: 'Primera línea de código con intención.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80',
    alt: 'Escritorio de aprendizaje y cuaderno',
  },
  {
    id: 'bases',
    era: '2023',
    title: 'Bases',
    detail: 'HTML, lógica y la disciplina de repetir.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c8199c97d1e4?w=900&q=80',
    alt: 'Laptop con código en blanco y negro',
  },
  {
    id: 'ritmo',
    era: '2024',
    title: 'Ritmo',
    detail: 'Constancia: el gym aplicado al craft.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80',
    alt: 'Entrenamiento y disciplina física',
  },
  {
    id: 'sistemas',
    era: '2024',
    title: 'Sistemas',
    detail: 'De pantallas sueltas a productos que escalan.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
    alt: 'Circuitos y arquitectura técnica',
  },
  {
    id: 'narrativa',
    era: '2025',
    title: 'Narrativa',
    detail: 'Contar producto con imagen, no solo features.',
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80',
    alt: 'Libros y atmósfera de lectura',
  },
  {
    id: 'detalle',
    era: '2025',
    title: 'Detalle',
    detail: 'El pixel y la interacción como firma.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80',
    alt: 'Código en pantalla monocromo',
  },
  {
    id: 'foco',
    era: '2026',
    title: 'Foco',
    detail: 'Menos ruido. Más intención en cada entrega.',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    alt: 'Horizonte abierto, claridad',
  },
  {
    id: 'presente',
    era: 'Ahora',
    title: 'Presente',
    detail: 'Construir con carácter — y seguir el rollo.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80',
    alt: 'Horizonte tecnológico abstracto',
  },
]
