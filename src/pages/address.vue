<template>
  <div class="frame" id="box" v-cloak>
    <!-- <header class="aui-bar aui-bar-nav" id="header">
      <a class="aui-pull-left aui-btn" @click="closewin();">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">收货地址</div>
      <div class="amend-box" @click="openAddWin">新增地址</div>
    </header> -->
    <div class="address-list">
      <div class="address-item" v-for="(item,index) in addList" :key="index">
        <div class="address-box" @click="selectAddress(item.id,index)">
          <div class="aui-flex-col aui-flex-left aui-flex-middle address-line">
            <div class="aui-flex-item-7 name">{{item.name}}</div>
            <div class="aui-flex-item-5 phone">{{item.mobile}}</div>
          </div>
          <div class="aui-flex-col aui-flex-left aui-flex-middle address-line">
            <div class="aui-flex-item-3 address-title">收货地址：</div>
            <div class="aui-flex-item-9 address-name">{{item.address}}</div>
          </div>
          <div class="aui-flex-col aui-flex-left aui-flex-middle address-line">
            <div class="aui-flex-item-3 address-title">自提地址：</div>
            <div class="aui-flex-item-9 address-name">{{item.stallDetail}}</div>
          </div>
        </div>
        <div class="aui-flex-col aui-flex-left aui-flex-middle name-line">
          <div
            class="aui-flex-col aui-flex-start aui-flex-middle aui-flex-item-4"
            @click="setDefault(item.id,index)"
          >
            <div>
              <img src="../assets/image/icon/icon39.png" alt class="check" v-if="item.isDefault==1">
              <img src="../assets/image/icon/icon16.png" alt class="check" v-else>
            </div>
            <span class="default" v-if="item.isDefault==1">默认</span>
            <span class="default" v-else>设为默认</span>
          </div>
          <div class="aui-flex-item-8 aui-flex-col aui-flex-right aui-flex-middle">
            <span class="amend" @click="openAddressWin(item.id,index)">修改</span>
            <span class="delete" @click="deleteAddlist(item.id,index)">删除</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Address",
  components: {},
  data() {
    return {
      host: "",
      collectList: [],
      totalNum: "",
      userId: "",
      isAdd: false,
      addList: [],
      status: 0 //等于1 从确认订单页面来的
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
    openAddWin: function() {
      this.isAdd = true;
     this.$router.push('/address_add')
    },
    // 设默认
    setDefault: function(id, index) {
      api.ajax(
        {
          url: vuedata.host + "/api/contact/defaultContact",
          method: "post",
          dataType: "json",
          data: {
            values: {
              userId: vuedata.userId,
              id: id
            }
          }
        },
        function(ret, err) {
          // alert(JSON.stringify(ret))
          if (ret.code == 0) {
            api.toast({
              msg: "设置默认成功",
              duration: 2000,
              location: "bottom"
            });
            api.execScript({
              name: "address_win",
              script: "getList();"
            });
          }
        }
      );
    },
    deleteAddlist: function(id, idx) {
      api.confirm(
        {
          title: "提示",
          msg: "您确定要删除该地址吗？",
          buttons: ["确定", "取消"]
        },
        function(ret, err) {
          var index = ret.buttonIndex;
          if (index == 0 || index == 2) {
            return;
          } else if (index == 1) {
            api.ajax(
              {
                url: vuedata.host + "/api/contact/delContact",
                method: "post",
                dataType: "json",
                data: {
                  values: {
                    userId: vuedata.userId,
                    id: id
                  }
                }
              },
              function(ret, err) {
                // alert(JSON.stringify(ret))
                if (ret.code == 0) {
                  api.toast({
                    msg: "删除成功",
                    duration: 2000,
                    location: "bottom"
                  });
                  api.execScript({
                    name: "address_win",
                    script: "getList();"
                  });
                }
              }
            );
          }
        }
      );
    },
    openAddressWin: function(id, idx) {
      vuedata.isAdd = false;
      var address = vuedata.addList[idx];
      // alert(JSON.stringify(address))
      api.openWin({
        name: "add_address_win",
        url: "./add_address_win.html",
        slidBackEnabled: false,
        pageParam: {
          isAdd: vuedata.isAdd,
          address: address
        }
      });
    },
    selectAddress: function(id, idx) {
      // alert(vuedata.status)
      if (vuedata.status == 1) {
        var selectAddress = vuedata.addList[idx];
        // alert(JSON.stringify(selectAddress))
        var objSty = JSON.stringify(selectAddress);
        var fun = "changeAddress('" + objSty + "')";
        api.execScript({
          name: "confirmorder_win",
          frameName: "confirmorder_frame",
          script: fun
        });
        api.closeWin();
      }
    }
  }
};
</script>
<style scoped>
body {
  height: 100%;
  overflow: hidden;
  background-color: #f9f9f9;
  overflow-y: scroll;
  /*border:1px solid red;*/
}
.frame {
  background-color: #f9f9f9;
}

.aui-bar-nav {
  background-color: #44ca68;
}

[v-cloak] {
  display: none;
}
.add-cart {
  width: 90%;
  border-radius: 2.4rem;
  min-height: 2.4rem;
  background-color: #f04242;
  color: #fff;
  font-size: 0.8rem;
  line-height: 2.4rem;
}
.amend-box {
  position: absolute;
  right: 0rem;
  font-size: 0.7rem;
  /*padding:0 1rem;*/
  width: 4rem;
  padding-right: 0.5rem;
}
.frame {
  height: 100%;
  overflow: hidden;
  background-color: #f9f9f9;
  overflow-y: scroll;
}

[v-cloak] {
  display: none;
}

.address-list {
  padding: 1rem 0.5rem;

  /*height: 100%;*/
  /*overflow-y: scroll;*/
}

.address-item {
  width: 100%;
  padding: 0 0.5rem;
  background-color: #fff;
  margin-bottom: 1rem;
  border-radius: 20px;
}

.name {
  font-size: 0.8rem;
  color: #000;
}

.phone {
  font-size: 0.7rem;
  color: #a5a5a5;
  text-align: right;
}

.address-line {
  height: 2rem;
}

.address-title {
  font-size: 0.7rem;
  color: #888888;
}

.address-name {
  font-size: 0.7rem;
  color: #010101;
}

.address-box {
  border-bottom: 1px solid #dedede;
}

.check {
  width: 1rem;
  height: 1rem;
  display: block;
  margin-right: 0.5rem;
}

.delete {
  width: 4rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 1.5rem;
  background-color: #f04242;
  color: #fff;
  font-size: 0.6rem;
  text-align: center;
}

.amend {
  width: 4rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 1.5rem;
  background-color: #44ca68;
  color: #fff;
  font-size: 0.6rem;
  text-align: center;
  margin-right: 0.5rem;
}

.name-line {
  height: 3rem;
}

.default {
  font-size: 0.7rem;
}
</style>
