"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  _easycom_u_toast2();
}
const _easycom_u_toast = () => "../../uni_modules/vk-uview-ui/components/u-toast/u-toast.js";
if (!Math) {
  _easycom_u_toast();
}
const _sfc_main = {
  __name: "switch",
  props: {
    list: {}
  },
  setup(__props) {
    const utoast = common_vendor.ref();
    const navTo = (val) => {
      if (val !== "") {
        common_vendor.index.navigateTo({
          url: val,
          fail() {
            common_vendor.index.switchTab({
              url: val
            });
          }
        });
      } else {
        utoast.value.show({
          title: "暂未开放，敬请期待！",
          type: "warning",
          icon: false
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.list, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => navTo(item.page), index)
          };
        }),
        b: common_vendor.sr(utoast, "0173b906-0", {
          "k": "utoast"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0173b906"], ["__file", "F:/单子/8.30门票预定/booking/components/home/switch.vue"]]);
wx.createComponent(Component);
