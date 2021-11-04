<template>
  <el-container class="home-con">
    <el-header>
      <el-menu
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="width: 100%" router>
        <el-menu-item index="/">
          <img :src="require('../assets/img/fang2.png')" height="60"/>
        </el-menu-item>
      <el-menu-item index="/games">游戏</el-menu-item>
      <el-menu-item index="/community">社区</el-menu-item>
      <el-menu-item index="/news">新闻</el-menu-item>
    </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.home-con{
  height: 100%;
}
.el-header, .el-footer {
  text-align: center;
  padding: 0px;
}


.el-main {
  background-color: #E9EEF3;
}
</style>