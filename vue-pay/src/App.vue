<template>
  <div id="app">
    <img src="./assets/logo.png" alt="">
    <my-header></my-header>
    <my-content :title="msg" :btnFn="FCfn" @newMsg="msg=$event"></my-content>
    <my-bottom></my-bottom>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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
