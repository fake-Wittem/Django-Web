<script>
import ChangeAvatar from "./components/ChangeAvatar.vue";
import UserInfo from "./components/UserInfo.vue";
import ResetPwd from "./components/ResetPwd.vue";

export default {
  name: "UserCenterIndex",
  components: {
    ChangeAvatar,
    UserInfo,
    ResetPwd,
  },
  data() {
    return {
      currentUser: {},
      activeTab: "userInfo",
    }
  },

  methods: {
    // 获取当前用户信息
    getCurrentUser() {
      const user = sessionStorage.getItem("currentUser")
      if (!user) return
      this.currentUser = JSON.parse(user)
    }
  },

  mounted() {
    this.getCurrentUser()
  }
}
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="clearfix">
              <span>个人信息</span>
            </div>
          </template>

          <div>
            <div class="text-center">
              <change-avatar :user="currentUser"/>
            </div>

            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <el-row>
                  <el-col :span="8" class="float-left">
                    <svg-icon icon="user"/>&nbsp;&nbsp;用户名称
                  </el-col>

                  <el-col :span="16" class="float-right">{{ currentUser.username }}</el-col>

                </el-row>
              </li>

              <li class="list-group-item">
                <el-row>
                  <el-col :span="8">
                    <svg-icon icon="phone"/>&nbsp;&nbsp;手机号码
                  </el-col>

                  <el-col :span="16" class="float-right">{{ currentUser.phone_number }}</el-col>

                </el-row>
              </li>

              <li class="list-group-item">
                <el-row>
                  <el-col :span="8">
                    <svg-icon icon="email"/>&nbsp;&nbsp;用户邮箱
                  </el-col>

                  <el-col :span="16" class="float-right">{{ currentUser.email }}</el-col>

                </el-row>
              </li>

              <li class="list-group-item">
                <el-row>
                  <el-col :span="8" class="float-left">
                    <svg-icon icon="peoples"/>&nbsp;&nbsp;所属角色
                  </el-col>

                  <el-col :span="16" class="float-right">
                    <el-tag type="primary" v-for="role in currentUser.roles">{{ role }}</el-tag>
                  </el-col>

                </el-row>
              </li>

              <li class="list-group-item">
                <el-row>
                  <el-col :span="8">
                    <svg-icon icon="date"/>&nbsp;&nbsp;创建日期
                  </el-col>

                  <el-col :span="16" class="float-right">{{ currentUser.login_date }}</el-col>

                </el-row>
              </li>

            </ul>

          </div>

        </el-card>
      </el-col>

      <el-col :span="18">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span>基本资料</span>
            </div>
          </template>

          <el-tabs v-model="activeTab" class="default-tabs">
            <el-tab-pane label="基本资料" name="userInfo">
              <user-info :user="currentUser"/>
            </el-tab-pane>

            <el-tab-pane label="修改密码" name="resetPwd">
              <reset-pwd :user="currentUser"/>
            </el-tab-pane>

          </el-tabs>

        </el-card>
      </el-col>

    </el-row>

  </div>

</template>

<style lang="scss">
.list-group-striped {

  .list-group-item {
    border-left: 0;
    border-right: 0;
    border-radius: 0;
    border-bottom: 1px solid #e7eaec;
    border-top: 1px solid #e7eaec;
    margin-bottom: -1px;
    padding: 11px 0;
    font-size: 13px;

    .el-row {
      justify-content: space-between;
    }
  }
}

.float-left {
  display: flex;
  align-items: center;
}

.float-right {
  text-align: end;
  word-break: break-word;
}

:deep(.el-card__body) {
  height: 230px;
}

:deep(.box-card) {
  height: 450px;
}

</style>