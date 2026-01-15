<script setup lang="ts">
import { isFilled, type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.ItemsMatrixSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const isToggled = ref(false);
const selectedIndex = ref(-1);
const selectedTile = computed(
  () => props.slice.primary.tiles[selectedIndex.value] ?? undefined
);

const onTileClick = (index: number) => {
  const tile = props.slice.primary.tiles[index];
  if (tile && tile.popup_content?.length > 0) {
    selectedIndex.value = index;
    isToggled.value = true;
  }
};

const onTileClose = () => {
  isToggled.value = false;
  setTimeout(() => (selectedIndex.value = -1), 350);
};

const isRichVariant = computed(() => props.slice.variation === "withRichText");

const tiles = ref<HTMLDivElement | null>(null);
const isDown = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

const startDrag = (e: MouseEvent) => {
  if (!tiles.value) return;
  isDown.value = true;
  tiles.value.style.cursor = "grabbing";
  startX.value = e.pageX - tiles.value.offsetLeft;
  scrollLeft.value = tiles.value.scrollLeft;
};

const endDrag = () => {
  if (!tiles.value) return;
  isDown.value = false;
  tiles.value.style.cursor = "grab";
};

const onDrag = (e: MouseEvent) => {
  if (!isDown.value || !tiles.value) return;
  e.preventDefault();
  const x = e.pageX - tiles.value.offsetLeft;
  const walk = (x - startX.value) * 2;
  tiles.value.scrollLeft = scrollLeft.value - walk;
};
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="wrapper"
  >
    <div class="w-page">
      <div class="rich-text">
        <PrismicRichText :field="slice.primary.heading" />
      </div>
      <div
        ref="tiles"
        class="tiles"
        @mousedown="startDrag"
        @mouseleave="endDrag"
        @mouseup="endDrag"
        @mousemove="onDrag"
      >
        <div
          v-for="(tile, index) in slice.primary.tiles"
          :key="index"
          :class="['card', isRichVariant ? 'card-rich' : '']"
        >
          <div
            :class="[isRichVariant ? 'image-wrapper-rich' : 'image-wrapper']"
          >
            <PrismicImage :field="tile.background" />
          </div>
          <div v-if="isRichVariant" class="rich-text rich-body">
            <PrismicRichText :field="tile.text" />
          </div>
          <p v-else>{{ tile.label }}</p>
          <button
            v-if="isFilled.richText(tile.popup_content)"
            aria-label="more"
            @click="onTileClick(index)"
          >
            více
          </button>
        </div>
      </div>
      <div
        id="slider"
        :class="[isToggled ? 'active' : '']"
        @click="onTileClose"
      >
        <div v-if="selectedTile" class="sliderBody">
          <button id="sliderClose" aria-label="close" @click="onTileClose">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <PrismicRichText :field="selectedTile.popup_content" />
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
  gap: 1rem;

  overflow-x: auto;
  padding-block: 2rem;

  cursor: grab;
  user-select: none;
}

@media screen and (max-width: 599px) {
  .tiles {
    /* 1. Enable momentum scrolling on iOS */
    -webkit-overflow-scrolling: touch;

    /* 2. Snap points for that "native app" feel */
    scroll-snap-type: x mandatory;

    justify-content: start;
    /* 3. Hide scrollbars (Standard) */
    scrollbar-width: none;
  }

  /* Hide scrollbars (Chrome/Safari/Edge) */
  .tiles::-webkit-scrollbar {
    display: none;
  }
}

.card {
  /* width: 12rem; */
  /* height: 14rem; */
  position: relative;
  flex: 1;
  aspect-ratio: 0.8;

  /* max-width: 256px; */
  min-width: 250px;

  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-3);

  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 18px;
  transition: var(--transition);

  scroll-snap-align: center; /* Items "stick" to the center when scrolling stops */
}

.card-rich {
  aspect-ratio: 0.5;
  padding-top: calc(256px + 18px);
}

.rich-body {
  flex: 1;
  overflow-y: auto;
  text-align: left;
  z-index: 120;
}

.card:hover {
  cursor: pointer;
  box-shadow: var(--shadow-4);
  /* transform: scale(0.99); */
}

.card:hover .image-wrapper > img {
  transform: scale(1.05);
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

.image-wrapper-rich {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* background-color: red; */
  align-self: stretch;
  flex: 1;
  margin: 0;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  height: 256px;
}

@media screen and (max-width: 599px) {
  .image-wrapper {
    margin: 12px;
  }

  .card {
    aspect-ratio: 0.7;
  }

  .card-rich {
    aspect-ratio: 0.35;
  }
}

.image-wrapper > img,
.image-wrapper-rich > img {
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

  transition: var(--transition);
}

.image-wrapper-rich > img {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  filter: none;
}

.card p {
  z-index: 10;
  font-size: small;
  font-weight: bold;
  text-align: center;
  margin-bottom: 12px;
  margin-top: 1rem;
  text-overflow: 1px 1px black;
}

#slider {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 120;
  background-color: var(--gray-10);
  transform: translateX(100%);
  transition: transform 0.3s ease;

  padding: 64px;
  overflow-y: scroll;

  text-align: left;
}

#sliderClose {
  position: absolute;
  top: -2rem;
  right: -2rem;
  z-index: 125;
  font-size: large;
  cursor: pointer;

  background-color: transparent;
  padding: 8px;
  outline: none;
  aspect-ratio: 1;

  &:hover {
    font-weight: bold;
  }
}

.sliderBody {
  position: relative;
  width: 100%;
}

#slider.active {
  transform: translateX(0);
}

@media screen and (max-width: 599px) {
  #slider {
    padding: 48px;
  }
  .sliderBody {
    width: calc(100% - 32px / 4);
  }

  #slider.active {
    transform: translateX(0);
  }
}

button {
  font-size: small;
  padding-block: 6px;
  align-self: stretch;
  z-index: 250;
  text-shadow: none;
  background-color: var(--brand-color);
}
</style>
