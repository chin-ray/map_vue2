<template>
  <div class="navbar">
    <div class="heardCenterTitle">百度地图API调用</div>
    <FixedMenu />
  </div>
</template>

<script>
import FixedMenu from './FixedMenu.vue'

export default {
  name: 'NavBar',
  components: { FixedMenu },
  data: () => {
    return {}
  }
}
</script>

<style scoped>
.navbar {
  height: 50px;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.heardCenterTitle {
  height: 50px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
