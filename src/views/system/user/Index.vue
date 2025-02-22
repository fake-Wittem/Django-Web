<script>
import requestUtil, {getServerUrl} from "@/util/request";
import {ElMessage} from "element-plus";
import {Delete, DocumentAdd, Edit, RefreshRight, Search, Tools} from "@element-plus/icons-vue";
import Dialog from './components/Dialog.vue'
import RoleDialog from "./components/RoleDialog.vue";

export default {
  name: "UserIndex",
  components: {
    RoleDialog,
    Dialog,
  },

  computed: {
    DocumentAdd() {
      return DocumentAdd
    },
    Delete() {
      return Delete
    },
    Edit() {
      return Edit
    },
    RefreshRight() {
      return RefreshRight
    },
    Tools() {
      return Tools
    },
    Search() {
      return Search
    }
  },

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
      // 对话框是否显示
      dialogVisible: false,
      // 对话框标题
      dialogTitle: '',
      id: -1,
      // 批量删除按钮是否显示
      delBtnStatus: true,
      // 表格多选内容
      multipleSelection: [],
      // 单用户的角色列表
      roleList: [],
      // 分配角色对话框是否显示
      roleDialogVisible: false,
    }
  },

  methods: {
    getServerUrl,

    // 初始化获取用户列表
    async initUserList() {
      const resp = await requestUtil.post("user/list", this.queryForm)
      const data = resp.data
      if (data.code !== 200) {
        ElMessage.error(data?.info ?? data)
        return
      }
      this.tableData = data?.userList
      this.total = data?.total
    },

    // 当前页查询大小变化时
    handleSizeChange(pageSize) {
      this.queryForm.pageSize = pageSize
      // 跳回第一页
      this.queryForm.pageNum = 1
      this.initUserList()
    },

    // 当前页变化时
    handleCurrentChange(pageNum) {
      this.queryForm.pageNum = pageNum
      this.initUserList()
    },

    // 单元格数据格式化
    formatData(row, column, cellValue) {
      return cellValue || '/'
    },

    // 弹出对话框
    handleDialogValue(id) {
      // 传递用户ID并设置对话框标题
      if (id) {
        this.id = id
        this.dialogTitle = '用户修改'
      } else {
        this.id = -1
        this.dialogTitle = '用户添加'
      }
      // 显示对话框
      this.dialogVisible = true
    },

    // 表格多选事件
    handleSelectionChange(selection) {
      this.multipleSelection = selection
      this.delBtnStatus = selection.length === 0
    },

    // 删除用户
    async handleDelete(id) {
      let ids = []
      if (id) {
        // 删除单个用户
        ids.push(id)
      } else {
        // 批量删除
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
      }
      const resp = await requestUtil.del('user/action', ids)
      const data = resp.data
      if (data.code !== 200) {
        ElMessage.error(data?.info ?? data)
        return
      }
      ElMessage.success('删除成功！')
      await this.initUserList()
    },

    // 重置密码
    async handleResetPassword(id) {
      const resp = await requestUtil.get('user/reset_password?id=' + id)
      const data = resp.data
      if (data.code !== 200) {
        ElMessage.error(data?.info ?? data)
        return
      }
      ElMessage.success('操作成功！')
      await this.initUserList()
    },

    // 用户状态变更
    async statusChangeHandle(row) {
      const resp = await requestUtil.post('user/update_status', {id: row.id, status: row.status})
      const data = resp.data
      if (data.code !== 200) {
        ElMessage.error(data?.info ?? data)
        return
      }
      ElMessage.success('操作成功！')
      await this.initUserList()
    },

    // 打开分配角色对话框
    handleRoleDialogValue(id, roleList) {
      this.id = id
      this.roleList = roleList
      this.roleDialogVisible = true
    }

  },

  mounted() {
    this.initUserList()
  },
}
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入用户名..." clearable v-model="queryForm.query"></el-input>
      </el-col>

      <el-button type="primary" :icon="Search" @click="initUserList">搜索</el-button>

      <el-button type="info" :icon="DocumentAdd" @click="handleDialogValue(null)">新增</el-button>

      <el-popconfirm title="您确定批量删除这些记录吗？" @confirm="handleDelete(null)">
        <template #reference>
          <el-button type="danger" :disabled="delBtnStatus" :icon="Delete">批量删除</el-button>
        </template>
      </el-popconfirm>

    </el-row>

    <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>

      <el-table-column prop="avatar" label="头像" width="80" align="center">
        <template #default="scope">
          <img
              :src="getServerUrl()+'media/userAvatar/'+scope.row.avatar"
              width="50"
              height="50"
              style="border-radius: 5%"
              alt="">
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名" width="100" align="center" :formatter="formatData"/>

      <el-table-column prop="roles" label="拥有角色" width="200" align="center">
        <template #default="scope">
          <el-tag size="small" type="primary" v-for="item in scope.row.roles">{{ item.name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="email" label="邮箱" width="200" align="center" :formatter="formatData"/>

      <el-table-column prop="phone_number" label="手机号" width="120" align="center" :formatter="formatData"/>

      <el-table-column prop="status" label="状态" width="200" align="center">
        <template #default={row}>
          <el-switch
              v-model="row.status"
              @change="statusChangeHandle(row)"
              active-text="正常"
              inactive-text="禁用"
              :active-value="1"
              :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="create_time" label="创建时间" width="200" align="center" :formatter="formatData"/>

      <el-table-column prop="login_time" label="最后登录时间" width="200" align="center" :formatter="formatData"/>

      <el-table-column prop="remark" label="备注" :formatter="formatData"/>

      <el-table-column prop="action" label="操作" width="400" fixed="right" align="center">
        <template #default="scope">
          <el-button type="primary" :icon="Tools" @click="handleRoleDialogValue(scope.row.id, scope.row.roles)">
            分配角色
          </el-button>

          <el-popconfirm
              v-if="scope.row.username !== 'yhj'"
              title="您确定要对这个用户重置密码吗？"
              @confirm="handleResetPassword(scope.row.id)"
          >
            <template #reference>
              <el-button type="warning" :icon="RefreshRight">重置密码</el-button>
            </template>
          </el-popconfirm>

          <el-button
              type="info"
              v-if="scope.row.username !== 'yhj'"
              :icon="Edit"
              @click="handleDialogValue(scope.row.id)"
          />

          <el-popconfirm
              v-if="scope.row.username !== 'yhj'"
              title="您确定要删除这条记录吗？"
              @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger" :icon="Delete"/>
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
        @initUserList="initUserList"
    ></Dialog>

    <RoleDialog
        :id="id"
        v-model:role-dialog-visible="roleDialogVisible"
        :sys-role-list="roleList"
        @initUserList="initUserList"
    ></RoleDialog>

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