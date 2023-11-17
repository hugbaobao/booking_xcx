"use strict";
const common_vendor = require("../../common/vendor.js");
const http_getinfo = require("../../http/getinfo.js");
const stores_login = require("../../stores/login.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _component_van_divider = common_vendor.resolveComponent("van-divider");
  (_easycom_u_tabs2 + _easycom_u_empty2 + _component_van_divider)();
}
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_u_empty = () => "../../uni_modules/vk-uview-ui/components/u-empty/u-empty.js";
if (!Math) {
  (_easycom_u_tabs + MyOwn + _easycom_u_empty + MyReceive)();
}
const MyOwn = () => "../../components/personal/ticket/own.js";
const MyReceive = () => "../../components/personal/ticket/receive.js";
const _sfc_main = {
  __name: "mycoupon",
  setup(__props) {
    const LoginStore = stores_login.useLoginStore();
    const tuijian = common_vendor.ref([]);
    const list = common_vendor.ref([]);
    const showlist = common_vendor.ref([]);
    const current = common_vendor.ref(0);
    list.value = [{
      name: "未使用"
    }, {
      name: "已使用"
    }, {
      name: "已失效"
    }, {
      name: "优惠码"
    }];
    const change = (e) => {
      switch (e) {
        case 1:
          showlist.value = LoginStore.Receive.filter((item) => item.used === 1);
          break;
        case 2:
          showlist.value = LoginStore.Receive.filter((item) => new Date(item.Coupon.expiration) < (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
          break;
        case 3:
          showlist.value = [];
          break;
        default:
          showlist.value = LoginStore.Receive.filter((item) => item.used === 0 && new Date(item.Coupon.expiration) >= (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
          break;
      }
    };
    const toCoupon = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personal/coupon"
      });
    };
    const getCoupon = async () => {
      const already = LoginStore.Receive.map((item) => {
        return item.code;
      });
      const { data: res } = await http_getinfo.getCouponallApi(already);
      tuijian.value = res.data[0];
    };
    const getReceive = async () => {
      showlist.value = LoginStore.Receive.filter((item) => item.used === 0 && new Date(item.Coupon.expiration) >= (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
    };
    common_vendor.onMounted(() => {
      getCoupon();
      getReceive();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(change),
        b: common_vendor.o(($event) => current.value = $event),
        c: common_vendor.p({
          list: list.value,
          ["is-scroll"]: false,
          modelValue: current.value
        }),
        d: showlist.value.length !== 0
      }, showlist.value.length !== 0 ? {
        e: common_vendor.f(showlist.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: "69ddae0a-1-" + i0,
            c: common_vendor.p({
              content: item
            })
          };
        })
      } : {
        f: common_vendor.p({
          text: "暂无优惠券",
          mode: "coupon"
        })
      }, {
        g: common_vendor.p({
          contentPosition: "center"
        }),
        h: common_vendor.f(tuijian.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: "69ddae0a-4-" + i0,
            c: common_vendor.p({
              content: item
            })
          };
        }),
        i: common_vendor.o(toCoupon)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-69ddae0a"], ["__file", "F:/单子/8.30门票预定/booking/pages/personal/mycoupon.vue"]]);
wx.createPage(MiniProgramPage);
