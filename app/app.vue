<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="css">
@import "open-props/style";

@import "open-props/normalize";
@import "open-props/shadow/style";

:root {
  --brand-color: #db802f;
  --border-color: #4f7c98;
  --light-bg-color: var(--surface-4);
}

.w-page {
  max-width: 1280px;
  margin-inline: auto;
}

/* Set fonts */
/* html {
  --font-serif: "Anton";
  font-family: var(--font-sans);
} */

/* Add some global styling for website sections */
section {
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* gap: var(--size-5); */
  padding: var(--size-10) 1rem;
}

section:nth-child(even) {
  background: var(--surface-1);
}

section:nth-child(odd) {
  background: var(--light-bg-color);
}
</style>
