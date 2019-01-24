<template>
  <div class="frame">
    <header class="aui-bar aui-bar-nav" id="header">
      <a class="aui-pull-left aui-btn" @click="closewin">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">账号与安全</div>
    </header>
    <div class="aui-content-padded">
      <ul class="aui-list-view">
        <li
          class="aui-list-view-cell list-item aui-flex-col aui-flex-middle"
          
          @click="openAmendPassWin"
        >
          <div class="aui-flex-col aui-flex-middle aui-flex-item-10">
            <span>修改密码</span>
          </div>
          <img src="../assets/image/icon/more@2x.png" alt class="more aui-flex-item-1 aui-flex-offset-1">
        </li>
      </ul>
    </div>
    <!-- <div class="next" tapmode onclick="openAmendPassWin();">下一步</div> -->
  </div>
</template>
<script>
export default {
  name: "Safe",
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
    openAmendPassWin:function(){

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
}
.list-item {
  height: 2.5rem;
  border-bottom: 1px solid #d7d7d7;
}
.list-item span:nth-child(2) {
  font-size: 0.6rem;
  color: #888888;
  padding: 0 0.5rem;
}
.list-item span:nth-child(3) {
  font-size: 0.7rem;
  color: #010101;
}

.avatar {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
}
.next {
  position: fixed;
  bottom: 4rem;
  left: 15%;
  width: 70%;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background-color: #44ca68;
  color: #fff;
  font-size: 0.9rem;
}
</style>
