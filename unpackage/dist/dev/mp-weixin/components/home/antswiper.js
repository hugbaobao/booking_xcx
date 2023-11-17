"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "antswiper",
  props: {
    ifdots: {
      default: false
    },
    list: {
      type: [Array, Object],
      default: () => {
      }
    }
  },
  setup(__props) {
    const navto = (val) => {
      if (val !== "") {
        common_vendor.index.navigateTo({
          url: val,
          fail() {
            common_vendor.index.switchTab({
              url: val
            });
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.list, (item, index, i0) => {
          return {
            a: item.url,
            b: index,
            c: common_vendor.o(($event) => navto(item.page), index)
          };
        }),
        b: __props.ifdots
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-43aa28ba"], ["__file", "F:/单子/8.30门票预定/booking/components/home/antswiper.vue"]]);
wx.createComponent(Component);
