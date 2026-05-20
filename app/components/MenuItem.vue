<script setup lang="ts">
defineProps<{
  item: {
    title: string
    price: number
    description: string
    badges?: string[]
    signature?: boolean
    image?: string
  }
}>()

const asset = useAsset()

function fmtPrice(p: number) {
  return p.toFixed(2).replace('.', ',') + '€'
}
</script>

<template>
  <article
    class="card overflow-hidden transition-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/5"
    :class="item.signature && 'ring-1 ring-brick/30'"
  >
    <div
      v-if="item.image"
      class="aspect-[4/3] -mx-px -mt-px overflow-hidden bg-surface-tint/20"
    >
      <img
        :src="asset(item.image)"
        :alt="item.title"
        loading="lazy"
        width="1200"
        height="900"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="p-5 md:p-6">
    <div class="flex items-start justify-between gap-4">
      <h3 class="text-xl md:text-2xl text-ink leading-tight font-display">{{ item.title }}</h3>
      <span class="shrink-0 font-display font-extrabold text-lg text-brick">
        {{ fmtPrice(item.price) }}
      </span>
    </div>

    <p class="mt-3 text-sm md:text-[15px] leading-relaxed text-ink-soft">
      {{ item.description }}
    </p>

    <div v-if="item.badges?.length" class="mt-4 flex flex-wrap gap-2">
      <BadgePill v-for="b in item.badges" :key="b" :label="b" />
    </div>
    </div>
  </article>
</template>
