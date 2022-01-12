<template>
<div>
  <h4>欢迎 {{userInfo.username}}</h4>
  <h4>你的角色是</h4>
  <h5 v-for="role in userInfo.roleList" :key="role.roleId">
    {{ role.roleName }}
  </h5>
  <h4>你的权限是</h4>
<!--  <h5 v-for="perms in userInfo.permsList" :key="perms">-->
<!--    {{ perms }}-->
<!--  </h5>-->
  <el-button @click="getUserInfo1">测试权限</el-button> <span>/api/api/user/infos1</span>
</div>
</template>

<script>
export default {
  name: "Welcome",
  data (){
    return{
      userInfo: {}
    }
  },
  methods:{
    async getUserInfo() {
      const {data: res} = await this.$http.get('/api/api/admin/info')
          this.userInfo = res.data
    },
    async getUserInfo1(){
      const {data: res} = await this.$http.get('/api/api/admin/infos1')
      if (res.flag === false){
        this.$message.error("没有权限")
      }
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style scoped>

</style>