<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.HeroSlice>([
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
    <PrismicImage class="background" :field="slice.primary.background" />
    <div class="logo">
      <PrismicImage class="logo" :field="slice.primary.logo" />
    </div>
    <div class="actions">
      <a class="btn">{{ slice.primary.linktext }}</a>
      <p>{{ slice.primary.subtitle }}</p>
    </div>
  </section>
</template>

<style lang="css" scoped>
section {
  width: 100%;
  height: 40rem;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  /* justify-content: center; */
  /* align-content: center; */

  z-index: 0;
}

section::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0) 80%,
    rgba(0, 0, 0, 0.7) 100%
  );
  pointer-events: none;
  z-index: 1;
}

.actions {
  text-align: center;
}

.actions p {
  color: white;
  margin-top: 1rem;
  text-shadow: 1px 1px darkslategray;
}

.background {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo > img {
  /* width: 164px; */
  /* height: 164px; */
  width: 358px;
  z-index: 10;
  filter: blur(0.4px) drop-shadow(0 0 12px rgba(156, 150, 150, 0.5))
    drop-shadow(0 0 15px rgba(43, 43, 43, 0.5));
  justify-self: start;
}

@media screen and (max-width: 599px) {
  .logo > img {
    /* width: 164px; */
    /* height: 164px; */
    width: 256px;
  }
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--brand-color);
  color: white;
  text-decoration: none;
  border-radius: 0.375rem;
  font-weight: normal;
  text-align: center;
  transition: background-color 0.2s ease;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  user-select: none;
}

.btn:hover {
  box-shadow: var(--shadow-3);
  text-decoration: underline;
}

.btn:active {
  background-color: var(--brand-color);
  transform: translateY(1px);
}

.btn:focus {
  outline: 2px solid #93c5fd;
  outline-offset: 2px;
}
</style>
