import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Register from '@/pages/Register.vue'
import AllPate from '@/pages/AllPlate.vue'
import PagaeNotFound from '@/pages/404NotFound.vue'
import MyPlate from '@/pages/MyPlate.vue'
import PlateContent from '@/pages/PlateContent.vue'
import PostHome from '@/pages/PostHome.vue'
import PublishPost from '@/pages/PublishPost.vue'
import UserInfo from '@/pages/UserInfo.vue'

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
      path:"/plate/:plateId&plateName=:plateName",
      name:"plateContent",
      component: PlateContent,

    },
    {
      path:"/:postId&author=:name",
      name:"postContent",
      component: PostHome,
    },
    {
      path:"/publishPostFor:type",
      name:"publishPost",
      component: PublishPost,
    },
    {
      path:"/:userId&userName=:userName",
      name:"userInfo",
      component: UserInfo,
    },
    {
      path: "*",
      name: "pageNotFound",
      component: PagaeNotFound,
    }
  ]
})
