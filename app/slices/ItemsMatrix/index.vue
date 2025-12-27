<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ItemsMatrixSlice>([
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
  >
    <h3>{{ slice.primary.heading }}</h3>
    <div class="tiles">
      <div
        v-for="(tile, index) in slice.primary.tiles"
        :key="index"
        class="card"
      >
        <PrismicImage :field="tile.background" />
        <p>{{ tile.label }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
section {
  background-color: #24272e;
  padding: 32px;
  color: white;
  border-radius: 8px;
}

.tiles {
  display: flex;
  overflow-x: auto;
  gap: 1.8rem;

  overflow-x: auto;
  padding-block: 1rem;
  margin-top: 1rem;
  justify-content: center;
}

@media screen and (max-width: 599px) {
  .tiles {
    justify-content: start;
  }
}

.card {
  /* width: 12rem; */
  /* height: 14rem; */
  flex: 1;
  aspect-ratio: 0.9;
  position: relative;

  max-width: 256px;
  min-width: 196px;

  border: 2px solid var(--border-color);
  border-radius: 8px;

  z-index: 10;

  display: flex;
  align-items: end;
  justify-content: center;
}

.card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  pointer-events: none;
  border-radius: 8px;
}

.card > img {
  object-position: center;
  object-fit: cover;

  z-index: -1;
  position: absolute;
  inset: 0;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
}

.card p {
  z-index: 10;
  font-size: small;
  text-align: center;
  margin-bottom: 12px;
  text-overflow: 1px 1px black;
}
</style>
