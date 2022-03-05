import Vue from 'vue'
import VueRouter from 'vue-router'
import NavBar from '@/components/NavBar'
import Home from "@/components/Home";
import games from "@/components/Games";
import news from '@/components/News'
import NewsDetail from "@/components/NewsDetail";
import GamesDetail from "@/components/GamesDetail";
import Register from "@/components/Register";

import Login from "@/components/Login";
import UserDetail from "@/components/UserDetail";
Vue.use(VueRouter)

const routes = [
  { path: '/', component: NavBar,
      children: [
          {path: "/", component: Home,meta: {
                  title: "GameFaster - 首页"
              }},
          {path: "games", component: games,meta: {
                  title: "GameFaster - 游戏"
              }},
          {path: "news", component: news,children:[],meta: {
                  title: "GameFaster - 新闻"
              }},
          {path:'news/:nid',component: NewsDetail,meta: {
                  title: "GameFaster - 新闻详情"
              }},
          {path: 'games/:gid',component: GamesDetail,meta: {
                  title: "GameFaster - 游戏详情"
              }},
          {path: 'user/:uid',component: UserDetail,meta: {
                  title: "GameFaster - 用户空间"
              }}
    ] },
    {path: '/register',component: Register,meta: {
            title: "GameFaster - 注册"
        }},
    {path: '/userLogin',component: Login,meta: {
            title: "GameFaster - 用户登录"
        }}
]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.title) {//判断是否有标题
        document.title = to.meta.title
    }
    next()//执行进入路由，如果不写就不会进入目标页
})
router.beforeEach((to, from, next) => {
    //const str = window.sessionStorage.getItem('token')
    //if (!str) return next('/login')
    next()
})
export default router
