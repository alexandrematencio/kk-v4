<script setup lang="ts">
defineProps<{
  site?: {
    name?: string
    tagline?: string
    address?: string
    phone?: string
    hours?: { day: string; hours: string }[]
  } | null
}>()
</script>

<template>
  <footer class="footer-dark border-t border-divider/70">
    <div class="container-content py-16 md:py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div class="eyebrow text-thai-blue">QUOTIDIEN</div>
          <img
            src="/img/logo/logo-khan-kluay-white.svg"
            :alt="site?.name ?? 'Khan Kluay'"
            width="1468"
            height="380"
            class="mt-3 h-12 md:h-14 w-auto"
          />
          <p class="mt-4 text-ink-soft max-w-xs leading-relaxed">
            Votre dose quotidienne d'authenticité Thaï<br />
            au cœur de Paris.
          </p>
        </div>

        <div>
          <div class="eyebrow">HORAIRES</div>
          <ul class="mt-3 space-y-2">
            <li
              v-for="h in site?.hours"
              :key="h.day"
              class="text-sm text-ink-soft flex justify-between border-b border-divider/60 pb-2"
            >
              <span class="font-medium text-ink">{{ h.day }}</span>
              <span>{{ h.hours }}</span>
            </li>
          </ul>
        </div>

        <div>
          <div class="eyebrow">CONTACT</div>
          <ul class="mt-3 space-y-2 text-sm">
            <li class="text-ink">{{ site?.address }}</li>
            <li class="text-ink-soft">{{ site?.phone }}</li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-6 border-t border-divider/60 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted">
        <span>© {{ new Date().getFullYear() }} {{ site?.name ?? 'Khan Kluay' }}. Tous droits réservés.</span>
        <div class="flex items-center gap-6">
          <span>{{ site?.tagline }}</span>
          <!-- Dev-only palette switcher — remove before production -->
          <PaletteSwitch />
        </div>
      </div>

      <div class="mt-4 flex items-center justify-end gap-2 text-[11px] text-muted/80">
        <span>Conception et développement par</span>
        <a
          href="https://aaxlo.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="aaxlo"
          class="inline-flex items-center hover:opacity-100 opacity-70 transition-opacity"
        >
          <img
            src="/img/logo/logo-aaxlo.svg"
            alt="aaxlo"
            width="400"
            height="83"
            class="h-3 w-auto"
          />
        </a>
      </div>
    </div>
  </footer>
</template>
