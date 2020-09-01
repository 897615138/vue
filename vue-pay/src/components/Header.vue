<template>
  <div>
    <el-menu :default-active="this.$route.path" router mode="horizontal">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
<!--        或者使用<router-link to="路径"></router-link> -->
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      msg: "Header",
      navList:[
        {name:'/register',navItem:'注册'},
        {name:'/login',navItem:'登录'},
        {name:'/index',navItem:'首页'},
        // {name:'/personalCenter',navItem:'个人中心'},
        // {name:'/manageCenter',navItem:'管理员中心'},
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
