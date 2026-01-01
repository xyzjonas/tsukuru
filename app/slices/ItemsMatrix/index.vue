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
    class="wrapper"
  >
    <div class="w-page">
      <h3>{{ slice.primary.heading }}</h3>
      <div class="tiles">
        <div
          v-for="(tile, index) in slice.primary.tiles"
          :key="index"
          class="card"
        >
          <div class="image-wrapper">
            <PrismicImage :field="tile.background" />
          </div>
          <p>{{ tile.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
section {
  color: white;
  border-radius: 8px;
}

.wrapper {
  padding-inline: var(--size-8);
}

@media screen and (max-width: 599px) {
  .wrapper {
    padding-inline: var(--size-4);
  }
}

.tiles {
  display: flex;
  overflow-x: auto;
  gap: 1rem;

  overflow-x: auto;
  padding-block: 1rem;
  margin-top: 1rem;
  /* justify-content: space-between; */
}

@media screen and (max-width: 599px) {
  .tiles {
    justify-content: start;
  }
}

.card {
  /* width: 12rem; */
  /* height: 14rem; */
  position: relative;
  flex: 1;
  aspect-ratio: 0.9;

  /* max-width: 256px; */
  min-width: 196px;

  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: var(--shadow-3);

  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;

  padding: 12px;
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

.image-wrapper {
  position: relative;
  /* background-color: red; */
  align-self: stretch;
  flex: 1;
  margin: 28px;
}

@media screen and (max-width: 599px) {
  .image-wrapper {
    margin: 12px;
  }
}

.image-wrapper > img {
  object-position: center;
  object-fit: cover;

  z-index: -1;
  position: absolute;
  inset: 0;
  object-fit: cover;
  object-position: center;
  height: 100%;
  border-radius: 8px;
  filter: blur(0.3px) drop-shadow(0 0 12px rgba(55, 67, 83, 0.678));
  scrollbar-color: transparent;
  scrollbar-track-color: transparent;
}

.card p {
  z-index: 10;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 12px;
  text-overflow: 1px 1px black;
}
</style>
