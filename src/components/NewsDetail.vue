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
            <img style="object-fit: contain;width: 75px;height: 75px;border-radius: 50%;border: #8c939d 2px solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"  alt="">
            <el-input type="textarea" v-model="content" style="margin-left: 10px" rows="3"  :placeholder="isLogin==='no'?'请登陆后进行评论':'说点什么吧'" :disabled="isLogin === 'no'">

            </el-input>
            <el-button style="margin-left: 10px" :disabled="isLogin === 'no'" @click="sendCommentFirst">发表评论</el-button>
          </el-col>
        </el-row>
        <el-tabs v-model="activeName" style="margin-top: 10px">
          <el-tab-pane label="按热度排序" name="first">
            <el-row :gutter="10" style="margin-top: 10px" v-for="(comment,index) in newObj.commentVoList" :key="comment.commentId">
              <el-col :span="24" style="display: flex;align-items: center">
                <img style="object-fit: contain;width: 60px;height: 60px;border-radius: 50%;border: #8c939d 2px solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"  alt="">
                <div style="display: flex;flex-direction: column;margin-left: 10px">
                  <span><el-link style="font-size: 15px" :href="/userinfo/+comment.userId" type="primary" :underline="true"  target="_blank">{{ comment.username }}</el-link></span>
                  <span style="margin-top: 10px">{{ comment.content }}</span>
                  <div style="display: flex;align-items: center;margin-top: 10px">
                    <span style="font-size: 10px;color: #8c939d;">{{ changeDateFrom(comment.ctime) }}</span>
                    <el-button style="margin-left: 5px;" icon="el-icon-thumb"  size="mini" round>12</el-button>
                    <el-button style="margin-left: 5px;width: 5px"  size="mini" round>回复</el-button>
                    <span style="font-size: 10px;color: #8c939d;margin-left: 5px">{{ '#'+  Number(index+1) +'楼' }}</span>
                  </div>
                </div>
              </el-col>
              <el-row :gutter="10"
                  v-show="comment.replyVoList.length !==0||comment.replyVoList!== null"
                  v-for="reply in comment.replyVoList" :key="reply.replyId"
              >
                <el-col :span="4" style="width: 80px;height: 90px"></el-col>
                <el-col :span="20" style="display: flex;align-items: center">
                  <img style="object-fit: contain;width: 60px;height: 60px;border-radius: 50%;border: #8c939d 2px solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"  alt="">
                  <div style="display: flex;flex-direction: column;margin-left: 10px">
                    <span><el-link style="font-size: 15px" :href="/userinfo/+reply.userId" type="primary" :underline="true"  target="_blank">{{ reply.username }}</el-link></span>
                    <span style="margin-top: 10px">{{ reply.content }}</span>
                    <div style="display: flex;align-items: center;margin-top: 10px">
                      <span style="font-size: 10px;color: #8c939d;">{{ changeDateFrom(reply.ctime) }}</span>
                      <el-button style="margin-left: 5px;" icon="el-icon-thumb"  size="mini" round>12</el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="按时间排序" name="second">按时间排序</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <div style="width: 25%"></div>
  </div>
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
      disContent: '',
      activeName: 'first',
      commentObj: {
        commentId: '',
        content: '',
        userId: '',
        newsId: 0,
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
      this.isLogin = window.sessionStorage.getItem('isLogin')
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
    }
  },
  mounted() {
    this.getNewById()
    this.getLogin()
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
