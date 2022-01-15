<template>
  <div>
    <!--   面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>普通用户信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--     搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入用户编号或者名称" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search">
            </el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-circle-plus-outline" plain round @click="drawer = true">新增用户
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border stripe>
        <el-table-column type="expand">
          <template scope="scope">
            <el-row>
              <el-col :span="1"> <el-tag style="margin-left: 5px" size="small">模块</el-tag></el-col>
              <el-col :span="23">
                <el-tree :data="scope.row.moduleTreeList" :props="defaultProps1" empty-text="暂无模块">
                </el-tree>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
       <el-table-column prop="userId" label="编号"></el-table-column>
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
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <!--           修改按钮-->
            <el-button type="primary" icon="el-icon-edit" plain round size="mini" @click="handleEdit(scope.row)"></el-button>
            <!--           删除按钮-->
            <el-button type="danger" icon="el-icon-delete" plain round size="mini"  ></el-button>
            <el-button type="warning" size="mini" plain round icon="el-icon-setting" @click="showSetRightDialog(scope.row.moduleTreeList,scope.row.userId)">分配权限</el-button>
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
          <el-form-item>
            <el-button type="primary" @click="addAdmin()">立即添加</el-button>
            <el-button @click="resetForm('addFormRef')" type="warning">重置</el-button>
            <el-button @click="drawer = false">取消</el-button>
          </el-form-item>

        </el-form>
      </div>

    </el-drawer>
    <el-drawer
        title="修改系统用户"
        :visible.sync="editDrawer"
        :direction="direction"
        custom-class="demo-drawer"
        :destroy-on-close="true"
        @close="resetForm('editFormRef')"
        :before-close="handleClose">
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
            <el-button type="primary" @click="editUser()">立即修改</el-button>
            <el-button @click="resetForm('editFormRef')" type="warning">重置</el-button>
            <el-button @click="editDrawer = false">取消</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-drawer>
    <el-drawer
        title="分配权限"
        :visible.sync="authDrawer"
        :direction="direction"
        custom-class="demo-drawer"
        :destroy-on-close="true"
        @close="restRoleAuthorizationObj()"
        :before-close="handleClose">
      <div class="demo-drawer__content">
        <el-form  label-width="20px">
          <el-form-item >
            <el-tree :data="moduleList" :props="defaultProps" style="border: 0 solid #000000;margin-right: 20px;border-radius: 2%; box-shadow: 0 0 10px #ddd;" show-checkbox
                     node-key="moduleId" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree></el-form-item>
          <el-form-item>
            <el-button type="primary" @click="allotRights">确 定</el-button>
            <el-button @click="authDrawer = false">取 消</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "UserManger",
  data() {
    return {
      userList: [],
      defKeys: [],
      moduleList: [],
      total: 0,
      drawer: false,
      editDrawer: false,
      authDrawer: false,
      direction: 'rtl',
      userId: '',
      userAuthorizationObj: {
        userId: '',
        moduleIdList: []
      },
      addForm: {
        account: '',
        username: '',
        password: '',
        email: '',
        mobile: '',
        status: "1",
      },
      editForm: {
        userId: '',
        account: '',
        username: '',
        password: '',
        email: '',
        mobile: '',
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
        mobile: [
          {require: false}
        ],
        status: [{require: true,message:"请选择状态",trigger: 'change'}]
      },
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 5,
        keyword: ""
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultProps1: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    async getUserList() {
      // 获取用户列表
      const {data: res} = await this.$http.post('/api/api/user/list/page', this.queryInfo)
      this.total = res.data.total
      this.userList = res.data.list
    },
    addAdmin (){
      this.$refs.addFormRef.validate(async valid =>{
        if (!valid) return
        this.$http.post("/api/api/user/add",this.addForm).then((res)=>{
          this.$message.success("新增"+res.data.message);
          this.drawer=false;
          this.getUserList();
        }).catch((err)=>{
          console.log(err)
        })
      })
    },
    editUser(){
      this.$refs.editFormRef.validate(async valid =>{
        if (!valid) return
        this.$http.put("/api/api/user/edit",this.editForm).then((res)=>{
          this.$message.success("修改"+res.data.message);
          this.editDrawer=false;
          this.getUserList();
        }).catch((err)=>{
          console.log(err)
        })
      })
    },
    async allotRights() {
      let keys = []
      this.userAuthorizationObj.userId = this.userId
      this.$refs.treeRef.getCheckedKeys().forEach(item => {
        keys.push(item)
      })
      this.$refs.treeRef.getHalfCheckedKeys().forEach(item => {
        keys.push(item)
      })
      this.userAuthorizationObj.moduleIdList = keys
      console.log(this.userAuthorizationObj.moduleIdList)
      const {data: res} = await this.$http.post('/api/api/user/module', this.userAuthorizationObj)
      if (res.flag !== true) {
        return this.$message.error('分配权限失败')
      }
      this.$message.success('分配权限成功')
      await this.getUserList()
      this.authDrawer = false
    },
    async handleEdit(row){
      this.editDrawer=true;
      const { data: res } = await this.$http.get("/api/api/user/list/one/"+row.userId)
      res.data.status = res.data.status + ''
      this.editForm = res.data
    },
    async showSetRightDialog(role,userId){
      this.userId = userId
      this.defKeys = []
      // 获取所有权限的数据
      const { data: res } = await this.$http.get('/api/api/module/list/all/tree')
      this.moduleList = res.data
      // 递归获取三级节点的id
      if(role.length !== 0) {
        this.getLeaf(role)
      }

      this.authDrawer = true
    },
    // 监听 pageSize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    // 监听 pageNum 的改变
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getUserList()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    restRoleAuthorizationObj (){
      this.moduleList = [],
      this.userAuthorizationObj.userId = ''
      this.userAuthorizationObj.moduleIdList = []
    },
    getLeaf (data) {
      data.forEach(item => {
        if (item.children.length === 0 ) {
          return  this.defKeys.push(item.id)
        } else {
          return  this.getLeaf(item.children)
        }
      })
    }
  },
  mounted() {
    this.getUserList()
  }

}
</script>

<style scoped>

</style>
