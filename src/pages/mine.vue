<template>
  <div v-cloak class="frame">
     
    <div class="aui-flex-col aui-flex-left aui-flex-middle second-line">
      <div
        class="avatar-msg aui-flex-left aui-flex-col aui-flex-middle aui-flex-item-12"
        v-if="userId !== undefined&&userId !==''"
      >
        <div class="aui-flex-left aui-flex-item-9 aui-flex-col aui-flex-middle">
          <img :src="host+userMsg.img" alt class="avatar" @click="checkAvatar">
          <!-- <img src="../assets/image/icon/icon35.png" alt="" class="avatar" v-else> -->
          <div class="aui-flex-row aui-flex-left aui-flex-middle name-box">
            <span class="aui-ellipsis-1 name">{{userMsg.nickname}}</span>
            <span class="role">{{userMsg.roleName}}</span>
          </div>
        </div>
        <div class="aui-flex-item-3 edit-msg" @click="editMsg" >编辑资料</div>
      </div>
      <span class="login-btn"  @click="checklogin" v-else>去登录</span>

      <!-- <div class="aui-flex-right aui-flex-item-4">
                <span class="code">综合评分：5.0</span>
                <div class="aui-flex-col">
                    <img src="../../image/icon/star.png" alt="" class="star">
                    <img src="../../image/icon/star.png" alt="" class="star">
                    <img src="../../image/icon/star.png" alt="" class="star">
                    <img src="../../image/icon/star.png" alt="" class="star">
                    <img src="../../image/icon/star.png" alt="" class="star">
                </div>
      </div>-->
    </div>
    <div class="aui-content-padded">
      <ul class="aui-list-view">
        <li
          class="aui-list-view-cell list-item aui-flex-col aui-flex-middle"
          tapmode
          @click="switchBtn(0);"
        >
          <div class="aui-flex-col aui-flex-middle aui-flex-item-10">
            <img src="../assets/image/icon/order.png" alt class="order">
            <span>我的订单</span>
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
          @click="switchBtn(2);"
          v-if="role!==0"
        >
          <div class="aui-flex-col aui-flex-middle aui-flex-item-10">
            <img src="../assets/image/icon/shop.png" alt class="shop">
            <span>我的档口</span>
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
          @click="switchBtn(3);"
        >
          <div class="aui-flex-col aui-flex-middle aui-flex-item-10">
            <img src="../assets/image/icon/icon24.png" alt class="shop">
            <span>我的收藏</span>
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
          @click="switchBtn(1);"
        >
          <div class="aui-flex-col aui-flex-middle aui-flex-item-10">
            <img src="../assets/image/icon/icon30.png" alt class="order">
            <span>我的退货</span>
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
          @click="switchBtn(6);"
        >
          <div class="aui-flex-col aui-flex-middle aui-flex-item-10">
            <img src="../assets/image/icon/icon37.png" alt class="icon28">
            <span>我的通知</span>
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
          @click="switchBtn(4);"
          v-if="role==3"
        >
          <div class="aui-flex-col aui-flex-middle aui-flex-item-10">
            <img src="../assets/image/icon/icon25.png" alt class="shop">
            <span>统计数据</span>
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
          @click="switchBtn(5);"
        >
          <div class="aui-flex-col aui-flex-middle aui-flex-item-10">
            <img src="../assets/image/icon/icon28.png" alt class="icon28">
            <span>关于我们</span>
          </div>
          <img
            src="../assets/image/icon/more@2x.png"
            alt
            class="more aui-flex-item-1 aui-flex-offset-1"
          >
        </li>
      </ul>
    </div>
    <!-- <div class="server">
            <div class="aui-flex-col aui-flex-center aui-flex-middle" @click="callPhone">
                <img src="../../image/icon/call.png" alt="" class="call">
                <span>客服热线：4006-550-440</span>
            </div>
    </div>-->
    <img src="../assets/image/icon/icon32.png" alt class="call" @click="callPhone">
    <div class="copyRight">Copyright &copy; 2011-2018 优野商城版权所有</div>
  </div>
</template>
<script>
import Header from "../components/Header";
export default {
  name: "Mine",
  components: {
      Header
  },
  data() {
    return {
    
      role: 0,
      host: '',
      userMsg: [],
      isBoss: 0,
      stallUser: 0,
      userId:''
    };
  },
  created() {
    //   this.getMessage();
   
  },
  computed: {},
  methods: {
    checklogin:function(){
       this.$router.push('/login')

    },
    editMsg: function() {
      var that = this;
      api.openWin({
        name: "amend_win",
        url: "../amend_win.html",
        pageParam: {
          userMsg: that.userMsg,
          status: 0
        }
      });
    },
    // 获取列表内容
    getMessage: function() {
      var that = this;
        that.axios.post("/api" + that.api.getUserInfo,{
            userId:that.userId
        }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          that.userMsg = res.data.userMsg;
            that.role = Number(res.data.role);
        } else if (res.data.code == 400) {
          that.hotList = [];
        }
      });
     
    },

    switchBtn: function(tag) {
     
      var that = this;
      if (typeof that.userId == "undefined") {
        api.toast({
          msg: "您还未登录",
          duration: 2000,
          location: "middle"
        });
      } else if (tag == 0) {
      that.$router.push('/order')
      } else if (tag == 1) {
       that.$router.push('/reject')
      } else if (tag == 2 && that.role !== 0) {
       that.$router.push('/mouths')

      } else if (tag == 3) {
       that.$router.push('/collect')
      } else if (tag == 4 && that.role == 3) {
        api.openWin({
          name: "line_chart_win",
          url: "./line_chart_win.html",
          reload: true
        });
      } else if (tag == 5) {
      that.$router.push('/about')
      } else if (tag == 6) {
       that.$router.push('/message')
      }
    },
    // 拨打电话
    callPhone: function() {
     
    },
    judgIsBoss: function() {
         var that = this;
        that.axios.post("/api" + that.api.judgIsBoss,{
            userId:that.userId
        }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
        
            that.isBoss = 1;
        } else if (res.data.code == 400) {
          that.isBoss = 0;
        }
      });
    
    },
    isStallUser: function() {
              var that = this;
        that.axios.post("/api" + that.api.isStallUser,{
            userId:that.userId
        }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
        
            that.stallUser = 1;
        } else if (res.data.code == 400) {
          that.stallUser = 0;
        }
      });
     
    },
    checkAvatar: function() {
      var that = this;
   

    }
  }
};
</script>
<style scoped>
body {
  height: 100%;

}

.frame {
  background-color: #fff;
  height: 100%;
}

.second-line {
  height: 6rem;
  background-color: #44ca68;
}

.avatar-msg {
  padding: 0 1rem;
}

.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
}

.star {
  width: 0.7rem;
  height: 0.7rem;
  margin-right: 0.2rem;
}
.name-box {
  width: calc(100% - 3rem);
}

.name {
  width: 100%;
  color: #fff;
  padding-left: 0.5rem;
  font-size: 0.9rem;
}

.code {
  color: #fff;
  font-size: 0.7rem;
}

.order {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 1rem;
}

.list-item {
  height: 2.5rem;
  border-bottom: 1px solid #d7d7d7;
}

.shop {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 1rem;
}

.list-item span {
  font-size: 0.7rem;
}

.more {
  width: 0.7rem;
  height: 0.7rem;
  text-align: right;
  display: block;
}

.call {
  width: 0.7rem;
  height: 0.8rem;
  margin-right: 0.5rem;
}

.server {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  /*justify-content: space-between;*/
}

.login-btn {
  width: 5rem;
  font-size: 0.9rem;
  color: #44ca68;
  text-align: center;
  height: 2rem;
  line-height: 2rem;
  border-radius: 1rem;
  background-color: #fff;
  margin: 0 auto;
}

.edit-msg {
  color: #44ca68;
  text-align: center;
  font-size: 0.8rem;
  background-color: #fff;
  height: 2rem;
  line-height: 2rem;
  border-radius: 1rem;
}

.copyRight {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 5.2rem;
  height: 2rem;
  line-height: 2rem;
  margin-top: 0.3rem;
  font-size: 0.6rem;
  color: #888888;
  text-align: center;
}

.icon28 {
  width: 1rem;
  height: 1rem;
  margin-right: 0.8rem;
}
.call {
  width: 2.1rem;
  height: 1.6rem;
  display: block;
  position: fixed;
  right: 1rem;
  bottom: 6rem;
  z-index: 100;
}
.aui-content-padded {
  margin-top: 0 !important;
}
.role {
  color: red;
  padding-left: 0.5rem;
  font-size: 0.6rem;
}
</style>

