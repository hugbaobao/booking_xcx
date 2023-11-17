"use strict";
const common_vendor = require("../../common/vendor.js");
const http_wxapi = require("../../http/wxapi.js");
const http_getinfo = require("../../http/getinfo.js");
const stores_login = require("../../stores/login.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const checked = common_vendor.ref(false);
    const loginStore = stores_login.useLoginStore();
    const gotoindex = () => {
      common_vendor.index.switchTab({
        url: "/pages/tabbar/room"
      });
    };
    const radiochange = () => {
      checked.value = !checked.value;
    };
    const register = (value) => {
      if (!checked.value) {
        common_vendor.index.showToast({
          icon: "error",
          title: "未同意协议！"
        });
        return;
      }
      if (value.detail.errMsg == "getPhoneNumber:ok") {
        let msg = {
          session_key: loginStore.keyInfo.session_key,
          encrypteddata: value.detail.encryptedData,
          iv: value.detail.iv
        };
        getPhone(msg);
      }
    };
    const getPhone = async (val) => {
      const res = await http_wxapi.getPhoneApi(val);
      if (res.data.phoneNumber) {
        findById(loginStore.keyInfo.openid, res.data.phoneNumber);
      }
      loginStore.loginStateChange(true);
      common_vendor.index.navigateBack();
    };
    const findById = async (openid, phone) => {
      const { data: res } = await http_getinfo.getUserApi(openid);
      if (res.data === null) {
        await http_getinfo.addUserApi({
          openid,
          phone
        });
        loginStore.savePhone(phone);
      } else {
        loginStore.userMsg.phone = res.data.phone;
        loginStore.userMsg.name = res.data.name;
        loginStore.userMsg.address = res.data.address;
        loginStore.userMsg.sex = res.data.sex;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(register),
        b: common_vendor.o(gotoindex),
        c: common_vendor.o(radiochange),
        d: checked.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "F:/单子/8.30门票预定/booking/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
