"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "https://pay.ryxq.com.cn";
const https = function(url, data) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + url,
      data,
      // method: 'POST',
      timeout: 8e3,
      dataType: "json",
      success: (res) => {
        resolve(res);
      },
      fail(err) {
        console.log(err);
      }
    });
  });
};
const getPay = function(open, trade, total) {
  return https("/", {
    openid: open,
    out_trade_no: trade,
    total_fee: total
  });
};
exports.getPay = getPay;
