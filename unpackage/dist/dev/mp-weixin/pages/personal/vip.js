"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_login = require("../../stores/login.js");
const http_getinfo = require("../../http/getinfo.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  (_component_van_icon + _easycom_u_toast2)();
}
const _easycom_u_toast = () => "../../uni_modules/vk-uview-ui/components/u-toast/u-toast.js";
if (!Math) {
  _easycom_u_toast();
}
const _sfc_main = {
  __name: "vip",
  setup(__props) {
    const LoginStore = stores_login.useLoginStore();
    const utoast = common_vendor.ref();
    const tobeVip = async () => {
      const { data: res } = await http_getinfo.changeVipApi(LoginStore.keyInfo.openid);
      if (res.code === 200) {
        utoast.value.show({
          title: "领取成功！",
          type: "success",
          icon: false
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(LoginStore).userMsg.vip
      }, !common_vendor.unref(LoginStore).userMsg.vip ? {} : {}, {
        b: !common_vendor.unref(LoginStore).userMsg.vip
      }, !common_vendor.unref(LoginStore).userMsg.vip ? {} : {
        c: common_vendor.t(parseInt(common_vendor.unref(LoginStore).userMsg.integral / 1e3) + 1)
      }, {
        d: !common_vendor.unref(LoginStore).userMsg.vip
      }, !common_vendor.unref(LoginStore).userMsg.vip ? {} : {}, {
        e: common_vendor.p({
          name: "medal",
          color: "#b8cce2",
          size: "180rpx"
        }),
        f: !common_vendor.unref(LoginStore).userMsg.vip
      }, !common_vendor.unref(LoginStore).userMsg.vip ? {
        g: common_vendor.o(tobeVip)
      } : {}, {
        h: common_vendor.sr(utoast, "80964168-1", {
          "k": "utoast"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-80964168"], ["__file", "F:/单子/8.30门票预定/booking/pages/personal/vip.vue"]]);
wx.createPage(MiniProgramPage);
