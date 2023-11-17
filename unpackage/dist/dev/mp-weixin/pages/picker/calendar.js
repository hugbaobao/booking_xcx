"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_hotel = require("../../stores/hotel.js");
require("../../http/signature.js");
const _sfc_main = {
  __name: "calendar",
  setup(__props) {
    const HotelStore = stores_hotel.useHotelStore();
    const seleSta = common_vendor.ref(0);
    const seleStaAend = common_vendor.ref(0);
    const seleyiman = common_vendor.ref(0);
    const yimanArray = common_vendor.ref([]);
    const timeArr = common_vendor.ref([]);
    const startday0 = common_vendor.ref("");
    const endday0 = common_vendor.ref("");
    const startweek0 = common_vendor.ref("");
    const endweek0 = common_vendor.ref("");
    const dayNum1 = common_vendor.ref(0);
    const startindex1 = common_vendor.ref(0);
    const startindex2 = common_vendor.ref(0);
    const endindex1 = common_vendor.ref(0);
    const endindex2 = common_vendor.ref(0);
    const startTimeString = common_vendor.ref(0);
    const endTimeString = common_vendor.ref(0);
    const weekList1 = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const weekList = [{
      title: "日",
      index: 0
    }, {
      title: "一",
      index: 1
    }, {
      title: "二",
      index: 2
    }, {
      title: "三",
      index: 3
    }, {
      title: "四",
      index: 4
    }, {
      title: "五",
      index: 5
    }, {
      title: "六",
      index: 6
    }];
    const dateList = common_vendor.ref([]);
    const limit = 3;
    const today = common_vendor.ref("");
    common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(0);
    const todayTimeString = common_vendor.ref(0);
    const currtag = common_vendor.ref(0);
    const scrollTop = common_vendor.ref(0);
    const startDate = common_vendor.ref("");
    const endDate = common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.onMounted(() => {
      common_vendor.index.getStorage({
        key: "满房日期显示",
        success: function(res) {
          if (res.data == 1) {
            common_vendor.index.getStorage({
              key: "满房日期",
              success: function(res2) {
                yimanArray.value = res2.data;
              }
            });
          }
        }
      });
      init();
    });
    const init = () => {
      ajaxDate();
      dealStarAndEndDay();
      dealDateList();
    };
    const confirmChoose = () => {
      const reg = /\S/;
      if (reg.test(startTimeString.value) && reg.test(endTimeString.value)) {
        const startDate2 = dealDate(startTimeString.value);
        const endDate2 = dealDate(endTimeString.value);
        dealDate1(startTimeString.value);
        dealDate1(endTimeString.value);
        const dayNum = (endTimeString.value - startTimeString.value) / 1e3 / 3600 / 24;
        const man = dealman(startDate2);
        const man01 = dealman(endDate2);
        if (man == 1 && man01 == 1) {
          common_vendor.index.showToast({
            title: "你选择了的房间已满 请重新选择",
            icon: "none"
          });
          return;
        }
        if (dayNum < 1) {
          common_vendor.index.showToast({
            title: "请选择离店日期",
            icon: "none"
          });
          return;
        }
        HotelStore.ArriveTime = startDate2;
        HotelStore.DepartureTime = endDate2;
        HotelStore.totalDay = dayNum + 1;
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.showModal({
          title: "提示",
          content: `尚未选择时间`
        });
      }
    };
    const chooseDate = (year, month, day, dayarray, index1, index2) => {
      let time = `${year}/${month}/${day.num}`;
      let timeString = new Date(time).getTime();
      seleyiman.value = 1;
      seleSta.value = 1;
      let man = day.status;
      man = dealman1(timeString, man);
      if (startTimeString.value == "") {
        man = day.status;
      }
      if (man == 1) {
        common_vendor.index.showToast({
          title: "不能选择已住满的房间",
          icon: "none"
        });
        seleyiman.value = 0;
        return;
      }
      seleyiman.value = 0;
      if (timeString >= todayTimeString.value) {
        if (timeArr.value.length === 1) {
          let dic = {
            time: timeString,
            index1,
            index2
          };
          timeArr.value.push(dic);
          startTimeString.value = timeArr.value[0].time;
          let time0 = timeArr.value[0];
          let time1 = timeArr.value[1];
          if (time0.time < time1.time) {
            startTimeString.value = time0.time;
            endTimeString.value = time1.time;
            startindex1.value = time0.index1;
            startindex2.value = time0.index2;
            endindex1.value = time1.index1;
            endindex2.value = time1.index2;
          } else if (time0.time > time1.time) {
            startTimeString.value = time1.time;
            endTimeString.value = time0.time;
            endindex1.value = time0.index1;
            endindex2.value = time0.index2;
            startindex1.value = time0.index1;
            startindex2.value = time0.index2;
          } else if (time0.time == time1.time) {
            startTimeString.value = time0.time;
            endTimeString.value = time1.time;
            startindex1.value = index1;
            startindex2.value = index2;
            endindex1.value = index1;
            endindex2.value = index2;
          }
          confirmChoose();
        } else {
          let dic = {
            time: timeString,
            index1,
            index2
          };
          timeArr.value.push(dic);
          startTimeString.value = timeArr.value[0].time;
          endTimeString.value = timeArr.value[0].time;
          startindex1.value = index1;
          startindex2.value = index2;
          endindex1.value = index1;
          endindex2.value = index2;
        }
        if (startindex1.value == endindex1.value) {
          let kaishiarray1 = dayarray.slice(startindex2.value, endindex2.value + 1);
          dealshow1(year, month, timeString, kaishiarray1, index1, index2);
        } else {
          for (let i = startindex1.value; i <= endindex1.value; i++) {
            let kaidic = dateList.value[i];
            dealshow1(kaidic.year, kaidic.month, timeString, kaidic.dayArray, index1, index2);
          }
        }
      } else {
        common_vendor.index.showToast({
          title: "选择日期不能小于当天！",
          icon: "none"
        });
      }
    };
    const dealStarAndEndDay = () => {
      if (startDate.value) {
        startTimeString.value = new Date(startDate.value).getTime();
      } else {
        startTimeString.value = new Date(todayTimeString.value).getTime();
      }
      if (endDate.value) {
        endTimeString.value = new Date(endDate.value).getTime();
      } else {
        endTimeString.value = new Date(todayTimeString.value).getTime();
      }
      dealshow();
    };
    const dealDateList = () => {
      let start;
      let start1 = startDate.value.replace("/", "-");
      const year1 = new Date(start1).getFullYear();
      const month1 = new Date(start1).getMonth() + 1;
      const year2 = `${year1}/${month1}`;
      start = today.value;
      let year = new Date(start).getFullYear();
      let month = new Date(start).getMonth();
      for (let i = 0; i < limit; i++) {
        month++;
        if (month > 12) {
          month = month - 12;
          year = year + 1;
        }
        const year22 = `${year}/${month}`;
        if (year22 == year2) {
          currtag.value = i;
        }
        dateList.value.push({
          year,
          month,
          dayArray: dealDateArray(year, month)
        });
      }
    };
    const dealDateArray = (year, month) => {
      const big = [1, 3, 5, 7, 8, 10, 12];
      let type;
      let dayNum;
      const dayArray = new Array();
      if (year % 100 != 0 && year % 4 == 0 && year % 4 != 0 || year % 100 == 0 && year % 400 == 0) {
        type = 0;
      } else {
        type = 1;
      }
      if (big.includes(parseInt(month))) {
        dayNum = 31;
      } else {
        if (month == 2) {
          if (type == 0) {
            dayNum = 29;
          } else {
            dayNum = 28;
          }
        } else {
          dayNum = 30;
        }
      }
      for (let i = 1; i <= dayNum; i++) {
        const time1 = `${year}/${month}/${i}`;
        const status = dealman(time1);
        const dic = {
          num: Number(i.toString().length === 1 ? "0" + i : i),
          status
        };
        dayArray.push(dic);
      }
      return dayArray;
    };
    const dealTimeString = (time) => {
      if (isNaN(Date.parse(time))) {
        time = time.replace(/-/g, "/");
      }
      return new Date(time).getTime();
    };
    const ajaxDate = () => {
      const date = /* @__PURE__ */ new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      date.getDay();
      let day = date.getDate();
      day = day < 10 ? `0${day}` : day;
      today.value = `${year}/${month}/${day}`;
      todayTimeString.value = (/* @__PURE__ */ new Date(`${year}/${month}/${day}`)).getTime();
    };
    const dealClassStyle = (year, month, day) => {
      if (day.num) {
        let time = `${year}/${month}/${day.num}`;
        let timeString = new Date(time).getTime();
        let man = day.status;
        if (seleSta.value === 1) {
          man = dealman1(timeString, man);
        }
        if (man === 1) {
          if (seleStaAend.value === 1) {
            return "overdue";
          } else {
            if (timeString === startTimeString.value) {
              return "startDate";
            } else if (timeString === endTimeString.value) {
              return "endDate";
            } else {
              return "overdue";
            }
          }
        } else if (timeString === startTimeString.value) {
          return "startDate";
        } else if (timeString === endTimeString.value) {
          return "endDate";
        } else if (timeString > startTimeString.value && timeString < endTimeString.value) {
          return "scope";
        } else if (timeString === todayTimeString.value) {
          return "toDay";
        } else if (timeString < todayTimeString.value) {
          return "overdue";
        }
      }
    };
    const dealDate = (time = "") => {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}/${month}/${day}`;
    };
    const dealDate1 = (time = "") => {
      const date = new Date(time);
      date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}月${day}日`;
    };
    const dealman = (e) => {
      const show1 = common_vendor.index.getStorageSync("满房日期显示");
      if (show1 == 1) {
        const array = yimanArray.value;
        for (let i = 0; i < array.length; i++) {
          const name1 = array[i];
          if (name1 == e) {
            let man = 1;
            if (seleSta.value == 1) {
              man = dealman1(e, man);
            }
            return man;
          }
        }
      }
    };
    const dealman1 = (timeString, man) => {
      let man01 = man;
      const timeString1 = new Date(timeString).getTime();
      let end = endTimeString.value;
      if (seleyiman.value == 1) {
        end = timeString1;
      }
      if (timeString1 == end) {
        if (end > startTimeString.value) {
          man01 = 0;
        }
      }
      return man01;
    };
    const dealshow = () => {
      startday0.value = dealDate1(startTimeString.value);
      endday0.value = dealDate1(endTimeString.value);
      dayNum1.value = (endTimeString.value - startTimeString.value) / 1e3 / 3600 / 24;
      const date1 = new Date(dealDate(startTimeString.value));
      const date2 = new Date(dealDate(endTimeString.value));
      const index1 = date1.getDay();
      const index2 = date2.getDay();
      startweek0.value = weekList1[index1];
      endweek0.value = weekList1[index2];
    };
    const dealshow1 = (year, month, timeString, dayarray, index1, index2) => {
      let man02 = 0;
      for (let i = 0; i < dayarray.length; i++) {
        const day01 = dayarray[i];
        const time1 = `${year}/${month}/${day01.num}`;
        const timeString1 = new Date(time1).getTime();
        let man01 = day01.status;
        if (timeString1 > startTimeString.value && timeString1 < endTimeString.value) {
          if (man01 == 1) {
            man02 = 1;
          }
        }
        if (timeString1 == startTimeString.value) {
          if (man01 == 1) {
            man02 = 1;
          }
        }
      }
      if (man02 == 1) {
        timeArr.value = [];
        const dic = {
          time: timeString,
          index1,
          index2
        };
        timeArr.value.push(dic);
        timeArr.value.push(dic);
        startTimeString.value = timeString;
        endTimeString.value = timeString;
        startindex1.value = index1;
        startindex2.value = index2;
        endindex1.value = index1;
        endindex2.value = index2;
      }
    };
    common_vendor.watch([startTimeString, endTimeString], () => {
      dealshow();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(weekList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: index == 0 ? 1 : "",
            c: index
          };
        }),
        b: common_vendor.f(dateList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.year),
            b: common_vendor.t(item.month),
            c: "yearAndMonth" + index,
            d: common_vendor.f(item.dayArray, (day, No, i1) => {
              return common_vendor.e({
                a: dealTimeString(`${item.year}/${item.month}/${day.num}`) == dealTimeString(today.value)
              }, dealTimeString(`${item.year}/${item.month}/${day.num}`) == dealTimeString(today.value) ? {} : {}, {
                b: dealTimeString(`${item.year}/${item.month}/${day.num}`) == startTimeString.value
              }, dealTimeString(`${item.year}/${item.month}/${day.num}`) == startTimeString.value ? {} : {}, {
                c: dealTimeString(`${item.year}/${item.month}/${day.num}`) == endTimeString.value
              }, dealTimeString(`${item.year}/${item.month}/${day.num}`) == endTimeString.value ? {
                d: endTimeString.value == startTimeString.value ? 1 : ""
              } : {}, {
                e: dealTimeString(`${item.year}/${item.month}/${day.num}`) == startTimeString.value && day.status == 1
              }, dealTimeString(`${item.year}/${item.month}/${day.num}`) == startTimeString.value && day.status == 1 ? {} : dealTimeString(`${item.year}/${item.month}/${day.num}`) == endTimeString.value && day.status == 1 ? {} : common_vendor.e({
                g: day.status == 1
              }, day.status == 1 ? {} : {}), {
                f: dealTimeString(`${item.year}/${item.month}/${day.num}`) == endTimeString.value && day.status == 1
              }, seleStaAend.value == 1 && seleSta.value == 0 ? common_vendor.e({
                h: day.status == 1
              }, day.status == 1 ? {} : {}) : {}, {
                i: common_vendor.t(day.num),
                j: common_vendor.o(($event) => chooseDate(item.year, item.month, day, item.dayArray, index, No), No),
                k: common_vendor.n(dealClassStyle(item.year, item.month, day)),
                l: No
              });
            }),
            e: index
          };
        }),
        c: seleStaAend.value == 1 && seleSta.value == 0,
        d: scrollTop.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1a4213b2"], ["__file", "F:/单子/8.30门票预定/booking/pages/picker/calendar.vue"]]);
wx.createPage(MiniProgramPage);
