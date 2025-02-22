<script>
import requestUtil from "@/util/request";
import {ElMessage} from "element-plus";

export default {
  name: "Dialog",
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
  emits: ['update:dialogVisible', 'initUserList'],

  data() {
    return {
      userForm: {
        id: -1,
        username: "",
        password: "123456",
        status: 1,
        phone_number: "",
        email: "",
        remark: "",
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名'},
          {required: true, validator: this.checkUsername, trigger: "blur"}
        ],
        email: [
          {required: true, message: "邮箱地址不能为空", trigger: "blur"},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ["blur", "change"]}
        ],
        phone_number: [
          {required: true, message: "手机号码不能为空", trigger: "blur"},
          {pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur"}
        ]
      }
    }
  },

  methods: {
    // 检查用户名
    async checkUsername(rule, value, callback) {
      if (this.userForm.id === -1) {
        const resp = await requestUtil.post('user/check', {username: this.userForm.username})
        if (resp.data.code === 500) {
          callback(new Error('用户名已存在！'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },

    // 初始化加载用户信息
    async initFormData(id) {
      const resp = await requestUtil.get('user/action?id=' + id)
      this.userForm = resp.data.user
    },

    // 关闭表单
    handleClose() {
      // 更新用户列表的v-model绑定的值为false，用于关闭dialog
      this.$emit('update:dialogVisible', false)
    },

    // 提交表单
    handleConfirm() {
      this.$refs.dialogForm.validate(async valid => {
        if (!valid) console.log('fail')
        const resp = await requestUtil.post('user/save_info', this.userForm)
        const data = resp.data
        if (data.code !== 200) {
          ElMessage.error(data?.info ?? data)
          return
        }
        ElMessage.success('执行成功！')
        // 重置表单字段值
        this.$refs.dialogForm.resetFields()
        // 通知用户列表刷新
        this.$emit('initUserList')
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
        this.userForm = {
          id: -1,
          username: "",
          password: "123456",
          status: 1,
          phone_number: "",
          email: "",
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
        :model="userForm"
        :rules="rules"
        label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" :disabled="userForm.id !== -1" clearable/>

        <el-alert
            v-if="userForm.id === -1"
            title="默认初始密码：123456"
            :closable="false"
            style="line-height: 10px"
            type="success"
        ></el-alert>

      </el-form-item>

      <el-form-item label="手机号" prop="phone_number">
        <el-input v-model="userForm.phone_number" maxlength="11" clearable/>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" clearable/>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="userForm.status">
          <el-radio :value="1">正常</el-radio>
          <el-radio :value="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input v-model="userForm.remark" type="textarea" :rows="4" clearable/>
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