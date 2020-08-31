<template>
  <div class="container">
    <div class="login clearfix">
      <div class="login-wrap">
        <el-row type="flex" justify="center">
          <el-form ref="loginForm" :model="user" status-icon label-width="80px">
            <h3>注册</h3>
            <hr>
            <el-form-item prop="userName" label="用户名">
              <el-input v-model="user.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="userName" label="昵称">
              <el-input v-model="user.userNickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item prop="userEmail" label="邮箱">
              <el-input v-model="user.userEmail" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="userPhone" label="手机号">
              <el-input v-model="user.userPhone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="userPassword" label="设置密码">
              <el-input v-model="user.userPassword" show-userPassword placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="doRegister()">注册账号</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      user: {
        userName: "",
        userNickname:"",
        userEmail: "",
        userPhone:"",
        userPassword: ""
      },
    };
  },
  methods: {
    doRegister() {
      if (!this.user.userName) {
        this.$message.error("请输入用户名！");
      } else if (!this.user.userEmail) {
        this.$message.error("请输入邮箱！");
      } else {
        {
          const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(this.user.userEmail)) {
            this.$message.error("请输入有效的邮箱！");
          } else if (!this.user.userPassword) {
            this.$message.error("请输入密码！");
          } else {
            console.log("注册")
            axios.post("http://localhost:8888/register/", {
                userName: this.user.userName,
                userNickname: this.user.userNickname,
                userEmail: this.user.userEmail,
                userPhone: this.user.userPhone,
                userPassword: this.user.userPassword
              })
              .then(res => {

              });
          }
        }
      }
    }
  }
};

</script>

<style scoped>

</style>
