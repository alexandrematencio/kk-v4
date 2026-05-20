<script setup lang="ts">
const { data: items } = await useAsyncData('menu-items-commander', () =>
  queryCollection('menu').order('order', 'ASC').all()
)

const { data: cats } = await useAsyncData('menu-cats-commander', () =>
  queryCollection('categories').first()
)

const { data: site } = await useAsyncData('site-commander', () =>
  queryCollection('site').first()
)

const { items: cart, total, totalQty, add, decrement, remove } = useCart()

const asset = useAsset()

type Category = 'entrees' | 'plats' | 'desserts' | 'boissons'
const activeCategory = ref<Category>('plats')

const currentItems = computed(() =>
  (items.value ?? []).filter((it) => it.category === activeCategory.value)
)

const phoneTel = computed(() =>
  '+33' + (site.value?.phone ?? '').replace(/\D/g, '').replace(/^0/, '')
)

function fmtPrice(p: number) {
  return p.toFixed(2).replace('.', ',') + '€'
}

function spicyLevel(badges?: string[]) {
  if (!badges) return 0
  if (badges.some((b) => /trè?s\s*piment/i.test(b))) return 3
  if (badges.some((b) => /piment/i.test(b))) return 2
  return 0
}

function onAdd(it: (typeof currentItems.value)[number], ev: MouseEvent) {
  add({ slug: it.slug, title: it.title, price: it.price, image: it.image })
  const btn = ev.currentTarget as HTMLElement
  if (!btn) return

  btn.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }],
    { duration: 240, easing: 'cubic-bezier(.2,.8,.2,1)' }
  )

  const indicator = document.createElement('span')
  indicator.textContent = '+1'
  indicator.className =
    'plus-one absolute -top-1 left-1/2 -translate-x-1/2 text-[11px] font-extrabold text-thai-blue bg-white rounded-full px-1.5 py-0.5 shadow-md pointer-events-none'
  btn.appendChild(indicator)
  indicator
    .animate(
      [
        { transform: 'translate(-50%, 0)', opacity: 1 },
        { transform: 'translate(-50%, -32px)', opacity: 0 },
      ],
      { duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)' }
    )
    .finished.then(() => indicator.remove())
}

useSeoMeta({
  title: 'Commander — Khan Kluay',
  description:
    "Commandez à emporter ou en livraison chez Khan Kluay. Cuisine Thaï Halal au cœur de Paris.",
})

definePageMeta({
  bare: true,
})
</script>

<template>
  <div class="container-content py-10 md:py-16 pb-40 md:pb-32">
    <!-- HEADER -->
    <header class="max-w-3xl">
      <div class="eyebrow">Livraison ou à emporter</div>
      <h1 class="mt-4 text-5xl md:text-7xl">Commander</h1>
      <p class="mt-6 text-base md:text-lg leading-relaxed">
        Composez votre commande, on s'occupe du reste — à emporter sous 20 min
        ou livraison dans le 11ème.
      </p>
    </header>

    <!-- PROCESS STEPS -->
    <h2 class="sr-only">Comment commander</h2>
    <section
      aria-label="Étapes pour commander"
      class="mt-12 md:mt-16 grid md:grid-cols-3 gap-px bg-divider/70 border-y border-divider/70"
    >
      <article class="p-6 md:p-8 bg-bg">
        <span class="text-sm font-bold tracking-[0.1em] text-thai-blue">01</span>
        <h3 class="mt-3 font-display font-extrabold text-xl text-ink leading-tight">
          Choisissez vos plats
        </h3>
        <p class="mt-2 text-sm text-muted leading-relaxed">
          Parcourez la carte et ajoutez ce qui vous tente.
        </p>
      </article>
      <article class="p-6 md:p-8 bg-bg">
        <span class="text-sm font-bold tracking-[0.1em] text-thai-blue">02</span>
        <h3 class="mt-3 font-display font-extrabold text-xl text-ink leading-tight">
          Appelez-nous
        </h3>
        <p class="mt-2 text-sm text-muted leading-relaxed">
          Composez le
          <strong class="text-thai-blue font-semibold">{{ site?.phone }}</strong>
          pour confirmer.
        </p>
      </article>
      <article class="p-6 md:p-8 bg-bg">
        <span class="text-sm font-bold tracking-[0.1em] text-thai-blue">03</span>
        <h3 class="mt-3 font-display font-extrabold text-xl text-ink leading-tight">
          On s'occupe du reste
        </h3>
        <p class="mt-2 text-sm text-muted leading-relaxed">
          À emporter sous 20 min ou livraison dans Paris 11ème.
        </p>
      </article>
    </section>

    <!-- CTA -->
    <div class="mt-10 md:mt-12 flex flex-col items-center gap-3">
      <a
        :href="`tel:${phoneTel}`"
        class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-ink text-action-dark font-medium hover:bg-action hover:border-action hover:text-white transition-colors"
      >
        <span aria-hidden="true" class="phone-icon block w-5 h-5" />
        <span>Appeler pour commander</span>
      </a>
      <p class="text-[11px] tracking-[0.15em] uppercase text-muted/70">
        Ou composez votre commande ci-dessous
      </p>
    </div>

    <!-- STICKY CATEGORY TABS -->
    <nav
      class="sticky top-16 md:top-20 z-20 mt-10 -mx-6 md:mx-0 px-6 md:px-0 py-4 bg-bg/92 backdrop-blur-md border-b border-divider"
    >
      <ul class="flex gap-6 md:gap-10 justify-center overflow-x-auto scrollbar-none">
        <li v-for="c in cats?.items" :key="c.slug" class="shrink-0">
          <button
            type="button"
            class="relative pb-1 text-sm font-medium tracking-wide capitalize transition-colors"
            :class="
              activeCategory === c.slug
                ? 'text-action-dark font-bold'
                : 'text-muted hover:text-action'
            "
            @click="activeCategory = c.slug as Category"
          >
            {{ c.label }}
            <span
              v-if="activeCategory === c.slug"
              class="absolute left-0 right-0 -bottom-4 h-[2px] bg-action"
            />
          </button>
        </li>
      </ul>
    </nav>

    <!-- EDITORIAL ITEM ROWS -->
    <ul class="mt-8 md:mt-10 max-w-3xl mx-auto divide-y divide-divider/60">
      <li
        v-for="item in currentItems"
        :key="item.slug"
        class="group grid grid-cols-[72px_1fr_auto] md:grid-cols-[96px_1fr_auto] gap-4 md:gap-5 items-center py-5 md:py-6"
      >
        <div
          class="w-[72px] h-[72px] md:w-24 md:h-24 rounded-lg overflow-hidden bg-surface-tint/30 shrink-0"
        >
          <img
            v-if="item.image"
            :src="asset(item.image)"
            :alt="item.title"
            loading="lazy"
            width="600"
            height="600"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div class="min-w-0">
          <h3 class="font-display font-extrabold text-lg md:text-2xl text-ink leading-tight">
            {{ item.title }}
          </h3>
          <p class="mt-1 flex flex-wrap items-center gap-2 text-sm">
            <span class="text-muted/70">·</span>
            <span class="text-brick font-semibold">{{ fmtPrice(item.price) }}</span>
            <span
              v-if="spicyLevel(item.badges)"
              class="text-[13px]"
              :aria-label="`Pimenté niveau ${spicyLevel(item.badges)}`"
              >{{ '🌶'.repeat(spicyLevel(item.badges)) }}</span
            >
          </p>
        </div>

        <button
          type="button"
          aria-label="Ajouter au panier"
          class="relative w-11 h-11 rounded-full bg-action text-white text-xl font-medium hover:bg-action-dark hover:scale-110 transition-all"
          @click="onAdd(item, $event)"
        >
          +
        </button>
      </li>

      <li v-if="!currentItems.length" class="py-10 text-center text-sm text-muted">
        Aucun plat dans cette catégorie pour l'instant.
      </li>
    </ul>

    <!-- FOOTER LINE -->
    <footer class="mt-16 pt-8 border-t border-divider/60 text-center text-sm text-muted">
      <p>{{ site?.address }}</p>
      <p class="mt-2 text-xs tracking-[0.1em]">
        <span v-for="(h, i) in site?.hours" :key="h.day">
          <span v-if="i > 0"> · </span>
          {{ h.day }} {{ h.hours }}
        </span>
      </p>
    </footer>

    <!-- FLOATING CART BAR -->
    <div
      class="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-divider shadow-[0_-8px_24px_rgba(0,27,149,0.08)] transition-transform duration-300 pb-[env(safe-area-inset-bottom)]"
      :class="cart.length ? 'translate-y-0' : 'translate-y-full'"
    >
      <div
        class="container-content py-3 md:py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6"
      >
        <div class="flex-1 flex flex-wrap gap-1.5 max-h-[28vh] overflow-y-auto md:overflow-visible">
          <div
            v-for="i in cart"
            :key="i.slug"
            class="inline-flex items-center gap-2 bg-paper rounded-md px-2 py-1.5 text-xs"
          >
            <span class="font-medium text-ink">{{ i.title }} ×{{ i.qty }}</span>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Diminuer"
                class="min-w-[44px] min-h-[44px] md:min-w-[32px] md:min-h-[32px] grid place-items-center rounded border border-divider bg-white text-ink-soft hover:border-action hover:text-action text-sm leading-none"
                @click="decrement(i.slug)"
              >
                <span aria-hidden="true">−</span>
              </button>
              <span class="text-thai-blue font-semibold">{{ fmtPrice(i.price * i.qty) }}</span>
              <button
                type="button"
                aria-label="Supprimer"
                class="min-w-[44px] min-h-[44px] md:min-w-[32px] md:min-h-[32px] grid place-items-center rounded border border-divider bg-white text-ink-soft hover:border-action hover:text-action text-sm leading-none"
                @click="remove(i.slug)"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
        </div>

        <div class="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-1 shrink-0">
          <span class="text-[10px] tracking-[0.18em] uppercase text-muted">Total</span>
          <span class="font-display font-extrabold text-xl md:text-2xl text-thai-blue">
            {{ fmtPrice(total) }}
          </span>
        </div>

        <a
          :href="`tel:${phoneTel}`"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-action text-white text-sm font-semibold tracking-wide hover:bg-action-dark transition-colors shrink-0"
        >
          Commander · {{ totalQty }} {{ totalQty > 1 ? 'plats' : 'plat' }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone-icon {
  background-color: currentColor;
  -webkit-mask-image: url('/img/icons/phone.svg');
  mask-image: url('/img/icons/phone.svg');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
}
</style>
