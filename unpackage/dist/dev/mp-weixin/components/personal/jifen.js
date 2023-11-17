"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "jifen",
  props: {
    getlist: {
      type: Array
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.getlist, (li, k0, i0) => {
          return {
            a: common_vendor.t(li.name),
            b: common_vendor.t(li.creattime),
            c: common_vendor.t(li.type === 0 ? "+" : "-"),
            d: common_vendor.t(li.count),
            e: li.id
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-422ad145"], ["__file", "F:/单子/8.30门票预定/booking/components/personal/jifen.vue"]]);
wx.createComponent(Component);
