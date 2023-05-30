<template>
  <div class="views-index-wrap">
    <div id="mapContainer"></div>
    <div class="fixed-panel">
      <el-popover placement="bottom">
        <el-button slot="reference">
          绘制
        </el-button>
        <div class="fixed-button-group">
          <el-button @click="handleDrawMarker">
            绘制点
          </el-button>
          <el-button @click="handleDrawPolyline">
            绘制线
          </el-button>
          <el-button @click="handleDrawPolygon">
            绘制面
          </el-button>
        </div>
      </el-popover>
      <el-button @click="handleEdit">编辑</el-button>
    </div>
  </div>
</template>

<script>
import {
  DrawScene,
  MarkerDraw,
  PolylineDraw,
  PolygonDraw,
  MarkerEdit,
  PolylineEdit,
  PolygonEdit,
  Select,
  CutCalculate,
  UnionCalculate,
  ActionStatus,
  PolylineMove,
  PolygonMove,
  GeoCalculator,
  DrawingType,
  OperateEventType
} from "bmap-draw";

export default {
  name: "Map",
  data() {
    return {
      markerDraw: null,
      polylineDraw: null,
      polygonDraw: null,
      editing: false,
      sceneSelectStatus: null,
      modelStatus: null,
      selectInstance: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const map = new BMapGL.Map("mapContainer"); // 创建Map实例
      map.centerAndZoom(new BMapGL.Point(121.3, 31.06), 15); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(); // 开启鼠标滚轮缩放
      map.disableDoubleClickZoom(); // 禁用双击放大

      // 初始化绘制场景类
      const scene = new DrawScene(map);
      const markerDraw = new MarkerDraw(scene, {
        isOpen: false,
        isSeries: true, // 连续绘制
        enableDragging: true,
        baseOpts: {}
      });
      markerDraw.addEventListener("COMPLETE", e => {
        console.log(e);
      });
      this.markerDraw = markerDraw;

      const polylineDraw = new PolylineDraw(scene, {
        isOpen: false,
        labelOptions: {
          borderRadius: "2px",
          background: "#b5d3fb",
          border: "1px solid #b5d3fb",
          color: "#333",
          fontSize: "12px",
          letterSpacing: "0",
          padding: "5px"
        },
        baseOpts: {
          strokeWeight: 4,
          strokeOpacity: 1,
          fillOpacity: 0.2
        }
      });
      this.polylineDraw = polylineDraw;

      const polygonDraw = new PolygonDraw(scene, {
        isOpen: false,
        labelOptions: {
          borderRadius: "2px",
          background: "#b5d3fb",
          border: "1px solid #b5d3fb",
          color: "#333",
          fontSize: "12px",
          letterSpacing: "0",
          padding: "5px"
        },
        baseOpts: {
          fillColor: "#fff",
          strokeWeight: 5,
          strokeOpacity: 1,
          fillOpacity: 0.2
        }
      });
      this.polygonDraw = polygonDraw;

      const sline = new PolylineEdit(scene);

      sline.addEventListener("operate-change", e => {
        console.log("operate-change", e.target);
      });
      sline.addEventListener("operate-ok", e => {
        console.log("operate-ok", e.target);
      });
      sline.addEventListener("operate-cancel", e => {
        console.log("operate-cancel", e.target);
      });
    },
    handleDrawMarker() {
      this.markerDraw.open();
    },
    handleDrawPolyline() {
      this.polylineDraw.open();
    },
    handleDrawPolygon() {
      this.polygonDraw.open();
    },
    handleEdit() {
      this.editing = true;
      this.markerDraw.close();
      this.polylineDraw.close();
      this.polygonDraw.close();
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

.fixed-panel {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
}
</style>
