/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const nestedRouter2 = {
  path: '/manage',
  component: Layout,
  redirect: '/manage/userList',
  name: 'Manage',
  meta: {
    title: '用户管理',
    icon: 'list'
  },
  children: [
    {
      path: 'userList',
      component: () => import('@/views/manager/UserList'), // Parent router-view
      name: 'userList',
      meta: { title: '用户列表',icon:'list' },
    },
    {
      path: 'userInfo',
      name: 'userInfo',
      component: () => import('@/views/manager/UserInfo'),
      meta: { title: '用户信息' ,icon:'education'}
    }
  ]
}

export default nestedRouter2
