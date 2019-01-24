<template>
  <div class="frame" id="box">
    <header class="aui-bar aui-bar-nav" id="header">
      <a class="aui-pull-left aui-btn" @click="closewin();">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">基本资料</div>
      <div class="amend" tapmode @click="amend">修改</div>
    </header>
    <div class="aui-content-padded">
      <ul class="aui-list-view">
        <li class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle">
          <img src="../assets/image/icon/icon1.png" alt class="more">
          <span class="aui-flex-item-3">头像：</span>
          <img :src="host+userMsg.img" alt class="avatar" @click="checkAvatar">
        </li>
        <li class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle">
          <img src="../assets/image/icon/icon2.png" alt class="more">
          <span class="aui-flex-item-3">姓名：</span>
          <span>{{userMsg.nickname}}</span>
        </li>
        <li class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle">
          <img src="../assets/image/icon/icon3.png" alt class="more">
          <span class="aui-flex-item-3">手机：</span>
          <span>{{userMsg.mobile}}</span>
        </li>
        <!-- <li class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle">
                    <img src="../image/icon/icon4.png" alt="" class="more aui-flex-item-1">
                    <span class="aui-flex-item-3">店铺名称：</span>
                    <span class="aui-flex-item-8">{{userMsg.shopName}}</span>
                </li>
                <li class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle">
                    <img src="../image/icon/icon36.png" alt="" class="more aui-flex-item-1">
                    <span class="aui-flex-item-3">收货地址：</span>
                    <span class="aui-flex-item-8 aui-ellipsis-2">{{userMsg.addressDetail}}</span>
                </li>
                <li class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle">
                    <img src="../image/icon/icon5.png" alt="" class="more aui-flex-item-1">
                    <span class="aui-flex-item-3">自提地址：</span>
                    <span class="aui-flex-item-8 aui-ellipsis-2">{{userMsg.stall}}</span>
        </li>-->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Base",
  components: {},
  data() {
    return {
      host: "",
      userId: "",
      userMsg: []
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
    // 获取列表内容
    getBaseList: function() {
      var that = this;
      api.ajax(
        {
          url: that.host + "/api/user/getUserInfo",
          method: "post",
          dataType: "json",
          data: {
            values: {
              userId: that.userId
            }
          }
        },
        function(ret, err) {
          // alert(JSON.stringify(ret))
          if (ret.code == 0) {
            that.userMsg = ret.data;
          }
        }
      );
    },
    // 修改
    amend: function() {
      api.parseTapmode();
      var that = this;
      api.openWin({
        name: "amend_win",
        url: "./amend_win.html",
        bounces: false,
        pageParam: {
          userMsg: that.userMsg,
          status: 0
        }
      });
    },
    checkAvatar: function() {
      var that = this;
      var photoBrowser = api.require("photoBrowser");
      photoBrowser.open(
        {
          images: [that.host + that.userMsg.img],
          bgColor: "#fff",
          mode: 1
        },
        function(ret, err) {
          if (ret) {
            // alert(JSON.stringify(ret));
            if (ret.eventType == "click") {
              photoBrowser.close();
            }
          } else {
            // alert(JSON.stringify(err));
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
  width: 0.9rem;
  height: 0.9rem;
}

.list-item {
  height: 4rem;
  border-bottom: 1px solid #d7d7d7;
}
.list-item:nth-child(1) {
  margin-top: 0.5rem;
}

.list-item span:nth-child(2) {
  font-size: 0.7rem;
  color: #888888;
  padding: 0 0.5rem;
}

.list-item span:nth-child(3) {
  font-size: 0.8rem;
  color: #010101;
}

.avatar {
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
}

.amend {
  position: absolute;
  right: 0rem;
  font-size: 0.7rem;
  /*padding:0 1rem;*/
  width: 3rem;
}
</style>
