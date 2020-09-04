<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="user" :rules="rules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item  label="登录方式" >
                <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-select v-model="value" placeholder="请选择"  ref="loginMethod">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
            tabindex="1"
            autocomplete="on"
          >
          </el-option>
        </el-select>
        <el-form-item prop="userInfo" label="">
          <el-input v-model="user.userInfo"  placeholder="请输入"></el-input>
        </el-form-item>
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="user.userPassword"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="doLogin()"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="doLogin()">Login</el-button>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="toReg()">Register</el-button>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          Or connect with
        </el-button>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>

import SocialSign from './components/SocialSignin'
import axios from "axios";

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    return {
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      user: {
        userInfo:"",
        userPassword: "",
      },
      options: [{
        value: 'userName',
        label: '用户名',
      }, {
        value: 'userEmail',
        label: '邮箱'
      }, {
        value: 'userPhone',
        label: '手机号'
      }],
      value: '',
      type:'userName',
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              checkUserName(rule, value, callback)
            },
            trigger: ['blur']
          }
        ],
        userEmail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '请输入有效的邮箱'
          },
          {
            validator: (rule, value, callback) => {
              checkMail(rule, value, callback)
            },
            trigger: ['blur']
          },
        ],
        userPhone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入有效的手机号'
          },
          {
            validator: (rule, value, callback) => {
              checkPhone(rule, value, callback)
            },
            trigger: ['change']
          }
        ],
        userPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      }
    }
     function checkUserName(rule, value, callback) {
      const params = new URLSearchParams();
      params.append('userName', value)
      axios.post('http://localhost:8888/checkUserName', params).then(function (resp) {
        // console.log(resp.data.flag)

        if (!resp.data.flag) {
          //用户名不可用
          callback(new Error(resp.data.message))
        } else {
          //用户名可用
          callback();
        }
      })
    }

    function checkMail(rule, value, callback) {
      const params = new URLSearchParams();
      params.append('userEmail', value)
      axios.post('http://localhost:8888/checkMail', params).then(function (resp) {
        if (!resp.data.flag) {
          //邮箱不可用
          callback(new Error(resp.data.message))
        } else {
          //邮箱可用
          callback();
        }
      })
    }

    function checkPhone(rule, value, callback) {
      const params = new URLSearchParams();
      params.append('userPhone', value)
      axios.post('http://localhost:8888/checkPhone', params).then(function (resp) {
        if (!resp.data.flag) {
          //手机号不可用
          callback(new Error(resp.data.message))
        } else {
          //手机号可用
          callback();
        }
      })
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    //登录 提交表单
    doLogin() {
      const that=this
      console.log(this.$refs["loginForm"])
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          console.log("登录")
          const params = new URLSearchParams();
          console.log(that.value)
          console.log(that.options.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.label === that.value;//筛选出匹配数据
          }).value)
          params.append(
            this.options.find((item)=>{//这里的userList就是上面遍历的数据源
              return item.label === this.value;//筛选出匹配数据
            }).value
            ,this.user.userInfo)
          params.append('userPassword', this.user.userPassword)
          axios.post('http://localhost:8888/login', params).then(function (resp) {
            console.log(resp.data)
            that.$refs["loginForm"].resetFields()
            that.$refs["loginForm"].clearValidate()
            that.successLogin()
            that.$router.push("/index")
          })
        }
      })
    },
    toReg(){
      this.$router.push({ path: this.redirect || '/register', query: this.otherQuery
        })},
    successLogin() {
      this.$notify({
        title: '欢迎',
        message: '登录成功',
        type: 'success'
      });
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
  }
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
