<template>
<div>
  <!--   面包屑导航区域-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/admin/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
    <el-breadcrumb-item>系统用户基本信息管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <!--     搜索与添加区域-->
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入用户编号或者姓名"  class="input-with-select"  clearable >
          <el-button slot="append" icon="el-icon-search" >
          </el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-circle-plus-outline" plain round @click="drawer = true">新增用户</el-button>
      </el-col>
    </el-row>
<!--    表格区域-->
    <el-table :data="adminList"  stripe>
      <el-table-column label="编号" prop="adminId"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="账户名" prop="account"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="手机" prop="mobile"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.status === 1 ? 'success' : 'danger'"
              disable-transitions>{{scope.row.status===1 ? '使用中':'禁用中'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">
          <el-tag style="margin: 5px" type="primary" v-for="role in scope.row.roleList" :key="role.roleId"
              disable-transitions>{{ role.roleName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
      <template>
        <!--           修改按钮-->
        <el-button type="primary" icon="el-icon-edit" round size="mini" ></el-button>
        <!--           删除按钮-->
        <el-button type="danger" icon="el-icon-delete" round size="mini" ></el-button>
      </template>
      </el-table-column>

    </el-table>
    <!--     分页区域-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 2, 5, 10, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </el-card>
  <el-drawer
      title="新增系统用户"
      :visible.sync="drawer"
      :direction="direction"
      custom-class="demo-drawer"
      :before-close="handleClose">
    <div class="demo-drawer__content">
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="90px">
        <el-form-item label="账户" prop="account">
          <el-input v-model="addForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input  v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email"  v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="name">
          <el-input  v-model="addForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select v-model="addForm.roleList" multiple placeholder="请选择"></el-select>
        </el-form-item>
        <el-form-item label="状态" prop="roles">
          <el-switch v-model="addForm.status"
                     active-value="1"
                     inactive-value="0"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     active-text="使用中"
                     disabled
                     ></el-switch>
        </el-form-item>

      </el-form>
    </div>

  </el-drawer>
</div>
</template>

<script>
export default {
  name: "AdminManger",
  data () {
    return {
      adminList: [],
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 5,
        keyword: ""
      },
      addForm: {
        account: '',
        username: '',
        password: '',
        email: '',
        mobile: '',
        roleList: [],
        status: "1",
      },
      addFormRules: {
        account: [
          {required: true, message: '请输入账户', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {max: 16,min: 8,message: "长度在8~16个字符之间",trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        roles: [
          {required: true, message: '请选择角色', trigger: 'change'}
        ],
      },
      total: 0,
      drawer: false,
      direction: 'rtl'
    }
  },
  methods:{
    async getAdminList (){
      // 获取电影列表
      const { data: res } = await this.$http.post('/api/api/admin/list/page',this.queryInfo)
      console.log(res)
      this.total = res.data.total
      this.adminList = res.data.list
    },
    // 监听 pageSize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getAdminList()
    },
    // 监听 pageNum 的改变
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getAdminList()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {});
    }

  },
  mounted() {
    this.getAdminList()
  }
}
</script>

<style scoped>
.demo-drawer__content{
  margin: 10px;
}
</style>