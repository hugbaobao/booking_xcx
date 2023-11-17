"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  _easycom_u_toast2();
}
const _easycom_u_toast = () => "../../uni_modules/vk-uview-ui/components/u-toast/u-toast.js";
if (!Math) {
  (MyTitle + _easycom_u_toast)();
}
const MyTitle = () => "./title.js";
const _sfc_main = {
  __name: "keeper",
  setup(__props) {
    const utoast = common_vendor.ref();
    const tobuy = () => {
      utoast.value.show({
        title: "暂未开放，敬请期待！",
        type: "warning",
        icon: false
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(tobuy),
        b: common_vendor.sr(utoast, "d6df5e09-1", {
          "k": "utoast"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d6df5e09"], ["__file", "F:/单子/8.30门票预定/booking/components/trip/keeper.vue"]]);
wx.createComponent(Component);
