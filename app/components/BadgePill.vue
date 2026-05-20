<script setup lang="ts">
const props = defineProps<{ label: string; tone?: 'olive' | 'brick' | 'neutral' }>()

const tone = props.tone ?? inferTone(props.label)

function inferTone(label: string): 'olive' | 'brick' | 'neutral' {
  const upper = label.toUpperCase()
  if (
    upper.includes('VEGETARIEN') ||
    upper.includes('SANS GLUTEN') ||
    upper.includes('SANS ALCOOL')
  )
    return 'olive'
  if (
    upper.includes('POPULAIRE') ||
    upper.includes('CHEF') ||
    upper.includes('HALAL') ||
    upper.includes('PIMENT')
  )
    return 'brick'
  return 'neutral'
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1',
      tone === 'olive' && 'bg-olive/10 text-olive-dark',
      tone === 'brick' && 'bg-brick/10 text-brick',
      tone === 'neutral' && 'bg-surface-tint/30 text-ink',
    ]"
  >
    {{ label }}
  </span>
</template>
