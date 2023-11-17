"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_getNav = require("../../hooks/getNav.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "home",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "66d1d6b8": common_vendor.unref(fullH),
      "33245a32": common_vendor.unref(scrollTop),
      "279e4759": common_vendor.unref(scrollBottom),
      "4565db40": common_vendor.unref(padr)
    }));
    let fullH = `${hooks_getNav.navdate.fullH}px`;
    let scrollTop = `${hooks_getNav.navdate.capsuleScrolltop}px`;
    let scrollBottom = `${hooks_getNav.navdate.capsuleScrollbottom}px`;
    let padr = `${hooks_getNav.navdate.capsulesToRight + 10}px`;
    `${hooks_getNav.navdate.capsuleScrolltop}px`;
    const toSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "search",
          size: "35rpx",
          color: "#919191"
        }),
        b: common_vendor.o(toSearch),
        c: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-42ced076"], ["__file", "F:/单子/8.30门票预定/booking/components/navgation/home.vue"]]);
wx.createComponent(Component);
