"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-toast",
  props: {
    // z-index值
    zIndex: {
      type: [Number, String],
      default: ""
    }
  },
  data() {
    return {
      isShow: false,
      timer: null,
      // 定时器
      config: {
        params: {},
        // URL跳转的参数，对象
        title: "",
        // 显示文本
        type: "",
        // 主题类型，primary，success，error，warning，black
        duration: 2e3,
        // 显示的时间，毫秒
        isTab: false,
        // 是否跳转tab页面
        url: "",
        // toast消失后是否跳转页面，有则跳转，优先级高于back参数
        icon: true,
        // 显示的图标
        position: "center",
        // toast出现的位置
        callback: null,
        // 执行完后的回调函数
        back: false
        // 结束toast是否自动返回上一页
      },
      tmpConfig: {}
      // 将用户配置和内置配置合并后的临时配置变量
    };
  },
  computed: {
    iconName() {
      if (["error", "warning", "success", "info"].indexOf(this.tmpConfig.type) >= 0 && this.tmpConfig.icon) {
        let icon = this.$u.type2icon(this.tmpConfig.type);
        return icon;
      }
    },
    uZIndex() {
      return this.isShow ? this.zIndex ? this.zIndex : this.$u.zIndex.toast : "999999";
    }
  },
  methods: {
    // 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
    show(options) {
      this.tmpConfig = this.$u.deepMerge(this.config, options);
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.isShow = true;
      this.timer = setTimeout(() => {
        this.isShow = false;
        clearTimeout(this.timer);
        this.timer = null;
        typeof this.tmpConfig.callback === "function" && this.tmpConfig.callback();
        this.timeEnd();
      }, this.tmpConfig.duration);
    },
    // 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
    hide() {
      this.isShow = false;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    // 倒计时结束之后，进行的一些操作
    timeEnd() {
      if (this.tmpConfig.url) {
        if (this.tmpConfig.url[0] != "/")
          this.tmpConfig.url = "/" + this.tmpConfig.url;
        if (Object.keys(this.tmpConfig.params).length) {
          let query = "";
          if (/.*\/.*\?.*=.*/.test(this.tmpConfig.url)) {
            query = this.$u.queryParams(this.tmpConfig.params, false);
            this.tmpConfig.url = this.tmpConfig.url + "&" + query;
          } else {
            query = this.$u.queryParams(this.tmpConfig.params);
            this.tmpConfig.url += query;
          }
        }
        if (this.tmpConfig.isTab) {
          common_vendor.index.switchTab({
            url: this.tmpConfig.url
          });
        } else {
          common_vendor.index.navigateTo({
            url: this.tmpConfig.url
          });
        }
      } else if (this.tmpConfig.back) {
        this.$u.route({
          type: "back"
        });
      }
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
  return common_vendor.e({
    a: $data.tmpConfig.icon
  }, $data.tmpConfig.icon ? {
    b: common_vendor.p({
      name: $options.iconName,
      size: 30,
      color: $data.tmpConfig.type
    })
  } : {}, {
    c: common_vendor.t($data.tmpConfig.title),
    d: common_vendor.n($data.isShow ? "u-show" : ""),
    e: common_vendor.n("u-type-" + $data.tmpConfig.type),
    f: common_vendor.n("u-position-" + $data.tmpConfig.position),
    g: $options.uZIndex
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dcb3ce67"], ["__file", "F:/单子/8.30门票预定/booking/uni_modules/vk-uview-ui/components/u-toast/u-toast.vue"]]);
wx.createComponent(Component);
