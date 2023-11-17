<template>
	<view class="myswiper">
		<swiper class="swiper" circular :autoplay="true" :duration="500" :indicator-dots="ifdots" indicator-active-color="#aa7f4f">
			<swiper-item v-for="(item, index) in list" :key="index" @click="navto(item.page)">
				<image :src="item.url" mode="" class="innnerImg"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import { ref, watchEffect, onMounted } from 'vue'
	
	const props = defineProps({
		ifdots: {
			default: false
		},
			
		list: {
			type: [Array, Object],
			default : ()=>{
				[
					{
						id: 1,
						url: 'A',
						path: 'aa'
					},{
						id: 2,
						url: 'B',
						path: 'bb'
					},{
						id: 3,
						url: 'C',
						path: 'cc'
					},
				]
			}
		}
	})

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
</script>

<style lang="scss" scoped>
	.myswiper {
		position: relative;
		.swiper {
			height: 400rpx;
			.swiper-item {
				display: block;
				text-align: center;
				background-color: gray;
				border-radius: 10rpx;
				overflow: hidden;
				
			}
		}
		
		.innnerImg {
			width: 750rpx;
			height: 400rpx;
		}
	}
	
</style>