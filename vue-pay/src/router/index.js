import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
import Index from '../components/index/Index';
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import Manager from "../components/manager/Manager";
import ProInfo from "../components/manager/ProInfo";
import ProList from "../components/manager/ProList";

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
      component: Manager,
      children:[
        {
          path:'/proList',
          component:ProList
        },
        {
          path:'/proInfo',
          component: ProInfo
        }
      ]
    }
  ]
})
