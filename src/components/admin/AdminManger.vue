<template>
<div>
  <!--   面包屑导航区域-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/admin/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
    <el-breadcrumb-item>系统用户信息管理</el-breadcrumb-item>
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
    <el-table :data="adminList"  stripe border>
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
          <el-tag style="margin: 5px" type="primary" v-for="role in scope.row.roleList" :key="role.roleId+'s3'"
              disable-transitions>{{ role.roleName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
      <template slot-scope="scope">
        <!--           修改按钮-->
        <el-button type="primary" icon="el-icon-edit" plain round size="mini" @click="handleEdit(scope.row)"></el-button>
        <!--           删除按钮-->
        <el-button type="danger" icon="el-icon-delete" plain round size="mini"  @click="deleteAdmin(scope.$index, scope.row)"></el-button>
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
<!--  添加-->
  <el-drawer
      title="新增系统用户"
      :visible.sync="drawer"
      :direction="direction"
      custom-class="demo-drawer"
      :destroy-on-close="true"
      @close="resetForm('addFormRef')"
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
        <el-form-item label="联系电话" prop="mobile">
          <el-input  v-model="addForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleList">
          <el-select v-model="addForm.roleList" multiple  placeholder="请选择">
            <el-option :value="role.roleId" :label="role.roleName"  :key="role.roleId+'s2'" v-for="role in rolesList">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  prop="roles">
          <el-switch v-model="addForm.status"
                     active-value="1"
                     inactive-value="0"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     active-text="使用中"
                     disabled
                     ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addAdmin()">立即添加</el-button>
          <el-button @click="resetForm('addFormRef')" type="warning">重置</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </el-form-item>

      </el-form>
    </div>

  </el-drawer>
  <!--  删除-->
  <el-drawer
      title="修改系统用户"
      :visible.sync="editDrawer"
      :direction="direction"
      custom-class="demo-drawer"
      :destroy-on-close="true"
      @close="resetForm('editFormRef')"
      :before-close="handleEditClose">
    <div class="demo-drawer__content">
      <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="90px">
        <el-form-item label="账户" prop="account">
          <el-input v-model="editForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input  v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email"  v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input  v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleList">
          <el-select v-model="editForm.roleList" multiple  placeholder="请选择">
            <el-option :value="role.roleId" :label="role.roleName"  :key="index+'1s'" v-for="(role,index) in rolesList">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="editForm.status"
                     active-value="1"
                     inactive-value="0"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     active-text="使用"
                     inactive-text="禁用"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editAdmin()">立即修改</el-button>
          <el-button @click="resetForm('editFormRef')" type="warning">重置</el-button>
          <el-button @click="editDrawer = false">取消</el-button>
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
      rolesList: [],
      oldRoleList: [],
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
      editForm: {
        adminId: '',
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
        roleList: [
          { required: true, message: '请选择角色', trigger: 'change'}
        ],
        mobile: [
          {require: false}
        ]
      },
      editFormRules: {
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
        roleList: [
          { required: true, message: '请选择角色', trigger: 'change'}
        ],
        mobile: [
          {require: false}
        ],
        status: [{require: true,message:"请选择状态",trigger: 'change'}]
      },
      total: 0,
      drawer: false,
      editDrawer: false,
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
    async getRoleList() {
      const { data: res } = await this.$http.get('/api/api/role/list/all')
      this.rolesList = res.data
    },
    addAdmin (){
      this.$refs.addFormRef.validate(async valid =>{
        if (!valid) return
        this.$http.post("/api/api/admin/add",this.addForm).then((res)=>{
          this.$message.success("新增"+res.data.message);
          this.drawer=false;
          this.getAdminList();
        }).catch((err)=>{
          console.log(err)
        })
      })
    },
    editAdmin(){
      this.$refs.editFormRef.validate(async valid =>{
        if (!valid) return
        this.$http.put("/api/api/admin/edit",this.editForm).then((res)=>{
          this.$message.success("修改"+res.data.message);
          this.editDrawer=false;
          this.getAdminList();
        }).catch((err)=>{
          console.log(err)
        })
      })
    },
    async deleteAdmin (index,row) {
      // 询问用户是否删除
      const confirmResult = await this.$confirm('你确定要永久删除这个系统用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果用户确定删除，则返回confirm字符串
      if (confirmResult !== 'confirm') {
        return this.$message.info('您已取消删除')
      }
      this.$http.delete('/api/api/admin/del/' + row.adminId).then((res)=>{
        if (res.data.flag) this.$message.success('删除'+res.data.message)
        this.$message.error('删除'+res.data.message+" "+res.data.data)
        this.getAdminList()
      }).catch()
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
            this.resetForm('addFormRef')
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {});
    },
    handleEditClose(done) {
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            this.resetForm('editFormRef')
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {});
    },
    async handleEdit(row){
      this.editDrawer=true;
      const { data: res } = await this.$http.get("/api/api/admin/list/one/"+row.adminId)
      res.data.status = res.data.status + ""
      // 取出完整role对象
      let roleListCom = res.data.roleList
      // 将表单中的设为空
      res.data.roleList = []
      // 循环完整role对象 只取roleId放入list中
      roleListCom.forEach((value => {
        res.data.roleList.push(value.roleId)
      }))
      this.editForm = res.data

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }

  },
  mounted() {
    this.getAdminList()
    this.getRoleList()
  }
}
</script>

<style scoped>
.demo-drawer__content{
  margin: 10px;
}
</style>
