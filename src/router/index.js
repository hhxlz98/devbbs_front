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
import MyMessage from '@/pages/MyMessage.vue'
import Task from '@/pages/Task.vue'
import SearchPost from '@/pages/SearchPost.vue'
import Transition from '@/pages/Transition.vue'

import BackLogin from '@/pages/BackLogin.vue'
import BackMainLayout from '../components/backManange/MainLayout.vue'
import BackTopBar from '../components/backManange/TopBar.vue'
import BackLeftNav from '../components/backManange/LeftNav.vue'
import BackContent from '../components/backManange/Content.vue'
import BackPlateList from '../components/backManange/plate/PlateList.vue'
import BackAdminManage from '../components/backManange/plate/AdminManage.vue'
import BackAddPlate from '../components/backManange/plate/AddPlate.vue'
import BackQueryUser from '../components/backManange/user/QueryUser.vue'
import BackUserProhibit from '../components/backManange/user/UserProhibit.vue'
import BackUserReportList from '../components/backManange/user/UserReportList.vue'
import BackNewsManage from '../components/backManange/home/NewsManage.vue'

import Test from '@/pages/Test.vue'

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
      path:"/plate/all",
      name:"allPlate",
      component: AllPate,
    },
    {
      path:"/plate/my",
      name:"myPlate",
      component: MyPlate,
    },
    {
      path:"/plate/:plateId&plateName=:plateName",
      name:"plateContent",
      component: PlateContent,

    },
    {
      path:"/post/:postId&name=:name",
      name:"postContent",
      component: PostHome,
    },
    {
      path:"/publish:type&PlateId:plateId",
      name:"publishPost",
      component: PublishPost,
    },
    {
      path:"/serachkey=:key&type=:type",
      name:"searchPost",
      component: SearchPost,
    },
    {
      path:"/userInfo/:userId&userName=:userName",
      name:"userInfo",
      component: UserInfo,
    },
    {
      path:"/myMessage/:userId&userName=:userName",
      name:"myMessage",
      component: MyMessage,
    },
    {
      path:"/transition",
      name:"transition",
      component: Transition,
    },
    {
      path:"/forumTask/:userId&userName=:userName",
      name:"forumTask",
      component: Task,
    },
    {
      path:"/backLogin",
      name: "backLogin",
      component: BackLogin,
    },
    {
      path:"/backManage",
      name:"backManage",
      component: BackMainLayout,
      menuShow: true,
      redirect: '/backManage/plate/list',
      children: [
        {
        path: '/backManage/plate',
        name: '板块管理',
        icon: 'fa fa-th-large',
        menuShow: true,
        components: {
          top: BackTopBar,
          aside: BackLeftNav,
          default: BackContent,
        },
        children: [
          {path: '/backManage/plate/list', name: '板块列表', component: BackPlateList, menuShow: true },
          {path: '/backManage/plate/add', name: '添加板块', component: BackAddPlate, menuShow:true },
          {path: '/backManage/plate/adminManage', name: '版主管理', component: BackAdminManage, menuShow: true }
        ]
      },
      {
        path: '/backManage/user',
        name: '用户管理',
        icon: 'fa fa-user-circle',
        menuShow: true,
        components: {
          top: BackTopBar,
          aside: BackLeftNav,
          default: BackContent,
        },
        children: [
          {path: '/backManage/user/query', name: '用户查询', component: BackQueryUser, menuShow: true},
          {path: '/backManage/user/prohibit', name: '用户封禁', component: BackUserProhibit, menuShow: true},
          {path: '/backManage/user/report', name: '用户举报', component: BackUserReportList, menuShow: true}
        ]
      },
      {
        path: '/backManage/home',
        name: '首页管理',
        icon: 'fa fa-newspaper-o',
        menuShow: true,
        components: {
          top: BackTopBar,
          aside: BackLeftNav,
          default: BackContent,
        },
        children: [
          {path: '/backManage/home/news', name: '广告管理', component: BackNewsManage, menuShow: true},
        ]
      },
      ]


    },
    {
      path:"/test",
      name:"test",
      component: Test,
    },
    {
      path: "*",
      name: "pageNotFound",
      component: PagaeNotFound,
    }
  ]
})
