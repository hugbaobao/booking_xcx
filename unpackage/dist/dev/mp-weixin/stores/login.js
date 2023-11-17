"use strict";
const common_vendor = require("../common/vendor.js");
const http_getinfo = require("../http/getinfo.js");
const useLoginStore = common_vendor.defineStore("login", {
  state: () => {
    return {
      isLogin: false,
      session_key: "",
      keyInfo: {
        session_key: "",
        openid: ""
      },
      userMsg: {
        avator: "",
        phone: "",
        name: "",
        address: "",
        sex: "",
        idcard: "",
        idcardtype: "",
        vip: false,
        integral: 0
      },
      order: [],
      // 订单
      Receive: []
      // 优惠券
    };
  },
  getters: {
    initorder() {
      return this.order.map((item) => {
        return {
          ...item,
          Shop: {
            ...item.Shop,
            cover: JSON.parse(item.Shop.cover),
            simple: JSON.parse(item.Shop.simple)
          }
        };
      });
    },
    pingCount() {
      return this.order.filter((item) => item.state === 4).length;
    },
    carcount() {
      return this.order.reduce((total, item) => {
        if (item.state === 0) {
          return total + item.count;
        } else {
          return total;
        }
      }, 0);
    },
    // 删选未过期的优惠券
    usefulReceive() {
      return this.Receive.filter((item) => {
        return new Date(item.Coupon.expiration) >= (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
      });
    }
  },
  actions: {
    // 登录状态改变
    loginStateChange(val) {
      this.isLogin = val;
    },
    async saveInfo(context, val) {
      this.userMsg = val;
    },
    saveKeyInfo(info) {
      this.keyInfo = info;
    },
    savePhone(val) {
      this.userMsg.phone = val;
      this.isLogin = true;
    },
    // 通用获取登录code方法
    commonLogin() {
      common_vendor.index.login({
        provider: "weixin",
        success: async function(res) {
          console.log(res);
        }
      });
    },
    // 获取订单列表
    getOrder(val) {
      this.order = val;
    },
    // 刷新订单
    async refreshOrder() {
      const { data: res } = await http_getinfo.getCarApi(this.keyInfo.openid);
      if (res.code === 200) {
        this.order = res.data;
      }
    }
  }
});
exports.useLoginStore = useLoginStore;
