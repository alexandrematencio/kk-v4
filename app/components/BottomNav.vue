<script setup lang="ts">
const links = [
  { to: '/', label: 'Accueil', icon: '/img/icons/home.svg' },
  { to: '/carte', label: 'La Carte', icon: '/img/icons/carte.svg' },
  { to: '/commander', label: 'Commander', icon: '/img/icons/order.svg' },
  { to: '/reserver', label: 'Réserver', icon: '/img/icons/reserver.svg' },
  { to: '/histoire', label: 'Histoire', icon: '/img/icons/story.svg' },
]
</script>

<template>
  <nav
    class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-bg/95 backdrop-blur-md border-t border-divider/70 pb-[env(safe-area-inset-bottom)]"
  >
    <ul class="grid grid-cols-5">
      <li v-for="l in links" :key="l.to">
        <NuxtLink
          :to="l.to"
          class="flex flex-col items-center gap-1 py-3 text-[10px] font-medium text-ink-soft"
          active-class="text-action-dark"
        >
          <span
            aria-hidden="true"
            class="nav-icon block w-6 h-6"
            :style="{ '--icon': `url(${l.icon})` }"
          />
          <span class="tracking-wide">{{ l.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-icon {
  background-color: currentColor;
  -webkit-mask-image: var(--icon);
  mask-image: var(--icon);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
}
</style>
