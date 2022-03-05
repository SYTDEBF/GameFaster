<template>
<div style="margin-left: -5px">
  <div class="game_list_box">
    <div class="game_box" v-for="game in gameList" :key="game.gameId">
      <img :src="game.cover"  alt="sd"/>
      <div class="game_info">
        <span class="game_name">{{ game.name }}</span>
        <span class="game_name_en">{{ game.nameEn }}</span>
        <span class="game_other">{{ game.company }}</span>
        <span class="game_other">{{ changeDateYMD(game.year) }}</span>
        <span class="game_but"><el-button @click="goDetail(game.gameId)">详情 <i class="el-icon-arrow-right"></i></el-button></span>
      </div>
    </div>
  </div>
  <el-row>
    <el-col :span="10" style="min-height: 36px"></el-col>
    <el-col :span="4" >
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[1, 2, 5, 10, 20]"
          :page-size="queryInfo.pageSize"
          layout="total,prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-col>
    <el-col :span="10" style="min-height: 36px"></el-col>
  </el-row>
</div>

</template>

<script>
import {changeDateYMD} from '@/assets/js/util'
export default {
  name: "Games",
  data() {
    return {
      gameList: [],
      total: 0,
      queryInfo: {
        "pageNum": 1,
        "pageSize": 8,
        "keyword": ""
    }
    }
  },
  methods: {
    async getGameList() {
      const {data: res} = await this.$http.post('/api/api/games/list/simple/page',this.queryInfo)
      this.gameList = res.data.list
      this.total = res.data.total
    },
    changeDateYMD,
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
    },
    goDetail (gId) {
      this.$router.push('/games/' + gId)
    }
  },
  mounted() {
    this.getGameList()
  }
}
</script>

<style scoped>
.game_list_box{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.game_box{
  display: flex;
  flex-grow: 1;
  flex-basis: 24%;
  max-width: 49.5%;
  background-color: snow;
  flex-direction: row;
  word-break: break-all;
  border: 0 #545652 solid;
  border-radius: 4px;
  height: 250px;
  margin-left: 10px;
  margin-top: 10px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
}
.game_info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: auto;
  width: 70%;
}
.game_but{

}
.game_info span{
  margin-top: 10px;
  margin-left: 5px;
}
.game_name{
  font-size: 20px;
  font-weight: bold;
}
.game_name_en{
  color: #8c939d;
  text-align: center;
}
.game_other{
  font-weight: bold;
}
.game_box img{
  width: 176px;
  height: 250px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
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
