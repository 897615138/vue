import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
import Index from "../components/Index";
import Register from "../components/Register";
import Login from "../components/Login";
import Manager from "../components/Manager";

export let routes;


Vue.use(Router)
Vue.use(VueRouter)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/manager',
      component: Manager
    }
  ]
})
