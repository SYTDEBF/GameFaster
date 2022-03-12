<template>
<div>
  <el-row>
    <el-col :span="3" style="min-height: 36px"></el-col>
    <el-col :span="18">
      <el-card style="min-height: 500px">
        <h4><span style="color: #409EFF"> "{{ this.$route.params.keyword }}"</span> 的搜索结果</h4>
        <div style="margin-top: 15px">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane  name="games">
              <span slot="label">游戏 <span v-if="searchObj.type==='games'">({{searchRe.gamesList.total}})</span></span>
              <div v-if="searchRe.gamesList.list.length===0">
                <h4 style="text-align: center;margin-top: 10px">暂无搜索结果</h4>
              </div>
              <div class="game_list_box" v-else-if="searchRe.gamesList.list.length!==0">
                <div class="game_box" v-for="game in searchRe.gamesList.list" :key="game.gameId">

                  <img :src="game.cover"  alt="sd"/>
                  <div class="game_info">
                    <span class="game_name" @click="goGameDe(game.gameId)">{{ game.name }}</span>
                    <span class="game_name_en">{{ game.nameEn }}</span>
                  </div>
                </div>
              </div>
              <el-pagination
                  background
                  v-show="searchRe.gamesList.list.length!==0"
                  style="margin-top: 15px"
                  @current-change="handleCurrentChange2"
                  :page-size="searchObj.pageSize"
                  :current-page="searchObj.pageNum"
                  layout="total,prev, pager, next, jumper"
                  :total="searchRe.gamesList.total">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane  name="user">
              <span slot="label">用户 <span v-if="searchObj.type==='user'">({{searchRe.userList.total}})</span></span>
              <div v-if="searchRe.userList.list.length===0">
                <h4 style="text-align: center;margin-top: 10px">暂无搜索结果</h4>
              </div>
              <div class="game_list_box" v-else-if="searchRe.userList.list.length!==0">
                <div class="user_box" v-for="user in searchRe.userList.list" :key="user.userId">
                  <img :src="user.cover"  alt="sd"/>
                  <div class="user_info">
                    <span class="user_name" @click="goUserDe(user.userId)">{{ user.username }}</span>
                    <span class="user_account">{{ user.account }}</span>
                  </div>
                </div>
              </div>
              <el-pagination
                  background
                  v-show="searchRe.userList.list.length!==0"
                  style="margin-top: 15px"
                  @current-change="handleCurrentChange"
                  :current-page="searchObj.pageNum"
                  :page-size="searchObj.pageSize"
                  layout="total,prev, pager, next, jumper"
                  :total="searchRe.userList.total">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane  name="news">
              <span slot="label">新闻 <span v-if="searchObj.type==='news'">({{searchRe.newsList.total}})</span></span>
              <div v-if="searchRe.newsList.list.length===0">
                <h4 style="text-align: center;margin-top: 10px">暂无搜索结果</h4>
              </div>
              <div class="game_list_box" v-else-if="searchRe.newsList.list.length!==0">
                <div class="user_box" v-for="news in searchRe.newsList.list" :key="news.newsId">

                  <div class="user_info">
                    <span class="user_name" @click="goNewsDe(news.newsId)">{{ news.title }}</span>
                    <span class="user_account" style="margin-top: 10px">{{ news.cont.substring(0,30) + '....' }}</span>
                  </div>
                </div>
              </div>
              <el-pagination
                  background
                  v-show="searchRe.newsList.list.length!==0"
                  style="margin-top: 15px"
                  @current-change="handleCurrentChange3"
                  :page-size="searchObj.pageSize"
                  :current-page="searchObj.pageNum"
                  layout="total,prev, pager, next, jumper"
                  :total="searchRe.newsList.total">
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </el-col>
    <el-col :span="3" style="min-height: 36px"></el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "SearchRes",
  data (){
    return {
      activeName: 'games',
      total: 0,
      searchRe: {
        keyword: '',
        gamesList: {
          list: [],
          total: 0
        },
        userList: {
          list: [],
          total: 0
        },
        newsList: {
          list: [],
          total: 0
        }
      },
      searchObj: {
        keyword: '',
        type: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    async getSearchList (type){
      this.searchObj.keyword = this.$route.params.keyword
      this.searchObj.type = type
      const {data: res } = await this.$http.post('/api/api/search',this.searchObj)
      this.searchRe = res.data
    },
    goGameDe (gameId){
      this.$router.push('/games/'+gameId)
    },
    goUserDe (userId){
      this.$router.push('/user/'+userId)
    },
    goNewsDe (newsId){
      this.$router.push('/news/'+newsId)
    },
    handleClick (){
      this.getSearchList(this.activeName)
    },
    handleCurrentChange (newPage) {
      this.searchObj.pageNum = newPage
      this.getSearchList(this.activeName)
      this.searchObj.pageNum = 1
    },
    handleCurrentChange2 (newPage1) {
      this.searchObj.pageNum = newPage1
      this.getSearchList(this.activeName)
      this.searchObj.pageNum = 1
    },
    handleCurrentChange3 (newPage2) {
      this.searchObj.pageNum = newPage2
      this.getSearchList(this.activeName)
      this.searchObj.pageNum = 1
    }
  },
  mounted() {
    this.getSearchList('games')
  }
}
</script>

<style scoped>
.game_list_box{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-left: -10px;
  min-height: 420px;
}
.game_box{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 15%;
  max-width: 20%;
  background-color: snow;
  word-break: break-all;
  border: 0 #545652 solid;
  border-radius: 4px;
  height: 360px;
  margin-left: 10px;
  margin-top: 10px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
}
.user_box{
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 30%;
  background-color: snow;
  word-break: break-all;
  border: 0 #545652 solid;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 200px;
  margin-left: 10px;
  margin-top: 10px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
}
.game_info{
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: auto;
}
.user_info{
  margin-top: 10px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: auto;
  padding: 10px;
}
.game_name{
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}
.game_name:hover{
  color: #409EFF;
}
.game_name_en{
  color: #8c939d;
  font-size: 12px;
  text-align: center;
}
.user_name{
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}
.user_name:hover{
  color: #409EFF;
}
.user_account{
  color: #8c939d;
  font-size: 15px;
  text-align: center;
}
.game_box img{
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.user_box img{
  width: 100px;
  margin-left: 30px;
  height: 100px;
  border: 2px #409EFF solid;
  border-radius: 50%;
}
.game_box:hover{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  animation-name: example;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
}
@keyframes example {
  /* 0%,20%,50%,80%,100%{-webkit-transform:translateY(0);} */
  100% {
    transform: translateY(5px);
  }
}


</style>
