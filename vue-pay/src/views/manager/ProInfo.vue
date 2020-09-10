<template>
<div>
  商品信息
  {{this.$route.params.id}}
</div>
</template>

<script>
export default {
name: "ProInfo",
  beforeRouteEnter:(to,from,next)=>{
  console.log("准备进入商品信息页");
  next(
    console.log("进入到目标页面之后调用的函数")
  );
  },
  beforeRouteLeave:(to,from,next)=>{
    console.log("准备离开商品信息页");
    next(
      console.log("离开后")
    );
  }
}
</script>

<style scoped>

</style>
