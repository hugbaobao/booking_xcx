<template>
	<view class="item">
		<view class="top">
			<view class="left">
				<view class="price">
					<text>￥</text>
					<text>{{ content.Coupon.amount }}</text>
				</view>
				<view class="man">
					<text>满</text>
					<text>{{ content.Coupon.cill }}</text>
					<text>元可用</text>
				</view>
			</view>
			
			<view class="center">
				<view class="manjian">
					<text>满</text>
					<text>{{ content.Coupon.cill }}</text>
					<text>减</text>
					<text>{{ content.Coupon.amount }}</text>
				</view>
				<view class="time">
					<text>有效期至</text>
					<text>{{ content.Coupon.expiration }}</text>
				</view>
			</view>
			
			<view class="right">
			</view>
		</view>
		<view class="bottom">
			<view class="tip">
				<text>支持线上线下门店使用</text>
				<van-icon name="arrow-down" />
			</view>
			<view class="right">
				<button type="default" class="btn btnlef">
					<van-icon name="qr" size="30rpx" />
					<text>券码</text>
				</button>
				<button type="default" class="btn" @click="toshop">去使用</button>
			</view>
		</view>
		
		<view class="common">
			通用券
		</view>
	</view>

</template>

<script setup>
	import { ref } from 'vue'
	
	const props = defineProps(['content'])
	
	const toshop = () => {
		uni.switchTab({
			url:'/pages/tabbar/shop'
		})
	}

</script>

<style lang="scss" scoped>
	.item {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin: 20rpx;
		position: relative;
		overflow: hidden;
		.top {
			width: 100%;
			border-bottom: 1px solid #ededed;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 20rpx;
			margin-bottom: 20rpx;
			.left {
				display: flex;
				flex-direction: column;
				align-items: center;
				.price {
					color: #97642d;
					font-size: 50rpx;
					font-weight: bold;
					margin-bottom: 15rpx;
				}
				.man {
					font-size: 20rpx;
					color: #8d8d8d;
				}
			}
			.center {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #8d8d8d;
				align-items: flex-start;
				.manjian {
					color: #000;
					font-size: 32rpx;
					font-weight: bold;
				}
				.time {
					margin: 18rpx 0;
				}
			}
			.right {
				.btn {
					background-color: #97642d;
					color: #fff;
					border-radius: 15rpx;
					font-size: 24rpx;
					padding: 2rpx 30rpx;
				}
			}
		}
		.bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.right {
				display: flex;
				align-items: center;
				.btn {
					background-color: #97642d;
					color: #fff;
					border-radius: 15rpx;
					font-size: 24rpx;
					padding: 2rpx 30rpx;
				}
				.btnlef {
					background-color: #fff;
					margin-right: 20rpx;
					color: #000;
					border: 1px solid #d4d4d4;
					display: flex;
					align-items: center;
				}
			}
		}
		
		.common {
			position: absolute;
			background-color: #97642d;
			color: #fff;
			top: 0;
			left: 0;
			border-bottom-right-radius: 15rpx;
			padding: 4rpx 10rpx;
			font-size: 20rpx;
		}
	}
	
	
</style>