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
      // redirect: '/nested/menu1/menu1-1',
      // children: [
      //   {
      //     path: 'menu1-1',
      //     component: () => import('@/views/nested/menu1/menu1-1'),
      //     name: 'Menu1-1',
      //     meta: { title: 'Menu 1-1' }
      //   },
      //   {
      //     path: 'menu1-2',
      //     component: () => import('@/views/nested/menu1/menu1-2'),
      //     name: 'Menu1-2',
      //     redirect: '/nested/menu1/menu1-2/menu1-2-1',
      //     meta: { title: 'Menu 1-2' },
      //     children: [
      //       {
      //         path: 'menu1-2-1',
      //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
      //         name: 'Menu1-2-1',
      //         meta: { title: 'Menu 1-2-1' }
      //       },
      //       {
      //         path: 'menu1-2-2',
      //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
      //         name: 'Menu1-2-2',
      //         meta: { title: 'Menu 1-2-2' }
      //       }
      //     ]
      //   },
      //   {
      //     path: 'menu1-3',
      //     component: () => import('@/views/nested/menu1/menu1-3'),
      //     name: 'Menu1-3',
      //     meta: { title: 'Menu 1-3' }
      //   }
      // ]
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
