<template>
  <div id="home-box" v-cloak class="frame">
  
    <div class="rich-txt" id="rich-txt" v-html="content"></div>
    <div class="copy-right" id="copy">Copyright &copy; 2011-2018
      <br>优野商城版权所有
    </div>
  </div>
</template>
<script>
export default {
  name: "About",
  components: {},
  data() {
    return {
      host: "",
      userId: 139,
      content:''
    };
  },
  created() {
    this.host = this.Global.URL;
    this.getContent();
  },
  computed: {},
  methods: {
    getContent: function() {
      var that = this;
      that.axios
        .post("/api" + that.api.getAbout, {
          userId: that.userId
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            that.content = res.data.data.content;
          } else if (res.data.code == 400) {
            that.content = '';
          }
        });
    },
    closewin: function() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
body {
  height: 100%;
  overflow: hidden;
  background: #fff;
}

[v-cloak] {
  display: none;
}

.aui-bar-nav {
  background-color: #44ca68;
}
img {
  display: block;
  margin: 0 auto;
}
.rich-txt {
  width: 100%;
  /*height: auto;*/
  overflow-y: scroll;
  padding: 0 0.5rem;
}
.copy-right {
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 0.6rem;
  color: #fff;
  text-align: center;
  width: 100%;
  height: 2rem;
  z-index: 10;
  background-color: #44ca68;
}
</style>
