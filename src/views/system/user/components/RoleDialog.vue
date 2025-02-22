<script>
import requestUtil from "@/util/request";
import {ElMessage} from "element-plus";

export default {
  name: "RoleDialog",

  props: {
    id: {
      type: Number,
      default: -1,
      required: true,
    },
    roleDialogVisible: {
      type: Boolean,
      default: false,
      required: true,
    },
    sysRoleList: {
      type: Array,
      default: () => [],
      required: true,
    },
  },

  emits: ['update:roleDialogVisible', 'initUserList'],

  data() {
    return {
      userForm: {
        id: -1,
        roleList: [],
        checkedRoles: [],
      },
    }
  },

  methods: {
    // 初始化表单数据
    async initFormData(id) {
      const resp = await requestUtil.get('role/list_all')
      const data = resp.data
      if (data.code !== 200) {
        ElMessage.error(data?.info ?? data)
        return
      }
      this.userForm.roleList = data.roleList
      this.userForm.id = id
    },

    // 关闭对话框
    handleClose() {
      this.$emit('update:roleDialogVisible', false)
    },

    // 提交表单
    handleConfirm() {
      this.$refs.roleFormRef.validate(async valid => {
        if (!valid) return
        const resp = await requestUtil.post('user/grant_role', {
          id: this.userForm.id,
          roleIds: this.userForm.checkedRoles,
        })
        const data = resp.data
        if (data.code !== 200) {
          ElMessage.error(data?.info ?? data)
          return
        }
        ElMessage.success('操作成功！')
        this.$emit("initUserList")
        this.handleClose()
      })
    }

  },

  watch: {
    roleDialogVisible(val) {
      const id = this.$props.id
      if (id === -1) return
      // 将该用户拥有的角色设置为勾选
      this.userForm.checkedRoles = []
      this.$props.sysRoleList.forEach(item => {
        this.userForm.checkedRoles.push(item.id.toString())
      })
      // 初始化表单
      this.initFormData(id)
    }
  }
}
</script>

<template>
  <el-dialog
      :model-value="roleDialogVisible"
      title="分配角色"
      width="30%"
      @close="handleClose"
  >
    <el-form
        ref="roleFormRef"
        :model="userForm"
        label-width="100px"
    >
      <el-checkbox-group v-model="userForm.checkedRoles">
        <el-checkbox
            v-for="role in userForm.roleList"
            :id="role.id.toString()"
            :key="role.id.toString()"
            :value="role.id.toString()"
            name="checkedRoles"
        >
          {{ role.name }}
        </el-checkbox>
      </el-checkbox-group>
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