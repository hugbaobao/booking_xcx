// stores/counter.js
import { defineStore } from 'pinia';
import { getSignature } from '@/http/signature.js'

export const useHotelStore = defineStore('hotel', {
	state: () => {
		return {
			OrgId: '1206840427889167', // 酒店id
			OrgName: '',             // 酒店名称
			RoomTypeId: '',        // 房型id
			RoomTypeName: '',     // 房型名称
			ArriveTime: '',       // 抵店时间
			DepartureTime: '',     // 离店时间
			Address: '',     // 地址
			Longitude: '',    // 维度
			Latitude: '',  // 经度
		    roomType: [],   // 房型列表
			Prices: [],    // 价格详细信息
			selectedPrinceInfo: {},  // 所选房型价格信息
			selectedRoom:{},  // 所选房型信息
			totalDay:0,   // 入住天数
			MemberId: '',  // 会员卡
			iffapiao: false,  // 是否开票
			ticket: '',   // 优惠券
			sevicetag:[],  // wifi，停车等
			name: '',  // 入住人姓名
			phone: '',  // 入住人手机
			idcardType: '',  // 证件类型
			idcard: '',  // 入住人身份证
			beizhu: '',  // 入住人备注
			orderMsg:null,  // 已下单的订单信息
			ifzhu: false
		};
	},
	getters: {
		
	},
	actions: {
		saveInfo(price, room) {
			this.selectedPrinceInfo = price
			this.selectedRoom = room
		},
		// 添加订单
		async getVipInfo() {
			const {data:res} = await getSignature('Order.Add', 
			{
				CheckinType: 'Normal',
				OrgId: 1206840427889167,
				EstimatedArriveTime: this.ArriveTime,
				EstimatedDepartureTime: this.DepartureTime,
				RoomPlans: [{
					RoomTypeId: this.selectedRoom.RoomTypeId,
					Count: 1
				}],
				Liaisons: [{
					Name: this.name,
					Mobile: this.phone
				}],
				Locked: false,
				Memo: this.beizhu
			})
			// 返回订单号
			return res;
		},
		// 保存已付款订单信息
		savePayOrder(msg) {
			this.orderMsg = msg
		}
	}
});
