<template>
<div>
  <el-row>
    <el-col :span="4" style="min-height: 36px"></el-col>
    <el-col :span="16">
      <el-card>
        <h4><span style="color: #409EFF">{{ this.$route.params.keyword }}</span> 的搜索结果</h4>
        <div style="margin-top: 15px">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="游戏" name="games">游戏</el-tab-pane>
            <el-tab-pane label="用户" name="user">用户</el-tab-pane>
            <el-tab-pane label="新闻" name="news">新闻</el-tab-pane>
          </el-tabs>
        </div>
        <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="searchObj.pageNum"
            layout="total,prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </el-card>
    </el-col>
    <el-col :span="4" style="min-height: 36px"></el-col>
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
        gamesList: {},
        userList: {},
        newsList: {}
      },
      searchObj: {
        keyword: '',
        type: '',
        pageNum: 1,
        pageSize: 5
      }
    }
  },
  methods: {
    async getSearchList (type){
      this.searchObj.keyword = this.$route.params.keyword
      this.searchObj.type = type
      const {data: res } = await this.$http.post('/api/api/search',this.searchObj)
      this.searchRe = res.data
      this.total = this.searchRe.gamesList.total
    },
    handleClick (){
      this.getSearchList(this.activeName)
    },
    handleCurrentChange () {}
  },
  mounted() {
    this.getSearchList('games')
  }
}
</script>

<style scoped>

</style>
