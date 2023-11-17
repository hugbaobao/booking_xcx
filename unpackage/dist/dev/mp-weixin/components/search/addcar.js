"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "addcar",
  props: {
    goods: {
      type: Object
    }
  },
  setup(__props) {
    const addCar = () => {
      common_vendor.index.navigateTo({
        url: "/pages/order/car"
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return {
        a: (_a = __props.goods) == null ? void 0 : _a.cover[0],
        b: common_vendor.t((_b = __props.goods) == null ? void 0 : _b.name),
        c: common_vendor.t((_c = __props.goods) == null ? void 0 : _c.words),
        d: common_vendor.t(parseFloat((_d = __props.goods) == null ? void 0 : _d.price)),
        e: common_vendor.p({
          name: "cart-o",
          size: "40rpx",
          color: "#f29100"
        }),
        f: common_vendor.o(($event) => {
          var _a2;
          return addCar((_a2 = __props.goods) == null ? void 0 : _a2.id);
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-356c63a1"], ["__file", "F:/单子/8.30门票预定/booking/components/search/addcar.vue"]]);
wx.createComponent(Component);
