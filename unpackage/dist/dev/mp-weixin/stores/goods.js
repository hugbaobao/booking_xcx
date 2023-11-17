"use strict";
const common_vendor = require("../common/vendor.js");
const useGoodsStore = common_vendor.defineStore("goods", {
  state: () => {
    return {
      goodsMsg: {}
    };
  },
  getters: {
    parseGoods() {
      return {
        ...this.goodsMsg,
        simple: JSON.parse(this.goodsMsg.simple)
      };
    }
  },
  actions: {
    // 登录状态改变
    goodsChange(val) {
      this.goodsMsg = val;
    }
  }
});
exports.useGoodsStore = useGoodsStore;
