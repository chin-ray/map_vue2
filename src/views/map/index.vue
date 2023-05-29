<template>
  <div class="views-index-wrap">
    <div id="mapContainer"></div>
    <FixedMenu class="fixed-menu" />
  </div>
</template>

<script>
import FixedMenu from "./FixedMenu.vue";

export default {
  name: "Home",
  components: { FixedMenu },
  data() {
    return {
      points: [] // 绘制直线两点
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const _that = this;
      const map = new BMap.Map("mapContainer"); // 创建Map实例
      const point = new BMap.Point(121.3, 31.06); // 创建点坐标
      map.centerAndZoom(point, 15); // 初始化地图，设置中心店坐标和地图级别
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

      map.addEventListener("click", function(e) {
        const drawType = _that.$store.state.drawType;
        const drawAction = {
          dot: _that.drawPoint,
          line: _that.drawPolyline,
          panel: _that.drawPolygon
        };
        drawAction[drawType](e, map);
      });
    },
    // 绘制点
    drawPoint(e, map) {
      const newPoint = new BMap.Point(e.point.lng, e.point.lat);
      const newPointMarker = new BMap.Marker(newPoint);
      map.addOverlay(newPointMarker);
      newPointMarker.addEventListener("click", function(e) {
        console.log(e);
      });
    },
    // 绘制线
    drawPolyline(e, map) {
      const _that = this;
      _that.points.push([e.point.lng, e.point.lat]);

      const newPoint = new BMap.Point(e.point.lng, e.point.lat);
      const newPointMarker = new BMap.Marker(newPoint);
      map.addOverlay(newPointMarker);

      if (_that.points.length === 2) {
        const newPolyline = new BMap.Polyline(
          _that.points.map(xx => new BMap.Point(xx[0], xx[1])),
          {
            strokeColor: "blue",
            strokeWeight: 2,
            strokeOpacity: 0.5
          }
        );
        map.addOverlay(newPolyline);
        _that.points = [];
      }
    },
    // 绘制面
    drawPolygon(e, map) {
      const _that = this;
      // 获取点击的点的坐标
      const point = e.point;
      // 将坐标添加到数组中
      _that.points.push(point);

      const newPoint = new BMap.Point(e.point.lng, e.point.lat);
      const newPointMarker = new BMap.Marker(newPoint);
      map.addOverlay(newPointMarker);

      // if (_that.points.length >= 3) {
      //   // 创建面图层
      //   const polygon = new BMap.Polygon(_that.points, {
      //     strokeColor: "blue",
      //     strokeWeight: 6,
      //     strokeOpacity: 0.5,
      //     fillColor: "blue",
      //     fillOpacity: 0.3
      //   });
      //   // 添加面图层到地图上
      //   map.addOverlay(polygon);
      //   _that.points = [];
      // }
    },
    // 打开编辑模式
    openEdit() {
      polyline.enableEditing();
      polygon.enableEditing();
      circle.enableEditing();
    },
    // 取消编辑模式
    closeEdit() {
      polygon.disableEditing();
      polyline.disableEditing();
      circle.disableEditing();
    }
  }
};
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
#mapContainer >>> .anchorBL {
  display: none !important;
}
</style>
