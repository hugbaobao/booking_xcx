<template>
	<view class="card">
		<view class="inner">
			<view class="left">
				<view class="qr">
					<text>权益会员卡</text>
					<view class="block">
						<van-icon name="qr" size="28rpx" />
					</view>
				</view>
				
				<view class="status">
					<text class="open">已开通</text>
					<text>有效期至： 2088-08-08</text>
				</view>
			</view>
			
			<view class="more" @click="toVip">
				<text>详情</text>
				<van-icon name="arrow" />
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const toVip = ()=> {
		uni.navigateTo({
			url:'/pages/personal/vip'
		})
	}

</script>

<style lang="scss" scoped>
	.card {
		background-color: #fff;
		padding: 0 20rpx;
		.inner {
			border-radius: 6rpx;
			background: linear-gradient(to right, #393947, #5a5a69);
			color: #eec394;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx;
			.left{
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				.qr {
					display: flex;
					align-items: center;
					font-weight: 700;
					margin-bottom: 10rpx;
					font-size: 32rpx;
					.block {
						background-color: #eec394;
						width: 30rpx;
						height: 30rpx;
						margin-left: 6rpx;
						color: #000;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 5rpx;
					}
				}
				.status {
					display: flex;
					font-size: 24rpx;
					color: #a28b77;
					.open{
						margin-right: 20rpx;
					}
				}
			}
			
			.more {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				line-height: 1;
				font-weight: 400;
				color: #a28b77;
			}
		}
	}
</style>