"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_login = require("../../stores/login.js");
require("../../http/getinfo.js");
if (!Array) {
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  _easycom_u_popup2();
}
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  _easycom_u_popup();
}
const _sfc_main = {
  __name: "intercept",
  setup(__props) {
    const show = common_vendor.ref(false);
    const Login = stores_login.useLoginStore();
    common_vendor.watchEffect(() => {
      if (Login.isLogin === false) {
        show.value = true;
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        }, 2e3);
      } else {
        show.value = false;
      }
    });
    common_vendor.onReady(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => show.value = $event),
        b: common_vendor.p({
          mode: "center",
          ["border-radius"]: "14",
          modelValue: show.value
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7e6e364c"], ["__file", "F:/单子/8.30门票预定/booking/components/intercept/intercept.vue"]]);
wx.createComponent(Component);
