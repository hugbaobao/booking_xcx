"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const toOrder = (val) => {
      common_vendor.index.navigateTo({
        url: `/pages/order/order?current=${val}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "arrow",
          size: "28rpx"
        }),
        b: common_vendor.o(($event) => toOrder(0)),
        c: common_vendor.p({
          name: "balance-pay",
          size: "60rpx",
          color: "#a1733f"
        }),
        d: common_vendor.o(($event) => toOrder(1)),
        e: common_vendor.p({
          name: "send-gift-o",
          size: "60rpx",
          color: "#a1733f"
        }),
        f: common_vendor.o(($event) => toOrder(2)),
        g: common_vendor.p({
          name: "logistics",
          size: "60rpx",
          color: "#a1733f"
        }),
        h: common_vendor.o(($event) => toOrder(3)),
        i: common_vendor.p({
          name: "comment-o",
          size: "60rpx",
          color: "#a1733f"
        }),
        j: common_vendor.o(($event) => toOrder(4)),
        k: common_vendor.p({
          name: "cash-back-record",
          size: "60rpx",
          color: "#a1733f"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b99eecc6"], ["__file", "F:/单子/8.30门票预定/booking/components/personal/order.vue"]]);
wx.createComponent(Component);
