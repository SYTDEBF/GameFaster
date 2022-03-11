<template>
  <div>


    <el-card>
      <el-row>
        <el-col :span="2" style="min-height: 36px"></el-col>
        <el-col :span="20">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="info_box">
                <div class="bgt"></div>
                <div class="user_info_3">
                  <div style="height: 33%">
                    <img width="100"  height="100" :src="userObj.cover" alt=""/>
                  </div>
                  <div class="user_info_1">
                    <span>{{ userObj.username }}</span>
                    <span @click="toEmail(userObj.email)">{{ userObj.email }}</span>
                  </div>
                  <div style="height: 33%;width:100%;display: flex;align-items: end;">
                    <div style="height: 1px;width:100%;background-color: rgba(120,98,171,0.57);margin-top: 10px;" ></div>
                  </div>
                </div>
                <div class="user_info_2">
                  <div>
                    <span>年龄</span>
                    <span>{{ new Date().getFullYear()-new Date(userObj.createTime).getFullYear() }}</span>
                  </div>
                  <div>
                    <span>性别</span>
                    <span>男</span>
                  </div>
                  <div>
                    <span>电话</span>
                    <span>{{ userObj.mobile }}</span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="16">
              <el-tabs  active-name="first" tab-position="left">
                <el-tab-pane label="基本信息" name="first">
                  <el-form  label-width="80px" :model="userForm" ref="userFormRef" style="width: 450px">
                    <el-form-item label="头像" prop="cover">
                      <div class="list-img-box">
                        <div v-if="userForm.cover !== ''">
                          <img :src="userForm.cover" style='width:150px;height:150px' alt="头像加载失败">
                        </div>
                        <div v-else class="upload-btn" style="height: 150px;width: 150px" @click="uploadPicture('flagImg1')">
                          <i class="el-icon-plus" style="font-size: 30px;"></i>
                          <span>修改头像</span>
                        </div>
                      </div>
                      <div>
                        <el-button type="danger" icon="el-icon-delete" round size="mini"
                                   @click="delCover"></el-button>
                      </div>
                      <input type="hidden" v-model="userForm.cover" placeholder="请添加封面">
                    </el-form-item>
                    <el-form-item label="用户名">
                      <el-input v-model="userForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <el-input v-model="userForm.email" type="email"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                      <el-select v-model="userForm.sex" style="width: 100%">
                        <el-option value="男" label="男"></el-option>
                        <el-option value="女" label="女"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input v-model="userForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="生日" >
                      <el-date-picker style="width: 100%"
                          v-model="userForm.createTime"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item v-show="isMySelf">
                      <el-button type="primary" plain @click="editUserInfo()">立即修改</el-button>
                      <el-button @click="resetForm('userFormRef')" plain type="warning">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="速通信息" name="second">
                  <el-table stripe :data="frList">
                    <el-table-column label="编号" prop="recordId"></el-table-column>
                    <el-table-column label="上传用户" >
                      <template slot-scope="scope">
                        <el-link type="primary" :underline="true" disabled :href="'/user/'+scope.row.userId" >{{scope.row.username}}</el-link>
                      </template>
                    </el-table-column>
                    <el-table-column label="规则">
                      <template slot-scope="scope">
                        <el-link type="primary" :underline="true" :href="'/newpre/'+scope.row.rulesId" >{{scope.row.ruleName}}</el-link>
                      </template>
                    </el-table-column>
                    <el-table-column label="平台" >
                      <template slot-scope="scope">
                        <el-link type="primary" :underline="true" :href="'/platform/'+scope.row.platformId" >{{scope.row.platformName}}</el-link>
                      </template>
                    </el-table-column>
                    <el-table-column label="时长" prop="time"></el-table-column>
                    <el-table-column label="详情">
                      <template slot-scope="scope">
                        <el-button @click="goFRDetail(scope.row.recordId)" type="text" class="bu" style="margin-left: -35px" width="100">查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" style="min-height: 36px"></el-col>
      </el-row>
    </el-card>
    <el-dialog
        title="裁切封面"
        :visible.sync="cropperModel"
        width="950px"
        center
    >
      <el-dia-copper
          :Name="cropperName"
          :user-fixed-number="[1,1]"
          :user-mode=mode
          :user-auto-crop-height="240"
          :user-auto-crop-width="240"
          @uploadImgSuccess="handleUploadSuccess"
          ref="child1">
      </el-dia-copper>
    </el-dialog>
    <el-dialog
        title="查看大封面"
        :visible.sync="imgVisible"
        center>
      <img :src="imgName" v-if="imgVisible" style="width: 100%" alt="查看">
    </el-dialog>
  </div>
</template>

<script>
import ElDiaCopper from "@/components/el-dia-copper";
export default {
  name: "UserDetail",
  components: { ElDiaCopper },
  data() {
    return {
      total: 0,
      drawer: false,
      cropperModel: false,
      mode: '240px,240px',
      cropperName: '',
      isMySelf: false,
      imgName: '',
      imgVisible: false,
      frList: [],
      userObj: {},
      userForm: {
        userId: '',
        username: '',
        email: '',
        sex: '',
        mobile: '',
        createTime: '',
        cover: ''
      },
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 5,
        keyword: ""
      }
    }
  },
  methods: {
    async getFRList(){
      const {data: res } = await this.$http.post('/api/api/fastRecord/list/page/'+this.$route.params.uid,this.queryInfo)
      this.frList = res.data.list
      this.total = res.data.total
    },
    async getUserInfo (){
      const {data: res } = await this.$http.get('/api/api/user/list/one/basic/'+this.$route.params.uid)
      this.userObj = res.data
      this.userForm.userId = res.data.userId
      this.userForm.cover = res.data.cover
      this.userForm.email = res.data.email
      this.userForm.mobile = res.data.mobile
      this.userForm.createTime = res.data.createTime
      this.userForm.sex = res.data.sex
      this.userForm.username = res.data.username
    },
    async editUserInfo () {
      this.userForm.userId = this.userObj.userId
      const {data: res } = await this.$http.put('/api/api/user/edit/user',this.userForm)
      if (res.flag){
        await this.getUserInfo()
        return this.$message.success('修改成功')
      }
      return this.$message.error('修改失败'+','+res.data)
    },
    delCover(){
      this.userForm.cover = ''
    },
    // 监听 pageSize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
    },
    uploadPicture(name) {
      this.cropperName = name;
      this.cropperModel = true;
    },
    toEmail(email){
      window.location.href = 'mailto: '+email
    },
    async isMySelfF(){
      const {data: res } = await this.$http.get('/api/api/user/infos')
      if (Number(this.$route.params.uid )=== res.data.creId){
        this.isMySelf = true
      }
    },
    handleUploadSuccess(data) {
      console.log(data)
      this.userForm.cover = data.url;
      console.log('最终输出' + data.url)
      this.cropperModel = false;
    },
    // 监听 pageNum 的改变
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.getFRList()
    this.getUserInfo()
    this.isMySelfF()
  }

}
</script>

<style scoped>
.info_box{
  border:0;
  border-radius: 4px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 400px;
}
.user_info_1{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 33%;
}
.user_info_1 span:first-child{
  font-size: 18px;
  color: #7862AB;
  font-weight: bold;
}
.user_info_1 span:nth-child(2){
  color: #82848a;
  font-size: 16px;
  cursor: pointer;
}
.user_info_1 span:nth-child(2):hover{
  color: #409EFF;
  font-size: 16px;
  cursor: pointer;
}
.info_box:hover{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  animation-name: example;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
}
.user_info_2{
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user_info_2 div{
  display: flex;
  flex-direction: column;
  width: 33%;
  align-items: center;
  justify-content: center;
}
.user_info_3 div span{
  margin-top: 5px;
}
.user_info_2 div span:first-child{
  font-size: 16px;
  margin-top: 10px;
  font-weight: bold;
}
.user_info_2 div span:nth-child(2){
  font-size: 15px;
  color: #7862AB;
  font-weight: bold;
}
.user_info_3{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 200px;

}
.user_info_3 div:first-child{
  transform: translateY(-80%);
}
.user_info_3 div  img {
  border: 3px  gray solid;
  border-radius: 50%;
}
.bgt {
  height: 120px;
  background-color: rgba(120,98,171,0.56);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

}
.upload-btn {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 1px #cccccc;
}

.upload-btn:hover {
  border: 1px solid #69b7ed;
}

.upload-btn i {
  margin: 5px;
}
.upload-list-cover {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 40px;
  align-items: center;
  background: rgba(0, 0, 0, .6);
  opacity: 0;
  transition: opacity 1s;
}

.cover_icon {
  font-size: 30px;
}
@keyframes example {
  /* 0%,20%,50%,80%,100%{-webkit-transform:translateY(0);} */
  100% {
    transform: translateY(5px);
  }
}
</style>
