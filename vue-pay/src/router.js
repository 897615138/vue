//路由表
import Index from "./components/Index";
import Register from "./components/Register";
import Login from "./components/Login";
import Manager from "./components/Manager";
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
    component: Manager
  }

]
