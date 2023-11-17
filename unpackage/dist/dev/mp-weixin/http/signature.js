"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "https://sig.ryxq.com.cn";
const https = function(url, data) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + url,
      method: "POST",
      data,
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
const getSignature = function(meth, data) {
  return https("/sig", {
    method: meth,
    data
  });
};
exports.getSignature = getSignature;
