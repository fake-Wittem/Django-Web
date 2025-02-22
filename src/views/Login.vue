<script>
import requestUtil from '@/util/request'
import qs from 'qs'
import {ElMessage} from "element-plus";
import Cookies from "js-cookie";
import {encrypt, decrypt} from "@/util/jsencrypt";

export default {
  name: "Login",

  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', message: '请输入您的账号'}],
        password: [{required: true, trigger: 'blur', message: '请输入您的密码'}],
      }
    }
  },

  methods: {
    // 登录
    handleLogin() {
      this.$refs.loginRef.validate(async valid => {
        if (valid) {
          const {data} = await requestUtil.post('user/login?' + qs.stringify(this.loginForm))
          if (data.code === 200) {
            ElMessage.success(data.info)
            sessionStorage.setItem('token', data.token)
            // 添加用户所拥有的角色名称
            const currentUser = data.user
            currentUser.roles = data.roles
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
            sessionStorage.setItem('menuList', JSON.stringify(data.menuList))
            // 用户勾选了记住密码时，将账号密码存储到cookie中，有效期30天
            if (this.loginForm.rememberMe) {
              Cookies.set('username', this.loginForm.username, {expires: 30})
              Cookies.set('password', encrypt(this.loginForm.password), {expires: 30})
              Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30})
            } else {
              // 移除cookie
              Cookies.remove('username')
              Cookies.remove('password')
              Cookies.remove('rememberMe')
            }
            await this.$router.replace('/')
          } else {
            ElMessage.error(data.info)
          }
        } else {
          console.log('验证失败')
        }
      })
    },

    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? this.loginForm.rememberMe : Boolean(rememberMe),
      }
    }
  },

  mounted() {
    this.getCookie()


  }
}
</script>

<template>
  <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">Django权限管理系统</h3>

      <el-form-item prop="username">
        <el-input
            v-model="loginForm.username"
            type="text"
            size="large"
            autocomplete="off"
            placeholder="账号"
        >
          <template #prefix>
            <svg-icon icon="user"/>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            autocomplete="off"
            placeholder="密码"
        >
          <template #prefix>
            <svg-icon icon="password"/>
          </template>
        </el-input>
      </el-form-item>

      <el-checkbox v-model="loginForm.rememberMe" class="remember-checkbox">记住密码</el-checkbox>

      <el-form-item>
        <el-button
            size="large"
            type="primary"
            style="width: 100%"
            @click.prevent="handleLogin"
        >
          <span>登 录</span>
        </el-button>
      </el-form-item>
    </el-form>

    <div class="el-login-footer">
      <span>Copyright © 叶豪杰 版权所有.</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  color: white
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("@/assets/images/login-background.png");
  background-size: cover;
}

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 40px;


    input {
      display: inline-block;
      height: 40px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0;
  }

}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 40px;
  padding-left: 12px;
}

.remember-checkbox {
  margin: 0 0 25px 0
}
</style>