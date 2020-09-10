import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
import Index from '../views/index/Index';
import Register from "../views/register/Register";
import Login from "../views/login/Login";
import Manager from "../views/manager/Manager";
import ProInfo from "../views/manager/ProInfo";
import ProList from "../views/manager/ProList";


Vue.use(Router)
Vue.use(VueRouter)

export default new Router({
  mode: 'history',
  // base:process.env.VUE_APP_API_BASE_URL,
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
      children: [
        {
          path: '/proList',
          component: ProList
        },
        {
          path: '/proInfo/:id',
          name: 'proInfo',
          component: ProInfo
        },
        {
          path: '/proInfo',
          redirect: '/proInfo/0'
        }
      ]
    },
    {
      path: '/logout',
      redirect: '/login'
    }
  ]
})
