<template>
  <div class="views-index-wrap">
    <div id="mapContainer"></div>
    首页
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      const map = new BMapGL.Map('mapContainer') // 创建Map实例
      const point = new BMapGL.Point(121.3, 31.06) // 创建点坐标
      map.centerAndZoom(point, 15) // 初始化地图，设置中心店坐标和地图级别
      const marker = new BMapGL.Marker(point) // 标记
      map.addOverlay(marker)
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    }
  }
}
</script>

<style scoped>
.views-index-wrap {
  width: 100%;
  height: 100%;
}
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
