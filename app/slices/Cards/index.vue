<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.CardsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="wrapper"
  >
    <div class="cards w-page">
      <div
        v-for="(card, index) in slice.primary.cards"
        :key="index"
        class="card"
      >
        <div class="title-row">
          <PrismicImage :field="card.icon" />
          <h2>{{ card.title }}</h2>
        </div>
        <p>{{ card.text }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
section {
  color: white;
  /* border-radius: 8px; */
}

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
  border: 1px solid var(--gray-10);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  box-shadow: var(--shadow-5);
  padding: 2rem;
}

.title-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 1rem;
}

p {
  text-align: center;
}

h2 {
  font-size: 30px;
  text-align: center;
}

.title-row > img {
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
</style>
