<template>
<div>
  <el-card>
    <el-row>
      <el-col :span="5" class="grid-content"></el-col>
      <el-col :span="14" class="grid-content">
        <div class="wbox">
          <div class="wbox_left">
            <img :src="gameObj.cover" alt="" class="xk">
            <el-button type="primary" @click="goFRSub" plain style="margin-top: 10px;width: 100%;font-weight: bold;font-size: 18px;letter-spacing: 8px">提交速通</el-button>
          </div>
          <div class="wbox_right">
             <span class="game_name" style="margin-left: 5px">
              {{ gameObj.name }}
            </span>
            <div class="wbox_right_1">
            <span class="game_name_en">
              {{ gameObj.nameEn }}
            </span>
            <span class="game_other">
              发售：{{ changeDateYMD(gameObj.year) }}
            </span >
            <span class="game_other">
              制造商：{{ gameObj.company }}
            </span>
            <span class="game_other">
              类型：<el-tag v-for="type in gameObj.typeList" :key="type.typeId"
                         type="info">{{ type.nameEn + '（' + type.name + '）' }}</el-tag>
            </span>
            <span class="game_other">
              国家：{{ gameObj.country }}
            </span>
            </div>
            <div class="game_other" style="margin-left: 5px;margin-top: 10px">
              平台：<el-tag v-for="pla in gameObj.platformList" :key="pla.platformId">{{ pla.name }}</el-tag>
            </div>
            <span class="game_other" style="margin-left: 5px;margin-top: 10px">
              简介：{{ gameObj.desc }}
            </span>
          </div>
        </div>
        <div class="st">
          <el-tabs  style="height: 500px;"  @tab-click="handleClick" v-model="rulesId">
            <el-tab-pane v-for="rule in gameObj.rulesList" :key="rule.rulesId" :name="rule.rulesId+ ''"  :label="rule.name" >
              {{ rule.remark }}
              <el-table stripe :data="fastRecordList">
                <el-table-column label="编号" prop="recordId"></el-table-column>
                <el-table-column label="上传用户" >
                  <template slot-scope="scope">
                    <el-link type="primary" :underline="true" :href="'/user/'+scope.row.userId" >{{scope.row.username}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column label="规则">
                  <template slot-scope="scope">
                    <el-link type="primary" :underline="true" :href="'/game/'+scope.row.gameId+'/rule/'+rule.rulesId">
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
                <el-table-column label="上传时间" width="150">
                  <template slot-scope="scope">
                    {{ (changeDateFrom(scope.row.date)) }}
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
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="5" class="grid-content"></el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import {changeDateFrom, changeDateYMD, changeFRTime} from '@/assets/js/util'

export default {
  name: "GamesDetail",
  data() {
    return {
      gameObj: {},
      userObj: {},
      fastRecordList: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
        keyword: ""
      },
      rulesId: ''
    }
  },
  methods: {
    async getGame(){
      const {data: res} = await this.$http.get('/api/api/games/list/one/'+this.$route.params.gid)
      this.gameObj = res
      this.rulesId = this.gameObj.rulesList[0].rulesId + ''
      const {data: res1} = await this.$http.post('/api/api/games/list/'+ this.$route.params.gid +'/'+ this.rulesId,this.queryInfo)
      this.fastRecordList = res1.data.list
    },
    async getGameFastRecordList(){
      const {data: res} = await this.$http.post('/api/api/games/list/'+ this.$route.params.gid +'/'+ this.rulesId ,this.queryInfo)
      this.fastRecordList = res.data.list
    },
    async getUserInfo (){
      const {data: res } = await this.$http.get('/api/api/user/list/one/basic/'+window.localStorage.getItem('uid'))
      this.userObj = res.data
    },
    handleClick() {
      this.getGameFastRecordList()
    },
    goFRDetail(recordId) {
      this.$router.push('/record/' + recordId)
    },
    goFRSub() {
      this.$router.push('/gamefaster/sub/' + this.$route.params.gid)
    },
    changeDateYMD,
    changeFRTime,
    changeDateFrom
  },
  mounted() {
    this.getGame()
    this.getGameFastRecordList()
  }

}
</script>

<style scoped>
.grid-content{
  min-height: 36px;
}
.wbox{
  display: flex;
}
.wbox_left{
  width: 25%;
}
.wbox_right{
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-left: 10px;
}
.wbox_right_1{
  display: flex;
  flex-direction: column;
}
.st{
  margin-top:15px;
}
.bu:hover{
  color: #409EFF;
}
.game_name{
  font-size: 25px;
  font-weight: bold;
}
.game_name_en{
  color: #8c939d;
}
.game_other{
  font-weight: bold;
}
.wbox_right_1 span{
  margin-top: 10px;
  margin-left: 5px;
}
.xk{
  background-color: black;
  width: 100%;
  border: 6px solid white;
  border-radius: 3px;
  box-shadow: 1px 1px 5px #333333;
}
</style>
