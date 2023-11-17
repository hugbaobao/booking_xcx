"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "swiper",
  props: {
    list: {
      type: Array
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.list, (item, k0, i0) => {
          return {
            a: item,
            b: item.id
          };
        }),
        b: common_vendor.o((...args) => _ctx.itemChange && _ctx.itemChange(...args))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-786ceffd"], ["__file", "F:/单子/8.30门票预定/booking/components/nonavto/swiper.vue"]]);
wx.createComponent(Component);
