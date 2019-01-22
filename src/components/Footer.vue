<template>
  <div class="aui-bar aui-bar-tab footer">
    <div
      class="aui-bar-tab-item"
      :class="index==0?'aui-active':''"
      tapmode
      @click="randomSwitchBtn(0);"
    >
      <i class="aui-iconfont aui-icon-home"></i>
      <div class="aui-bar-tab-label">首页</div>
    </div>
    <div
      class="aui-bar-tab-item"
      :class="index==1?'aui-active':''"
      tapmode
      @click="randomSwitchBtn(1);"
    >
      <i class="aui-iconfont aui-icon-star"></i>
      <div class="aui-bar-tab-label">分类</div>
    </div>
    <div
      class="aui-bar-tab-item"
      :class="index==2?'aui-active':''"
      tapmode
      @click="randomSwitchBtn(2);"
    >
      <div class="aui-badge" v-if="totalNum>0">{{totalNum}}</div>
      <i class="aui-iconfont aui-icon-cart"></i>
      <div class="aui-bar-tab-label">购物车</div>
    </div>
    <div
      class="aui-bar-tab-item"
      :class="index==3?'aui-active':''"
      tapmode
      @click="randomSwitchBtn(3);"
    >
      <!-- <div class="aui-dot"></div> -->
      <i class="aui-iconfont aui-icon-my"></i>
      <div class="aui-bar-tab-label">我的</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data: function() {
    return {
        index:this.$store.state.index

    };
  },
  created(){
      console.log(this.$store.state.index)
  },
  methods: {
      randomSwitchBtn:function(index){
          console.log(index)
          
          this.$store.commit('changeIndex',index)
          this.$router.push({ path: '/' + e })

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
            border-top:1px solid #dedede;
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
            background: url('../assets/image/icon/setting.png') no-repeat center center;
            background-size: 100% 100%;
        }
        .login-btn{
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
