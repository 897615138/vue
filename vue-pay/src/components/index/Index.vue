<template>
  <div>
    <template>
      <el-carousel :interval="5000" arrow="always" height="600px">
        <el-carousel-item v-for="item in pics" :key="item.url" >
          <el-image :src="item.url" alt="" />
        </el-carousel-item>
      </el-carousel>
    </template>

  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      pics: [
        {url: require("../../assets/img1.svg")},
        {url: require("../../assets/img2.svg")},
        {url: require("../../assets/img3.svg")}
      ]
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}


</style>
