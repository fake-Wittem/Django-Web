<template>
  <router-view/>
</template>

<script>
import Cookies from "js-cookie";
import {encrypt, decrypt} from "@/util/jsencrypt";
import requestUtil from '@/util/request'
import {ElMessage} from "element-plus";

export default {
  name: "App",
  components: {},

  methods: {
    // 检测用户是否登录
    async checkUser() {
      const currentUser = sessionStorage.getItem("currentUser")
      if (currentUser) return
      // 当前会话未点击过登录，则用cookie存储的账号密码给后端校验，校验通过则自动登录
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      if (!username || !password) {
        // cookie中没有信息，则跳转登录页面
        await this.$router.push('/login')
        ElMessage.warning('请重新登录')
        return
      }
      const {data} = await requestUtil.post(`user/login?username=${username}&password=${decrypt(password)}`)
      if (data.code === 200) {
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('currentUser', JSON.stringify(data.user))
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList))
        await this.$router.replace('/')
        // 刷新网页
        this.$router.go(0)
      } else {
        await this.$router.push('/login')
        ElMessage.warning('请重新登录')
      }
    },

  },

  watch: {
    $route(to, from) {
      // 从头像处进入个人中心页面，需添加标签页
      if (to.path !== '/userCenter') return
      const newTab = {
        name: to.name,
        path: to.path,
      }
      this.$store.commit('ADD_TAB', newTab)
    }
  },

  mounted() {
    this.checkUser()
  },
}
</script>

<style lang="scss">

html, body, #app {
  height: 100%;
}

.app-container {
  padding: 20px;
}


</style>
