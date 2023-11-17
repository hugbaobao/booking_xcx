<template>
	<view class="live">
		<my-title>
			<template #default>
			  在线办理入住/离店
			</template>
			
			<template #thin>
			  快捷办理，无需排队
			</template>
		</my-title>
		
		<view class="box">
			<view class="half block" @click="toroom">
				<view class="icon iconfont">&#xe60f;</view>
				<text class="words">在线入住</text>
			</view>
			<view class="right">
				
				<view class="inline block">
					<view class="icon iconfont">&#xe633;</view>
					<picker
					mode="date" 
					:value="date" 
					:start="startDate" 
					@change="bindDateChange"
					class="words"
					>
						<text class="words">在线续住</text>
					</picker>
				</view>
				
				
				
				<view class="inline block" @click="toleave">
					<view class="icon iconfont">&#xe633;</view>
					<text class="words">在线离店</text>
				</view>
			</view>
		</view>
	</view>
	
	<u-toast ref="utoast" />
</template>

<script setup>
	import { ref, computed } from 'vue'
	import MyTitle from './title.vue'
	import { useHotelStore } from '@/stores/hotel.js'
	import { changeZhuApi, addFeeApi } from '@/http/getinfo.js'
	import { getSignature } from '@/http/signature.js'
	import { useLoginStore } from '@/stores/login.js'
	import { getPay } from '@/http/pay.js'
	
	const props = defineProps(['roommsg'])
	const HotelStore = useHotelStore()
	const LoginStore = useLoginStore()
	console.log(HotelStore.orderMsg);
	const utoast =ref()
	const date = ref('')
	const startDate = computed(()=>{
		return getDate();
	})
	const emits = defineEmits(['getroommsg'])
	
	// 格式化日期
	const getDate = (type) => {
	    const date = new Date();
	    let year = date.getFullYear();
	    let month = date.getMonth() + 1;
	    let day = date.getDate();
	    month = month > 9 ? month : '0' + month;
	    day = day > 9 ? day : '0' + day;
	    return `${year}-${month}-${day}`;
	}
	const bindDateChange = (e) => {
    date.value = e.detail.value
		
		// 通过新日期和旧日期计算天数
		const newDate = new Date(date.value)  // 新日期
		const oldDate = new Date(props.roommsg.EstimatedDepartureTime)
		let days = (newDate.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24)
		days = parseInt(days)  // 增加日期
		console.log(days);
		if (days <= 0) {
			utoast.value.show({
				title: '续住时间不能小于入住时间！',
				type: 'warning',
				icon: false
			})
			return
		} else {
			const totalfee = 0.1
			// const totalfee = days * HotelStore.orderMsg.RoomPlans[0].Price[0].OrignPrice
			pay(props.roommsg.OrderId, totalfee, newDate)
		}
}
	
	const toroom = () => {
		if(!HotelStore.orderMsg) {
			uni.switchTab({
				url:'/pages/tabbar/room'
			})
			return
		} else {
			AddCheckin()
		}
	}
	// 离店
	const toleave = () => {
		console.log(props.roommsg);
		return
	}
	
	// API 
	// 办理入住
	const AddCheckin = async () => {
		const {data:res} = await getSignature('Order.AddCheckin', 
		{
			OrgId: 1206840427889167,
			OrderId: HotelStore.orderMsg.OrderId,
			Customer: {
				Name: HotelStore.name,
				CardTypeId: HotelStore.idcardType,
				CardNo: HotelStore.idcard,
				ThemSelfCheckin: true
			}
		})
		console.log('ruzhu ',res);
		if(res.Code === 10000) {
			utoast.value.show({
				title: '已为您办理入住！',
				type: 'success',
				icon: false
			})
			HotelStore.ifzhu = true
			changeZhu()
			// 修改入住状态
			emits('getroommsg')
		}else {
			utoast.value.show({
				title: '请到门店进行办理！',
				type: 'warning',
				icon: false
			})
		}
	}
	
	// 修改入住状态
	const changeZhu = async () => {
		const { data:res } = await changeZhuApi(HotelStore.orderMsg.OrderId)
	}
	
	// 退房
	const leaveroom = async (val)=> {
		const {data:res} = await getSignature('Order.Checkout', {
			OrgId: 1206840427889167,
			IsNeedCheckRoomRent: false,
			IsNeedCheckRoomCharge: false,
			CheckinIds: [val]
		})
		console.log(res);
		if(res.Code === 10000) {
			utoast.value.show({
				title: '退房办理成功！',
				type: 'success',
				icon: false
			})
		}else {
			utoast.value.show({
				title: '请到前台进行办理！',
				type: 'warning',
				icon: false
			})
		}
	}
	
	// 续住
	const addleavetime = async (newdate) => {
		const {data:res} = await getSignature('Order.ChangeStay', {
			OrgId: 1206840427889167,
			CheckinIds: props.roommsg.CheckinId,
			OperateType: 'ExtendStay',
			NewDepartureTime: newdate,
			Reason: '客人续住',
			ContinueLivePolicy: 'Market'
		})
		console.log(111,res);
		if(res.Code === 10000) {
			utoast.value.show({
				title: '修改成功！',
				type: 'success',
				icon: false
			})
		}else {
			utoast.value.show({
				title: '请到前台进行办理！',
				type: 'warning',
				icon: false
			})
		}
	}
	
	
	// 支付
	const pay = async (order, fee, newdate) => {
		addleavetime(newdate)
		return
	}
	
	
	const paySuccess = async (order, fee) => {
		const {data:res} = await addFeeApi(order, parseFloat(fee))
	}
</script>

<style lang="scss" scoped>
	.live {
		.box{
			display: flex;
			text-align: center;
			margin-top: 20rpx;
			.block {
				background-color: #fff;
				border-radius: 20rpx;
				color: #b2b6b8;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 30rpx 0;
				.words {
					margin-top: 20rpx;
				}
			}
			.half {
				flex: 1;
				margin-right: 20rpx;
			}
			.right {
				flex: 1;
				display: flex;
				.inline {
					flex: 1;
					&:first-child {
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>