"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_hotel = require("../../stores/hotel.js");
require("../../http/signature.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = {
  __name: "selecttime",
  setup(__props) {
    const HotelStore = stores_hotel.useHotelStore();
    const from = common_vendor.ref("");
    const to = common_vendor.ref("");
    const topicker = () => {
      common_vendor.index.navigateTo({
        url: "/pages/picker/calendar"
      });
    };
    common_vendor.watchEffect(() => {
      from.value = HotelStore.ArriveTime;
      to.value = HotelStore.DepartureTime;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(from.value),
        b: common_vendor.t(to.value),
        c: common_vendor.p({
          name: "arrow-down-fill",
          color: "#bfbfbf"
        }),
        d: common_vendor.o(topicker)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5a2b8f1a"], ["__file", "F:/单子/8.30门票预定/booking/components/room/selecttime.vue"]]);
wx.createComponent(Component);
