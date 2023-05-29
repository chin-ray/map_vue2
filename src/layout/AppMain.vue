<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <div class="app-main-scroll">
          <component :is="Component" :key="key" />
        </div>
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  data: () => {
    return {}
  }
}
</script>

<style scoped>
.app-main {
  height: calc(100vh - 50px) !important; /* 50 = navbar */
  position: relative;
  overflow: hidden;
}
</style>
