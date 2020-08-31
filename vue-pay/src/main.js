// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Header from "./components/Header";
import Content from "./components/Content";
import Bottom from "./components/Bottom";

Vue.config.productionTip = false

Vue.component("MyHeader",Header)
Vue.component("MyBottom",Bottom)
Vue.component("MyContent",Content)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
