<template>
  <el-container class="home-con">
    <el-header style="background-color: #F2F6FC">
      <el-menu
        mode="horizontal"
        background-color="#F2F6FC"
        text-color="#00000"
        active-text-color="#7862AB"
        default-active="/"
        style="width: 80%" router>
        <el-menu-item>
          <img :src="require('../assets/img/fang3.png')" height="60" alt=""/>
        </el-menu-item>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/games">游戏</el-menu-item>
      <el-menu-item index="/news">新闻</el-menu-item>
    </el-menu>
      <div>
        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="keyword" @change="goSearch">

        </el-input>
      </div>
      <div v-show="isLogin === 'yes'">
        <el-popover
            placement="bottom"
            width="150"
            trigger="hover"
            style="padding: 0;margin: 0"
           >
          <div class="list_box" style="height: 80px">
            <div style="height: 40px" @click="goUserDetail"><i class="el-icon-user" style="margin-right: 5px"></i>个人中心</div>
            <div style="height: 40px" @click="loginOut"><i class="el-icon-switch-button" style="margin-right: 5px"></i>退出登录</div>
          </div>
        <el-avatar  slot="reference" :src="userInfo.cover"></el-avatar>
        </el-popover>
      </div>
      <div v-show="isLogin !== 'yes'">
        <el-button plain @click="goLogin">登录</el-button>
      </div>
    </el-header>
    <el-container>
      <el-main :style="defaultHeight">
        <router-view></router-view>
      </el-main>
      <el-footer style="display: flex;justify-content: center;align-items: center;background-color: #E9EEF3;color:#82848a">©CopyRight 2017-2022 MZHSY All Rights Reserved. 梅子黄时雨 版权所有</el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      activeIndex: '/',
      activeIndex2: '1',
      isLogin: 'no',
      keyword: '',
      userInfo: {},
      defaultHeight: {
        height: ""
      }
    };
  },
  methods: {
    getHeight() {
      this.defaultHeight.height = window.innerHeight
    },
    goLogin(){
      this.$router.push({ path:'/userLogin'})
    },
    getLogin(){
      this.isLogin = window.localStorage.getItem('isLogin')
    },
    goUserDetail(){
      this.$router.push({ path:'/user/'+window.localStorage.getItem('uid')})
    },
    loginOut (){

      window.localStorage.clear()
      this.getLogin()
    },
    goSearch(){
      if (this.keyword.trim()!=='') {
       return  this.$router.push('/search/' + this.keyword)
      }else {
        return this.$message.warning('请输入内容')
      }

    },
    async getUserInfo(){
      const {data: res} = await this.$http.get('/api/api/user/list/one/'+window.localStorage.getItem('uid'))
      this.userInfo = res.data
    },
  },
  mounted() {
    //页面创建时执行一次getHeight进行赋值，顺道绑定resize事件
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    this.getLogin()
    this.getUserInfo()
  }
}
</script>

<style scoped>
.home-con{
  height: 100%;
}
.el-header {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-header div {
  margin-left: 10px;
  margin-right: 20px;
}
.el-avatar{
  border: 1px #8c939d solid;
  border-radius: 50%;
}
.el-footer{
  padding: 0;
}


.el-main {
  background-color: #E9EEF3;
  min-height: 600px;

}
.list_box{
  padding: 0;
  margin: 0;
}
.list_box div:hover{
  background-color: rgba(120, 98, 171, 0.3);
}
.list_box div{
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
}
</style>
