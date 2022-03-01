// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import * as Echarts from 'echarts';

// 使用Echarts，写进原型，全局应用
Vue.prototype.$echarts = Echarts;
// 挂载api
import api from './api/index.js'
Vue.prototype.$api = api;
import store from './store'
import './router/permission'
import './utils/localStorage'

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
