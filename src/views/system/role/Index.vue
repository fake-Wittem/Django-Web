<script>
import requestUtil, {getServerUrl} from "@/util/request";
import {Delete, DocumentAdd, Edit, Search, Tools} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

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

  components: {},

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
    }
  },

  methods: {
    async initRoleList() {
      const resp = await requestUtil.post('role/list', this.queryForm)
      const data = resp.data
      if (data.code !== 200) {
        ElMessage.error(data?.info ?? data)
        return
      }
      this.tableData = data?.roleList
      this.total = data?.total
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
      <el-table-column type="selection" width="55"/>

      <el-table-column prop="name" label="角色名" width="100" align="center" :formatter="formatData"/>

      <el-table-column prop="code" label="权限字符" width="200" align="center" :formatter="formatData"/>

      <el-table-column prop="create_time" label="创建时间" width="200" align="center" :formatter="formatData"/>

      <el-table-column prop="remark" label="备注" :formatter="formatData"/>

      <el-table-column prop="action" label="操作" width="400" fixed="right" align="center">
        <template #default="scope">
          <el-button type="primary" :icon="Tools" @click="handleMenuDialogValue(scope.row.id)">
            分配权限
          </el-button>

          <el-button
              type="info"
              v-if="scope.row.code !== 'admin'"
              :icon="Edit"
              @click="handleDialogValue(scope.row.id)"
          />

          <el-popconfirm
              v-if="scope.row.code !== 'admin'"
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