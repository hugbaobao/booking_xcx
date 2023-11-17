<template>
	<view class="order">
		<view class="line">
			<text>商城订单</text>
			<view class="more" @click="toOrder(0)">
				<text class="font">全部订单</text>
				<van-icon name="arrow" size="28rpx" />
			</view>
		</view>
		
		<view class="flex">
			<view class="item" @click="toOrder(1)">
				<van-icon name="balance-pay" size="60rpx" color="#a1733f" />
				<text class="font">待付款</text>
			</view>
			<view class="item" @click="toOrder(2)">
				<van-icon name="send-gift-o" size="60rpx" color="#a1733f" />
				<text class="font">待发货</text>
			</view>
			<view class="item" @click="toOrder(3)">
				<van-icon name="logistics" size="60rpx" color="#a1733f" />
				<text class="font">待收货</text>
			</view>
			<view class="item" @click="toOrder(4)">
				<van-icon name="comment-o" size="60rpx" color="#a1733f" />
				<text class="font">待评价</text>
			</view>
			<button open-type="contact" class="item btn">
				<van-icon name="cash-back-record" size="60rpx" color="#a1733f" />
				<text class="font">退款售后</text>
			</button>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const toOrder = (val) => {
		uni.navigateTo({
			url:`/pages/order/order?current=${val}`
		})
	}
</script>

<style lang="scss" scoped>
	.order {
		padding: 0 20rpx 30rpx;
		background-color: #fff;
		.line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-weight: bold;
			font-size: 32rpx;
			padding: 10rpx 0;
			.more {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				line-height: 1;
				font-weight: 400;
				color: #c2c3c4;
				.font{
					margin-right: 6rpx;
				}
			}
		}
		
		.flex {
			margin-top: 20rpx;
			display: flex;
			align-content: center;
			justify-content: space-between;
			.item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				.font {
					margin-top: 15rpx;
				}
			}
			.btn {
				border: none;
				background-color: none;
				font-size: 26rpx;
				background-color: #fff;
				line-height: 1.6;
			}
		}
	}
</style>