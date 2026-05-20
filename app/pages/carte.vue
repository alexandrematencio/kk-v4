<script setup lang="ts">
const { data: items } = await useAsyncData('menu-items', () =>
  queryCollection('menu').order('order', 'ASC').all()
)

const { data: cats } = await useAsyncData('menu-cats', () =>
  queryCollection('categories').first()
)

const grouped = computed(() => {
  const map = new Map<string, typeof items.value>()
  for (const c of cats.value?.items ?? []) map.set(c.slug, [])
  for (const it of items.value ?? []) {
    const key = it.category === 'plats' ? 'plats' : it.category
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(it)
  }
  return map
})

useSeoMeta({
  title: 'La Carte — Khan Kluay',
  description:
    'Découvrez notre carte thaïlandaise authentique : entrées, plats signature, desserts et boissons. 100% halal, fait maison.',
})
</script>

<template>
  <div class="container-content py-12 md:py-16 space-y-20 md:space-y-28">
    <!-- HERO -->
    <section class="max-w-3xl">
      <div class="eyebrow">La Carte</div>
      <h1 class="mt-4 text-5xl md:text-7xl whitespace-pre-line">La Carte du Chef</h1>
      <p class="mt-6 text-base md:text-lg leading-relaxed">
        Découvrez une cuisine thaïlandaise authentique, préparée avec passion
        dans le respect des traditions et des saveurs halal. De Bangkok à Paris,
        sans escale.
      </p>
    </section>

    <!-- CATEGORIES -->
    <section
      v-for="cat in cats?.items"
      :id="cat.slug"
      :key="cat.slug"
      class="scroll-mt-24"
    >
      <div class="flex items-end justify-between gap-4 mb-6 md:mb-8">
        <div>
          <div class="eyebrow">Section</div>
          <h2 class="mt-2 text-3xl md:text-5xl">{{ cat.label }}</h2>
          <p v-if="cat.description" class="mt-2 text-ink-soft max-w-prose">
            {{ cat.description }}
          </p>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <MenuItem
          v-for="item in grouped.get(cat.slug)"
          :key="item.slug"
          :item="item"
        />
      </div>
    </section>
  </div>
</template>
