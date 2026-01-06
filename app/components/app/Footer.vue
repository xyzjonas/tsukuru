<template>
  <section>
    <footer class="w-page">
      <div class="group">
        <h5 id="goHome" href="/">
          Tiskni<span style="color: var(--brand-color)">Lepe3D</span>
        </h5>
      </div>
      <div class="group">
        <h5>Provozovatel</h5>
        <p>Jan Novák</p>
        <p>Ulice č.p.</p>
        <p>PSČ a město</p>
        <p>IČO</p>
      </div>
      <div class="group">
        <h5>Kontakt</h5>
        <p>info@tisknilepe3d.cz</p>
        <p>+420&nbsp;111&nbsp;111&nbsp;111</p>
      </div>
    </footer>
  </section>
</template>

<script lang="ts" setup></script>

<style lang="css" scoped>
section {
  background-color: black;
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
}

@media screen and (max-width: 599px) {
  footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
