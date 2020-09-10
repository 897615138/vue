<template>
  <div class="container">
    <div class="register clearfix">
      <div class="register-wrap">
        <el-row type="flex" justify="center">
          <el-form ref="registerForm" :model="user" status-icon label-width="80px" :rules="rules">
            <h3>注册</h3>
            <hr>
            <el-form-item prop="userName" label="用户名">
              <el-input v-model="user.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="userNickname" label="昵称">
              <el-input v-model="user.userNickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item prop="userEmail" label="邮箱">
              <el-input v-model="user.userEmail" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="userPhone" label="手机号">
              <el-input v-model="user.userPhone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="userSex" label="性别">
              <el-radio-group v-model="user.userSex">
                <el-radio label=0>保密</el-radio>
                <el-radio label=1>男</el-radio>
                <el-radio label=2>女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="userPassword" label="设置密码">
              <el-input v-model="user.userPassword" show-userPassword placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="密码强度">
              <password-strength v-model="user.userPassword" style="padding-top: 10px;"></password-strength>
            </el-form-item>
            <el-form-item prop="userPasswordTwice" label="重复密码">
              <el-input v-model="user.userPasswordTwice" show-userPassword placeholder="请重复输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="doRegister()">注册账号</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PasswordStrength from "../../components/register/PasswordStrength";

export default {
  name: "Register",
  components: {PasswordStrength},
  data() {

    return {
      user: {
        userName: "",
        userNickname: "",
        userEmail: "",
        userPhone: "",
        userPassword: "",
        userPasswordTwice: "",
        userSex: 0,
        userAvatar: ""
      },
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
        userNickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur'}
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
        ],
        userPasswordTwice: [
          {required: true, message: '请重复输入密码', trigger: 'blur'},
        ],
        userSex: [
          {required: true, message: '选择性别', trigger: 'blur'}
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
    //注册 提交表单
    doRegister() {
      const that = this
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          console.log("注册")
          const params = new URLSearchParams();
          params.append('userName', this.user.userName)
          params.append('userNickname', this.user.userNickname)
          params.append('userEmail', this.user.userEmail)
          params.append('userPhone', this.user.userPhone)
          params.append('userPassword', this.user.userPassword)
          params.append('userSex', this.user.userSex)
          axios.post('http://localhost:8888/register', params).then(function (resp) {
            console.log(resp.data)
            that.$refs["registerForm"].resetFields()
            that.$refs["registerForm"].clearValidate()
            that.successReg()
            that.$router.push("/login")
          })
        }
      })
    },
    successReg() {
      const h = this.$createElement;
      this.$notify({
        title: '恭喜',
        message: '注册成功',
        type: 'success'
      });
    }
  }
};

</script>

<style scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-form-item {
  width: 500px;
}
</style>

<!--            TODO 上传头像-->
<!--            <el-form-item label="上传头像" ref="uploadElement" prop="userAvatar">-->
<!--              <el-input v-model="user.userAvatar" v-if="false"></el-input>-->
<!--              <el-upload-->
<!--                ref="upload"-->
<!--                :auto-upload="false"-->
<!--                :before-upload="beforeUpload2"-->
<!--                :data="user"-->
<!--                :file-list="fileList"-->
<!--                :limit="1"-->
<!--                :on-change="handleChange"-->
<!--                :on-success="handleAvatarSuccess"-->
<!--                accept="image/jpeg,image/jpg,image/png"-->
<!--                action="#"-->
<!--                class="upload-demo"-->
<!--                multiple>-->
<!--                <el-button type="success" size="small">选择文件</el-button>-->
<!--              </el-upload>-->
<!--            </el-form-item>-->

<!--handleChange (file, fileList) {-->
<!--//注意这个file.raw,踩坑,你可以直接传file试试-->
<!--this.getBase64(file.raw).then(res => {-->
<!--//这个goods是我的商品信息，在data定义了-->
<!--this.user.userAvatar =res-->
<!--});-->
<!--},-->
<!--// 将file转base64-->
<!--getBase64(file) {-->
<!--return new Promise(function(resolve, reject) {-->
<!--let reader = new FileReader();-->
<!--let imgResult = "";-->
<!--reader.readAsDataURL(file);-->
<!--reader.onload = function() {-->
<!--imgResult = reader.result;-->
<!--};-->
<!--reader.onerror = function(error) {-->
<!--reject(error);-->
<!--};-->
<!--reader.onloadend = function() {-->
<!--resolve(imgResult);-->
<!--};-->
<!--});-->
<!--},-->
<!--handleRemove() {-->
<!--this.files = []-->
<!--this.imageUrl = ''-->
<!--},-->
<!--// 上传成功回调-->
<!--handleAvatarSuccess(res, file) {-->
<!--this.imageUrl = res.data.url-->
<!--this.files.push(file)-->
<!--},-->
<!--// 上传前格式和图片大小限制-->
<!--beforeAvatarUpload(file) {-->
<!--const type = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'-->
<!--const isLt2M = file.size / 1024 / 1024 < 2-->
<!--if (!type) {-->
<!--this.$message.error('图片格式不正确!(只能包含jpg，png，webp，JPEG)')-->
<!--}-->
<!--if (!isLt2M) {-->
<!--this.$message.error('上传图片大小不能超过 2MB!')-->
<!--}-->
<!--return type && isLt2M-->
<!--}-->
