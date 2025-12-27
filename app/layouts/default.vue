<template>
  <div class="page">
    <AppHeader class="w-page" />
    <slot class="page-content" />
    <!-- <AppFooter class="foot" /> -->
  </div>
</template>
<style lang="css" scoped>
.page {
  display: flex;
  flex-direction: column;
  /* background-color: red; */

  align-items: stretch;
  justify-items: stretch;
  position: absolute;
  inset: 0;
}

.page-content {
  flex: 1;
  background-color: aqua;
}

.foot {
  justify-self: end;
}
</style>
