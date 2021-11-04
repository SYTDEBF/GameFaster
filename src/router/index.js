import Vue from 'vue'
import VueRouter from 'vue-router'
import NavBar from '@/components/NavBar'
import Home from "@/components/Home";
import games from "@/components/Games";
import community from "@/components/Community";
import news from '@/components/News'
import NewsDetail from "@/components/NewsDetail";
import GamesDetail from "@/components/GamesDetail";
import Editer from "@/components/Editer";
import Login from "@/components/Login";
import Register from "@/components/Register";
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
          {path: "community", component: community,meta: {
                  title: "GameFaster - 社区"
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
          {path: 'edc',component: Editer,meta: {
                  title: "GameFaster - 新闻编辑"
              }}
    ] },
    {path: '/login',component: Login,meta: {
            title: "GameFaster - 登录"
        }},
    {path: '/register',component: Register,meta: {
            title: "GameFaster - 注册"
        }}
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.title) {//判断是否有标题
        document.title = to.meta.title
    }
    next()//执行进入路由，如果不写就不会进入目标页
})
export default router
