<script>
import {HomeFilled} from "@element-plus/icons-vue";

export default {
  name: "BreadCrumb",
  components: {HomeFilled},

  data() {
    return {
      breadcrumbList: [],
    }
  },

  methods: {
    // 初始化面包屑
    initBreadcrumbList() {
      // 获取当前路由信息
      this.breadcrumbList = this.$route.matched
    },
  },

  mounted() {
    this.initBreadcrumbList()
  },

  watch: {
    // 监听当前路由，变化时初始化面包屑
    $route: {
      handler() {
        this.initBreadcrumbList()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<template>
  <el-icon>
    <HomeFilled/>
  </el-icon>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList">
      <span :class="{ active: index === breadcrumbList.length - 1}">{{ item.name }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.active {
  color: var(--el-color-primary);
}
</style>