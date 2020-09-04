/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const nestedRouter1 = {
  path: '/manage',
  component: Layout,
  redirect: '/manage/proList',
  name: 'Manage',
  meta: {
    title: '商品管理',
    icon: 'list'
  },
  children: [
    {
      path: 'proList',
      component: () => import('@/views/manager/ProList'), // Parent router-view
      name: 'proList',
      meta: { title: '商品列表',icon:'list' },
    },
    {
      path: 'proInfo',
      name: 'proInfo',
      component: () => import('@/views/manager/ProInfo'),
      meta: { title: '商品信息' ,icon:'education'}
    }
  ]
}
export default nestedRouter1
