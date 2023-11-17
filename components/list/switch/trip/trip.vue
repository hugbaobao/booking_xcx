<template>
	<view class="switch_trip">
		<view class="item" v-for="item in datalist" :key="item.id" @click="togoodsdetail(item)">
			<view class="png">
				<image :src="item.cover[0]" mode="" class="img"></image>
			</view>
			<view class="content">
				<text class="title">{{ item?.name }}</text>
				<view class="flex">
					<view class="left">
						{{ item?.words }}
					</view>
					<view class="right">
						<view class="price">
							<text>￥</text>
							<text>{{ item?.price }}</text>
						</view>
						<view class="btn" >
							预定
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { useGoodsStore } from '@/stores/goods.js'
	
	const props = defineProps(['datalist'])
	const goods = useGoodsStore()
	
	const togoodsdetail = (val) => {
		goods.goodsChange(val)
		uni.navigateTo({
			url:'/pages/order/goodsdetail'
		})
	}

</script>

<style lang="scss" scoped>
	.switch_trip {
		.item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			.png {
				flex: 1;
				border-radius: 10rpx;
				overflow: hidden;
				margin-right: 30rpx;
				.img {
					width: 100%;
					height: 180rpx;
					display: block;
				}
			}
			.content{
				width: 50%;
				.title {
					width: 100%;
					font-weight: bold;
				}
				.flex {
					padding-right: 10rpx;
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					.left {
						flex: 1;
						height: 100%;
						font-size: 24rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.right {
						margin-left: 20rpx;
						.price {
							color: #c62020;
							margin-bottom: 30rpx;
						}
						.btn{
							height: 40rpx;
							line-height: 40rpx;
							border-radius: 20rpx;
							background-color: #464756;
							color: #efca96;
							font-size: 24rpx;
							padding: 0 20rpx;
						}
					}
				}
				
			}
		}
	}
</style>