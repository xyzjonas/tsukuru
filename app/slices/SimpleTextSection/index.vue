<script setup lang="ts">
import type { Content } from "@prismicio/client";

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
    <div class="w-page">
      <h2>{{ slice.primary.title }}</h2>
      <h5 v-if="slice.primary.subtitle">{{ slice.primary.subtitle }}</h5>
      <PrismicText :field="slice.primary.body" />
    </div>
  </section>
</template>

<style lang="css" scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

h2 {
  line-height: var(--font-lineheight-0);
  margin-bottom: 1rem;
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
}
</style>
