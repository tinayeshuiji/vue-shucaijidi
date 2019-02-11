<template>
  <div class="login-container" id="login-box" v-cloak>
    <div class="aui-flex-row aui-flex-between aui-flex-center container">
      <img src="../assets/image/icon/icon19.png" alt class="login1">
      <ul class="login-list">
        <li class="login-item">
          <label for="phoneNumber" class="item-label">请输入手机号码</label>
          <input type="text" class="phone-number" v-model="phoneNumber" id="phoneNumber">
        </li>
        <li class="login-item">
          <label for="passWord" class="item-label">请输入密码</label>
          <div class="aui-flex-col aui-flex-left aui-flex-middle">
            <input
              type="text"
              class="phone-number aui-flex-item-11"
              v-model="passWord"
              v-if="passwShow"
              id="passWord"
            >
            <input
              type="password"
              class="phone-number aui-flex-item-11"
              v-model="passWord"
              id="passWord"
              v-else
            >
            <div @click="changeEye">
              <img
                src="../assets/image/icon/icon8.png"
                alt
                class="icon1 aui-flex-item-1"
                v-if="passwShow"
              >
              <img src="../assets/image/icon/icon7.png" alt class="icon2 aui-flex-item-1" v-else>
            </div>
          </div>
        </li>
        <div class="forget" tapmode @click="openForgetWin">忘记密码点这里</div>
      </ul>
      <button class="login-btn" @click="login" id="btn" :class="pointNone?'point':''">立即登录</button>
      <div class="no-account" tapmode @click="openRegisterWin">没有账号？立即注册一个吧</div>
      <img src="../assets/image/icon/login2.png" alt class="login2">
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      host: "",
      phoneNumber: "",
      passWord: "",
      userId: "",
      passwShow: false,
      h: 0,
      pointNone: false,
      ajpush: "",
      registionId: "123"
    };
  },
  created() {
    this.host = this.Global.URL;
  },
  computed: {},
  methods: {
   
    // 注册账号
    openRegisterWin: function() {
      this.$router.push("/register");
    },
    // 获取列表内容
    login: function() {
      // alert(vm.phoneNumber + ":" + vm.passWord)
      var that = this;
      that.pointNone = true;

      if (that.phoneNumber == "") {
        that.$message({
          message: "电话号码不能为空",
          type: "error"
        });

        that.pointNone = false;
        return;
      } else if (!/^1[34578]\d{9}$/.test(that.phoneNumber)) {
        that.$message({
          message: "电话号码格式不正确",
          type: "error"
        });

        that.pointNone = false;
        return;
      } else if (that.passWord == "") {
        that.$message({
          message: "密码不能为空",
          type: "error"
        });
        that.pointNone = false;
        return;
      } else {
        that.axios
          .post("/api" + that.api.login, {
            mobile: that.phoneNumber,
            password: that.passWord,
            registionId: that.registionId
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              that.$message({
                message: "登录成功",
                type: "success"
              });
              that.userId = res.data.data.userId;
              localStorage.setItem("userId", JSON.stringify(that.userId));
            } else if (res.data.code == 400) {
               that.$message({
                message: res.data.message,
                type: "error"
              });
            }
          });
       
      }
    },
    openForgetWin: function() {
      api.openWin({
        name: "forget_win",
        url: "./forget_win.html"
      });
    },
    changeEye: function() {
      this.passwShow = !this.passwShow;
    }
  }
};
</script>
<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

.login-container {
  width: 100%;
  height: 100%;
  background: url("../assets/image/icon/login-bg.png");
  background-size: 100% 100%;
  overflow: hidden;
}

.login1 {
  width: 10rem;
  max-height: 6rem;
  display: block;
}

.login-list {
  width: 80%;
  padding-top: 1rem;
}

.login-item {
  width: 100%;
  border-bottom: 1px solid #fff;
  margin: 0 auto;
}

.phone-number {
  color: #fff !important;
  font-size: 0.8rem;
  width: 90% !important;
  padding: 0 0.5rem !important;
}

.item-label {
  font-size: 0.7rem;
  color: #fff;
}

.forget {
  text-align: right;
  font-size: 0.7rem;
  color: #fff;
  height: 2rem;
  line-height: 2rem;
}

.login-btn {
  width: 80%;
  height: 2.25rem;
  line-height: 2.25rem;
  font-size: 0.9rem;
  color: #24b84c;
  text-align: center;
  background-color: #fff;
}

.no-account {
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  color: #fff;
  font-size: 0.7rem;
}

.login2 {
  width: 7.5rem;
  max-height: 3rem;
  display: block;
}

[v-cloak] {
  display: none;
}

.aui-bar-nav {
  background-color: #44ca68;
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

.container {
  min-height: 100%;
  padding: 0 0 3rem 0;
}
.point {
  pointer-events: none;
}
</style>
