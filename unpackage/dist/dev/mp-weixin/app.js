"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const http_wxapi = require("./http/wxapi.js");
const stores_login = require("./stores/login.js");
const http_getinfo = require("./http/getinfo.js");
const uni_modules_vkUviewUi_index = require("./uni_modules/vk-uview-ui/index.js");
require("./uni_modules/vk-uview-ui/libs/mixin/mixin.js");
require("./uni_modules/vk-uview-ui/libs/request/index.js");
require("./uni_modules/vk-uview-ui/libs/function/deepMerge.js");
require("./uni_modules/vk-uview-ui/libs/function/deepClone.js");
require("./uni_modules/vk-uview-ui/libs/function/test.js");
require("./uni_modules/vk-uview-ui/libs/function/queryParams.js");
require("./uni_modules/vk-uview-ui/libs/function/route.js");
require("./uni_modules/vk-uview-ui/libs/function/timeFormat.js");
require("./uni_modules/vk-uview-ui/libs/function/timeFrom.js");
require("./uni_modules/vk-uview-ui/libs/function/colorGradient.js");
require("./uni_modules/vk-uview-ui/libs/function/guid.js");
require("./uni_modules/vk-uview-ui/libs/function/color.js");
require("./uni_modules/vk-uview-ui/libs/function/type2icon.js");
require("./uni_modules/vk-uview-ui/libs/function/randomArray.js");
require("./uni_modules/vk-uview-ui/libs/function/addUnit.js");
require("./uni_modules/vk-uview-ui/libs/function/random.js");
require("./uni_modules/vk-uview-ui/libs/function/trim.js");
require("./uni_modules/vk-uview-ui/libs/function/toast.js");
require("./uni_modules/vk-uview-ui/libs/function/getParent.js");
require("./uni_modules/vk-uview-ui/libs/function/_parent.js");
require("./uni_modules/vk-uview-ui/libs/function/sys.js");
require("./uni_modules/vk-uview-ui/libs/function/debounce.js");
require("./uni_modules/vk-uview-ui/libs/function/throttle.js");
require("./uni_modules/vk-uview-ui/libs/function/addStyle.js");
require("./uni_modules/vk-uview-ui/libs/config/config.js");
require("./uni_modules/vk-uview-ui/libs/config/zIndex.js");
if (!Math) {
  "./pages/tabbar/room.js";
  "./pages/tabbar/trip.js";
  "./pages/tabbar/home.js";
  "./pages/tabbar/shop.js";
  "./pages/tabbar/personal.js";
  "./pages/picker/calendar.js";
  "./pages/room/select.js";
  "./pages/room/details.js";
  "./pages/room/booking.js";
  "./pages/input/idcard.js";
  "./pages/agreement/idcard.js";
  "./pages/map/map.js";
  "./pages/order/order.js";
  "./pages/switch/item/culture.js";
  "./pages/switch/item/trip.js";
  "./pages/switch/detail.js";
  "./pages/switch/center.js";
  "./pages/search/index.js";
  "./pages/order/goodsdetail.js";
  "./pages/order/car.js";
  "./pages/personal/wallet.js";
  "./pages/personal/coupon.js";
  "./pages/personal/mycoupon.js";
  "./pages/personal/vip.js";
  "./pages/personal/jifen.js";
  "./pages/switch/item/addtrip.js";
  "./pages/switch/item/addcenter.js";
  "./pages/list/product.js";
  "./pages/login/login.js";
  "./pages/login/setmymsg.js";
}
const _sfc_main = {
  onLaunch: function() {
  },
  onShow: function() {
    const Login = stores_login.useLoginStore();
    common_vendor.index.login({
      provider: "weixin",
      //使用微信登录
      success: async function(loginRes) {
        if (loginRes.errMsg === "login:ok") {
          const nodedata = await http_wxapi.getRoom(loginRes.code);
          if (nodedata.errMsg === "request:ok") {
            Login.saveKeyInfo(nodedata.data);
            const { data: res2 } = await http_getinfo.getUserApi(nodedata.data.openid);
            if (res2.data !== null) {
              Login.userMsg.phone = res2.data.phone;
              Login.userMsg.name = res2.data.name;
              Login.userMsg.address = res2.data.address;
              Login.userMsg.sex = res2.data.sex;
              Login.userMsg.idcard = res2.data.idcard;
              Login.userMsg.idcardtype = res2.data.idcardtype;
              Login.userMsg.vip = res2.data.vip;
              Login.userMsg.integral = res2.data.integral;
              Login.loginStateChange(true);
              Login.Receive = res2.data.Receive;
            }
          }
          const { data: res } = await http_getinfo.getCarApi(Login.keyInfo.openid);
          if (res.code === 200) {
            Login.getOrder(res.data);
          }
        }
      }
    });
  },
  onHide: function() {
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/单子/8.30门票预定/booking/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(uni_modules_vkUviewUi_index.uView);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
