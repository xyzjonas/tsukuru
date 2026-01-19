<script setup lang="ts">
import { isFilled, type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.CardsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const padding = computed(() =>
  props.slice.primary.compact ? "0 var(--size-2)" : "var(--size-4)"
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="wrapper"
  >
    <div class="w-page">
      <div v-if="isFilled.richText(slice.primary.heading)" class="rich-text">
        <PrismicRichText :field="slice.primary.heading" />
      </div>
      <div class="cards">
        <div
          v-for="(card, index) in slice.primary.cards"
          :key="index"
          :class="['card', isFilled.image(card.icon) ? '' : 'centered']"
        >
          <PrismicImage :field="card.icon" :widths="[64, 128, 256]" />
          <div class="text">
            <PrismicRichText :field="card.body" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.wrapper {
  padding-inline: var(--size-8);
}

@media screen and (max-width: 599px) {
  .wrapper {
    padding-inline: var(--size-4);
  }
}

.cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
}

@media screen and (max-width: 959px) {
  .cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 599px) {
  .cards {
    grid-template-columns: 1fr;
  }
}

.card {
  background-color: var(--foreground-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);

  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: start;

  box-shadow: var(--shadow-5);
  padding: v-bind(padding);
}

.centered {
  justify-content: center;
}

.text {
  text-align: center;
}

h2 {
  font-size: 30px;
  text-align: center;
}

.card > img {
  width: 128px;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
}

@media screen and (max-width: 599px) {
  /* .title-row > img {
    width: 96px;
  } */

  h2 {
    font-size: x-large;
  }
}

.w-page {
  display: flex;
  flex-direction: column;
}

.rich-text {
  align-self: center;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
