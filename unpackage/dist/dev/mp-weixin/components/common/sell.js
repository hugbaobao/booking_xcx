"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_goods = require("../../stores/goods.js");
const http_getinfo = require("../../http/getinfo.js");
const stores_login = require("../../stores/login.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  (_component_van_icon + _easycom_u_toast2)();
}
const _easycom_u_toast = () => "../../uni_modules/vk-uview-ui/components/u-toast/u-toast.js";
if (!Math) {
  _easycom_u_toast();
}
const _sfc_main = {
  __name: "sell",
  props: {
    product: {
      require: true
    }
  },
  setup(__props) {
    const props = __props;
    const utoast = common_vendor.ref();
    const goodsStore = stores_goods.useGoodsStore();
    const loginStore = stores_login.useLoginStore();
    const toGoodsDetail = () => {
      goodsStore.goodsChange(props.product);
      common_vendor.index.navigateTo({
        url: "/pages/order/goodsdetail"
      });
    };
    const toOrderCar = (val) => {
      if (loginStore.isLogin === false) {
        utoast.value.show({
          title: "请先登录，即将跳转到登录页！",
          type: "warning",
          icon: false
        });
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        }, 2e3);
        return;
      } else {
        addcar(val);
      }
    };
    const addcar = async (val) => {
      const { data: res } = await http_getinfo.addCarApi({
        openid: loginStore.keyInfo.openid,
        goodsid: val,
        state: 0
      });
      if (res.code === 200) {
        utoast.value.show({
          title: "已加入购物车！",
          type: "success",
          icon: false
        });
        loginStore.refreshOrder();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.product.cover[0],
        b: common_vendor.t(__props.product.words),
        c: __props.product.xian ? 1 : "",
        d: __props.product.xian
      }, __props.product.xian ? {} : {}, {
        e: common_vendor.t(__props.product.price),
        f: common_vendor.p({
          name: "cart-o",
          color: "#f29100",
          size: "40rpx"
        }),
        g: common_vendor.o(($event) => toOrderCar(__props.product.id)),
        h: common_vendor.o(toGoodsDetail),
        i: common_vendor.sr(utoast, "ece35f7f-1", {
          "k": "utoast"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ece35f7f"], ["__file", "F:/单子/8.30门票预定/booking/components/common/sell.vue"]]);
wx.createComponent(Component);
