<script setup lang="ts">
const { data: home } = await useAsyncData('page-home', () =>
  queryCollection('home').first()
)

const { data: story } = await useAsyncData('page-home-story', () =>
  queryCollection('story').first()
)

useSeoMeta({
  title: 'Khan Kluay — Cantine Thaï Halal à Paris',
  description:
    "Khan Kluay fusionne l'énergie vibrante de Bangkok avec l'élégance parisienne. Cuisine Thaï Halal, fait maison.",
})

const asset = useAsset()
</script>

<template>
  <div v-if="home" class="container-content py-12 md:py-16 space-y-20 md:space-y-28">
    <!-- HERO BENTO -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <article class="card lg:col-span-2 p-8 md:p-16 flex flex-col justify-center min-h-[420px]">
        <div class="eyebrow">{{ home.eyebrow }}</div>
        <h1 class="mt-4 text-5xl md:text-7xl">{{ home.title }}</h1>
        <p class="mt-6 text-base md:text-lg max-w-xl leading-relaxed whitespace-pre-line">
          {{ home.intro }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/carte" class="btn-primary text-sm md:text-base">
            Explorer la Carte
          </NuxtLink>
          <NuxtLink to="/reserver" class="btn-secondary text-sm md:text-base">
            Réserver une Table
          </NuxtLink>
        </div>
      </article>

      <article
        class="card p-8 md:p-10 flex flex-col justify-end min-h-[420px] relative overflow-hidden text-white"
        :class="!home.signature.image && 'bg-ink'"
      >
        <img
          v-if="home.signature.image"
          :src="asset(home.signature.image)"
          :alt="home.signature.name"
          width="1200"
          height="900"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div
          v-if="home.signature.image"
          class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        />
        <div class="relative">
          <div class="text-[11px] tracking-[0.2em] uppercase text-white/80 font-semibold drop-shadow">
            {{ home.signature.label }}
          </div>
          <h2 class="mt-3 text-3xl md:text-4xl font-display font-extrabold text-white leading-tight drop-shadow-lg">
            {{ home.signature.name }}
          </h2>
          <div v-if="!home.signature.image" class="mt-6 text-5xl">🍜</div>
        </div>
      </article>
    </section>

    <!-- CATEGORIES -->
    <section>
      <div class="flex items-end justify-between mb-8 md:mb-10 gap-4">
        <div>
          <div class="eyebrow">À la Carte</div>
          <h2 class="mt-2 text-3xl md:text-5xl">Nos Essentiels</h2>
        </div>
        <NuxtLink
          to="/carte"
          class="text-sm font-semibold text-action-dark hover:text-action whitespace-nowrap"
        >
          Tout voir →
        </NuxtLink>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        <CategoryCard v-for="c in home.categories" :key="c.slug" :category="c" />
      </div>
    </section>

    <!-- HISTOIRE (full sections — shared with /histoire) -->
    <StorySections v-if="story" :story="story" />

    <!-- FAMILY ROOTS -->
    <section class="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10 items-stretch">
      <div class="card lg:col-span-3 p-8 md:p-14 bg-surface">
        <div class="eyebrow">{{ home.roots.eyebrow.toUpperCase() }}</div>
        <p class="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight italic">
          {{ home.roots.quote }}
        </p>
        <p class="mt-6 leading-relaxed max-w-prose whitespace-pre-line">
          {{ home.roots.body }}
        </p>
      </div>

      <div class="lg:col-span-2 grid grid-cols-1 grid-rows-2 gap-4 md:gap-5">
        <div
          v-for="b in home.roots.badges"
          :key="b.label"
          class="card flex flex-col justify-center items-start p-8 md:p-10 bg-paper"
        >
          <span class="font-display font-extrabold text-5xl md:text-6xl text-thai-blue">
            {{ b.value }}
          </span>
          <span class="mt-2 eyebrow">{{ b.label }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
