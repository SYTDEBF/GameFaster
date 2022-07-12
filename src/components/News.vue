<template>
<div>
  <el-row :gutter="20" v-for="news in newsList" :key="news.newsId" style="margin-top: 15px">
    <el-col :span="2" style="min-height: 36px"></el-col>
    <el-col :span="20" >
      <el-card :body-style="{ padding: '0px' }">
        <div class="box">
          <div class="img_box">
            <img src="../assets/img/asa.png" class="image" alt="">
          </div>
          <div class="news_box">
            <h2 @click="goNews(news.newsId)">{{ news.title }}</h2>
            <p>{{ news.cont.substring(0,40) + '....' }}</p>
            <span>{{ changeDateYMD(news.date) }}</span>
            <el-button type="" style="width: 100px" @click="goNews(news.newsId)">详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="2" style="min-height: 36px"></el-col>
  </el-row>
      <div style="margin-left: -240px">
        <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pageNum"
            :page-sizes="[1, 2, 5, 10, 20]"
            :page-size="queryInfo.pageSize"
            layout="total,prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>



</div>
</template>

<script>
import {changeDateYMD} from '@/assets/js/util'

export default {
  name: "News",
  data() {
    return {
      total: 0,
      newsList: [],
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 5,
        keyword: ""
      }
    }
  },
  methods: {
    async getNewList() {
      const {data: res} = await this.$http.post('/api/api/news/list/page/user', this.queryInfo)
      this.newsList = res.data.list
      this.total = res.data.total

    },
    // 监听 pageNum 的改变
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getNewList()
    },
    changeDateYMD,
    goNews (id){
      this.$router.push('/news/' + id)
    }
  },
  mounted() {
    this.getNewList()
  }
}
</script>

<style scoped>
.box{
  display: flex;

}
.img_box{
  width: auto;
  height: 190px;
}
.news_box{
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
.news_box span{
  color: #8c939d;
}
.news_box p{
  font-size: 18px;
}
.news_box h2:hover{
  color: #409EFF;
  cursor: pointer;
}
.el-pagination{
  text-align: center;
}
.news_box *{
  margin-left: 10px;
  margin-top: 10px;
}
</style>
