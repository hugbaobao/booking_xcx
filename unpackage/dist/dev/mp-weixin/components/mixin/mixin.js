"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showPrivacy: false,
      resolvePrivacyAuthorization: null
      // wx.onNeedPrivacyAuthorization的回调handle
    };
  },
  mounted() {
    common_vendor.wx$1.onNeedPrivacyAuthorization((resolve) => {
      console.log("未授权进入回调");
      this.showPrivacy = true;
      this.resolvePrivacyAuthorization = resolve;
    });
    common_vendor.wx$1.requirePrivacyAuthorize({
      success: () => {
        console.log("同意隐私授权，关闭弹窗，进行下一步授权");
      },
      fail: () => {
        console.log("用户拒绝授权,关闭弹窗");
      },
      complete: () => {
        this.showPrivacy = false;
      }
    });
  },
  methods: {
    handleAgreePrivacyAuthorization() {
      this.resolvePrivacyAuthorization({
        buttonId: "agree-btn",
        event: "agree"
      });
    },
    disagree() {
      this.resolvePrivacyAuthorization({ event: "disagree" });
    },
    navto() {
      common_vendor.wx$1.openPrivacyContract({
        success: () => {
        },
        // 打开成功
        fail: () => {
        },
        // 打开失败
        complete: () => {
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showPrivacy
  }, $data.showPrivacy ? {
    b: common_vendor.o((...args) => $options.navto && $options.navto(...args)),
    c: common_vendor.o((...args) => $options.handleAgreePrivacyAuthorization && $options.handleAgreePrivacyAuthorization(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/单子/8.30门票预定/booking/components/mixin/mixin.vue"]]);
wx.createComponent(Component);
