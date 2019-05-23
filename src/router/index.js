import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

router.beforeEach((to, from, next) => {
  let { title } = to.params
  if (!title || !title.match(/file:/i)) {
    next()
  } else {
    router.go(-1)
  }
})

export default router
