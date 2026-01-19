<template>
  <nav>
    <div class="nav-container">
      <a id="goHome" href="/"
        >Tiskni<span style="color: var(--brand-color)">Lepe3D</span></a
      >
      <div
        id="hamburger"
        ref="hamburger"
        :class="['hamburger']"
        @click="toggleMenu"
      >
        <span />
        <span />
        <span />
      </div>

      <ul v-if="nav" id="navMenu" ref="navMenu">
        <li
          v-for="(link, index) in nav.data.tabs"
          :key="index"
          :class="[isActive(link.link) ? 'active' : '']"
          @click="toggleMenu"
        >
          <!-- <a href="#home" class="active">Home</a> -->
          <PrismicLink
            :field="link.link"
            :class="[
              link.highlighted ? 'highlight' : '',
              isActive(link.link) ? 'active' : '',
            ]"
          />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
const prismic = usePrismic();
const { data: nav } = await useAsyncData("nav", () =>
  prismic.client.getSingle("nav")
);

const isActive = (item: unknown) => {
  const link = prismicLink(item).url;
  return link === location?.pathname;
};

const hamburger = ref<HTMLElement>();
const navMenu = ref<HTMLDivElement>();
const toggleMenu = () => {
  hamburger.value?.classList.toggle("active");
  navMenu.value?.classList.toggle("active");
};
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
  padding-inline: 4px;
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
  padding: 0;
  background-color: var(--background-color);
}

nav ul li {
  max-inline-size: none;
  padding: 0;
  margin: 0;
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
