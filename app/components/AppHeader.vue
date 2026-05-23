<script setup lang="ts">
defineProps<{ site?: { name?: string } | null }>()

const baseURL = useRuntimeConfig().app.baseURL
const { totalQty } = useCart()

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/carte', label: 'La Carte' },
  { to: '/commander', label: 'Commander' },
  { to: '/reserver', label: 'Réserver' },
  { to: '/histoire', label: 'Histoire' },
]
</script>

<template>
  <header class="sticky top-0 z-30 bg-bg/85 backdrop-blur-md border-b border-divider/70">
    <div class="container-content flex items-center justify-between h-16 md:h-20">
      <NuxtLink
        to="/"
        :aria-label="site?.name ?? 'Khan Kluay'"
        class="flex items-center group"
      >
        <img
          src="/img/logo/khan-kluay-logo.svg"
          :alt="site?.name ?? 'Khan Kluay'"
          width="1664"
          height="360"
          class="h-10 md:h-12 w-auto"
        />
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="text-sm font-medium text-ink-soft hover:text-action transition-colors"
          active-class="text-action-dark"
        >
          {{ l.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <NuxtLink
          to="/reserver"
          class="hidden md:inline-flex items-center gap-2 btn-primary text-sm"
        >
          Réserver
        </NuxtLink>
        <NuxtLink
          to="/commander"
          aria-label="Panier"
          class="relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-action text-white hover:bg-action-dark transition-colors"
        >
          <span
            aria-hidden="true"
            class="cart-icon block w-5 h-5"
            :style="{ '--mask': `url(${baseURL}img/icons/cart.svg)` }"
          />
          <span
            v-if="totalQty > 0"
            class="absolute -top-1 -right-1 bg-thai-blue text-white text-[10px] font-extrabold rounded-full min-w-5 h-5 px-1 flex items-center justify-center ring-2 ring-bg"
          >
            {{ totalQty }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.cart-icon {
  background-color: currentColor;
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
}
</style>
