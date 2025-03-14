<script>
import {HomeFilled} from "@element-plus/icons-vue";

export default {
  name: "MenuIndex",
  components: {
    HomeFilled
  },

  data() {
    return {
      menuList: [],
    }
  },

  methods: {
    // 打开标签页
    openTab(tabValue) {
      this.$store.commit('ADD_TAB', tabValue)
    },
  },

  computed: {
    // 动态获取当前激活的菜单项
    activeMenu() {
      return this.$route.path
    },
  },

  mounted() {
    // 缓存中获取菜单树
    const menuList = sessionStorage.getItem("menuList")
    if (menuList) {
      this.menuList = JSON.parse(menuList)
    }
  }
}
</script>

<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#008080"
      class="el-menu-vertical-demo"
      text-color="#fff"
      router
      :default-active="activeMenu"
      unique-opened
  >
    <el-menu-item index="/index" @click="openTab({name:'首页',path:'/index'})">
      <template #title>
        <el-icon>
          <home-filled/>
        </el-icon>
        <span>首页</span>
      </template>
    </el-menu-item>

    <el-sub-menu :index="menu.path" v-for="menu in menuList">
      <template #title>
        <el-icon>
          <svg-icon :icon="menu.icon"/>
        </el-icon>
        <span>{{ menu.name }}</span>
      </template>

      <el-menu-item :index="item.path" v-for="item in menu.children" @click="openTab(item)">
        <el-icon>
          <svg-icon :icon="item.icon"/>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>

    </el-sub-menu>


  </el-menu>
</template>

<style lang="scss" scoped>

</style>