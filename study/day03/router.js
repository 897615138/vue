//路由表
import Index from "../../vue-pay/src/views/index/Index";
import Register from "../../vue-pay/src/views/register/Register";
import Login from "../../vue-pay/src/views/login/Login";
import Manager from "../../vue-pay/src/views/manager/Manager";
import ProList from "../../vue-pay/src/views/manager/ProList";
import ProInfo from "../../vue-pay/src/views/manager/ProInfo";

export const routes = [
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
