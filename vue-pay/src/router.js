//路由表
import Index from "./components/index/Index";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Manager from "./components/manager/Manager";
import ProList from "./components/manager/ProList";
import ProInfo from "./components/manager/ProInfo";
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
    children:[
      {
        path:'/proList',
        component:ProList
      },
      {
        path:'/proInfo/:id',
        name:'proInfo',
        component: ProInfo
      },
      {
        path:'/proInfo',
        redirect:'/proInfo/0'
      }
    ]
  },
  {
    path:'/logout',
    redirect:'/login'
  }

]
