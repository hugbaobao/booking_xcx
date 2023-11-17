<template>
	<view class="myswiper">
		<swiper class="swiper" circular :autoplay="true" :duration="500" @change="itemChange">
			<swiper-item v-for="(item, index) in list" :key="index" @click="navto(item.page)">
				<image :src="item.url" mode="" class="innnerImg"></image>
			</swiper-item>
		</swiper>
		
		<view class="number">
			<text>{{ current }}</text>/<text>{{ sum }}</text>
		</view>
	</view>
</template>

<script setup>
	import { ref, watchEffect } from 'vue'
	
	const current = ref(1) //分子
	const sum = ref(3)  //分母

	const props = defineProps({
		list: {
			type: Array,
			default : ()=>{
				[
					{
						id: 1,
						url: 'A',
						path: 'aa'
					}
				]
			}
		}
	})
	
	// 获取当前分子
	const itemChange = (event) => {
		current.value = event.detail.current + 1
	}
	
	// 根据点击跳转
	const navto = (val) => {
		if(val !== '') {
			uni.navigateTo({
				url: val,
				fail() {
					uni.switchTab({
						url: val
					})
				}
			})
		}
	}
	
	// 根据图片数量决定分母
	watchEffect(()=>{
		sum.value = Object.values(props.list).length
	})
</script>

<style lang="scss" scoped>
	.myswiper {
		position: relative;
		.swiper {
			height: 300rpx; //这里后期注释
			.swiper-item {
				display: block;
				height: 300rpx;
				line-height: 300rpx;
				text-align: center;
				background-color: gray;
			}
		}
		.innnerImg {
			width: 750rpx;
			height: 400rpx;
		}
		.number {
			position: absolute;
			right: 0;
			bottom: 20rpx;
			background-color: rgba(167, 127, 78, 0.7);
			border-radius: 10rpx;
			color: #fff;
			height: 50rpx;
			line-height: 50rpx;
			padding: 0 30rpx;
		}
	}
	
</style>