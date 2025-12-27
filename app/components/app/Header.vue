<template>
  <header>
    <h1>Tiskni<span style="color: var(--brand-color)">Lepe3D</span></h1>
    <div class="links">
      <a href="#">kontakty</a>
      <a href="#">galerie</a>
      <a class="highlight" href="#">zabezpecený workflow</a>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
header {
  padding: 12px;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
}

.links {
  align-items: center;
  display: flex;
  gap: 1.5rem;
  flex: 1;
  min-width: 312px;
  justify-content: end;
}

h1 {
  font-size: large;
}

a {
  font-size: small;
  color: white;
  text-transform: uppercase;
}

.highlight {
  font-weight: bold;
  border: 1px solid var(--border-color);
  padding: 5px 10px;
  border-radius: 3px;
  line-break: none;
}

@media screen and (max-width: 599px) {
  .highlight {
    margin-left: auto;
  }
}
</style>
