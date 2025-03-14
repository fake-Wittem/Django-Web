<script>
import {Delete, DocumentAdd, Edit, Search, Tools} from "@element-plus/icons-vue";
import Dialog from "./components/Dialog.vue";
import {deleteRole, getRoleList} from "@/api/role/requests";
import {ElMessage} from "element-plus";
import MenuDialog from "./components/MenuDialog.vue";

export default {
  name: "RoleIndex",

  computed: {
    Edit() {
      return Edit
    },
    Tools() {
      return Tools
    },
    Delete() {
      return Delete
    },
    DocumentAdd() {
      return DocumentAdd
    },
    Search() {
      return Search
    }
  },

  components: {MenuDialog, Dialog},

  props: {},

  data() {
    return {
      tableData: [],
      // 查询时提交的数据
      queryForm: {
        // 查询条件
        query: '',
        pageNum: 1,
        pageSize: 10,
      },
      // 总记录数
      total: 0,
      // 批量删除按钮是否显示
      delBtnStatus: true,
      // 对话框是否显示
      dialogVisible: false,
      // 对话框标题
      dialogTitle: '',
      id: -1,
      multipleSelection: [],  // 批量选择角色
      menuDialogVisible: false,
    }
  },

  methods: {
    // 初始化角色列表
    async initRoleList() {
      const result = await getRoleList(this.queryForm)
      this.tableData = result?.roleList
      this.total = result?.total
    },

    // 检测当前用户是否为超级管理员
    checkAdmin(scope) {
      return scope.row.code !== 'admin'
    },

    // 当前页查询大小变化时
    handleSizeChange(pageSize) {
      this.queryForm.pageSize = pageSize
      // 跳回第一页
      this.queryForm.pageNum = 1
      this.initRoleList()
    },

    // 当前页变化时
    handleCurrentChange(pageNum) {
      this.queryForm.pageNum = pageNum
      this.initRoleList()
    },

    // 单元格数据格式化
    formatData(row, column, cellValue) {
      return cellValue || '/'
    },

    // 弹出对话框
    handleDialogValue(id) {
      // 传递角色ID并设置对话框标题
      if (id) {
        this.id = id
        this.dialogTitle = '角色修改'
      } else {
        this.id = -1
        this.dialogTitle = '角色添加'
      }
      // 显示对话框
      this.dialogVisible = true
    },

    // 表格勾选角色
    handleSelectionChange(selection) {
      this.multipleSelection = selection
      this.delBtnStatus = selection.length === 0
    },

    // 删除角色
    async handleDelete(id) {
      let ids = []
      if (id) {
        // 删除单个角色
        ids.push(id)
      } else {
        // 批量删除
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
      }
      await deleteRole(ids)
      ElMessage.success('删除成功！')
      await this.initRoleList()
    },

    // 弹出菜单对话框
    handleMenuDialogValue(roleId) {
      if (roleId) {
        // 传递角色ID
        this.id = roleId
      }
      // 打开对话框
      this.menuDialogVisible = true
    }
  },

  mounted() {
    this.initRoleList()
  },
}
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入角色名..." clearable v-model="queryForm.query"></el-input>
      </el-col>

      <el-button type="primary" :icon="Search" @click="initRoleList">搜索</el-button>

      <el-button type="info" :icon="DocumentAdd" @click="handleDialogValue(null)">新增</el-button>

      <el-popconfirm title="您确定批量删除这些记录吗？" @confirm="handleDelete(null)">
        <template #reference>
          <el-button type="danger" :disabled="delBtnStatus" :icon="Delete">批量删除</el-button>
        </template>
      </el-popconfirm>

    </el-row>

    <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection"/>

      <el-table-column prop="name" label="角色名" align="center" :formatter="formatData"/>

      <el-table-column prop="code" label="权限字符" align="center" :formatter="formatData"/>

      <el-table-column prop="create_time" label="创建时间" align="center" :formatter="formatData"/>

      <el-table-column prop="remark" label="备注" :formatter="formatData"/>

      <el-table-column prop="action" label="操作" width="300" fixed="right" align="center">
        <template #default="scope">
          <el-button
              link
              type="primary"
              :icon="Tools"
              @click="handleMenuDialogValue(scope.row.id)"
          >
            分配权限
          </el-button>

          <el-divider v-if="checkAdmin(scope)" direction="vertical"/>

          <el-button
              link
              type="info"
              v-if="checkAdmin(scope)"
              :icon="Edit"
              @click="handleDialogValue(scope.row.id)"
          />

          <el-divider v-if="checkAdmin(scope)" direction="vertical"/>

          <el-popconfirm
              v-if="checkAdmin(scope)"
              title="您确定要删除这条记录吗？"
              @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button link type="danger" :icon="Delete"/>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>

    </el-table>

    <el-pagination
        v-model:current-page="queryForm.pageNum"
        v-model:page-size="queryForm.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />

    <Dialog
        :id="id"
        v-model:dialog-visible="dialogVisible"
        :dialog-title="dialogTitle"
        @initRoleList="initRoleList"
    ></Dialog>

    <MenuDialog
        :id="id"
        v-model:menu-dialog-visible="menuDialogVisible"
        @initRoleList="initRoleList"
    ></MenuDialog>

  </div>
</template>

<style scoped lang="scss">
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

.el-pagination {
  float: right;
  padding: 20px;
  box-sizing: border-box;
}

:deep(th.el-table__cell) {
  word-break: break-word;
  background-color: #eeeeee !important;
  color: #515a6e;
  height: 40px;
  font-size: 13px;
}

.el-tag--small {
  margin-left: 5px;
}
</style>