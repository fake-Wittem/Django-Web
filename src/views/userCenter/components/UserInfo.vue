<script>
import requestUtil from "@/util/request";
import {ElMessage} from "element-plus";

export default {
  name: "UserInfo",
  props: {
    user: {
      type: Object,
      default: () => {
      },
      required: true,
    },
  },

  data() {
    return {
      userForm: {
        id: -1,
        phone_number: '',
        email: '',
      },
      rules: {
        phone_number: [
          {
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur',
          },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur',
          }
        ],
        email: [
          {
            required: true,
            message: '邮箱地址不能为空',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ]
      }
    }
  },

  methods: {
    // 修改用户个人信息
    handleSubmit() {
      // 校验表单内容
      this.$refs.userRef.validate(async valid => {
        if (!valid) return
        const resp = await requestUtil.post('user/save_info', this.userForm)
        const data = resp.data
        if (data.code !== 200) {
          ElMessage.error(data?.info ?? data)
          return
        }
        ElMessage.success('保存成功！')
        sessionStorage.setItem('currentUser', JSON.stringify(this.userForm))
      })
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
  <el-form ref="userRef" :model="userForm" :rules="rules" label-width="100px">
    <el-form-item label="手机号码：" prop="phone_number">
      <el-input v-model="userForm.phone_number" maxlength="11"/>
    </el-form-item>

    <el-form-item label="用户邮箱：" prop="email">
      <el-input v-model="userForm.email" maxlength="50"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </el-form-item>

  </el-form>
</template>

<style scoped lang="scss">

</style>