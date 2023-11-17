"use strict";
const common_vendor = require("../../common/vendor.js");
const http_getinfo = require("../../http/getinfo.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _component_van_divider = common_vendor.resolveComponent("van-divider");
  (_easycom_u_search2 + _component_van_divider)();
}
const _easycom_u_search = () => "../../uni_modules/vk-uview-ui/components/u-search/u-search.js";
if (!Math) {
  (_easycom_u_search + MyAddcar)();
}
const MyAddcar = () => "../../components/search/addcar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const keyword = common_vendor.ref("");
    const proList = common_vendor.ref([]);
    const sugestList = common_vendor.ref(null);
    const handleSearch = (val) => {
      search(val);
    };
    const getInfo = async () => {
      const { data: res } = await http_getinfo.getByTypeApi(4);
      res.data = res.data.map((item) => {
        return {
          ...item,
          cover: JSON.parse(item.cover)
        };
      });
      sugestList.value = res.data[0];
    };
    const search = async (words) => {
      const { data: res } = await http_getinfo.searchByNameApi(words);
      res.data = res.data.map((item) => {
        return {
          ...item,
          cover: JSON.parse(item.cover)
        };
      });
      proList.value = res.data;
    };
    common_vendor.onMounted(() => {
      getInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleSearch),
        b: common_vendor.o(handleSearch),
        c: common_vendor.o(($event) => keyword.value = $event),
        d: common_vendor.p({
          focus: true,
          placeholder: "请输入想要搜索的商品",
          ["input-align"]: "center",
          clearabled: true,
          modelValue: keyword.value
        }),
        e: common_vendor.f(proList.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: "2dab939d-1-" + i0,
            c: common_vendor.p({
              goods: item
            })
          };
        }),
        f: common_vendor.p({
          contentPosition: "left",
          textColor: "#1989fa"
        }),
        g: common_vendor.p({
          goods: sugestList.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dab939d"], ["__file", "F:/单子/8.30门票预定/booking/pages/search/index.vue"]]);
wx.createPage(MiniProgramPage);
