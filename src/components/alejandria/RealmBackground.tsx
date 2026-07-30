import type { PageBackgroundState } from '../../data/alejandria'
import { defaultPageBackground, realmCards } from '../../data/alejandria'

const FADE_MS = 550

function bgKey(bg: PageBackgroundState) {
  return `${bg.image}|${bg.position}`
}

export function uniqueBackgrounds(): PageBackgroundState[] {
  const list: PageBackgroundState[] = [defaultPageBackground]
  for (const card of realmCards) {
    list.push({
      image: card.pageBackground,
      position: card.pageBackgroundPosition ?? 'center',
    })
  }
  const seen = new Set<string>()
  return list.filter((bg) => {
    const key = bgKey(bg)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      if (img.decode) {
        img.decode().then(() => resolve()).catch(() => resolve())
      } else {
        resolve()
      }
    }
    img.onerror = () => resolve()
    img.src = src
  })
}

/** Precarga fondos con progreso 0–1 */
export async function preloadRealmBackgrounds(
  onProgress?: (ratio: number) => void,
): Promise<void> {
  const layers = uniqueBackgrounds()
  if (layers.length === 0) {
    onProgress?.(1)
    return
  }

  let done = 0
  await Promise.all(
    layers.map(async (bg) => {
      await loadImage(bg.image)
      done += 1
      onProgress?.(done / layers.length)
    }),
  )
}

type RealmBackgroundProps = {
  background: PageBackgroundState
  reduced: boolean
  /** Si false, oculta capas hasta que el boot termine */
  armed?: boolean
}

/**
 * Todas las capas viven en el DOM (imágenes ya optimizadas).
 * El cambio solo anima opacidad — sin decodificar ni montar al vuelo.
 */
export function RealmBackground({
  background,
  reduced,
  armed = true,
}: RealmBackgroundProps) {
  const layers = uniqueBackgrounds()
  const activeKey = bgKey(background)

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden>
      {layers.map((layer) => {
        const key = bgKey(layer)
        const active = key === activeKey
        return (
          <img
            key={key}
            src={layer.image}
            alt=""
            draggable={false}
            decoding="async"
            fetchPriority={active ? 'high' : 'low'}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition: layer.position,
              opacity: armed && active ? 1 : 0,
              transition:
                reduced || !armed
                  ? undefined
                  : `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          />
        )
      })}
    </div>
  )
}
