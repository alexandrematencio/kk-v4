<script setup lang="ts">
defineProps<{
  category: { slug: string; label: string; count: number; image?: string }
}>()
</script>

<template>
  <NuxtLink
    :to="`/carte#${category.slug}`"
    class="card group p-6 md:p-7 block hover:-translate-y-0.5 transition-all hover:shadow-lg hover:shadow-ink/5"
  >
    <div
      class="aspect-square rounded-lg mb-4 overflow-hidden grid place-items-center"
      :class="!category.image && 'bg-gradient-to-br from-surface-tint/40 to-lime/30'"
    >
      <img
        v-if="category.image"
        :src="category.image"
        :alt="category.label"
        loading="lazy"
        width="800"
        height="800"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <span
        v-else
        class="text-4xl opacity-70 group-hover:scale-110 transition-transform"
      >
        {{
          category.slug === 'entrees'
            ? '🥗'
            : category.slug === 'currys'
              ? '🍛'
              : category.slug === 'desserts'
                ? '🥭'
                : '🥥'
        }}
      </span>
    </div>
    <h3 class="font-display font-extrabold text-lg text-ink">{{ category.label }}</h3>
    <p class="text-sm text-muted mt-1">{{ category.count }} items</p>
  </NuxtLink>
</template>
