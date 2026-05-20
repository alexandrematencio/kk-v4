<script setup lang="ts">
const { totalQty } = useCart()
</script>

<template>
  <NuxtLink
    v-if="totalQty > 0"
    to="/commander"
    aria-label="Voir le panier"
    class="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30 w-14 h-14 rounded-full bg-action text-white shadow-xl shadow-action/30 hover:bg-action-dark transition-colors flex items-center justify-center"
  >
    <span aria-hidden="true" class="cart-icon block w-6 h-6" />
    <span
      class="absolute -top-1 -right-1 bg-thai-blue text-white text-[11px] font-extrabold rounded-full min-w-6 h-6 px-1 flex items-center justify-center ring-2 ring-bg"
    >
      {{ totalQty }}
    </span>
  </NuxtLink>
</template>

<style scoped>
.cart-icon {
  background-color: currentColor;
  -webkit-mask-image: url('/img/icons/cart.svg');
  mask-image: url('/img/icons/cart.svg');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
}
</style>
