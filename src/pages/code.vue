<template>
  <div class="frame" id="code-box" v-cloak>
    <header class="aui-bar aui-bar-nav" id="header">
      <a class="aui-pull-left aui-btn" @click="closewin">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">验证码</div>
    </header>
    <div class="code-list">
      <div class="code-item aui-flex-col aui-flex-left aui-flex-middle">
        <div class="aui-flex-col aui-flex-left aui-flex-middle aui-flex-item-11">
          <label for="newpassword" class="aui-flex-item-3">新密码：</label>
          <input
            type="text"
            class="input-box"
            v-model="newpassword"
            v-if="newPwd1Show"
            id="newpassword"
          >
          <input type="password" class="input-box" v-model="newpassword" v-else id="newpassword">
        </div>
        <div @click="changeEye(1)">
          <img
            src="../assets/image/icon/icon8.png"
            alt
            class="icon1 aui-flex-item-1"
            v-if="newPwd1Show"
          >
          <img src="../assets/image/icon/icon7.png" alt class="icon2 aui-flex-item-1" v-else>
        </div>
      </div>
      <div class="code-item aui-flex-col aui-flex-left aui-flex-middle">
        <div class="aui-flex-col aui-flex-left aui-flex-middle aui-flex-item-11">
          <label for="againpassword" class="aui-flex-item-6">再次输入新密码：</label>
          <input
            type="text"
            class="input-box"
            v-model="againpassword"
            v-if="newPwd2Show"
            id="againpassword"
          >
          <input
            type="password"
            class="input-box"
            v-model="againpassword"
            id="againpassword"
            v-else
          >
        </div>
        <div @click="changeEye(2)">
          <img
            src="../assets/image/icon/icon8.png"
            alt
            class="icon1 aui-flex-item-1"
            v-if="newPwd2Show"
          >
          <img src="../assets/image/icon/icon7.png" alt class="icon2 aui-flex-item-1" v-else>
        </div>
      </div>
      <div class="code-item aui-flex-col aui-flex-left aui-flex-middle">
        <div class="aui-flex-col aui-flex-left aui-flex-middle aui-flex-item-9">
          <label for="code" class="aui-flex-item-4">验证码：</label>
          <input type="text" class="input-box" v-model="code" id="code">
        </div>
        <span class="get-code aui-flex-item-3" @click="getCode" v-if="codeShow==0">获取验证码</span>
        <span class="get-code1 aui-flex-item-3" v-if="codeShow==1">
          <span>{{time}}</span>s
        </span>
        <span class="get-code aui-flex-item-3" @click="getCode" v-if="codeShow==2">重新发送</span>
      </div>
    </div>
    <div class="next-box">
      <div class="confirm-btn" @click="confirm" id="btn" :class="pointNone?'point':''">确定</div>
      <img src="../assets/image/icon/login2.png" alt class="login2">
    </div>
  </div>
</template>
<script>
export default {
  name: "Code",
  components: {},
  data() {
    return {
      host: "",
      phoneNumber: "",
      newpassword: "",
      againpassword: "",
      newPwd1Show: false,
      newPwd2Show: false,
      code: "", //输入的验证码
      mobileCode: "", //手机收到的验证码
      time: 60,
      codeShow: 0,
      userId: "",
      pointNone: false,
      ajpush: "",
      registionId: "",
      point0Show: false
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
    // 确认按钮
    confirm: function() {
      var that = this;
      that.pointNone = true;
      // $api.attr($api.byId('btn'), 'disabled', true);
      // alert("newpassword:"+that.newpassword+"+againpassword"+that.againpassword)
      if (that.newpassword == "" || that.againpassword == "") {
        api.toast({
          msg: "密码不能为空",
          duration: 2000,
          location: "middle"
        });
        that.pointNone = false;
        // $api.removeAttr($api.byId('btn'), 'disabled');
        return;
      } else if (that.newpassword !== that.againpassword) {
        api.toast({
          msg: "两次密码不一样，请重新输入",
          duration: 2000,
          location: "middle"
        });
        that.pointNone = false;
        // $api.removeAttr($api.byId('btn'), 'disabled');
        return;
      } else if (that.code == "") {
        api.toast({
          msg: "验证码不能为空",
          duration: 2000,
          location: "middle"
        });
        that.pointNone = false;
        // $api.removeAttr($api.byId('btn'), 'disabled');
        return;
      } else {
        // api.showProgress({
        //     title: '努力加载中...',
        //     modal: false
        // });
        api.ajax(
          {
            url: vuedata.host + "/api/user/reg",
            method: "post",
            dataType: "json",
            data: {
              values: {
                mobile: vuedata.phoneNumber,
                pw1: vuedata.newpassword,
                pw2: vuedata.againpassword,
                code1: vuedata.code,
                code2: vuedata.mobileCode,
                registionId: vuedata.registionId
              }
            }
          },
          function(ret, err) {
            // alert('123');
            // alert(JSON.stringify(ret))
            // api.hideProgress();
            if (ret.code == 0) {
              vuedata.userId = ret.data.userId;
              $api.setStorage("userId", vuedata.userId);
              var param = {
                alias: ret.data.alias,
                tags: ["tag1", "tag2"]
              };
              vuedata.ajpush.bindAliasAndTags(param, function(ret) {
                // alert("tag:" + JSON.stringify(ret));
                var statusCode = ret.statusCode;
              });
              api.toast({
                msg: "注册成功",
                duration: 2000,
                location: "middle"
              });

              api.execScript({
                name: "home_win",
                script: "openHome0();"
              });
              setTimeout(function() {
                api.closeToWin({
                  name: "home_win"
                });
                // $api.removeAttr($api.byId('btn'), 'disabled');
              }, 1000);
            } else {
              api.toast({
                msg: ret.message,
                duration: 2000,
                location: "middle"
              });

              vuedata.pointNone = false;
              // $api.removeAttr($api.byId('btn'), 'disabled');
            }
          }
        );
      }
    },
    changeEye: function(tag) {
      // alert("11")
      if (tag == 1) {
        this.newPwd1Show = !this.newPwd1Show;
      } else if (tag == 2) {
        this.newPwd2Show = !this.newPwd2Show;
      }
    },
    getCode: function() {
      var that = this;
      // api.showProgress({
      //     title: '努力加载中...',
      //     modal: false
      // });
      that.time = 60;
      var timer = setInterval(fun1, 1000);
      that.codeShow = 1;
      function fun1() {
        that.time--;
        if (that.time < 0) {
          that.codeShow = 2;
          clearTimeout(timer); //清除定时器
          that.time = 60;
        }
      }

      api.ajax(
        {
          url: that.host + "/api/api/sendMsg",
          method: "post",
          dataType: "json",
          data: {
            values: {
              tel: that.phoneNumber
            }
          }
        },
        function(ret, err) {
          // api.hideProgress();
          // alert(JSON.stringify(ret))
          if (ret.code == 0) {
            that.mobileCode = ret.data.mobileCode;
          } else {
            api.toast({
              msg: ret.message,
              duration: 2000,
              location: "middle"
            });
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

.confirm-btn {
  width: 70%;
  margin: 0 auto;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background-color: #44ca68;
  color: #fff;
  font-size: 0.9rem;
  border-radius: 0.5rem;
}

.login2 {
  width: 7.5rem;
  height: 3.5rem;
  display: block;
  margin: 3rem auto 1rem auto;
}

.next-box {
  width: 100%;
  height: 12rem;
  margin-top: 4rem;
}

.code-list {
  width: 100%;
  padding: 0 1rem;
}

.code-item {
  border-bottom: 1px solid #d7d7d7;
  height: 3rem;
}

.input-box {
  width: 50% !important;
}

.input-box1 {
  width: 70% !important;
}

.icon1 {
  width: 1.2rem;
  height: 1rem;
  display: block;
}

.icon2 {
  width: 1rem;
  height: 0.5rem;
  display: block;
}

[v-cloak] {
  display: none;
}

.get-code {
  background-color: #44ca68;
  height: 1.6rem;
  line-height: 1.6rem;
  border-radius: 0.8rem;
  color: #fff;
  font-size: 0.6rem;
  text-align: center;
}

.get-code1 {
  background-color: #ddd;
  height: 1.6rem;
  line-height: 1.6rem;
  border-radius: 0.8rem;
  color: #fff;
  font-size: 0.8rem;
  text-align: center;
}

.get-code1 span {
  color: #ee0a0a;
}

.point {
  pointer-events: none;
}
</style>
