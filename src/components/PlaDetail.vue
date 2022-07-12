<template>
<div>
  <el-row>
    <el-col :span="5" style="min-height: 36px"></el-col>
    <el-col :span="14">
      <el-card>
        <div class="box">
          <div class="box-l">
            <img :src="platformObj.cover" alt="" class="xk">
          </div>
          <div class="box-r">
            <span class="game_name" style="margin-left: 10px">
              {{ platformObj.name }}
            </span>
            <span class="game_name_en" style="margin-left: 10px">
              {{ platformObj.nameEn }}
            </span>
            <span class="game_other" style="margin-left: 10px">
              制造公司：{{ platformObj.company }}
            </span>
            <span class="game_other" style="margin-left: 10px">
              发售时间：{{ platformObj.year }}
            </span>
            <span class="game_other" style="margin-left: 10px">
              国家：{{ platformObj.country }}
            </span>
            <span class="game_other" style="margin-left: 10px">
              简介：{{ platformObj.desc }}
            </span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="5" style="min-height: 36px"></el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "PlaDetail",
  data (){
    return {
      platformObj: {}
    }
  },
  methods: {
    async getPlaById(){
      const {data: res } = await this.$http.get('/api/api/platform/list/one/'+this.$route.params.pid)
      this.platformObj = res
    }
  },
  mounted() {
    this.getPlaById()
  }
}
</script>

<style scoped>
.box{
  display: flex;
}
.box-l{
  width: 30%;
}
.box-r{
  width: 70%;
  display: flex;
  flex-direction: column;
}
.game_name{
  font-size: 25px;
  font-weight: bold;
}
.game_name_en{
  color: #8c939d;
  margin-top: 10px;
}
.game_other{
  font-weight: bold;
  margin-top: 10px;
}
.xk{
  background-color: black;
  width: 100%;
  border: 6px solid white;
  border-radius: 3px;
  box-shadow: 1px 1px 5px #333333;
}
</style>
