<script>
import {getMenuList} from "@/api/menu/requests";

export default {
  name: "MenuDialog",

  props: {
    id: {
      type: Number,
      default: -1,
      required: true,
    },
    menuDialogVisible: {
      type: Boolean,
      default: false,
      required: true,
    }
  },

  emits: (['update:menuDialogVisible', 'initRoleList']),

  data() {
    return {
      treeDefaultProps: {children: 'children', label: 'name'},
      menuForm: {id: -1},
      treeData: [],
    }
  },

  methods: {
    // 初始化菜单数据
    async initFormData(id) {
      const result = await getMenuList()
      this.treeData = result.menuList
      this.menuForm.id = id
    },

    handleClose() {
      // 关闭对话框
      this.$emit('update:menuDialogVisible', false)
    },
  },

  watch: {
    menuDialogVisible(val) {
      const id = this.$props.id
      if (id === -1) return
      // 初始化表单
      this.initFormData(id)
    }
  }
}
</script>

<template>
  <el-dialog
      :model-value="menuDialogVisible"
      title="分配权限"
      width="20%"
      @close="handleClose"
  >
    <el-form
        ref="menuFormRef"
        :model="menuForm"
        label-width="100px"
    >
      <el-tree
          ref="treeMenuRef"
          :data="treeData"
          :props="treeDefaultProps"
          show-checkbox
          :default-expand-all="true"
          node-key="id"
          :check-strictly="true"
      />
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确认</el-button>
        <el-button @click="handleClose">取消</el-button>
      </span>
    </template>

  </el-dialog>
</template>

<style scoped lang="scss">

</style>