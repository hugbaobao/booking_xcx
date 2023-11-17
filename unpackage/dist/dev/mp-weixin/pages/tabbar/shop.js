"use strict";
const common_vendor = require("../../common/vendor.js");
const http_getinfo = require("../../http/getinfo.js");
const stores_login = require("../../stores/login.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_sidebar_item = common_vendor.resolveComponent("van-sidebar-item");
  const _component_van_sidebar = common_vendor.resolveComponent("van-sidebar");
  (_component_van_icon + _component_van_sidebar_item + _component_van_sidebar)();
}
if (!Math) {
  (MyHot + MyNew + MyLocal + MyWear + MyHome + MyIntercept)();
}
const MyHot = () => "../../components/shop/content/hot.js";
const MyNew = () => "../../components/shop/content/new.js";
const MyLocal = () => "../../components/shop/content/local.js";
const MyWear = () => "../../components/shop/content/wear.js";
const MyHome = () => "../../components/shop/content/home.js";
const MyIntercept = () => "../../components/intercept/intercept.js";
const _sfc_main = {
  __name: "shop",
  setup(__props) {
    const loginStore = stores_login.useLoginStore();
    const pngList = common_vendor.ref(null);
    const activeKey = common_vendor.ref(0);
    const onChange = (event) => {
      activeKey.value = event.detail;
    };
    const toSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/index"
      });
    };
    const toOrdercar = () => {
      common_vendor.index.navigateTo({
        url: "/pages/order/car"
      });
    };
    const getInfo = async () => {
      const { data: res } = await http_getinfo.getPngApi();
      pngList.value = res.data[0];
    };
    common_vendor.onMounted(() => {
      getInfo();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return common_vendor.e({
        a: common_vendor.p({
          name: "search",
          size: "35rpx",
          color: "#919191"
        }),
        b: common_vendor.o(toSearch),
        c: common_vendor.p({
          title: "热销排行"
        }),
        d: common_vendor.p({
          title: "新品上架"
        }),
        e: common_vendor.p({
          title: "特产"
        }),
        f: common_vendor.p({
          title: "出行穿戴"
        }),
        g: common_vendor.p({
          title: "家用家居"
        }),
        h: common_vendor.o(onChange),
        i: common_vendor.p({
          activeKey: activeKey.value
        }),
        j: activeKey.value === 0
      }, activeKey.value === 0 ? {
        k: common_vendor.p({
          cover: (_a = pngList.value) == null ? void 0 : _a.hot
        })
      } : activeKey.value === 1 ? {
        m: common_vendor.p({
          cover: (_b = pngList.value) == null ? void 0 : _b.new
        })
      } : activeKey.value === 2 ? {
        o: common_vendor.p({
          cover: (_c = pngList.value) == null ? void 0 : _c.local
        })
      } : activeKey.value === 3 ? {
        q: common_vendor.p({
          cover: (_d = pngList.value) == null ? void 0 : _d.wear
        })
      } : {
        r: common_vendor.p({
          cover: (_e = pngList.value) == null ? void 0 : _e.home
        })
      }, {
        l: activeKey.value === 1,
        n: activeKey.value === 2,
        p: activeKey.value === 3,
        s: common_vendor.p({
          name: "cart-o",
          info: common_vendor.unref(loginStore).carcount,
          size: "50rpx"
        }),
        t: common_vendor.o(toOrdercar)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d1b89e24"], ["__file", "F:/单子/8.30门票预定/booking/pages/tabbar/shop.vue"]]);
wx.createPage(MiniProgramPage);
