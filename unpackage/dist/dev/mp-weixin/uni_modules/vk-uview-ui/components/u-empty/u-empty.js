"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-empty",
  props: {
    // 图标路径
    src: {
      type: String,
      default: ""
    },
    // 提示文字
    text: {
      type: String,
      default: ""
    },
    // 文字颜色
    color: {
      type: String,
      default: "#c0c4cc"
    },
    // 图标的颜色
    iconColor: {
      type: String,
      default: "#c0c4cc"
    },
    // 图标的大小
    iconSize: {
      type: [String, Number],
      default: 120
    },
    // 文字大小，单位rpx
    fontSize: {
      type: [String, Number],
      default: 26
    },
    // 选择预置的图标类型
    mode: {
      type: String,
      default: "data"
    },
    //  图标宽度，单位rpx
    imgWidth: {
      type: [String, Number],
      default: 120
    },
    // 图标高度，单位rpx
    imgHeight: {
      type: [String, Number],
      default: "auto"
    },
    // 是否显示组件
    show: {
      type: Boolean,
      default: true
    },
    // 组件距离上一个元素之间的距离
    marginTop: {
      type: [String, Number],
      default: 0
    },
    iconStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      icons: {
        car: "购物车为空",
        page: "页面不存在",
        search: "没有搜索结果",
        address: "没有收货地址",
        wifi: "没有WiFi",
        order: "订单为空",
        coupon: "没有优惠券",
        favor: "暂无收藏",
        permission: "无权限",
        history: "无历史记录",
        news: "无新闻列表",
        message: "消息列表为空",
        list: "列表为空",
        data: "数据为空"
      }
      // icons: [{
      // 	icon: 'car',
      // 	text: '购物车为空'
      // },{
      // 	icon: 'page',
      // 	text: '页面不存在'
      // },{
      // 	icon: 'search',
      // 	text: '没有搜索结果'
      // },{
      // 	icon: 'address',
      // 	text: '没有收货地址'
      // },{
      // 	icon: 'wifi',
      // 	text: '没有WiFi'
      // },{
      // 	icon: 'order',
      // 	text: '订单为空'
      // },{
      // 	icon: 'coupon',
      // 	text: '没有优惠券'
      // },{
      // 	icon: 'favor',
      // 	text: '暂无收藏'
      // },{
      // 	icon: 'permission',
      // 	text: '无权限'
      // },{
      // 	icon: 'history',
      // 	text: '无历史记录'
      // },{
      // 	icon: 'news',
      // 	text: '无新闻列表'
      // },{
      // 	icon: 'message',
      // 	text: '消息列表为空'
      // },{
      // 	icon: 'list',
      // 	text: '列表为空'
      // },{
      // 	icon: 'data',
      // 	text: '数据为空'
      // }],
    };
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show
  }, $props.show ? {
    b: common_vendor.p({
      name: $props.src ? $props.src : "empty-" + $props.mode,
      ["custom-style"]: $props.iconStyle,
      label: $props.text ? $props.text : $data.icons[$props.mode],
      ["label-pos"]: "bottom",
      ["label-color"]: $props.color,
      ["label-size"]: $props.fontSize,
      size: $props.iconSize,
      color: $props.iconColor,
      ["margin-top"]: "14"
    }),
    c: $props.marginTop + "rpx"
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-486b9546"], ["__file", "F:/单子/8.30门票预定/booking/uni_modules/vk-uview-ui/components/u-empty/u-empty.vue"]]);
wx.createComponent(Component);
