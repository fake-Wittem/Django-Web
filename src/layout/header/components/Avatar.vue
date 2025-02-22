<script>
import {ArrowDown} from '@element-plus/icons-vue'
import requestUtil, {getServerUrl} from '@/util/request'

export default {
  name: "Avatar",
  components: {
    ArrowDown
  },

  data() {
    return {
      squareUrl: '',
      userName: '',
    }
  },

  methods: {
    // 安全退出
    logout() {
      // 清除缓存
      sessionStorage.clear()
      // 清楚标签页
      this.$store.commit('RESET_TAB')
      // 重新登录
      this.$router.replace('/login')
    }
  },

  mounted() {
    const currentUser = sessionStorage.getItem('currentUser')
    if (currentUser) {
      // 拼接获取头像图片的url
      this.squareUrl = getServerUrl() + 'media/userAvatar/' + JSON.parse(currentUser).avatar
      this.userName = JSON.parse(currentUser).username
    }
  }
}
</script>

<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="40" :src="squareUrl"/>
      &nbsp;&nbsp;{{ userName }}
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <router-link :to="{name: '个人中心'}">个人中心</router-link>
        </el-dropdown-item>
        <el-dropdown-item @click="logout">安全退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>

  </el-dropdown>
</template>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>