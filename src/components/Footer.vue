<template>
  <ul class="aui-bar aui-bar-tab footer" v-if="showBottomNav">
    <li
      class="aui-bar-tab-item"
      :class="navIndex==0?'aui-active':''"
      @click="randomSwitchBtn(0,'/home')"
    >
      <i class="aui-iconfont aui-icon-home"></i>
      <div class="aui-bar-tab-label">首页</div>
    </li>
    <li
      class="aui-bar-tab-item"
      :class="navIndex==1?'aui-active':''"
      @click="randomSwitchBtn(1,'/cat')"
    >
      <i class="aui-iconfont aui-icon-star"></i>
      <div class="aui-bar-tab-label">分类</div>
    </li>
    <li
      class="aui-bar-tab-item"
      :class="navIndex==2?'aui-active':''"
      @click="randomSwitchBtn(2,'/cart')"
    >
      <div class="aui-badge">0</div>
      <i class="aui-iconfont aui-icon-cart"></i>
      <div class="aui-bar-tab-label">购物车</div>
    </li>
    <li
      class="aui-bar-tab-item"
      :class="navIndex==3?'aui-active':''"
      @click="randomSwitchBtn(3,'/mine')"
    >
      <i class="aui-iconfont aui-icon-my"></i>
      <div class="aui-bar-tab-label">我的</div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "Footer",
  data: function() {
    return {
      navIndex: this.$store.state.navIndex,
     
    };
  },
  created() {

  },
   computed:{
    showBottomNav(){
      return this.$store.state.showBottomNav
    }
  },
  // watch: {
  //   $route(to, from) {
  //     // 获取当前路径
  //     console.log(to);
  //     console.log(from);
  //     let path = to.path;
  //     // 检索当前路径
  //     console.log(path);
  //     if (path == "/home") {
  //       this.$store.commit("changeBottomNav", true);
        
  //     } else if (path == "/cat") {
    
  //       this.$store.commit("changeBottomNav", true);
  //     } else if (path == "/cart") {
       
  //     this.$store.commit("changeBottomNav", true);
  //     } else if (path == "/mine") {
  //       this.$store.commit("changeBottomNav", true);
  //     } else {
       
  //      this.$store.commit("changeBottomNav", fasle);
  //     }
      
  //   },
   
  // },
  methods: {
    randomSwitchBtn: function(index, path) {
      console.log(index, path);
      let t = this;
      t.navIndex = index;
      t.$router.push(path);
      // this.$store.commit('changeIndex',t.navIndex)
    },
    checkRouterLocal(path) {
    
      if(path=='/home'){
        this.navIndex=0
      }else if(path=='/cat'){
        this.navIndex=1
      }else if(path=='/cart'){
        this.navIndex=2
      }else if(path=='/mine'){
        this.navIndex=3
      }
       this.$store.commit('changeIndex', this.navIndex)
     
      
    }
  },
  watch: {
    $route() {
      // 获取当前路径
      let path = this.$route.path;
      // 检索当前路径
      // this.checkRouterLocal(path);
    }
  }
};
</script>
<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 5rem;
}
html,
body {
  height: 100%;
}
.search-box0 {
  width: 90%;
  height: 1.25rem;
  position: relative;
  border-radius: 1.25rem;
  background-color: #fff;
  line-height: 1.25rem;
  margin: 0 auto;
}

.search-box {
  width: 80%;
  height: 1.25rem;
  position: relative;
  border-radius: 1.25rem;
  background-color: #fff;
  line-height: 1.25rem;
  margin: 0 auto;
}

#header .input-box {
  width: 90%;
  height: 1.25rem;
  line-height: 1.25rem;
  position: absolute;
  left: 1.8rem;
  top: 0;
  font-size: 0.7rem;
}

header {
  background-color: #44ca68;
  display: flex;
  justify-content: space-between;
}

.header-box {
  padding: 0 0.5rem;
  height: 2.2rem;
}

.aui-bar-nav {
  background-color: #44ca68;
}

.scan {
  width: 1.2rem;
  height: 1.2rem;
  display: block;
  margin-left: 1rem;
}

.search {
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  left: 0.5rem;
  top: 0.2rem;
  z-index: 1;
}

.footer-list {
  height: 50px;
  width: 100%;
}

.aui-bar-tab .aui-active {
  color: #44ca68;
}

.aui-bar-tab .aui-bar-tab-item {
  height: 2.2rem;
}

.aui-bar {
  align-items: center;
  border-top: 1px solid #dedede;
}

.aui-bar-nav {
  background-color: #44ca68;
}

.hidden {
  display: none;
}

.header-box2 {
  width: 100%;
  height: 2.2rem;
  line-height: 2.2rem;
  padding: 0 0.5rem;
  position: relative;
}

.header-box2 span {
  width: 2rem;
  color: #fff;
  display: block;
}

.header-box2 span:nth-child(1) {
  text-align: center;
  font-size: 0.8rem;
  width: 100%;
  height: 100%;
}

.header-box2 span:nth-child(2) {
  text-align: right;
  font-size: 0.7rem;
  position: absolute;
  right: 0.5rem;
  top: 0;
}

.header-box3 {
  width: 100%;
  height: 2.2rem;
  line-height: 2.2rem;
  padding: 0 0.5rem;
  position: relative;
}

.header-box3 span {
  width: 100%;
  height: 100%;
  text-align: center;
  color: #fff;
  display: block;
}

.setting-box {
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  background: url("../assets/image/icon/setting.png") no-repeat center center;
  background-size: 100% 100%;
}
.login-btn {
  width: 15%;
  font-size: 0.6rem;
  color: #44ca68;
  text-align: center;
  height: 1.25rem;
  line-height: 1.25rem;
  border-radius: 0.6rem;
  background-color: #fff;
}
</style>
