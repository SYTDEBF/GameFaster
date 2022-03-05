<template>
<div>
  <el-row :gutter="20" >
    <el-col :span="16" >
      <div>
      <el-card style="height: 280px">
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
        <el-card :body-style="{ padding: '0px' }"  style="height: 280px">
          <div  class="">
            <img src="../assets/img/asa.png" class="image" alt="">
          </div>
          <div style="padding: 14px;">
            <span>新闻标题</span>
            <div class="bottom clearfix">
              <time class="time">{{ new Date() }}</time>
              <el-button type="text" class="button"  @click="asd">查看</el-button>
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
        <el-link ><router-link to="/login">后台管理</router-link></el-link>
      </el-card>
    </el-col>
    <el-col :span="8"></el-col>
  </el-row>


</div>
</template>

<script>
export default {
  name: "Ad",
  methods : {
    asd(){
      this.$router.push({ path:'/news/1'})
    }
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
 .font-size-md{
   font-size: 16px;
 }
 .news-div{
   display: flex;
   color: #E9EEF3;
   background-color: grey;
   width: 100%;
   height: 170px;
   margin-top: 10px;
   align-items: center;
   justify-content: center;
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
