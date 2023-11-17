"use strict";
const common_vendor = require("../../common/vendor.js");
const http_getinfo = require("../../http/getinfo.js");
const stores_login = require("../../stores/login.js");
if (!Math) {
  MyReceive();
}
const MyReceive = () => "../../components/personal/ticket/receive.js";
const _sfc_main = {
  __name: "coupon",
  setup(__props) {
    const LoginStore = stores_login.useLoginStore();
    const list = common_vendor.ref([]);
    const getCoupon = async () => {
      const already = LoginStore.Receive.map((item) => {
        return item.code;
      });
      const { data: res } = await http_getinfo.getCouponallApi(already);
      list.value = res.data;
    };
    common_vendor.onMounted(() => {
      getCoupon();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: list.value.length !== 0
      }, list.value.length !== 0 ? {
        b: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: "8329207e-0-" + i0,
            c: common_vendor.p({
              content: item
            })
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8329207e"], ["__file", "F:/单子/8.30门票预定/booking/pages/personal/coupon.vue"]]);
wx.createPage(MiniProgramPage);
