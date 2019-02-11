<template>
  <div id="home-box" v-cloak class="frame">

    <div class="message-list">
      <div
        class="message-item aui-flex-col aui-flex-left aui-flex-middle"
        v-for="(item,index) in msgList"
        :key="index"
      >
        <div class="aui-flex-item-1" v-if="deleteShow" @click="changeSelect(index,item.id)">
          <img src="../assets/image/icon/check.png" alt class="check" v-if="item.select">
          <img src="../assets/image/icon/icon16.png" alt class="check" v-else>
        </div>
        <div
          :class="deleteShow?'aui-flex-item-11':'aui-flex-item-12'"
          @click="goDetail(item.data.orderId,item.type)"
        >
          <div class="aui-flex-col aui-flex-left aui-flex-middle title-line">
            <div class="aui-flex-item-7 title-name">{{item.title}}</div>
            <div class="aui-flex-item-5 time">{{item.createAt}}</div>
          </div>
          <div class="content aui-ellipsis-2">{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Message",
  components: {},
  data() {
    return {
      host: "",
      deleteShow: false,
      userId: 139,
      msgList: []
    };
  },
  created() {
    this.host = this.Global.URL;
    this.getContent();
    
  },
  computed: {},
  methods: {
    getContent: function() {
      var that = this;
      that.axios.post("/api" + that.api.getInformationList,{
        userId:that.userId
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          that.msgList = res.data.data;
        } else if (res.data.code == 400) {
          that.msgList = [];
        }
      });
      
    },
    closewin:function(){
      this.$router.go(-1)
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}

.aui-bar-nav {
  background-color: #44ca68;
}

.amend {
  position: absolute;
  right: 0rem;
  font-size: 0.7rem;
  /*padding:0 1rem;*/
  width: 3rem;
}
body {
  height: 100%;
  overflow: hidden;
  background-color: #f9f9f9;
}

.message-list {
  background-color: #f9f9f9;
  padding: 0.5rem;
}

.message-item {
  width: 100%;
  height: 4.5rem;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

.icon38 {
  width: 2rem;
  height: 2rem;
  display: block;
}

.msg-content {
  width: calc(100% - 2rem);
  border: 1px solid red;
  height: 100%;
  padding-left: 0.5rem;
}

.title-line {
  height: 2rem;
}

.time {
  font-size: 0.7rem;
  color: #a5a5a5;
  text-align: right;
}

.title-name {
  font-size: 0.8rem;
  color: 000;
}

.content {
  height: 2rem;
  font-size: 0.7rem;
  color: #a5a5a5;
}

.check {
  width: 0.9rem;
  height: 0.9rem;
  display: block;
}
</style>
