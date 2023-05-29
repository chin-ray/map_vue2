// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueBMap from 'vue-bmap-gl'
import 'vue-bmap-gl/dist/style.css'

Vue.use(VueBMap)
VueBMap.initBMapApiLoader({
  ak: '',
  v: '1.0'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
