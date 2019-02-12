<template>
  <div>
    <div class="product-box" id="box" v-cloak>
      <div class="product-detail">
        <div class="detail-pic">
          <img :src="host+productList.img" alt>
        </div>
        <div
          class="product-msg aui-flex-col aui-flex-left aui-flex-middle"
          style="padding-top:0.5rem;"
        >
          <h1 class="aui-flex-item-12 aui-ellipsis-2">{{productList.goodName}}</h1>
        </div>
        <div class="product-msg aui-flex-col aui-flex-left aui-flex-middle">
          <h2 class="aui-flex-item-8 aui-ellipsis-2">
            重量：
            <span>{{productList.weight}}</span>
          </h2>
          <h2 class="aui-flex-item-4">
            库存：
            <span>{{productList.inStock}}件</span>
          </h2>
        </div>
        <div class="product-msg aui-flex-col aui-flex-left aui-flex-middle">
          <div class="product-price aui-flex-item-8">
            <span>￥{{productList.currentPrice}}</span>
            <span>￥{{productList.originalPrice}}</span>
          </div>
          <h2 v-if="productList.isSalf==1" class="aui-flex-item-4">
            单人限购：
            <span class="limit">{{productList.limit}}件</span>
          </h2>
        </div>
      </div>
      <div class="send-time">温馨提示：{{productList.msg}}</div>
      <!-- <div class="aui-flex-col  aui-flex-middle aui-flex-center product-send">
            <div class="aui-flex-item-6 aui-flex-row aui-flex-center">
                <img src="../image/icon/weight.png" alt="" class="weight">
                <h1 class="title">{{productList.weight}}g/份</h1>
            </div>
            <div class="aui-flex-item-6 aui-flex-row aui-flex-center aui-flex-middle">
                <img src="../image/icon/location.png" alt="" class="weight">
                <h1 class="title">福建</h1>
            </div>
      </div>-->
      <div class="remark-box">
        <h1>商品介绍</h1>
        <div class="remark" id="remark"></div>
      </div>
    </div>

    <footer class="aui-bar aui-bar-tab aui-flex-col aui-flex-between aui-flex-middle" id="footer">
      <div class="aui-flex-item-6 aui-flex-col aui-flex-between aui-flex-middle cart-left">
        <div
          class="aui-flex-item-4 aui-flex-offset-1"
          style="text-align:center;"
          tapmode
          @click="goCart"
        >
          <div class="aui-badge" v-if="totalNum>0">{{totalNum}}</div>
          <i class="aui-iconfont aui-icon-cart"></i>
          <div class="aui-bar-tab-label">购物车</div>
        </div>
        <!-- <h1 class="aui-flex-item-8" style="text-align:right">已选择<span>{{productList.cartNum}}</span>件</h1> -->
        <div
          class="aui-flex-row aui-flex-between aui-flex-middle aui-flex-item-4 aui-flex-offset-2 collect-box"
          @click="changeCollect(productList.isCollected)"
        >
          <img
            src="../assets/image/icon/icon23.png"
            alt
            class="collect-pic"
            v-if="productList.isCollected==1"
          >
          <img src="../assets/image/icon/icon22.png" alt class="collect-pic" v-else>
          <h2 class="collect-msg">收藏</h2>
        </div>
      </div>
      <div
        class="aui-flex-item-6 add-cart"
        tapmode
        v-if="productList.cartNum==0"
        @click="changeCount(1,productList.goodId)"
      >加入购物车</div>
      <div
        class="aui-flex-item-6 add-cart aui-flex-col aui-flex-between aui-flex-middle"
        v-if="productList.cartNum>0"
      >
        <span class="aui-flex-item-4" @click="changeCount(0,productList.goodId)">-</span>
        <span class="aui-flex-item-4 count">{{productList.cartNum}}</span>
        <!-- <input type="number" class="count" v-model="productList.cartNum." @blur="blurCount($event,productList.goodId)" v-if="productList.cartNum>0"> -->
        <span class="aui-flex-item-4" @click="changeCount(1,productList.goodId)">+</span>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "Good",
  components: {},
  data() {
    return {
      host: "",
      goodId: "",
      productList: [],
      sendTime: [],
      richHeight: {
        height: ""
      },
      userId: "",
      totalNum: ""
    };
  },
  created() {
    this.host = this.Global.URL;
    this.getProduct();
    var id=this.$route.params.id;
  },
  computed: {},
  methods: {
    changeCollect: function(isCollected) {
      var that = this;
      that.axios
        .post("/api" + that.api.Collected, {
          goodId: that.goodId,
          userId: that.userId,
          isCollected: isCollected
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
              if (isCollected == 0) {
              that.productList.isCollected = 1;
            } else if (isCollected == 1) {
              that.productList.isCollected = 0;
            }
          } else {
            that.$message({
              message: res.data.message,
              type: "error"
            });
          }
        });
      
    },
    getProduct: function() {
      var that = this;
      that.axios
        .post("/api" + that.api.getGoodInfo, {
          goodId: that.goodId,
          userId: that.userId
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            that.productList = ret.data.data;
          } else {
            that.$message({
              message: res.data.message,
              type: "error"
            });
          }
        });
    }
  }
};
</script>
<style scoped>
#footer {
  min-height: 2.5rem;
}

.frame {
  background-color: #fff;
}

.aui-bar-nav {
  background-color: #44ca68;
}

.cart-left {
  border-top: 1px solid #f0f0f0;
  padding: 0 0.5rem;
  height: 100%;
}

.cart-left h1 {
  font-size: 0.7rem;
}

.cart-left h1 span {
  color: #ff0000;
}

.add-cart {
  height: 100%;
  background-color: #44ca68;
  color: #fff;
  font-size: 0.8rem;
  line-height: 2.5rem;
}

[v-cloak] {
  display: none;
}
.count {
  background-color: #79e496;
  width: 33.33333333% !important;
  border: 1px solid #fff !important;
  text-align: center;
}
.collect-pic {
  width: 1rem;
  height: 0.8rem;
  margin: 0 auto;
}
.collect-msg {
  font-size: 0.6rem;
  color: #757575;
  text-align: center;
  padding-top: 0.2rem;
}
.collect-box {
  /*border:1px solid red;*/
}
.product-box {
  background-color: #fff;
  border-top: 1px solid #42c465;
}

.product-detail {
  width: 100%;

  /*height: 17rem;*/
  background: url("../assets/image/icon/detail-bg.png");
}

.detail-pic {
  width: 100%;
  height: 10rem;
  display: block;
  margin: 0 auto;
  overflow: hidden;
}
.detail-pic img {
  width: 100%;
  height: 100%;
}
.product-msg {
  padding: 0 0.5rem;
  /*height: 1.5rem;*/
}

.product-msg h1 {
  font-size: 0.8rem;
  color: #fff;
}

.product-msg h2 {
  font-size: 0.7rem;
  color: #e8f3eb;
  /*text-align: center;*/
  /*padding: 0 1rem;*/
}

.product-price {
  height: 1.8rem;
  line-height: 1.8rem;
}

.product-price span:nth-child(1) {
  font-size: 1.2rem;
  color: #ffde00;
  margin-right: 0.5rem;
}

.product-price span:nth-child(2) {
  font-size: 0.7rem;
  color: #f6faf7;
  text-decoration: line-through;
}

.weight {
  width: 1.7rem;
  height: 1.7rem;
}

.product-send {
  height: 5rem;
}

.title {
  font-size: 0.7rem;
  color: #657669;
  margin-top: 0.5rem;
}

[v-cloak] {
  display: none;
}

.remark-box {
  padding: 0 0.5rem;
}

.remark-box h1 {
  font-size: 0.9rem;
  height: 2rem;
  line-height: 2rem;
}

.remark {
  width: 100%;
  overflow-y: scroll;
  /*padding: 0 0.5rem;*/
  /*height: auto;
          line-height: 1.5rem;
          font-size: 0.7rem;
          color: #000;
          text-align: left;
           text-indent:1.5rem;*/
}

.send-time {
  text-align: left;
  padding: 0.5rem;
  max-height: 3rem;
  font-size: 0.8rem;
}

.send-time span {
  color: #ee0a0a;
}
.remark img {
  margin: 0 auto;
  display: block;
  width: 100%;
  height: 100%;
}

.limit {
  color: #ee0a0a;
}
</style>
