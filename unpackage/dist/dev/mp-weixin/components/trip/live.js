"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_hotel = require("../../stores/hotel.js");
const http_getinfo = require("../../http/getinfo.js");
const http_signature = require("../../http/signature.js");
const stores_login = require("../../stores/login.js");
if (!Array) {
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  _easycom_u_toast2();
}
const _easycom_u_toast = () => "../../uni_modules/vk-uview-ui/components/u-toast/u-toast.js";
if (!Math) {
  (MyTitle + _easycom_u_toast)();
}
const MyTitle = () => "./title.js";
const _sfc_main = {
  __name: "live",
  props: ["roommsg"],
  emits: ["getroommsg"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const HotelStore = stores_hotel.useHotelStore();
    stores_login.useLoginStore();
    console.log(HotelStore.orderMsg);
    const utoast = common_vendor.ref();
    const date = common_vendor.ref("");
    const startDate = common_vendor.computed(() => {
      return getDate();
    });
    const getDate = (type) => {
      const date2 = /* @__PURE__ */ new Date();
      let year = date2.getFullYear();
      let month = date2.getMonth() + 1;
      let day = date2.getDate();
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    };
    const bindDateChange = (e) => {
      date.value = e.detail.value;
      const newDate = new Date(date.value);
      const oldDate = new Date(props.roommsg.EstimatedDepartureTime);
      let days = (newDate.getTime() - oldDate.getTime()) / (1e3 * 60 * 60 * 24);
      days = parseInt(days);
      console.log(days);
      if (days <= 0) {
        utoast.value.show({
          title: "续住时间不能小于入住时间！",
          type: "warning",
          icon: false
        });
        return;
      } else {
        const totalfee = 0.1;
        pay(props.roommsg.OrderId, totalfee, newDate);
      }
    };
    const toroom = () => {
      if (!HotelStore.orderMsg) {
        common_vendor.index.switchTab({
          url: "/pages/tabbar/room"
        });
        return;
      } else {
        AddCheckin();
      }
    };
    const toleave = () => {
      console.log(props.roommsg);
      return;
    };
    const AddCheckin = async () => {
      const { data: res } = await http_signature.getSignature(
        "Order.AddCheckin",
        {
          OrgId: 1206840427889167,
          OrderId: HotelStore.orderMsg.OrderId,
          Customer: {
            Name: HotelStore.name,
            CardTypeId: HotelStore.idcardType,
            CardNo: HotelStore.idcard,
            ThemSelfCheckin: true
          }
        }
      );
      console.log("ruzhu ", res);
      if (res.Code === 1e4) {
        utoast.value.show({
          title: "已为您办理入住！",
          type: "success",
          icon: false
        });
        HotelStore.ifzhu = true;
        changeZhu();
        emits("getroommsg");
      } else {
        utoast.value.show({
          title: "请到门店进行办理！",
          type: "warning",
          icon: false
        });
      }
    };
    const changeZhu = async () => {
      await http_getinfo.changeZhuApi(HotelStore.orderMsg.OrderId);
    };
    const addleavetime = async (newdate) => {
      const { data: res } = await http_signature.getSignature("Order.ChangeStay", {
        OrgId: 1206840427889167,
        CheckinIds: props.roommsg.CheckinId,
        OperateType: "ExtendStay",
        NewDepartureTime: newdate,
        Reason: "客人续住",
        ContinueLivePolicy: "Market"
      });
      console.log(111, res);
      if (res.Code === 1e4) {
        utoast.value.show({
          title: "修改成功！",
          type: "success",
          icon: false
        });
      } else {
        utoast.value.show({
          title: "请到前台进行办理！",
          type: "warning",
          icon: false
        });
      }
    };
    const pay = async (order, fee, newdate) => {
      addleavetime(newdate);
      return;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toroom),
        b: date.value,
        c: common_vendor.unref(startDate),
        d: common_vendor.o(bindDateChange),
        e: common_vendor.o(toleave),
        f: common_vendor.sr(utoast, "b6b2704f-1", {
          "k": "utoast"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b6b2704f"], ["__file", "F:/单子/8.30门票预定/booking/components/trip/live.vue"]]);
wx.createComponent(Component);
