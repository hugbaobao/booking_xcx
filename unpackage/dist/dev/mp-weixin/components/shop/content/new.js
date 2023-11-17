"use strict";
const common_vendor = require("../../../common/vendor.js");
const http_getinfo = require("../../../http/getinfo.js");
const stores_goods = require("../../../stores/goods.js");
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  _component_van_cell();
}
const _sfc_main = {
  __name: "new",
  props: {
    cover: String
  },
  setup(__props) {
    const goods = stores_goods.useGoodsStore();
    const goodsList = common_vendor.ref([]);
    const toMorePro = () => {
      common_vendor.index.navigateTo({
        url: "/pages/list/product?type=1"
      });
    };
    const toGoodsDetail = (val) => {
      goods.goodsChange(val);
      common_vendor.index.navigateTo({
        url: "/pages/order/goodsdetail"
      });
    };
    const getInfo = async () => {
      const { data: res } = await http_getinfo.getByTimeApi();
      goodsList.value = res.data.map((item) => {
        return {
          ...item,
          cover: JSON.parse(item.cover)
        };
      });
    };
    common_vendor.onMounted(() => {
      getInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: __props.cover,
        b: common_vendor.o(toMorePro),
        c: common_vendor.p({
          title: "新品上架",
          isLink: true,
          border: false
        }),
        d: common_vendor.f(goodsList.value, (item, k0, i0) => {
          return {
            a: item.cover[0],
            b: common_vendor.t(item.name),
            c: item.id,
            d: common_vendor.o(($event) => toGoodsDetail(item), item.id)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5b10cc27"], ["__file", "F:/单子/8.30门票预定/booking/components/shop/content/new.vue"]]);
wx.createComponent(Component);
