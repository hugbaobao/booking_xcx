"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "http://127.0.0.1:8000";
const https = function(url, data, type = "GET") {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + url,
      method: type,
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
const getRoom = function() {
  return https("/room/get", {});
};
const getRoomShow = function(keys) {
  return https("/shop/shops", { keys });
};
const getHomeApi = function() {
  return https("/home/btget", {});
};
const getPngApi = function() {
  return https("/png/get", {});
};
const getByTypeApi = function(val) {
  return https("/shop/type", { type: val });
};
const getByTimeApi = function(val) {
  return https("/shop/new", {});
};
const getByTypageApi = function(val, page) {
  return https("/shop/typage", {
    type: val,
    page
  });
};
const searchByNameApi = function(val) {
  return https("/shop/search", {
    name: val
  });
};
const shopRawApi = function(ids, sum) {
  return https("/shop/search", {
    id: ids,
    count: sum
  });
};
const addUserApi = function(val) {
  return https("/user/add", val);
};
const getUserApi = function(val) {
  return https("/user/byid", {
    openid: val
  });
};
const updataUserApi = function(val) {
  return https("/user/update", val, "POST");
};
const saveIdcardApi = function(ids, val) {
  return https("/user/idcard", {
    openid: ids,
    data: val
  }, "POST");
};
const changeVipApi = function(ids) {
  return https("/user/vip", {
    openid: ids
  });
};
const arttripApi = function(val) {
  return https("/art/add", val, "POST");
};
const getArttripApi = function() {
  return https("/art/get");
};
const getbyidApi = function(id) {
  return https("/art/id", { id });
};
const addZanApi = function(id) {
  return https("/art/zan", { id });
};
const addPingApi = function(val) {
  return https("/ping/add", val, "POST");
};
const addcenterApi = function(val) {
  return https("/center/add", val, "POST");
};
const getcenterApi = function() {
  return https("/center/get");
};
const centerbyidApi = function(id) {
  return https("/center/id", { id });
};
const addCenterZanApi = function(id) {
  return https("/center/zan", { id });
};
const addPingcenApi = function(val) {
  return https("/pingc/add", val, "POST");
};
const addCarApi = function(val) {
  return https("/car/add", val, "POST");
};
const getCarApi = function(val) {
  return https("/car/get", { openid: val });
};
const delByidApi = function(val) {
  return https("/car/id", { id: val });
};
const paySuccessApi = function(val) {
  return https("/car/pay", val, "POST");
};
const changeArrApi = function(val) {
  return https("/car/topay", {
    ids: val
  }, "POST");
};
const addOrderApi = function(val) {
  return https("/order/add", val, "POST");
};
const getOrderApi = function(val) {
  return https("/order/byid", { openid: val });
};
const changeZhuApi = function(val) {
  return https("/order/ifzhu", { id: val });
};
const getIntegralApi = function(val) {
  return https("/integral/get", { openid: val });
};
const getCouponallApi = function(array) {
  return https("/coupon/all", { arr: array }, "POST");
};
const addCouponApi = function(val) {
  return https("/receivel/add", val, "POST");
};
const getReceiveApi = function(val) {
  return https("/receivel/all", { openid: val });
};
exports.addCarApi = addCarApi;
exports.addCenterZanApi = addCenterZanApi;
exports.addCouponApi = addCouponApi;
exports.addOrderApi = addOrderApi;
exports.addPingApi = addPingApi;
exports.addPingcenApi = addPingcenApi;
exports.addUserApi = addUserApi;
exports.addZanApi = addZanApi;
exports.addcenterApi = addcenterApi;
exports.arttripApi = arttripApi;
exports.centerbyidApi = centerbyidApi;
exports.changeArrApi = changeArrApi;
exports.changeVipApi = changeVipApi;
exports.changeZhuApi = changeZhuApi;
exports.delByidApi = delByidApi;
exports.getArttripApi = getArttripApi;
exports.getByTimeApi = getByTimeApi;
exports.getByTypageApi = getByTypageApi;
exports.getByTypeApi = getByTypeApi;
exports.getCarApi = getCarApi;
exports.getCouponallApi = getCouponallApi;
exports.getHomeApi = getHomeApi;
exports.getIntegralApi = getIntegralApi;
exports.getOrderApi = getOrderApi;
exports.getPngApi = getPngApi;
exports.getReceiveApi = getReceiveApi;
exports.getRoom = getRoom;
exports.getRoomShow = getRoomShow;
exports.getUserApi = getUserApi;
exports.getbyidApi = getbyidApi;
exports.getcenterApi = getcenterApi;
exports.paySuccessApi = paySuccessApi;
exports.saveIdcardApi = saveIdcardApi;
exports.searchByNameApi = searchByNameApi;
exports.shopRawApi = shopRawApi;
exports.updataUserApi = updataUserApi;
