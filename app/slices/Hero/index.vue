<script setup lang="ts">
import { isFilled, type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.HeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

// type HackyHacky = {
//   url: string;
//   text: string;
// };

// const linkUrl = computed(
//   () => (props.slice.primary.link satisfies unknown as HackyHacky).url
// );
// const linkText = computed(
//   () => (props.slice.primary.link satisfies unknown as HackyHacky).text
// );

const { linkText, linkUrl } = useUsePrismicLink(props.slice.primary.link);
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
    <div v-if="isFilled.link(slice.primary.link)" class="actions">
      <a :href="linkUrl">
        <button>{{ linkText }}</button>
      </a>
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
  text-shadow: 1px 1px var(--dark-bg-color);
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

button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--brand-color);
  color: white;
  text-transform: uppercase;
  text-shadow: none;
}
</style>
