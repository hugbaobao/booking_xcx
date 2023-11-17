"use strict";
const common_vendor = require("../../../common/vendor.js");
const http_getinfo = require("../../../http/getinfo.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
if (!Math) {
  (MyTrip + MyArticle)();
}
const MyTrip = () => "../../../components/list/switch/trip/trip.js";
const MyArticle = () => "../../../components/list/switch/trip/article.js";
const _sfc_main = {
  __name: "trip",
  setup(__props) {
    const pngList = common_vendor.ref();
    const shoplist = common_vendor.ref([]);
    const toAdd = () => {
      common_vendor.index.navigateTo({
        url: "/pages/switch/item/addtrip"
      });
    };
    const getInfo = async () => {
      const { data: res } = await http_getinfo.getPngApi();
      pngList.value = res.data[0];
    };
    const shoptype = async () => {
      const { data: res } = await http_getinfo.getByTypeApi(5);
      shoplist.value = res.data.map((item) => {
        return {
          ...item,
          cover: JSON.parse(item.cover)
        };
      });
    };
    common_vendor.onMounted(() => {
      getInfo();
      shoptype();
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return {
        a: (_a = pngList.value) == null ? void 0 : _a.tripone,
        b: common_vendor.p({
          name: "ellipsis"
        }),
        c: common_vendor.p({
          name: "ellipsis"
        }),
        d: common_vendor.p({
          datalist: shoplist.value
        }),
        e: (_b = pngList.value) == null ? void 0 : _b.triptwo,
        f: common_vendor.p({
          name: "ellipsis"
        }),
        g: common_vendor.p({
          name: "ellipsis"
        }),
        h: common_vendor.p({
          name: "plus"
        }),
        i: common_vendor.o(toAdd)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e575268b"], ["__file", "F:/单子/8.30门票预定/booking/pages/switch/item/trip.vue"]]);
wx.createPage(MiniProgramPage);
