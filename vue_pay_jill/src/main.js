import store from './store'
import Vue from 'vue';
import App from './App.vue';
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
Vue.config.productionTip = false
Vue.use(VueAxios,axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
