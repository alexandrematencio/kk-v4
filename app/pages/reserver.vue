<script setup lang="ts">
const { data: booking } = await useAsyncData('page-booking', () =>
  queryCollection('booking').first()
)

const form = reactive({
  date: '',
  time: '12:00',
  party: '2',
  name: '',
  phone: '',
  notes: '',
})

const submitted = ref(false)
function onSubmit() {
  submitted.value = true
}

useSeoMeta({
  title: 'Réserver — Khan Kluay',
  description:
    "Réservez votre table chez Khan Kluay, cantine thaï halal à Paris 11ème.",
})

const asset = useAsset()
</script>

<template>
  <div v-if="booking" class="container-content py-12 md:py-16">
    <header
      class="relative overflow-hidden rounded-2xl mb-10 md:mb-14"
      :class="booking.image && 'min-h-[280px] md:min-h-[360px] flex items-end p-6 md:p-12 text-white'"
    >
      <img
        v-if="booking.image"
        :src="asset(booking.image)"
        :alt="booking.title"
        width="1600"
        height="900"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        v-if="booking.image"
        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
      />
      <div class="relative max-w-3xl">
        <div class="eyebrow" :class="booking.image && 'text-lime'">Une expérience</div>
        <h1
          class="mt-4 text-5xl md:text-7xl whitespace-pre-line"
          :class="booking.image && 'text-white drop-shadow-lg'"
        >
          {{ booking.title }}
        </h1>
        <p
          class="mt-6 text-base md:text-lg leading-relaxed whitespace-pre-line"
          :class="booking.image && 'text-white/90 drop-shadow'"
        >
          {{ booking.intro }}
        </p>
      </div>
    </header>

    <div class="grid lg:grid-cols-5 gap-6 md:gap-10">
      <!-- FORM -->
      <section class="card lg:col-span-3 p-6 md:p-10 bg-white">
        <form v-if="!submitted" class="space-y-6" @submit.prevent="onSubmit">
          <div class="grid sm:grid-cols-2 gap-4">
            <label class="block">
              <span class="text-xs font-semibold uppercase tracking-wider text-ink">Date</span>
              <input
                v-model="form.date"
                type="date"
                required
                class="mt-2 w-full bg-bg border border-divider rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-action/30"
              />
            </label>

            <label class="block">
              <span class="text-xs font-semibold uppercase tracking-wider text-ink">Heure</span>
              <input
                v-model="form.time"
                type="time"
                required
                class="mt-2 w-full bg-bg border border-divider rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-action/30"
              />
            </label>
          </div>

          <fieldset>
            <legend class="text-xs font-semibold uppercase tracking-wider text-ink">
              Nombre de personnes
            </legend>
            <div class="mt-3 grid grid-cols-6 gap-2">
              <button
                v-for="n in booking.partySizes"
                :key="n"
                type="button"
                class="rounded-lg border py-3 text-sm font-semibold transition-colors"
                :class="
                  form.party === n
                    ? 'bg-action border-action text-white'
                    : 'bg-bg border-divider text-ink-soft hover:border-action'
                "
                @click="form.party = n"
              >
                {{ n }}
              </button>
            </div>
          </fieldset>

          <label class="block">
            <span class="text-xs font-semibold uppercase tracking-wider text-ink">Nom complet</span>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="Jean Dupont"
              class="mt-2 w-full bg-bg border border-divider rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-action/30"
            />
          </label>

          <label class="block">
            <span class="text-xs font-semibold uppercase tracking-wider text-ink">Téléphone</span>
            <input
              v-model="form.phone"
              type="tel"
              required
              placeholder="06 12 34 56 78"
              class="mt-2 w-full bg-bg border border-divider rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-action/30"
            />
          </label>

          <label class="block">
            <span class="text-xs font-semibold uppercase tracking-wider text-ink">
              Notes spéciales (allergies, anniversaire...)
            </span>
            <textarea
              v-model="form.notes"
              rows="3"
              class="mt-2 w-full bg-bg border border-divider rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-action/30 resize-none"
            />
          </label>

          <button type="submit" class="btn-primary w-full text-base">
            {{ booking.submitLabel }}
          </button>
        </form>

        <div
          v-else
          role="status"
          aria-live="polite"
          class="py-12 text-center"
        >
          <div aria-hidden="true" class="text-5xl">🐘</div>
          <h3 class="mt-4 text-2xl">Merci, {{ form.name }} !</h3>
          <p class="mt-2 text-ink-soft">
            Votre demande pour {{ form.party }} personnes le {{ form.date }} à {{ form.time }} a bien été reçue.<br />
            Nous vous confirmons par téléphone sous peu.
          </p>
        </div>
      </section>

      <!-- INFO COLUMN -->
      <aside class="lg:col-span-2 grid gap-4 md:gap-5 content-start">
        <div class="card overflow-hidden bg-paper">
          <div v-if="booking.info.mapImage" class="aspect-[16/10] overflow-hidden">
            <img
              :src="asset(booking.info.mapImage)"
              :alt="booking.info.name"
              loading="lazy"
              width="1600"
              height="1000"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-6 md:p-8">
            <div class="eyebrow">L'adresse</div>
            <h2 class="mt-3 font-display font-extrabold text-xl text-ink">
              {{ booking.info.name }}
            </h2>
            <p class="mt-3 text-sm leading-relaxed whitespace-pre-line text-ink-soft">
              {{ booking.info.address }}
            </p>
            <a
              :href="`tel:+33${booking.info.phone.replace(/\\D/g,'').replace(/^0/,'')}`"
              class="mt-2 inline-block text-sm font-medium text-action-dark hover:text-action transition-colors"
            >
              {{ booking.info.phone }}
            </a>
          </div>
        </div>

        <div class="card p-6 md:p-8 bg-surface">
          <div class="eyebrow">Horaires d'Ouverture</div>
          <ul class="mt-4 space-y-3">
            <li
              v-for="h in booking.info.hours"
              :key="h.day"
              class="flex justify-between gap-4 text-sm pb-3 border-b border-divider/60 last:border-0"
            >
              <span class="font-semibold text-ink whitespace-pre-line">{{ h.day }}</span>
              <span class="text-ink-soft text-right whitespace-pre-line">{{ h.hours }}</span>
            </li>
          </ul>
        </div>

        <div
          class="card overflow-hidden relative min-h-[140px] flex items-end p-6 md:p-8 text-white"
          :class="!booking.info.ambianceImage && 'bg-gradient-to-br from-brick to-brick-dark'"
        >
          <img
            v-if="booking.info.ambianceImage"
            :src="asset(booking.info.ambianceImage)"
            alt="Ambiance"
            width="1600"
        height="900"
        class="absolute inset-0 w-full h-full object-cover"
          />
          <div
            v-if="booking.info.ambianceImage"
            class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
          />
          <p class="relative font-display font-extrabold text-xl leading-tight italic drop-shadow-lg">
            « L'esprit de Bangkok, le cœur de Paris. »
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>
