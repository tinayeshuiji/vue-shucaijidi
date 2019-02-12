<template>
  <div class="frame" id="register-box">
    <!-- <header class="aui-bar aui-bar-nav" id="header">
      <a class="aui-pull-left aui-btn" @click="closewin();">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">立即注册</div>
    </header> -->
    <div class="phone-box">
      <label class="line aui-flex-col aui-flex-left aui-flex-middle" for="phone">
        <span class="aui-flex-item-2">+86</span>
        <input type="text" placeholder="请输入手机号" class="input-box" v-model="phoneNumber" id="phone">
      </label>
      <h1>将会对您输入的手机号码进行验证</h1>
    </div>

    <div class="next-box">
      <div class="next" @click="nextStep" :class="pointNone?'point':''">下一步</div>
      <img src="../assets/image/icon/login2.png" alt class="login2">
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  components: {},
  data() {
    return {
      host: ""
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
    nextStep: function() {
      // alert(vm.phoneNumber)
      var that = this;
      that.pointNone = true;
      if (that.phoneNumber == "") {
        api.toast({
          msg: "手机号不能为空",
          duration: 2000,
          location: "middle"
        });
        that.pointNone = false;
        return;
      } else if (!/^1[34578]\d{9}$/.test(that.phoneNumber)) {
        api.toast({
          msg: "手机号格式不正确",
          duration: 2000,
          location: "middle"
        });
        that.pointNone = false;
        return;
      } else {
        that.axios
          .post("/api" + that.api.checkMobile, {
            tel: that.phoneNumber
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
                this.$router.push('/code')
            } else if (res.data.code == 400) {
              that.pointNone = false;
            }
          });
      }
    }
  }
};
</script>
<style scoped>
.frame {
  width:100%;
  height: 100%;
  background-color: #fff;
}

.aui-bar-nav {
  background-color: #44ca68;
}

.more {
  width: 0.7rem;
  height: 0.7rem;
}

.avatar {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
}

.next {
  width: 70%;
  margin: 0 auto;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background-color: #44ca68;
  color: #fff;
  font-size: 0.9rem;
}

.phone-box {
  width: 70%;
  margin: 5rem auto;
}

.input-box {
  width: 80% !important;
  padding-left: 1rem !important;
  font-size: 0.8rem;
}

.line {
  border-bottom: 1px solid #d7d7d7;
}

.line span {
  border-right: 1px solid #d7d7d7;
  font-size: 0.7rem;
}

.phone-box h1 {
  font-size: 0.6rem;
  color: #010101;
  height: 2rem;
  line-height: 2rem;
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
}

.point {
  pointer-events: none;
}
</style>
