<template>
	<view class="myswiper">
		<swiper class="swiper" indicator-dots circular :autoplay="true" :duration="500" @change="itemChange">
			<swiper-item v-for="item in list" :key="item.id">
				<image :src="item" mode="" class="innnerImg"></image>
			</swiper-item>
		</swiper>

	</view>
</template>

<script setup>
	import { ref, watchEffect } from 'vue'
	
	const props = defineProps({
		list: {
			type: Array
		}
	})

</script>

<style lang="scss" scoped>
	.myswiper {
		width: 100%;
		position: relative;
		.swiper {
			width: 750rpx;
			height: 400rpx; 
			.swiper-item {
				width: 750rpx;
				display: block;
				height: 400rpx;
				text-align: center;
			}
			.innnerImg{
				width: 750rpx;
				height: 400rpx;
			}
		}
	}
	
</style>