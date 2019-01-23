<template>
  <div>
    <header class="aui-bar aui-bar-nav" v-if="navIndex==0||navIndex==1">
      <div
        class="header-box aui-flex-col aui-flex-middle aui-flex-between"
        v-if="userId !== undefined"
      >
        <div class="search-box0" @click="goSearch()">
          <img class="search" src="../assets/image/icon/search.png">
          <input type="text" placeholder="请输入搜索内容" class="input-box" disabled="disabled">
        </div>
      </div>
      <div
        class="header-box aui-flex-col aui-flex-middle aui-flex-between"
        v-if="userId == undefined"
      >
        <div class="search-box" @click="goSearch()">
          <img class="search" src="../assets/image/icon/search.png">
          <input type="text" placeholder="请输入搜索内容" class="input-box" disabled="disabled">
        </div>
        <div class="login-btn" tapmode onclick="checklogin();">登录</div>
      </div>
    </header>
    <header v-if="navIndex==2">
      <div class="header-box2">
        <span>购物车</span>
        <span @click="clearAll">清空</span>
      </div>
    </header>
    <header v-if="navIndex==3">
      <div class="header-box3">
        <span>我的</span>
        <div class="setting-box" @click="goSetting"></div>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "Header",
  components: {},
  data() {
    return {
      host: "",
      index: 0,
      userId: 52,
      
    };
  },
  created() {
    this.host = this.Global.URL;
  
   
  },
  computed: {
     navIndex () {
        return this.$store.state.navIndex
    } 
  },
  methods: {
    // 搜索
    goSearch: function() {
      api.openWin({
        name: "search_win",
        url: "./home/search_win.html",
        reload: true,
        pageParam: {
          height: api.winHeight
        }
      });
    },
    randomSwitchBtn: function(tag) {
      if (tag == vuedata.index) return;
      vuedata.index = tag;
      // alert(vuedata.index)
      // api.execScript({
      //     frameName: 'home_frame' + tag,
      //     script: 'location.reload();'
      // });
      // $api.addCls(footItem[tag], 'aui-active');
      api.setFrameGroupIndex({
        name: "group",
        index: vuedata.index,
        reload: true
      });
    },
    goSetting: function() {
      if (typeof vuedata.userId == "undefined") {
        api.toast({
          msg: "您还未登录",
          duration: 2000,
          location: "middle"
        });
      } else {
        api.openWin({
          name: "setting_win",
          url: "./setting_win.html",
          reload: true
        });
      }
    },
    clearAll: function() {
      api.execScript({
        name: "home_win",
        frameName: "home_frame2",
        script: "clearCart();"
      });
    }
  },
  
  watch: {
    navIndex:function(newValue){
      console.log(newValue)
   
     
     
    }
  }


};
</script>
<style scoped>
html,
body {
  height: 100%;
}
.header-box {
  padding: 0 0.5rem;
  height: 2.2rem;
  width: 100%;

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

 .input-box {
  width: 80%;
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
