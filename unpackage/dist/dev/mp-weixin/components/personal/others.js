"use strict";
const common_vendor = require("../../common/vendor.js");
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
  __name: "others",
  setup(__props) {
    const utoast = common_vendor.ref();
    const navTo = (val) => {
      common_vendor.index.navigateTo({
        url: val
      });
    };
    const notOpen = () => {
      utoast.value.show({
        title: "暂未开放，敬请期待！",
        type: "warning",
        icon: false
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "balance-pay",
          size: "50rpx"
        }),
        b: common_vendor.o(($event) => navTo("/pages/order/car")),
        c: common_vendor.p({
          name: "send-gift-o",
          size: "50rpx"
        }),
        d: common_vendor.o(($event) => navTo("/pages/personal/coupon")),
        e: common_vendor.p({
          name: "logistics",
          size: "50rpx"
        }),
        f: common_vendor.o(($event) => navTo("/pages/personal/mycoupon")),
        g: common_vendor.p({
          name: "comment-o",
          size: "50rpx"
        }),
        h: common_vendor.o(notOpen),
        i: common_vendor.p({
          name: "cash-back-record",
          size: "50rpx"
        }),
        j: common_vendor.o(($event) => navTo("/pages/personal/wallet")),
        k: common_vendor.p({
          name: "balance-pay",
          size: "50rpx"
        }),
        l: common_vendor.o(notOpen),
        m: common_vendor.p({
          name: "send-gift-o",
          size: "50rpx"
        }),
        n: common_vendor.o(($event) => navTo("/pages/personal/vip")),
        o: common_vendor.p({
          name: "logistics",
          size: "50rpx"
        }),
        p: common_vendor.o(($event) => navTo("/pages/personal/jifen")),
        q: common_vendor.p({
          name: "comment-o",
          size: "50rpx"
        }),
        r: common_vendor.o(notOpen),
        s: common_vendor.p({
          name: "cash-back-record",
          size: "50rpx"
        }),
        t: common_vendor.o(notOpen),
        v: common_vendor.sr(utoast, "75d7add2-10", {
          "k": "utoast"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-75d7add2"], ["__file", "F:/单子/8.30门票预定/booking/components/personal/others.vue"]]);
wx.createComponent(Component);
