"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  MyBlock();
}
const MyBlock = () => "../room/block.js";
const _sfc_main = {
  __name: "scrolly",
  props: ["roomList"],
  setup(__props) {
    const props = __props;
    const showlist = common_vendor.ref([]);
    const page = common_vendor.ref(1);
    const lower = () => {
      page.value++;
      showlist.value = props.roomList.slice(0, 20 * page.value);
    };
    common_vendor.watchEffect(() => {
      showlist.value = props.roomList.slice(0, 20 * page.value);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(showlist.value, (item, k0, i0) => {
          return {
            a: item.RoomNumber,
            b: "c82bc29d-0-" + i0,
            c: common_vendor.p({
              roominfo: item
            })
          };
        }),
        b: common_vendor.o(lower)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c82bc29d"], ["__file", "F:/单子/8.30门票预定/booking/components/common/scrolly.vue"]]);
wx.createComponent(Component);
