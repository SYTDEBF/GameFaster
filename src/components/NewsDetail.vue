<template>
<div>
  <div style="display: flex;width: 100%;height: 100%">
    <div style="width: 25%"></div>
    <el-card shadow="hover" style="min-width: 75%;max-width: 75%">
      <h1>{{ newObj.title }}</h1>
      <div style="text-align: center;margin-top: 15px">
        <span class="autime">由 <a  style="color: #409EFF;text-decoration-line: none"   :href="'/newpre/'+newObj.userId" target="_blank">威威</a>
        于 {{ newObj.date }} 编写</span>
      </div>
      <el-divider></el-divider>
      <div v-html="disContent" class="news-box">
      </div>
    </el-card>
    <div style="width: 25%"></div>
  </div>
  <div style="display: flex;width: 100%;height: 100%;margin-top: 10px">
    <div style="width: 25%"></div>
    <el-card style="min-width: 75%;max-width: 75%" shadow="hover">
      评论
      <el-divider></el-divider>
      <div>
        <el-row :gutter="10">
          <el-col :span="24" style="display: flex;justify-content: center;align-items: center">
            <img style="object-fit: contain;width: 75px;height: 75px;border-radius: 50%;border: #8c939d 2px solid" :src="userObj.cover"  alt="">
            <el-input type="textarea" v-model="content" style="margin-left: 10px" rows="3"  :placeholder="isLogin==='no'?'请登陆后进行评论':'说点什么吧'" :disabled="isLogin === 'no'">

            </el-input>
            <el-button style="margin-left: 10px" :disabled="isLogin === 'no'" @click="sendCommentFirst">发表评论</el-button>
          </el-col>
        </el-row>
        <el-tabs v-model="activeName" style="margin-top: 10px">
          <el-tab-pane label="按热度排序" name="first">
            <div  style="margin-top: 10px" v-for="(comment,index) in newObj.commentVoList" :key="comment.commentId">
              <el-col :span="24" style="display: flex;align-items: center">
                <img style="object-fit: contain;width: 60px;height: 60px;border-radius: 50%;border: #8c939d 2px solid" :src="comment.cover"  alt="">
                <div style="display: flex;flex-direction: column;margin-left: 10px">
                  <span><el-link style="font-size: 15px" :href="/user/+comment.userId" type="primary" :underline="true" >{{ comment.username }}</el-link></span>
                  <span style="margin-top: 10px">{{ comment.content }}</span>
                  <div style="display: flex;align-items: center;margin-top: 10px">
                    <span style="font-size: 10px;color: #8c939d;">{{ changeDateFrom(comment.ctime) }}</span>
                    <el-button style="margin-left: 5px;" icon="el-icon-thumb"  size="mini" round>12</el-button>
                    <el-button style="margin-left: 5px;width: 5px"  size="mini" round @click="openReply(comment)">回复</el-button>
                    <span style="font-size: 10px;color: #8c939d;margin-left: 5px">{{ '#'+  Number(index+1) +'楼' }}</span>
                  </div>
                </div>
              </el-col>
              <div
                  v-show="comment.replyVoList.length !==0||comment.replyVoList!== null"
                  v-for="reply in comment.replyVoList" :key="reply.replyId" style="margin-left: 70px"
              >
                <el-col :span="4" ></el-col>
                <el-col :span="20" style="display: flex;align-items: center">
                  <img style="object-fit: contain;width: 60px;height: 60px;border-radius: 50%;border: #8c939d 2px solid" :src="reply.cover"  alt="">
                  <div style="display: flex;flex-direction: column;margin-left: 10px">
                    <span><el-link style="font-size: 15px" :href="/user/+reply.userId" type="primary" :underline="true" >{{ reply.username }}</el-link></span>
                    <span style="margin-top: 10px">{{ reply.content }}</span>
                    <div style="display: flex;align-items: center;margin-top: 10px">
                      <span style="font-size: 10px;color: #8c939d;">{{ changeDateFrom(reply.ctime) }}</span>
                      <el-button style="margin-left: 5px;" icon="el-icon-thumb"  size="mini" round>12</el-button>
                    </div>
                  </div>
                </el-col>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="按时间排序" name="second">按时间排序</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <div style="width: 25%"></div>
  </div>
  <el-dialog
      :title="replyUser"
      :visible.sync="dialogVisible"
      width="40%"
      >
    <el-input type="textarea" v-model="replyObj.content"></el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sendReply">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import { createEditor } from '@wangeditor/editor'
import {changeDateFrom} from "@/assets/js/util";

import '../assets/js/util.js'
export default {
  name: "NewSDetail",
  data() {
    return {
      newObj:{},
      userObj: {},
      dialogVisible: false,
      replyUser: '',
      v_content: '',
      disContent: '',
      // 回复评论id
      commentId: '',
      activeName: 'first',
      commentObj: {
        commentId: '',
        content: '',
        userId: '',
        newsId: 0,
        ctime: ''
      },
      replyObj:{
        replyId: '',
        userId: '',
        commentId: '0',
        content: '',
        ctime: ''
      },
      content: '',
      isLogin: 'no',
    }
  },
  methods: {
    async getNewById() {
      const {data: res} = await this.$http.get('/api/api/news/list/one/'+this.$route.params.nid)
      let content = JSON.parse(res.data.content)
      const editor = createEditor({content})
      this.disContent = editor.getHtml()
      this.newObj = res.data
      this.newObj.date = this.changeDateFrom(this.newObj.date);
    },
    changeDateFrom,
    getLogin(){
      this.isLogin = window.localStorage.getItem('isLogin')
    },
    async getUserInfo (){
      const {data: res } = await this.$http.get('/api/api/user/list/one/basic/'+window.localStorage.getItem('uid'))
      this.userObj = res.data
    },
    openReply(comment){
      this.dialogVisible = true;
      this.replyUser='回复：'+comment.username;
      this.commentId=comment.commentId
    },
    async sendCommentFirst(){
      this.commentObj.content = this.content
      this.commentObj.newsId = this.$route.params.nid
      const {data: res} = await this.$http.post('/api/api/comment/send',this.commentObj)
      if (res.flag) {
        await this.getNewById()
        return this.$message.success('发表成功')
      }
      return this.$message.error('发表失败')
    },
    //
    async sendReply(){
      this.replyObj.commentId = this.commentId
      const {data: res} = await this.$http.post('/api/api/reply/send',this.replyObj)
      if (res.flag) {
        await this.getNewById()
        this.dialogVisible = false
        await this.getNewById()
        this.replyObj.content = ''
        this.replyObj.commentId = ''
        return this.$message.success('发表成功')
      }
      return this.$message.error('发表失败')
    }
  },
  mounted() {
    this.getNewById()
    this.getLogin()
    this.getUserInfo()
  }
}
</script>

<style scoped>
 h1{
   font-size: 40px;
   margin-bottom: 5px;
   color: #333;
   margin-top: 8px;
   text-align: center;
 }
 .autime{
   font-size: 18px;
   color: #8c939d;
   margin-bottom: 20px;
 }
 .avatar_box {
   width: 100px;
   height: 100px;
   border: 1px #eee solid;
   box-shadow: 0 0 10px #ddd;
   padding: 10px;
   border-radius: 50%;
   background-color: #fff;
 }
 .el-dialog__headerbtn{
   border: 1px #82848a solid;
 }
 .avatar_box img{
   height: 100%;
   width: 100%;
   border-radius: 50%;
   background-color: #eee;
 }
 >>> p, li, td, th, blockquote {
  white-space: pre-wrap; /* 显示空格 */
}
>>> p{
  display: flex;
  margin-top: 10px;
}
>>> table {
  padding: 0;
  word-break: initial;
}
>>> table tr {
  border: 1px solid #dfe2e5;
  margin: 0;
  padding: 0;
}
>>> table tr:nth-child(2n),
thead {
  background-color: #f8f8f8;
}
>>> table th {
  font-weight: bold;
  border: 1px solid #dfe2e5;
  border-bottom: 0;
  margin: 0;
  padding: 6px 13px;
}
>>> table td {
  border: 1px solid #dfe2e5;
  margin: 0;
  padding: 6px 13px;
}
>>> table th:first-child,
table td:first-child {
  margin-top: 0;
}
>>> table th:last-child,
table td:last-child {
  margin-bottom: 0;
}


/* 代码块 */
>>> pre>code {
  display: block;
  border: 1px solid hsl(0, 0%, 91%);
  border-radius: 4px 4px;
  text-indent: 0;
  background-color: #fafafa;
  padding: 10px;
  font-size: 14px;
}

/* 引用 */
>>> blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 10px 10px;
  margin: 10px 0;
  background-color: #f1f1f1;
}

/* 列表 */
>>> ul, ol {
  margin: 10px 0 10px 20px;
}

/* 分割线 */
>>> hr {
  display: block;
  width: 90%;
  margin: 20px auto;
  border: 0;
  height: 1px;
  background-color: #ccc;
}

>>> img {
  max-width: 20%;
  max-height: 50%;
  align-items: center;
}
</style>
