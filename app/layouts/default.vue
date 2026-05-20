<script setup lang="ts">
const route = useRoute()
const { totalQty } = useCart()

const { data: site } = await useAsyncData('site-info', () =>
  queryCollection('site').first()
)

// Hide bottom nav + FAB only when the cart bar is actually visible
// (i.e. on /commander AND there are items in the cart).
const hideBottomChrome = computed(
  () => route.path === '/commander' && totalQty.value > 0
)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg text-ink-soft">
    <AppHeader :site="site" />
    <main class="flex-1 pb-24 md:pb-0">
      <slot />
    </main>
    <AppFooter :site="site" />
    <BottomNav v-if="!hideBottomChrome" />
    <FabPanier v-if="!hideBottomChrome" />
  </div>
</template>
