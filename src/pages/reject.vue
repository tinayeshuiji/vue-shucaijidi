<template>
  <div id="box" v-cloak>
    <div class="aui-content aui-margin-b-15" v-if="orderList.length>0">
      <ul class="aui-list aui-media-list">
        <li class="aui-list-item" v-for="(item,index) in orderList" :key="index">
          <div>
            <div class="aui-flex-col aui-flex-between aui-flex-middle">
              <div class="aui-flex-item-8 mounth-title aui-flex-col aui-flex-start aui-flex-middle">
                <span>退款编号:</span>
                <span>{{item.refundId}}</span>
              </div>
              <div class="aui-flex-item-4 order-status">{{item.status}}</div>
            </div>
            <div
              class="aui-flex-col aui-flex-left aui-flex-middle"
              v-for="good in item.goods"
              :key="good.goodId"
              style="margin-top:0.5rem;"
            >
              <img
                :src="host+good.img"
                class="aui-flex-item-3"
                style="width:3rem;height:3rem;border:1px solid #f9f9f9;border-radius:50%;"
                @click="openProduct(good.goodId)"
              >
              <div
                class="goods-item aui-flex-col aui-flex-between aui-flex-middle"
                @click="goRejectDetail(item.refundId)"
              >
                <div class="goods-detail aui-flex-item-5">
                  <h1 class="aui-ellipsis-2">{{good.goodName}}</h1>
                </div>
                <div
                  class="goods-num aui-flex-item-7 aui-flex-col aui-flex-between aui-flex-middle"
                >
                  <span class="aui-flex-item-6">￥{{good.goodPrice}}</span>
                  <span class="aui-flex-item-6">X{{good.cartNum}}</span>
                </div>
              </div>
            </div>
            <div class="total-msg">
              退款总额：
              <span>￥{{item.money}}元</span>
            </div>
          </div>
          <div class="aui-flex-col aui-flex-right aui-flex-middle aui-padded-r-15">
            <div
              class="cancle"
              @click="cancleOrder(item.refundId,index)"
              v-if="item.status=='已完成'||item.status=='已取消'||item.status=='已拒绝'"
            >删除订单</div>
            <div class="pay" @click="goRejectDetail(item.refundId)">查看进度</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="page<totalPage && orderList.length!==0" class="load-more">上拉加载更多。。。</div>
    <div v-if="page>=totalPage && orderList.length!==0" class="load-more">没有更多内容了哦。。。</div>
    <!-- 无内容时候显示 -->
    <div
      class="no-order-box aui-flex-row aui-flex-center aui-flex-middle"
      v-if="orderList.length==0"
    >
      <img src="../assets/image/icon/no-order.png" alt class="no-order">
      <span>您还没有相关的订单哦</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Reject",
  components: {},
  data() {
    return {
      host: "",
      orderList: [],
      userId: 139,
      page: 1,
      count: 10,
      totalPage: 0
    };
  },
  created() {
    this.host = this.Global.URL;
    this.getList();
  },
  computed: {},
  methods: {
    closewin: function() {
      this.$router.go(-1);
    },
    getList: function() {
      var that = this;
      that.axios
        .post("/api" + that.api.getRefundList, {
          userId: that.userId,
          page: that.page,
          count: that.count
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            that.orderList = res.data.data;
            that.page = res.data.page;
            that.totalPage = res.data.totalPage;
          } else if (res.data.code == 400) {
            that.orderList = [];
          }
        });
     
    },

    getOrderListByPage: function() {
           var that = this;
      that.page++;
      if (that.page <= that.totalPage) {
         that.axios
        .post("/api" + that.api.getRefundList, {
          userId: that.userId,
          page: that.page,
          count: that.count
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
             var tem = that.orderList;
              that.orderList = tem.concat(res.data.data);
            that.page = res.data.page;
          } else if (res.data.code == 400) {
            that.orderList = [];
          }
        });
       
      } else {
      }
    }
  }
};
</script>
<style scoped>
body {
  height: 100%;
  overflow: hidden;
  background: #fff;
}

[v-cloak] {
  display: none;
}

.aui-bar-nav {
  background-color: #44ca68;
}
body {
  height: 100%;
  overflow: hidden;
  background: #fff;
  overflow-y: scroll;
}

.aui-list .aui-list-item {
  min-height: 6rem !important;
  padding: 0.5rem !important;
}

.goods-item {
  width: calc(100% - 3rem);
}

.goods-detail {
  /*width: 70%;*/
  padding-left: 0.2rem;
}

.goods-num {
}

.goods-num span {
  display: block;
  font-size: 0.6rem;
  color: #a5a5a5;
  text-align: center;
}

.goods-num span:nth-child(1) {
  color: #f04242;
}

.goods-detail h1 {
  font-size: 0.8rem;
  text-align: left;
}

.goods-msg span {
  display: block;
  color: #656565;
  font-size: 0.6rem;
}

.aui-media-list .aui-list-item {
  border: none !important;
}

.total-msg {
  width: 100%;
  height: 2.2rem;
  line-height: 2.2rem;
  font-size: 0.8rem;
  text-align: right;
  padding: 0 1rem;
}

.total-msg span {
  color: #f04242;
}

.cancle {
  width: 4.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 1.5rem;
  background-color: #f04242;
  color: #fff;
  font-size: 0.7rem;
  text-align: center;
  margin-right: 1rem;
}

.pay {
  width: 4.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 1.5rem;
  background-color: #44ca68;
  color: #fff;
  font-size: 0.7rem;
  text-align: center;
}
.cancle {
  width: 4.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 1.5rem;
  background-color: #f04242;
  color: #fff;
  font-size: 0.7rem;
  text-align: center;
  margin-right: 0.5rem;
}

.no-order-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 1.5rem;
}

.no-order {
  width: 12rem;
  height: 12rem;
  display: block;
}

.no-order-box span {
  margin-top: 1.5rem;
  color: #b1b1b1;
  font-size: 0.8rem;
}

.order-title {
  height: 2rem;
  line-height: 2rem;
}

.order-title span {
  font-size: 0.8rem;
  text-align: left;
}

.mounth-title {
  min-height: 2rem;
}

.mounth-title span:nth-child(1) {
  font-size: 0.8rem;
  margin-right: 0.5rem;
}

.mounth-title span:nth-child(2) {
  font-size: 0.7rem;
}

.order-status {
  color: #f04242;
  text-align: right;
  padding-right: 0.6rem;
  font-size: 0.7rem;
}

.aui-list-item {
  background-color: #fff;
}

.load-more {
  font-size: 0.9rem;
  color: #ddd;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
}
</style>
