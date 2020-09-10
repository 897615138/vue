// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
//组件引入
import Header from "./components/all/Header";
import Content from "./components/all/Content";
import Bottom from "./components/all/Bottom";

import ElementUI from 'element-ui';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";//引入路由模块
import Router from "vue-router";
import router from "./router/index";

Vue.use(ElementUI);
Vue.use(Router)
Vue.use(VueRouter)


new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

Vue.config.productionTip = false

Vue.component("MyHeader",Header)
Vue.component("MyBottom",Bottom)
Vue.component("MyContent",Content)

Vue.use(VueAxios,axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


