<template>
	<view class="block" @click="todetails">
		<view class="png">
			<image :src="roominfo.ImageUris" mode="" class="image"></image>
		</view>
		
		<view class="words">
			<view class="name">
				<text class="call">{{ `${priceinfo?.RoomType?.RoomTypeName} - ${roominfo.RoomNumber}` }}</text>
				<view class="param">
					{{ roominfo.Attribute }}
				</view>
			</view>
			
			<view class="price">
				<text class="num">￥{{ priceinfo?.OrignPrice }}</text>
				<view class="pay" @click="totooking">
					预定
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, watchEffect } from 'vue'
	import { useHotelStore } from '@/stores/hotel.js'
	
	const HotelStore = useHotelStore()
	
	const priceinfo = ref({})
	const props = defineProps({
		roominfo:{
			type: Object
		}
	})
	
	const todetails = () => {
		HotelStore.saveInfo(priceinfo.value, props.roominfo)
		uni.navigateTo({
			url:'/pages/room/details'
		})
	}
	
	const totooking = ()=> {
		HotelStore.saveInfo(priceinfo.value, props.roominfo)
		uni.navigateTo({
			url:'/pages/room/booking'
		})
	}
	
	watchEffect(() => {
		if(props.roominfo) {
			priceinfo.value = HotelStore.Prices.find(item=> item.RoomTypeId === props.roominfo.RoomTypeId)
		}
	})
</script>

<style lang="scss" scoped>
	.block {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #f9f9f9;
		padding: 20rpx 5rpx;
		background-color: #fff;
		.png {
			width: 35%;
			.image{
				width: 100%;
				height: 180rpx;
				border-radius: 10rpx;
				background-color: #fafafa;
			}
		}
		
		.words {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			.name {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				.call {
					margin-bottom: 20rpx;
					font-size: 32rpx;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				.param{
					font-size: 24rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					-webkit-box-orient: vertical;
				}
			}
			.price {
				display: flex;
				flex-direction: column;
				align-items: center;
				.num {
					color: #e61c0d;
					font-size: 36rpx;
					margin-bottom: 30rpx;
				}
				.pay {
					color: #fff;
					background-color: #b99179;
					height: 40rpx;
					line-height: 40rpx;
					border-radius: 20rpx;
					padding: 0 30rpx;
				}
			}
		}
	}
</style>