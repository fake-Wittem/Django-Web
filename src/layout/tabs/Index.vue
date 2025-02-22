<script>

export default {
  name: "TabsIndex",
  data() {
    return {
      editableTabsValue: '',
      editableTabs: [],
      closable: true,
    }
  },

  methods: {
    // 初始化标签页
    initTabs() {
      this.editableTabs = this.$store.state.editableTabs
      this.editableTabsValue = this.$store.state.editableTabsValue
    },

    // 删除标签页
    removeTab(targetName) {
      const tabs = this.editableTabs
      debugger
      // 当前活跃的标签
      let activeName = this.editableTabsValue
      // 如果删除了当前活跃标签页，则需要跳转活跃到下一标签页
      if (activeName === targetName) {
        // 去除点击标签页的元素内容
        tabs.forEach((tab, index) => {
          if (tab.name !== targetName) return
          const nextTab = tabs[index + 1] || tabs[index - 1]

          if (!nextTab) return
          // 存在下一标签页，则跳转活跃
          activeName = nextTab.name
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      // 更新当前标签页
      this.$store.state.editableTabsValue = this.editableTabsValue
      // 更新所有展示的标签页
      this.$store.state.editableTabs = this.editableTabs

      this.$router.push({path: activeName})
    },

    // 点击标签页
    clickTab(targetName) {
      const activeName = targetName.props.name
      this.$router.push(activeName)
      // 更新当前标签页
      this.$store.state.editableTabsValue = activeName
    }
  },

  mounted() {
    this.initTabs()
  },

  watch: {
    // 监听 store.state 的变化
    '$store.state': {
      handler(newState, oldState) {
        this.editableTabs = newState.editableTabs
        this.editableTabsValue = newState.editableTabsValue
      },
      deep: true,
      immediate: true
    },
  },
}
</script>

<template>
  <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      :closable="closable"
      @tab-remove="removeTab"
      @tab-click="clickTab"
  >
    <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
    >
    </el-tab-pane>

  </el-tabs>
</template>

<style scoped lang="scss">
.demo-tabs {
  .el-tabs__content {
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
    padding: 0 !important;
  }

  :deep(.el-tabs__header .el-tabs__item.is-active) {
    background-color: #e8f1ed;
  }
}


</style>