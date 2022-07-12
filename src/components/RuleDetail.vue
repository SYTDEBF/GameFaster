<template>
<div>
  <el-row>
    <el-col :span="5" style="min-height: 36px"></el-col>
    <el-col :span="14" style="min-height: 36px">
      <el-card>
        <h2>{{ruleObj.gameName}}的 <span style="color: #6c589a"> {{ruleObj.name}}</span> 规则</h2>
        <el-divider></el-divider>
        <h4>规则内容：{{ruleObj.remark}}</h4>
      </el-card>
    </el-col>
    <el-col :span="5" style="min-height: 36px"></el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "RuleDetail",
  data() {
    return{
      ruleObj: {}
    }
  },
  methods: {
    async getRuleById(){
      const {data: res } = await this.$http.get('/api/api/rules/list/'+this.$route.params.gamesid+'/rule/'+this.$route.params.rid+'/')
      this.ruleObj = res.data
      console.log(res.data)
    }
  },
  mounted() {
    this.getRuleById()
  }
}
</script>

<style scoped>

</style>
