<template>
  <div class="frame" id="box" v-cloak>
    <header class="aui-bar aui-bar-nav" id="header">
      <a class="aui-pull-left aui-btn" @click="closewin">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">个人设置</div>
    </header>
    <div class="aui-content-padded">
      <ul class="aui-list-view">
        <li
          class="aui-list-view-cell list-item aui-flex-col aui-flex-middle"
          tapmode
          @click="goBaseWin"
        >
          <div class="aui-flex-col aui-flex-middle aui-flex-item-10">
            <span>基本资料</span>
          </div>
          <img
            src="../assets/image/icon/more@2x.png"
            alt
            class="more aui-flex-item-1 aui-flex-offset-1"
          >
        </li>
        <li
          class="aui-list-view-cell list-item aui-flex-col aui-flex-middle"
          tapmode
          @click="goSafeWin"
        >
          <div class="aui-flex-col aui-flex-middle aui-flex-item-10">
            <span>账号与安全</span>
          </div>
          <img
            src="../assets/image/icon/more@2x.png"
            alt
            class="more aui-flex-item-1 aui-flex-offset-1"
          >
        </li>
        <li
          class="aui-list-view-cell list-item aui-flex-col aui-flex-middle"
          tapmode
          @click="goAddressWin"
        >
          <div class="aui-flex-col aui-flex-middle aui-flex-item-10">
            <span>收货地址</span>
          </div>
          <img
            src="../assets/image/icon/more@2x.png"
            alt
            class="more aui-flex-item-1 aui-flex-offset-1"
          >
        </li>
      </ul>
    </div>
    <div class="login-out" @click="loginOut" id="btn" :class="pointNone?'point':''">退出登录</div>
  </div>
</template>
<script>
export default {
  name: "Setting",
  components: {},
  data() {
    return {
      host: "",
      pointNone: false
    };
  },
  created() {
    this.host = this.Global.URL;
  },
  computed: {},
  methods: {
    closewin: function() {
      this.$router.go(-1);
    },
    goBaseWin: function() {
      this.$router.push("/base");
    },
    goSafeWin: function() {
      this.$router.push("/safe");
    },
    goAddressWin: function() {
      this.$router.push('/address');
    },
    loginOut: function() {
      // $api.attr($api.byId('btn'), 'disabled', true);
      var that = this;
      that.pointNone = true;
      api.confirm(
        {
          title: "提示",
          msg: "您确认退出应用吗？",
          buttons: ["确定", "取消"]
        },
        function(ret, err) {
          var index = ret.buttonIndex;
          // alert(index)
          if (index == 2 || index == 0) {
            that.pointNone = false;
            return;
          } else if (index == 1) {
            $api.clearStorage();
            api.execScript({
              name: "home_win",
              script: "openHome0();"
            });
            api.closeWin();
          }
        }
      );
    }
  }
};
</script>
<style scoped>
.frame {
  background-color: #fff;
}

.aui-bar-nav {
  background-color: #44ca68;
}

.more {
  width: 0.7rem;
  height: 0.7rem;
  text-align: right;
  display: block;
}

.list-item {
  height: 3rem;
  border-bottom: 1px solid #d7d7d7;
}

.list-item span {
  font-size: 0.7rem;
}

.login-out {
  position: fixed;
  bottom: 4rem;
  left: 15%;
  width: 70%;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background-color: #ca4444;
  color: #fff;
  font-size: 0.9rem;
}

[v-cloak] {
  display: none;
}

.point {
  pointer-events: none;
}
</style>
