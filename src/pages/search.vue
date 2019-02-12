<template>
  <div id="home-box" v-cloak>
    <header id="header" class="aui-bar aui-bar-nav">
      <div class="header-box aui-flex-col aui-flex-middle aui-flex-between">
        <span class="aui-iconfont aui-icon-left" @click="closewin"></span>
        <div class="search-box" @click="goSearch">
          <img class="search" src="../assets/image/icon/search.png">
          <input type="text" placeholder="请输入搜索内容" class="input-box" v-model="searchContent">
          <span class="cancel" v-if="searchContent!==''" @click="cancelSearch">取消</span>
        </div>
        <span class="search-txt" @click="getKeySearch(searchContent)">搜索</span>
      </div>
    </header>
    <div v-if="historyBoxShow">
      <div class="hot-box" v-if="historyList.length!==0">
        <h1 class="aui-flex-col aui-flex-between aui-flex-middle">
          <span class="aui-flex-item-3">历史搜索</span>
          <span class="aui-flex-offset-6 aui-flex-item-3 clear" @click="clearAll">清空</span>
        </h1>
        <ul class="aui-flex-col aui-flex-left hot-list">
          <li
            class="hot-item"
            @click="getKeySearch(item)"
            v-for="(item,index) in historyList"
            :key="index"
          >{{item}}</li>
        </ul>
      </div>
      <div class="hot-box">
        <h1>热门搜索</h1>
        <ul class="aui-flex-col aui-flex-left hot-list">
          <li
            class="hot-item"
            v-for="(item,index) in hostList"
            :key="index"
            @click="getKeySearch(item.name)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <div class="select-line" id="select-line">
        <div
          class="select-item aui-flex-col aui-flex-middle aui-flex-center"
          :class="inStock==1?'active-item':''"
          @click="byHasStock(inStock)"
        >
          <span class="aui-list-item-title">有货</span>
          <i :class="inStock==1?'icon11':'icon26'"></i>
        </div>
        <div
          class="select-item aui-flex-col aui-flex-middle aui-flex-center"
          :class="bp==1||bp==2?'active-item':''"
          @click="byPrice(bp)"
        >
          <span class="aui-list-item-title">价格</span>
          <i :class="bp==3?'icon9':bp==1?'icon20':'icon21'"></i>
        </div>
        <div
          class="select-item aui-flex-col aui-flex-middle aui-flex-center"
          :class="discount==1||discount==2?'active-item':''"
          @click="byDiscount(discount)"
        >
          <span class="aui-list-item-title">折扣</span>
          <i :class="discount==3?'icon9':discount==1?'icon20':'icon21'"></i>
        </div>
        <div
          class="select-item aui-flex-col aui-flex-middle aui-flex-center"
          :class="filter==1?'active-item':''"
          @click="openFilter"
        >
          <span class="aui-list-item-title">筛选</span>
          <i :class="filter==1?'icon29':'icon10'"></i>
        </div>
      </div>
      <div class="pop-box" v-if="filterShow" :style="listH" id="pop-box" @click="closePop">
        <div class="filter-box" id="filter-box" v-if="boxShow" ref="filterBox">
          <div class="aui-flex-col aui-flex-middle aui-flex-start filter-title">
            <span
              class="aui-flex-item-3"
              v-for="(item,index) in filterTitle"
              :key="item.id"
              @click="byFilter(item.id,index)"
              :class="filterIndex==index?'filter-active':''"
            >{{item.name}}</span>
          </div>
          <div class="filter-btn aui-flex-col aui-flex-middle aui-flex-start">
            <a class="aui-flex-item-12 filter-txt" @click="filterReset">重置</a>
            <!-- <a class="aui-flex-item-8 filter-txt" @click="filterConfirm">确认</a> -->
          </div>
        </div>
      </div>
      <div class="aui-row" v-if="shopList.length!==0" id="listBox" :style="listH">
        <div class="aui-col-xs-12">
          <div class="aui-content">
            <ul class="aui-list aui-media-list">
              <li class="aui-list-item" v-for="item in shopList" :key="item.id">
                <div class="aui-media-list-item-inner">
                  <div
                    class="aui-list-item-media"
                    style="width:4rem;height:4rem;"
                    tapmode
                    @click="openProduct(item.id)"
                  >
                    <img
                      :src="host+item.originalImg"
                      style="width:80%;height:80%;position:absolute;left:0;top:10%;border-radius:50%;border:1px solid #f9f9f9;"
                    >
                    <img
                      src="../assets/image/icon/icon27.png"
                      style="width:80%;height:80%;z-index:10;position:absolute;left:0;top:10%;border-radius:50%;"
                      v-if="item.inStock==0"
                    >
                  </div>
                  <div class="aui-list-item-inner" style="width:calc(100% - 4rem);">
                    <div class="aui-list-item-text" @click="openProduct(item.id)">
                      <div
                        class="aui-list-item-title first-title aui-ellipsis-2"
                        style="font-size:0.7rem;"
                      >{{item.name}}</div>
                    </div>
                    <div class="aui-list-item-text" @click="openProduct(item.id)">
                      <div
                        class="aui-list-item-title aui-ellipsis-2"
                        style="color:#a5a5a5;font-size:0.6rem;"
                      >{{item.goodsRemark}}</div>
                    </div>
                    <div class="aui-flex-col aui-flex-left aui-flex-middle">
                      <div class="stock aui-flex-item-8">
                        库存：
                        <span>{{item.inStock}}件</span>
                      </div>
                      <div class="limit aui-flex-item-4" v-if="item.isSalf==1">
                        单人限购：
                        <span>{{item.limit}}件</span>
                      </div>
                    </div>
                    <div class="add-box aui-flex-col aui-flex-left aui-flex-middle">
                      <div class="price-line aui-flex-item-7">
                        <span>￥{{item.shopPrice}}</span>
                        <span>￥{{item.marketPrice}}</span>
                      </div>
                      <div
                        class="aui-flex-item-4 aui-flex-col aui-flex-right aui-flex-middle aui-flex-offset-1"
                      >
                        <img
                          src="../assets/image/icon/reduce.png"
                          alt
                          class="aui-flex-item-3"
                          v-if="item.cartNum>0"
                          @click="changeCount(0,item.id)"
                        >
                        <span class="aui-flex-item-6 count" v-if="item.cartNum>0">{{item.cartNum}}</span>
                        <img
                          src="../assets/image/icon/add.png"
                          alt
                          class="aui-flex-item-3"
                          @click="changeCount(1,item.id)"
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        v-if="shopList.length==0"
        class="aui-flex-row aui-flex-middle aui-flex-center nothing-box"
      >
        <img src="../assets/image/icon/no-order.png" alt class="no-order">
        <h1 class="nothing-txt">找不到该商品</h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Search",
  components: {},
  data() {
    return {
      host: "",
      historyListShow: [],
      searchContent: "",
      shopList: [],
      userId: "",
      listH: {
        height: ""
      },
      hostList: [],
      historyList: [],
      height: "",
      headH: "",
      shopList: [],
      bp: 3,
      discount: 3,
      inStock: 0,
      filter: 0,
      filterShow: false,
      filterIndex: -1,
      totalNum: "",
      userId: "",
      searchContent: "",
      selectH: "",
      listH: {
        height: "",
        top: ""
      },
      boxShow: true,
      filterTitle: [],
      condition: 0,
      saveIndex: -1,
      saveIndex1: -1,
      resetShow: false,
      confirmShow: false,
      saveCondition: 0,
      historyBoxShow: true
    };
  },
  created() {
    this.host = this.Global.URL;
    this.getHotList();
  },
  computed: {},
  methods: {
    closewin: function() {
      this.$router.go(-1);
    },
    // 获取热门
    getHotList: function() {
      var that = this;
      that.axios.post("/api" + that.api.getWordList, {}).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          that.hostList = res.data.data;
        } else if (res.data.code == 400) {
          that.hostList = [];
        }
      });
    },
    // 清空历史记录
    clearAll: function() {
      var that = this;
      that.historyList = [];
      localStorage.setItem("historyList", that.historyList);
    },

    // 点击搜索框取消按钮
    cancelSearch: function() {
      vuedata.searchContent = "";
    },
    // 按搜索框内容搜索
    getKeySearch: function(word) {
      var that = this;
      console.log(word);
      if (word !== "") {
        that.searchContent = word;
        if (that.historyList.length >= 10) {
          that.historyList.splice(9, 1);
        }
        for (var i = 0; i < that.historyList.length; i++) {
          if (that.historyList[i] == that.searchContent) {
            that.historyList.splice(i, 1);
          }
        }
        that.historyList.unshift(that.searchContent);
        localStorage.setItem("historyList", that.historyList);
        that.historyBoxShow = false;
        that.getAjax();
      } else {
        if (that.historyList.length !== 0) {
          word = that.historyList[0];
          that.searchContent = word;
        } else {
        }
      }
    },
    // 点击搜索框
    goSearch: function() {
      var that = this;
      that.shopList = [];
      that.searchContent = "";
      that.bp = 3;
      that.discount = 3;
      that.filterShow = false;
      that.historyBoxShow = true;
    },
    cancelSearch: function() {
      this.searchContent = "";
    },

    getAjax: function() {
      var that = this;
      that.axios
        .post("/api" + that.api.getSearchGoodsList, {
          word: that.searchContent,
          inStock: that.inStock,
          salf: that.filter,
          userId: that.userId,
          price: that.bp,
          discount: that.discount,
          condition: that.condition
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            that.shopList = res.data.data;
          } else if (res.data.code == 400) {
            that.shopList = [];
          }
        });
    },
    // 获取列表内容
    getCartList: function() {
      // api.showProgress({
      //     title: '努力加载中...',
      //     modal: false
      // });
      api.ajax(
        {
          url: vuedata.host + "/api/Cart/getCartList",
          method: "post",
          dataType: "json",
          data: {
            values: {
              userId: vuedata.userId,
              page: 1,
              count: 5
            }
          }
        },
        function(ret, err) {
          // alert(JSON.stringify(ret))
          // api.hideProgress();
          if (ret.code == 0) {
            vuedata.totalNum = ret.data.totalAmount;
            var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
            api.execScript({
              script: jsfun
            });
          } else if (ret.code == 400) {
            vuedata.totalNum = 0;
            var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
            api.execScript({
              script: jsfun
            });
          }
        }
      );
    },

    // 加减按钮
    changeCount: function(tag, id) {
      var that = this;
      if (tag == 0) {
        that.axios
          .post("/api" + that.api.addCarts, {
            userId: that.userId,
            goodId: id,
            goodNum: 1,
            tmp: 0
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              for (var key in that.shopList) {
                if (id == that.shopList[key].id) {
                  that.shopList[key].cartNum--;
                  that.totalNum--;
                }
              }
            } else if (res.data.code == 500) {
              that.$message({
                message: res.data.message,
                type: "error"
              });
            }
          });
      } else if (tag == 1) {
        //加号
        if (typeof that.userId == "undefined") {
          that.$router.push("/login");
        } else {
          that.axios
            .post("/api" + that.api.addCarts, {
              userId: that.userId,
              goodId: id,
              goodNum: 1,
              tmp: 0
            })
            .then(res => {
              console.log(res);
              if (res.data.code == 0) {
                for (var key in that.shopList) {
                  if (id == that.shopList[key].id) {
                    that.shopList[key].cartNum++;
                    that.totalNum++;
                  }
                }
              } else {
                this.$confirm(res.data.message, "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                  center: true
                })
                  .then(() => {
                    // this.$message({
                    //   type: "success",
                    //   message: "删除成功!"
                    // });
                  })
                  .catch(() => {
                    // this.$message({
                    //   type: "info",
                    //   message: "已取消删除"
                    // });
                  });
              }
            });
        }
      }
    },
    // 有货
    byHasStock: function(inStock) {
      var that = this;
      if (inStock == 0) {
        that.inStock = 1;
      } else if (inStock == 1) {
        that.inStock = 0;
      }
      that.getAjax();
    },
    // 按价格排序
    byPrice: function(bp) {
      var that = this;
      that.filterShow = false;
      that.discount = 3;
      if (bp == 3) {
        that.bp = 2;
      } else if (bp == 2) {
        that.bp = 1;
      } else if (bp == 1) {
        that.bp = 3;
      }
      that.getAjax();
    },
    // 筛选
    byFilter: function(id, index) {
      // vuedata.resetShow=0;
      // vuedata.confirmShow=0;
      var that = this;

      if (id == that.condition) {
        that.filterIndex = -1;
        that.condition = 0;
        that.filterConfirm();
      } else {
        that.filterIndex = index;
        that.condition = id;
        that.filterConfirm();
      }
    },
    filterConfirm: function() {
      var that = this;
      if (vuedata.condition == 0) {
        that.filter = 0;
      } else {
        that.filter = 1;
      }

      // api.showProgress({
      //     title: '加载中..',
      //     modal: false
      // });
      // alert("price:"+vuedata.bp+"+discount:"+vuedata.discount+"+salf:"+vuedata.filter+"condition："+vuedata.condition+"word:"+vuedata.searchContent)
      api.ajax(
        {
          url: vuedata.host + "/api/goods/getSearchGoodsList",
          method: "post",
          dataType: "json",
          data: {
            values: {
              word: vuedata.searchContent,
              inStock: vuedata.inStock,
              salf: vuedata.filter,
              userId: vuedata.userId,
              price: vuedata.bp,
              discount: vuedata.discount,
              condition: vuedata.condition
            }
          }
        },
        function(ret, err) {
          // api.hideProgress();
          // alert(JSON.stringify(ret))
          if (ret.code == 0) {
            vuedata.shopList = ret.data;
            vuedata.filterShow = false;
          } else if (ret.code == 400) {
            vuedata.shopList = [];
            vuedata.filterShow = false;
            vuedata.filter = 0;
          }
        }
      );
    },
    // 重置
    filterReset: function() {
      //   vuedata.resetShow=1;
      // vuedata.saveIndex=vuedata.filterIndex;
      // vuedata.saveCondition=vuedata.condition;
      var that = this;
      that.filterIndex = -1;
      that.condition = 0;
      // vuedata.filter = 0;
      that.filterConfirm();
    },
    // 按折扣
    byDiscount: function(discount) {
      var that = this;
      that.filterShow = false;
      that.bp = 3;
      if (discount == 3) {
        that.discount = 2;
      } else if (discount == 2) {
        that.discount = 1;
      } else if (discount == 1) {
        that.discount = 3;
      }
      that.getAjax();
    },
    // 打开筛选
    openFilter: function(filter) {
      vuedata.filterShow = !vuedata.filterShow;
      api.ajax(
        {
          url: vuedata.host + "/Api/api/getConditionList",
          method: "post",
          dataType: "json"
        },
        function(ret, err) {
          // alert(JSON.stringify(ret))

          if (ret) {
            if (ret.code == 0) {
              vuedata.filterTitle = ret.data;
            } else if (ret.code == 400) {
              vuedata.filterTitle = [];
            }
          }
        }
      );
    },
    closePop: function(event) {
      // alert(JSON.stringify(this.$refs.filterBox.contains(event.target)))
      if (!this.$refs.filterBox.contains(event.target)) {
        vuedata.filterShow = false;
        // alert(vuedata.resetShow+":"+vuedata.confirmShow)
        // if (vuedata.resetShow==1&&vuedata.confirmShow==0) {
        //     vuedata.filterIndex = vuedata.saveIndex;
        //     vuedata.filter=1;
        //     vuedata.condition=vuedata.saveCondition;
        // }else if(vuedata.resetShow==0&&vuedata.confirmShow==0){
        //   alert("11")
        //   vuedata.filterIndex =-1;
        //   vuedata.filter=0;
        //
        // }else if(vuedata.resetShow==2&&vuedata.confirmShow==2){
        //   vuedata.filterIndex =-1;
        //   vuedata.filter=0;
        //
        // }
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

.frame {
  height: 100%;
}

.search-box {
  width: 70%;
  height: 1.25rem;
  position: relative;
  border-radius: 1.25rem;
  background-color: #fff;
  line-height: 1.25rem;
}

#header .input-box {
  width: 80%;
  height: 1.25rem;
  line-height: 1.25rem;
  position: absolute;
  left: 1.8rem;
  top: 0;
  font-size: 0.7rem;
}

#header .cancel {
  font-size: 0.6rem;
  color: #000;
  display: block;
  line-height: 1.25rem;
  position: absolute;
  right: 0.5rem;
}

header {
  background-color: #44ca68;
  display: flex;
  justify-content: space-between;
}

.header-box {
  width: 100%;
  height: 2.5rem;
}

.aui-bar-nav {
  background-color: #44ca68;
}

.scan {
  width: 1.2rem;
  height: 1.2rem;
  display: block;
  margin-left: 1rem;
}

.search {
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  left: 0.5rem;
  top: 0.2rem;
  z-index: 1;
}

[v-cloak] {
  display: none;
}

.search-txt {
  width: 15%;
  font-size: 0.7rem;
  color: #44ca68;
  text-align: center;
  height: 1.25rem;
  line-height: 1.25rem;
  border-radius: 0.6rem;
  background-color: #fff;
}

.hot-item {
  padding: 0.3rem 0.5rem;
  background-color: #44ca68;
  color: #fff;
  font-size: 0.8rem;
  margin-right: 1rem;
  margin-top: 0.5rem;
}

.hot-box {
  padding: 1rem;
}

.hot-box h1 {
  font-size: 0.8rem;
  height: 2rem;
  line-height: 2rem;
}

#classify-right {
  padding: 0 1rem;
  /*height: 13rem;*/
  overflow-y: scroll;
  background-color: #fff;
}
.clear {
  color: #ee0a0a;
  text-align: right;
  /*border:1px solid red;*/
}
.select-item-active {
  border-bottom: 2px solid #44ca68;
}

.select-item-active span {
  color: #44ca68;
}

.icon11 {
  display: block;
  background: url("../assets/image/icon/icon11.png") no-repeat center center;
  background-size: 100% 100%;
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.3rem;
}

.icon26 {
  display: block;
  background: url("../assets/image/icon/icon26.png") no-repeat center center;
  background-size: 100% 100%;
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.3rem;
}

.icon9 {
  display: block;
  background: url("../assets/image/icon/icon9.png") no-repeat center center;
  background-size: 100% 100%;
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.3rem;
}

.icon20 {
  display: block;
  background: url("../assets/image/icon/icon20.png") no-repeat center center;
  background-size: 100% 100%;
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.3rem;
}

.icon21 {
  display: block;
  background: url("../assets/image/icon/icon21.png") no-repeat center center;
  background-size: 100% 100%;
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.3rem;
}

.icon10 {
  display: block;
  background: url("../assets/image/icon/icon10.png") no-repeat center center;
  background-size: 100% 100%;
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.3rem;
}

.icon29 {
  display: block;
  background: url("../assets/image/icon/icon29.png") no-repeat center center;
  background-size: 100% 100%;
  width: 0.8rem;
  height: 0.8rem;
  margin-left: 0.3rem;
}

.clear {
  text-align: right;
}

.pop-box {
  background: rgba(0, 0, 0, 0.1);
  height: 100%;
  z-index: 100;
  position: fixed;
  left: 0;
  /*top:0;*/
  width: 100%;
}

.filter-box {
  width: 100%;
  height: 10rem;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border-top: 1px solid #dedede;
  position: relative;
}

.filter-title span {
  /*padding: 0.3rem;*/
  background-color: #dedede;
  color: #000;
  font-size: 0.6rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  height: 2rem;
  line-height: 2rem;
  display: block;
}

.filter-title .filter-active {
  background-color: #44ca68;
  color: #fff;
}

#listBox {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

.count {
  text-align: center;
}

.select-line {
  display: flex;
  display: -webkit-flex;
  padding: 0 20px;
  width: 100%;
  height: 2rem;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #dedede;
  /*border-bottom:1px solid #dedede;*/
  background-color: #fff;
}

.select-item {
  width: 25%;
  height: 100%;
  text-align: center;
  line-height: 2rem;
}

.select-item span {
  display: block;
  font-size: 0.7rem;
  color: #000;
}

.aui-list .aui-list-item {
  min-height: 4rem;
}

.price-line span:nth-child(1) {
  color: #ee0a0a;
  font-size: 0.7rem;
  margin-right: 5px;
}

.price-line span:nth-child(2) {
  color: #a5a5a5;
  font-size: 0.5rem;
  text-decoration: line-through;
}

.nothing-txt {
  color: #d1d1d1;
  font-size: 1rem;
  line-height: 2rem;
  height: 2rem;
  margin-top: 1.5rem;
}

.no-order {
  width: 12rem;
  height: 12rem;
  display: block;
  margin-top: 2rem;
}

.active-item .aui-list-item-title {
  color: #44ca68 !important;
}

.filter-btn {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2rem;
  border-top: 1px solid #dedede;
}

.filter-txt {
  font-size: 0.7rem;
  text-align: center;
  height: 100%;
  line-height: 2rem;
  display: block;
  color: #000;
}

.filter-txt:nth-child(1) {
  border-right: 1px solid #dedede;
}

a:active {
  background-color: #44ca68;
  color: #fff;
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
