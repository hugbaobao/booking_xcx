"use strict";
const common_vendor = require("../common/vendor.js");
class NavData {
  constructor() {
    let menuButtonObject = common_vendor.index.getMenuButtonBoundingClientRect();
    common_vendor.index.getSystemInfo({
      success: (res) => {
        let statusBarHeight = res.statusBarHeight, navTop = menuButtonObject.top, navObjWid = res.windowWidth - menuButtonObject.right + menuButtonObject.width;
        this.fullH = statusBarHeight + menuButtonObject.height + (navTop - statusBarHeight) * 2;
        this.capsuleScrolltop = navTop;
        this.capsuleScrollbottom = navTop - statusBarHeight;
        this.capsulesH = menuButtonObject.height;
        this.capsulesToRight = navObjWid;
      },
      fail(err) {
        console.log("get navgationinfo err in hooks getNav", err);
      }
    });
  }
}
const navdate = new NavData();
exports.navdate = navdate;
