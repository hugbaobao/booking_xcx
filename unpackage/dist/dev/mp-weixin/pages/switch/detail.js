"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const http_getinfo = require("../../http/getinfo.js");
const stores_login = require("../../stores/login.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  (_component_van_icon + _easycom_u_toast2)();
}
const _easycom_u_toast = () => "../../uni_modules/vk-uview-ui/components/u-toast/u-toast.js";
if (!Math) {
  (MySwiper + _easycom_u_toast)();
}
const MySwiper = () => "../../components/nonavto/swiper.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const info = common_vendor.ref();
    const ids = common_vendor.ref(0);
    const loginStore = stores_login.useLoginStore();
    const utoast = common_vendor.ref();
    const confirm = (e) => {
      let datas = {
        id: ids.value,
        name: loginStore.userMsg.name,
        content: e.detail.value
      };
      addPing(datas);
    };
    common_vendor.onLoad((val) => {
      ids.value = val.id;
      getinfo(ids.value);
    });
    const getinfo = async (val) => {
      const { data: res } = await http_getinfo.getbyidApi(val);
      info.value = res.data;
    };
    const addPing = async (data) => {
      await http_getinfo.addPingApi(data);
      utoast.value.show({
        title: "评论成功！",
        type: "success",
        icon: false
      });
    };
    const addZan = async () => {
      await http_getinfo.addZanApi(ids.value);
      info.value.zan++;
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      return {
        a: common_assets._imports_0,
        b: common_vendor.t((_b = (_a = info.value) == null ? void 0 : _a.User) == null ? void 0 : _b.name),
        c: common_vendor.p({
          list: (_c = info.value) == null ? void 0 : _c.img
        }),
        d: common_vendor.t((_d = info.value) == null ? void 0 : _d.title),
        e: common_vendor.t((_e = info.value) == null ? void 0 : _e.content),
        f: common_vendor.t((_f = info.value) == null ? void 0 : _f.createtime),
        g: common_vendor.p({
          name: "chat-o",
          size: "50rpx"
        }),
        h: common_vendor.o(confirm),
        i: common_vendor.f((_g = info.value) == null ? void 0 : _g.Comment, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.content),
            c: "ec71ebb1-2-" + i0,
            d: common_vendor.t(item.time),
            e: item.id
          };
        }),
        j: common_assets._imports_0,
        k: common_vendor.p({
          name: "like",
          color: "#ff713c",
          size: "30rpx"
        }),
        l: common_vendor.o(confirm),
        m: common_vendor.o(addZan),
        n: common_vendor.p({
          name: "like",
          color: "#ff713c",
          size: "30rpx"
        }),
        o: common_vendor.t((_h = info.value) == null ? void 0 : _h.zan),
        p: common_vendor.p({
          name: "comment-o",
          size: "35rpx"
        }),
        q: common_vendor.t((_i = info.value) == null ? void 0 : _i.Comment.length),
        r: common_vendor.sr(utoast, "ec71ebb1-5", {
          "k": "utoast"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ec71ebb1"], ["__file", "F:/单子/8.30门票预定/booking/pages/switch/detail.vue"]]);
wx.createPage(MiniProgramPage);
