"use strict";
const common_vendor = require("../../common/vendor.js");
const http_getinfo = require("../../http/getinfo.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  (_easycom_u_search2 + _easycom_u_toast2)();
}
const _easycom_u_search = () => "../../uni_modules/vk-uview-ui/components/u-search/u-search.js";
const _easycom_u_toast = () => "../../uni_modules/vk-uview-ui/components/u-toast/u-toast.js";
if (!Math) {
  (_easycom_u_search + MySell + _easycom_u_toast)();
}
const MySell = () => "../../components/common/sell.js";
const _sfc_main = {
  __name: "product",
  setup(__props) {
    const utoast = common_vendor.ref();
    const keyword = common_vendor.ref("");
    const proList = common_vendor.ref([]);
    const ifempty = common_vendor.ref(false);
    const page = common_vendor.ref(1);
    const keys = common_vendor.ref("");
    const handleSearch = (val) => {
      if (val === "" && proList.value.length === 0) {
        page.value = 1;
        getList(keys.value, page.value);
      } else {
        search(val);
      }
    };
    const lower = () => {
      if (ifempty.value === false) {
        page.value++;
        getList(keys.value, page.value);
      } else {
        utoast.value.show({
          title: "没有更多了！",
          type: "warning",
          icon: false
        });
      }
    };
    common_vendor.onLoad((keys2) => {
      keys2.value = keys2.type;
      getList(keys2.value, page.value);
    });
    const getList = async (key, val) => {
      const { data: res } = await http_getinfo.getByTypageApi(key, val);
      res.data = res.data.map((item) => {
        return {
          ...item,
          cover: JSON.parse(item.cover)
        };
      });
      proList.value = [...proList.value, ...res.data];
      if (res.data.length < 20) {
        ifempty.value = true;
      }
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
            b: "ef183f32-1-" + i0,
            c: common_vendor.p({
              product: item
            })
          };
        }),
        f: common_vendor.o(lower),
        g: common_vendor.sr(utoast, "ef183f32-2", {
          "k": "utoast"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ef183f32"], ["__file", "F:/单子/8.30门票预定/booking/pages/list/product.vue"]]);
wx.createPage(MiniProgramPage);
