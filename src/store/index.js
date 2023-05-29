import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 数据存储
const state = {
  drawType: "" // 地图实例
};
// 响应事件 - 修改数据需通知 mutation 进行更新
const actions = {
  A_checkType(state, val) {
    state.commit("M_checkType", val);
  }
};
// 数据操作
const mutations = {
  M_checkType(state, val) {
    state.drawType = val;
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
