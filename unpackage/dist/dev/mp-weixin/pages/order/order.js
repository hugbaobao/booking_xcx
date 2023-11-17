"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_login = require("../../stores/login.js");
const stores_goods = require("../../stores/goods.js");
const http_getinfo = require("../../http/getinfo.js");
const http_pay = require("../../http/pay.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _component_van_card = common_vendor.resolveComponent("van-card");
  const _component_van_swipe_cell = common_vendor.resolveComponent("van-swipe-cell");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _component_van_action_sheet = common_vendor.resolveComponent("van-action-sheet");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  const _component_van_submit_bar = common_vendor.resolveComponent("van-submit-bar");
  (_easycom_u_tabs2 + _component_van_card + _component_van_swipe_cell + _easycom_u_empty2 + _component_van_action_sheet + _easycom_u_toast2 + _component_van_submit_bar)();
}
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_u_empty = () => "../../uni_modules/vk-uview-ui/components/u-empty/u-empty.js";
const _easycom_u_toast = () => "../../uni_modules/vk-uview-ui/components/u-toast/u-toast.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_empty + _easycom_u_toast)();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const utoast = common_vendor.ref();
    const LoginStore = stores_login.useLoginStore();
    const goodsStore = stores_goods.useGoodsStore();
    const current = common_vendor.ref(0);
    const show = common_vendor.ref(false);
    const selectCoupon = common_vendor.ref(null);
    const comput = common_vendor.computed(() => {
      if (filterList.value.length !== 0 && current.value === 1) {
        const result = filterList.value.reduce((total, item) => {
          return total + item.paycount * parseFloat(item.Shop.price);
        }, 0);
        return result * 100;
      } else {
        return 0;
      }
    });
    const onSubmit = async () => {
      console.log(filterList.value);
      return;
    };
    const actions = common_vendor.computed(() => {
      return LoginStore.usefulReceive.map((item) => {
        return {
          id: item.id,
          name: item.Coupon.name,
          subname: item.Coupon.amount,
          cill: item.Coupon.cill
        };
      });
    });
    const couponselect = (e) => {
      selectCoupon.value = e.detail;
      show.value = false;
    };
    const list = [
      {
        name: "全部"
      },
      {
        name: "待付款"
      },
      {
        name: "待发货"
      },
      {
        name: "待收货"
      },
      {
        name: "待评价",
        count: LoginStore.pingCount
      }
    ];
    const goodsLsit = common_vendor.ref([]);
    const filterList = common_vendor.ref([]);
    const toGoodsDetail = (val) => {
      val.Shop.simple = JSON.stringify(val.Shop.simple);
      goodsStore.goodsChange(val.Shop);
      common_vendor.index.navigateTo({
        url: "/pages/order/goodsdetail"
      });
    };
    common_vendor.watchEffect(() => {
      goodsLsit.value = LoginStore.order.map((item) => {
        return {
          ...item,
          Shop: {
            ...item.Shop,
            cover: JSON.parse(item.Shop.cover),
            simple: JSON.parse(item.Shop.simple)
          }
        };
      }).filter((item) => item.state !== 0);
    });
    common_vendor.watchEffect(() => {
      if (current.value === 0) {
        filterList.value = goodsLsit.value;
      } else {
        filterList.value = goodsLsit.value.filter((item) => item.state === current.value);
      }
    });
    const scrollTop = common_vendor.ref(0);
    const oldscrollTop = common_vendor.ref(0);
    const scroll = (e) => {
      oldscrollTop.value = e.detail.scrollTop;
    };
    const tabsChange = async (index) => {
      current.value = index;
      scrollTop.value = oldscrollTop.value;
      await common_vendor.nextTick$1();
      scrollTop.value = 0;
    };
    const lower = (e) => {
      console.log(e);
    };
    common_vendor.onLoad((val) => {
      if (val.current) {
        current.value = parseInt(val.current);
      }
    });
    const pay = async (iftotal, val) => {
      if (LoginStore.userMsg.address === "") {
        utoast.value.show({
          title: "请先填写收件地址！",
          type: "warning",
          icon: false
        });
        await setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/login/setmymsg"
          });
        }, 2e3);
        return;
      }
      let total = val.paycount * val.Shop.price;
      let flag = false;
      if (selectCoupon.value !== null) {
        flag = total >= parseFloat(selectCoupon.value.cill);
        if (flag) {
          total = ((total * 100 - parseFloat(selectCoupon.value.subname) * 100) / 100).toFixed(2);
        }
      }
      total = parseFloat(total) <= 0 ? 0 : parseFloat(total);
      let timestamp = Date.parse(/* @__PURE__ */ new Date()) / 1e3;
      let out_trade_no = timestamp + "" + Math.ceil(Math.random() * 1e4);
      common_vendor.index.showLoading({
        title: "提交中"
      });
      const { data: res } = await http_pay.getPay(LoginStore.keyInfo.openid, out_trade_no, total);
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
          paySuccess(val.id, out_trade_no);
          shopRaw(val.Shop.id, val.paycount);
          if (flag) {
            useCoupon(selectCoupon.value.id);
          }
          LoginStore.refreshOrder();
          common_vendor.index.showToast({
            title: "支付成功！",
            icon: "success"
          });
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
    const paySuccess = async (ids, val) => {
      await http_getinfo.paySuccessApi({
        id: ids,
        state: 2,
        out_trade_no: val
      });
    };
    const shopRaw = async (ids, val) => {
      await http_getinfo.shopRawApi(ids, val);
    };
    const delgoods = async (val) => {
      const { data: res } = await http_getinfo.delByidApi(val);
      if (res.code === 200) {
        LoginStore.refreshOrder();
        goodsLsit.value.filter((item, index) => {
          if (item.id === val) {
            goodsLsit.value.splice(index, 1);
          }
        });
      }
    };
    const useCoupon = async (val) => {
      await useCouponApi(val);
      LoginStore.Receive = LoginStore.Receive.filter((item) => item.id !== val);
    };
    const addCar = async (val) => {
      const { data: res } = await http_getinfo.addCarApi({
        openid: LoginStore.keyInfo.openid,
        goodsid: val,
        state: 0
      });
      if (res.code === 200) {
        utoast.value.show({
          title: "已加入购物车！",
          type: "success",
          icon: false
        });
        LoginStore.refreshOrder();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(tabsChange),
        b: common_vendor.o(($event) => current.value = $event),
        c: common_vendor.p({
          ["active-color"]: "#f29100",
          list,
          ["is-scroll"]: false,
          modelValue: current.value
        }),
        d: common_vendor.f(filterList.value, (item, k0, i0) => {
          var _a, _b;
          return common_vendor.e({
            a: common_vendor.t((_a = item == null ? void 0 : item.Shop) == null ? void 0 : _a.words),
            b: "93207a4f-2-" + i0 + "," + ("93207a4f-1-" + i0),
            c: common_vendor.p({
              num: item.paycount,
              tag: "热销",
              price: item.Shop.price,
              originPrice: item.Shop.original,
              title: item.Shop.name,
              thumb: (_b = item == null ? void 0 : item.Shop) == null ? void 0 : _b.cover[0]
            }),
            d: item.state === 1
          }, item.state === 1 ? {
            e: common_vendor.o(($event) => pay(), item.id)
          } : {}, {
            f: item.state === 3
          }, item.state === 3 ? {} : {}, {
            g: item.state === 4
          }, item.state === 4 ? {} : {}, {
            h: common_vendor.o(($event) => addCar(item.Shop.id), item.id),
            i: common_vendor.o(($event) => toGoodsDetail(item), item.id),
            j: common_vendor.o(($event) => delgoods(item.id), item.id),
            k: "93207a4f-1-" + i0,
            l: item.id
          });
        }),
        e: common_vendor.p({
          rightWidth: 65
        }),
        f: filterList.value.length === 0
      }, filterList.value.length === 0 ? {
        g: common_vendor.p({
          text: "订单为空",
          mode: "car"
        })
      } : {}, {
        h: scrollTop.value,
        i: common_vendor.o(lower),
        j: common_vendor.o(scroll),
        k: common_vendor.o(($event) => show.value = true),
        l: common_vendor.o(couponselect),
        m: common_vendor.o(($event) => show.value = false),
        n: common_vendor.o(($event) => show.value = false),
        o: common_vendor.p({
          show: show.value,
          actions: common_vendor.unref(actions),
          description: "选择优惠券",
          cancelText: "取消"
        }),
        p: common_vendor.sr(utoast, "93207a4f-5", {
          "k": "utoast"
        }),
        q: current.value === 1
      }, current.value === 1 ? common_vendor.e({
        r: common_vendor.unref(LoginStore).userMsg.address === ""
      }, common_vendor.unref(LoginStore).userMsg.address === "" ? {} : {}, {
        s: common_vendor.o(onSubmit),
        t: common_vendor.p({
          disabled: common_vendor.unref(comput) === 0,
          price: common_vendor.unref(comput),
          buttonText: "提交订单"
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-93207a4f"], ["__file", "F:/单子/8.30门票预定/booking/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
