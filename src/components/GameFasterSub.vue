<template>
<div>
  <el-row>
    <el-col :span="5" style="min-height: 36px"></el-col>
    <el-col :span="14">
      <el-card>
        <h2>提交 {{'《' + gameObj.name + '》'}} 的速通信息</h2>
        <el-form ref="frForm" :model="fastRecordForm" style="margin-top: 10px" label-width="100px">
          <el-form-item label="游戏"  style="width: 50%">
            <el-input  v-model="gameObj.name" disabled >
            </el-input>
          </el-form-item>
          <el-form-item label="用户"  style="width: 50%">
            <el-input  v-model="userInfo.username" disabled>
            </el-input>
          </el-form-item>
          <el-form-item label="规则" style="width: 50%">
            <el-select  v-model="fastRecordForm.ruleId" >
              <el-option v-for="rule in gameObj.rulesList" :key="rule.rulesId"  :value="rule.rulesId" :label="rule.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台" style="width: 50%">
            <el-select  v-model="fastRecordForm.platformId" >
              <el-option v-for="pla in gameObj.platformList" :key="pla.platformId"  :value="pla.platformId" :label="pla.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时长">
            <div style="display: flex;flex-direction: column">
              <el-input placeholder="请输入内容" v-model="hour" style="width: 40px;margin-top: 5px">
                <template slot="append" style="width: 40px">h</template>
              </el-input>
              <el-input placeholder="请输入内容" v-model="min" style="width: 40px;margin-top: 5px">
                <template slot="append" style="width: 40px">m</template>
              </el-input>
              <el-input placeholder="请输入内容" v-model="sec" style="width: 40px;margin-top: 5px">
                <template slot="append" style="width: 40px">s</template>
              </el-input>
              <el-input placeholder="请输入内容" v-model="ms" style="width: 40px;margin-top: 5px">
                <template slot="append" style="width: 40px">ms</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="日期" style="width: 50%">
            <el-date-picker
                v-model="fastRecordForm.date"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="速通视频链接" style="width: 50%">
            <el-input  v-model="fastRecordForm.video" >
            </el-input>
          </el-form-item>
          <el-form-item label="模拟器">
            <el-radio v-model="fastRecordForm.emulator" label="1">是</el-radio>
            <el-radio v-model="fastRecordForm.emulator" label="2" >否</el-radio>
          </el-form-item>
          <el-form-item label="备注" style="width: 50%">
            <el-input  type="textarea" v-model="fastRecordForm.remark" rows="5">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="send()" plain>立即提交</el-button>
            <el-button @click="resetForm()" type="warning" plain>重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="5" style="min-height: 36px"></el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "GameFasterSub",
  data(){
    return{
      gameObj: {},
      gameDeObj: {},
      userInfo: {},
      hour: '',
      min: '',
      sec: '',
      ms: '',
      fastRecordForm: {
        recordId: '',
        userId: '',
        gameId: '',
        ruleId: '',
        platformId: '',
        time: '',
        date: '',
        video: '',
        remark: '',
        record: '',
        verified: 0,
        emulator: ''
      },
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
        keyword: ""
      },
      rulesId: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      addFormRules: {
        account: [
          {required: true, message: '请输入账户', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {max: 16, min: 8, message: "长度在8~16个字符之间", trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        roleList: [
          {required: true, message: '请选择角色', trigger: 'change'}
        ],
        mobile: [
          {require: false}
        ]
      }
    }
  },
  methods: {
    async getGame(){
      const {data: res} = await this.$http.get('/api/api/games/list/one/'+this.$route.params.gameid)
      this.gameObj = res
      this.fastRecordForm.gameId = this.gameObj.gameId

      this.fastRecordForm.ruleId = this.gameObj.rulesList[0].rulesId
      this.fastRecordForm.platformId = this.gameObj.platformList[0].platformId
      this.fastRecordForm.emulator = '2'
    },
    async getUserInfo(){
      const {data: res} = await this.$http.get('/api/api/user/infos')
      this.userInfo = res.data
    },
    async send (){
      this.fastRecordForm.time = this.hour*3600000+this.min*60000+this.sec*1000+this.ms
      this.fastRecordForm.userId = this.userInfo.creId
      const {data: res} = await this.$http.post('/api/api/fastRecord/send/',this.fastRecordForm)
      if (res.flag){
        this.resetForm()
        return this.$message.success("提交成功")
      }
      return this.$message.error("提交失败")
    },
    resetForm () {
      this.$refs.frForm.resetFields()
    }
    // async getRuleList(){
    //   const {data: res} = await this.$http.get('/api/api/rules/list/all')
    //   this.ruleList = res.data
    // },
    // async getPlaList(){
    //   const {data: res} = await this.$http.get('/api/api/rules/list/all')
    //   this.ruleList = res.data
    // }

  },
  mounted() {
    this.getGame()
    this.getUserInfo()
    // this.getRuleList()
  }
}
</script>

<style scoped>

</style>
