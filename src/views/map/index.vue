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
      points: [], // 绘制直线两点
      drawingManager: null, // 绘制图形实例
      overlays: [] // 图形实例列表
    };
  },
  mounted() {
    this.initMap();
  },
  watch: {
    '$store.state.drawType': {
      handler(val) {
        const drawAction = {
          dot: BMAP_DRAWING_MARKER,
          line: BMAP_DRAWING_POLYLINE,
          panel: BMAP_DRAWING_POLYGON
        };
        this.drawingManager.setDrawingMode(drawAction[val])
        this.drawingManager.open()
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

      map.addEventListener('addoverlay', (e) => {
        console.log(e)
      })

      const drawingManager = _that.initDrawingManager(map)
      _that.drawingManager = drawingManager
    },
    // 初始化绘制工具
    initDrawingManager(map) {
      const _that = this
      const drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, // 是否开启绘制模式
        enableDrawingTool: false, // 是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, // 工具栏位置
          offset: new BMap.Size(5, 5), // 工具栏偏移量
        },
        drawingModes: [BMAP_DRAWING_MARKER, BMAP_DRAWING_POLYLINE, BMAP_DRAWING_POLYGON], // 绘制模式
        markerOptions: {
          enableDragging: true,
          draggingCursor: 'move'
        },
        polylineOptions: {
          strokeColor: "blue",
          strokeOpacity: 0.4
        },
        polygonOptions: {
          strokeColor: "blue",
          strokeOpacity: 0.4
        },
      });
      
      // 图形绘制完成回调函数
      drawingManager.addEventListener('overlaycomplete', (e) => {
        const overlay = e.overlay
        overlay.tag_id = overlay.ba
        this.overlays.push(overlay)
      });
      // 点绘制完成回调函数
      drawingManager.addEventListener('markercomplete', function(marker) {
        marker.setTitle(marker.ba)
        _that.addMarkerListener(map, marker)
      });
      // 线绘制完成回调函数
      drawingManager.addEventListener('polylinecomplete', function(polyline) {
        _that.addPolylineListener(map, polyline)
      });
      // 面绘制完成回调函数
      drawingManager.addEventListener('polygoncomplete', function(polygon) {
        _that.addPolygonListener(map, polygon)
      });
      return drawingManager;
    },
    // 添加点图层点击事件
    addMarkerListener(map, marker) {
      marker.addEventListener('click', () => {
        console.log('click')
        // 弹出操作框
        // var infoWindow = new BMap.InfoWindow('yourContent', {
        //   enableMessage: false
        // });
        // map.openInfoWindow(infoWindow, marker.getPosition());
      });
    },
    // 添加线图层点击事件
    addPolylineListener(map, polyline) {
      polyline.addEventListener('click', function() {
        polyline.enableEditing() // 开启编辑
      });
      polyline.addEventListener('mouseover', function() {
        polyline.setStrokeOpacity(0.8)
      });
      polyline.addEventListener('mouseout', function() {
        polyline.setStrokeOpacity(0.4)
      });
    },
    // 添加面图层点击事件
    addPolygonListener(map, polygon) {
      polygon.addEventListener('click', function() {
        console.log('click')
      });
      polygon.addEventListener('mouseover', function() {
        polygon.setStrokeOpacity(0.8)
      });
      polygon.addEventListener('mouseout', function() {
        polygon.setStrokeOpacity(0.4)
      });
    },
    // 打开编辑模式
    openEdit() {
      polyline.enableEditing();
      polygon.enableEditing();
    },
    // 取消编辑模式
    closeEdit() {
      polygon.disableEditing();
      polyline.disableEditing();
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
