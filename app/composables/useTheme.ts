// Dev-only palette switcher.
// v1 = original earth/brick, v2 = thai-red/thai-blue, v3 = refined Salon Thaï (default).
// Remove the footer toggle + this composable before production.
type Palette = 'v1' | 'v2' | 'v3'
const STORAGE_KEY = 'kk-palette'
const DEFAULT: Palette = 'v3'

export function useTheme() {
  const palette = useState<Palette>('palette', () => DEFAULT)

  if (import.meta.client) {
    onMounted(() => {
      const saved = (localStorage.getItem(STORAGE_KEY) as Palette | null) ?? DEFAULT
      palette.value = saved
      apply(saved)
    })
  }

  function apply(v: Palette) {
    if (import.meta.client) {
      if (v === 'v1') document.documentElement.removeAttribute('data-theme')
      else document.documentElement.setAttribute('data-theme', v)
    }
  }

  function setPalette(v: Palette) {
    palette.value = v
    if (import.meta.client) localStorage.setItem(STORAGE_KEY, v)
    apply(v)
  }

  function toggle() {
    const order: Palette[] = ['v1', 'v2', 'v3']
    const next = order[(order.indexOf(palette.value) + 1) % order.length] ?? DEFAULT
    setPalette(next)
  }

  return { palette, setPalette, toggle }
}
