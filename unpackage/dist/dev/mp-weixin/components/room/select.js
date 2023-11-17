"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_hotel = require("../../stores/hotel.js");
require("../../http/signature.js");
if (!Array) {
  const _easycom_u_dropdown_item2 = common_vendor.resolveComponent("u-dropdown-item");
  const _easycom_u_dropdown2 = common_vendor.resolveComponent("u-dropdown");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_dropdown_item2 + _easycom_u_dropdown2 + _easycom_u_icon2)();
}
const _easycom_u_dropdown_item = () => "../../uni_modules/vk-uview-ui/components/u-dropdown-item/u-dropdown-item.js";
const _easycom_u_dropdown = () => "../../uni_modules/vk-uview-ui/components/u-dropdown/u-dropdown.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_dropdown_item + _easycom_u_dropdown + _easycom_u_icon)();
}
const _sfc_main = {
  __name: "select",
  props: {
    // 数据列表
    hotellist: {
      default: [
        {
          label: "选择酒店",
          value: "1206840427889167"
        }
      ]
    },
    typelist: {
      default: [
        {
          label: "选择房型",
          value: "000"
        }
      ]
    }
  },
  setup(__props) {
    const props = __props;
    const HotelStore = stores_hotel.useHotelStore();
    const dropdown1 = common_vendor.ref();
    const dropdown2 = common_vendor.ref();
    const values1 = common_vendor.ref("");
    const values2 = common_vendor.ref("");
    let flag1 = common_vendor.ref(true);
    let flag2 = common_vendor.ref(true);
    const selected1 = (val) => {
      let target = props.hotellist.find((item) => item.value === val);
      values1.value = target.label;
      HotelStore.OrgId = val;
      HotelStore.OrgName = target.label;
    };
    const selected2 = (val) => {
      let target = props.typelist.find((item) => item.value === val);
      HotelStore.RoomTypeId = val;
      HotelStore.RoomTypeName = target.label;
      values2.value = target.label;
    };
    const open1 = () => {
      flag1.value = false;
      dropdown2.value.close();
    };
    const open2 = () => {
      flag2.value = false;
      dropdown1.value.close();
    };
    common_vendor.watchEffect(() => {
      values2.value = HotelStore.RoomTypeName;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(selected1),
        b: common_vendor.p({
          title: values1.value,
          options: __props.hotellist
        }),
        c: common_vendor.sr(dropdown1, "70c817cd-0", {
          "k": "dropdown1"
        }),
        d: common_vendor.o(open1),
        e: common_vendor.o(($event) => common_vendor.isRef(flag1) ? flag1.value = true : flag1 = true),
        f: common_vendor.p({
          height: 60
        }),
        g: common_vendor.unref(flag1)
      }, common_vendor.unref(flag1) ? {
        h: common_vendor.p({
          name: "arrow-down-fill",
          color: "#bfbfbf"
        })
      } : {
        i: common_vendor.p({
          name: "arrow-up-fill",
          color: "#bfbfbf"
        })
      }, {
        j: common_vendor.o(selected2),
        k: common_vendor.p({
          title: values2.value,
          options: __props.typelist,
          height: "400"
        }),
        l: common_vendor.sr(dropdown2, "70c817cd-4", {
          "k": "dropdown2"
        }),
        m: common_vendor.o(open2),
        n: common_vendor.o(($event) => common_vendor.isRef(flag2) ? flag2.value = true : flag2 = true),
        o: common_vendor.p({
          height: 60
        }),
        p: common_vendor.unref(flag2)
      }, common_vendor.unref(flag2) ? {
        q: common_vendor.p({
          name: "arrow-down-fill",
          color: "#bfbfbf"
        })
      } : {
        r: common_vendor.p({
          name: "arrow-up-fill",
          color: "#bfbfbf"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70c817cd"], ["__file", "F:/单子/8.30门票预定/booking/components/room/select.vue"]]);
wx.createComponent(Component);
