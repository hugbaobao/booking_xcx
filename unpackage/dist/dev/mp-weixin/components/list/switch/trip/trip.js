"use strict";
const common_vendor = require("../../../../common/vendor.js");
const stores_goods = require("../../../../stores/goods.js");
const _sfc_main = {
  __name: "trip",
  props: ["datalist"],
  setup(__props) {
    const goods = stores_goods.useGoodsStore();
    const togoodsdetail = (val) => {
      goods.goodsChange(val);
      common_vendor.index.navigateTo({
        url: "/pages/order/goodsdetail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.datalist, (item, k0, i0) => {
          return {
            a: item.cover[0],
            b: common_vendor.t(item == null ? void 0 : item.name),
            c: common_vendor.t(item == null ? void 0 : item.words),
            d: common_vendor.t(item == null ? void 0 : item.price),
            e: item.id,
            f: common_vendor.o(($event) => togoodsdetail(item), item.id)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bca0ae6d"], ["__file", "F:/单子/8.30门票预定/booking/components/list/switch/trip/trip.vue"]]);
wx.createComponent(Component);
