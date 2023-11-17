// stores/counter.js
import { defineStore } from 'pinia';

export const useGoodsStore = defineStore('goods', {
	state: () => {
		return {
			goodsMsg:{}
		};
	},
	getters: {
		parseGoods() {
			return {
				...this.goodsMsg,
				simple: JSON.parse(this.goodsMsg.simple)
			}
		},
	},
	actions: {
		// 登录状态改变
		goodsChange(val) {
			this.goodsMsg = val;
		},
	},
});
