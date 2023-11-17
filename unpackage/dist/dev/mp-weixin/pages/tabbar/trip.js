"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_hotel = require("../../stores/hotel.js");
const http_getinfo = require("../../http/getinfo.js");
const stores_login = require("../../stores/login.js");
const http_signature = require("../../http/signature.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_icon + MyLive + MyKeeper + MyIntercept)();
}
const MyLive = () => "../../components/trip/live.js";
const MyKeeper = () => "../../components/trip/keeper.js";
const MyIntercept = () => "../../components/intercept/intercept.js";
const _sfc_main = {
  __name: "trip",
  setup(__props) {
    const LoginStore = stores_login.useLoginStore();
    const HotelStore = stores_hotel.useHotelStore();
    const roommsg = common_vendor.ref([]);
    const findOrder = async (val) => {
      const { data: res } = await http_signature.getSignature("Order.QuerySingleOrder", {
        OrgId: 1206840427889167,
        OrderId: val,
        IncludeOrgInfo: false,
        ExcludeOccupations: false,
        SearchBalance: false
      });
      console.log(222, res);
      if (res.Code === 1e4) {
        HotelStore.savePayOrder(res.Data);
        getRoommsg(res.Data.OrderId);
      }
    };
    const getOrder = async () => {
      const { data: res } = await http_getinfo.getOrderApi(LoginStore.keyInfo.openid);
      console.log(111, res);
      if (res.code === 200 && res.data.length !== 0) {
        HotelStore.name = res.data[0].name;
        HotelStore.phone = res.data[0].phone;
        HotelStore.idcard = res.data[0].idcard;
        HotelStore.idcardType = res.data[0].idcardtype;
        HotelStore.ifzhu = res.data[0].ifzhu;
        findOrder(res.data[0].orderid);
      }
    };
    const getRoommsg = async (val) => {
      const { data: res } = await http_signature.getSignature("Order.QueryCheckins", {
        OrgId: 1206840427889167,
        OrderIds: [val]
      });
      console.log(333, res);
      roommsg.value = res.Data.Content.filter((item) => item.OrderId === val);
    };
    common_vendor.onMounted(() => {
      if (HotelStore.orderMsg !== null) {
        getRoommsg(HotelStore.orderMsg.OrderId);
        return;
      } else {
        getOrder();
      }
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      return common_vendor.e({
        a: !common_vendor.unref(HotelStore).orderMsg
      }, !common_vendor.unref(HotelStore).orderMsg ? {} : {}, {
        b: common_vendor.p({
          name: "wifi"
        }),
        c: !common_vendor.unref(HotelStore).orderMsg
      }, !common_vendor.unref(HotelStore).orderMsg ? {} : {}, {
        d: common_vendor.o(getRoommsg),
        e: common_vendor.p({
          roommsg: roommsg.value[0]
        }),
        f: (_c = (_b = (_a = common_vendor.unref(HotelStore)) == null ? void 0 : _a.orderMsg) == null ? void 0 : _b.OrgInfo) == null ? void 0 : _c.ImageUris
      }, ((_f = (_e = (_d = common_vendor.unref(HotelStore)) == null ? void 0 : _d.orderMsg) == null ? void 0 : _e.OrgInfo) == null ? void 0 : _f.ImageUris) ? {
        g: (_i = (_h = (_g = common_vendor.unref(HotelStore)) == null ? void 0 : _g.orderMsg) == null ? void 0 : _h.OrgInfo) == null ? void 0 : _i.ImageUris
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-39ce1ed7"], ["__file", "F:/单子/8.30门票预定/booking/pages/tabbar/trip.vue"]]);
wx.createPage(MiniProgramPage);
