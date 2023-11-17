"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  _component_van_empty();
}
const _sfc_main = {
  __name: "wallet",
  setup(__props) {
    const history = common_vendor.ref([]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: history.value.length >= 1
      }, history.value.length >= 1 ? {} : {
        b: common_vendor.p({
          description: "还没有记录~"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3e2f5cd7"], ["__file", "F:/单子/8.30门票预定/booking/pages/personal/wallet.vue"]]);
wx.createPage(MiniProgramPage);
