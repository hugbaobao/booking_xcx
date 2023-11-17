"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-upload",
  emits: ["update:file-list", "on-oversize", "on-list-change", "on-preview", "on-remove", "on-success", "on-change", "on-error", "on-progress", "on-uploaded", "on-choose-complete", "on-choose-fail"],
  props: {
    //是否显示组件自带的图片预览功能
    showUploadList: {
      type: Boolean,
      default: true
    },
    // 后端地址
    action: {
      type: String,
      default: ""
    },
    // 最大上传数量
    maxCount: {
      type: [String, Number],
      default: 52
    },
    //  是否显示进度条
    showProgress: {
      type: Boolean,
      default: true
    },
    // 是否启用
    disabled: {
      type: Boolean,
      default: false
    },
    // 预览上传的图片时的裁剪模式，和image组件mode属性一致
    imageMode: {
      type: String,
      default: "aspectFill"
    },
    // 头部信息
    header: {
      type: Object,
      default() {
        return {};
      }
    },
    // 额外携带的参数
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    // 上传的文件字段名
    name: {
      type: String,
      default: "file"
    },
    // 所选的图片的尺寸, 可选值为original compressed
    sizeType: {
      type: Array,
      default() {
        return ["original", "compressed"];
      }
    },
    sourceType: {
      type: Array,
      default() {
        return ["album", "camera"];
      }
    },
    // 是否在点击预览图后展示全屏图片预览
    previewFullImage: {
      type: Boolean,
      default: true
    },
    // 是否开启图片多选，部分安卓机型不支持
    multiple: {
      type: Boolean,
      default: true
    },
    // 是否展示删除按钮
    deletable: {
      type: Boolean,
      default: true
    },
    // 文件大小限制，单位为byte
    maxSize: {
      type: [String, Number],
      default: Number.MAX_VALUE
    },
    // 显示已上传的文件列表
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    // 上传区域的提示文字
    uploadText: {
      type: String,
      default: "选择图片"
    },
    // 是否自动上传
    autoUpload: {
      type: Boolean,
      default: true
    },
    // 是否显示toast消息提示
    showTips: {
      type: Boolean,
      default: true
    },
    // 是否通过slot自定义传入选择图标的按钮
    customBtn: {
      type: Boolean,
      default: false
    },
    // 内部预览图片区域和选择图片按钮的区域宽度
    width: {
      type: [String, Number],
      default: 200
    },
    // 内部预览图片区域和选择图片按钮的区域高度
    height: {
      type: [String, Number],
      default: 200
    },
    // 右上角关闭按钮的背景颜色
    delBgColor: {
      type: String,
      default: "#fa3534"
    },
    // 右上角关闭按钮的叉号图标的颜色
    delColor: {
      type: String,
      default: "#ffffff"
    },
    // 右上角删除图标名称，只能为uView内置图标
    delIcon: {
      type: String,
      default: "close"
    },
    // 右下角成功图标名称，只能为uView内置图标
    successIcon: {
      type: String,
      default: "checkbox-mark"
    },
    // 右下角成功的叉号图标的颜色
    successColor: {
      type: String,
      default: "#ffffff"
    },
    // 如果上传后的返回值为json字符串，是否自动转json
    toJson: {
      type: Boolean,
      default: true
    },
    // 上传前的钩子，每个文件上传前都会执行
    beforeUpload: {
      type: Function,
      default: null
    },
    // 移除文件前的钩子
    beforeRemove: {
      type: Function,
      default: null
    },
    // 允许上传的图片后缀
    limitType: {
      type: Array,
      default() {
        return ["png", "jpg", "jpeg", "webp", "gif", "image"];
      }
    },
    // 在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件
    index: {
      type: [Number, String],
      default: ""
    }
  },
  mounted() {
  },
  data() {
    return {
      lists: [],
      isInCount: true,
      uploading: false
    };
  },
  watch: {
    fileList: {
      immediate: true,
      handler(val) {
        let that = this;
        let lists = JSON.parse(JSON.stringify(that.lists));
        val.map((value) => {
          let tmp = lists.some((val2) => {
            return val2.url == value.url;
          });
          if (!tmp) {
            lists.push({ url: value.url, error: false, progress: 100 });
          }
        });
        that.lists = JSON.parse(JSON.stringify(lists));
      }
    },
    // 监听lists的变化，发出事件
    lists: {
      deep: true,
      handler(n) {
        this.$emit("update:file-list", n);
        this.$emit("on-list-change", n, this.index);
      }
    }
  },
  methods: {
    // 清除列表
    clear() {
      this.lists = [];
    },
    // 重新上传队列中上传失败的所有文件
    reUpload() {
      this.uploadFile();
    },
    // 选择图片
    selectFile() {
      let that = this;
      if (that.disabled)
        return;
      const { name = "", maxCount, multiple, maxSize, sizeType, camera, compressed, maxDuration, sourceType } = that;
      let chooseFile = null;
      let lists = JSON.parse(JSON.stringify(that.lists));
      const newMaxCount = maxCount - lists.length;
      chooseFile = new Promise((resolve, reject) => {
        common_vendor.index.chooseImage({
          count: multiple ? newMaxCount > 9 ? 9 : newMaxCount : 1,
          sourceType,
          sizeType,
          success: resolve,
          fail: reject
        });
      });
      chooseFile.then((res) => {
        let listOldLength = that.lists.length;
        res.tempFiles.map((val, index) => {
          if (!that.checkFileExt(val))
            return;
          if (!multiple && index >= 1)
            return;
          if (val.size > maxSize) {
            that.$emit("on-oversize", val, that.lists, that.index);
            that.showToast("超出允许的文件大小");
          } else {
            if (maxCount <= lists.length) {
              that.$emit("on-exceed", val, that.lists, that.index);
              that.showToast("超出最大允许的文件个数");
              return;
            }
            lists.push({
              url: val.path,
              progress: 0,
              error: false,
              file: val
            });
          }
        });
        this.deepClone(lists, that.lists);
        that.$emit("on-choose-complete", that.lists, that.index);
        if (that.autoUpload)
          that.uploadFile(listOldLength);
      }).catch((error) => {
        that.$emit("on-choose-fail", error);
      });
    },
    // 提示用户消息
    showToast(message, force = false) {
      if (this.showTips || force) {
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      }
    },
    // 该方法供用户通过ref调用，手动上传
    upload() {
      this.uploadFile();
    },
    // 对失败的图片重新上传
    retry(index) {
      this.lists[index].progress = 0;
      this.lists[index].error = false;
      this.lists[index].response = null;
      common_vendor.index.showLoading({
        title: "重新上传"
      });
      this.uploadFile(index);
    },
    // 上传图片
    async uploadFile(index = 0) {
      if (this.disabled)
        return;
      if (this.uploading)
        return;
      if (index >= this.lists.length) {
        this.$emit("on-uploaded", this.lists, this.index);
        return;
      }
      if (this.lists[index].progress == 100) {
        if (this.autoUpload == false)
          this.uploadFile(index + 1);
        return;
      }
      if (this.beforeUpload && typeof this.beforeUpload === "function") {
        let beforeResponse = this.beforeUpload.bind(this.$u.$parent.call(this))(index, this.lists);
        if (!!beforeResponse && typeof beforeResponse.then === "function") {
          await beforeResponse.then((res) => {
          }).catch((err) => {
            return this.uploadFile(index + 1);
          });
        } else if (beforeResponse === false) {
          return this.uploadFile(index + 1);
        } else
          ;
      }
      if (!this.action) {
        this.showToast("请配置上传地址", true);
        return;
      }
      this.lists[index].error = false;
      this.uploading = true;
      const task = common_vendor.index.uploadFile({
        url: this.action,
        filePath: this.lists[index].url,
        name: this.name,
        formData: this.formData,
        header: this.header,
        success: (res) => {
          let data = this.toJson && this.$u.test.jsonString(res.data) ? JSON.parse(res.data) : res.data;
          if (![200, 201, 204].includes(res.statusCode)) {
            this.uploadError(index, data);
          } else {
            this.lists[index].response = data;
            this.lists[index].progress = 100;
            this.lists[index].error = false;
            this.$emit("on-success", data, index, this.lists, this.index);
          }
        },
        fail: (e) => {
          this.uploadError(index, e);
        },
        complete: (res) => {
          common_vendor.index.hideLoading();
          this.uploading = false;
          this.uploadFile(index + 1);
          this.$emit("on-change", res, index, this.lists, this.index);
        }
      });
      task.onProgressUpdate((res) => {
        if (res.progress > 0) {
          this.lists[index].progress = res.progress;
          this.$emit("on-progress", res, index, this.lists, this.index);
        }
      });
    },
    // 上传失败
    uploadError(index, err) {
      this.lists[index].progress = 0;
      this.lists[index].error = true;
      this.lists[index].response = null;
      this.$emit("on-error", err, index, this.lists, this.index);
      this.showToast("上传失败，请重试");
    },
    // 删除一个图片
    deleteItem(index) {
      common_vendor.index.showModal({
        title: "提示",
        content: "您确定要删除此项吗？",
        success: async (res) => {
          if (res.confirm) {
            if (this.beforeRemove && typeof this.beforeRemove === "function") {
              let beforeResponse = this.beforeRemove.bind(this.$u.$parent.call(this))(index, this.lists);
              if (!!beforeResponse && typeof beforeResponse.then === "function") {
                await beforeResponse.then((res2) => {
                  this.handlerDeleteItem(index);
                }).catch((err) => {
                  this.showToast("已终止移除");
                });
              } else if (beforeResponse === false) {
                this.showToast("已终止移除");
              } else {
                this.handlerDeleteItem(index);
              }
            } else {
              this.handlerDeleteItem(index);
            }
          }
        }
      });
    },
    // 执行移除图片的动作，上方代码只是判断是否可以移除
    handlerDeleteItem(index) {
      if (this.lists[index].progress < 100 && this.lists[index].progress > 0) {
        typeof this.lists[index].uploadTask != "undefined" && this.lists[index].uploadTask.abort();
      }
      this.lists.splice(index, 1);
      this.$forceUpdate();
      this.$emit("on-remove", index, this.lists, this.index);
    },
    // 用户通过ref手动的形式，移除一张图片
    remove(index) {
      if (index >= 0 && index < this.lists.length) {
        this.lists.splice(index, 1);
        this.$emit("on-list-change", this.lists, this.index);
      }
    },
    // 预览图片
    doPreviewImage(url, index) {
      if (!this.previewFullImage) {
        this.$emit("on-preview", url, this.lists, this.index);
        return;
      }
      const images = this.lists.map((item) => item.url || item.path);
      common_vendor.index.previewImage({
        urls: images,
        current: url,
        success: () => {
          this.$emit("on-preview", url, this.lists, this.index);
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "预览图片失败",
            icon: "none"
          });
        }
      });
    },
    // 判断文件后缀是否允许
    checkFileExt(file) {
      let noArrowExt = false;
      let fileExt = "";
      const reg = /.+\./;
      fileExt = file.path.replace(reg, "").toLowerCase();
      noArrowExt = this.limitType.some((ext) => {
        return ext.toLowerCase() === fileExt;
      });
      if (!noArrowExt)
        this.showToast(`不允许选择${fileExt}格式的文件`);
      return noArrowExt;
    },
    // 深拷贝
    deepClone(obj, newObj) {
      for (let k in obj) {
        const value = obj[k];
        if (Array.isArray(value)) {
          newObj[k] = [];
          this.deepClone(value, newObj[k]);
        } else if (value !== null && typeof value === "object") {
          newObj[k] = {};
          this.deepClone(value, newObj[k]);
        } else {
          newObj[k] = value;
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_line_progress2 = common_vendor.resolveComponent("u-line-progress");
  (_easycom_u_icon2 + _easycom_u_line_progress2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_line_progress = () => "../u-line-progress/u-line-progress.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_line_progress)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.disabled
  }, !$props.disabled ? common_vendor.e({
    b: $props.showUploadList
  }, $props.showUploadList ? {
    c: common_vendor.f($data.lists, (item, index, i0) => {
      return common_vendor.e($props.deletable ? {
        a: "e7606f58-0-" + i0,
        b: common_vendor.p({
          name: $props.delIcon,
          size: "20",
          color: $props.delColor
        }),
        c: common_vendor.o(($event) => $options.deleteItem(index), index),
        d: $props.delBgColor
      } : {}, {
        e: $props.showProgress && item.progress > 0 && item.progress != 100 && !item.error
      }, $props.showProgress && item.progress > 0 && item.progress != 100 && !item.error ? {
        f: "e7606f58-1-" + i0,
        g: common_vendor.p({
          ["show-percent"]: false,
          height: "16",
          percent: item.progress
        })
      } : {}, {
        h: item.error
      }, item.error ? {
        i: common_vendor.o(($event) => $options.retry(index), index)
      } : {}, {
        j: !item.isImage
      }, !item.isImage ? {
        k: common_vendor.o(($event) => $options.doPreviewImage(item.url || item.path, index), index),
        l: item.url || item.path,
        m: $props.imageMode
      } : {}, {
        n: index
      });
    }),
    d: $props.deletable,
    e: _ctx.$u.addUnit($props.width),
    f: _ctx.$u.addUnit($props.height)
  } : {}, {
    g: common_vendor.r("file", {
      file: $data.lists
    }),
    h: $props.maxCount > $data.lists.length
  }, $props.maxCount > $data.lists.length ? common_vendor.e({
    i: !$props.customBtn
  }, !$props.customBtn ? {
    j: common_vendor.p({
      name: "plus",
      size: "40"
    }),
    k: common_vendor.t($props.uploadText),
    l: _ctx.$u.addUnit($props.width),
    m: _ctx.$u.addUnit($props.height)
  } : {}, {
    n: common_vendor.o((...args) => $options.selectFile && $options.selectFile(...args))
  }) : {}) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e7606f58"], ["__file", "F:/单子/8.30门票预定/booking/uni_modules/vk-uview-ui/components/u-upload/u-upload.vue"]]);
wx.createComponent(Component);
