<script>
import BreadCrumb from "./components/BreadCrumb.vue";
import Avatar from "./components/Avatar.vue";

export default {
  name: "HeaderIndex",
  components: {
    BreadCrumb,
    Avatar,
  }
}
</script>

<template>
  <div class="navbar">
    <BreadCrumb/>
    <div class="navbar-right">
      <Avatar/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #f5f5f5;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;

  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    :deep(.navbar-item) {
      display: inline-block;
      margin-left: 18px;
      font-size: 22px;
      color: #5a5e66;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>