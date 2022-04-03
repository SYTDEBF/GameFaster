<template>
<div>
  <el-row :gutter="20" >
    <el-col :span="16" >
      <div>
      <el-card style="height: 300px">
        <div slot="header" class="">
          <span style="font-weight: bold;font-size: 16px">开始了解</span>
          <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-circle-close"></el-button>
        </div>
        <div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="ver-box-col-cen">
                <el-link class="font-size-md">什么是速通?</el-link>
                <div>
                  <img src="../assets/icons/time.svg" width="150">
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="ver-box-col-cen">
                <el-link class="font-size-md">如何开始速通</el-link>
                <div>
                  <img src="../assets/icons/award.svg" width="160">
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="ver-box-col-cen">
                <el-link class="font-size-md">关于速通的其他</el-link>
                <div>
                  <img src="../assets/icons/other.svg" width="150">
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    </el-col>
    <el-col :span="8">
      <div>
        <el-card :body-style="{ padding: '0px' }"  style="height: 300px">
          <div  class="">
            <img src="../assets/img/asa.png" class="image" alt="">
          </div>
          <div style="padding: 30px;">
            <span>{{ newObj.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ changeDateFrom(newObj.date) }}</time>
              <el-button class="button" type="text" @click="asd(newObj.newsId)">查看</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20" style="margin-top: 10px">
    <el-col :span="16">
      <el-card>
        <h4>最新速通</h4>
        <el-divider></el-divider>
        <el-table stripe :data="frList">
          <el-table-column label="编号" prop="recordId"></el-table-column>
          <el-table-column label="游戏名称" >
            <template slot-scope="scope">
              <el-link type="primary" :underline="true"  :href="'/games/'+scope.row.gameId" >{{scope.row.gameName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="上传用户" >
            <template slot-scope="scope">
              <el-link type="primary" :underline="true"  :href="'/user/'+scope.row.userId" >{{scope.row.username}}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="规则">
            <template slot-scope="scope">
              <el-link type="primary" :underline="true" :href="'/game/'+scope.row.gameId+'/rule/'+scope.row.ruleId">
                {{ scope.row.ruleName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column label="平台">
            <template slot-scope="scope">
              <el-link type="primary" :underline="true" :href="'/platform/'+scope.row.platformId">
                {{ scope.row.platformName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column label="时长">
            <template slot-scope="scope">
              {{ changeFRTime(scope.row.time) }}
            </template>
          </el-table-column>
          <el-table-column label="上传时间">
            <template slot-scope="scope">
              {{ (changeDateYMD(scope.row.date)) }}
            </template>
          </el-table-column>
          <el-table-column label="链接">
            <template slot-scope="scope">
              <el-link :href="scope.row.video" :underline="true" type="primary"><i class="fa fa-video-camera"
                                                                                   style="font-size: 20px"></i>
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <h4>活跃用户</h4>
        <el-divider></el-divider>
        <div class="rank_box">
          <div class="rank_box_top">
            <div class="sec" style="margin-top: 50px">
              <div>
                <img src="../assets/icons/亚军.svg" style="width: 50px;height: 50px;margin-left: -55px" alt="a" class="mb-2">
                <img :src="rankUserList[1].cover" style="width: 100px;height: 100px" alt="a" class="img_border">
                <el-tag style="margin-top: 5px">{{ rankUserList[1].record }}条</el-tag>
                <span style="font-size: 16px;font-weight:bold;margin-top: 5px" class="username" @click="goUserDe(rankUserList[1].userId)">{{ rankUserList[1].username }}</span>
              </div>
            </div>
            <div class="fri">
              <div>
                <img src="../assets/icons/冠军.svg" style="width: 50px;height: 50px;margin-left: -55px" alt="a" class="mb-2">
                <img :src="rankUserList[0].cover" style="width: 100px;height: 100px;" alt="a" class="img_border">
                <el-tag style="margin-top: 5px">{{ rankUserList[0].record }}条</el-tag>
                <span style="font-size: 16px;font-weight:bold;margin-top: 5px" class="username" @click="goUserDe(rankUserList[0].userId)">{{ rankUserList[0].username }}</span>
              </div>
            </div>
            <div class="thi" style="margin-top: 50px">
              <div>
                <img src="../assets/icons/季军.svg" style="width: 50px;height: 50px;margin-left: -55px" alt="a" class="mb-2">
                <img :src="rankUserList[2].cover" style="width: 100px;height: 100px" alt="a" class="img_border">
                <el-tag style="margin-top: 5px">{{ rankUserList[2].record }}条</el-tag>
                <span style="font-size: 16px;font-weight:bold;margin-top: 5px" class="username" @click="goUserDe(rankUserList[2].userId)">{{ rankUserList[2].username }}</span>
              </div>
            </div>
          </div>
          <div class="rank_box_bom">
            <div v-for="(rank,index) in rankUserList" :key="index" style="width: 100%;margin-top: 5px">
              <div v-if="index>2"  class="other_box">
                <div style="font-size: 20px;font-style: italic">{{index +1 }}</div>
                <div style="margin-left: 10px"><img :src="rank.cover" alt="" style="width: 50px;height: 50px"></div>
                <div style="margin-left: 10px;font-weight: bold" class="username" @click="goUserDe(rank.userId)">{{ rank.username }}</div>
                <el-tag style="margin-left: 10px"> {{ rank.record }}条</el-tag>
              </div>

            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>


</div>
</template>

<script>
import {changeDateFrom, changeDateYMD, changeFRTime} from "@/assets/js/util";

export default {
  name: "Ad",
  data() {
    return {
      frList: [],
      rankUserList: [],
      newObj: {},
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10,
        keyword: ""
      }
    }
  },
  methods : {
    asd(id) {
      this.$router.push({path: '/news/' + id})
    },
    async getFRList() {
      const {data: res} = await this.$http.get('/api/api/fastRecord/list/last/')
      this.frList = res.data
    },
    async getUserRank() {
      const {data: res} = await this.$http.get('/api/api/index/rank/user')
      this.rankUserList = res.data
    },
    goUserDe(userId) {
      this.$router.push('/user/' + userId)
    },
    async getLastNews() {
      const {data: res} = await this.$http.get('/api/api/news/list/last/')
      this.newObj = res.data
    },
    changeFRTime,
    changeDateYMD,
    changeDateFrom
  },
  mounted() {
    this.getFRList()
    this.getUserRank()
    this.getLastNews()
  }
}
</script>

<style scoped>
 .ver-box-col-cen {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
 }
 .username{
   cursor: pointer;
 }
 .username:hover{
   color: #409EFF;
 }
 .font-size-md{
   font-size: 16px;
 }
.rank_box{
  display: flex;
  flex-direction: column;
  margin-top: -15px;

}
.rank_box_top{
  display: flex;
  flex-direction: row;
}
.other_box{
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px #d0c8c8 solid;
  border-radius: 3px;
  width: 100%;
  padding-left: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.fri{
  width: 33.3%;
  display: flex;
  justify-content: center;
}
 .fri div{
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 .mb-2{
   margin-bottom: -15px;
 }
 .sec{
   width: 33.3%;
   display: flex;
   justify-content: center;
 }
 .sec div{
   display: flex;
   flex-direction: column;
   align-items: center;
 }

 .thi{
   width: 33.3%;
   display: flex;
   justify-content: center;
 }
 .thi div{
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 .rank_box_bom{
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-top: 10px;
 }
 .img_border{
   border: 3px #409EFF solid;
   border-radius: 50%;
 }
 .time {
   font-size: 13px;
   color: #999;
 }

 .bottom {
   margin-top: 13px;
   line-height: 12px;
 }

 .button {
   padding: 0;
   float: right;
 }

 .image {
   width: 100%;
   height: 190px;
 }
</style>
