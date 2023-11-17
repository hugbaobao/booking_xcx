"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  MySell();
}
const MySell = () => "../common/sell.js";
const _sfc_main = {
  __name: "sort",
  props: {
    cover: {
      type: String
    },
    list: {
      type: Array
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: __props.cover,
        b: common_vendor.f(__props.list, (item, index, i0) => {
          return {
            a: item.id,
            b: "c7795bd3-0-" + i0,
            c: common_vendor.p({
              product: item
            })
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c7795bd3"], ["__file", "F:/单子/8.30门票预定/booking/components/home/sort.vue"]]);
wx.createComponent(Component);
