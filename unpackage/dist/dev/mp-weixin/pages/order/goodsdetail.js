"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_goods = require("../../stores/goods.js");
if (!Math) {
  (MySwiper + MyCar + MyIntercept)();
}
const MySwiper = () => "../../components/nonavto/swiper.js";
const MyCar = () => "../../components/shop/car.js";
const MyIntercept = () => "../../components/intercept/intercept.js";
const _sfc_main = {
  __name: "goodsdetail",
  setup(__props) {
    const goods = stores_goods.useGoodsStore();
    const product = common_vendor.ref(null);
    common_vendor.onMounted(() => {
      product.value = goods.parseGoods;
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return {
        a: common_vendor.p({
          list: (_a = product.value) == null ? void 0 : _a.cover
        }),
        b: common_vendor.t((_b = product.value) == null ? void 0 : _b.name),
        c: common_vendor.f((_c = product.value) == null ? void 0 : _c.simple, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        d: common_vendor.t((_d = product.value) == null ? void 0 : _d.words)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1b3cee4e"], ["__file", "F:/单子/8.30门票预定/booking/pages/order/goodsdetail.vue"]]);
wx.createPage(MiniProgramPage);
