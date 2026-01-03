<template>
  <header>
    <h1>
      <a id="goHome" href="/"
        >Tiskni<span style="color: var(--brand-color)">Lepe3D</span></a
      >
    </h1>
    <div class="links">
      <a class="link" href="#">kontakty</a>
      <a class="link" href="#">galerie</a>
      <a class="link highlight" href="/workflow">zabezpecený&nbsp;workflow</a>
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

#goHome {
  color: white;
}

h1 {
  font-size: large;
  margin: 0;
}

.link {
  font-size: small;
  color: white;
  text-transform: uppercase;
}

.highlight {
  text-align: center;
  font-weight: bold;
  border: 1px solid var(--border-color);
  padding: 5px 10px;
  border-radius: 3px;
}

@media screen and (max-width: 599px) {
  .highlight {
    margin-left: auto;
  }
}
</style>
