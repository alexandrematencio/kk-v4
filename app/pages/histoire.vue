<script setup lang="ts">
const { data: story } = await useAsyncData('page-story', () =>
  queryCollection('story').first()
)

useSeoMeta({
  title: 'Notre Histoire — Khan Kluay',
  description:
    "L'héritage d'une terre rouge. Khan Kluay, le petit éléphant bleu — du cœur de l'Isan aux rues de Paris.",
})
</script>

<template>
  <div v-if="story" class="container-content py-12 md:py-16">
    <StorySections :story="story" as-h1 />
  </div>
</template>
