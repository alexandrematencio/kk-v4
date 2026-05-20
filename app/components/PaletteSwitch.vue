<script setup lang="ts">
// Dev-only palette switcher.
// To remove for production: delete this component + its <PaletteSwitch /> usage
// in AppFooter.vue, plus app/composables/useTheme.ts and app/plugins/theme.client.ts.
const { palette, setPalette } = useTheme()
</script>

<template>
  <div
    class="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted"
    role="group"
    aria-label="Palette de couleurs (dev)"
  >
    <span class="opacity-60">Palette</span>
    <div
      class="inline-flex rounded-full bg-divider/60 p-0.5 select-none"
    >
      <button
        type="button"
        class="px-2.5 py-1 rounded-full font-semibold transition-colors"
        :class="
          palette === 'v1'
            ? 'bg-bg text-ink shadow-sm'
            : 'text-muted hover:text-ink'
        "
        :aria-pressed="palette === 'v1'"
        @click="setPalette('v1')"
      >
        v1
      </button>
      <button
        type="button"
        class="px-2.5 py-1 rounded-full font-semibold transition-colors"
        :class="
          palette === 'v2'
            ? 'bg-bg text-ink shadow-sm'
            : 'text-muted hover:text-ink'
        "
        :aria-pressed="palette === 'v2'"
        @click="setPalette('v2')"
      >
        v2
      </button>
    </div>
  </div>
</template>
