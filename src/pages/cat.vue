<template>
  <div>
    <div v-cloak class="frame">
      <div class="aui-content">
        <section class="aui-col-xs-3" id="classify-list" style="height:100%;">
          <ul class="aui-list aui-list-noborder" :style="pop">
            <li
              class="aui-list-item"
              :class="activeId==0?'active-item':''"
              tapmode
              @click="getTileId(0);"
            >
              <div class="aui-list-item-inner">
                <div class="aui-list-item-title">全部</div>
              </div>
            </li>
            <li
              class="aui-list-item"
              v-for="item in titleList"
              :key="item.id"
              :class="activeId==item.id?'active-item':''"
              tapmode
              @click="getTileId(item.id);"
            >
              <div class="aui-list-item-inner">
                <div class="aui-list-item-title">{{item.name}}</div>
              </div>
            </li>
          </ul>
        </section>
        <section class="aui-col-xs-9" id="classify-right">
          <div class="select-line" id="select-line">
            <div
              class="select-item aui-flex-col aui-flex-middle aui-flex-center"
              :class="inStock==1?'select-item-active':''"
              @click="byHasStock(inStock)"
            >
              <span class="aui-list-item-title">有货</span>
              <i :class="inStock==1?'icon11':'icon26'"></i>
            </div>
            <div
              class="select-item aui-flex-col aui-flex-middle aui-flex-center"
              :class="bp==1||bp==2?'select-item-active':''"
              @click="byPrice(bp)"
            >
              <span class="aui-list-item-title">价格</span>
              <i :class="bp==3?'icon9':bp==1?'icon20':'icon21'"></i>
            </div>
            <div
              class="select-item aui-flex-col aui-flex-middle aui-flex-center"
              :class="discount==1||discount==2?'select-item-active':''"
              @click="byDiscount(discount)"
            >
              <span>折扣</span>
              <i :class="discount==3?'icon9':discount==1?'icon20':'icon21'"></i>
            </div>
            <div
              class="select-item aui-flex-col aui-flex-middle aui-flex-center"
              :class="filter==1?'select-item-active':''"
              @click="openFilter"
            >
              <span>筛选</span>
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
                        style="width:5rem;height:5rem;"
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
                            class="aui-list-item-title first-title aui-ellipsis-1"
                            style="font-size:0.7rem;padding-right:0.5rem;"
                          >{{item.name}}</div>
                        </div>
                        <div class="aui-list-item-text" @click="openProduct(item.id)">
                          <div
                            class="aui-list-item-title aui-ellipsis-1"
                            style="color:#a5a5a5;font-size:0.6rem;padding-right:0.5rem;"
                          >{{item.goodsRemark}}</div>
                        </div>
                        <div class="add-box aui-flex-col aui-flex-left aui-flex-middle">
                          <div class="price-line aui-flex-item-12">
                            <span>￥{{item.shopPrice}}</span>
                            <span>￥{{item.marketPrice}}</span>
                          </div>
                        </div>
                        <div class="stock">
                          库存：
                          <span>{{item.inStock}}件</span>
                        </div>
                        <div class="limit" v-if="item.isSalf==1">
                          单人限购：
                          <span>{{item.limit}}件</span>
                        </div>
                        <div class="aui-flex-col aui-flex-left aui-flex-middle">
                          <img
                            src="../assets/image/icon/reduce.png"
                            alt
                            class="iconadd"
                            @click="changeCount(0,item.id,item.cartNum)"
                            v-if="item.cartNum>0"
                          >
                          <span class="count" v-if="item.cartNum>0">{{item.cartNum}}</span>
                          <!-- <input type="number" class="count" v-model="item.cartNum" @blur="blurCount($event,item.id,item.cartNum)" > -->
                          <img
                            src="../assets/image/icon/add.png"
                            alt
                            class="iconadd"
                            @click="changeCount(1,item.id,item.cartNum)"
                          >
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            class="nothing aui-flex-row aui-flex-middle aui-flex-center"
            v-if="nothing==0"
            :style="listH"
          >
            <img src="../assets/image/icon/icon35.png" alt class="nothing-pic">
            <span>该分类暂无商品</span>
          </div>
        </section>
      </div>
      <!-- <Footer></Footer> -->
    </div>
  </div>
</template>  
<script>
export default {
  name: "Cat",
  components: {
  },
  data() {
    return {
      host: "",
      titleList: [],
      totalNum: "",
      shopList: [],
      activeId: 0,
      userId: 52,
      listH: {
        height: ""
      },
      bp: 3,
      discount: 3,
      inStock: 0,
      filterShow: false,
      filter: 0,
      filterShow: false,
      filterIndex: -1,
      filterId: -1,
      pop: {
        height: ""
      },

      popBox: {
        height: "",
        width: "",
        top: ""
      },
      boxShow: true,
      filterTitle: [],
      condition: 0,
      reset: 0,
      nothing: 2, //开始默认为2，当有分类为1，无分类为0
      saveIndex: -1,
      saveIndex1: -1,
      resetShow: 0,
      confirmShow: 0,
      saveCondition: 0
    };
  },
  created() {
    this.host = this.Global.URL;
    this.getCartList();
    this.getTitle();
  },
  computed: {},
  methods: {
    getCartList: function() {
      var that = this;
      that.axios
        .post("/api" + that.api.getCartList, {
          userId: that.userId,
          page: 1,
          count: 5
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            that.totalNum = res.data.data;
          } else if (res.data.code == 400) {
            that.totalNum = 0;
          }
        });
    },
    getTitle: function() {
      var that = this;
      that.axios.post("/api" + that.api.getcategory).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          that.titleList = res.data.data;
        } else if (res.data.code == 400) {
          that.titleList = [];
        }
      });
    },
    // 点击分类
    getTileId: function(id) {
      vuedata.activeId = id;
      vuedata.bp = 3;
      vuedata.discount = 3;
      vuedata.filterShow = false;
      vuedata.inStock = 0;
      vuedata.filterIndex = -1;
      vuedata.condition = 0;
      vuedata.filter = 0;
      vm.getAjax();
    },
    // 有货
    byHasStock: function(inStock) {
      if (inStock == 0) {
        vuedata.inStock = 1;
      } else if (inStock == 1) {
        vuedata.inStock = 0;
      }
      vm.getAjax();
    },
    // 按价格排序
    byPrice: function(bp) {
      vuedata.filterShow = false;
      vuedata.discount = 3;
      if (bp == 3) {
        vuedata.bp = 2;
      } else if (bp == 2) {
        vuedata.bp = 1;
      } else if (bp == 1) {
        vuedata.bp = 3;
      }
      vm.getAjax();
    },
    getAjax: function() {
      // alert("price:"+vuedata.bp+"+discount:"+vuedata.discount+"+salf:"+vuedata.filter)
      api.ajax(
        {
          url: vuedata.host + "/api/goods/getGoodsList",
          method: "post",
          dataType: "json",
          data: {
            values: {
              categoryId: vuedata.activeId,
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

          if (ret) {
            if (ret.code == 0) {
              vuedata.shopList = ret.data;
              vuedata.nothing = 1;
            } else if (ret.code == 400) {
              vuedata.shopList = [];
              vuedata.nothing = 0;
            }
          }
        }
      );
    },
    // 按今日特价筛选
    byFilter: function(id, index) {
      if (id == vuedata.condition) {
        vuedata.filterIndex = -1;
        vuedata.condition = 0;
        vm.filterConfirm();
      } else {
        vuedata.filterIndex = index;
        vuedata.condition = id;
        vm.filterConfirm();
      }
    },
    // 确定
    filterConfirm: function() {
      if (vuedata.condition == 0) {
        vuedata.filter = 0;
      } else {
        vuedata.filter = 1;
      }
      api.showProgress({
        title: "加载中..",
        modal: false
      });
      api.ajax(
        {
          url: vuedata.host + "/api/goods/getGoodsList",
          method: "post",
          dataType: "json",
          data: {
            values: {
              categoryId: vuedata.activeId,
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
          api.hideProgress();
          // alert(JSON.stringify(ret))
          if (ret.code == 0) {
            vuedata.shopList = ret.data;
            vuedata.filterShow = false;
            vuedata.nothing = 1;
          } else if (ret.code == 400) {
            vuedata.shopList = [];
            vuedata.filterShow = false;
            vuedata.filter = 0;
            vuedata.nothing = 0;
          }
        }
      );
    },
    // 重置
    filterReset: function() {
      vuedata.filterIndex = -1;
      vuedata.condition = 0;
      vm.filterConfirm();
    },
    // 按折扣
    byDiscount: function(discount) {
      vuedata.filterShow = false;
      vuedata.bp = 3;
      if (discount == 3) {
        vuedata.discount = 2;
      } else if (discount == 2) {
        vuedata.discount = 1;
      } else if (discount == 1) {
        vuedata.discount = 3;
      }
      vm.getAjax();
    },
    // 打开筛选
    openFilter: function() {
      vuedata.filterShow = !vuedata.filterShow;
      // alert(vuedata.filterIndex)
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
            }
          }
        }
      );
    },

    // 加减按钮
    changeCount: function(tag, id, cartNum) {
      var that = this;
      if (tag == 0) {
        //减号
        // api.showProgress({
        //     title: '请稍等...',
        //     modal: false
        // });
        if (cartNum < 1) {
          return;
        } else {
          api.ajax(
            {
              url: vuedata.host + "/api/Cart/addCarts",
              method: "post",
              dataType: "json",
              data: {
                values: {
                  userId: vuedata.userId,
                  goodId: id,
                  goodNum: 1,
                  tmp: 0
                }
              }
            },
            function(ret, err) {
              // alert(JSON.stringify(ret))
              // api.hideProgress();
              if (ret && ret.code == 0) {
                // api.toast({
                //     msg: '操作成功',
                //     duration: 2000,
                //     location: 'bottom'
                // });
                for (var key in vuedata.shopList) {
                  if (id == vuedata.shopList[key].id) {
                    vuedata.shopList[key].cartNum--;
                    vuedata.totalNum--;
                    var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
                    api.execScript({
                      script: jsfun
                    });
                  }
                }
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
      } else if (tag == 1) {
        //加号
        if (typeof that.userId == "undefined") {
          api.openWin({
            name: "login_win",
            url: "widget://html/login/login_win.html"
          });
        } else {
          // api.showProgress({
          //     title: '请稍等...',
          //     modal: false
          // });
          api.ajax(
            {
              url: vuedata.host + "/api/Cart/addCarts",
              method: "post",
              dataType: "json", //该参数若不传，则默认为json
              data: {
                values: {
                  userId: vuedata.userId,
                  goodId: id,
                  goodNum: 1,
                  tmp: 1
                }
              }
            },
            function(ret, err) {
              // alert(JSON.stringify(ret))
              // api.hideProgress();
              if (ret && ret.code == 0) {
                // api.toast({
                //     msg: '添加成功',
                //     duration: 2000,
                //     location: 'middle'
                // });
                for (var key in vuedata.shopList) {
                  if (id == vuedata.shopList[key].id) {
                    vuedata.shopList[key].cartNum++;
                    vuedata.totalNum++;
                    var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
                    api.execScript({
                      script: jsfun
                    });
                  }
                }
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
    },
    closePop: function(event) {
      // alert(JSON.stringify(this.$refs.filterBox.contains(event.target)))
      if (!this.$refs.filterBox.contains(event.target)) {
        vuedata.filterShow = false;
      }
    },
    // 失去焦点
    blurCount: function($event, id, cartNum) {
      var num = $event.target.value;
      alert(num == "");
      var that = this;
      if (num == "") {
        num == 0;
      } else {
        api.ajax(
          {
            url: vuedata.host + "/api/cart/updateCartGood",
            method: "post",
            dataType: "json",
            data: {
              values: {
                goodId: id,
                userId: vuedata.userId,
                goodNum: num
              }
            }
          },
          function(ret, err) {
            // api.hideProgress();
            // alert(JSON.stringify(ret))
            // alert(JSON.stringify(err))
            if (ret) {
              if (ret.code == 0) {
                vuedata.totalNum = ret.data.totalCount;
                var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
                api.execScript({
                  script: jsfun
                });
              } else if (ret.code == 1) {
                api.toast({
                  msg: ret.message,
                  duration: 2000,
                  location: "middle"
                });

                for (var key in vuedata.shopList) {
                  if (id == vuedata.shopList[key].id) {
                    vuedata.shopList[key].cartNum = ret.data.num;
                    // that.$set(vuedata.shopList, key, vuedata.shopList[key]);
                    vuedata.totalNum = ret.data.totalCount;
                    var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
                    api.execScript({
                      script: jsfun
                    });
                  }
                }
              } else if (ret.code == 400) {
                api.toast({
                  msg: ret.message,
                  duration: 2000,
                  location: "middle"
                });

                for (var key in vuedata.shopList) {
                  if (id == vuedata.shopList[key].id) {
                    vuedata.shopList[key].cartNum = ret.data.num;
                    // that.$set(vuedata.shopList, key, vuedata.shopList[key]);
                    vuedata.totalNum = ret.data.totalCount;
                    var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
                    api.execScript({
                      script: jsfun
                    });
                  }
                }
              }
            }
          }
        );
      }
      // alert("num:" + num + "+id:" + id);
    }
  }
};
</script>
<style scoped>
body {
  height: 100%;
  overflow: hidden;
  background-color: #fff;
}

.frame {
  /*position: relative;*/
  height: 100%;
  overflow: hidden;
}
/*label {
            margin: 10px;
            font-size: 24px;
        }*/
/*ul {
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
        }*/

#classify-list {
  /*height: 15rem;*/
  background-color: #ddd;
  overflow-x: hidden;
  border-right: 1px solid #ddd;
}

#classify-list .aui-list {
  overflow-y: scroll;
  background-color: #ddd;
  /*height: 100%;*/
  overflow: hidden;
}

.aui-list .aui-list-item-title {
  font-size: 0.7rem;
  text-align: left;
  width: 100%;
}

#classify-right {
  /*padding-left: 5px;*/
  /*height: 15rem;*/
  /*overflow-y: scroll;*/
  background-color: #fff;
  /*padding-bottom: 1rem;*/
}

.price-line span:nth-child(1) {
  color: #ee0a0a;
  font-size: 0.7rem;
  margin-right: 0.5rem;
}

.price-line span:nth-child(2) {
  color: #a5a5a5;
  font-size: 0.6rem;
  text-decoration: line-through;
}

.aui-list .first-title {
  font-size: 0.8rem;
}

.msg-box {
  width: 100%;
  height: 2rem;
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

.select-line {
  display: flex;
  display: -webkit-flex;
  padding: 0 20px;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
  /*border-top: 1px solid #dedede;*/
  background-color: #fff;
  /*border-bottom: 1px solid #dedede;*/
}

.select-item {
  width: 25%;
  height: 100%;
  text-align: center;
  line-height: 3rem;
}

.select-item span {
  display: block;
  font-size: 0.7rem;
  color: #000;
}

.select-item-active {
  /*border-bottom: 2px solid #44ca68;*/
}

.select-item-active span {
  color: #44ca68;
}

.count {
  text-align: center;
  width: 3rem !important;
}

.active-item {
  border-left: 2px solid #44ca68 !important;
  background-color: #fff !important;
}

.active-item .aui-list-item-title {
  color: #44ca68 !important;
}

[v-cloak] {
  display: none;
}

.list-title {
  font-size: 0.7rem;
  background-color: #fff;
  height: 2rem;
  line-height: 2rem;
  padding-left: 0.5rem;
}

.aui-list .aui-list-item {
  min-height: 3rem;
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
/*.pop {
            position: absolute;
            background: rgba(0, 0, 0, 0.3);
            left: 0;
            top: 0;
        }

        .pop-box {
            width: 14rem;
            height: 20rem;
            position: absolute;
            right: 0;
            background: #fff;
        }*/

.pop-box {
  background: rgba(0, 0, 0, 0.1);
  height: 100%;
  z-index: 100;
  position: fixed;
  left: 25%;
  /*top:0;*/
  width: 75%;
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
  height: 1.8rem;
  line-height: 1.8rem;
  display: block;
}

#listBox {
  overflow-y: scroll;
}

#classify-list .aui-list.aui-list-noborder .aui-list-item {
  border-bottom: 0 !important;
}

.filter-title .filter-active {
  background-color: #44ca68;
  color: #fff;
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

.confim-active {
  background-color: #44ca68;
  color: #fff;
}

a:active {
  background-color: #44ca68;
  color: #fff;
}

.nothing {
}

.nothing span {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #44ca68;
  display: block;
}

.nothing-pic {
  width: 5rem;
  height: 3rem;
  display: block;
  /*margin: 0 auto;*/
}
.iconadd {
  width: 0.9rem;
  height: 0.9rem;
  display: block;
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