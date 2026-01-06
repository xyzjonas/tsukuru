<script setup lang="ts">
import { isFilled, type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.SimpleTextSectionSlice>([
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
    <div
      :class="[
        'w-page',
        'image-wrapper',
        isFilled.image(slice.primary.background) ? 'text-shadow' : '',
      ]"
    >
      <PrismicImage
        v-if="slice.primary.background"
        :field="slice.primary.background"
      />
      <PrismicRichText :field="slice.primary.text" />
      <!-- <h2>{{ slice.primary.title }}</h2>
      <h5 v-if="slice.primary.subtitle">{{ slice.primary.subtitle }}</h5>
      <PrismicText :field="slice.primary.body" /> -->
    </div>
  </section>
</template>

<style lang="css" scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  background-color: v-bind(slice.primary.background_color);
}

:deep(h2) {
  line-height: var(--font-lineheight-0);
  margin-bottom: 1rem;
}

:deep(p) {
  margin-top: 1rem;
}

.wrapper {
  padding-inline: var(--size-8);
}

@media screen and (max-width: 599px) {
  .wrapper {
    padding-inline: var(--size-4);
  }
}

.w-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  padding: 2rem;
  border-radius: 24px;
}

.image-wrapper::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  pointer-events: none;
  z-index: -1;
}

.image-wrapper > img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: -1;
}

.text-shadow {
  text-shadow: 2px 2px var(--dark-bg-color);
}
</style>
