<template>
  <div class="main-container">
    <Navbar />
    <AppMain />
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import AppMain from './AppMain.vue'

export default {
  name: 'Layout',
  components: { Navbar, AppMain }
}
</script>

<style scoped>
.main-container {
  min-height: 100%;
  position: relative;
}
</style>
