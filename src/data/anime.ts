export type AnimeId = 'fma' | 'onepiece' | 'aot' | 'berserk' | 'dragonball'

export type AnimeTale = {
  id: AnimeId
  rank: number
  kanjiRank: string
  position: string
  title: string
  titleJa: string
  glyph: string
  tablet: string
  author: string
  edition: string
  thesis: string
  body: string
  phrase: string
  themes: string[]
  accent: string
  gold: string
  ink: string
  wash: string
  image: string
  imageAlt: string
  /** Crédito de la lámina, cuando viene de una biblioteca libre. */
  credit?: string
}

/** Ranking personal — el orden es el de esta Alejandría. */
export const animeTales: AnimeTale[] = [
  {
    id: 'fma',
    rank: 1,
    kanjiRank: '壱',
    position: '第壱位',
    title: 'Fullmetal Alchemist',
    titleJa: '鋼の錬金術師',
    glyph: '鋼',
    tablet: 'Fullmetal',
    author: 'Hiromu Arakawa',
    edition: 'Brotherhood',
    thesis: 'Nada vuelve si no entregas algo del mismo valor.',
    body: 'Dos hermanos cruzan un país para corregir lo que la alquimia no perdona. Ética, guerra y un estado levantado sobre una mentira: el relato más cerrado de este ranking, donde el poder siempre cobra.',
    phrase: '等価交換',
    themes: ['Equivalencia', 'Hermandad', 'Guerra'],
    accent: '#d6453d',
    gold: '#e4b86a',
    ink: '#140e0c',
    wash: 'radial-gradient(ellipse at 72% 42%, rgba(228,184,106,0.2), transparent 46%), radial-gradient(ellipse at 18% 88%, rgba(214,69,61,0.22), transparent 42%), #140e0c',
    image: '/anime/fma.jpg?v=2',
    imageAlt: 'Dos figuras de espaldas ante un círculo de transmutación en una sala oscura.',
  },
  {
    id: 'onepiece',
    rank: 2,
    kanjiRank: '弐',
    position: '第弐位',
    title: 'One Piece',
    titleJa: 'ワンピース',
    glyph: '海',
    tablet: 'One Piece',
    author: 'Eiichiro Oda',
    edition: 'En alta mar',
    thesis: 'El mar no tiene techo.',
    body: 'Una tripulación elegida como familia y un mapa que se niega a acabar. En One Piece la libertad se mide por el horizonte y por quién va contigo a cruzarlo.',
    phrase: '海は自由だ',
    themes: ['Libertad', 'Tripulación', 'Aventura'],
    accent: '#2f8f9d',
    gold: '#e6c27a',
    ink: '#071018',
    wash: 'radial-gradient(ellipse at 70% 58%, rgba(47,143,157,0.38), transparent 48%), radial-gradient(ellipse at 78% 18%, rgba(230,194,122,0.16), transparent 32%), #071018',
    image: '/anime-luffy.jpg',
    imageAlt: 'Figura de espaldas, con sombrero, en la proa de un bote hacia el sol.',
  },
  {
    id: 'aot',
    rank: 3,
    kanjiRank: '参',
    position: '第参位',
    title: 'Attack on Titan',
    titleJa: '進撃の巨人',
    glyph: '壁',
    tablet: 'Titanes',
    author: 'Hajime Isayama',
    edition: 'La muralla',
    thesis: 'La libertad duele al otro lado del muro.',
    body: 'Tres murallas y un cielo cerrado. La pregunta no es cómo salir: es en qué te conviertes cuando por fin miras afuera.',
    phrase: '壁の向こう',
    themes: ['Muro', 'Libertad', 'Sacrificio'],
    accent: '#c4493a',
    gold: '#d9c7a6',
    ink: '#121410',
    wash: 'radial-gradient(ellipse at 50% 18%, rgba(168,166,140,0.16), transparent 46%), linear-gradient(180deg, #1a1c16 0%, #121410 55%, #0c0d0b 100%)',
    image: '/anime/aot.jpg?v=2',
    imageAlt: 'Murallas concéntricas entre la niebla, con figuras pequeñas en la almena.',
  },
  {
    id: 'berserk',
    rank: 4,
    kanjiRank: '肆',
    position: '第肆位',
    title: 'Berserk',
    titleJa: 'ベルセルク',
    glyph: '闇',
    tablet: 'Berserk',
    author: 'Kentaro Miura',
    edition: 'La obra',
    thesis: 'Seguir caminando cuando el eclipse ya pasó.',
    body: 'Lealtad rota, un mundo sin consuelo y una espada que se levanta igual. Aquí la lucha no es un arco: es el camino.',
    phrase: '闇を往け',
    themes: ['Eclipse', 'Lealtad', 'Persistencia'],
    accent: '#9c2b28',
    gold: '#c9a27a',
    ink: '#090807',
    wash: 'radial-gradient(ellipse at 62% 40%, rgba(156,43,40,0.38), transparent 44%), radial-gradient(ellipse at 30% 70%, rgba(201,162,122,0.08), transparent 36%), #090807',
    image: '/anime/berserk.jpg?v=2',
    imageAlt: 'Un espadachín de espaldas bajo un eclipse, con una espada enorme.',
  },
  {
    id: 'dragonball',
    rank: 5,
    kanjiRank: '伍',
    position: '第伍位',
    title: 'Dragon Ball',
    titleJa: 'ドラゴンボール',
    glyph: '龍',
    tablet: 'Dragon Ball',
    author: 'Akira Toriyama',
    edition: 'La saga',
    thesis: 'El cielo se abre si insistes lo suficiente.',
    body: 'Entrenar, caer, volver. Dragon Ball hizo de la voluntad un idioma visual: el aura, el grito, el instante en que el límite cede.',
    phrase: '限界の先へ',
    themes: ['Voluntad', 'Entrenamiento', 'Límite'],
    accent: '#f08a2a',
    gold: '#f2c14e',
    ink: '#07111c',
    wash: 'radial-gradient(ellipse at 68% 72%, rgba(240,138,42,0.32), transparent 46%), radial-gradient(ellipse at 32% 18%, rgba(96,150,220,0.22), transparent 40%), #07111c',
    image: '/anime/dragonball-aura.jpg',
    imageAlt: 'Una figura de espaldas en una cumbre, con un aura naranja sobre un mar de nubes.',
  },
]
