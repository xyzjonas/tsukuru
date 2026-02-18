<template>
  <section>
    <footer id="footer" class="w-page">
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
        <div v-if="JSON.stringify(col.text).includes('Kontakt')">
          <a
            href="https://wa.me/message/3BPT4ZA7CMRTD1"
            target="_blank"
            class="whatsapp"
          >
            <img
              src="@/assets/whatsapp.png"
              alt="whatsapp"
              style="width: 22px"
            />
            +420 728 917 391
          </a>
          <a
            href="https://www.instagram.com/tisknilepe3d?igsh=anBsY253OGs2NDFt"
            target="_blank"
            class="ig"
          >
            <img
              src="@/assets/instagram.svg"
              alt="instagram"
              style="width: 22px"
            />
            tisknilepe3d
          </a>
        </div>
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
  margin-block: 2rem;
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

.whatsapp {
  display: flex;
  gap: 0.5rem;
  color: #008e4b;
}

.ig {
  display: flex;
  gap: 0.5rem;
  color: #b24787;
  margin-top: 12px;
}

.whatsapp:hover {
  text-decoration: underline;
}
</style>
