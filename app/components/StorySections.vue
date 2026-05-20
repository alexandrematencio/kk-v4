<script setup lang="ts">
type Story = {
  hero: {
    eyebrow: string
    title: string
    body: string
    image?: string
    cta: { label: string; href: string }
  }
  bento: {
    eyebrow: string
    quote: string
    quoteImage?: string
    whyTitle: string
    whyBody: string
    whyImage?: string
    freshTitle: string
    freshBody: string
    freshImage?: string
    bridgeTitle: string
    bridgeBody: string
    bridgeImage?: string
    gestureTitle: string
    gestureImage?: string
  }
  pillars: Array<{ title: string; body: string; image?: string }>
}

const props = withDefaults(
  defineProps<{
    story: Story
    asH1?: boolean
  }>(),
  { asH1: false }
)

const HeroTag = computed(() => (props.asH1 ? 'h1' : 'h2'))
</script>

<template>
  <div class="space-y-20 md:space-y-28">
    <!-- HERO NARRATIVE -->
    <section class="grid lg:grid-cols-5 gap-6 md:gap-10 items-stretch">
      <div class="card lg:col-span-3 p-8 md:p-16 bg-surface">
        <div class="eyebrow">{{ story.hero.eyebrow }}</div>
        <component
          :is="HeroTag"
          class="mt-5 text-5xl md:text-7xl whitespace-pre-line"
        >
          {{ story.hero.title }}
        </component>
        <!-- The blue elephant signature: the surgical thai-blue accent -->
        <div class="mt-6 h-[3px] w-20 bg-thai-blue" aria-hidden="true" />
        <p class="mt-6 text-base md:text-lg leading-relaxed whitespace-pre-line">
          {{ story.hero.body }}
        </p>
        <NuxtLink :to="story.hero.cta.href" class="mt-8 inline-flex btn-primary">
          {{ story.hero.cta.label }}
        </NuxtLink>
      </div>

      <div
        class="card lg:col-span-2 relative overflow-hidden flex flex-col justify-end min-h-[320px] text-white"
        :class="!story.bento.quoteImage && 'bg-ink'"
      >
        <img
          v-if="story.bento.quoteImage"
          :src="story.bento.quoteImage"
          :alt="story.bento.eyebrow"
          width="1200"
          height="1600"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div class="relative p-8 md:p-10">
          <span class="text-[11px] tracking-[0.2em] uppercase text-white/80 font-semibold">
            {{ story.bento.eyebrow }}
          </span>
          <p
            class="mt-4 font-display text-2xl md:text-3xl font-extrabold text-white leading-tight italic drop-shadow"
          >
            {{ story.bento.quote }}
          </p>
        </div>
      </div>
    </section>

    <!-- BENTO STORYTELLING -->
    <section aria-labelledby="story-bento-heading" class="grid lg:grid-cols-12 gap-4 md:gap-6">
      <h2 id="story-bento-heading" class="sr-only">Le petit éléphant bleu</h2>

      <!-- The blue elephant card — the one bold thai-blue moment -->
      <article
        class="card lg:col-span-5 p-8 md:p-12 relative overflow-hidden text-white bg-thai-blue"
      >
        <img
          v-if="story.bento.whyImage"
          :src="story.bento.whyImage"
          :alt="story.bento.whyTitle"
          width="1600"
          height="1000"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
        />
        <span
          aria-hidden="true"
          class="absolute -right-6 -bottom-10 font-display font-extrabold text-[12rem] leading-none text-white/10 select-none pointer-events-none"
          >KK</span
        >
        <div class="relative">
          <div
            class="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold text-white/70"
          >
            <span class="inline-block w-4 h-[2px] bg-white/70" />
            Le petit éléphant bleu
          </div>
          <h3 class="mt-4 text-3xl md:text-4xl font-display font-extrabold text-white leading-tight">
            {{ story.bento.whyTitle }}
          </h3>
          <p class="mt-5 text-sm md:text-base leading-relaxed whitespace-pre-line text-white/90">
            {{ story.bento.whyBody }}
          </p>
        </div>
      </article>

      <article
        class="card lg:col-span-3 p-8 md:p-10 bg-olive/10 flex flex-col justify-between min-h-[260px] relative overflow-hidden"
      >
        <img
          v-if="story.bento.freshImage"
          :src="story.bento.freshImage"
          :alt="story.bento.freshTitle"
          width="1600"
          height="1000"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div class="relative flex flex-col justify-between h-full gap-6">
          <span v-if="!story.bento.freshImage" class="text-5xl">🌿</span>
          <div :class="story.bento.freshImage && 'mt-auto'">
            <h3 class="font-display font-extrabold text-2xl text-olive-dark">
              {{ story.bento.freshTitle }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-ink-soft">{{ story.bento.freshBody }}</p>
          </div>
        </div>
      </article>

      <article class="card lg:col-span-4 p-8 md:p-10 bg-surface relative overflow-hidden">
        <img
          v-if="story.bento.bridgeImage"
          :src="story.bento.bridgeImage"
          :alt="story.bento.bridgeTitle"
          width="1600"
          height="1000"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div class="relative">
          <h3 class="font-display font-extrabold text-2xl text-ink">{{ story.bento.bridgeTitle }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-ink-soft">{{ story.bento.bridgeBody }}</p>
        </div>
      </article>

      <article
        class="card lg:col-span-12 flex items-stretch overflow-hidden bg-gradient-to-r from-paper to-bg"
      >
        <div class="flex-1 p-8 md:p-10 flex items-center justify-between gap-6 flex-wrap">
          <div>
            <div class="eyebrow">Tradition</div>
            <h3 class="mt-3 text-2xl md:text-3xl text-ink">{{ story.bento.gestureTitle }}</h3>
          </div>
          <div v-if="!story.bento.gestureImage" class="text-5xl md:text-6xl">🥢</div>
        </div>
        <img
          v-if="story.bento.gestureImage"
          :src="story.bento.gestureImage"
          :alt="story.bento.gestureTitle"
          width="800"
          height="1000"
          loading="lazy"
          class="hidden md:block w-1/3 object-cover"
        />
      </article>
    </section>

    <!-- PILLARS -->
    <section>
      <div class="text-center max-w-2xl mx-auto">
        <div class="eyebrow">Nos engagements</div>
        <h2 class="mt-2 text-3xl md:text-5xl">Nos piliers culinaires</h2>
      </div>

      <div class="mt-10 md:mt-12 grid md:grid-cols-3 gap-4 md:gap-6">
        <article
          v-for="(p, i) in story.pillars"
          :key="p.title"
          class="card overflow-hidden bg-surface"
        >
          <div v-if="p.image" class="aspect-[16/10] overflow-hidden">
            <img
              :src="p.image"
              :alt="p.title"
              loading="lazy"
              width="1600"
              height="1000"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-8 md:p-10">
            <span class="font-display font-extrabold text-brick text-xl">0{{ i + 1 }}</span>
            <h3 class="mt-4 text-xl md:text-2xl text-ink font-display font-extrabold">
              {{ p.title }}
            </h3>
            <p class="mt-3 text-sm md:text-base text-ink-soft leading-relaxed">{{ p.body }}</p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
