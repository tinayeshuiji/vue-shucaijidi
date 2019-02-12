<template>
  <div class="frame">
    <!-- <header class="aui-bar aui-bar-nav" id="header">
      <a class="aui-pull-left aui-btn" @click="closewin();">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">我的订单</div>
    </header> -->
    <div class="today-list aui-flex-col aui-flex-middle aui-flex-center" id="order-list">
      <div
        v-for="(item,index) in tab"
        :key="index"
        :class="status==item.id?'today-active today-item aui-flex-item-3 aui-text-center':'today-item aui-flex-item-3 aui-text-center' "
        @click="changeTab(item.id);"
      >
        <span>{{item.title}}</span>
      </div>
    </div>
    <div class="aui-content aui-margin-b-15">
      <ul class="aui-list aui-media-list">
        <li class="aui-list-item" v-for="(item,index) in orderList" :key="index">
          <div>
            <div class="aui-flex-col aui-flex-between aui-flex-middle">
              <div class="aui-flex-item-9 mounth-title aui-flex-col aui-flex-start aui-flex-middle">
                <span class="aui-flex-item-4">订单编号:</span>
                <span class="aui-flex-item-8">{{item.orderId}}</span>
              </div>
              <span class="aui-flex-item-3 order-status">{{item.status}}</span>
            </div>
            <div
              class="aui-flex-col aui-flex-left aui-flex-middle"
              v-for="good in item.goodsList"
              :key="good.goodId"
              style="margin-top:0.5rem;"
            >
              <img
                :src="host+good.img"
                style="width:3rem;height:3rem;display:block;border:1px solid #f9f9f9;border-radius:50%;"
                tapmode
                @click="openProduct(good.goodId)"
              >
              <div
                class="goods-item aui-flex-col aui-flex-between aui-flex-middle"
                tapmode
                @click="openOrderNonpay(item.orderId)"
              >
                <div class="goods-detail aui-flex-item-5">
                  <h1 class="aui-ellipsis-2">{{good.goodName}}</h1>
                </div>
                <div
                  class="goods-num aui-flex-item-7 aui-flex-col aui-flex-between aui-flex-middle"
                >
                  <span class="aui-flex-item-6">￥{{good.goodPrice}}</span>
                  <span class="aui-flex-item-6" style="text-align:center;">X {{good.cartNum}}</span>
                </div>
              </div>
            </div>
            <div class="total-msg">
              共{{item.totalNum}}件，实付：
              <span>￥{{item.price}}</span>
            </div>
          </div>
          <div class="aui-flex-col aui-flex-right aui-flex-middle aui-padded-r-15">
            <div class="cancle" @click="cancleOrder(item.orderId,index)">取消订单</div>
            <div class="pay" @click="goPayStyle(item.orderId)">去付款</div>
            <div class="check" tapmode @click="openOrderNonpay(item.orderId)">查看订单</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="page<totalPage &&orderList.length!==0" class="load-more">上拉加载更多。。。</div>
    <div v-if="page>=totalPage &&orderList.length!==0" class="load-more">没有更多内容了哦。。。</div>
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
  name: "Order",
  components: {},
  data() {
    return {
      host: "",
      orderList: [],
      tab: [
        { id: 0, title: "待付款" },
        { id: 1, title: "待发货" },
        { id: 2, title: "待收货" },
        { id: 3, title: "已完成" }
      ],
      status: 0,
      userId: 139,
      page: 1,
      count: 10,
      totalPage: 0
    };
  },
  created() {
    this.host = this.Global.URL;
    this.getOrderList();
  },
  computed: {},
  methods: {
    closewin: function() {
      this.$router.go(-1);
    },
    changeTab: function(tab) {
      console.log(tab);
      if (this.status == tab) {
        return;
      } else {
        this.status = tab;
      }
    },
    getOrderList: function() {
      var that = this;
        that.axios
        .post("/api" + that.api.getOrderListByUserId, {
          userId: that.userId,
          status:that.status,
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

.today-list {
  height: 2.5rem;
}

.today-item {
  height: 100%;
  line-height: 2.5rem;
}

.today-item span {
  display: block;
  font-size: 0.7rem;
  color: #000;
  width: 100%;
  height: 100%;
}

.today-active {
  color: #44ca68;
  border-bottom: 2px solid #44ca68;
}

.today-active span {
  color: #44ca68;
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
  padding-left: 0.2rem;
}

.goods-msg span {
  display: block;
  color: #656565;
  font-size: 0.6rem;
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
  width: 4rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 1.5rem;
  background-color: #f04242;
  color: #fff;
  font-size: 0.6rem;
  text-align: center;
  margin-right: 1rem;
}

.pay {
  width: 4rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 1.5rem;
  background-color: #ffa800;
  color: #fff;
  font-size: 0.6rem;
  text-align: center;
  margin-right: 0.5rem;
}
.check {
  width: 4rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 1.5rem;
  background-color: #44ca68;
  color: #fff;
  font-size: 0.6rem;
  text-align: center;
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

.load-more {
  font-size: 0.9rem;
  color: #ddd;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
}
</style>
