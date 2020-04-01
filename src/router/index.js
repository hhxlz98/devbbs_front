import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Register from '@/pages/Register.vue'
import AllPate from '@/pages/AllPlate.vue'
import PagaeNotFound from '@/pages/404NotFound.vue'
import MyPlate from '@/pages/MyPlate.vue'

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
      path:"/allPlate",
      name:"allPlate",
      component: AllPate,
    },
    {
      path:"/myPlate",
      name:"myPlate",
      component: MyPlate,
    },
    {
      path: "*",
      name: "pageNotFound",
      component: PagaeNotFound,
    }
  ]
})
