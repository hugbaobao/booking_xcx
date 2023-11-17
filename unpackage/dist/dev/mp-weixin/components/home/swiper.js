"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "swiper",
  props: {
    list: {
      type: Array,
      default: () => {
      }
    }
  },
  setup(__props) {
    const props = __props;
    const current = common_vendor.ref(1);
    const sum = common_vendor.ref(3);
    const itemChange = (event) => {
      current.value = event.detail.current + 1;
    };
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
    common_vendor.watchEffect(() => {
      sum.value = Object.values(props.list).length;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.list, (item, index, i0) => {
          return {
            a: item.url,
            b: index,
            c: common_vendor.o(($event) => navto(item.page), index)
          };
        }),
        b: common_vendor.o(itemChange),
        c: common_vendor.t(current.value),
        d: common_vendor.t(sum.value)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-037d591b"], ["__file", "F:/单子/8.30门票预定/booking/components/home/swiper.vue"]]);
wx.createComponent(Component);
