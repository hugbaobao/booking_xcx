"use strict";
const common_vendor = require("../../common/vendor.js");
const wxcomponents_vant_dialog_dialog = require("../../wxcomponents/vant/dialog/dialog.js");
const stores_login = require("../../stores/login.js");
const http_getinfo = require("../../http/getinfo.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_dialog = common_vendor.resolveComponent("van-dialog");
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  (_component_van_icon + _component_van_dialog + _component_van_tab + _component_van_tabs)();
}
if (!Math) {
  MyJifen();
}
const MyJifen = () => "../../components/personal/jifen.js";
const _sfc_main = {
  __name: "jifen",
  setup(__props) {
    const LoginStore = stores_login.useLoginStore();
    const showDialog = () => {
      wxcomponents_vant_dialog_dialog.Dialog.alert({
        message: "积分使用解释权归本小程序所有",
        theme: "round-button"
      }).then(() => {
      });
    };
    common_vendor.ref(0);
    const isget = common_vendor.ref(true);
    const onChange = (e) => {
      if (e.detail.index === 0) {
        isget.value = true;
      } else {
        isget.value = false;
      }
    };
    const dataAll = common_vendor.ref([]);
    const getlist = common_vendor.computed(() => {
      const initdata = dataAll.value.filter((item) => item.type === 0);
      return initdata;
    });
    const uselist = common_vendor.computed(() => {
      const initdata = dataAll.value.filter((item) => item.type !== 0);
      return initdata;
    });
    const getIntegral = async () => {
      const { data: res } = await http_getinfo.getIntegralApi(LoginStore.keyInfo.openid);
      dataAll.value = res.data;
    };
    common_vendor.onMounted(() => {
      getIntegral();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(LoginStore).userMsg.integral),
        b: common_vendor.o(showDialog),
        c: common_vendor.p({
          name: "info-o"
        }),
        d: common_vendor.p({
          id: "van-dialog"
        }),
        e: common_vendor.p({
          title: "获取记录"
        }),
        f: common_vendor.p({
          title: "使用明细"
        }),
        g: common_vendor.o(onChange),
        h: common_vendor.p({
          lineWidth: "20px",
          color: "#f8ab54"
        }),
        i: common_vendor.p({
          getlist: isget.value ? common_vendor.unref(getlist) : common_vendor.unref(uselist)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-886e963d"], ["__file", "F:/单子/8.30门票预定/booking/pages/personal/jifen.vue"]]);
wx.createPage(MiniProgramPage);
