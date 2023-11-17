"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-line-progress",
  props: {
    // 两端是否显示半圆形
    round: {
      type: Boolean,
      default: true
    },
    // 主题颜色
    type: {
      type: String,
      default: ""
    },
    // 激活部分的颜色
    activeColor: {
      type: String,
      default: "#19be6b"
    },
    inactiveColor: {
      type: String,
      default: "#ececec"
    },
    // 进度百分比，数值
    percent: {
      type: Number,
      default: 0
    },
    // 是否在进度条内部显示百分比的值
    showPercent: {
      type: Boolean,
      default: true
    },
    // 进度条的高度，单位rpx
    height: {
      type: [Number, String],
      default: 28
    },
    // 是否显示条纹
    striped: {
      type: Boolean,
      default: false
    },
    // 条纹是否显示活动状态
    stripedActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    progressStyle() {
      let style = {};
      style.width = this.percent + "%";
      if (this.activeColor)
        style.backgroundColor = this.activeColor;
      return style;
    }
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.$slots.default || _ctx.$slots.$default
  }, _ctx.$slots.default || _ctx.$slots.$default ? {} : $props.showPercent ? {
    c: common_vendor.t($props.percent + "%")
  } : {}, {
    b: $props.showPercent,
    d: common_vendor.n($props.type ? `u-type-${$props.type}-bg` : ""),
    e: common_vendor.n($props.striped ? "u-striped" : ""),
    f: common_vendor.n($props.striped && $props.stripedActive ? "u-striped-active" : ""),
    g: common_vendor.s($options.progressStyle),
    h: $props.round ? "100rpx" : 0,
    i: $props.height + "rpx",
    j: $props.inactiveColor
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-af2fba7d"], ["__file", "F:/单子/8.30门票预定/booking/uni_modules/vk-uview-ui/components/u-line-progress/u-line-progress.vue"]]);
wx.createComponent(Component);
