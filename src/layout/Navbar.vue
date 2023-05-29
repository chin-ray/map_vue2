<template>
  <div class="navbar">
    <div class="heardCenterTitle">百度地图API调用</div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data: () => {
    return {}
  }
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.heardCenterTitle {
  height: 50px;
  padding: 0 20px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
