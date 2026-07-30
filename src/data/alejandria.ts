export type RealmAction =
  | 'mybucket'
  | 'anime'
  | 'futbol'
  | 'gimnasio'
  | 'rodeo'
  | 'musica'
  | 'juegos'

export type RealmCardData = {
  id: string
  title: string
  label: string
  description: string
  tags: string[]
  image: string
  /** Fondo de página al enfocar / tocar la card */
  pageBackground: string
  /** Posición CSS del fondo (ej. "center 70%") */
  pageBackgroundPosition?: string
  featured?: boolean
  action: RealmAction
}

export type PersonalRealm = {
  id: Exclude<RealmAction, 'mybucket'>
  title: string
  subtitle: string
  description: string
  /** Imagen de la card / modal */
  image: string
  /** Fondo de página al enfocar; si no hay, usa image */
  pageBackground?: string
  pageBackgroundPosition?: string
}

export type PageBackgroundState = {
  image: string
  position: string
}

/** Fondo imperial full-bleed — vía láctea */
export const alejandriaBackground =
  '/felix-mittermeier-milky-way-2695569_1920.jpg'

export const defaultPageBackground: PageBackgroundState = {
  image: alejandriaBackground,
  position: 'center',
}

export const alejandriaCopy = {
  brand: 'Alejandría',
  welcome: 'Bienvenido a Alejandría',
  support:
    'Un imperio de mundos. Elige el mundo por conocer.',
}

export const personalRealms: PersonalRealm[] = [
  {
    id: 'anime',
    title: 'Anime',
    subtitle: 'Narrativa visual',
    description: 'Historias y ritmo visual para contar productos en pantalla.',
    image: '/anime-luffy.jpg',
    pageBackground: '/bg-anime.jpg',
  },
  {
    id: 'futbol',
    title: 'Fútbol',
    subtitle: 'Pasión',
    description: 'Juego, estrategia y equipo — la cancha como sistema vivo.',
    image:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    pageBackground:
      '/bg-futbol.jpg',
  },
  {
    id: 'gimnasio',
    title: 'Gimnasio',
    subtitle: 'Disciplina',
    description: 'Constancia y detalle — el craft del cuerpo aplicado al código.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
    pageBackground: '/15670bf5c46143f39bf44d70024c1dc4.jpg',
    pageBackgroundPosition: 'center 62%',
  },
  {
    id: 'rodeo',
    title: 'Rodeo',
    subtitle: 'Ganadería',
    description: 'Campo y sistemas reales — del ganado a lo digital.',
    image: '/download.jpeg',
    pageBackground: '/pexels-muhammed-ulucay-257533486-20001413.jpg',
    pageBackgroundPosition: 'center 72%',
  },
  {
    id: 'musica',
    title: 'Música',
    subtitle: 'Atmósfera',
    description: 'Ritmo y textura que marcan el tempo de cada interfaz.',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80',
    pageBackground: '/bg-musica.jpg',
  },
  {
    id: 'juegos',
    title: 'Juegos',
    subtitle: 'Sistemas & play',
    description: 'Mecánicas e inmersión — play aplicado a productos.',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
    pageBackground: '/bg-juegos.jpg',
  },
]

/** MyBucket primero (destacado) + cada mundo personal como card propia */
export const realmCards: RealmCardData[] = [
  {
    id: 'mybucket',
    title: 'MyBucket',
    label: 'Principal',
    description: 'Identidad, señal, trabajo, stack y contacto — el portfolio.',
    tags: ['React', 'Motion', 'Full Stack'],
    image: '/mybucket.jpeg',
    pageBackground: '/bg-mybucket.jpg',
    featured: true,
    action: 'mybucket',
  },
  ...personalRealms.map(
    (realm): RealmCardData => ({
      id: realm.id,
      title: realm.title,
      label: realm.subtitle,
      description: realm.description,
      tags: ['Explorar'],
      image: realm.image,
      pageBackground: realm.pageBackground ?? realm.image,
      pageBackgroundPosition: realm.pageBackgroundPosition,
      action: realm.id,
    }),
  ),
]
