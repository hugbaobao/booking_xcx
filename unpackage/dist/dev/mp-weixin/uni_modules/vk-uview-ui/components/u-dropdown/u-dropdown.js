"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-dropdown",
  emits: ["open", "close"],
  props: {
    // 菜单标题和选项的激活态颜色
    activeColor: {
      type: String,
      default: "#2979ff"
    },
    // 菜单标题和选项的未激活态颜色
    inactiveColor: {
      type: String,
      default: "#606266"
    },
    // 点击遮罩是否关闭菜单
    closeOnClickMask: {
      type: Boolean,
      default: true
    },
    // 点击当前激活项标题是否关闭菜单
    closeOnClickSelf: {
      type: Boolean,
      default: true
    },
    // 过渡时间
    duration: {
      type: [Number, String],
      default: 300
    },
    // 标题菜单的高度，单位任意，数值默认为rpx单位
    height: {
      type: [Number, String],
      default: 80
    },
    // 是否显示下边框
    borderBottom: {
      type: Boolean,
      default: false
    },
    // 标题的字体大小
    titleSize: {
      type: [Number, String],
      default: 28
    },
    // 下拉出来的内容部分的圆角值
    borderRadius: {
      type: [Number, String],
      default: 0
    },
    // 菜单右侧的icon图标
    menuIcon: {
      type: String,
      default: "arrow-down"
    },
    // 菜单右侧图标的大小
    menuIconSize: {
      type: [Number, String],
      default: 26
    }
  },
  data() {
    return {
      showDropdown: true,
      // 是否打开下来菜单,
      menuList: [],
      // 显示的菜单
      active: false,
      // 下拉菜单的状态
      // 当前是第几个菜单处于激活状态，小程序中此处不能写成false或者""，否则后续将current赋值为0，
      // 无能的TX没有使用===而是使用==判断，导致程序认为前后二者没有变化，从而不会触发视图更新
      current: 99999,
      // 外层内容的样式，初始时处于底层，且透明
      contentStyle: {
        zIndex: -1,
        opacity: 0
      },
      // 让某个菜单保持高亮的状态
      highlightIndex: 99999,
      contentHeight: 0
    };
  },
  computed: {
    // 下拉出来部分的样式
    popupStyle() {
      let style = {};
      style.transform = `translateY(${this.active ? 0 : "-100%"})`;
      style["transition-duration"] = this.duration / 1e3 + "s";
      style.borderRadius = `0 0 ${this.$u.addUnit(this.borderRadius)} ${this.$u.addUnit(this.borderRadius)}`;
      return style;
    }
  },
  created() {
    this.children = [];
  },
  mounted() {
    this.getContentHeight();
  },
  methods: {
    init() {
      this.menuList = [];
      this.children.map((child) => {
        child.init();
      });
    },
    // 点击菜单
    menuClick(index) {
      if (this.menuList[index].disabled)
        return;
      if (index === this.current && this.closeOnClickSelf) {
        this.close();
        setTimeout(() => {
          this.children[index].active = false;
        }, this.duration);
        return;
      }
      this.open(index);
    },
    // 打开下拉菜单
    open(index) {
      this.contentStyle = {
        // zIndex: 11,
        zIndex: 999
        //垂直排列时不会穿透下方
      };
      this.active = true;
      this.current = index;
      this.children.map((val, idx) => {
        val.active = index == idx ? true : false;
      });
      this.$emit("open", this.current);
    },
    // 设置下拉菜单处于收起状态
    close() {
      this.$emit("close", this.current);
      this.active = false;
      this.current = 99999;
      this.contentStyle = {
        zIndex: -1,
        opacity: 0
      };
    },
    // 点击遮罩
    maskClick() {
      if (!this.closeOnClickMask)
        return;
      this.close();
    },
    // 外部手动设置某个菜单高亮
    highlight(index = void 0) {
      this.highlightIndex = index !== void 0 ? index : 99999;
    },
    // 获取下拉菜单内容的高度
    getContentHeight() {
      let windowHeight = this.$u.sys().windowHeight;
      this.$uGetRect(".u-dropdown__menu").then((res) => {
        this.contentHeight = windowHeight - res.bottom;
      });
    }
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
  return {
    a: common_vendor.f($data.menuList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: item.disabled ? "#c0c4cc" : index === $data.current || $data.highlightIndex == index ? $props.activeColor : $props.inactiveColor,
        c: "efa9add2-0-" + i0,
        d: common_vendor.p({
          ["custom-style"]: {
            display: "flex"
          },
          name: $props.menuIcon,
          size: _ctx.$u.addUnit($props.menuIconSize),
          color: index === $data.current || $data.highlightIndex == index ? $props.activeColor : "#c0c4cc"
        }),
        e: index === $data.current ? 1 : "",
        f: index,
        g: common_vendor.o(($event) => $options.menuClick(index), index)
      };
    }),
    b: _ctx.$u.addUnit($props.titleSize),
    c: _ctx.$u.addUnit($props.height),
    d: $props.borderBottom ? 1 : "",
    e: common_vendor.o(() => {
    }),
    f: common_vendor.s($options.popupStyle),
    g: common_vendor.s($data.contentStyle),
    h: common_vendor.s({
      transition: `opacity ${$props.duration / 1e3}s linear`,
      top: _ctx.$u.addUnit($props.height),
      height: $data.contentHeight + "px"
    }),
    i: common_vendor.o((...args) => $options.maskClick && $options.maskClick(...args)),
    j: common_vendor.o(() => {
    }),
    k: common_vendor.o((...args) => $options.close && $options.close(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-efa9add2"], ["__file", "F:/单子/8.30门票预定/booking/uni_modules/vk-uview-ui/components/u-dropdown/u-dropdown.vue"]]);
wx.createComponent(Component);
