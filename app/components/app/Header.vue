<template>
  <nav>
    <div class="nav-container">
      <a id="goHome" href="/"
        >Tiskni<span style="color: var(--brand-color)">Lepe3D</span></a
      >
      <div
        id="hamburger"
        :class="['hamburger', menuToggle ? 'active' : '']"
        @click="menuToggle = !menuToggle"
      >
        <span />
        <span />
        <span />
      </div>

      <ul v-if="nav" id="navMenu" :class="menuToggle ? 'active' : ''">
        <li
          v-for="(link, index) in nav.data.tabs"
          :key="index"
          :class="[isActive(link.link) ? 'active' : '']"
        >
          <!-- <a href="#home" class="active">Home</a> -->
          <PrismicLink
            :field="link.link"
            :class="[
              link.highlighted ? 'highlight' : '',
              isActive(link) ? 'active' : '',
            ]"
          />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
const prismic = usePrismic();
const route = useRoute();
const { data: nav } = await useAsyncData("nav", () =>
  prismic.client.getSingle("nav")
);

const isActive = (item: unknown) => {
  const link = prismicLink(item).url;
  console.info(item);
  console.info(`${link} x ${route.fullPath}`);
  return link === route.fullPath;
};

const menuToggle = ref(false);
</script>

<style scoped lang="css">
#goHome {
  color: var(--text-color);
  display: flex;
  flex-wrap: nowrap;
  font-size: larger;
  font-weight: bold;
}

nav {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 120;
  width: 100%;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: var(--text-color);
  margin: 3px 0;
  transition: 0.3s;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 12px;
  background-color: var(--background-color);
}

nav ul li {
  max-inline-size: none;
  padding: 0;
}

ul a {
  display: inline-block;
  padding: 20px 10px;
  text-decoration: none;
  color: var(--text-color);
  position: relative;
  transition: color 0.3s ease;
  text-transform: capitalize;
  font-weight: 500;
}

ul a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: var(--brand-color);
  transition:
    width 0.3s ease,
    left 0.3s ease;
}

ul a:hover {
  color: var(--brand-color);
}

ul a:hover::after {
  width: 100%;
  left: 0;
}

ul li.active a::after {
  width: 100%;
  left: 0;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  nav ul {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  nav ul.active {
    max-height: 400px;
  }

  nav li {
    border-bottom: 1px solid var(--border-color);
  }

  nav li:last-child {
    border-bottom: none;
  }

  nav a {
    display: block;
    padding: 15px 20px;
  }

  nav a::after {
    height: 2px;
  }
}
</style>
<!-- 
<style lang="css" scoped>
nav {
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

a .router-link-active {
  color: red;
}

.links a {
  display: inline-block;
  padding: 20px 10px;
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  text-transform: capitalize;
}

.links a::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--brand-color);
  transition:
    width 0.2s ease,
    left 0.2s ease;
}

.links a:hover {
  color: var(--brand-color);
}

.links a:hover::after {
  width: 100%;
  left: 0;
}

.links a.active::after {
  width: 100%;
  left: 0;
}

#goHome {
  color: white;
  display: flex;
  flex-wrap: nowrap;
  min-width: 200px;
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
</style> -->
