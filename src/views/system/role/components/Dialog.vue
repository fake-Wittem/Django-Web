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
    dialogTitle: {
      type: String,
      default: "",
      required: true,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  emits: ['update:dialogVisible', 'initRoleList'],

  data() {
    return {
      roleForm: {
        id: -1,
        name: "",
        code: "",
        remark: "",
      },
      rules: {
        name: [
          {required: true, message: '请输入角色名称'},
        ],
        code: [
          {required: true, message: '请输入权限字符'},
        ],
      }
    }
  },

  methods: {

    // 初始化加载角色信息
    async initFormData(id) {
      const resp = await requestUtil.get('role/action?id=' + id)
      this.roleForm = resp.data.role
    },

    // 关闭表单
    handleClose() {
      // 更新角色列表的v-model绑定的值为false，用于关闭dialog
      this.$emit('update:dialogVisible', false)
    },

    // 提交表单
    handleConfirm() {
      this.$refs.dialogForm.validate(async valid => {
        if (!valid) console.log('fail')
        const resp = await requestUtil.post('role/save_role', this.roleForm)
        const data = resp.data
        if (data.code !== 200) {
          ElMessage.error(data?.info ?? data)
          return
        }
        ElMessage.success('操作成功！')
        // 重置表单字段值
        this.$refs.dialogForm.resetFields()
        // 通知角色列表刷新
        this.$emit('initRoleList')
        // 关闭表单
        this.handleClose()
      })
    },
  },

  watch: {
    // 监听 dialogVisible 的变化
    dialogVisible(newVal) {
      if (!newVal) return
      const id = this.$props.id
      if (id !== -1) {
        this.initFormData(id)
      } else {
        this.roleForm = {
          id: -1,
          name: "",
          code: "",
          remark: "",
        }
      }
    },

  }
}
</script>

<template>
  <el-dialog
      :model-value="dialogVisible"
      :title="dialogTitle"
      width="30%"
      @close="handleClose"
  >
    <el-form
        ref="dialogForm"
        :model="roleForm"
        :rules="rules"
        label-width="100px"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" clearable/>
      </el-form-item>

      <el-form-item label="权限字符" prop="code">
        <el-input v-model="roleForm.code" clearable/>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input v-model="roleForm.remark" type="textarea" :rows="4" clearable/>
      </el-form-item>

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