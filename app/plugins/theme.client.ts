// Apply the saved palette as early as possible on the client to avoid FOUC.
// Dev-only — remove with the footer toggle before production.
export default defineNuxtPlugin(() => {
  try {
    const saved = localStorage.getItem('kk-palette')
    if (saved === 'v2') {
      document.documentElement.setAttribute('data-theme', 'v2')
    }
  } catch {
    // localStorage unavailable — ignore
  }
})
