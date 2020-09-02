<template>
  <div class="container">
    <div class="login clearfix">
      <div class="login-wrap">
        <el-row type="flex" justify="center">
          <el-form ref="loginForm" :model="user" status-icon label-width="80px" :rules="rules">
            <h3>登录</h3>
            <hr>
            <el-form-item  label="登录方式" >
                <el-select v-model="value" placeholder="请选择" @change="showType" ref="loginMethod">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
                <el-form-item prop="userInfo" label="">
                  <el-input v-model="user.userInfo"  placeholder="请输入"></el-input>
                </el-form-item>
            </el-form-item>

            <el-form-item prop="userPassword" label="密码">
              <el-input v-model="user.userPassword" show-userPassword placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="doLogin()">登录账号</el-button>
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
  name: "Login",
  data() {

    return {
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

    //TODO 邮箱验证
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

    //TODO 手机号验证
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
  methods: {
    //登录 提交表单
    doLogin() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          console.log("登录")
          const params = new URLSearchParams();
          params.append(
            this.options.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.label === this.value;//筛选出匹配数据
          }).value
            ,this.user.userInfo)
          params.append('userPassword', this.user.userPassword)
          axios.post('http://localhost:8888/login', params).then(function (resp) {
            console.log(resp.data)
          })
        }
      })
    },
    showType(){
      console.log(this.type)
      console.log(this.value)
      console.log( this.$refs.loginMethod)
      const obj = this.options.find((item)=>{//这里的userList就是上面遍历的数据源
        return item.label === this.value;//筛选出匹配数据
      })
      console.log(obj)
      console.log(obj.value)

    }

  }
};

</script>

<style scoped>

</style>
