"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_hotel = require("../../stores/hotel.js");
require("../../http/signature.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "map",
  setup(__props) {
    const HotelStore = stores_hotel.useHotelStore();
    const covers = common_vendor.ref([
      {
        id: 1,
        latitude: "32.051844",
        longitude: "118.800358",
        iconPath: "",
        width: 30,
        height: 30
      }
    ]);
    const openMap = () => {
      common_vendor.index.openLocation({
        latitude: parseFloat(HotelStore.Latitude),
        longitude: parseFloat(HotelStore.Longitude),
        scale: 20,
        name: HotelStore.OrgName,
        address: HotelStore.Address,
        success: function() {
          console.log("打开地图 success");
        }
      });
    };
    common_vendor.watchEffect(() => {
      covers.value = [
        {
          id: 1,
          latitude: HotelStore.Latitude,
          longitude: HotelStore.Longitude,
          iconPath: "",
          width: 30,
          height: 30
        }
      ];
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return {
        a: (_a = common_vendor.unref(HotelStore)) == null ? void 0 : _a.Latitude,
        b: (_b = common_vendor.unref(HotelStore)) == null ? void 0 : _b.Longitude,
        c: covers.value,
        d: common_vendor.t((_c = common_vendor.unref(HotelStore)) == null ? void 0 : _c.OrgName),
        e: common_vendor.t((_d = common_vendor.unref(HotelStore)) == null ? void 0 : _d.Address),
        f: common_vendor.p({
          name: "map-marked",
          color: "#fff",
          size: "60rpx"
        }),
        g: common_vendor.o(openMap)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e06b858f"], ["__file", "F:/单子/8.30门票预定/booking/pages/map/map.vue"]]);
wx.createPage(MiniProgramPage);
