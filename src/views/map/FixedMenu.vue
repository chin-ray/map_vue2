<template>
  <div class="views-fixed-menu-wrap">
    <el-popover v-model="visible" placement="top-start" trigger="manual">
      <el-button slot="reference" @click="showPanel">
        {{ drawType ? "结束绘制" : "绘制" }}
      </el-button>
      <div class="fixed-button-group">
        <el-button
          :type="drawType === 'dot' ? 'primary' : ''"
          @click="handleCheck('dot')"
        >
          点
        </el-button>
        <el-button
          :type="drawType === 'line' ? 'primary' : ''"
          @click="handleCheck('line')"
        >
          线
        </el-button>
        <el-button
          :type="drawType === 'panel' ? 'primary' : ''"
          @click="handleCheck('panel')"
        >
          面
        </el-button>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "FixedMenu",
  data() {
    return {
      drawType: "",
      visible: false
    };
  },
  watch: {
    drawType: {
      handler(val) {
        this.handleCheck(val);
      },
      immediate: true
    }
  },
  methods: {
    showPanel() {
      this.visible = !this.visible;
      this.handleCheck("");
    },
    // 绘制类型选中事件
    handleCheck(type) {
      this.drawType = type;
      this.$store.dispatch("A_checkType", type);
    }
  }
};
</script>

<style scoped>
.views-fixed-menu-wrap {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
}
.el-button + .el-button {
  margin-left: 2px;
}
</style>
