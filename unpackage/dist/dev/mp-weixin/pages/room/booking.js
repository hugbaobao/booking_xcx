"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_hotel = require("../../stores/hotel.js");
const stores_login = require("../../stores/login.js");
const http_signature = require("../../http/signature.js");
const http_getinfo = require("../../http/getinfo.js");
const http_pay = require("../../http/pay.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_checkbox = common_vendor.resolveComponent("van-checkbox");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  (_component_van_icon + _component_van_checkbox + _component_van_cell + _component_van_popup + _easycom_u_toast2)();
}
const _easycom_u_toast = () => "../../uni_modules/vk-uview-ui/components/u-toast/u-toast.js";
if (!Math) {
  _easycom_u_toast();
}
const _sfc_main = {
  __name: "booking",
  setup(__props) {
    const utoast = common_vendor.ref();
    const HotelStore = stores_hotel.useHotelStore();
    const LoginStore = stores_login.useLoginStore();
    const MemberId = common_vendor.ref("");
    const ticket = common_vendor.ref([]);
    const name = common_vendor.ref("");
    const setphone = common_vendor.ref("");
    const beizhu = common_vendor.ref("");
    const checked1 = common_vendor.ref(false);
    const checked2 = common_vendor.ref(false);
    const checked3 = common_vendor.ref(false);
    const checked4 = common_vendor.ref(false);
    const showbeiticket = common_vendor.ref(false);
    const showbei = common_vendor.ref(false);
    const onChange1 = (event) => {
      checked1.value = event.detail;
    };
    const onChange2 = (event) => {
      checked2.value = event.detail;
    };
    const onChange3 = (event) => {
      checked3.value = event.detail;
    };
    const onChange4 = (event) => {
      checked4.value = event.detail;
    };
    const selectticket = (val) => {
      HotelStore.ticket = val;
    };
    const selectfp = (val) => {
      showbei.value = false;
      HotelStore.iffapiao = val;
    };
    const toidcard = async () => {
      if (name.value === "") {
        utoast.value.show({
          title: "请输入姓名！",
          type: "error",
          icon: false
        });
        return;
      }
      if (setphone.value === "") {
        utoast.value.show({
          title: "请输入手机号！",
          type: "error",
          icon: false
        });
        return;
      }
      if (LoginStore.userMsg.idcard !== "" && LoginStore.userMsg.name === name.value) {
        HotelStore.idcardType = LoginStore.userMsg.idcardtype;
        HotelStore.idcard = LoginStore.userMsg.idcard;
        HotelStore.name = name.value;
        HotelStore.phone = setphone.value === "" ? LoginStore.userMsg.phone : setphone.value;
        HotelStore.beizhu = beizhu.value;
        const result = await HotelStore.getVipInfo();
        if (result.Code === 1e4) {
          findOrder(result.Data);
        } else {
          utoast.value.show({
            title: "订单提交失败！",
            type: "warning",
            icon: false
          });
        }
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/input/idcard"
        });
      }
    };
    const getVipInfo = async () => {
      var _a;
      const { data: res1 } = await http_signature.getSignature("Member.GetMemberByOpenId", { openId: LoginStore.keyInfo.openid });
      if (res1.Code === 1e4) {
        MemberId.value = HotelStore.MemberId = (_a = res1 == null ? void 0 : res1.Data) == null ? void 0 : _a.MemberId;
        const { data: res2 } = await http_signature.getSignature("Coupon.GetMyCoupons", { MemberId: MemberId.value, CouponStatus: "ReadyForUse", PageSize: 10, PageIndex: 1 });
        if (res2.Code === 1e4) {
          ticket.value = res2.Data.Content;
        }
      }
    };
    const findOrder = async (val) => {
      const { data: res } = await http_signature.getSignature("Order.QuerySingleOrder", {
        OrgId: 1206840427889167,
        OrderId: val,
        IncludeOrgInfo: false,
        ExcludeOccupations: false,
        SearchBalance: false
      });
      if (res.Code === 1e4) {
        pay(res.Data);
      }
    };
    const pay = async (orderdata) => {
      const { data: res } = await http_pay.getPay(LoginStore.keyInfo.openid, orderdata.OrderId, HotelStore.selectedPrinceInfo.OrignPrice * HotelStore.totalDay);
      common_vendor.index.hideLoading();
      common_vendor.index.requestPayment({
        provider: "wxpay",
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: res.package,
        signType: "MD5",
        paySign: res.paySign,
        success: async (payres) => {
          console.log("paysuccess", payres);
          sendback(orderdata.OrderId);
          paySuccess(orderdata.OrderId.BillId);
          HotelStore.savePayOrder(orderdata);
          common_vendor.index.showToast({
            title: "支付成功！",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/tabbar/trip"
            });
          }, 2e3);
        },
        fail: (err) => {
          console.log("fail", err);
          common_vendor.index.showToast({
            title: "支付失败！",
            icon: "error"
          });
        }
      });
    };
    const paySuccess = async (val) => {
      await http_signature.getSignature("Bill.AddBillItem", {
        OrgId: 1206840427889167,
        BillId: val,
        BillItemType: "Credit",
        SubItemType: "C9140",
        Amount: HotelStore.selectedPrinceInfo.OrignPrice * HotelStore.totalDay,
        PaymentRequest: {}
      });
    };
    const sendback = async (val) => {
      await http_getinfo.addOrderApi({
        openid: LoginStore.keyInfo.openid,
        orderid: val,
        price: HotelStore.selectedPrinceInfo.OrignPrice * HotelStore.totalDay,
        name: name.value,
        phone: setphone.value,
        idcardtype: HotelStore.idcardType,
        idcard: HotelStore.idcard
      });
    };
    common_vendor.onMounted(() => {
      getVipInfo();
      setphone.value = LoginStore.userMsg.phone;
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.t(`${(_b = (_a = common_vendor.unref(HotelStore).selectedPrinceInfo) == null ? void 0 : _a.RoomType) == null ? void 0 : _b.RoomTypeName} - ${common_vendor.unref(HotelStore).selectedRoom.RoomNumber}`),
        b: common_vendor.unref(HotelStore).selectedRoom.ImageUris,
        c: common_vendor.t(common_vendor.unref(HotelStore).ArriveTime),
        d: common_vendor.t(common_vendor.unref(HotelStore).DepartureTime),
        e: common_vendor.t(common_vendor.unref(HotelStore).totalDay),
        f: common_vendor.t(common_vendor.unref(HotelStore).ArriveTime),
        g: name.value,
        h: common_vendor.o(($event) => name.value = $event.detail.value),
        i: setphone.value,
        j: common_vendor.o(($event) => setphone.value = $event.detail.value),
        k: beizhu.value,
        l: common_vendor.o(($event) => beizhu.value = $event.detail.value),
        m: common_vendor.p({
          name: "question",
          size: "35rpx"
        }),
        n: common_vendor.o(onChange1),
        o: common_vendor.p({
          disabled: true,
          value: checked1.value,
          iconSize: "36rpx"
        }),
        p: common_vendor.o(onChange2),
        q: common_vendor.p({
          disabled: true,
          value: checked2.value,
          iconSize: "36rpx"
        }),
        r: common_vendor.o(onChange3),
        s: common_vendor.p({
          disabled: true,
          value: checked3.value,
          iconSize: "36rpx"
        }),
        t: common_vendor.o(onChange4),
        v: common_vendor.p({
          disabled: true,
          value: checked4.value,
          iconSize: "36rpx"
        }),
        w: common_vendor.unref(HotelStore).ticket !== ""
      }, common_vendor.unref(HotelStore).ticket !== "" ? {} : {
        x: common_vendor.t(common_vendor.unref(HotelStore).ticket)
      }, {
        y: common_vendor.p({
          name: "arrow"
        }),
        z: common_vendor.o(($event) => showbeiticket.value = true),
        A: !common_vendor.unref(HotelStore).iffapiao
      }, !common_vendor.unref(HotelStore).iffapiao ? {} : {}, {
        B: common_vendor.p({
          name: "arrow"
        }),
        C: common_vendor.o(($event) => showbei.value = true),
        D: common_vendor.t(common_vendor.unref(HotelStore).selectedPrinceInfo.OrignPrice),
        E: common_vendor.t(common_vendor.unref(HotelStore).selectedPrinceInfo.ActualPrice),
        F: common_vendor.o(toidcard),
        G: ticket.value.length !== 0
      }, ticket.value.length !== 0 ? {
        H: common_vendor.f(ticket.value, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => selectticket(item.Id), index),
            c: "85e8f844-8-" + i0 + ",85e8f844-7",
            d: common_vendor.p({
              title: item.TemplateName
            })
          };
        })
      } : {}, {
        I: common_vendor.p({
          value: "暂无可用优惠券"
        }),
        J: common_vendor.o(($event) => showbeiticket.value = false),
        K: common_vendor.p({
          show: showbeiticket.value,
          closeable: true,
          position: "bottom",
          customStyle: "height: 20%;"
        }),
        L: common_vendor.o(($event) => selectfp(true)),
        M: common_vendor.p({
          title: "开具发票",
          value: "开具发票"
        }),
        N: common_vendor.o(($event) => selectfp(false)),
        O: common_vendor.p({
          title: "不开票",
          value: "不开票"
        }),
        P: common_vendor.o(($event) => showbei.value = false),
        Q: common_vendor.p({
          show: showbei.value,
          closeable: true,
          position: "bottom"
        }),
        R: common_vendor.sr(utoast, "85e8f844-13", {
          "k": "utoast"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-85e8f844"], ["__file", "F:/单子/8.30门票预定/booking/pages/room/booking.vue"]]);
wx.createPage(MiniProgramPage);
