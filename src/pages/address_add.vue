<template>
  <div class="frame" id="box" v-cloak>
    <!-- <header class="aui-bar aui-bar-nav" id="header">
      <a class="aui-pull-left aui-btn" @click="closewin">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title" v-if="isAdd==false">编辑地址</div>
      <div class="aui-title" v-if="isAdd==true">新增地址</div>
      <div class="amend" @click="saveForm" tapmode id="btn" :class="pointNone?'point':''">保存</div>
    </header> -->
    <div class="aui-content-padded">
      <ul class="aui-list-view">
        <form>
          <li class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle">
            <img src="../assets/image/icon/icon2.png" alt class="more">
            <span class="aui-flex-item-3">姓名：</span>
            <input type="text" class="input-box" v-model="nickName" name="nickName">
          </li>
          <li class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle">
            <img src="../assets/image/icon/icon3.png" alt class="more">
            <span class="aui-flex-item-3">手机：</span>
            <input type="text" class="input-box" v-model="mobile" name="mobile">
          </li>
          <li class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle">
            <img src="../assets/image/icon/icon4.png" alt class="more">
            <span class="aui-flex-item-3">店铺名称：</span>
            <input type="text" class="input-box" v-model="shopName" name="shopName">
          </li>
          <li
            class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle"
            tapmode
            @click="getAddress"
          >
            <img src="../assets/image/icon/icon36.png" alt class="more">
            <span class="aui-flex-item-3">所在区域：</span>
            <div class="aui-list-item-input aui-flex-item-8 aui-ellipsis-2">{{districtList}}</div>
          </li>
          <li
            class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle"
            style="max-height:5rem;"
          >
            <img src="../assets/image/icon/icon34.png" alt class="more">
            <span class="aui-flex-item-3">详细地址：</span>
            <textarea class="details-box" v-model="detail" name="detail" style="max-height:5rem;"></textarea>
          </li>
          <li class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle">
            <img src="../assets/image/icon/icon5.png" alt class="more">
            <span class="aui-flex-item-3">自提地址：</span>
            <div class="aui-list-item-input aui-flex-item-8 aui-ellipsis-2">
              <select name="address" v-model="selectedId" class="aui-ellipsis-2">
                <option
                  v-for="item in stallList"
                  :key="item.id"
                  class="aui-ellipsis-2"
                  v-bind:value="item.id"
                >{{item.address}}</option>
              </select>
            </div>
          </li>
          <li class="aui-list-view-cell list-item aui-flex-col aui-flex-left aui-flex-middle">
            <img src="../assets/image/icon/icon5.png" alt class="more">
            <span class="aui-flex-item-3">默认地址：</span>
            <div
              class="aui-flex-item-8 aui-flex-col aui-flex-right aui-flex-middle"
              style="height:100%;"
            >
              <div class="aui-flex-item-5 switch-btn" id="swicthBtn"></div>
            </div>
          </li>
          <div class="promit-msg">温馨提示：请就近选择自提点地址！</div>
          <img :src="host+deliveryUrl" alt class="delivery-pic" @click="checkPhoto">

          <!-- <div class="save-btn" @click="submit" tapmode id="btn" :class="pointNone?'point':''">保存</div> -->
        </form>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddAddress",
  components: {},
  data() {
    return {
      host: "",
      userId: "",
      stallList: [],
      selectedId: 0,
      status: 0,
      addressView: "",
      districtList: "",
      district: [],
      detail: "",
      provinceId: 16068,
      cityId: 16069,
      districtId: 16071,
      deliveryUrl: "",
      nickName: "",
      mobile: "",
      shopName: "",
      address: "",
      UISwitchButton: "",
      isAdd: "",
      isDefault: "",
      address: "",
      btnState: false
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
    getAddress: function() {
      var that = this;
      var addressView = api.require("addressView");
      addressView.open({
        file_addr: "widget://res/district.json", //数据源地址
        selected_color: "#ff0000", //颜色
        pro_id: vuedata.provinceId, //省id
        city_id: vuedata.cityId, //市id
        dir_id: vuedata.districtId //区id
      });

      addressView.show({}, function(ret, err) {
        if (ret.status) {
          // alert(JSON.stringify(ret));
          // alert(JSON.stringify(err));
          vuedata.district = ret.data;
          vuedata.provinceId = vuedata.district[0].id;
          vuedata.cityId = vuedata.district[1].id;
          vuedata.districtId = vuedata.district[2].id;
          vuedata.districtList =
            vuedata.district[0].name +
            vuedata.district[1].name +
            vuedata.district[2].name;
        }
      });
    },

    getStallImg: function(selectedId) {
      var that = this;
      api.ajax(
        {
          url: vuedata.host + "/api/api/getStallImg",
          method: "post",
          dataType: "json",
          data: {
            values: {
              stallId: selectedId
            }
          }
        },
        function(ret, err) {
          // alert(JSON.stringify(ret))
          if (ret.code == 0) {
            vuedata.deliveryUrl = ret.data.img;
          }
        }
      );
    },
    checkPhoto: function() {
      var that = this;
      var photoBrowser = api.require("photoBrowser");
      photoBrowser.open(
        {
          images: [vuedata.host + vuedata.deliveryUrl],
          bgColor: "#fff"
        },
        function(ret, err) {
          if (ret) {
            // alert(JSON.stringify(ret));
            if (ret.eventType == "click") {
              photoBrowser.close();
            }
          } else {
            // alert(JSON.stringify(err));
          }
        }
      );
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

.aui-bar-nav {
  background-color: #44ca68;
}
[v-cloak] {
  display: none;
}

.point {
  pointer-events: none;
}
.amend {
  position: absolute;
  right: 0rem;
  font-size: 0.7rem;
  /*padding:0 1rem;*/
  width: 3rem;
}
.aui-bar-nav {
  background-color: #44ca68;
}

.more {
  width: 0.7rem;
  height: 0.7rem;
}

.list-item {
  height: 2.5rem;
  border-bottom: 1px solid #d7d7d7;
}

.list-item span:nth-child(2) {
  font-size: 0.6rem;
  color: #888888;
  padding: 0 0.5rem;
}

.list-item span:nth-child(3) {
  font-size: 0.7rem;
  color: #010101;
}

.avatar {
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  /*border: 1px solid #dedede;*/
}

.input-box {
  width: 68% !important;
  font-size: 0.7rem;
  color: #010101;
}

.details-box {
  width: 68% !important;
  font-size: 0.7rem;
  width: 100%;
  color: #010101;
  padding: 0.5rem 0.1rem;
}

.save-btn {
  width: 70%;
  margin: 2rem auto !important;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background-color: #44ca68;
  color: #fff;
  font-size: 0.9rem;
  border-radius: 0.5rem;
}

.updata-avatar {
  background-color: #44ca68;
  font-size: 0.8rem;
  color: #fff;
  width: 5rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 1rem;
  text-align: center;
  margin-left: 1rem;
}

.aui-content-padded {
  margin-top: 0 !important;
}

.select-form {
  border: 1px solid red;
  width: 33% !important;
}

.point {
  pointer-events: none;
}

.delivery-pic {
  width: 100%;
  height: 10rem;
  display: block;
}

.amend {
  position: absolute;
  right: 0rem;
  font-size: 0.7rem;
  /*padding:0 1rem;*/
  width: 3rem;
}

.promit-msg {
  height: 1.6rem;
  line-height: 1.6rem;
  font-size: 0.7rem;
  color: #ee0a0a;
}

.switch-btn {
  /*border:1px solid red;*/
  height: 70%;
}
</style>
