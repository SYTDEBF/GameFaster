<template>
  <div class="container">
    <div class="form-warp">
      <form class="sign-in-form">
        <h2 class="form-title">登录</h2>
        <el-form ref="loginFormRef" :model="loginForm" label-width="0px"  :rules="loginFormRules" class="login_form">
          <!--       用户名-->
          <el-form-item prop="account">
            <el-input v-model="loginForm.account" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <!--       密码-->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password"  type="password" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <!--       按钮-->
          <el-form-item class="btns">
            <el-button type="primary" plain @click="login">登录</el-button>
            <el-button type="info" plain  @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </form>
      <form class="sign-up-form">
        <h2 class="form-title">注册</h2>
        <input placeholder="用户名" />
        <input type="password" placeholder="密码" />
        <div class="submit-btn">立即注册</div>
      </form>
    </div>
    <div class="desc-warp">
      <div class="desc-warp-item sign-up-desc">
        <div class="content">
          <button id="sign-up-btn">注册</button>
        </div>
        <img src="../assets/img/log.svg" alt="">
      </div>
      <div class="desc-warp-item sign-in-desc">
        <div class="content">
          <button id="sign-in-btn">登录</button>
        </div>
        <img src="../assets/img/register.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/style.css'
export default {
  name: "Login",
  data () {
    return {
      loginForm: {
        account: '123@qq.com',
        password: '123456'
      },
      loginFormRules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      },
    }
  },
  methods:{
    init(){
      const singUpBtn = document.querySelector('#sign-up-btn')
      const singInBtn = document.querySelector('#sign-in-btn')
      const container = document.querySelector('.container')

      singUpBtn.addEventListener('click', () => {
        container.classList.add('sign-up-mode')
      })
      singInBtn.addEventListener('click', () => {
        container.classList.remove('sign-up-mode')
      })
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/api/api/login/user', this.loginForm)
        console.log(res)
        if (res.flag === false) {
          return this.$message.error(res.data)
        }
        this.$message.success('登录成功')
        window.sessionStorage.setItem('isLogin','yes')
        const { data: res1 } = await this.$http.get('/api/api/user/infos')
        window.sessionStorage.setItem('uid',res1.data.creId)
        await this.$router.push('/')
      })
    },
    // 重置表单
    resetLoginForm () {
      console.log(this.$refs.loginFormRef)
      this.$refs.loginFormRef.resetFields()
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
