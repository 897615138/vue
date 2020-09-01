<template>
  <div class="container">
    <div class="login clearfix">
      <div class="login-wrap">
        <el-row type="flex" justify="center">
          <el-form ref="loginForm" :model="user" status-icon label-width="80px">
            <h3>登录</h3>
            <hr>
            <el-form-item prop="userName" label="用户名/邮箱/手机号" label-width=“600px”>
              <el-input v-model="user.userName" placeholder="请输入用户名/邮箱/手机号"
              style="width:300px"></el-input>
            </el-form-item>
            <el-form-item prop="userPassword" label="密码"  label-width=“600px”>
              <el-input v-model="user.userPassword" show-userPassword placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="dologin()">登录账号</el-button>
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
    dologin() {
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
            console.log("登录1")
            // axios.post("http://localhost:8888/login", {
            //   userName: this.user.userName,
            //   userNickName: this.user.userNickname,
            //   userEmail: this.user.userEmail,
            //   userPhone: this.user.userPhone,
            //   userPassword: this.user.userPassword
            //   })
            const _this = this
            const params = new URLSearchParams();
            params.append('userName', this.user.userName)
            params.append('userNickName', this.user.userNickname)
            params.append('userEmail', this.user.userEmail)
            params.append('userPhone', this.userPhone)
            params.append('userPassword', this.user.userPassword)
            axios.post('http://localhost:8888/login',params).then(function (resp) {
              // console.log(resp.data)
            })
              // .then(res => {
              //
              // });
          }
        }
      }
    }
  }
};

</script>

<style scoped>

</style>
