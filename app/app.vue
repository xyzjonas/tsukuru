<template>
  <div id="pageWrapper">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
useHead({
  meta: [
    {
      name: "google-site-verification",
      content: "Qf1v7b1GG_WaVsaAaLIhK4R1FnLB5kspX2BcPTnEwz0",
    },
  ],
  script: [],
});
</script>

<style lang="css">
@import "open-props/style";

@import "open-props/normalize";
@import "open-props/shadow/style";
@import "open-props/buttons";

:root {
  --brand-color: #db802f;
  --border-color: #4f7c9834;
  --foreground-color: #1a1a1a;
  --text-color: #e0e0e0;
  --light-bg-color: var(--surface-4);
  --dark-bg-color: #212529;
  --background-color: #121212;
  --border-radius: 6px;

  /* --shadow-2: 0 0 0 3px hsl(0 0% 20%); */
  --surface-3: transparent;

  --transition: transform 0.2s ease;

  background-color: var(--background-color);

  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

button {
  font-weight: normal;
}

.w-page {
  max-width: 1100px;
  margin-inline: auto;
}

body {
  /* background-color: var(--dark-bg-color); */
  /* #101214 */
  color: var(--text-color);
  font-family: "Poppins", sans-serif;
}

h1,
h2,
h3,
h4,
h5 {
  line-height: 100%;
  margin-bottom: 1rem;
}

@media screen and (max-width: 599px) {
  h1 {
    font-size: var(--font-size-6);
  }

  h2 {
    font-size: var(--font-size-5);
  }
}

h5 {
  color: var(--gray-6);
  font-weight: normal;
}

p {
  margin-block: 1rem;
}

ul,
ol {
  padding-left: 1.5rem;
}

/* Prismic Image */
.block-img > img {
  border-radius: calc(2 * var(--border-radius));
}

/* Form elements */
input,
textarea,
select {
  background: #1a1a1a;
  color: inherit;
  border: 1px solid var(--border-color);
  font: inherit;
}

/* Remove white backgrounds from autofill */
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #1a1a1a inset;
  -webkit-text-fill-color: #e0e0e0;
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
  padding: 1rem;
  padding-block: 2rem;
  box-sizing: border-box;
}
/* 
section {
  background-color: #212121;
}

section:nth-child(even) {
  background-color: var(--dark-bg-color);
} */

/* section:nth-child(odd) {
  background: var(--light-bg-color);
  background-color: #212121;
} */

#pageWrapper {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
}

a {
  color: var(--brand-color);
  /* text-decoration: underline; */
  text-decoration-color: var(--brand-color);
}
</style>
