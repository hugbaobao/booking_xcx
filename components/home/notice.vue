<template>
	<view class="notice">
		<view class="left">
			通知
		</view>
		<view class="scroll">
			滚动通知的内容部分
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.notice {
		background-color: #fff;
		line-height: 80rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		box-shadow: 0px  4rpx 10rpx rgba(0, 0, 0, 0.1);
		.left {
			width: 20%;
		}
		.scroll {
			flex: 1;
		}
	}
</style>