<template>
  <div class="views-index-wrap">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      map: null, // 地图实例
      points: [], // 绘制直线两点
      drawingManager: null // 绘制图形实例
    };
  },
  mounted() {
    this.initMap();
  },
  watch: {
    "$store.state.drawType": {
      handler(val) {
        if (val && val !== "dot") {
          this.startDraw(this.drawingManager, val);
        } else {
          this.drawingManager.close();
        }
      }
    },
    "$store.state.editing": {
      handler(val) {
        if (!val && this.$store.state.curOverlay) {
          this.closeEdit(this.$store.state.curOverlay);
        }
      }
    },
    "$store.state.deleting": {
      handler(val) {
        if (val && this.$store.state.curOverlay) {
          this.removeOverlay(this.$store.state.curOverlay, this.map);
        }
      }
    }
  },
  methods: {
    // 初始化地图
    initMap() {
      const _that = this;
      const map = new BMap.Map("mapContainer"); // 创建Map实例
      map.centerAndZoom(new BMap.Point(121.3, 31.06), 15); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(); // 开启鼠标滚轮缩放
      map.disableDoubleClickZoom(); // 禁用双击放大

      this.map = map;

      const drawingManager = _that.initDrawingManager(map);
      _that.drawingManager = drawingManager;

      map.addEventListener("click", e => {
        if (_that.$store.state.drawType === "dot") {
          const newPoint = new BMap.Point(e.point.lng, e.point.lat);
          const newPointMarker = new BMap.Marker(newPoint);
          map.addOverlay(newPointMarker);

          newPointMarker.addEventListener("mousedown", e => {
            if (_that.$store.state.editing) {
              this.$store.dispatch("A_setOverlay", newPointMarker);
              newPointMarker.enableDragging();
            } else {
              newPointMarker.disableDragging();
            }
          });
        }
      });
    },
    // 初始化绘制工具
    initDrawingManager(map) {
      const _that = this;
      const drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, // 是否开启绘制模式
        enableDrawingTool: false, // 是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, // 工具栏位置
          offset: new BMap.Size(5, 5), // 工具栏偏移量
          drawingModes: [BMAP_DRAWING_POLYLINE, BMAP_DRAWING_POLYGON] // 绘制模式
        },
        markerOptions: {
          enableDragging: false,
          draggingCursor: "move"
        },
        polylineOptions: {
          strokeColor: "blue",
          strokeWeight: 10,
          strokeOpacity: 0.4
        },
        polygonOptions: {
          strokeColor: "blue",
          strokeWeight: 10,
          strokeOpacity: 0.4
        }
      });

      // 完成点绘制回调函数
      // drawingManager.addEventListener("markercomplete", marker => {
      //   marker.setTop();
      //   _that.addMarkerListener(marker);
      // });
      // 完成线绘制回调函数
      drawingManager.addEventListener("polylinecomplete", polyline => {
        _that.addPolylineListener(polyline);
      });
      // 完成面绘制回调函数
      drawingManager.addEventListener("polygoncomplete", polygon => {
        _that.addPolygonListener(polygon);
      });
      return drawingManager;
    },
    // 添加点图层点击事件
    // addMarkerListener(marker) {
    //   marker.addEventListener("mousedown", () => {
    //     console.log("click");
    //   });
    // },
    // 添加线图层点击编辑事件
    addPolylineListener(polyline) {
      polyline.addEventListener("click", e => {
        if (this.$store.state.editing && !this.$store.state.curOverlay) {
          this.openEdit(e.target);
        }
      });
      polyline.addEventListener("lineupdate", e => {
        this.$store.dispatch("A_setOverlay", e.target);
      });
    },
    // 添加面图层点击编辑事件
    addPolygonListener(polygon) {
      polygon.addEventListener("click", e => {
        if (this.$store.state.editing && !this.$store.state.curOverlay) {
          this.openEdit(e.target);
        }
      });
      polygon.addEventListener("lineupdate", e => {
        this.$store.dispatch("A_setOverlay", e.target);
      });
    },
    // 打开编辑模式
    openEdit(overlay) {
      overlay.enableEditing();
      this.$store.dispatch("A_setOverlay", overlay);
    },
    // 取消编辑模式
    closeEdit(overlay) {
      overlay.disableEditing();
      this.$store.dispatch("A_setOverlay", null);
    },
    // 删除
    removeOverlay(overlay, map) {
      map.removeOverlay(overlay);
      this.$store.dispatch("A_confirmRemove");
    },
    // 开始绘制模式
    startDraw(drawingManager, type) {
      const drawAction = {
        line: BMAP_DRAWING_POLYLINE,
        panel: BMAP_DRAWING_POLYGON
      };
      drawingManager.setDrawingMode(drawAction[type]);
      drawingManager.open();
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
