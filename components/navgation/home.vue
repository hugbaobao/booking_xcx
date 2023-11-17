<template>
	<view class="nav_home">
		<text class="words">首页</text>
		<view class="search" @click="toSearch">
			<van-icon name="search" size="35rpx" color="#919191" />
			<text style="margin-left: 15rpx;">搜索</text>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import navdata from '@/hooks/getNav.js'
	
	let fullH = `${navdata.fullH}px`                // 整体高度
	let scrollTop = `${navdata.capsuleScrolltop}px` // 上内边距
	let scrollBottom = `${navdata.capsuleScrollbottom}px` // 上内边距
	let padr = `${navdata.capsulesToRight + 10}px`       // 右侧内边距最小值
	let useHeight = `${navdata.capsuleScrolltop}px` // 可使用高度
	
	const toSearch = () => {
		uni.navigateTo({
			url:'/pages/search/index'
		})
	}
	
</script>

<style lang="scss" scoped>
	.nav_home {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		background-color: #fff;
		height: v-bind(fullH);
		z-index: 9999;
		text-align: center;
		padding-top: v-bind(scrollTop);
		padding-bottom: v-bind(scrollBottom);
		padding-right: v-bind(padr);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 30rpx;
		.words{
			font-weight: bold;
			margin-right: 20rpx;
		}
		.search{
			flex: 1;
			display: flex;
			align-items: center;
			background-color: #dfdfdf;
			height: 50rpx;
			line-height: 50rpx;
			border-radius: 25rpx;
			padding-left: 20rpx;
			color: #919191;
		}
	}
</style>