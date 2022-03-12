import Vue from 'vue'
import VueRouter from 'vue-router'
import NavBar from '@/components/NavBar'
import Home from "@/components/Home";
import games from "@/components/Games";
import news from '@/components/News'
import NewsDetail from "@/components/NewsDetail";
import GamesDetail from "@/components/GamesDetail";
import Login from "@/components/Login";
import UserDetail from "@/components/UserDetail";
import GameFasterSub from "@/components/GameFasterSub";
import PlaDetail from "@/components/PlaDetail";
import RuleDetail from "@/components/RuleDetail";
import SearchRes from "@/components/SearchRes";
import Page404 from "@/components/Page404";
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
          {path: 'gamefaster/sub/:gameid',component: GameFasterSub,meta: {
                  title: "GameFaster - 游戏速通信息提交"
              }},
          {path: 'platform/:pid',component: PlaDetail,meta: {
                  title: "GameFaster - 平台详细信息"
              }},
          {path: 'game/:gamesid/rule/:rid',component: RuleDetail,meta: {
                  title: "GameFaster - 规则详情"
              }},
          {path: 'user/:uid',component: UserDetail,meta: {
                  title: "GameFaster - 用户空间"
              }},
          {path: 'search/:keyword',component: SearchRes,meta: {
                  title: "GameFaster - 搜索结果"
              }},
          {path: '/404',component: Page404,meta: {
                  title: "GameFaster - 无法找到页面"
              }}

    ] },
    {path: '/userLogin',component: Login,meta: {
            title: "GameFaster - 用户登录"
        }},

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
