"use strict";
const common_vendor = require("../../../common/vendor.js");
const http_getinfo = require("../../../http/getinfo.js");
const stores_login = require("../../../stores/login.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "receive",
  props: ["content"],
  setup(__props) {
    const LoginStore = stores_login.useLoginStore();
    const getCoupon = async (val) => {
      await http_getinfo.addCouponApi({
        openid: LoginStore.keyInfo.openid,
        code: val
      });
      const { data: res2 } = await http_getinfo.getReceiveApi(LoginStore.keyInfo.openid);
      LoginStore.refreshReceive(res2.data);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.content.amount),
        b: common_vendor.t(__props.content.cill),
        c: common_vendor.t(__props.content.cill),
        d: common_vendor.t(__props.content.amount),
        e: common_vendor.t(__props.content.expiration),
        f: common_vendor.p({
          name: "arrow-down"
        }),
        g: common_vendor.o(($event) => getCoupon(__props.content.id))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-66e0f878"], ["__file", "F:/单子/8.30门票预定/booking/components/personal/ticket/receive.vue"]]);
wx.createComponent(Component);
