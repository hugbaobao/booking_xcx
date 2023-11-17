"use strict";
const common_vendor = require("../../common/vendor.js");
const http_getinfo = require("../../http/getinfo.js");
const http_signature = require("../../http/signature.js");
const stores_hotel = require("../../stores/hotel.js");
require("../../stores/login.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  (_component_van_icon + _easycom_u_button2 + _easycom_u_toast2)();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_toast = () => "../../uni_modules/vk-uview-ui/components/u-toast/u-toast.js";
if (!Math) {
  (MyAntSwiper + MySelect + MySelectTime + _easycom_u_button + MySell + _easycom_u_toast + MyMixin)();
}
const MyAntSwiper = () => "../../components/home/antswiper.js";
const MySelect = () => "../../components/room/select.js";
const MySelectTime = () => "../../components/room/selecttime.js";
const MySell = () => "../../components/common/sell.js";
const MyMixin = () => "../../components/mixin/mixin.js";
const _sfc_main = {
  __name: "room",
  setup(__props) {
    const LoginStore = stores_hotel.useHotelStore();
    const utoast = common_vendor.ref();
    const HotelStore = stores_hotel.useHotelStore();
    let optionshotel = common_vendor.ref([
      {
        label: "选择酒店",
        value: "1206840427889167"
      }
    ]);
    let optionsroom = common_vendor.ref([]);
    const list = common_vendor.ref([]);
    const swiperList = common_vendor.ref([]);
    const ifShow = common_vendor.ref(true);
    const toselect = () => {
      if (LoginStore.isLogin === false) {
        utoast.value.show({
          title: "请先登录，即将跳转到登录页！",
          type: "warning",
          icon: false
        });
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        }, 2e3);
        return;
      } else if (HotelStore.ArriveTime === "" || HotelStore.ArriveTime === "DepartureTime") {
        utoast.value.show({
          title: "请先选择入住时间！",
          type: "warning",
          icon: false
        });
        return;
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/room/select"
        });
      }
    };
    const getHotelList = async () => {
      const { data: res } = await http_signature.getSignature("Hotel.GetOrgInfo", { OrgId: "1206840427889167" });
      if (res.Code === 1e4) {
        HotelStore.Address = res.Data.Address;
        HotelStore.OrgName = res.Data.OrgName;
        HotelStore.Longitude = res.Data.WeMapLng;
        HotelStore.Latitude = res.Data.WeMapLat;
        optionshotel.value = [
          {
            label: res.Data.OrgName,
            value: "1206840427889167"
          }
        ];
      }
    };
    const getRoomList = async () => {
      const { data: res } = await http_signature.getSignature("Hotel.GetOrgRoomTypes", { OrgId: "1206840427889167" });
      if (res.Code === 1e4) {
        const initarr = res.Data.map((item) => {
          return {
            label: item.RoomTypeName,
            value: item.RoomTypeId
          };
        });
        const empty = {
          label: "暂不选择",
          value: ""
        };
        HotelStore.roomType = optionsroom.value = [empty, ...initarr];
      }
    };
    const getInfo = async () => {
      const { data: res } = await http_getinfo.getRoom();
      swiperList.value = res.data.banner;
      ifShow.value = res.data.switch;
    };
    const ShopShow = async () => {
      const { data: res } = await http_getinfo.getRoomShow("room");
      list.value = res.data.map((item) => {
        return {
          ...item,
          cover: JSON.parse(item.cover)
        };
      });
    };
    common_vendor.onMounted(() => {
      getRoomList();
      getInfo();
      ShopShow();
      getHotelList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: ifShow.value
      }, ifShow.value ? {
        b: common_vendor.p({
          list: swiperList.value,
          ifdots: true
        })
      } : {}, {
        c: common_vendor.p({
          hotellist: common_vendor.unref(optionshotel),
          typelist: common_vendor.unref(optionsroom)
        }),
        d: common_vendor.p({
          name: "arrow"
        }),
        e: common_vendor.o(toselect),
        f: common_vendor.p({
          type: "success",
          shape: "circle",
          title: "入住时间"
        }),
        g: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: "33e87923-5-" + i0,
            c: common_vendor.p({
              product: item
            })
          };
        }),
        h: common_vendor.o((...args) => _ctx.test && _ctx.test(...args)),
        i: common_vendor.sr(utoast, "33e87923-6", {
          "k": "utoast"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-33e87923"], ["__file", "F:/单子/8.30门票预定/booking/pages/tabbar/room.vue"]]);
wx.createPage(MiniProgramPage);
