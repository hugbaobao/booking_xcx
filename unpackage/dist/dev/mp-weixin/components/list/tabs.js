"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  (_component_van_tab + _component_van_tabs)();
}
const _sfc_main = {
  __name: "tabs",
  emits: ["attrChange"],
  setup(__props, { emit: emits }) {
    const attribute = common_vendor.ref("");
    const tabChange = async (val) => {
      attribute.value = val.detail.name === 0 ? "" : val.detail.title;
      emits("attrChange", attribute.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "全部",
          name: ""
        }),
        b: common_vendor.p({
          title: "有窗",
          name: "有窗"
        }),
        c: common_vendor.p({
          title: "朝阳",
          name: "朝阳"
        }),
        d: common_vendor.p({
          title: "无烟房",
          name: "无烟房"
        }),
        e: common_vendor.p({
          title: "大浴缸",
          name: "大浴缸"
        }),
        f: common_vendor.p({
          title: "安静",
          name: "安静"
        }),
        g: common_vendor.p({
          title: "木地板",
          name: "木地板"
        }),
        h: common_vendor.o(tabChange),
        i: common_vendor.p({
          swipeable: true,
          sticky: true,
          animated: true,
          border: true
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-21938c7b"], ["__file", "F:/单子/8.30门票预定/booking/components/list/tabs.vue"]]);
wx.createComponent(Component);
