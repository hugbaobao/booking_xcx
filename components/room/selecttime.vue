<template>
	<view class="select">
		<view class="drop_item">
			<view class="label">
				入住时间
			</view>
			<view class="drop" @click="topicker">
				<view class="center">
					<text>{{ from }}</text>
					<text>-</text>
					<text>{{ to }}</text>
				</view>
				
				<view class="icon">
					<view class="ificon">
						<u-icon name="arrow-down-fill" color="#bfbfbf"></u-icon>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>


<script setup>
	import { ref, watchEffect } from 'vue'
	import { useHotelStore } from '@/stores/hotel.js'
	
	const HotelStore = useHotelStore()
	
	const from = ref('')
	const to = ref('')
	
	const topicker = () => {
		uni.navigateTo({
			url:'/pages/picker/calendar'
		})
	}
	
	watchEffect(()=>{
		from.value = HotelStore.ArriveTime
		to.value = HotelStore.DepartureTime
	})
</script>

<style lang="scss" scoped>
	.select {
		margin-bottom: 20rpx;
		.drop_item {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			&:first-child {
				z-index: 999;
			}
			.label{
				width: 170rpx;
				text-align: center;
				background-color: #cccccc;
				padding: 10rpx 20rpx;
				border-radius: $radius1;
				margin-right: 10rpx;
				font-size: 28rpx;
			}
			.drop {
				flex: 1;
				position: relative;
				border-bottom: 1px solid #bfbfbf;
				.center {
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
					padding-right: 60rpx;
					font-size: 28rpx;
					color: #606266;
				}
				.icon {
					position: absolute;
					right: 0;
					height: 60rpx;
					line-height: 60rpx;
					top: 1px;
					background-color: #fafafa;
					width: 60rpx;
					text-align: center;
				}
			}
		}
	}
</style>