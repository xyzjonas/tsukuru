<template>
  <section>
    <footer class="w-page">
      <div class="group">
        <h5 id="goHome" href="/">
          Tiskni<span style="color: var(--brand-color)">Lepe3D</span>
        </h5>
      </div>
      <div
        v-for="(col, index) in footer?.data.columns ?? []"
        :key="index"
        class="group"
      >
        <PrismicRichText :field="col.text" />
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
const prismic = usePrismic();

const { data: footer } = await useAsyncData("footer", () =>
  prismic.client.getSingle("footer")
);
</script>

<style lang="css" scoped>
section {
  background-color: black;
  color: #e0e0e0c3;
}

footer {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 4rem;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

:deep(h5) {
  margin-bottom: 0;
}

@media screen and (max-width: 599px) {
  footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
