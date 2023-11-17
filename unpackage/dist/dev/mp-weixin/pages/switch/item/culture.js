"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const http_getinfo = require("../../../http/getinfo.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "culture",
  setup(__props) {
    const pngList = common_vendor.ref();
    const List = common_vendor.ref([]);
    const toDetail = (val) => {
      common_vendor.index.navigateTo({
        url: "/pages/switch/center?id=" + val
      });
    };
    const toAdd = () => {
      common_vendor.index.navigateTo({
        url: "/pages/switch/item/addcenter"
      });
    };
    const getInfo = async () => {
      const { data: res } = await http_getinfo.getPngApi();
      pngList.value = res.data[0];
    };
    const getArttrip = async () => {
      const { data: res } = await http_getinfo.getcenterApi();
      List.value = res.data.map((item) => {
        return {
          ...item,
          img: Object.values(item.img)
        };
      });
    };
    common_vendor.onMounted(() => {
      getInfo();
      getArttrip();
    });
    return (_ctx, _cache) => {
      var _a;
      return {
        a: (_a = pngList.value) == null ? void 0 : _a.center,
        b: common_vendor.f(List.value, (item, k0, i0) => {
          var _a2;
          return {
            a: item.img[0],
            b: common_vendor.t(item == null ? void 0 : item.title),
            c: common_vendor.t((_a2 = item == null ? void 0 : item.User) == null ? void 0 : _a2.name),
            d: "e3a11c69-0-" + i0,
            e: "e3a11c69-1-" + i0,
            f: item.id,
            g: common_vendor.o(($event) => toDetail(item.id), item.id)
          };
        }),
        c: common_assets._imports_0,
        d: common_vendor.p({
          name: "like",
          color: "#ff713c"
        }),
        e: common_vendor.p({
          name: "comment-o"
        }),
        f: common_vendor.p({
          name: "plus"
        }),
        g: common_vendor.o(toAdd)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e3a11c69"], ["__file", "F:/单子/8.30门票预定/booking/pages/switch/item/culture.vue"]]);
wx.createPage(MiniProgramPage);
