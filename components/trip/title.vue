<template>
	<view class="title">
		<view class="bold">
			<slot name="default">粗体</slot>
		</view>
		<view class="thin">
			<slot name="thin">细体</slot>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.title {
		display: flex;
		align-items: flex-end;
		.bold {
			font-weight: bold;
			font-size: 32rpx;
			margin-right: 15rpx;
		}
		.thin {
			color: #b2b6b8;
		}
	}
</style>