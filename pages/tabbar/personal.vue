<template>
	<view class="personal">
		<view class="myheader">
			<my-header></my-header>
		</view>
		
		<view class="mycard">
			<my-card></my-card>
		</view>
		
		<view class="myorder">
			<my-order></my-order>
		</view>
		
		<view class="myothers">
			<my-others></my-others>
		</view>
	</view>
	
	<my-intercept></my-intercept>
</template>

<script setup>
	import { ref } from 'vue'
	import MyHeader from '@/components/personal/header.vue'
	import MyCard from '@/components/personal/card.vue'
	import MyOrder from '@/components/personal/order.vue'
	import MyOthers from '@/components/personal/others.vue'
	import MyIntercept from '@/components/intercept/intercept.vue'
</script>

<style lang="scss" scoped>
	.personal {
		min-height: 100vh;
		background-color: #fafafa;
		.mycard {
			padding: 0 20rpx;
			margin-top: 20rpx;
		}
		.myorder {
			padding: 0 20rpx;
			margin-top: 20rpx;
		}
	}
</style>