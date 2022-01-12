<template>
<div>
  <!--   面包屑导航区域-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/admin/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
    <el-breadcrumb-item>系统角色信息管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <!--     搜索与添加区域-->
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入角色编号或者名称"  class="input-with-select"  clearable >
          <el-button slot="append" icon="el-icon-search" >
          </el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-circle-plus-outline" plain round @click="drawer = true">新增角色</el-button>
      </el-col>
    </el-row>
    <el-table :data="roleList" border stripe>
      <el-table-column type="expand">
        <template scope="scope">
          <el-row>
            <el-col :span="1"> <el-tag style="margin-left: 5px" size="small">模块</el-tag></el-col>
            <el-col :span="23">
              <el-tree :data="scope.row.moduleTreeList" :props="defaultProps" empty-text="暂无模块" @node-click="handleNodeClick">
              </el-tree>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="roleId"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="英文名称" prop="roleEn"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="操作" >
        <template scope="scope">
          <el-button type="primary" size="mini" plain round icon="el-icon-edit" :key="scope.row.id"></el-button>
          <el-button type="danger" size="mini" plain round icon="el-icon-delete"></el-button>
          <el-button type="warning" size="mini" plain round icon="el-icon-setting" @click="showSetRightDialog(scope.row.moduleTreeList,scope.row.roleId)">分配权限</el-button>
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
      title="分配权限"
      :visible.sync="drawer"
      :direction="direction"
      custom-class="demo-drawer"
      :destroy-on-close="true"
      @close="moduleList = [],restRoleAuthorizationObj"
      :before-close="handleClose">
    <div class="demo-drawer__content">
      <el-form  label-width="20px">
        <el-form-item >
          <el-tree :data="moduleList" :props="defaultProps" style="border: 0px solid #000000;margin-right: 20px;border-radius: 2%; box-shadow: 0 0 10px #ddd;" show-checkbox
                                node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="allotRights">确 定</el-button>
          <el-button @click="drawer = false">取 消</el-button>
        </el-form-item>
      </el-form>


    </div>
  </el-drawer>
</div>
</template>

<script>
export default {
  name: "RoleManger",
  data () {
    return {
      roleList:[],
      moduleList: [],
      // 默认选定的数组的Id值
      defKeys: [],
      total: 0,
      roleId: '',
      direction: 'rtl',
      drawer: false,
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 5,
        keyword: ""
      },
      roleAuthorizationObj: {
        roleId: '',
        moduleIdList: []
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    async getRoleList (){
      // 获取角色列表
      const { data: res } = await this.$http.post('/api/api/role/list/page',this.queryInfo)
      console.log("roleList"+res)
      this.total = res.data.total
      this.roleList = res.data.list
    },
    // 点击为角色分配角色
    async allotRights () {
      let keys = []
      this.roleAuthorizationObj.roleId = this.roleId
      this.$refs.treeRef.getCheckedKeys().forEach(item =>{
        keys.push(item)
      })
      this.$refs.treeRef.getHalfCheckedKeys().forEach(item =>{
        keys.push(item)
      })
      this.roleAuthorizationObj.moduleIdList = keys
      console.log(this.roleAuthorizationObj.moduleIdList)
      const { data: res } = await this.$http.post('/api/api/role/module',this.roleAuthorizationObj)
      if (res.flag !== true) {
        return this.$message.error('分配权限失败')
      }
      this.$message.success('分配权限成功')
      await this.getRoleList()
      this.drawer = false
    },
    // 监听 pageSize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getRoleList()
    },
    // 监听 pageNum 的改变
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getRoleList()
    },
    async showSetRightDialog(role,roleId){
      this.roleId = roleId
      this.defKeys = []
      // 获取所有权限的数据
      const { data: res } = await this.$http.get('/api/api/module/list/all/tree')
      this.moduleList = res.data
      // 递归获取三级节点的id
      if(role.length !== 0) {
        this.getLeaf(role)
      }

      this.drawer = true
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleClose (done){
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {});
    },
    restRoleAuthorizationObj (){
      this.roleAuthorizationObj.roleId = ''
      this.roleAuthorizationObj.moduleIdList = []
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
    this.getRoleList()
  }

}
</script>

<style scoped>
.demo-drawer__content{

}
</style>
