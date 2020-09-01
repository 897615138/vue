<template>
  <div id="app">
    <my-header></my-header>
<!--    <img src="./assets/logo.png" alt="">-->
<!--&lt;!&ndash;    <my-content :title="msg" :btnFn="FCfn" @newMsg="msg=$event"></my-content>&ndash;&gt;-->
<!--    <register></register>-->
    <router-view/>
    <my-bottom></my-bottom>

  </div>
</template>

<script>


import Register from "./components/Register";
export default {
  name: 'App',
  components: {Register},
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
