<template>
  <div>
    {{ msg }}
    {{ title}}
    <button type="button" @click="btnFn('父传子')">点我父传子</button>
    <button type="button" @click="tData()">点我子传父</button>
  </div>
</template>

<script>
export default {
  name: "Content",
  data: function () {
    return {
      msg: "Content",
      title:''
    }
  },
  props: {
    "title":{
      type: String,
      required:true,
      default:'XX'
    },
    "btnFn":{
      type:Function
    }
  },
  methods:{
    tData(){
      this.$emit("newMsg","子传父")
    }
  },

}
</script>

<style scoped>

</style>
