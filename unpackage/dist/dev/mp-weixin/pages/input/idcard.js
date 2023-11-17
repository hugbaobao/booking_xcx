"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_hotel = require("../../stores/hotel.js");
const stores_login = require("../../stores/login.js");
const http_getinfo = require("../../http/getinfo.js");
require("../../http/signature.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_action_sheet = common_vendor.resolveComponent("van-action-sheet");
  const _component_van_checkbox = common_vendor.resolveComponent("van-checkbox");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_component_van_field + _component_van_icon + _component_van_action_sheet + _component_van_checkbox + _easycom_u_button2)();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
const _sfc_main = {
  __name: "idcard",
  setup(__props) {
    const HotelStore = stores_hotel.useHotelStore();
    const LoginStore = stores_login.useLoginStore();
    console.log(HotelStore.selectedRoom);
    const name = common_vendor.ref("");
    const card = common_vendor.ref("");
    const type = common_vendor.ref("C01");
    const cardname = common_vendor.ref("身份证");
    const check = common_vendor.ref(false);
    const show = common_vendor.ref(false);
    const actions = common_vendor.ref([
      {
        name: "身份证",
        value: "C01"
      },
      {
        name: "护照",
        value: "C53"
      },
      {
        name: "台湾居民来往大陆通行证",
        value: "C55"
      },
      {
        name: "港澳居民来往内地通行证",
        value: "C62"
      }
    ]);
    const onClose = () => {
      show.value = false;
    };
    const onSelect = (event) => {
      type.value = event.detail.value;
      cardname.value = event.detail.name;
    };
    const onNameChange = (event) => {
      name.value = event.detail.value;
    };
    const onCardChange = (event) => {
      card.value = event.detail.value;
    };
    const canSub = common_vendor.computed(() => {
      return name.value !== "" && card.value !== "" && check.value;
    });
    const toIdcard = () => {
      common_vendor.index.navigateTo({
        url: "/pages/agreement/idcard"
      });
    };
    const submit = async () => {
      HotelStore.idcardType = LoginStore.idcardtype = type.value;
      HotelStore.idcard = LoginStore.idcard = card.value;
      HotelStore.name = name.value;
      saveIdcard();
      common_vendor.index.navigateBack();
    };
    const saveIdcard = async () => {
      await http_getinfo.saveIdcardApi(LoginStore.keyInfo.openid, {
        idcard: card.value,
        idcardtype: type.value,
        name: name.value
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onNameChange),
        b: common_vendor.p({
          label: "姓名",
          value: name.value,
          placeholder: "与证件名称保持一致",
          border: "{{ false }}"
        }),
        c: common_vendor.t(cardname.value),
        d: common_vendor.p({
          name: "arrow"
        }),
        e: common_vendor.o(($event) => show.value = true),
        f: common_vendor.o(onClose),
        g: common_vendor.o(onSelect),
        h: common_vendor.p({
          show: show.value,
          actions: actions.value
        }),
        i: common_vendor.o(onCardChange),
        j: common_vendor.p({
          label: "证件号码",
          value: card.value,
          placeholder: "与证件号码保持一致",
          border: "{{ false }}"
        }),
        k: common_vendor.o(($event) => check.value = !check.value),
        l: common_vendor.p({
          value: check.value,
          checkedColor: "#07c160",
          iconSize: "40rpx"
        }),
        m: common_vendor.o(toIdcard),
        n: common_vendor.o(submit),
        o: common_vendor.p({
          ["hair-line"]: false,
          type: "success",
          disabled: !common_vendor.unref(canSub)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-995bbdaa"], ["__file", "F:/单子/8.30门票预定/booking/pages/input/idcard.vue"]]);
wx.createPage(MiniProgramPage);
