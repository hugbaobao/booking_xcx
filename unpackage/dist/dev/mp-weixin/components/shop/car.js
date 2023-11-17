"use strict";
const common_vendor = require("../../common/vendor.js");
const http_getinfo = require("../../http/getinfo.js");
const stores_login = require("../../stores/login.js");
const stores_goods = require("../../stores/goods.js");
if (!Array) {
  const _component_van_goods_action_icon = common_vendor.resolveComponent("van-goods-action-icon");
  const _component_van_goods_action_button = common_vendor.resolveComponent("van-goods-action-button");
  const _component_van_goods_action = common_vendor.resolveComponent("van-goods-action");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  (_component_van_goods_action_icon + _component_van_goods_action_button + _component_van_goods_action + _easycom_u_toast2)();
}
const _easycom_u_toast = () => "../../uni_modules/vk-uview-ui/components/u-toast/u-toast.js";
if (!Math) {
  _easycom_u_toast();
}
const _sfc_main = {
  __name: "car",
  setup(__props) {
    const loginStore = stores_login.useLoginStore();
    const utoast = common_vendor.ref();
    const goods = stores_goods.useGoodsStore();
    const addCar = async () => {
      const { data: res } = await http_getinfo.addCarApi({
        openid: loginStore.keyInfo.openid,
        goodsid: goods.parseGoods.id,
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
      return {
        a: common_vendor.p({
          icon: "chat-o",
          text: "客服",
          openType: "contact"
        }),
        b: common_vendor.p({
          icon: "cart-o",
          text: "购物车",
          info: common_vendor.unref(loginStore).carcount,
          url: "/pages/order/car"
        }),
        c: common_vendor.o(addCar),
        d: common_vendor.p({
          color: "#be99ff",
          text: "加入购物车",
          type: "warning"
        }),
        e: common_vendor.p({
          color: "#7232dd",
          text: "立即购买"
        }),
        f: common_vendor.p({
          safeAreaInsetBottom: false
        }),
        g: common_vendor.sr(utoast, "f78b23e5-5", {
          "k": "utoast"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f78b23e5"], ["__file", "F:/单子/8.30门票预定/booking/components/shop/car.vue"]]);
wx.createComponent(Component);
