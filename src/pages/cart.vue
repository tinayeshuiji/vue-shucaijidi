<template>
  <div id="home-box" v-cloak class="frame">
    <ul class="aui-flex-row aui-flex-top aui-flex-center cart-list" v-if="cartList.length>0">
      <li
        class="cart-item aui-flex-col aui-flex-middle aui-flex-left"
        v-for="(item,index) in cartList"
        :key="item.id"
        v-if="item.id!==null"
      >
        <div @click="selectCart(item.id)" class="aui-flex-item-1" v-if="item.inStock!==0">
          <img src="../assets/image/icon/icon16.png" alt class="check" v-if="!item.select">
          <img src="../assets/image/icon/check.png" alt class="check" v-else>
        </div>
        <div class="aui-flex-item-1 no-use" v-if="item.inStock==0">失效</div>
        <div class="aui-flex-col aui-flex-between aui-flex-middle aui-flex-item-11">
          <div
            class="aui-flex-item-9 aui-flex-col aui-flex-middle aui-flex-left"
            tapmode
            @click="openProduct(item.id)"
          >
            <div
              class="aui-flex-item-4 aui-flex-col aui-flex-middle aui-flex-center"
              style="min-height:4rem;"
            >
              <img
                :src="host+item.img"
                style="min-width:4rem;min-height:4rem;border-radius:50%;overflow:hidden;border:1px solid #f9f9f9;"
              >
            </div>
            <div
              class="aui-flex-item-8 aui-flex-row aui-flex-between aui-flex-left"
              style="padding:0.5rem;  min-height: 4rem;"
            >
              <h1 class="big-title aui-ellipsis-2">{{item.name}}</h1>
              <h2 class="small-title aui-ellipsis-2">{{item.goodsRemark}}</h2>
              <!-- <h3 class="small-title">{{item.weight}}</h3> -->
              <div class="price-line">
                <span>￥{{item.shopPrice}}</span>
                <span>￥{{item.marketPrice}}</span>
              </div>
              <div class="stock">
                库存：
                <span>{{item.inStock}}件</span>
              </div>
            </div>
          </div>
          <div class="aui-flex-col aui-flex-middle aui-flex-center aui-flex-item-3">
            <img
              src="../assets/image/icon/reduce.png"
              alt
              class="aui-flex-item-3"
              tapmode
              @click="changeCount(0,item.id,item.num,index)"
            >
            <span class="count aui-flex-item-6" v-if="item.inStock==0">{{item.num}}</span>
            <input
              type="number"
              class="count"
              v-model="item.num"
              @blur="blurCount($event,item.id)"
              v-if="item.inStock!==0"
            >
            <img
              src="../assets/image/icon/add.png"
              alt
              class="aui-flex-item-3"
              tapmode
              @click="changeCount(1,item.id,item.num,index)"
            >
          </div>
        </div>
      </li>
      <div v-if="page<totalPage && cartList.length!==0" class="load-more">上拉加载更多。。。</div>
      <div v-if="page>=totalPage && cartList.length!==0" class="load-more">没有更多内容了哦。。。</div>
    </ul>

    <div class="aui-content cart-box" v-if="cartList.length>0" id="cartBox">
      <div class="aui-col-xs-8 cart-left">
        <div class="aui-flex-col aui-flex-middle" @click="selectAll">
          <div class="cart">
            <img src="../assets/image/icon/allcheck.png" alt v-if="cheakAll">
            <img src="../assets/image/icon/alluncheck.png" alt v-else>
          </div>
          <span class="check-num">已选（{{selectNum}}）</span>
        </div>
        <span class="amount">￥{{selectAmount}}</span>
      </div>
      <div class="aui-col-xs-4 account" @click="confirmOder">去结算</div>
    </div>
    <div v-if="cartList.length==0" class="aui-flex-row aui-flex-middle aui-flex-center nothing-box">
      <img src="../assets/image/icon/icon12.gif" alt>
      <h1 class="nothing-txt">您还没有添加任何商品~</h1>
      <h1 class="go" @click="go">去逛逛</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cart",
  components: {},
  data() {
    return {
      host: "",
      page: 1,
      count: 10,
      totalPage: 1,
      userId: 52,
      cartList: [],
      totalNum: 0,
      selectNum: 0,
      selectAmount: 0,
      listH: {
        height: ""
      },
      cheakAll: false,
      nomore: false
    };
  },
  created() {
    this.host = this.Global.URL;
  },
  computed: {},
  methods: {
    // 获取列表内容
    getCartList: function() {
      var that = this;
      that.axios
        .post("/api" + that.api.getCartList, {
          userId: that.userId,
          page: that.page,
          count: that.count
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            that.totalNum = res.data.totalNum;
            that.cartList = res.data.list;
            that.totalPage = res.data.totalPage;
            that.page = res.data.page;
            for (var i = 0; i < that.cartList.length; i++) {
              vm.$set(that.cartList[i], "select", false);
            }
          } else if (res.data.code == 400) {
            that.cartList = [];
          }
        });
    },

    getCartListByPage: function() {
      vuedata.page++;
      // alert(vuedata.page)
      if (vuedata.page <= vuedata.totalPage) {
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
                page: vuedata.page,
                count: vuedata.count
              }
            }
          },
          function(ret, err) {
            // alert(JSON.stringify(ret))
            // api.hideProgress();
            if (ret.code == 0) {
              var tem = vuedata.cartList;
              vuedata.cartList = tem.concat(ret.data.list);
              // alert(JSON.stringify(vuedata.cartList))
              vuedata.page = ret.data.page;
              vuedata.selectAmount = 0;
              vuedata.selectNum = 0;
              vuedata.cheakAll = false;
              // var totalNum=0;
              for (var i = 0; i < vuedata.cartList.length; i++) {
                vm.$set(vuedata.cartList[i], "select", false);
                // if(vuedata.cartList[i].inStock!==0){
                //     totalNum +=Number(vuedata.cartList[i].num) ;
                // }
              }
              // alert(JSON.stringify(vuedata.cartList))
              vuedata.totalNum = ret.data.totalAmount;
              var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
              api.execScript({
                script: jsfun
              });

              // alert(JSON.stringify(vm.cartList))
            } else if (ret.code == 400) {
              // vuedata.cartList = [];
              // vuedata.totalNum = 0;
              // vuedata.selectNum = 0;
              // vuedata.selectAmount = 0;
              //
              // var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
              // api.execScript({
              //     script: jsfun
              // });
            }
          }
        );
      } else {
      }
    },
    // 去逛逛
    go: function() {
      api.execScript({
        name: "home_win",
        script: "openHome0();"
      });
    },
    selectAll: function() {
      var that = this;
      if (vuedata.cheakAll == false) {
        var selectNum = 0;
        var selectAmount = 0;
        for (var i = 0; i < vuedata.cartList.length; i++) {
          that.$set(vuedata.cartList[i], "select", true);
          if (vuedata.cartList[i].inStock !== 0) {
            selectNum += Number(vuedata.cartList[i].num);
            selectAmount +=
              vuedata.cartList[i].num * vuedata.cartList[i].shopPrice;
          }
        }
        vuedata.cheakAll = true;
        vuedata.selectNum = selectNum;
        vuedata.selectAmount = selectAmount.toFixed(2);
      } else {
        for (var i = 0; i < vuedata.cartList.length; i++) {
          that.$set(vuedata.cartList[i], "select", false);
        }
        vuedata.cheakAll = false;
        vuedata.selectNum = 0;
        vuedata.selectAmount = 0;
      }
    },
    openProduct: function(goods_id) {
      api.openWin({
        name: "product_win",
        url: "../product_win.html",
        reload: true,
        pageParam: {
          goods_id: goods_id
        }
      });
    },

    // 购物车选中
    selectCart: function(id) {
      var selectAmount = 0,
        selectNum = 0;
      var that = this;
      for (var i = 0; i < vuedata.cartList.length; i++) {
        var item = vuedata.cartList[i];
        if (item.id == id) {
          item.select = !item.select;
        }
      }
      for (var i = 0; i < vuedata.cartList.length; i++) {
        var item = vuedata.cartList[i];
        if (item.select == true && item.inStock !== 0) {
          selectNum += Number(item.num);
          selectAmount += item.num * item.shopPrice;
        }
      }
      that.selectAmount = selectAmount.toFixed(2);
      that.selectNum = selectNum;
      var num = 0;
      for (i = 0; i < vuedata.cartList.length; i++) {
        var item = vuedata.cartList[i];
        if (item.select == true && item.inStock !== 0) {
          num += Number(item.num);
        }
      }
      // alert("num:"+num+"total:"+vuedata.totalNum)
      if (num == vuedata.totalNum) {
        that.cheakAll = true;
      } else {
        that.cheakAll = false;
      }
    },
    // 失去焦点
    blurCount: function($event, id) {
      var num = $event.target.value;
      // alert("num:" + num + "+id:" + id);
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
          if (ret) {
            if (ret.code == 0) {
              vuedata.totalNum = ret.data.totalCount;
              var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
              api.execScript({
                script: jsfun
              });
              var selectAmount = 0,
                selectNum = 0;
              for (var i = 0; i < vuedata.cartList.length; i++) {
                if (
                  vuedata.cartList[i].select == true &&
                  vuedata.cartList[i].inStock !== 0
                ) {
                  selectNum += Number(vuedata.cartList[i].num);
                  selectAmount +=
                    Number(vuedata.cartList[i].num) *
                    vuedata.cartList[i].shopPrice;
                }
              }

              vuedata.selectAmount = selectAmount.toFixed(2);
              vuedata.selectNum = selectNum;
            } else if (ret.code == 1) {
              api.toast({
                msg: "库存不足",
                duration: 2000,
                location: "middle"
              });

              var selectAmount = 0,
                selectNum = 0;
              for (var key in vuedata.cartList) {
                if (id == vuedata.cartList[key].id) {
                  vuedata.cartList[key].num = ret.data.num;
                  vuedata.totalNum = ret.data.totalCount;
                  var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
                  api.execScript({
                    script: jsfun
                  });
                }
                if (
                  vuedata.cartList[key].select == true &&
                  vuedata.cartList[key].inStock !== 0
                ) {
                  selectNum += Number(vuedata.cartList[key].num);
                  selectAmount +=
                    Number(vuedata.cartList[key].num) *
                    vuedata.cartList[key].shopPrice;
                }
              }
              vuedata.selectAmount = selectAmount.toFixed(2);
              vuedata.selectNum = selectNum;
            } else if (ret.code == 400) {
              api.toast({
                msg: ret.message,
                duration: 2000,
                location: "middle"
              });
              var selectAmount = 0,
                selectNum = 0;
              for (var key in vuedata.cartList) {
                if (id == vuedata.cartList[key].id) {
                  vuedata.cartList[key].num = ret.data.num;
                  vuedata.totalNum = ret.data.totalCount;
                  var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
                  api.execScript({
                    script: jsfun
                  });
                }
                if (
                  vuedata.cartList[key].select == true &&
                  vuedata.cartList[key].inStock !== 0
                ) {
                  selectNum += Number(vuedata.cartList[key].num);
                  selectAmount +=
                    Number(vuedata.cartList[key].num) *
                    vuedata.cartList[key].shopPrice;
                }
              }
              vuedata.selectAmount = selectAmount.toFixed(2);
              vuedata.selectNum = selectNum;
            }
          }
        }
      );
    },
    // 加减按钮
    changeCount: function(tag, id, num, idx) {
      if (tag == 0) {
        //减少

        if (num == 1) {
          api.confirm(
            {
              title: "提示",
              msg: "确定从购物车移除吗？",
              buttons: ["确定", "取消"]
            },
            function(ret, err) {
              var index = ret.buttonIndex;
              // alert(JSON.stringify(ret))
              if (index == 2) {
                return;
              } else if (index == 1) {
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
                    if (ret.code == 0) {
                      api.toast({
                        msg: "移除成功",
                        duration: 2000,
                        location: "middle"
                      });
                      var selectAmount = 0,
                        selectNum = 0;
                      for (var i = 0; i < vuedata.cartList.length; i++) {
                        if (i == idx) {
                          vuedata.cartList.splice(i, 1);
                          vuedata.totalNum--;
                          var jsfun =
                            'setTotalNum("' + vuedata.totalNum + '");';
                          api.execScript({
                            script: jsfun
                          });
                        }
                      }
                      for (var i = 0; i < vuedata.cartList.length; i++) {
                        if (
                          vuedata.cartList[i].select == true &&
                          vuedata.cartList[i].inStock !== 0
                        ) {
                          selectNum += Number(vuedata.cartList[i].num);
                          selectAmount +=
                            Number(vuedata.cartList[i].num) *
                            vuedata.cartList[i].shopPrice;
                        }
                      }

                      vuedata.selectAmount = selectAmount.toFixed(2);
                      vuedata.selectNum = selectNum;
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
        } else {
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
              if (ret.code == 0) {
                // api.toast({
                //     msg: '操作成功',
                //     duration: 2000,
                //     location: 'middle'
                // });
                var selectAmount = 0,
                  selectNum = 0;
                for (var key in vuedata.cartList) {
                  if (id == vuedata.cartList[key].id) {
                    vuedata.cartList[key].num--;
                    vuedata.totalNum--;
                    var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
                    api.execScript({
                      script: jsfun
                    });
                  }
                  if (
                    vuedata.cartList[key].select == true &&
                    vuedata.cartList[key].inStock !== 0
                  ) {
                    selectNum += Number(vuedata.cartList[key].num);
                    selectAmount +=
                      Number(vuedata.cartList[key].num) *
                      vuedata.cartList[key].shopPrice;
                  }
                }
                vuedata.selectAmount = selectAmount.toFixed(2);
                vuedata.selectNum = selectNum;
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
        //数量增加
        var selectAmount = 0,
          selectNum = 0;
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
                tmp: 1
              }
            }
          },
          function(ret, err) {
            // alert(JSON.stringify(ret))
            // api.hideProgress();
            if (ret.code == 0) {
              // api.toast({
              //     msg: '添加成功',
              //     duration: 2000,
              //     location: 'bottom'
              // });
              for (var key in vuedata.cartList) {
                if (id == vuedata.cartList[key].id) {
                  vuedata.cartList[key].num++;
                  vuedata.totalNum++;
                  var jsfun = 'setTotalNum("' + vuedata.totalNum + '");';
                  api.execScript({
                    script: jsfun
                  });
                }
                if (
                  vuedata.cartList[key].select == true &&
                  vuedata.cartList[key].inStock !== 0
                ) {
                  selectNum += Number(vuedata.cartList[key].num);
                  selectAmount +=
                    Number(vuedata.cartList[key].num) *
                    vuedata.cartList[key].shopPrice;
                }
              }

              vuedata.selectAmount = selectAmount.toFixed(2);
              vuedata.selectNum = selectNum;
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
    },

    //点击去结算
    confirmOder: function() {
      var that = this;
      var selectList = [];
      // alert(JSON.stringify(vm.cartList))
      for (var i = 0; i < vuedata.cartList.length; i++) {
        var item = vuedata.cartList[i];
        if (item.select == true && item.inStock !== 0) {
          var oneList = {};
          oneList.id = item.id;
          oneList.num = item.num;
          oneList.shopPrice = item.shopPrice;
          oneList.marketPrice = item.marketPrice;
          selectList.push(oneList);
        }
      }
      // alert(selectList.length)
      if (selectList.length == 0) {
        api.toast({
          msg: "您还未选择任何购买商品",
          duration: 2000,
          location: "middle"
        });
      } else {
        api.openWin({
          name: "confirmorder_win",
          url: "../order_details/confirmorder_win.html",
          pageParam: {
            selectList: selectList
          }
        });
      }
    },
    openProduct: function(goods_id) {
      api.openWin({
        name: "product_win",
        url: "../product_win.html",
        pageParam: {
          goodId: goods_id
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
  background: #fff;
  overflow-y: scroll;
}

.frame {
  height: 100%;
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

.product-pic {
  width: 3.2rem;
  height: 3rem;
  margin-right: 0.5rem;
}

.cart-list {
  background: #fff;
  overflow-y: scroll;
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

.big-title {
  font-size: 0.7rem;
}

.small-title {
  font-size: 0.5rem;
  color: #a5a5a5;
}

.count {
  /*width: 1.7rem;*/
  text-align: center;
  font-size: 0.5rem;
  width: 50% !important;
}

.nothing-txt {
  color: #d1d1d1;
  font-size: 1rem;
  line-height: 2rem;
  height: 2rem;
  margin-top: 1.5rem;
}

.go {
  width: 8rem;
  height: 2.2rem;
  line-height: 2.2rem;
  text-align: center;
  background-color: #04a148;
  color: #fff;
  font-size: 1.2rem;
  border-radius: 1.1rem;
  margin-top: 1.5rem;
}
/*.aui-list {
            overflow-y: scroll;

            overflow: hidden;
        }


        .aui-list-item {
            min-height: 5rem !important;
        }*/

.cart-box {
  width: 100%;
  height: 2.2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #181616;
  z-index: 10;
  -webkit-transform: translate3d(0, 0, 0);
}

.amount {
  color: #fff;
  font-size: 0.8rem;
}

.account {
  background-color: #44ca68;
  height: 100%;
  text-align: center;
  line-height: 2.2rem;
  color: #fff;
  font-size: 0.8rem;
}

.cart-left {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
}

.cart {
  width: 1rem;
  height: 1rem;
}

.cart img {
  width: 100%;
  height: 100%;
}

.check-num {
  font-size: 0.7rem;
  padding-left: 0.5rem;
  color: #fff;
}

.cart-list {
  padding-bottom: 2rem;
  overflow-y: scroll;
  /*padding:0 0.5rem;*/
}

.cart-item {
  padding: 0 0.5rem;
  border-bottom: 10px solid #f9f9f9;
  min-height: 5rem;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
}

.nothing-box {
  height: 100%;
}

.delete-btn {
  font-size: 0.6rem;
  background-color: #44ca68;
  height: 1.8rem;
  line-height: 1.8rem;
  border-radius: 1rem;
  text-align: center;
  color: #fff;
}

.no-use {
  font-size: 0.6rem;
  color: #a5a5a5;
}

.load-more {
  font-size: 0.9rem;
  color: #ddd;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
}
.stock {
  font-size: 0.6rem;
}
.stock span {
  color: #a5a5a5;
}
</style>

