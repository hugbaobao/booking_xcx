<template>
	<view class="trip">
		<view class="header">
			<view class="title">
				<text v-if="!HotelStore.orderMsg">待出行的行程</text>
				<text v-else>没有待出行的行程</text>
			</view>
			
			<view class="tips">
				<u-icon name="wifi"></u-icon>
				<view class="">
					<text class="font" v-if="!HotelStore.orderMsg">wifi密码: <text style="font-weight: bold;">到店咨询工作人员获取</text></text>
					<text class="font" v-else>办理入住后可获得wifi密码</text>
				</view>
			</view>
		</view>
		
		<view class="mylive">
			<my-live :roommsg="roommsg[0]" @getroommsg="getRoommsg"></my-live>
		</view>
		
		<view class="mykeeper">
			<my-keeper></my-keeper>
		</view>
		
		<view class="png" v-if="HotelStore?.orderMsg?.OrgInfo?.ImageUris">
			<image :src="HotelStore?.orderMsg?.OrgInfo?.ImageUris" mode="widthFix" class="image"></image>
		</view>
	</view>
	
	
	<my-intercept></my-intercept>
</template>

<script setup>
	import { ref,watchEffect, onMounted } from 'vue'
	import MyLive from '@/components/trip/live.vue'
	import MyKeeper from '@/components/trip/keeper.vue'
	import MyIntercept from '@/components/intercept/intercept.vue'
	import { useHotelStore } from '@/stores/hotel.js'
	import { getOrderApi } from '@/http/getinfo.js'
	import { useLoginStore } from '@/stores/login.js'
	import { getSignature } from '@/http/signature.js'
	
	const LoginStore = useLoginStore()
	const HotelStore = useHotelStore()
	const roommsg = ref([])
	
	
	// 查询订单
	const findOrder = async (val) => {
		const {data:res} = await getSignature('Order.QuerySingleOrder', {
			OrgId: 1206840427889167,
			OrderId: val,
			IncludeOrgInfo: false,
			ExcludeOccupations: false,
			SearchBalance: false
		})
		console.log(222,res);
		if(res.Code === 10000) {
			HotelStore.savePayOrder(res.Data)
			getRoommsg(res.Data.OrderId)
		}
	}
	// API 
	const getOrder = async () => {
		const { data:res } = await getOrderApi(LoginStore.keyInfo.openid)
		console.log(111,res);
		if(res.code === 200 && res.data.length !== 0) {
			HotelStore.name = res.data[0].name
			HotelStore.phone = res.data[0].phone
			HotelStore.idcard = res.data[0].idcard
			HotelStore.idcardType = res.data[0].idcardtype
			HotelStore.ifzhu = res.data[0].ifzhu
			findOrder(res.data[0].orderid)
		}
	}
	// 查询入住信息
	const getRoommsg = async (val)=> {
		const {data:res} = await getSignature('Order.QueryCheckins', {
			OrgId: 1206840427889167,
			OrderIds: [val]
		})
		console.log(333,res);
		roommsg.value = res.Data.Content.filter(item=>item.OrderId === val)
	}
	
	onMounted(()=>{
		if(HotelStore.orderMsg !== null) {
			getRoommsg(HotelStore.orderMsg.OrderId)
			return
		} else {
			getOrder()
		}
	})
</script>

<style lang="scss" scoped>
	.trip {
		min-height: 100vh;
		background-color: #eff3f6;
		
		.header{
			background-color: #fff;
			.title {
				width: 750rpx;
				font-size: 40rpx;
				font-weight: bold;
				padding:30rpx;
				background-color: #fff;
				box-shadow: 0rpx 10rpx 10rpx rgba(239, 243, 246, .2);
				z-index: 2;
			}
			.tips{
				background-color: #fff;
				padding: 20rpx 30rpx;
				margin-top: 10rpx;
				font-size: 24rpx;
				display: flex;
				align-items: center;
				.font {
					margin-left: 10rpx;
				}
			}
		}
		
		.mylive{
			margin-top: 60rpx;
			padding: 0 30rpx;
		}
		.mykeeper{
			margin-top: 60rpx;
			padding: 0 30rpx;
		}
		.png {
			margin-top: 60rpx;
			padding: 0 20rpx;
			.image {
				width: 100%;
				height: 400rpx;
				background-color: gray;
			}
		}
	}
</style>