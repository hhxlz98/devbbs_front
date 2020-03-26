import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Register from '@/pages/Register.vue'
import PagaeNotFound from '@/pages/404NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path:"/register",
      name: "register",
      component: Register,
    },
    {
      path: "*",
      name: "pageNotFound",
      component: PagaeNotFound
    }
  ]
})
