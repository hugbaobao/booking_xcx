"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_login = require("../../stores/login.js");
const http_getinfo = require("../../http/getinfo.js");
if (!Math) {
  MyIntercept();
}
const MyIntercept = () => "../../components/intercept/intercept.js";
const _sfc_main = {
  __name: "setmymsg",
  setup(__props) {
    const Login = stores_login.useLoginStore();
    const info = common_vendor.ref({
      avator: "",
      phone: "",
      name: "",
      address: "",
      sex: "男"
    });
    common_vendor.watchEffect(() => {
      info.value = Login.userMsg;
    });
    const sexchange = (e) => {
      info.value.sex = e.detail.value;
    };
    const saveInfo = async () => {
      if (info.value.name.length > 5) {
        common_vendor.index.showToast({
          title: "姓名输入有误",
          icon: "error"
        });
      }
      common_vendor.index.showLoading({
        title: "正在提交"
      });
      await saveUserInfo(info.value);
      Login.saveInfo(info.value);
      common_vendor.index.hideLoading();
      common_vendor.index.showToast({
        icon: "success",
        title: "保存成功"
      });
      common_vendor.index.navigateBack();
    };
    const saveUserInfo = async (val) => {
      await http_getinfo.updataUserApi({
        openid: Login.keyInfo.openid,
        data: val
      });
    };
    return (_ctx, _cache) => {
      return {
        a: info.value.name,
        b: common_vendor.o(($event) => info.value.name = $event.detail.value),
        c: info.value.sex == "男" ? true : false,
        d: info.value.sex == "女" ? true : false,
        e: common_vendor.o(sexchange),
        f: info.value.phone,
        g: common_vendor.o(($event) => info.value.phone = $event.detail.value),
        h: info.value.address,
        i: common_vendor.o(($event) => info.value.address = $event.detail.value),
        j: common_vendor.o(saveInfo)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b403f188"], ["__file", "F:/单子/8.30门票预定/booking/pages/login/setmymsg.vue"]]);
wx.createPage(MiniProgramPage);
