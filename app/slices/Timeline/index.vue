<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.TimelineSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section>
    <div class="w-page">
      <div class="rich-text">
        <PrismicRichText :field="slice.primary.heading" />
      </div>
      <div class="timeline">
        <div
          v-for="(item, index) in slice.primary.steps"
          :key="index"
          class="item"
        >
          <div class="card-image">
            <PrismicImage :field="item.image" />
          </div>
          <div class="card-content">
            <PrismicRichText :field="item.content" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.w-page {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.rich-text {
  align-self: center;
  margin-bottom: 2rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card-image {
  position: relative;
  width: 512px;
  aspect-ratio: 1.4;
}

@media screen and (max-width: 599px) {
  .card-image {
    width: 100%;
  }
}

.card-image > img {
  object-position: center;
  object-fit: cover;

  z-index: 10;
  position: absolute;
  inset: 0;
  object-fit: cover;
  object-position: center;
  height: 100%;
  border-radius: 8px;
  filter: blur(0.1px) drop-shadow(0 0 12px rgba(30, 30, 30, 0.678));

  transition: var(--transition);
}

.card-content {
  /* flex: 1; */
  max-width: 512px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  padding: 1rem 2rem;
}

.item:nth-of-type(even) {
  flex-direction: row-reverse;
}

@media screen and (max-width: 599px) {
  .item {
    flex-direction: column;
    gap: 1rem;
  }

  .item:nth-of-type(even) {
    flex-direction: column;
  }
}

.item:nth-of-type(odd) {
  /* text-align: end; */
}

:deep(p) {
  text-indent: 0 !important;
  padding: 0;
  width: 100%;
}
</style>
