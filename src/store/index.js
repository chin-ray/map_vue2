import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 数据存储
const state = {
  drawType: "", // 绘制类型
  editing: false, // 正在编辑
  deleting: false, // 正在删除
  curOverlay: null // 当前选中图形
};
// 响应事件 - 修改数据需通知 mutation 进行更新
const actions = {
  A_checkType(state, val) {
    state.commit("M_checkType", val);
  },
  A_changeEdit(state, val) {
    state.commit("M_changeEdit", val);
  },
  A_changeDelete(state, val) {
    state.commit("M_changeDelete", val);
  },
  A_setOverlay(state, val) {
    state.commit("M_setOverlay", val);
  },
  A_removeOverlay(state, val) {
    state.commit("M_removeOverlay", val);
  },
};
// 数据操作
const mutations = {
  M_checkType(state, val) {
    state.drawType = val;
  },
  M_changeEdit(state, val) {
    state.editing = val;
  },
  M_changeDelete(state, val) {
    state.deleting = val;
  },
  M_setOverlay(state, val) {
    state.curOverlay = val;
  },
  M_removeOverlay(state) {
    state.deleting = true
    this._vm.$message({ type: 'success', message: '删除成功!' });
  }
};
// 数据加工/缓存
const getters = {};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});
