<template>
	<view class="culturedetail">
		
		<view class="swiper">
			<my-swiper :list="product?.cover"></my-swiper>
		</view>
		
		<view class="detail">
			<view class="title">{{ product?.name }}</view>
			
			<view class="content" >
				<view class="li" v-for="(item, index) in product?.simple" :key="index">
					{{ item }}
				</view>
			</view>
		
		</view>
		
		<view class="goods">
			<view class="title">
				商品详情
			</view>
			<view class="words">{{ product?.words }}</view>
		</view>
		

		
		<view class="fix">
			<my-car></my-car>
		</view>
	</view>
	
	<my-intercept></my-intercept>
</template>

<script setup>
	import { ref,onMounted } from 'vue'
	import MySwiper from '@/components/nonavto/swiper.vue'
	import MyCar from '@/components/shop/car.vue'
	import { useGoodsStore } from '@/stores/goods.js'
	import MyIntercept from '@/components/intercept/intercept.vue'
	const goods = useGoodsStore()
	
	const product = ref(null)
	
	onMounted(()=>{
		product.value = goods.parseGoods
	})

</script>

<style lang="scss" scoped>
	.culturedetail {
		padding: 0 0 120rpx;
		background-color: #e7e7e7;
		min-height: 100vh;
		.swiper{
			margin-top: 10rpx;
			background-color: #fff;
		}
		.detail {
			background-color: #fff;
			padding: 30rpx 20rpx 20rpx;
			.title {
				font-weight: bold;
				font-size: 32rpx;
			}
			.content {
				margin-top: 50rpx;
				.li {
					font-size: 28rpx;
					line-height: 1.6;
				}
			}
		}
		
		.goods {
			background-color: #fff;
			padding: 20rpx;
			margin-top: 15rpx;
			line-height: 1.6;
			.title{
				font-size: 28rpx;
			}
			.words {
				margin-top: 20rpx;
			}
		}
		
		.fix {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			background-color: #fff;
		}
	}
</style>