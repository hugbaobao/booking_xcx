"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_hotel = require("../../stores/hotel.js");
require("../../http/signature.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "details",
  setup(__props) {
    const HotelStore = stores_hotel.useHotelStore();
    const attrarr = common_vendor.computed(() => {
      if (HotelStore.selectedRoom.Attribute !== null) {
        return HotelStore.selectedRoom.Attribute.split("?");
      } else {
        return [];
      }
    });
    const totooking = () => {
      common_vendor.index.navigateTo({
        url: "/pages/room/booking"
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return common_vendor.e({
        a: common_vendor.unref(HotelStore).selectedRoom.ImageUris,
        b: common_vendor.t(common_vendor.unref(HotelStore).selectedPrinceInfo.OrignPrice),
        c: common_vendor.t(`${(_b = (_a = common_vendor.unref(HotelStore).selectedPrinceInfo) == null ? void 0 : _a.RoomType) == null ? void 0 : _b.RoomTypeName} - ${common_vendor.unref(HotelStore).selectedRoom.RoomNumber}`),
        d: common_vendor.t((_d = (_c = common_vendor.unref(HotelStore).selectedPrinceInfo) == null ? void 0 : _c.RoomType) == null ? void 0 : _d.RoomTypeName),
        e: common_vendor.f(common_vendor.unref(attrarr), (item, index, i0) => {
          return {
            a: "7ef8ced2-0-" + i0,
            b: common_vendor.t(item),
            c: index
          };
        }),
        f: common_vendor.p({
          name: "hotel-o",
          size: "50rpx"
        }),
        g: common_vendor.p({
          name: "birthday-cake-o",
          size: "50rpx"
        }),
        h: common_vendor.t(common_vendor.unref(HotelStore).selectedRoom.HallName),
        i: common_vendor.t(common_vendor.unref(HotelStore).selectedRoom.FloorName),
        j: common_vendor.t(common_vendor.unref(HotelStore).selectedRoom.IsNetLock ? "网络门锁" : "非网络门锁"),
        k: common_vendor.t(common_vendor.unref(HotelStore).selectedPrinceInfo.RoomType.OrgRoomTypeDescription),
        l: common_vendor.p({
          name: "birthday-cake-o",
          size: "50rpx"
        }),
        m: common_vendor.t(common_vendor.unref(HotelStore).selectedPrinceInfo.RoomType.BedAmount),
        n: common_vendor.t(common_vendor.unref(HotelStore).selectedPrinceInfo.RoomType.BedType),
        o: common_vendor.unref(HotelStore).sevicetag.length !== 0
      }, common_vendor.unref(HotelStore).sevicetag.length !== 0 ? {
        p: common_vendor.p({
          name: "birthday-cake-o",
          size: "50rpx"
        }),
        q: common_vendor.f(common_vendor.unref(HotelStore).sevicetag, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        })
      } : {}, {
        r: common_vendor.unref(HotelStore).selectedRoom.Description
      }, common_vendor.unref(HotelStore).selectedRoom.Description ? {
        s: common_vendor.p({
          name: "birthday-cake-o",
          size: "50rpx"
        }),
        t: common_vendor.t(common_vendor.unref(HotelStore).selectedRoom.Description)
      } : {}, {
        v: common_vendor.o(totooking)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7ef8ced2"], ["__file", "F:/单子/8.30门票预定/booking/pages/room/details.vue"]]);
wx.createPage(MiniProgramPage);
