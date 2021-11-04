<template>
  <div class="login_container">
    <div class="left_box">
      <p>最速传说</p>
      <img :src='url' alt="">
    </div>
    <div class="right_box">
      <div class="login_box">
        <h2>登录</h2>
        <!--     :rules="loginFormRules" bi表单数据验证-->
        <el-form ref="loginFormRef" :model="loginForm" label-width="0px"  :rules="loginFormRules" class="login_form">
          <!--       用户名-->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <!--       密码-->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password"  type="password" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <!--       按钮-->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      },
      url: require('../assets/img/fang1.png')
    }
  },
  created () {
  },
  methods: {
    login () {
      // this.$refs.loginFormRef.validate(async valid => {
      //   if (!valid) return
      //   const { data: res } = await this.$http.post('/api/login', this.loginForm)
      //   if (res.code === 1001) {
      //     return this.$message.error('用户名或密码错误')
      //   }
      //   this.$message.success('登录成功')
      //   window.sessionStorage.setItem('token', res.data.token)
      //   window.sessionStorage.setItem('aid', res.data.id)
      //   window.sessionStorage.setItem('aun', res.data.username)
      //   console.log(res.data.token)
      //   await this.$router.push('/home')
      // })
    },
    // 重置表单
    resetLoginForm () {
      console.log(this.$refs.loginFormRef)
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: yellowgreen;
  height: 100%;
  display: flex;
}
.left_box{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 50%;
  img {
    width: 55%;
    width: 55%;
  }
}
p{
  font-weight: lighter;
  font-size: 2em;
}
.right_box{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
}

.login_box{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 10px #ddd;
}
.btns {
  display: flex;
  justify-content: center;
}
</style>
