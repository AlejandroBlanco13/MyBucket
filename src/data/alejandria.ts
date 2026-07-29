export type RealmAction = 'mybucket' | 'anime' | 'gimnasio' | 'rodeo' | 'musica' | 'juegos'

export type RealmCardData = {
  id: string
  title: string
  label: string
  description: string
  tags: string[]
  image: string
  featured?: boolean
  action: RealmAction
}

export type PersonalRealm = {
  id: Exclude<RealmAction, 'mybucket'>
  title: string
  subtitle: string
  description: string
  image: string
}

/** Fondo imperial full-bleed — atmósfera Alejandro Magno */
export const alejandriaBackground =
  'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1920&q=80'

export const alejandriaCopy = {
  brand: 'Alejandría',
  welcome: 'Bienvenido a Alejandría',
  support:
    'Un imperio de mundos. Elige por dónde entrar — MyBucket es la puerta principal.',
}

export const personalRealms: PersonalRealm[] = [
  {
    id: 'anime',
    title: 'Anime',
    subtitle: 'Narrativa visual',
    description: 'Historias y ritmo visual para contar productos en pantalla.',
    image:
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80',
  },
  {
    id: 'gimnasio',
    title: 'Gimnasio',
    subtitle: 'Disciplina',
    description: 'Constancia y detalle — el craft del cuerpo aplicado al código.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
  },
  {
    id: 'rodeo',
    title: 'Rodeo',
    subtitle: 'Ganadería',
    description: 'Campo y sistemas reales — del ganado a lo digital.',
    image:
      'https://images.unsplash.com/photo-1500595046743-cd271d694ee5?w=1200&q=80',
  },
  {
    id: 'musica',
    title: 'Música',
    subtitle: 'Atmósfera',
    description: 'Ritmo y textura que marcan el tempo de cada interfaz.',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80',
  },
  {
    id: 'juegos',
    title: 'Juegos',
    subtitle: 'Sistemas & play',
    description: 'Mecánicas e inmersión — play aplicado a productos.',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
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
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
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
      action: realm.id,
    }),
  ),
]
