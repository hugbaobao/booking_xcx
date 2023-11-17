"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_hotel = require("../../stores/hotel.js");
require("../../http/signature.js");
const _sfc_main = {
  __name: "block",
  props: {
    roominfo: {
      type: Object
    }
  },
  setup(__props) {
    const props = __props;
    const HotelStore = stores_hotel.useHotelStore();
    const priceinfo = common_vendor.ref({});
    const todetails = () => {
      HotelStore.saveInfo(priceinfo.value, props.roominfo);
      common_vendor.index.navigateTo({
        url: "/pages/room/details"
      });
    };
    const totooking = () => {
      HotelStore.saveInfo(priceinfo.value, props.roominfo);
      common_vendor.index.navigateTo({
        url: "/pages/room/booking"
      });
    };
    common_vendor.watchEffect(() => {
      if (props.roominfo) {
        priceinfo.value = HotelStore.Prices.find((item) => item.RoomTypeId === props.roominfo.RoomTypeId);
      }
    });
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: __props.roominfo.ImageUris,
        b: common_vendor.t(`${(_b = (_a = priceinfo.value) == null ? void 0 : _a.RoomType) == null ? void 0 : _b.RoomTypeName} - ${__props.roominfo.RoomNumber}`),
        c: common_vendor.t(__props.roominfo.Attribute),
        d: common_vendor.t((_c = priceinfo.value) == null ? void 0 : _c.OrignPrice),
        e: common_vendor.o(totooking),
        f: common_vendor.o(todetails)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4dcab1e"], ["__file", "F:/单子/8.30门票预定/booking/components/room/block.vue"]]);
wx.createComponent(Component);
