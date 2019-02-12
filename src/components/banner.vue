<template>
  <div style="width:100%;height:200px">
    <!-- 配置slider组件 -->
    <slider :banner="banner" :sliderinit="sliderinit" @slide="slide" @tap="onTap" @init="onInit">
      <!-- 设置loading,可自定义 -->
      <div slot="loading">loading...</div>
      <img src="" alt=""  v-for="(item,index) in banner" :key="index">
    </slider>
  </div>
</template>
<script>
import slider from 'vue-concise-slider'
export default {
  name: "Banner",
  components: {
      slider
  },
  data() {
    return {
      host: "",
      sliderinit: {
          currentPage: 0,
          thresholdDistance: 500,
          thresholdTime: 100,
          autoplay:1000,
          loop:true,
          direction:'vertical',
          infinite:1,
          slidesToScroll:1,
          timingFunction: 'ease',
          duration: 300
        }
    };
  },
  props:['banner'],
  created() {
    this.host = this.Global.URL;
  },
  computed: {},
  methods: {
   
  }
};
</script>
<style scoped>
</style>
