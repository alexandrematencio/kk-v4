// Dev-only palette switcher (v1 = original earth/brick, v2 = thai-red/thai-blue).
// Remove the footer toggle + this composable before production.
type Palette = 'v1' | 'v2'
const STORAGE_KEY = 'kk-palette'

export function useTheme() {
  const palette = useState<Palette>('palette', () => 'v1')

  if (import.meta.client) {
    onMounted(() => {
      const saved = (localStorage.getItem(STORAGE_KEY) as Palette | null) ?? 'v1'
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
    setPalette(palette.value === 'v1' ? 'v2' : 'v1')
  }

  return { palette, setPalette, toggle }
}
