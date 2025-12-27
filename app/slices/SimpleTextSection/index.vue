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
  >
    <div>
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

div {
  padding: 5rem;
}
</style>
