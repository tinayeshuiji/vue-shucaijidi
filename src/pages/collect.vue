<template>
  <div class="collect-box" id="box" v-cloak>
    <!-- <header class="aui-bar aui-bar-nav" id="header">
      <a class="aui-pull-left aui-btn" @click="closewin();">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">收藏列表</div>
    </header> -->
    <ul class="aui-flex-row aui-flex-top aui-flex-center cart-list" v-if="collectList.length>0">
      <li
        class="cart-item aui-flex-col aui-flex-between aui-flex-middle"
        v-for="item in collectList"
        :key="item.id"
      >
        <div class="aui-flex-item-9 aui-flex-col aui-flex-middle aui-flex-left">
          <img
            :src="host+item.originalImg"
            class="aui-flex-item-4 pic-box"
            tapmode
            @click="openProduct(item.id)"
          >
          <div
            class="aui-flex-item-8 aui-flex-row aui-flex-between aui-flex-left"
            style="padding-left:0.7rem;min-height: 5rem;"
          >
            <h1 class="big-title aui-ellipsis-2">{{item.name}}</h1>
            <h2 class="small-title aui-ellipsis-2">{{item.goodsRemark}}</h2>
            <h3 class="small-title">{{item.weight}}</h3>
            <div class="price-line">
              <span>￥{{item.shopPrice}}</span>
              <span>￥{{item.marketPrice}}</span>
            </div>
            <div class="aui-flex-item-7 stock">
              库存：
              <span>{{item.inStock}}件</span>
            </div>
            <div class="limit" v-if="item.isSalf==1">
              单人限购：
              <span>{{item.limit}}件</span>
            </div>
          </div>
        </div>
        <div
          class="aui-flex-item-3 aui-flex-row aui-flex-between aui-flex-right"
          style="min-height: 4rem;"
        >
          <div class="cancle" @click="deleteCollect(item.id)">移除</div>
          <div
            class="aui-flex-col aui-flex-middle aui-flex-right"
            style="min-height:2rem;width:100%;"
          >
            <img
              src="../assets/image/icon/reduce.png"
              alt
              class="aui-flex-item-3"
              v-if="item.cartNum>0"
              @click="changeCount(0,item.id)"
            >
            <span class="count aui-flex-item-6" v-if="item.cartNum>0">{{item.cartNum}}</span>
            <img
              src="../assets/image/icon/add.png"
              alt
              class="aui-flex-item-3"
              @click="changeCount(1,item.id)"
              style="height:100%;"
            >
          </div>
        </div>
      </li>
    </ul>
    <!-- 无内容时候显示 -->
    <div
      class="no-order-box aui-flex-row aui-flex-center aui-flex-middle"
      v-if="collectList.length==0"
    >
      <img src="../assets/image/icon/icon40.png" alt class="no-order">
      <span>您还未收藏任何商品哦</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Collect",
  components: {},
  data() {
    return {
      host: "",
      collectList: [],
      totalNum: "",
      userId: ""
    };
  },
  created() {
    this.host = this.Global.URL;
    this.getCollectList();
  },
  computed: {},
  methods: {
    closewin: function() {
      this.$router.go(-1);
    },
    getCollectList: function() {
      var that = this;
      that.axios
        .post("/api" + that.api.getCollectionList, {
          userId: that.userId
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            that.collectList = res.data.data;
          } else if (res.data.code == 400) {
            that.collectList = [];
          }
        });
    },
    openProduct: function(goodId) {
      api.openWin({
        name: "product_win",
        url: "./product_win.html",
        reload: true,
        pageParam: {
          goodId: goodId
        }
      });
    },
    // 加减按钮
    changeCount: function(tag, id) {
      var that = this;
      if (tag == 0) {
        //减号
        // api.showProgress({
        //     title: '请稍等...',
        //     modal: false
        // });

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
              for (var key in vuedata.collectList) {
                if (id == vuedata.collectList[key].id) {
                  vuedata.collectList[key].cartNum--;
                  vuedata.totalNum--;
                  var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
                  api.execScript({
                    name: "home_win",
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
      } else if (tag == 1) {
        //加号
        if (typeof vuedata.userId == "undefined") {
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
                for (var key in vuedata.collectList) {
                  if (id == vuedata.collectList[key].id) {
                    vuedata.collectList[key].cartNum++;
                    vuedata.totalNum++;
                    var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
                    api.execScript({
                      name: "home_win",
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
    deleteCollect: function(id) {
      api.confirm(
        {
          title: "提示",
          msg: "您确定要移除该商品的收藏吗？",
          buttons: ["确定", "取消"]
        },
        function(ret, err) {
          var index = ret.buttonIndex;
          if (index == 2 || index == 0) {
            return;
          } else if (index == 1) {
            // api.showProgress({
            //     title: '请稍等...',
            //     modal: false
            // });
            api.ajax(
              {
                url: vuedata.host + "/api/collection/delCollection",
                method: "post",
                dataType: "json", //该参数若不传，则默认为json
                data: {
                  values: {
                    userId: vuedata.userId,
                    goodId: id
                  }
                }
              },
              function(ret, err) {
                // alert(JSON.stringify(ret))
                // alert(JSON.stringify(err))

                // api.hideProgress();
                if (ret && ret.code == 0) {
                  api.toast({
                    msg: ret.message,
                    duration: 2000,
                    location: "middle"
                  });
                  for (var key in vuedata.collectList) {
                    if (id == vuedata.collectList[key].id) {
                      vuedata.collectList.splice(key, 1);
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
      );
    }
  }
};
</script>
<style scoped>
.frame {
  background-color: #fff;
  overflow-y: scroll;
}

[v-cloak] {
  display: none;
}

.cart-list {
  overflow-y: scroll;
  background-color: #fff;
}

.cart-item {
  padding: 0 0.5rem;
  border-bottom: 10px solid #f9f9f9;
  min-height: 7rem;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
}

.check {
  width: 0.9rem;
  height: 0.9rem;
}

.reduce {
  max-width: 0.9rem;
  max-height: 0.9rem;
}

.add {
  max-width: 0.9rem;
  max-height: 0.9rem;
}

.count {
  /*width: 1.7rem;*/
  text-align: center;
  font-size: 0.6rem;
}

.big-title {
  font-size: 0.7rem;
}

.small-title {
  font-size: 0.5rem;
  color: #a5a5a5;
}

.price-line span:nth-child(1) {
  color: #ee0a0a;
  font-size: 0.8rem;
  margin-right: 0.5rem;
}

.price-line span:nth-child(2) {
  color: #a5a5a5;
  font-size: 0.6rem;
  text-decoration: line-through;
}

.pic-box {
  display: block;
  min-height: 5rem;
  /*border: 1px solid blue;*/
  box-shadow: 3px 3px 3px #f9f9f9;
  margin: 0 auto;
}

.cancle {
  height: 1.6rem;
  line-height: 1.6rem;
  font-size: 0.7rem;
  color: #ee0a0a;
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
.no-order-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 3rem 1.5rem;
}

.no-order {
  width: 3.2rem;
  height: 3.2rem;
  display: block;
  margin: 0 auto;
}

.no-order-box span {
  margin-top: 1.5rem;
  color: #b1b1b1;
  font-size: 0.8rem;
}
.frame {
  background-color: #fff;
}

.aui-bar-nav {
  background-color: #44ca68;
}

[v-cloak] {
  display: none;
}
</style>
