<template>
	<view class="sort">
		<image :src="cover" mode="" class="img"></image>
		
		<view class="goods">
			<my-sell v-for="(item, index) in list" :key="item.id" :product="item" class="mysell"></my-sell>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import MySell from '@/components/common/sell.vue'
	
	const props = defineProps({
		cover: {
			type: String
		},
		list: {
			type: Array
		}
	})

</script>

<style lang="scss" scoped>
	.sort {
		box-shadow: 10rpx 20rpx 20rpx rgba(128, 128, 128, 0.1),-10rpx 20rpx 20rpx rgba(128, 128, 128, 0.1);
		border-radius: 10rpx;
		overflow: hidden;
		background-color: #fff;
		.img {
			width: 100%;
			height: 400rpx;
			border-radius: 10rpx;
			display: block;
		}
		
		.goods {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 15rpx 15rpx 0;
			.mysell{
				width: 30%;
				margin-right: 5%;
				&:nth-child(3n) {
					margin-right: 0;
				}
			}
		}
	}
</style>