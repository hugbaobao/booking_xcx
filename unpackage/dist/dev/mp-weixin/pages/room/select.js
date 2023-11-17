"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_hotel = require("../../stores/hotel.js");
const http_signature = require("../../http/signature.js");
if (!Array) {
  const _component_van_sticky = common_vendor.resolveComponent("van-sticky");
  _component_van_sticky();
}
if (!Math) {
  (MyScreen + MyTabs + MyScrolly)();
}
const MyScreen = () => "../../components/list/screen.js";
const MyTabs = () => "../../components/list/tabs.js";
const MyScrolly = () => "../../components/common/scrolly.js";
const _sfc_main = {
  __name: "select",
  setup(__props) {
    const HotelStore = stores_hotel.useHotelStore();
    const roomList = common_vendor.ref([]);
    const sendList = common_vendor.ref([]);
    const changeAttr = (val) => {
      if (val === "") {
        sendList.value = roomList.value;
      } else {
        sendList.value = roomList.value.filter((items) => items.Attribute && items.Attribute.indexOf(val) !== -1);
      }
    };
    const refresh = () => {
      getRoomCanUse();
    };
    const getRoominfo = async () => {
      const requestData = {
        OrgIds: [1206840427889167],
        ArriveTime: HotelStore.ArriveTime,
        DepartureTime: HotelStore.DepartureTime,
        OnlyOpenedOrg: true,
        // 是否只查询开放接口的酒店信息
        PhysicalRoomTypeOnly: true,
        // 只查询物理房型
        BasicInfoOnly: false,
        // 只查询酒店基本信息
        IncludeDetailCounts: false,
        // 是否包含查询时间段内每天的房量信息
        IncludePrices: true,
        // 是否包含房价信息
        IncludeRoomCounts: true,
        // 是否包含房量信息
        PageSize: 10,
        // 分页大小
        PageIndex: 1,
        // 页码
        MemberLevels: [""],
        // 获取散客房价
        RoomStatuses: ["VC"]
        // 房态
      };
      const { data: res } = await http_signature.getSignature("Hotel.SearchOrgWithRoomPriceAndRoomCount", requestData);
      if (res.Code === 1e4) {
        HotelStore.Prices = res.Data[0].Prices;
        HotelStore.sevicetag = res.Data[0].ServiceTags ? res.Data[0].ServiceTags : [];
      }
    };
    const getRoomCanUse = async () => {
      const requestdata = {
        OrgId: 1206840427889167,
        RoomStatuses: ["VC"],
        ArriveTime: HotelStore.ArriveTime,
        DepartureTime: HotelStore.DepartureTime,
        CheckinType: "Normal"
      };
      if (HotelStore.RoomTypeId !== "") {
        requestdata.RoomTypeIds = [HotelStore.RoomTypeId];
      }
      const { data: res } = await http_signature.getSignature("Hotel.GetAvailableRooms", requestdata);
      if (res.Code === 1e4) {
        sendList.value = roomList.value = res.Data.splice(0, 200);
      }
    };
    common_vendor.watch(() => HotelStore.ArriveTime, () => {
      getRoominfo();
    });
    common_vendor.onMounted(() => {
      getRoominfo();
      getRoomCanUse();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(refresh),
        b: common_vendor.o(changeAttr),
        c: common_vendor.p({
          roomlist: roomList.value
        }),
        d: sendList.value
      }, sendList.value ? {
        e: common_vendor.p({
          roomList: sendList.value
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b71be3bb"], ["__file", "F:/单子/8.30门票预定/booking/pages/room/select.vue"]]);
wx.createPage(MiniProgramPage);
