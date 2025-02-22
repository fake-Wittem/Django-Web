<script>
import {getServerUrl} from "@/util/request";
import {Plus} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import requestUtil from "@/util/request";

export default {
  name: "ChangeAvatar",
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {
      },
    }
  },

  components: {Plus},

  data() {
    return {
      headers: {},
      userForm: {
        id: -1,
        avatar: '',
      },
      imageUrl: '',
    }
  },

  methods: {
    // 获取后端请求地址
    getServerUrl,

    // 头像上传成功后处理
    handleAvatarSuccess(res) {
      this.imageUrl = getServerUrl() + 'media/userAvatar/' + res.title
      this.userForm.avatar = res.title
    },

    // 头像上传前处理
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        ElMessage.error('图片必须是jpg格式')
      }
      if (!isLt2M) {
        ElMessage.error('图片大小不能超过2mb！')
      }
      return isJPG && isLt2M
    },

    // 提交更改
    async handleConfirm() {
      const resp = await requestUtil.post('user/update_avatar', this.userForm)
      const data = resp.data
      if (data.code !== 200) {
        ElMessage.error(data?.info ?? data)
        return
      }
      ElMessage.success('更换成功！')
    }
  },

  mounted() {
    // 给el-upload请求头带上token
    const token = sessionStorage.getItem("token")
    if (token) {
      this.headers = {Authorization: token}
    }

  },

  watch: {
    // 监听props.user的变化并更新userForm
    user: {
      handler(newVal, oldVal) {
        this.userForm = {...newVal}
        if (newVal) {
          // 获取头像路径
          this.imageUrl = getServerUrl() + 'media/userAvatar/' + this.$props.user.avatar
        }
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <el-form
      ref="formRef"
      :model="userForm"
      label-width="100px"
      style="text-align: center;padding-bottom: 10px"
  >
    <el-upload
        name="avatar"
        :headers="headers"
        class="avatar-uploader"
        :action="getServerUrl()+'user/upload_avatar'"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="用户头像"/>

      <el-icon v-else class="avatar-uploader-icon">
        <Plus/>
      </el-icon>

    </el-upload>

    <el-button @click="handleConfirm">确认更换</el-button>

  </el-form>
</template>

<style scoped lang="scss">
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 5%;
  display: block;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  :hover {
    border-color: #2c7354;
  }
}

.el-button:hover {
  background-color: #e8f1ed;
  border-color: #2c7354;
  color: #2c7354;
}

</style>