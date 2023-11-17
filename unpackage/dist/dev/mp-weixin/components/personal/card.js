"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "card",
  setup(__props) {
    const toVip = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personal/vip"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "qr",
          size: "28rpx"
        }),
        b: common_vendor.p({
          name: "arrow"
        }),
        c: common_vendor.o(toVip)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-18df690c"], ["__file", "F:/单子/8.30门票预定/booking/components/personal/card.vue"]]);
wx.createComponent(Component);
