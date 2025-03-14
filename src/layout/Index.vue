<script>
import Menu from "@/layout/menu/Index.vue"
import Header from "@/layout/header/Index.vue"
import Footer from "@/layout/footer/Index.vue"
import Tabs from "@/layout/tabs/Index.vue"

export default {
  name: "LayoutIndex",
  components: {
    Menu,
    Header,
    Footer,
    Tabs,
  },
}
</script>

<template>
  <!--  主页-->
  <div class="app-wrapper">
    <el-container>
      <el-aside width="200px" class="sidebar-container">
        <Menu/>
      </el-aside>

      <el-container>
        <el-header>
          <Header/>
        </el-header>

        <el-main>
          <Tabs/>
          <router-view/>
        </el-main>

        <el-footer>
          <Footer/>
        </el-footer>

      </el-container>

    </el-container>
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.sidebar-container {
  background-color: #008080;
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-header {
  padding-left: 0;
  padding-right: 0;
}

:deep(ul.el-menu) {
  border-right-width: 0;
}
</style>