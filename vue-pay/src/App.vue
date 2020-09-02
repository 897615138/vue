<template>
  <div id="app">
    <Header></Header>
<!--    <img src="./assets/logo.png" alt="">-->
<!--&lt;!&ndash;    <my-content :title="msg" :btnFn="FCfn" @newMsg="msg=$event"></my-content>&ndash;&gt;-->
<!--    <register></register>-->
    <router-view/>
    <Bottom></Bottom>

  </div>
</template>

<script>

import Header from "./components/Header";
import Bottom from "./components/Bottom";
export default {
  name: 'App',
  components: {Header, Bottom},
  data(){
    return{
      msg:"hello"
    }
  },
  methods:{
    FCfn:function (m) {
      this.msg=m
    }
  }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
