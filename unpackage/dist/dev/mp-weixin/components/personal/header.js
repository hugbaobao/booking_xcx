"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_login = require("../../stores/login.js");
require("../../http/getinfo.js");
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
  __name: "header",
  setup(__props) {
    const utoast = common_vendor.ref();
    const User = stores_login.useLoginStore();
    const Receive = User.Receive.filter((item) => item.used === 0 && new Date(item.Coupon.expiration) >= (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)).length;
    const src = common_vendor.ref("http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg");
    const toOwn = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personal/mycoupon"
      });
    };
    const eidtInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/setmymsg"
      });
    };
    const notOpen = () => {
      utoast.value.show({
        title: "暂未开放，敬请期待！",
        type: "warning",
        icon: false
      });
    };
    return (_ctx, _cache) => {
      return {
        a: src.value,
        b: common_vendor.o(eidtInfo),
        c: common_vendor.t(common_vendor.unref(User).isLogin ? common_vendor.unref(User).userMsg.name : "未登录"),
        d: common_vendor.o(eidtInfo),
        e: common_vendor.p({
          name: "qr",
          size: "24rpx"
        }),
        f: common_vendor.o(notOpen),
        g: common_vendor.t(common_vendor.unref(Receive)),
        h: common_vendor.o(toOwn),
        i: common_vendor.sr(utoast, "ebfc940e-1", {
          "k": "utoast"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ebfc940e"], ["__file", "F:/单子/8.30门票预定/booking/components/personal/header.vue"]]);
wx.createComponent(Component);
