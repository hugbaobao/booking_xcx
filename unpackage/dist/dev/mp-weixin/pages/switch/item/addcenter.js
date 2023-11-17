"use strict";
const common_vendor = require("../../../common/vendor.js");
const http_getinfo = require("../../../http/getinfo.js");
const stores_login = require("../../../stores/login.js");
const loginStore = stores_login.useLoginStore();
const _sfc_main = {
  data() {
    return {
      form: {
        title: "",
        content: "",
        img: []
      }
    };
  },
  methods: {
    submit() {
      let that = this;
      let imgList = this.$refs.uUpload.lists;
      imgList.forEach((item) => {
        common_vendor.index.uploadFile({
          url: "http://127.0.0.1:8000/uploadimg/ulo",
          // 服务器地址
          filePath: item.url,
          name: "img",
          // 文件名
          type: "image/jpeg",
          // 文件类型
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success(res) {
            let path = `http://127.0.0.1:8000${JSON.parse(res.data).data.url}`;
            that.form.img.push(path);
          },
          fail(err) {
            console.log(err);
          }
        });
      });
      this.addtrip(this.form);
    },
    // API 
    async addtrip(val) {
      const { data: res } = await http_getinfo.addcenterApi({
        openid: loginStore.keyInfo.openid,
        data: val
      });
      if (res.code === 200) {
        this.$refs.utoast.show({
          title: "提交成功！等待审核",
          type: "success",
          icon: false
        });
        common_vendor.index.navigateBack();
      }
    }
  }
};
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_upload2 + _easycom_u_form2 + _easycom_u_toast2)();
}
const _easycom_u_input = () => "../../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_upload = () => "../../../uni_modules/vk-uview-ui/components/u-upload/u-upload.js";
const _easycom_u_form = () => "../../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
const _easycom_u_toast = () => "../../../uni_modules/vk-uview-ui/components/u-toast/u-toast.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item + _easycom_u_upload + _easycom_u_form + _easycom_u_toast)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.form.title = $event),
    b: common_vendor.p({
      modelValue: $data.form.title
    }),
    c: common_vendor.p({
      label: "标题",
      prop: "name"
    }),
    d: common_vendor.o(($event) => $data.form.content = $event),
    e: common_vendor.p({
      type: "textarea",
      modelValue: $data.form.content
    }),
    f: common_vendor.p({
      label: "简介",
      prop: "intro"
    }),
    g: common_vendor.sr("uUpload", "4376b0ca-6,4376b0ca-5"),
    h: common_vendor.p({
      ["auto-upload"]: false,
      ["max-count"]: 3
    }),
    i: common_vendor.p({
      label: "上传"
    }),
    j: common_vendor.sr("form1", "4376b0ca-0"),
    k: common_vendor.p({
      model: $data.form
    }),
    l: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    m: common_vendor.sr("utoast", "4376b0ca-7")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4376b0ca"], ["__file", "F:/单子/8.30门票预定/booking/pages/switch/item/addcenter.vue"]]);
wx.createPage(MiniProgramPage);
