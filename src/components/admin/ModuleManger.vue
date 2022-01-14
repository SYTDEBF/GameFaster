<template>
  <div>
    <!--   面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>系统模块信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--     搜索与添加区域-->
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">
          <i class="el-icon-warning-outline" style="margin-top: 2px;margin-right: 5px"></i>
            <span>注意，此页面数据为系统核心数据，随意修改可能会造成系统无法正常运行</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="7">
          <el-input placeholder="请输入模块编号或者名称" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search">
            </el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-circle-plus-outline" plain round @click="drawer = true,getModuleList()">新增模块
          </el-button>
        </el-col>
      </el-row>
      <el-table border stripe :data="moduleTreeList"
                :default-expand-all="false"
                row-key="moduleId"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">>
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column prop="moduleId" label="编号" >
        </el-table-column>
        <el-table-column prop="name" label="名称" >
        </el-table-column>
        <el-table-column prop="url" label="路径或接口地址" >
        </el-table-column>
        <el-table-column  label="权限" >
          <template slot-scope="scope">
            <el-tag style="margin: 5px" :key="perm" v-for="perm in scope.row.perms.split(',')">{{perm}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="级别" >
          <template slot-scope="scope">
            <el-tag :type="typeColorList[scope.row.type-1]">{{typeList[scope.row.type-1]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="图标" >
          <template slot-scope="scope">
            <i :class="scope.row.icon" style="font-size: 20px"></i>
          </template>
        </el-table-column>
        <el-table-column  label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain round icon="el-icon-edit" @click="handleEdit(scope.row),getModuleList()" :key="scope.row.id"></el-button>
            <el-button type="danger" size="mini" plain round icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--     分页区域-->
    </el-card>
    <el-drawer
        title="添加模块"
        :visible.sync="drawer"
        :direction="direction"
        custom-class="demo-drawer"
        :destroy-on-close="true"
        @close="resetForm('addFormRef')"
        :before-close="handleClose">
      <div class="demo-drawer__content">
        <el-form ref="addFormRef" :model="addForm" :rules="addFormRule" label-width="90px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="父模块" prop="parentId" >
            <el-select  v-model="addForm.parentId" filterable placeholder="请选择父模块">
              <el-option value="0" label="根节点"></el-option>
              <el-option :key="module.moduleId" :value="module.moduleId" :label="module.name" v-for="module in moduleList"></el-option>
            </el-select>
            <!--          <el-cascader-->
            <!--              v-model="addForm.parentId"-->
            <!--              :options="moduleTreeList"-->
            <!--              :props="{ expandTrigger: 'hover',label: 'name',value: 'moduleId' }"-->
            <!--              ></el-cascader>-->
          </el-form-item>
          <el-form-item label="路径" prop="url">
            <el-input v-model="addForm.url" placeholder="没有请写无"></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="perms">
            <el-select v-model="addForm.perms"  allow-create multiple filterable default-first-option placeholder="请输入权限">
            </el-select>
          </el-form-item>
          <el-form-item label="等级" prop="type">
            <el-select v-model="addForm.type"  placeholder="请选择模块等级">
              <el-option value="1" label="一级模块"></el-option>
              <el-option value="2" label="二级模块"></el-option>
              <el-option value="3" label="三级模块"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input v-model="addForm.icon"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="orderNum">
            <el-input-number v-model="addForm.orderNum" controls-position="right" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addModule()">立即添加</el-button>
            <el-button @click="resetForm('addFormRef')" type="warning">重置</el-button>
            <el-button @click="drawer = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-drawer>
    <el-drawer
        title="编辑模块"
        :visible.sync="editDrawer"
        :direction="direction"
        custom-class="demo-drawer"
        :destroy-on-close="true"
        @close="resetForm('editFormRef')"
        :before-close="handleClose">
      <div class="demo-drawer__content">
        <el-form ref="editFormRef" :model="editForm" :rules="addFormRule" label-width="90px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="父模块" prop="parentId" >
            <el-select  v-model="editForm.parentId" filterable placeholder="请选择父模块">
              <el-option  value="0" label="根节点"></el-option>
              <el-option :key="module.moduleId" :value="module.moduleId" :label="module.name" v-for="module in moduleList"></el-option>
            </el-select>
            <!--          <el-cascader-->
            <!--              v-model="addForm.parentId"-->
            <!--              :options="moduleTreeList"-->
            <!--              :props="{ expandTrigger: 'hover',label: 'name',value: 'moduleId' }"-->
            <!--              ></el-cascader>-->
          </el-form-item>
          <el-form-item label="路径" prop="url">
            <el-input v-model="editForm.url" placeholder="没有请写无"></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="perms">
            <el-select v-model="editForm.perms"  allow-create multiple filterable default-first-option placeholder="请输入权限">
            </el-select>
          </el-form-item>
          <el-form-item label="等级" prop="type">
            <el-select v-model="editForm.type"  placeholder="请选择模块等级">
              <el-option value="1" label="一级模块"></el-option>
              <el-option value="2" label="二级模块"></el-option>
              <el-option value="3" label="三级模块"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input v-model="editForm.icon"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="orderNum">
            <el-input-number v-model="editForm.orderNum" controls-position="right" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editModule()">立即修改</el-button>
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
  name: "ModuleManger",
  data() {
    return {
      total: 0,
      drawer: false,
      editDrawer: false,
      direction: 'rtl',
      moduleTreeList: [],
      moduleList: [],
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 5,
        keyword: ""
      },
      typeList: ['一级模块','二级模块','三级模块'],
      typeColorList: ['danger','warning','info'],
      addForm: {
        parentId: '',
        name: '',
        url: '无',
        perms: ['无'],
        type:'',
        icon: '',
        orderNum: ''
      },
      editForm: {
        moduleId: '',
        parentId: '',
        name: '',
        url: '无',
        perms: ['无'],
        type:'',
        icon: '',
        orderNum: ''
      },
      addFormRule: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        parentId: [
          {required: true, message: '请选择父模块', trigger: 'change'}
        ],
        url: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择等级', trigger: 'change'}
        ],
        icon: [
          {required: false}
        ],
        perms: [
          {required: false}
        ],
        orderNum: [
          {required: false}
        ]
      },
      editFormRule: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        parentId: [
          {required: true, message: '请选择父模块', trigger: 'change'}
        ],
        url: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择等级', trigger: 'change'}
        ],
        icon: [
          {required: false}
        ],
        perms: [
          {required: false}
        ],
        orderNum: [
          {required: false}
        ]
      }
    }
  },
  methods: {
    async getModuleTreeList(){
      const { data: res } = await this.$http.get('/api/api/module/list/all/tree')
      this.moduleTreeList = res.data
    },
    async getModuleList(){
      const { data: res } = await this.$http.get('/api/api/module/list/all')
      this.moduleList = res.data
    },
    async addModule (){
      await this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        this.addForm.perms = this.addForm.perms.toString()
        console.dir(this.addForm)
        this.$http.post("/api/api/module/add", this.addForm).then((res) => {
          this.$message.success("新增" + res.data.message);
          this.drawer = false;
          this.getModuleTreeList();
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    async editModule (){
      await this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        if (this.editForm.moduleId === this.editForm.parentId)
          return this.$message.warning("父模块不能是他自己")
        this.editForm.perms = this.editForm.perms.toString()
        console.dir(this.editForm)
        this.$http.put("/api/api/module/edit", this.editForm).then((res) => {
          this.$message.success("修改" + res.data.message);
          this.editDrawer = false;
          this.getModuleTreeList();
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    async handleEdit(row){
      this.editDrawer=true;
      const { data: res } = await this.$http.get("/api/api/module/list/one/"+row.moduleId)
      res.data.perms = res.data.perms.split(',')
      res.data.type = res.data.type+''
      if (res.data.parentId === 0)
        res.data.parentId = res.parentId = '0'
      this.editForm = res.data

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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.getModuleTreeList()
  }

}
</script>

<style scoped>
.grid-content {
  border-radius: 4px;
  border: 1px #fbc4c4 solid;
  min-height: 36px;
  color: #f56c6c;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.bg-purple {
  background: #fef0f0;
}
.demo-drawer__content{
  margin: 10px;
}
</style>
