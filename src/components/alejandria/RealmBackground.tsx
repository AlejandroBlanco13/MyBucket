import { useEffect, useMemo, useState } from 'react'
import type { PageBackgroundState } from '../../data/alejandria'
import { defaultPageBackground, realmCards } from '../../data/alejandria'

const FADE_MS = 550

function bgKey(bg: PageBackgroundState) {
  return `${bg.image}|${bg.position}`
}

function uniqueBackgrounds(): PageBackgroundState[] {
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

/** Precarga temprana (también al montar las capas). */
export function preloadRealmBackgrounds() {
  uniqueBackgrounds().forEach((bg) => {
    const img = new Image()
    img.decoding = 'async'
    img.src = bg.image
  })
}

type RealmBackgroundProps = {
  background: PageBackgroundState
  reduced: boolean
}

/**
 * Todas las capas viven en el DOM (imágenes ya optimizadas).
 * El cambio solo anima opacidad — sin decodificar ni montar al vuelo.
 */
export function RealmBackground({ background, reduced }: RealmBackgroundProps) {
  const layers = useMemo(() => uniqueBackgrounds(), [])
  const activeKey = bgKey(background)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const imgs = layers.map((bg) => {
      const img = new Image()
      img.src = bg.image
      return img.decode ? img.decode().catch(() => undefined) : Promise.resolve()
    })
    void Promise.all(imgs).then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [layers])

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
              opacity: active ? 1 : 0,
              transition:
                reduced || !ready
                  ? undefined
                  : `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              // Evita que capas ocultas sigan compositando a full
              visibility: active || ready ? 'visible' : 'hidden',
              willChange: ready ? 'opacity' : 'auto',
            }}
          />
        )
      })}
    </div>
  )
}
