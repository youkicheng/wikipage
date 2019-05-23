import Home from '_v/home/Home'
import Explore from '_v/home/components/Explore'

export default [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        alias: 'explore',
        name: 'explore',
        component: Explore
      },
      {
        path: 'hotTopic',
        name: 'hotTopic',
        component: () => import('_v/home/components/HotTopic')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('_v/Search.vue')
  },
  {
    path: '/collection',
    name: 'collection',
    component: () => import('@/views/collection/Collection.vue')
  },
  {
    path: '/wiki/:title',
    name: 'wiki',
    props: true,
    component: () => import('@/views/Wiki.vue')
  },
  {
    path: '*',
    redirect: '/home'
  }
]
