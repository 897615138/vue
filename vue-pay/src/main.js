// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router'
import Header from "./components/Header";
import Content from "./components/Content";
import Bottom from "./components/Bottom";
import ElementUI from 'element-ui';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

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
