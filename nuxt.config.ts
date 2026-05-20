import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts',
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  googleFonts: {
    families: {
      Epilogue: [400, 500, 600, 700, 800, 900],
      'Be Vietnam Pro': [300, 400, 500, 600, 700],
    },
    display: 'swap',
    preconnect: true,
    preload: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Khan Kluay — Cantine Thaï Halal à Paris',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            "Khan Kluay — La cantine authentique Thaï Halal. L'esprit de Bangkok, le cœur de Paris.",
        },
      ],
    },
  },
})
