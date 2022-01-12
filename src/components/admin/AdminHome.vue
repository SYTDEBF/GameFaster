<template>
  <el-container class="home-con">
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <el-menu unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-user"></i><span>系统管理</span></template>
          <el-menu-item-group>
            <template slot="title">基本信息</template>
            <el-menu-item index="/admin/adminmanger">系统用户信息管理</el-menu-item>
            <el-menu-item index="/admin/rolemanger">系统角色信息管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <div class="toggle-but-box"><el-button type="info" :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" id="toggle-but" @click="toggleCollapse"></el-button></div>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div style="margin-left: -10px">
          <img src="../../assets/img/fang.png" alt="">
          <span>GameFaster后台系统</span>
        </div>
        <div>
          <span style="margin-right: 5px">{{userInfo.username}}</span>
          <el-button type="info" @click="logout" id="close" icon="el-icon-switch-button"></el-button>
        </div>
      </el-header>

      <el-main>
<!--        路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isCollapse: false,
      activePath: '',
      userInfo: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    async getUserInfo() {
      const {data: res} = await this.$http.get('/api/api/admin/info')
      this.userInfo = res.data
    },
  }
}
</script>

<style lang="less" scoped>
.home-con{
  height: 100%;
}
.el-aside {
  width: 200px;
  background-color: white;
  box-shadow: 0 0 10px #ddd;
}
.toggle-but-box{
  display: flex;
  justify-content: center;
  cursor: pointer;
}
#toggle-but{
  color: black;
  background: white;
  border: 0;
}
.el-header {
  background-color:white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px #ddd;
  margin-left: 0;
}
.el-header div img{
  width: 160px;
  height: 40px ;
}
.el-header div  {
  display: flex;
  align-items: center;
  font-size: 20px;
}
#close {
  display: flex;
  border-radius: 50%;
  border: 0;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  color: black;
  background: white;
}
#close:hover{
  box-shadow: 0 0 10px #ddd;
}
</style>
