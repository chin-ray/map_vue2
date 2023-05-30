<template>
  <div :class="fixed ? 'views-fixed-menu-wrap' : 'views-normal-menu-wrap'">
    <el-popover v-model="visible" placement="bottom-end" trigger="manual">
      <el-button slot="reference" :type="drawType ? 'primary' : ''" @click="visible = !visible">
        {{ drawTypeOptions[drawType] || "绘制" }}
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
    <el-button>编辑</el-button>
  </div>
</template>

<script>
export default {
  name: "FixedMenu",
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      drawType: "", // 绘制类型
      drawTypeOptions: {
        dot: '点',
        line: '线',
        panel: '面',
      },
    };
  },
  watch: {
    'drawType': {
      handler(val) {
        this.$store.dispatch("A_checkType", val);
      }
    }
  },
  methods: {
    // 绘制类型选中事件
    handleCheck(type) {
      let relType = type
      if(this.drawType === type) {
        relType = ''
      }
      this.drawType = relType;
      this.visible = false;
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
