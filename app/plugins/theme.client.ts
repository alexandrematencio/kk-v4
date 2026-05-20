// Apply the saved palette as early as possible on the client to avoid FOUC.
// Dev-only — remove with the footer toggle before production.
// Default is v3 (Salon Thaï) — applied immediately if no preference is stored.
export default defineNuxtPlugin(() => {
  try {
    const saved = localStorage.getItem('kk-palette') ?? 'v3'
    if (saved === 'v2' || saved === 'v3') {
      document.documentElement.setAttribute('data-theme', saved)
    }
  } catch {
    document.documentElement.setAttribute('data-theme', 'v3')
  }
})
