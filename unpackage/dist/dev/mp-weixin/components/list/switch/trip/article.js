"use strict";
const common_vendor = require("../../../../common/vendor.js");
const http_getinfo = require("../../../../http/getinfo.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "article",
  setup(__props) {
    const List = common_vendor.ref([]);
    const toDetail = (val) => {
      common_vendor.index.navigateTo({
        url: "/pages/switch/detail?id=" + val
      });
    };
    const getArttrip = async () => {
      const { data: res } = await http_getinfo.getArttripApi();
      List.value = res.data.map((item) => {
        return {
          ...item,
          img: Object.values(item.img)
        };
      });
    };
    common_vendor.onMounted(() => {
      getArttrip();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(List.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.content),
            c: common_vendor.t(item.createtime),
            d: "351abf42-0-" + i0,
            e: "351abf42-1-" + i0,
            f: item.img[0],
            g: item.id,
            h: common_vendor.o(($event) => toDetail(item.id), item.id)
          };
        }),
        b: common_vendor.p({
          name: "like",
          color: "#ff713c",
          size: "30rpx"
        }),
        c: common_vendor.p({
          name: "comment-o",
          size: "35rpx"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-351abf42"], ["__file", "F:/单子/8.30门票预定/booking/components/list/switch/trip/article.vue"]]);
wx.createComponent(Component);
