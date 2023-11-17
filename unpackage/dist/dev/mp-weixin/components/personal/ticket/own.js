"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "own",
  props: ["content"],
  setup(__props) {
    const toshop = () => {
      common_vendor.index.switchTab({
        url: "/pages/tabbar/shop"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.content.Coupon.amount),
        b: common_vendor.t(__props.content.Coupon.cill),
        c: common_vendor.t(__props.content.Coupon.cill),
        d: common_vendor.t(__props.content.Coupon.amount),
        e: common_vendor.t(__props.content.Coupon.expiration),
        f: common_vendor.p({
          name: "arrow-down"
        }),
        g: common_vendor.p({
          name: "qr",
          size: "30rpx"
        }),
        h: common_vendor.o(toshop)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-63ea2d0a"], ["__file", "F:/单子/8.30门票预定/booking/components/personal/ticket/own.vue"]]);
wx.createComponent(Component);
