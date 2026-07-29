import { useCallback } from 'react'

export function useSmoothScroll() {
  return useCallback((href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])
}
