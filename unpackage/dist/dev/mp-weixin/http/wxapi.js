"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "https://xcx.ryxq.com.cn";
const https = function(url, data) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + url,
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
const getRoom = function(code) {
  return https("/login", { code });
};
const getPhoneApi = function(data) {
  return https("/WXBizDataCrypt", data);
};
exports.getPhoneApi = getPhoneApi;
exports.getRoom = getRoom;
