//路由表
import Index from "./components/Index";
import Register from "./components/Register";
import Login from "./components/Login";

export const routes = [
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
  }
]
