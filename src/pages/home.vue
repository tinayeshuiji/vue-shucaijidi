<template>
  <div>
    <div v-cloak>
      <div id="aui-slide">
        <div class="aui-slide-wrap" id="banner"></div>
        <div class="aui-slide-page-wrap" id="dot"></div>
      </div>
      <div class="notice-list" id="notice-list">
        <div
          class="msg-box aui-flex-col aui-flex-middle"
          id="msg-box"
          v-for="(item,index) in NoticeList"
          :key="index"
        >
          <img src="../assets/image/icon/souse.png" alt class="aui-flex-item-2 souse">
          <span>{{item.content}}</span>
        </div>
      </div>
      <!--  热门-->
      <div>
        <div class="aui-flex-col aui-flex-center aui-flex-middle hot-title">
          <img src="../assets/image/icon/icon17.png" alt>
          <span>热门推荐</span>
          <img src="../assets/image/icon/icon17.png" alt>
        </div>
        <div class="aui-flex-col aui-flex-start aui-flex-middle hot-list">
          <div class="hot-item" v-for="item in hotList" :key="item.id" @click="goHome2(item.id)">
            <img :src="host+item.img" alt class="hot-img">
            <span class="aui-ellipsis-2">{{item.name}}</span>
          </div>
        </div>
      </div>
      <!--  今日特价-->
      <div>
        <img src="../assets/image/icon/icon18.png" alt class="recommand-title">
        <div class="recommand-list aui-flex-col aui-flex-start aui-flex-middle">
          <div
            class="aui-flex-item-6 aui-flex-row aui-flex-center aui-flex-middle recommand-item"
            v-for="item in recommandList"
            :key="item.id"
          >
            <img
              :src="host+item.originalImg"
              alt
              class="recommand-img1"
              @click="openProduct(item.id)"
            >
            <h1 class="recommand-name1 aui-ellipsis-2">{{item.name}}</h1>
            <div class="recommand-price1 aui-flex-col aui-flex-center aui-flex-middle">
              <h2>
                ￥
                <span>{{item.shopPrice}}</span>
              </h2>
              <h3>￥{{item.marketPrice}}</h3>
            </div>
            <div class="stock">
              库存：
              <span>{{item.inStock}}件</span>
            </div>
            <div class="limit">
              单人限购：
              <span>{{item.limit}}件</span>
            </div>
            <div class="aui-flex-col aui-flex-center aui-flex-middle">
              <span
                class="add-cart"
                v-if="item.cartNum==0"
                @click="changeRecommandCount(1,item.id)"
              >加入购物车</span>
              <div
                class="aui-flex-col aui-flex-center aui-flex-middle add-box"
                v-if="item.cartNum>0"
              >
                <img
                  src="../assets/image/icon/reduce.png"
                  alt
                  class="aui-flex-item-3"
                  @click="changeRecommandCount(0,item.id)"
                >
                <span class="aui-flex-item-6 count">{{item.cartNum}}</span>
                <!-- <input type="number" class=" aui-flex-item-6 count" v-model="item.cartNum" @blur="blurRecommand($event,item.id)" v-if="item.cartNum>0"> -->
                <img
                  src="../assets/image/icon/add.png"
                  alt
                  class="aui-flex-item-3"
                  @click="changeRecommandCount(1,item.id)"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  猜你喜欢-->
      <div>
        <div class="aui-flex-col aui-flex-center aui-flex-middle hot-title">
          <img src="../assets/image/icon/icon17.png" alt>
          <span>猜你喜欢</span>
          <img src="../assets/image/icon/icon17.png" alt>
        </div>
        <div class="aui-flex-col aui-flex-start aui-flex-middle love-list">
          <div
            class="aui-flex-col aui-flex-start aui-flex-middle aui-flex-item-12 love-item"
            v-for="item in loveList"
            :key="item.id"
          >
            <img
              :src="host+item.originalImg"
              alt
              class="aui-flex-item-4 love-img"
              tapmode
              @click="openProduct(item.id)"
            >
            <div class="aui-flex-item-8" style="padding-left:0.8rem;">
              <div @click="openProduct(item.id)" tapmode>
                <h1 class="love-name aui-ellipsis-2">{{item.name}}</h1>
                <h2 class="love-des aui-ellipsis-2">{{item.goodsRemark}}</h2>
                <div class="love-price aui-flex-col aui-flex-start aui-flex-middle">
                  <h2>
                    ￥
                    <span>{{item.shopPrice}}</span>
                  </h2>
                  <h3>￥{{item.marketPrice}}</h3>
                </div>
                <div class="stock">
                  库存：
                  <span>{{item.inStock}}件</span>
                </div>
              </div>
              <div class="aui-flex-col aui-flex-right aui-flex-middle">
                <span
                  class="add-cart"
                  v-if="item.cartNum==0"
                  tapmode
                  @click="changeLoveCount(1,item.id)"
                >加入购物车</span>
                <div
                  class="aui-flex-col aui-flex-center aui-flex-middle aui-flex-item-6"
                  v-if="item.cartNum>0"
                >
                  <img
                    src="../assets/image/icon/reduce.png"
                    alt
                    class="aui-flex-item-3"
                    tapmode
                    @click="changeLoveCount(0,item.id)"
                  >
                  <span class="aui-flex-item-6 count">{{item.cartNum}}</span>
                  <!-- <input type="number" class=" aui-flex-item-6 count" v-model="item.cartNum" @blur="blurLove($event,item.id)" v-if="item.cartNum>0"> -->
                  <img
                    src="../assets/image/icon/add.png"
                    alt
                    class="aui-flex-item-3"
                    tapmode
                    @click="changeLoveCount(1,item.id)"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>

export default {
  name: "Home",
  components: {
    
  },
  data() {
    return {
      hotList: [],
      recommandList: [],
      loveList: [],
      bannerList: [],
      userId: 52,
      listH: {
        height: ""
      },
      winWidth: 0,
      host: "",
      headerH: 0,
      NoticeList: [],
      totalNum: ""
    };
  },
  created() {
    this.host = this.Global.URL;
    console.log(this.host);
    this.getHotList();
    this.getRecommandList();
    this.getLoveList();
  },
  computed: {},
  methods: {
    // 获取热门列表内容
    getHotList: function() {
      var that = this;
      console.log(that.api.getCategoryList);
      //   that.httpServer(that.api.getCategoryList,{}).then(res => {
      //     console.log(res);
      //     if (res.code == 0) {
      //       that.hotList = ret.data;
      //     } else if (res.code == 400) {
      //       that.hotList = [];
      //     }
      //   });
      that.axios.post("/api" + that.api.getCategoryList).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          that.hotList = res.data.data;
        } else if (res.data.code == 400) {
          that.hotList = [];
        }
      });
    },
    // 获取今日特价列表内容
    getRecommandList: function() {
      var that = this;
      that.axios
        .post("/api" + that.api.getSalfGoodsList, {
          userId: that.userId
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            that.recommandList = res.data.data;
          } else if (res.data.code == 400) {
            that.recommandList = [];
          }
        });
    },
    getLoveList: function() {
      var that = this;
      that.axios
        .post("/api" + that.api.getLikeGoodsList, {
          userId: that.userId
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            that.loveList = res.data.data;
          } else if (res.data.code == 400) {
            that.loveList = [];
          }
        });
    }
  }
};
</script>
<style scoped>
body {
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

label {
  margin: 10px;
  font-size: 24px;
}

ul {
  margin-bottom: 10px;
}

ul li {
  margin: 5px 10px;
  padding: 5px;
  color: #000;
  word-wrap: break-word;
}
.aui-slide-node img {
  width: auto;
  height: 100%;
}

[v-cloak] {
  display: none;
}
.notice-list {
  height: 2rem;
  overflow: hidden;
}

.msg-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 20px;
}

.msg-box .souse {
  width: 18px;
  height: 14px;
  display: block;
  margin-right: 15px;
}

.msg-box span {
  color: #44ca68;
  font-size: 0.7rem;
}
.hot-title {
  width: 100%;
  height: 2.2rem;
  background-color: #44ca68;
}
.hot-title img {
  width: 0.9rem;
  height: 0.8rem;
}
.hot-title span {
  font-size: 0.9rem;
  color: #fff;
  margin: 0 1rem;
}
.hot-list {
  width: 100%;
  padding: 0 0.5rem 0.5rem 0.5rem;
}
.hot-item {
  width: 25%;
  margin-top: 1rem;
}
.hot-item span {
  font-size: 0.6rem;
  color: #000;
  text-align: center;
  display: block;
  margin-top: 0.5rem;
}
.hot-img {
  width: 3rem;
  height: 3rem;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  /*border:1px solid #dedede;*/
}
.recommand-item {
  margin-top: 0.5rem;
}
.recommand-title {
  width: 100%;
  height: 5rem;
  background-color: #fff;
}
.recommand-img1 {
  width: 4rem;
  height: 4rem;
  display: block;
  border-radius: 50%;
  /*border:1px solid #dedede;*/
}
.recommand-name1 {
  font-size: 0.7rem;
  color: #000;
  text-align: center;
  line-height: 2rem;
  height: 2rem;
}
.recommand-price1 h2 {
  font-size: 0.5rem;
  color: #ee0a0a;
}
.recommand-price1 h2 span {
  font-size: 0.8rem;
  color: #ee0a0a;
}
.recommand-price1 h3 {
  margin-left: 0.2rem;
  font-size: 0.5rem;
  color: #cdcdcd;
  text-decoration: line-through;
}
.count {
  text-align: center;
  font-size: 0.6rem;
  width: 50% !important;
}
.add-cart {
  width: 4rem;
  height: 1.6rem;
  line-height: 1.6rem;
  border-radius: 0.8rem;
  background-color: #44ca68;
  color: #fff;
  font-size: 0.6rem;
  text-align: center;
  /*margin: 0.5rem auto;*/
  display: block;
}
.love-list {
  width: 100%;
  padding: 0 0.5rem 0.5rem 0.5rem;
}
.love-item {
  min-height: 6.5rem;
  margin-top: 0.5rem;
  padding: 0 0.5rem;
  border-radius: 5rpx;
  box-shadow: 5rpx 5rpx 5rpx #fefefe;
  min-height: 6rem;
}
.love-name {
  font-size: 0.8rem;
  color: #000;
  height: 1.8rem;
  line-height: 1.8rem;
  text-align: left;
}
.love-des {
  font-size: 0.6rem;
  color: #a5a5a5;
  text-align: left;
  /*padding:0 1rem;*/
}
.love-price h2 {
  font-size: 0.6rem;
  color: #ee0a0a;
  text-align: left;
}
.love-price h2 span {
  font-size: 0.9rem;
  color: #ee0a0a;
}
.love-price h3 {
  font-size: 0.6rem;
  color: #d5d5d5;
  text-decoration: line-through;
  text-align: center;
  margin-left: 0.5rem;
}
.love-img {
  min-height: 5rem;
  box-shadow: 3px 3px 3px #dedede;
  /*border:1px solid #dedede;*/
}
.add-box {
  height: 2rem;
}
.recommand-list {
  padding: 0.5rem 0;
}
.stock {
  font-size: 0.6rem;
}
.stock span {
  color: #a5a5a5;
}
.limit {
  font-size: 0.6rem;
}
.limit span {
  color: #ee0a0a;
}
</style>


