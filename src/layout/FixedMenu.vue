<template>
  <div :class="fixed ? 'views-fixed-menu-wrap' : 'views-normal-menu-wrap'">
    <el-popover v-model="visible" placement="bottom" trigger="manual">
      <el-button v-show="!editing" slot="reference" @click="visible = !visible">
        {{ drawTypeOptions[drawType] ? `正在绘制: ${drawTypeOptions[drawType]}` : "绘制" }}
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
    <el-button v-if="drawType" type="primary" @click="handleCheck('')">结束绘制</el-button>
    <el-button v-if="!drawType && curOverlay" type="danger" @click="handleDelete">删除</el-button>
    <el-button v-if="!drawType && !editing" @click="handleEdit">编辑</el-button>
    <el-button v-if="!drawType && editing" type="primary" @click="handleSave">保存</el-button>
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
  computed: {
    editing() { return this.$store.state.editing },
    curOverlay() { return this.$store.state.curOverlay }
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
    },
    handleEdit() {
      this.drawType = ''
      this.$store.dispatch('A_changeEdit', true)
      this.visible = false;
    },
    handleSave() {
      this.$store.dispatch('A_changeEdit', false)
      this.visible = false;
    },
    handleDelete() {
      this.$confirm('删除后将无法找回，确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false,
      }).then(() => {
        this.$store.dispatch('A_removeOverlay')
      })
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
