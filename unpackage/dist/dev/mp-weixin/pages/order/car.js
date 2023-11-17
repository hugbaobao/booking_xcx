"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_login = require("../../stores/login.js");
const http_getinfo = require("../../http/getinfo.js");
const stores_goods = require("../../stores/goods.js");
if (!Array) {
  const _component_van_card = common_vendor.resolveComponent("van-card");
  const _component_van_swipe_cell = common_vendor.resolveComponent("van-swipe-cell");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _component_van_submit_bar = common_vendor.resolveComponent("van-submit-bar");
  (_component_van_card + _component_van_swipe_cell + _easycom_u_empty2 + _component_van_submit_bar)();
}
const _easycom_u_empty = () => "../../uni_modules/vk-uview-ui/components/u-empty/u-empty.js";
if (!Math) {
  _easycom_u_empty();
}
const _sfc_main = {
  __name: "car",
  setup(__props) {
    const LoginStore = stores_login.useLoginStore();
    const goodsStore = stores_goods.useGoodsStore();
    const goodslist = common_vendor.ref([]);
    goodslist.value = LoginStore.order.map((item) => {
      return {
        ...item,
        Shop: {
          ...item.Shop,
          cover: JSON.parse(item.Shop.cover),
          simple: JSON.parse(item.Shop.simple)
        }
      };
    }).filter((item) => item.state === 0);
    const totalfee = common_vendor.computed(() => {
      return goodslist.value.reduce((total, item) => {
        return total + item.count * item.Shop.price;
      }, 0);
    });
    const toGoodsDetail = (val) => {
      val.Shop.simple = JSON.stringify(val.Shop.simple);
      goodsStore.goodsChange(val.Shop);
      common_vendor.index.navigateTo({
        url: "/pages/order/goodsdetail"
      });
    };
    const delgoods = async (val) => {
      const { data: res } = await http_getinfo.delByidApi(val);
      if (res.code === 200) {
        LoginStore.refreshOrder();
        goodslist.value.filter((item, index) => {
          if (item.id === val) {
            goodslist.value.splice(index, 1);
          }
        });
      }
    };
    const onClickButton = () => {
      if (goodslist.value.length === 0) {
        return;
      }
      const ids = goodslist.value.map((item) => item.id);
      changeArr(ids);
    };
    const changeArr = async (arr) => {
      const { data: res } = await http_getinfo.changeArrApi(arr);
      if (res.code === 200) {
        LoginStore.refreshOrder();
        common_vendor.index.navigateTo({
          url: "/pages/order/order?current=1"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(goodslist.value, (item, k0, i0) => {
          var _a, _b, _c, _d, _e;
          return {
            a: common_vendor.t((_a = item == null ? void 0 : item.Shop) == null ? void 0 : _a.words),
            b: "d73d1daf-1-" + i0 + "," + ("d73d1daf-0-" + i0),
            c: common_vendor.p({
              num: item == null ? void 0 : item.count,
              tag: "热销",
              price: (_b = item == null ? void 0 : item.Shop) == null ? void 0 : _b.price,
              originPrice: (_c = item == null ? void 0 : item.Shop) == null ? void 0 : _c.original,
              title: (_d = item == null ? void 0 : item.Shop) == null ? void 0 : _d.name,
              thumb: (_e = item == null ? void 0 : item.Shop) == null ? void 0 : _e.cover[0]
            }),
            d: common_vendor.o(($event) => toGoodsDetail(item), item.id),
            e: common_vendor.o(($event) => delgoods(item.id), item.id),
            f: "d73d1daf-0-" + i0,
            g: item.id
          };
        }),
        b: common_vendor.p({
          rightWidth: 65
        }),
        c: goodslist.value.length === 0
      }, goodslist.value.length === 0 ? {
        d: common_vendor.p({
          text: "订单为空",
          mode: "car"
        })
      } : {}, {
        e: common_vendor.o((...args) => _ctx.lower && _ctx.lower(...args)),
        f: common_vendor.o((...args) => _ctx.scroll && _ctx.scroll(...args)),
        g: common_vendor.o(onClickButton),
        h: common_vendor.p({
          price: common_vendor.unref(totalfee) * 100,
          buttonText: "提交订单",
          tip: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d73d1daf"], ["__file", "F:/单子/8.30门票预定/booking/pages/order/car.vue"]]);
wx.createPage(MiniProgramPage);
