<script>
import requestUtil from "@/util/request";
import {ElMessage} from "element-plus";

export default {
  name: "ResetPwd",
  props: {
    user: {
      type: Object,
      default: () => {
      },
      required: true,
    }
  },

  data() {
    return {
      userForm: {
        id: -1,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur',
          }
        ],
        newPassword: [
          {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 20,
            message: '请确保长度在 6 到 20 个字符',
            trigger: 'blur',
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.equalToPassword,
            trigger: 'blur',
          }
        ]
      }
    }
  },

  methods: {
    // 提交修改密码
    handleSubmit() {
      // 校验表单内容
      this.$refs.pwdRef.validate(async valid => {
        if (!valid) return
        const resp = await requestUtil.post('user/update_password', this.userForm)
        const data = resp.data
        if (data.code !== 200) {
          ElMessage.error(data?.info ?? data)
          return
        }
        ElMessage.success('密码修改成功，下一次登录生效！')
      })
    },

    // 对比两次密码是否一致
    equalToPassword(rule, value, callback) {
      if (this.userForm.newPassword !== value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
  },

  watch: {
    // 监听props.user的变化并更新userForm
    user: {
      handler(newVal, oldVal) {
        this.userForm = {...newVal}
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <el-form ref="pwdRef" :model="userForm" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input v-model="userForm.oldPassword" placeholder="请输入旧密码" type="password" show-password/>
    </el-form-item>

    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="userForm.newPassword" placeholder="请输入新密码" type="password" show-password/>
    </el-form-item>

    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="userForm.confirmPassword" placeholder="请确认密码" type="password" show-password/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </el-form-item>

  </el-form>
</template>

<style scoped lang="scss">

</style>