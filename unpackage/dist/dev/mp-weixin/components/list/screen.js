"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_hotel = require("../../stores/hotel.js");
require("../../http/signature.js");
if (!Array) {
  const _easycom_u_dropdown_item2 = common_vendor.resolveComponent("u-dropdown-item");
  const _easycom_u_dropdown2 = common_vendor.resolveComponent("u-dropdown");
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  (_easycom_u_dropdown_item2 + _easycom_u_dropdown2 + _component_van_icon)();
}
const _easycom_u_dropdown_item = () => "../../uni_modules/vk-uview-ui/components/u-dropdown-item/u-dropdown-item.js";
const _easycom_u_dropdown = () => "../../uni_modules/vk-uview-ui/components/u-dropdown/u-dropdown.js";
if (!Math) {
  (_easycom_u_dropdown_item + _easycom_u_dropdown)();
}
const _sfc_main = {
  __name: "screen",
  emits: ["typeChange"],
  setup(__props, { emit: emits }) {
    const HotelStore = stores_hotel.useHotelStore();
    const values = common_vendor.ref("选择房型");
    const options = common_vendor.ref([]);
    const selected = (val) => {
      let target = options.value.find((item) => item.value === val);
      HotelStore.RoomTypeId = val;
      HotelStore.RoomTypeName = target.label;
      values.value = target.label;
      emits("typeChange");
    };
    const toTimer = () => {
      common_vendor.index.navigateTo({
        url: "/pages/picker/calendar"
      });
    };
    common_vendor.onLoad(() => {
      options.value = HotelStore.roomType;
      values.value = HotelStore.RoomTypeName;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toTimer),
        b: common_vendor.o(selected),
        c: common_vendor.p({
          title: values.value,
          options: options.value,
          height: "600"
        }),
        d: common_vendor.p({
          height: 60
        }),
        e: common_vendor.p({
          name: "location",
          size: "40rpx"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3137f58c"], ["__file", "F:/单子/8.30门票预定/booking/components/list/screen.vue"]]);
wx.createComponent(Component);
