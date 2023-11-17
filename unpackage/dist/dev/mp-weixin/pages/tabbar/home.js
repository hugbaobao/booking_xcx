"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_getNav = require("../../hooks/getNav.js");
const http_getinfo = require("../../http/getinfo.js");
if (!Math) {
  (MyNavgation + MySwiper + MySwitch + MyAntSwiper + MySort)();
}
const MyNavgation = () => "../../components/navgation/home.js";
const MySwiper = () => "../../components/home/swiper.js";
const MySwitch = () => "../../components/home/switch.js";
const MyAntSwiper = () => "../../components/home/antswiper.js";
const MySort = () => "../../components/home/sort.js";
const _sfc_main = {
  __name: "home",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "1213774b": common_vendor.unref(fullH)
    }));
    let fullH = `${hooks_getNav.navdate.fullH + 5}px`;
    const Maininfo = common_vendor.ref([]);
    const listone = common_vendor.ref([]);
    const listtwo = common_vendor.ref([]);
    const getInfo = async () => {
      const { data: res } = await http_getinfo.getHomeApi();
      Maininfo.value = res.data;
    };
    const ShopShow = async () => {
      const { data: res } = await http_getinfo.getRoomShow("hometop");
      listone.value = res.data.map((item) => {
        return {
          ...item,
          cover: JSON.parse(item.cover)
        };
      });
    };
    const ShopShowother = async () => {
      const { data: res } = await http_getinfo.getRoomShow("homebtm");
      listtwo.value = res.data.map((item) => {
        return {
          ...item,
          cover: JSON.parse(item.cover)
        };
      });
    };
    common_vendor.onMounted(() => {
      getInfo();
      ShopShow();
      ShopShowother();
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: Maininfo.value.clocktop
      }, Maininfo.value.clocktop ? {
        b: common_vendor.p({
          list: Object.values(Maininfo.value.bannertop)
        })
      } : {}, {
        c: common_vendor.p({
          list: Maininfo.value.switch
        }),
        d: Maininfo.value.clockbtm
      }, Maininfo.value.clockbtm ? {
        e: common_vendor.p({
          list: Maininfo.value.bannerbtm
        })
      } : {}, {
        f: common_vendor.p({
          cover: (_a = Maininfo.value.coverone) == null ? void 0 : _a.url,
          list: listone.value
        }),
        g: common_vendor.p({
          cover: (_b = Maininfo.value.covertwo) == null ? void 0 : _b.url,
          list: listtwo.value
        }),
        h: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4764087f"], ["__file", "F:/单子/8.30门票预定/booking/pages/tabbar/home.vue"]]);
wx.createPage(MiniProgramPage);
